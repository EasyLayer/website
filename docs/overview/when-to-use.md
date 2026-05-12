---
title: When to Use EasyLayer
slug: /when-to-use
sidebar_label: When to Use
description: Decide whether EasyLayer is the right fit for a blockchain data workflow.
keywords: ['when to use EasyLayer', 'blockchain indexer framework', 'self-hosted blockchain state service']
image: /img/el_twitter_default.png
---

# When to Use EasyLayer

Use EasyLayer when blockchain state is part of your product and you need to control what state is stored, how it is updated, and where the service runs.

## Good fit

EasyLayer is a good fit when you need one or more of these:

| Need | Why EasyLayer helps |
|---|---|
| Custom blockchain state | You define the model instead of accepting a generic dataset. |
| Focused storage | The application can persist model-specific events/state instead of unrelated full-chain data. |
| Reorg-aware workflows | State changes are event-based, so rollback/replay is part of the runtime model. |
| Self-hosted runtime | Data and infrastructure stay under your control. |
| Live events | Models can emit events and clients can subscribe through transports. |
| Desktop/browser integration | Transport options include Electron IPC and browser/shared-worker runtime paths. |
| Backend integration | HTTP, WebSocket, and IPC give multiple ways to connect services. |

## Concrete examples

Use EasyLayer for workflows like:

- monitor one EVM contract and expose its current product state;
- track selected wallets instead of indexing every wallet on-chain;
- maintain a focused UTXO view for a Bitcoin wallet application;
- keep protocol-specific counters or status from blocks/logs;
- run a crawler inside a desktop application and query it from the UI;
- stream model events into another service without building the delivery layer from scratch.

## Not the best first step

EasyLayer is probably not the first tool to use when:

- you only need a simple hosted balance lookup;
- you do not want to operate any runtime yourself;
- your required chain is not supported by current packages;
- you need a finished managed SaaS/SLA without custom agreement;
- your actual goal is a full analytics warehouse before you have defined the state model.

## Decision check

Before implementing, answer these questions:

```text
1. What exact state do we need to maintain?
2. Which chain/network produces that state?
3. Do we need live updates, historical reads, or both?
4. Which application will consume the state?
5. Which transport fits that application?
6. What is the smallest model that proves the idea?
```

If the answers are still vague, start with a smaller model. EasyLayer works best when the state boundary is clear.

## Next

- [State Models](/docs/data-modeling)
- [EventStore](/docs/event-store)
- [Network Providers](/docs/network-providers)
