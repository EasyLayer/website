---
title: 'System Models'
sidebar_label: 'System Models'
slug: /system-models
description: Learn about built-in system models in EasyLayer's Bitcoin Crawler. Understand network chain validation and mempool monitoring models included out of the box.
keywords: ['system models', 'network validation', 'mempool model', 'blockchain integrity', 'chain validation', 'built-in models', 'Bitcoin crawler']
image: /img/el_twitter_default.png
---

# System Models

Bitcoin Crawler includes built-in system models that provide essential blockchain monitoring functionality out of the box. Use them without writing any model code - just subscribe to their events and query their state.

---

## What are System Models?

System models are pre-built models that handle common blockchain monitoring tasks:

1. **Network Chain Validation Model**: Validates blockchain integrity and manages chain state
2. **Mempool Model**: Monitors unconfirmed transactions (when enabled)

These models:
- Work automatically when you start Bitcoin Crawler
- Generate events you can subscribe to
- Maintain state you can query
- Follow same patterns as custom models

## System Models Architecture

```
┌──────────────────────────────────────────────────────────┐
│              System Models in Framework                   │
└──────────────────────────────────────────────────────────┘

Blockchain Node
       │
       ▼
┌─────────────────────┐
│  Network Provider   │  Fetches blocks and mempool
└─────────────────────┘
       │
       ├──────────────────┬──────────────────┐
       ▼                  ▼                  ▼
┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│   Network      │  │    Mempool     │  │  Your Custom   │
│     Model      │  │     Model      │  │     Models     │
│  (built-in)    │  │  (built-in)    │  │   (your code)  │
└────────────────┘  └────────────────┘  └────────────────┘
       │                  │                      │
       └──────────────────┴──────────────────────┘
                          ▼
                  ┌──────────────────┐
                  │   Event Store    │
                  └──────────────────┘
                          │
                          ▼
                  ┌──────────────────┐
                  │    Transport     │
                  └──────────────────┘
```

## Network Chain Validation Model

Validates blockchain chain integrity and maintains a validated block chain window in memory.

### Purpose

The Network Model:
- Verifies each block connects to previous block
- Validates Merkle tree roots (Bitcoin-specific)
- Detects blockchain reorganizations
- Maintains sliding window of recent blocks
- Provides validated block data for queries

### What It Tracks

**Chain state**:
- Current number of blocks in memory
- Latest block height
- First block height in window
- Chain validity status

**Block data**:
- Recent blocks with full data
- Block hashes and headers
- Transaction data

**Validation status**:
- Whether chain is valid
- Whether Merkle trees verified
- Reorganization history

### Events Generated

**Block Added**:
- New block validated and added to chain
- Contains block height, hash, transactions
- Emitted after passing all validations

**Block Removed**:
- Block removed during reorganization
- Contains removed block height and hash
- Part of reorg process

**Reorganization Detected**:
- Blockchain fork detected and handled
- Contains fork point and affected blocks
- Informational (state already corrected)

**Chain Initialized**:
- Network model started
- Contains initial configuration

### Chain Validation Process

```
┌──────────────────────────────────────────────────────────┐
│            Network Validation Flow                        │
└──────────────────────────────────────────────────────────┘

New Block Arrives
       │
       ▼
┌──────────────────┐
│ Verify block     │  Check hash connects to previous
│ links to chain   │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Validate Merkle  │  Verify Merkle root (if enabled)
│    tree          │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Add to chain    │  Store in validated chain window
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Emit BlockAdded  │  Notify subscribers
│     event        │
└──────────────────┘
```

### Reorganization Handling

```
┌──────────────────────────────────────────────────────────┐
│         Reorganization Detection & Handling               │
└──────────────────────────────────────────────────────────┘

Detect fork:
  Current chain: ... → Block 100 → Block 101 → Block 102
  Node's chain:  ... → Block 100 → Block 101 → Block 102'
       │
       ▼
Identify fork point: Block 101 (last common)
       │
       ▼
Roll back:
  - Emit BlockRemoved for Block 102
  - Remove from chain window
       │
       ▼
Replay:
  - Fetch Block 102' from node
  - Validate new block
  - Emit BlockAdded for Block 102'
       │
       ▼
Emit ReorganizationDetected event
  - Contains fork point
  - Lists affected blocks
       │
       ▼
Chain now matches node's chain
```

**Important**: Your model states automatically update during reorg. The reorganization event is informational - for logging or custom business logic only.

### Merkle Tree Validation

For Bitcoin and Bitcoin-like chains:

**What it validates**:
- Merkle root in block header matches calculated root
- Transaction hashes form valid Merkle tree
- Ensures block data integrity

**Why it matters**:
- Detects corrupted block data
- Ensures data from node is valid
- Additional verification layer

**Configuration**:
- Enabled by default
- Can be disabled for performance
- Recommended to keep enabled for production

**Performance**: Minimal impact on modern servers

### Querying Network Model

Through Transport APIs:

**Get network statistics**:
- Current chain size
- Block height range
- Validity status
- Chain window info

**Get specific block**:
- Query by height
- Returns block if in chain window
- Includes full transaction data

**Get multiple blocks**:
- Last N blocks
- All blocks in window
- Range queries

**Get last block**:
- Most recent validated block
- Latest height and data

All queries work through HTTP, WebSocket, IPC, or other configured transports.

### Using Network Events

Subscribe to network events in your applications:

**Monitor new blocks**:
- React when blocks are added
- Update UI or trigger processing
- Log block information

