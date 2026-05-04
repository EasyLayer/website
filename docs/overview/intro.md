---
id: intro
title: Introduction to EasyLayer
slug: /
sidebar_label: Introduction
description: EasyLayer is a self-hosted framework for building blockchain state services. Define what on-chain state to track, point at a node, and get a running service with Event Sourcing, automatic reorg handling, and built-in transports.
keywords: ['blockchain state service', 'self-hosted blockchain framework', 'TypeScript', 'event sourcing', 'CQRS', 'bitcoin indexer', 'ethereum indexer', 'blockchain data', 'real-time blockchain', 'no recurring fees']
image: /img/el_twitter_default.png
---

EasyLayer is an open-source, self-hosted framework for building real-time blockchain state services. You define what on-chain data to track. The framework keeps that state live and consistent on every new block, with automatic reorganization handling built in. Your data stays on your infrastructure.

For large-scale historical datasets where you need to store entire chain history or handle high-volume reads, the enterprise Read Model layer builds on top of the same event stream and projects it into SQL or S3 storage. The open-source Write Model handles real-time state and is the source of truth. The Read Model handles scale.

## What Makes EasyLayer Different

Most blockchain data tools give you a stream of raw transactions and leave the rest to you. Maintaining consistent state, handling reorgs, serving live data to your application: all your problem. Cloud indexing platforms solve some of this but on their infrastructure, on their terms, with their schema constraints.

EasyLayer is different in three ways.

**Real-time state with automatic reorg handling.** Every new block updates your state immediately. When the chain reorganizes, orphaned block events are rolled back and the correct chain is replayed automatically. Your state is always consistent with the canonical chain, without any reorg code in your application.

**You define the state, not the platform.** Tell the framework what data matters: wallet balances, contract events, UTXOs, fee statistics, anything. It tracks exactly that. Other tools give you a generic dataset and make you filter it. EasyLayer maintains the precise state your application needs.

**Self-hosted, Bitcoin and EVM natively.** The service runs on your server. Nothing leaves your infrastructure. Both UTXO chains (Bitcoin, BCH, LTC, DOGE) and account-based chains (Ethereum, BSC, Polygon, L2s) are supported with dedicated crawlers built for each model type.

**Write Model vs Read Model.** The open-source crawler is the Write Model: real-time state, mempool monitoring, Event Sourcing with full history. For teams that need to store enormous datasets (full UTXO set, all on-chain transfers, entire chain history), the enterprise Read Model builds SQL or S3 projections on top of the same event stream and handles high-volume reads without limits. [See Enterprise](/enterprise).

For a detailed comparison with The Graph, SQD, and blockchain APIs, see [EasyLayer vs Alternatives](/docs/vs-alternatives).

## Available Tools

| Package | Status | Networks |
|---|---|---|
| `@easylayer/bitcoin-crawler` | Stable beta | Bitcoin, BCH, LTC, DOGE, and Bitcoin-like chains |
| `@easylayer/evm-crawler` | Released beta | Ethereum, BSC, Polygon, Arbitrum, Optimism, and EVM-compatible chains |
| `@easylayer/transport-sdk` | Stable | Client SDK for all transports (HTTP, WebSocket, IPC, Electron, Browser) |

In development: `@easylayer/solana-crawler`, `@easylayer/ton-crawler`, `@easylayer/tron-crawler`.

## How It Works

### 1. Install

```bash
npm install @easylayer/bitcoin-crawler
# or for EVM chains:
npm install @easylayer/evm-crawler
```

### 2. Define your State Model

The model describes what blockchain state your service maintains. You write it; the framework calls it per block.

```ts
// Declarative style
export const WalletTrackerModel = {
  modelId: 'wallet-tracker',
  state: { balances: new Map<string, bigint>() },
  sources: {
    async vout(ctx) {
      return { address: ctx.vout.scriptPubKey.addresses?.[0], value: ctx.vout.value };
    },
    async block(ctx) {
      ctx.applyEvent('Deposit', ctx.block.height, { outputs: ctx.locals.vout });
    },
  },
  reducers: {
    Deposit(state, event) {
      for (const { address, value } of event.payload.outputs ?? []) {
        state.balances.set(address, (state.balances.get(address) ?? 0n) + BigInt(value));
      }
    },
  },
};
```

### 3. Configure and run

```bash
PROVIDER_NETWORK_RPC_URLS=http://user:pass@your-node:8332
START_BLOCK_HEIGHT=840000
EVENTSTORE_DB_TYPE=sqlite
TRANSPORT_HTTP_PORT=3000
```

```ts
import { bootstrap } from '@easylayer/bitcoin-crawler';
bootstrap({ Models: [WalletTrackerModel] });
```

### 4. Query from your application

```ts
import { Client } from '@easylayer/transport-sdk';

const client = new Client({ transport: { type: 'http', query: { baseUrl: 'http://localhost:3000' } } });
const result = await client.query('GetModelsQuery', { modelIds: ['wallet-tracker'] });
```

## Core Concepts

### State Model
The State Model is the code you write. It defines what on-chain data to maintain (balances, UTXOs, contract events, anything your app needs), what changes to record when a block arrives, and how those changes update your state. The framework provides both class-based and declarative APIs.

See [State Models](/docs/data-modeling) for the full API.

### EventStore
Every state change is stored as an immutable event — this is Event Sourcing. The EventStore is built into the crawler and supports:

- **SQLite** — development, small projects, desktop apps
- **PostgreSQL** — production, large datasets
- **IndexedDB** — browser extensions, Electron apps

Because state is reconstructed from events, you can query your model at any historical block height, and reorganizations are handled automatically: orphaned block events are rolled back, the correct chain is replayed.

See [Event Store & Databases](/docs/event-store).

### Transport Layer
Five built-in transports expose your data to client applications:

- **HTTP RPC** — request/response queries
- **WebSocket** — real-time event streams
- **IPC Parent/Child** — Node.js process communication
- **Electron IPC** — desktop applications
- **Browser (SharedWorker)** — browser extensions and SPAs

All use the same message format. Switch transports without changing your application code.

See [Transport Layer & SDK](/docs/transport-layer).

### Write Model vs Read Model

The crawler is the **Write Model**: the source of truth for real-time state. It handles live block processing, mempool monitoring, Event Sourcing with full history, and serves data through transport APIs. This is the open-source layer, free to use.

The **Enterprise Read Model** builds on top of the same event stream for teams that need to store and query very large datasets: full chain history, all wallet addresses, high-volume concurrent reads. It projects events into SQL or S3 storage and scales independently of the Write Model. [Contact us](/enterprise).

## Key Features

- **Self-hosted** — your servers, your data, no vendor lock-in
- **Zero recurring fees** — a 2-4 vCPU server + QuickNode free tier is enough for most use cases
- **Historical queries** — query model state at any block height (Event Sourcing)
- **Automatic reorg handling** — orphaned events rolled back and replayed, any length reorg
- **Mempool monitoring** — optional real-time unconfirmed transaction tracking
- **Cross-platform** — Node.js server, Electron desktop, browser extensions with IndexedDB
- **Bitcoin and EVM** — native support for both UTXO and account-based chains

## Community

- **[GitHub Discussions](https://github.com/easylayer/core/discussions)** — questions, ideas, show & tell
- **[Blog](/blog)** — releases, tutorials, comparisons
- **[Twitter](https://twitter.com/easylayer_io)** — updates

EasyLayer is open source. The framework is free. [Enterprise services](/enterprise) exist for teams that need managed infrastructure or high-load read models.
