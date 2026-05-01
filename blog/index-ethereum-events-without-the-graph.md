---
title: "Index Ethereum Smart Contract Events Without The Graph"
authors: [yarikp]
tags: [ethereum, evm, smart-contracts, indexer, the-graph, easylayer, self-hosted, erc20]
date: 2025-05-20T10:30:00Z
description: Build a self-hosted Ethereum event indexer for your smart contracts using @easylayer/evm-crawler. Track ERC-20 transfers, custom events, and contract state — without The Graph or recurring API fees.
keywords: ['index ethereum events without the graph', 'ethereum event indexing self-hosted', 'erc20 transfer tracking nodejs', 'smart contract event indexer', 'alternative to the graph', 'ethereum indexer self-hosted', 'track erc20 transfers', 'ethereum log indexing']
image: /img/blog/main-default-img.png
---

If you've built anything with Ethereum smart contracts, you've probably reached for The Graph or a similar service to index your contract events. It's the obvious choice — set up a subgraph, query via GraphQL, done.

The problem is what happens next: recurring GRT costs, data you don't control, limited flexibility for custom state, and eventually the realization that every query you run is revenue for someone else.

There's a self-hosted alternative. This post shows how to build a contract event indexer using `@easylayer/evm-crawler` — running on your own infrastructure, zero recurring fees.

<!--truncate-->

## What We're Building

A self-hosted indexer that:
- Tracks ERC-20 Transfer events for a specific contract (USDC in this example, but any contract works)
- Maintains running balances per address
- Exposes a query API to read current state or historical state at any block height
- Handles chain reorganizations automatically

## The Model

EVM Crawler uses an Aggregate Model — a TypeScript object that defines what state to maintain and what events to emit per block.

```ts
// model.ts
import type { DeclarativeModel } from '@easylayer/evm-crawler';
import { compileStateModelEVM } from '@easylayer/evm-crawler';

const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

// The contract you want to track — replace with your contract address
const CONTRACT_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // USDC

const model: DeclarativeModel<any> = {
  modelId: 'usdc-balances',

  state: {
    balances: new Map<string, bigint>(),   // address → token units
    totalTransfers: 0,
  },

  sources: {
    // Called for each log in the block
    async log(ctx) {
      if (ctx.log.address.toLowerCase() !== CONTRACT_ADDRESS.toLowerCase()) return;
      if (ctx.log.topics[0] !== TRANSFER_TOPIC) return;

      // Decode ERC-20 Transfer(address indexed from, address indexed to, uint256 value)
      const from = '0x' + ctx.log.topics[1].slice(26);
      const to = '0x' + ctx.log.topics[2].slice(26);
      const value = BigInt(ctx.log.data);

      return { from, to, value: value.toString() };
    },

    // Called once per block — emit an event if any matching logs were found
    async block(ctx) {
      const transfers = ctx.locals.log;
      if (!transfers?.length) return;
      ctx.applyEvent('Transfer', ctx.block.number, { transfers });
    },
  },

  reducers: {
    Transfer(state, event) {
      for (const { from, to, value } of event.payload.transfers) {
        const val = BigInt(value);
        const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

        // Debit sender (skip zero address — it's a mint)
        if (from !== ZERO_ADDRESS) {
          state.balances.set(from, (state.balances.get(from) ?? 0n) - val);
        }

        // Credit receiver (skip zero address — it's a burn)
        if (to !== ZERO_ADDRESS) {
          state.balances.set(to, (state.balances.get(to) ?? 0n) + val);
        }

        state.totalTransfers++;
      }
    },
  },
};

export const UsdcBalances = compileStateModelEVM(model);
```

## Bootstrap and Run

```ts
// main.ts
import { bootstrap } from '@easylayer/evm-crawler';
import { UsdcBalances } from './model';

bootstrap({ Models: [UsdcBalances] });
```

```bash
# .env
NETWORK_CHAIN_ID=1
PROVIDER_NETWORK_RPC_URLS=https://mainnet.infura.io/v3/YOUR_KEY

# Start from a recent block (USDC deployed at ~6082465)
START_BLOCK_HEIGHT=18000000

EVENTSTORE_DB_TYPE=sqlite
TRANSPORT_HTTP_PORT=3000

# Fetch receipts (needed for logs)
RECEIPTS_STRATEGY=auto
```

Run it:

```bash
npx ts-node main.ts
```

The crawler syncs from block 18,000,000 to the current tip, then switches to real-time mode. Logs from the USDC contract are extracted, Transfer events are emitted and stored, balances are maintained.

## Query Balances

```ts
import { Client } from '@easylayer/transport-sdk';

const client = new Client({
  transport: { type: 'http', query: { baseUrl: 'http://localhost:3000' } },
});

// Current state
const [model] = await client.query('GetModelsQuery', {
  modelIds: ['usdc-balances'],
});

const { balances, totalTransfers } = model.state;
console.log(`Total transfers indexed: ${totalTransfers}`);

// Balance for a specific address
const address = '0xYourAddress';
const balance = BigInt(balances[address] ?? 0);
console.log(`Balance: ${balance} (raw token units)`);
```

## Historical State at Any Block Height

Because EasyLayer uses Event Sourcing, you can query what the state was at any past block:

```ts
// What were the balances at block 18,500,000?
const [historical] = await client.query('GetModelsQuery', {
  modelIds: ['usdc-balances'],
  filter: { blockHeight: 18_500_000 },
});
```

The Graph doesn't support time-travel queries like this by default. With Event Sourcing it's free.

## Real-Time Event Subscription

Subscribe to Transfer events as they happen:

```ts
client.subscribe('Transfer', (event) => {
  console.log(`Block ${event.blockHeight}: ${event.payload.transfers.length} transfers`);
  for (const { from, to, value } of event.payload.transfers) {
    console.log(`  ${from} → ${to}: ${value}`);
  }
});
```

## Tracking Multiple Contracts

Add more models to the same bootstrap call:

```ts
const DaiBalances = compileStateModelEVM({ modelId: 'dai-balances', /* ... */ });
const WethBalances = compileStateModelEVM({ modelId: 'weth-balances', /* ... */ });

bootstrap({ Models: [UsdcBalances, DaiBalances, WethBalances] });
```

Each model maintains independent state. Query them separately or together.

## How This Compares to The Graph

| | Self-hosted (EasyLayer) | The Graph |
|---|---|---|
| Recurring cost | Server only (~$20-40/month) | GRT tokens per query |
| Data location | Your PostgreSQL/SQLite | Their network |
| Custom state | Full control | GraphQL schema only |
| Historical queries | Any block height | Limited |
| Reorg handling | Automatic | Automatic |
| Setup time | Minutes | Hours (subgraph deployment) |
| Supported chains | Any EVM chain you configure | Network-supported chains |

The practical difference: with The Graph, your data and costs are on their platform. With EasyLayer, you own both.

## What You Need

- VPS: 2-4 vCPU, 4-8 GB RAM (~$20-40/month)
- Ethereum RPC: Infura free tier, Alchemy free tier, or your own node
- Node.js ≥ 20

For a single contract event tracker, SQLite is sufficient. Switch to PostgreSQL when you're indexing multiple large contracts or need concurrent reads.

Full docs: [EVM Crawler documentation](/docs/get-started/evm-crawler) · Questions: [GitHub Discussions](https://github.com/easylayer/core/discussions)
"