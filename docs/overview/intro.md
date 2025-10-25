---
id: intro
title: Introduction to EasyLayer
slug: /
sidebar_label: Introduction
description: Learn about EasyLayer's self-hosted blockchain frameworks for developers. Build custom blockchain indexers and parsers with TypeScript-based tools.
keywords: ['blockchain frameworks', 'self-hosted', 'TypeScript', 'blockchain indexer', 'blockchain parser', 'data indexing', 'event sourcing', 'CQRS', 'Bitcoin', 'real-time blockchain data']
image: /img/el_twitter_default.png
---

Welcome to EasyLayer, a suite of **self-hosted blockchain frameworks** built with [TypeScript](https://www.typescriptlang.org) and powered by [Node.js](https://nodejs.org). Our mission is simple: make blockchain data integration so straightforward that developers can focus entirely on their business logic instead of wrestling with complex infrastructure.

## What We Build

EasyLayer creates frameworks distributed through npm that let you build custom blockchain indexers and parsers. You install the package, describe what data you need in a model, and deploy on your own infrastructure. We handle the intricate blockchain mechanics—node connections, block processing, reorganizations, and state management.

Currently, our ecosystem includes:

- **Blockchain Crawlers**: Frameworks for building custom indexers that monitor and parse blockchain data (Bitcoin, and more coming soon)
- **Transport SDK**: Client library for easy integration with crawler applications across all transport protocols

Our frameworks use Event Sourcing architecture, storing every state change as an immutable event. This provides complete audit trails, automatic blockchain reorganization handling, and the ability to reconstruct any past state. We support SQLite, PostgreSQL, and IndexedDB as storage backends.

## Core Features

### Self-Hosted & Cost-Effective
Deploy on your infrastructure with complete control. No vendor lock-in, no recurring API fees that scale with usage. Run on lightweight servers (2-4 vCPUs) and save money compared to third-party blockchain APIs.

### Custom Data Models
Define exactly what blockchain data matters to your business using simple TypeScript models. Track specific addresses, monitor transaction fees, or parse scripts—store only what you need, not the entire blockchain. This dramatically reduces storage costs and speeds up queries.

### Real-Time & Historical Data
Process blockchain data from any block height—genesis block, recent history, or current tip. Crawlers handle both historical backfilling and real-time monitoring seamlessly through the same interface. Add mempool monitoring to track unconfirmed transactions in real-time.

### Minimal Node Requests
Optimized for cost efficiency: just **2 RPC requests per block** (plus periodic height checks). This means you can use external providers like QuickNode without exceeding free tier limits, or run your own node with minimal load.

### Automatic Reorganization Handling
Blockchain reorgs are handled automatically through Event Sourcing. When a fork occurs, the system rolls back events from orphaned blocks and replays the correct chain. Your data stays consistent without any manual intervention.

### Multiple Transports
Access your data through various protocols:
- **HTTP RPC**: Request-response queries
- **WebSocket**: Real-time event streams and queries
- **IPC**: Inter-process communication for Node.js applications
- **Electron**: Desktop application support
- **Browser**: Limited support for browser extensions

All transports use the same message format and APIs—switch between them without code changes.

### Cross-Platform Support
Works on servers, desktop applications, and browsers:
- **Server**: Production deployments with PostgreSQL
- **Desktop**: Offline-capable applications with SQLite
- **Browser**: Extensions and privacy-focused apps with IndexedDB

### Event Sourcing Architecture
Every state change is stored as an event, providing:
- Complete audit trails (perfect for fintech, gaming, compliance)
- Full history of all state changes
- Ability to query state at any past block height
- Automatic rollback and replay during reorganizations
- Scalable architecture with CQRS pattern

## Network Support

**Currently available:**
- **Bitcoin Crawler**: Bitcoin and Bitcoin-like networks (Bitcoin Cash, Litecoin, Dogecoin, and forks)

**Coming soon:**
- EVM-compatible chains crawler
- Solana crawler
- TON crawler

Need a specific network prioritized? [Contact our team](https://github.com/easylayer/easylayer/discussions).

## Architecture & Technology

Our frameworks utilize modern architectural patterns:

- **Event Sourcing**: Complete audit trail and state reconstruction capabilities
- **Command Query Responsibility Segregation (CQRS)**: Separate write and read operations for optimal performance
- **Domain-Driven Design (DDD)**: Business logic organization that scales with complexity

This foundation ensures solutions are maintainable, testable, and extensible for enterprise use. The "write side" (parsing and indexing) is built into crawlers. For high-load scenarios, you can build custom "read side" with optimized projections.

## Getting Started

Ready to build your blockchain indexer? Check out our [tools documentation](/docs/get-started) to choose the right framework for your needs and start building.

## Use Cases

**Who uses EasyLayer?**

- **Payment processors**: Track Bitcoin payments, monitor confirmations, process deposits
- **Wallets**: Sync transaction history, track balances and UTXOs
- **Exchanges**: Process deposits/withdrawals with complete audit trails
- **Gaming platforms**: Monitor blockchain-based payments with provable fairness
- **Analytics platforms**: Build custom explorers, fee analyzers, UTXO trackers
- **Compliance teams**: Maintain complete audit trails for regulatory requirements
- **DeFi protocols**: Index smart contract events (coming with EVM crawler)

## Community

EasyLayer is an open-source project built on transparency and collaboration. Join our growing community:

- **GitHub Discussions**: Share ideas and get help in our [forum](https://github.com/easylayer/easylayer/discussions)
- **Blog**: Stay updated with developments on our [blog](https://easylayer.io/blog)
- **Twitter**: Follow [@easylayer](https://twitter.com/easylayer) for updates

## Support

**Community Support (Free):**
- GitHub Discussions for questions and issues
- Open-source documentation and examples
- Community-driven troubleshooting

**Enterprise Support (Paid):**
- Priority assistance and direct expert access
- Custom read-side solutions for high-load scenarios
- Custom network implementations
- Architecture consulting

This model sustains the project while ensuring the community always has access to free, high-quality tools.

## Philosophy

EasyLayer is built on three foundational principles:

### Simplicity
Blockchain data should be accessible to all developers, not just cryptography experts. By abstracting complex mechanisms behind simple model definitions, we enable developers to build solutions in minutes instead of months.

### Cost-Efficiency
Why pay recurring API fees or maintain expensive infrastructure? Self-hosted frameworks with minimal node requests mean you can run production indexers on small servers or free provider tiers.

### Flexibility
Every business has unique needs. Our framework approach—where you define only the data model—ensures you can build exactly what you need without unnecessary complexity or storage overhead.

By combining these principles with proven architectural patterns (Event Sourcing, CQRS) and modern technology, EasyLayer empowers developers to build blockchain applications with confidence and speed.