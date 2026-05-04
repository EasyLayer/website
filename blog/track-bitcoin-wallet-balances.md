---
title: "Track Bitcoin Wallet Balances Without Storing the Entire Blockchain"
authors: [yarikp]
tags: [bitcoin, utxo, wallet, balances, easylayer, self-hosted, nodejs]
date: 2025-05-15T10:30:00Z
description: Build a self-hosted Bitcoin wallet balance tracker that stores only the data you need — no full node required. Uses @easylayer/bitcoin-crawler with a declarative Aggregate Model.
keywords: ['track bitcoin wallet balance', 'bitcoin utxo tracking nodejs', 'bitcoin balance tracker self-hosted', 'bitcoin address monitoring', 'bitcoin payment monitoring nodejs', 'track bitcoin address']
image: /img/blog/main-default-img.png
---

Tracking Bitcoin wallet balances sounds simple. In practice it's not — because Bitcoin uses the UTXO model, and because every traditional approach comes with a significant trade-off:

- **Run a full node + index everything:** hundreds of gigabytes, weeks to sync, expensive infrastructure
- **Use a blockchain API (Blockstream, Mempool.space):** rate limits, no historical control, recurring costs
- **Use a paid service (Alchemy, QuickNode):** better but still recurring costs and data on their servers

There's a fourth option: run only the indexer you actually need, tracking only the wallets you care about, on your own infrastructure. That's what this post covers.

<!--truncate-->

## The Approach

`@easylayer/bitcoin-crawler` lets you define an Aggregate Model — a description of what state to maintain. The crawler reads Bitcoin blocks (from any height) and feeds them to your model. You emit events, the EventStore persists them, and you query the result.

For wallet balance tracking, the model needs to:
1. Watch outputs (vout) going to tracked addresses — these are incoming funds
2. Watch inputs (vin) spending UTXOs from tracked addresses — these are outgoing funds
3. Maintain a UTXO set per address and compute balances from it

## The Model

```ts
import { compileStateModelBTC } from '@easylayer/bitcoin-crawler';

// The addresses you want to track
const WATCHED_ADDRESSES = new Set([
  '1A1zP1eP5QGefi2DMPTfTL5SLmv7Divf',
  'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
  // add as many as you need
]);

export const WalletTracker = compileStateModelBTC({
  modelId: 'wallet-tracker',

  state: {
    // address → { txid:vout → satoshis }
    utxos: new Map<string, Map<string, bigint>>(),
    // address → total satoshis
    balances: new Map<string, bigint>(),
  },

  sources: {
    // Called for each transaction output
    async vout(ctx) {
      const address = ctx.vout.scriptPubKey?.addresses?.[0];
      if (!address || !WATCHED_ADDRESSES.has(address)) return;
      // Convert BTC to satoshis (avoid float math)
      const satoshis = BigInt(Math.round(ctx.vout.value * 1e8));
      return {
        address,
        utxoKey: `${ctx.tx.txid}:${ctx.vout.n}`,
        satoshis,
      };
    },

    // Called for each transaction input
    async vin(ctx) {
      if (ctx.vin.coinbase) return; // skip coinbase
      return { utxoKey: `${ctx.vin.txid}:${ctx.vin.vout}` };
    },

    // Called once per block with accumulated vout/vin locals
    async block(ctx) {
      const outputs = ctx.locals.vout ?? [];
      const inputs = ctx.locals.vin ?? [];
      if (outputs.length === 0 && inputs.length === 0) return;
      ctx.applyEvent('BlockProcessed', ctx.block.height, { outputs, inputs });
    },
  },

  reducers: {
    BlockProcessed(state, event) {
      const { outputs, inputs } = event.payload;

      // Add new UTXOs for received funds
      for (const { address, utxoKey, satoshis } of outputs) {
        if (!state.utxos.has(address)) {
          state.utxos.set(address, new Map());
        }
        state.utxos.get(address)!.set(utxoKey, satoshis);
      }

      // Remove spent UTXOs (scan all addresses for the spent key)
      for (const { utxoKey } of inputs) {
        for (const utxoMap of state.utxos.values()) {
          utxoMap.delete(utxoKey);
        }
      }

      // Recompute balances from UTXO sets
      for (const [address, utxoMap] of state.utxos) {
        let total = 0n;
        for (const satoshis of utxoMap.values()) total += satoshis;
        state.balances.set(address, total);
      }
    },
  },
});
```

## Bootstrap and Configuration

```ts
// main.ts
import { bootstrap } from '@easylayer/bitcoin-crawler';
import { WalletTracker } from './model';

bootstrap({ Models: [WalletTracker] });
```

```bash
# .env
PROVIDER_NETWORK_RPC_URLS=https://your-quicknode-endpoint
START_BLOCK_HEIGHT=840000       # start from a recent height, not genesis
EVENTSTORE_DB_TYPE=sqlite
TRANSPORT_HTTP_PORT=3000
```

The crawler starts at block 840,000, syncs forward through history, and then follows new blocks in real time. When it catches up, it switches to live mode automatically.

**How much data does this use?** For a small set of tracked addresses (say, a few hundred wallets), the SQLite database will be in the low megabytes — not gigabytes. You're storing only the events for addresses you care about, not the entire blockchain.

## Querying Balances

Once the crawler is running, query it from your application:

```ts
import { Client } from '@easylayer/transport-sdk';

const client = new Client({
  transport: {
    type: 'http',
    query: { baseUrl: 'http://localhost:3000' },
  },
});

// Get current state of the model
const result = await client.query('GetModelsQuery', {
  modelIds: ['wallet-tracker'],
});

const { balances } = result[0].state;

for (const [address, satoshis] of Object.entries(balances)) {
  console.log(`${address}: ${satoshis} sat (${Number(satoshis) / 1e8} BTC)`);
}
```

## Subscribe to Real-Time Updates

For live balance tracking, subscribe to events instead of polling:

```ts
client.subscribe('BlockProcessed', (event) => {
  console.log(`Block ${event.blockHeight} processed`);
  // re-query or compute balance delta from event.payload
});
```

## Adding Mempool Monitoring

If you need to detect incoming payments before they confirm, enable mempool monitoring:

```bash
MEMPOOL_ENABLED=true
PROVIDER_MEMPOOL_RPC_URLS=https://your-quicknode-endpoint
```
"
The crawler will track unconfirmed transactions involving your watched addresses and emit mempool events. You can use these to show "pending" balance in a UI before confirmation.

## What You Need to Run This

- A VPS with 2-4 vCPU and 2-4 GB RAM (a $10-20/month server is enough)
- A Bitcoin RPC endpoint — QuickNode free tier works for moderate volumes (the crawler uses just 2 RPC calls per block)
- Node.js ≥ 20

No full node needed. No terabytes of blockchain data. Just the addresses you care about.

Full docs: [Bitcoin Crawler documentation](/docs/get-started/bitcoin-crawler) · Questions: [GitHub Discussions](https://github.com/easylayer/core/discussions)