**Handle reorganizations**:
- Get notified of reorgs
- Implement custom logging
- Alert on unusual activity
- Note: your state already correct

**Track chain status**:
- Monitor chain validity
- Alert if validation fails
- Track chain growth

**Use in custom models**:
- Your models can subscribe to network events
- Build logic on top of validated blocks
- Leverage chain validation

## Mempool Model

Monitors unconfirmed transactions in mempool. **Disabled by default** - must be enabled in configuration.

### Purpose

The Mempool Model:
- Tracks pending transactions before confirmation
- Monitors transaction additions and removals
- Handles multiple mempool sources
- Provides real-time mempool state
- Generates events for mempool changes

### What It Tracks

**Mempool state**:
- Total transaction IDs tracked
- Number of fully loaded transactions
- Synchronization status
- Performance metrics

**Transaction data**:
- Transaction IDs in mempool
- Full transaction details (when loaded)
- Fee rates and sizes
- Input/output data

**Load status**:
- Which transactions are fully loaded
- Which are ID-only (below fee threshold)
- Load timestamps

### Events Generated

**Transaction Added**:
- New transaction appeared in mempool
- Contains transaction ID
- Initial detection event

**Transaction Loaded**:
- Transaction details fully fetched
- Contains complete transaction data
- Follows Added event

**Transaction Removed**:
- Transaction left mempool
- Reason: confirmed in block or dropped
- Contains confirmation height (if confirmed)

**Transaction Updated**:
- Transaction status changed
- Example: RBF replacement
- Contains updated data

**Mempool Initialized**:
- Mempool monitoring started
- Contains initial configuration

### Mempool Monitoring Flow

```
┌──────────────────────────────────────────────────────────┐
│           Mempool Monitoring Process                      │
└──────────────────────────────────────────────────────────┘

Poll mempool (every ~10 seconds)
       │
       ▼
┌──────────────────┐
│ Fetch mempool    │  Get list of transaction IDs
│ transaction IDs  │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Compare with     │  Find new transactions
│ known txids      │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Emit Transaction │  For each new transaction
│ Added event      │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Load details     │  Fetch transaction data
│ (if fee >= min)  │  (filtered by fee rate)
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Emit Transaction │  After details loaded
│ Loaded event     │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Track until      │  Monitor for confirmation
│ confirmed/dropped│  or removal from mempool
└──────────────────┘
```

### Configuration

**Enable mempool monitoring**:
- Disabled by default
- Enable in configuration
- Works only through RPC providers

**Settings**:
- Sync strategy threshold
- Minimum fee rate filter
- Multiple provider URLs (optional)

See Mempool Monitoring documentation for detailed configuration.

### Querying Mempool Model

Through Transport APIs:

**Get mempool statistics**:
- Total transactions tracked
- Loaded transaction count
- Synchronization status
- Performance metrics

**Get all transactions**:
- Filter by load status
- Stream large datasets
- Batch processing

**Get transaction IDs**:
- With or without load info
- Stream for large mempools

**Check specific transaction**:
- Verify if in mempool
- Get load status
- Retrieve details

### Using Mempool Events

Subscribe to mempool events in your applications:

**Track pending payments**:
- Detect incoming transactions
- Show pending status in UI
- Monitor until confirmed

**Analyze fee market**:
- Track fee distributions
- Calculate fee estimates
- Monitor market changes

**Build transaction tools**:
- Identify stuck transactions
- Track replacements (RBF)
- Monitor confirmation times

**Use in custom models**:
- Subscribe to mempool events
- Filter by your criteria
- Maintain pending state
- Update when confirmed

### Performance Considerations

**Request volume**:
- Significantly higher than block processing
- Multiple providers multiply requests
- Monitor rate limits carefully

**Memory usage**:
- Tracks many transactions in memory
- Consider for large mempools
- Filter with minimum fee rate

**Event frequency**:
- High event rate during busy periods
- Can be thousands of events per minute
- Filter aggressively in your code

See Mempool Monitoring documentation for optimization strategies.

## Using System Models

### In Your Applications

**Subscribe to events**:
- Network events for block monitoring
- Mempool events for pending transactions
- React to state changes

**Query state**:
- Get current chain status
- Check mempool statistics
- Retrieve specific blocks or transactions

**Build on top**:
- Use system events as triggers
- Combine with your custom logic
- Leverage validated data

### In Custom Models

Your custom models can use system model events:

**React to network events**:
- Process blocks after validation
- Handle reorganizations
- Use validated chain data

**React to mempool events**:
- Track pending transactions
- Filter by your criteria
- Maintain pending balances

**Combine with custom logic**:
- Add business rules
- Filter and transform
- Store relevant data only

This gives complete control over how system data affects your business logic.

## Best Practices

### Network Model

**Always available**: Works automatically, no configuration needed

**Subscribe to reorg events**: For logging and monitoring

**Don't store block data**: Query from network model instead

**Monitor chain validity**: Alert if isValid becomes false

### Mempool Model

**Enable only if needed**: Increases costs and complexity

**Filter aggressively**: Don't process every transaction

**Set appropriate fee threshold**: Ignore very low-fee transactions

**Monitor request volume**: Much higher than block processing

**Separate pending state**: Keep mempool data separate from confirmed

## Architecture Context

System models integrate with all framework components:

**Network Providers** fetch data → **System Models** process
**System Models** generate events → **Event Store** persists
**Transport** exposes → **Clients** query and subscribe
**Custom Models** can use → **System Model events** as triggers

System models provide foundation - you build business logic on top.