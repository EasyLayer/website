---
title: Introducing Bitcoin Crawler - Your Self-Hosted Blockchain Indexer
authors: [yarikp]
tags: [bitcoin, blockchain, indexer, parser, easylayer, event-sourcing]
date: 2025-04-01T10:30:00Z
description: Meet Bitcoin Crawler - a self-hosted framework for building custom blockchain indexers. Parse only the data you need, run on lightweight servers, and save money on API subscriptions.
keywords: ['bitcoin crawler', 'blockchain indexer', 'self-hosted', 'event sourcing', 'CQRS', 'blockchain parser', 'real-time blockchain data']
image: /img/blog/main-default-img.png
---

Today we're excited to introduce **[@easylayer/bitcoin-crawler](https://www.npmjs.com/package/@easylayer/bitcoin-crawler)** - a tool that lets you run your own blockchain indexer with just a few lines of code. Install the package, describe what data you need, and you're done. Everything else works under the hood.

<!--truncate-->

## What is Bitcoin Crawler?

Bitcoin Crawler is a self-hosted framework that lets developers easily launch their own indexer and parser. You deploy it on your infrastructure and control your data completely.

Here's how it works:
- Install `@easylayer/bitcoin-crawler` in your Node.js project
- Describe your data model (what blockchain data you want to track)
- Configure the package and choose your transport (HTTP RPC, WebSocket, IPC, Electron, or even browser)
- Run the bootstrap function

That's it. The crawler connects to a blockchain node, starts processing blocks, and indexes exactly the data you specified in your model. Works cross-platform: deploy on servers, run on desktop applications, or use in browser extensions.

## The Problem with Blockchain Data

Everyone needs blockchain data. Reading transactions, tracking balances, monitoring fees, analyzing scripts - these are common tasks. But getting this data is expensive and complicated.

**Problem 1: Expensive API subscriptions**

Third-party blockchain APIs are convenient but costly. Basic queries (blocks, transactions) might be cheap, but anything custom gets expensive fast. Need to track specific wallet balances? Monitor transaction fees? Parse historical data? Costs skyrocket as your app scales.

**Problem 2: Building custom solutions is expensive**

Building your own indexer from scratch means months of development. You need to understand blockchain internals, verify chain integrity (Merkle trees, block hashes), handle reorganizations, manage synchronization, and maintain infrastructure. It's complex and requires specialized developers.

**Problem 3: Storing entire blockchains**

Traditional indexers store everything - the entire blockchain, fully indexed. That's terabytes of data you probably don't need. Your server costs grow, backups become massive, and queries slow down.

**Our solution: self-hosted, lightweight, and data-efficient**

Bitcoin Crawler solves all three problems:
- **Self-hosted** = no recurring API fees, your data stays with you
- **Framework approach** = install a package and describe your model, not months of development
- **Smart indexing** = store only the data you actually need, not the entire blockchain

Want to track wallet balances? Create one indexer for that. Need to calculate fees? Make another small indexer. Monitoring a specific smart contract? That's a third indexer. This separation of concerns makes scaling easy - just run multiple lightweight services on small servers (2-4 virtual CPUs each).

## How It Works

Under the hood, Bitcoin Crawler uses Event Sourcing and CQRS architectural patterns.

**Event Sourcing** means every state change is stored as an event. This gives you complete history and audit trails - perfect for fintech, gaming, and compliance. It also handles blockchain reorganizations automatically. When a reorg happens, the system rolls back events and replays the correct chain. No manual intervention needed.

**CQRS** (Command Query Responsibility Segregation) separates write and read operations. Bitcoin Crawler is the "write side" - it parses blocks, stores events, and maintains state. For medium traffic loads, this is enough. Need high-load read performance? Build a separate "read side" with projections optimized for your queries. <!-- TODO: Link to /enterprise page for custom solutions -->

**Network providers** connect to blockchain nodes and fetch blocks. Bitcoin Crawler supports:
- **RPC pulling**: Regular HTTP requests to your node
- **P2P pulling**: Direct peer-to-peer connection
- **ZMQ subscription**: Real-time block notifications
- **P2P subscription**: Real-time P2P block streaming

For RPC, we minimized requests to save money. During pulling, we make one request to check block height, then just **2 requests to fetch each block**: one for block hash by height, one for full block data with all transactions included. This Bitcoin-specific optimization means we never make separate requests for individual transactions. This low request count means you can use external providers like QuickNode without exceeding free tier limits.

You can configure multiple providers as fallbacks. If one fails, the system automatically switches to the next. Just remember different providers might have slightly different chain views.

