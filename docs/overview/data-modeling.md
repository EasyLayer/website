---
title: 'Custom Data Models'
sidebar_label: 'Custom Data Models'
slug: /data-modeling
description: Learn how to define custom blockchain data models with EasyLayer's framework. Create efficient data structures, events, and parsing logic for your specific use case.
keywords: ['blockchain data modeling', 'custom data models', 'blockchain events', 'block parsing', 'EasyLayer framework', 'blockchain data extraction', 'event-driven architecture', 'DDD']
image: /img/el_twitter_default.png
---

# Custom Data Models

Custom data models are the heart of your blockchain indexer. They define what blockchain data you want to track, how to parse it from blocks, and how to store it efficiently.

---

## Why Custom Models?

Traditional blockchain indexers store everything - the entire blockchain, fully indexed. This approach has significant problems:

- **Massive storage costs**: Terabytes of data you probably don't need
- **Slow queries**: Searching through irrelevant data
- **High maintenance**: Managing huge databases
- **Expensive scaling**: More data = more servers

**EasyLayer's approach is different.** You describe exactly what data matters to your business, and the framework stores only that. This is possible because you define custom models that parse and extract just the relevant information from each block.

### Benefits of Custom Models

**Storage efficiency**: Track wallet balances? Your database might be just megabytes instead of terabytes.

**Query performance**: Smaller, focused datasets mean faster queries and better user experience.

**Easy scaling**: When each model handles one specific task, you can run multiple lightweight indexers as microservices. One tracks balances, another monitors fees, a third watches specific addresses - each on a small 2-4 vCPU server.

**Business-focused**: Your data structure matches your business logic, not blockchain internals.

## How Models Work

```
┌─────────────────────────────────────────────────────────────┐
│                    Bitcoin Crawler Flow                      │
└─────────────────────────────────────────────────────────────┘

  Blockchain Node
       │
       ▼
  ┌─────────┐
  │  Block  │◄────── Framework fetches blocks
  └─────────┘
       │
       ▼
  ┌──────────────────┐
  │   Your Model     │◄────── You define: what to parse
  │  - Parse block   │
  │  - Extract data  │
  │  - Create events │
  └──────────────────┘
       │
       ▼
  ┌──────────────────┐
  │  Event Store     │◄────── Framework stores events
  │  (SQLite/        │        (automatic)
  │   Postgres/      │
  │   IndexedDB)     │
  └──────────────────┘
       │
       ▼
  ┌──────────────────┐
  │   Transport      │◄────── Clients query/subscribe
  │  (HTTP/WS/IPC)   │        (automatic)
  └──────────────────┘
```

Your model receives each block and decides:
1. What data to extract (addresses, transactions, fees, etc.)
2. What events to generate (balance changed, payment received, etc.)
3. How to update state (current balances, UTXO set, etc.)

The framework handles everything else: fetching blocks, storing events, providing APIs, handling reorganizations.

## Model Structure

Every model has three key components:

### 1. State

The current data your model tracks. Examples:
- Map of addresses to balances
- List of unspent transaction outputs (UTXOs)
- Transaction counters
- Fee statistics

State is derived from events - when you replay all events, you reconstruct the current state.

### 2. Events

Changes that happen to your state. Examples:
- `WalletBalanceChanged`: When an address receives or spends Bitcoin
- `TransactionDetected`: When a transaction matches your criteria
- `FeeCalculated`: When you compute fee for a block

Events are immutable and stored permanently in Event Store. This gives you complete audit trail and ability to query historical state.

### 3. Block Processing Logic

Code that:
- Receives a block from the framework
- Parses transactions and outputs
- Extracts relevant data
- Generates events based on what changed

This is where you define your business logic - what data matters and how to extract it.

## Domain-Driven Design (DDD)

Models follow Domain-Driven Design principles, which organizes code around business concepts rather than technical structures. We've simplified DDD for blockchain use cases:

**Traditional approach**: Parse entire blockchain, store everything, query later
**DDD approach**: Define your domain (what you care about), parse only that, store only relevant state

This makes your code:
- Easier to understand (matches business logic)
- Easier to maintain (clear responsibilities)
- Easier to scale (separate domains = separate services)

## Two Ways to Define Models

