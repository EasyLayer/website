---
title: "Welcome to EasyLayer: Blockchain State That Lives on Your Server"
authors: [yarikp]
tags: [blockchain, easylayer, welcome, self-hosted, open-source]
date: 2025-03-15T10:30:00Z
description: EasyLayer is an open-source framework for building self-hosted blockchain state services. Your data, your server, no recurring fees. Here is why we built it and what is available now.
keywords: ['EasyLayer', 'blockchain state service', 'self-hosted blockchain', 'open source blockchain', 'bitcoin state', 'ethereum state', 'blockchain developer tools']
image: /img/blog/main-default-img.png
---

Blockchain data should be as easy to work with as any other backend data store. In 2025, it still is not. This post explains what EasyLayer is, why it exists, and what is available today.

<!--truncate-->

## The Problem

When a developer needs live blockchain data in their application, they face a short list of options that all come with significant trade-offs.

Third-party blockchain APIs are fast to set up. They are also expensive at scale, opaque about their infrastructure, and put your data under someone else's control. When an API goes down, your product goes down with it. When pricing changes, your unit economics change with it.

Running a full node solves the control problem. It creates a different one: months of engineering to build sync infrastructure, reorg handling, storage management, and query APIs before you have written a single line of product logic.

Cloud indexing services like The Graph occupy a middle ground. They work well for querying public protocol data from well-known smart contracts. They are not built for Bitcoin. They are not built for custom state logic. And your data still lives on their infrastructure.

## What EasyLayer Is

EasyLayer is a framework for building real-time blockchain state services. You define what on-chain data to track. The framework keeps that state live and consistent on every new block, with automatic reorganization handling built in. It is also self-hosted: the service runs on your server, your data stays on your infrastructure.

The core idea: you tell the framework what matters to your application. Wallet balances, contract events, UTXOs, fee statistics, anything. It reads every block from the connected node, updates your state, and keeps it consistent through chain reorgs without any intervention from you. State changes are stored as an immutable event log, so you can also query what the state looked like at any past block height.

Your application reads the live state over HTTP, WebSocket, IPC, or a browser transport. The same framework works in server applications, Node.js microservices, Electron desktop apps, and browser extensions.

**Write Model and Read Model.** The open-source crawler is the Write Model: real-time state, mempool monitoring, Event Sourcing. For teams that need to store large datasets like full chain history or all on-chain addresses, the enterprise Read Model builds SQL or S3 projections on top of the same event stream and handles unlimited data volume. Most developers start with the Write Model and only reach for the Read Model when their dataset grows beyond what fits comfortably in process memory.

## What Is Available

**@easylayer/bitcoin-crawler** tracks state on Bitcoin and Bitcoin-compatible chains: BTC, BCH, LTC, DOGE, and others. It includes mempool monitoring for real-time unconfirmed transaction tracking.

**@easylayer/evm-crawler** does the same for Ethereum and EVM-compatible chains: Ethereum mainnet, BSC, Polygon, Arbitrum, Optimism, Base, and any other EVM chain. It supports logs, receipts, and traces.

**@easylayer/transport-sdk** is the client library for connecting your application to either crawler. It provides a single API over HTTP, WebSocket, IPC, and Electron transports.

All three packages are in public beta on npm. The core framework is open source and will remain free.

## The Business Model

The open-source framework is the complete product. You can build production applications with it at no cost.

For teams that need managed infrastructure, SQL read models for high-volume query workloads, or direct engineering support, we offer enterprise services. The open-source community gets working tools. Companies that need more pay for that layer.

## Come Help Test

The tools are built. What I need now is developers using them on real projects to find what breaks, what is confusing, and what is missing.

If you are building anything that needs blockchain data, come to [GitHub Discussions](https://github.com/easylayer/core/discussions). Tell me what you are working on. I will help you get it running.
"