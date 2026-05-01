---
title: 'System Models'
sidebar_label: 'System Models'
slug: /system-models
description: EasyLayer ships built-in system models for chain validation and mempool monitoring. Subscribe to their events and query their state without writing any model code.
keywords: ['system models', 'blockchain chain validation', 'built-in blockchain models', 'easylayer system events', 'network model', 'mempool model']
image: /img/el_twitter_default.png
---

# System Models

EasyLayer includes built-in models that run automatically alongside your custom models. They handle chain integrity monitoring and mempool state out of the box. You can subscribe to their events and query their state without writing any model code.

---

## Network Chain Model

The Network Chain Model tracks the state of the blockchain as the crawler sees it. It runs on every crawler instance.

**What it does:**

- Maintains the current chain tip: block height, hash, and timestamp
- Detects and records blockchain reorganizations as they happen
- Optionally validates block headers using Merkle proofs

**Events it emits:**

| Event | When | Payload |
|---|---|---|
| `BitcoinNetworkInitializedEvent` | Crawler starts | chain info, start height |
| `BitcoinNetworkBlocksAddedEvent` | New blocks confirmed | block heights, hashes |
| `BitcoinNetworkReorganizedEvent` | Reorg detected and resolved | orphaned blocks, new blocks |
| `EvmNetworkInitializedEvent` | EVM crawler starts | chain ID, start block |
| `EvmNetworkBlocksAddedEvent` | New EVM blocks confirmed | block numbers, hashes |
| `EvmNetworkReorganizedEvent` | EVM reorg detected | orphaned and new blocks |

**Subscribing:**

```ts
client.subscribe('BitcoinNetworkBlocksAddedEvent', (event) => {
  console.log('New blocks:', event.payload.blocks.map(b => b.height));
});

client.subscribe('BitcoinNetworkReorganizedEvent', (event) => {
  console.log('Reorg! Orphaned:', event.payload.orphanedBlocks.length, 'blocks');
});
```

**Querying chain state:**

```ts
const stats = await client.query('GetNetworkStatsQuery');
console.log(stats.currentHeight, stats.syncProgress);

const latest = await client.query('GetNetworkLastBlockQuery');
console.log(latest.height, latest.hash);
```

---

## Mempool Model

The Mempool Model is available when mempool monitoring is enabled. It maintains a snapshot of current pending transactions.

**What it does:**

- Polls the connected node for mempool contents on a configurable interval
- Emits a refresh event on every poll
- Tracks which mempool transactions get confirmed vs dropped

**Events it emits:**

| Event | When | Payload |
|---|---|---|
| `BitcoinNetworkMempoolRefreshedEvent` | Each mempool poll | list of pending transactions |
| `EvmMempoolRefreshedEvent` | Each EVM mempool poll | list of pending transactions |

**Subscribing:**

```ts
client.subscribe('BitcoinNetworkMempoolRefreshedEvent', (event) => {
  const { transactions } = event.payload;
  console.log(`${transactions.length} unconfirmed transactions in mempool`);
});
```

See [Mempool Monitoring](/docs/mempool-monitoring) for configuration and custom model integration.

---

## Merkle Validation (Bitcoin)

Optionally enable Merkle proof validation to cryptographically verify that each block's transactions match its header commitment. Useful for high-integrity deployments where you want to catch any data integrity issues.

```bash
BITCOIN_MERKLE_VALIDATION=true
```

When enabled, the crawler verifies every block before processing it. Invalid blocks are rejected and the crawler reconnects to the provider.

---

## Using System Events in Your App

System events use the same transport as your custom model events. You subscribe with the same `client.subscribe()` call. No extra configuration needed.

Common patterns:

- Listen to `BlocksAdded` to trigger downstream processing in your own service
- Listen to `Reorg` events to invalidate caches or send alerts
- Poll `GetNetworkStatsQuery` to display sync progress in a dashboard
- Use `GetNetworkLastBlockQuery` to check crawler health in a monitoring endpoint

---

## Related

- [Transport Layer](/docs/transport-layer) — how to subscribe and query
- [Mempool Monitoring](/docs/mempool-monitoring) — detailed mempool configuration
- [Event Store](/docs/event-store) — how system events are stored alongside custom events
