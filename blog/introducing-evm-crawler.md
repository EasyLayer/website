---
title: "Introducing @easylayer/evm-crawler: Live Ethereum State on Your Infrastructure"
authors: [yarikp]
tags: [ethereum, evm, blockchain, easylayer, self-hosted, announcement]
date: 2025-04-15T10:30:00Z
description: EVM Crawler gives your team live, self-updating state for Ethereum, BSC, Polygon, and any EVM-compatible chain. Your data, your server, no recurring fees.
keywords: ['evm crawler', 'ethereum state self-hosted', 'ethereum indexer', 'smart contract events self-hosted', 'alternative to the graph', 'evm blockchain data', 'self-hosted ethereum', 'polygon indexer', 'bsc indexer']
image: /img/blog/main-default-img.png
---

EVM chains generate enormous amounts of data: transactions, logs, receipts, traces. Most teams access this data through third-party services that charge per query, impose rate limits, and hold the data on their infrastructure.

`@easylayer/evm-crawler` gives you an alternative: a live state service running on your own server, updated on every block, serving your application directly.

<!--truncate-->

## What It Does

EVM Crawler is a real-time blockchain state service for Ethereum and EVM-compatible chains. You define what on-chain data your application needs. The framework reads every block, keeps that state current, and handles chain reorganizations automatically.

Every new block updates your state immediately. When the chain reorganizes, which happens on Ethereum mainnet and frequently on L2 chains, orphaned block events are rolled back and the correct chain is replayed. Your state stays accurate without any reorg code in your application.

For teams that need to store large historical datasets like all contract events across an entire chain or full token transfer history, the enterprise Read Model layer builds SQL or S3 projections on top of the same event stream. The open-source crawler handles real-time state. The Read Model handles scale.

## What You Can Build With It

**Smart contract event indexing.** Index events from any contract without deploying a subgraph or paying per query. Define exactly which events matter and how they update your application state.

**DeFi protocol monitoring.** Track liquidity positions, swap events, lending protocol state. Maintain derived metrics like TVL, APY, or user position summaries in your own database.

**Token balance tracking.** Maintain ERC-20 balances for your users or for any address set. Query balances at the current block or at any historical height.

**NFT and token activity.** Track transfers, mints, and burns for specific contracts. Maintain ownership state, trading history, or rarity metrics.

**Multi-chain applications.** Run separate crawler instances for different chains, or monitor the same contract across multiple EVM networks simultaneously.

**Compliance and auditing.** Maintain a complete, time-ordered record of on-chain activity relevant to your business. Query historical state at any past block for reconciliation, reporting, or regulatory requirements.

## Supported Networks

The EVM Crawler is generic. It works with any EVM-compatible chain by setting the chain ID and RPC endpoint. Tested networks include Ethereum mainnet, BNB Smart Chain, Polygon, Arbitrum One, Optimism, and Base. Any other EVM chain with standard RPC support will work.

## How It Differs From The Graph

The Graph and similar services are cloud platforms. Your indexed data lives on their infrastructure. You pay for queries. Their schema system determines how you can structure your data.

The EVM Crawler runs on your server. Your data stays in your PostgreSQL or SQLite. There are no query fees. You define your state model in TypeScript with full control over structure and business logic. Historical point-in-time queries at any block height are included by default. Desktop and browser deployments are supported.

The right choice depends on your requirements. Cloud indexing is fast to start and works well for querying public protocol data. Self-hosted is better when you need control, custom logic, data sovereignty, or want to avoid recurring costs.

## Infrastructure Requirements

The EVM Crawler works with any standard Ethereum JSON-RPC endpoint: Infura, Alchemy, your own node, or any provider that supports the standard API. Free tiers on major providers cover typical development and moderate production usage.

Server costs for production: zero to around $20 per month depending on dataset size and query volume. Compare this to query-based pricing on cloud indexing services, which can reach hundreds of dollars per month at scale.

## Getting Started

```bash
npm install @easylayer/evm-crawler @easylayer/transport-sdk
```

Full documentation: [EVM Crawler docs](/docs/get-started/evm-crawler)

Questions or want to talk through your use case: [GitHub Discussions](https://github.com/easylayer/core/discussions)
