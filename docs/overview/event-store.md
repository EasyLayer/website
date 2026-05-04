---
title: 'Event Store and Databases'
sidebar_label: 'Event Store and Databases'
slug: /event-store
description: EasyLayer stores all state changes as an immutable event log. Choose SQLite, PostgreSQL, or IndexedDB. Query state at any block height. Reorgs handled automatically.
keywords: ['event store', 'sqlite blockchain', 'postgresql blockchain', 'indexeddb blockchain', 'blockchain database', 'event sourcing blockchain', 'blockchain reorg', 'immutable event log']
image: /img/el_twitter_default.png
---

# Event Store and Databases

The Event Store is where EasyLayer persists all state changes. Every block your model processes produces events. Those events are stored in an append-only log. Your model's current state is always reconstructable by replaying that log.

This design is what makes historical queries and automatic reorg handling possible.

---

## How It Works

When a block arrives, your state model processes it and calls `applyEvent()` for relevant changes. The framework:

1. Writes each event to the log with its block height and sequence number
2. Applies the event to reconstruct current state
3. Makes the updated state available for queries

When a blockchain reorganization occurs, the framework reverses events from orphaned blocks in reverse order, then replays events from the canonical chain. State becomes consistent again without any action from your code.

---

## Storage Options

### SQLite

Default option. Zero configuration, file-based, no extra services to run.

```bash
EVENTSTORE_DB_TYPE=sqlite
EVENTSTORE_DB_NAME=./data/eventstore   # folder path
```

Best for: development, small projects, desktop applications, up to a few million events.

### PostgreSQL

For production workloads, large datasets, or applications that need concurrent reads.

```bash
EVENTSTORE_DB_TYPE=postgres
EVENTSTORE_DB_NAME=myapp_events
EVENTSTORE_DB_HOST=localhost
EVENTSTORE_DB_PORT=5432
EVENTSTORE_DB_USERNAME=app
EVENTSTORE_DB_PASSWORD=secret
```

The framework manages the schema automatically. You manage the database server.

### IndexedDB (Browser)

For browser extensions and Electron desktop apps. Uses `sql.js` (SQLite compiled to WebAssembly) with IndexedDB as the persistence layer.

```bash
EVENTSTORE_DB_TYPE=indexeddb
```

No server required. The state service runs entirely in the browser process.

---

## Querying Historical State

Because events are stored with block heights, you can reconstruct what the state looked like at any point in the past:

```ts
// What was the state at block 850000?
const result = await client.query('GetModelsQuery', {
  modelIds: ['wallet-tracker'],
  filter: { blockHeight: 850000 },
});
```

This works for any block the crawler has processed. Useful for:

- Auditing: prove what a balance was at a specific date
- Debugging: investigate what happened at a specific block
- Analytics: compute metrics at different points in time

---

## Reorg Handling in Detail

Blockchain reorganizations are a normal part of how Bitcoin and EVM chains work. EasyLayer handles them automatically:

1. Crawler detects that a new block's parent hash doesn't match the last indexed block
2. The framework identifies the divergence point
3. Events from all orphaned blocks are reversed in reverse order (reducers applied in reverse)
4. Events from the new canonical chain are applied
5. State is consistent again

This works for reorgs of any length. Your application code does not change.

---

## Schema Management

The framework creates and migrates the event store schema automatically. You do not write migrations. On startup, the framework checks the schema version and updates it if needed.

You can inspect the event log directly in SQLite or PostgreSQL using standard database tools. The schema is documented in the repository.

---

## Storage Size Estimates

| Use case | Events per block | 1M blocks |
|---|---|---|
| Tracking 1000 Bitcoin addresses | 0-50 | ~500 MB SQLite |
| ERC-20 Transfer index (1 contract) | 0-500 | a few GB PostgreSQL |
| Full UTXO set tracking | 1000-5000 | large, use PostgreSQL |

For very large datasets, consider the enterprise Read Model layer which uses SQL projections optimized for high-volume reads. See [Enterprise](/enterprise).

---

## Related

- [State Models](/docs/data-modeling) — what produces events
- [Transport Layer](/docs/transport-layer) — how to query your state
- [System Models](/docs/system-models) — built-in events you can subscribe to