**Best practice**: For RPC, use an external provider rather than running your own node. With our minimal request count, provider costs are negligible (often free), while maintaining your own node is expensive. But it depends on your project size.

**Database** stores events and state. We support:
- **SQLite**: Perfect for development, small projects, and desktop applications - just specify a path
- **PostgreSQL**: For production and larger datasets - provide connection settings
- **IndexedDB**: For browser environments

The application manages database schema automatically. On first run, it creates necessary tables, indexes, and configurations. You can use the same PostgreSQL instance for multiple applications - no conflicts.

## Key Features

### Self-Hosted & Cost-Effective
Run on your infrastructure. A lightweight server with 2-4 virtual CPUs is enough for most use cases. No monthly API bills that grow with your user base.

### Custom Data Models
You describe what data matters to your business - in TypeScript classes or declarative syntax. The crawler extracts only that data from blocks. No bloated databases, just what you need.

### Real-Time & Historical Data
Start from any block height - genesis block, recent history, or current tip. The crawler processes historical data and seamlessly switches to real-time monitoring. Add mempool monitoring for tracking unconfirmed transactions in real time.

### Automatic Reorganization Handling
Blockchain reorgs are handled automatically. The system verifies chain integrity using Merkle trees and block hashes (can be disabled in settings). When a reorg occurs, state rolls back and replays correctly.

### Multiple Providers & Transports
Connect to your own node or external providers (QuickNode, etc.). Configure fallbacks for reliability. Access data through HTTP RPC, WebSocket, IPC, Electron, or browser - all transports work with the same API.

### Event Sourcing Architecture
Complete audit trail of all state changes. Every modification is an event - perfect for compliance, financial applications, and gaming where provable fairness matters.

### Built-In APIs
Query your custom models and system models out of the box. Get real-time event streams or make request-response queries - all transports supported. Use **@easylayer/transport-sdk** (our open-source package) for easy integration - it provides abstractions for subscribing to event streams and making queries across all transport types.

### Cross-Platform
Works on servers, desktop applications, and browsers (with some limitations - browser extensions can run it without a server, but events stream differently).

### System Models Included
Two built-in models work out of the box:
1. **Network chain validation model**: Verifies chain integrity including Merkle trees
2. **Mempool model**: Monitors mempool data (disabled by default)

You can subscribe to their events immediately in your application.

## Quick Start

```bash
npm install @easylayer/bitcoin-crawler
# or
yarn add @easylayer/bitcoin-crawler
```

Ready to build your indexer? Check out the [documentation](/docs/bitcoin-crawler) for:
- Creating your first model
- Configuration and setup
- API usage and queries
- Working examples

## Use Cases

**Who needs this?**

- **Payment processors**: Track Bitcoin payments to addresses, monitor confirmations, process deposits
- **Wallets**: Sync transaction history, track balances, monitor UTXOs
- **Exchanges**: Process deposits and withdrawals with complete audit trails
- **Gaming platforms**: Monitor Bitcoin deposits and withdrawals with provable event history
- **Analytics platforms**: Build custom blockchain explorers, fee analyzers, UTXO set trackers
- **Compliance teams**: Maintain complete audit trails for all Bitcoin transactions
- **Mining pools**: Track block rewards, monitor pool statistics, calculate payouts

If you're paying for Bitcoin blockchain APIs or considering building a custom indexer, Bitcoin Crawler is your answer.

## Network Support

Bitcoin Crawler is specifically designed for Bitcoin and Bitcoin-like networks. You can run it on:
- Bitcoin (mainnet, testnet, regtest, signet)
- Bitcoin Cash
- Litecoin
- Dogecoin
- Possibly Zcash and other Bitcoin forks

**Expanding beyond Bitcoin**: We're also building crawlers for EVM-compatible chains, Solana, and TON. Need a specific network? Contact our team - we can prioritize networks based on demand.

## What's Next?

Ready to build your own blockchain indexer?

- **Read the [documentation](/docs)**: Detailed guides on models, configuration, and best practices
- **Check [examples](https://github.com/easylayer/easylayer/tree/main/packages/bitcoin-crawler/examples)**: Working projects you can adapt to your needs
- **Install the transport SDK**: `npm install @easylayer/transport-sdk` for easy client integration

For high-load read-side solutions with custom projections, contact our team - we build these on request.

## Join Our Community

- Join the conversation in our [GitHub discussions](https://github.com/easylayer/easylayer/discussions)
- Contribute to our [open-source development](https://github.com/easylayer)
- Follow us on [Twitter](https://twitter.com/easylayer) for updates

Welcome to Bitcoin Crawler. Build your blockchain indexer in minutes, not months. 🚀