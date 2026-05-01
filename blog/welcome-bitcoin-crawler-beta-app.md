---
title: "Introducing @easylayer/bitcoin-crawler: Own Your Bitcoin Data"
authors: [yarikp]
tags: [bitcoin, blockchain, easylayer, self-hosted, announcement]
date: 2025-04-01T10:30:00Z
description: Bitcoin Crawler gives your team live, self-updating Bitcoin state running on your own infrastructure. No third-party custody, no recurring data fees, no vendor lock-in.
keywords: ['bitcoin crawler', 'bitcoin data self-hosted', 'bitcoin state service', 'track bitcoin transactions', 'bitcoin utxo tracking', 'bitcoin payment monitoring self-hosted', 'bitcoin infrastructure']
image: /img/blog/main-default-img.png
---

Your application needs Bitcoin data. The question is not whether to build it; the question is where that data lives and who controls it.

`@easylayer/bitcoin-crawler` gives your team a live Bitcoin state service that runs on your own server, updates on every block, and keeps your data exactly where it belongs.

<!--truncate-->

## What It Does

Bitcoin Crawler is a real-time blockchain state service for Bitcoin and Bitcoin-compatible chains. You define what on-chain data your application needs to track. The framework reads every block from the connected node, keeps that state current, and handles chain reorganizations automatically.

Every new block updates your state immediately. When a reorg occurs, orphaned block events are rolled back and the correct chain is replayed. Your data is always consistent with the canonical chain without any reorg code in your application.

For teams that need to store large historical datasets beyond what fits in real-time state, the enterprise Read Model layer builds SQL or S3 projections on top of the same event stream. The Write Model (the open-source crawler) handles live state and is the source of truth. The Read Model handles scale.

## What You Can Build With It

**Payment processors.** Detect incoming deposits the moment they appear in a block. Subscribe to real-time confirmation events. Maintain per-address balance state without relying on third-party balance APIs.

**Wallet infrastructure.** Track UTXO sets for your user base. Show accurate, real-time balances. Query historical balance at any past block height for reconciliation or auditing.

**Mempool monitoring.** Enable optional mempool tracking to detect unconfirmed transactions before they confirm. Build pre-confirmation payment alerts, fee market dashboards, or double-spend detection.

**Analytics and compliance.** Maintain a complete, auditable record of on-chain activity relevant to your business. Query historical state at any point in time for reporting or regulatory requirements.

**Desktop and offline applications.** The crawler runs with SQLite storage and ships browser-safe bundles for IndexedDB. Build Electron desktop apps or browser extensions with local Bitcoin state, no server required.

## Supported Networks

Bitcoin Crawler works with the Bitcoin protocol family: Bitcoin (BTC), Bitcoin Cash (BCH), Litecoin (LTC), Dogecoin (DOGE), and other compatible networks. Switch networks through configuration with no code changes.

## Infrastructure Requirements

Running the Bitcoin Crawler does not require a full archive node. The crawler uses 2 RPC calls per block during historical sync, which means the QuickNode free tier covers millions of blocks at no cost.

Server requirements are modest: a 2 vCPU server with a few gigabytes of RAM handles most production workloads. For very large deployments tracking millions of addresses, scale to PostgreSQL and a larger server. Costs typically run from zero (free-tier provider, existing server) to under $20 per month.

Compare this to third-party Bitcoin data APIs, which charge per request and can cost hundreds of dollars per month at production volume. The cost difference compounds over time.

## How It Integrates

The crawler exposes data through five transports: HTTP RPC, WebSocket, IPC (parent/child process), Electron IPC, and Browser. Your existing application connects using `@easylayer/transport-sdk` with a unified API regardless of which transport you use.

For teams that need high-volume read access on top of the crawler state, the enterprise Read Model layer provides SQL projections optimized for thousands of concurrent queries. The write side and read side are separate; scale each independently.

## Getting Started

```bash
npm install @easylayer/bitcoin-crawler @easylayer/transport-sdk
```

Full documentation: [Bitcoin Crawler docs](/docs/get-started/bitcoin-crawler)

If you have questions or want to discuss your use case before starting: [GitHub Discussions](https://github.com/easylayer/core/discussions)