You can define models in two ways:

### Class-Based Models

Full TypeScript classes with complete control. Best for:
- Complex business logic
- Custom validation and processing
- Advanced state management
- When you need full type safety

Example structure (conceptual):
```typescript
class MyModel extends Model {
  // Define state as class properties
  // Implement block processing
  // Define event handlers
  // Add custom methods
}
```

### Declarative Models

Configuration-based approach using objects. Best for:
- Simpler use cases
- Rapid prototyping
- Standard patterns (tracking, counting, filtering)
- Less boilerplate code

Example structure (conceptual):
```typescript
const MyModel: DeclarativeModel = {
  modelId: 'my-model',
  state: () => ({ /* initial state */ }),
  sources: { /* parsing logic */ },
  reducers: { /* event handlers */ },
  selectors: { /* query helpers */ }
}
```

Both approaches result in the same functionality - choose based on your needs and preferences.

## Querying Model Data

After your model processes blocks, data becomes available through Transport:

**Query current state**: Get latest balances, UTXO sets, statistics
**Query at specific height**: Get state as it was at block 850000
**Subscribe to events**: Receive real-time notifications when state changes
**Query event history**: See complete history of all state changes

All queries work through HTTP, WebSocket, IPC, or other configured transports.

## Historical and Real-Time Data

Models process both historical and real-time data seamlessly:

**Historical sync**: Start from block 0 (or any height) and process until current tip
**Real-time monitoring**: Once synced, process new blocks as they arrive
**No code changes**: Same model works for both modes

The framework handles:
- Fetching blocks from the node
- Maintaining sync position
- Switching from historical to real-time
- Handling blockchain reorganizations

## Event Store and Database

All events generated by your model go into the Event Store:

**Database options**:
- **SQLite**: Development, small projects, desktop apps
- **PostgreSQL**: Production, large datasets, high concurrency
- **IndexedDB**: Browser-based applications

**User controls database**: You configure connection settings, the framework manages schema and operations. Your data stays on your infrastructure.

**Automatic reorganization handling**: When blockchain reorganizes, the framework automatically rolls back events from orphaned blocks and replays the correct chain. Your state updates automatically - you can optionally subscribe to reorganization events for custom logic.

## CQRS Pattern

Bitcoin Crawler implements the "write side" of Command Query Responsibility Segregation:

**Write side (built-in)**:
- Parse blocks
- Generate events  
- Store in Event Store
- Maintain current state

**Read side (optional)**:
For small to medium applications, querying directly from write side works fine. For high-load scenarios with thousands of queries per second, you'll want to build a separate read side:

- Subscribe to event stream from your model
- Build optimized projections for your query patterns
- Store in databases optimized for reads (Elasticsearch, Redis, etc.)
- Scale read instances independently

This is easy because you can subscribe to the complete event stream and build any projections you need.

## Best Practices

### Keep Models Focused

One model = one responsibility:
- Wallet balance tracker (one model)
- Transaction fee analyzer (separate model)
- Address monitor (separate model)

Don't try to do everything in one model. Run multiple small indexers as microservices.

### Optimize for Your Use Case

Parse only what you need:
- Tracking 10 addresses? Filter early, store only relevant transactions
- Calculating fees? Extract fee data, ignore everything else
- Monitoring mempool? Focus on pending transactions only

### Consider Performance

- Small events = faster processing and storage
- Index frequently queried fields in your state
- For large datasets, use PostgreSQL instead of SQLite
- Monitor memory usage during historical sync

### Plan for Growth

Start with one model, add more as needed:
- Easy to deploy new indexers for new use cases
- Each runs independently on lightweight servers
- No need to rebuild existing indexers

## TypeScript for Models

Models are written in TypeScript (declarative approach also uses TypeScript configuration). This provides:
- Type safety during development
- Better IDE support and autocomplete
- Catch errors before runtime

Note: The model definition approach may evolve in future versions.

## Architecture Context

Understanding how models fit into the bigger picture:

**Models** define what to track
**Event Sourcing** provides audit trail and reorganization handling
**Network Providers** fetch blocks from blockchain nodes
**Transport** exposes data to clients
**Event Store** persists all events

Your model is the business logic - everything else is infrastructure that the framework provides.