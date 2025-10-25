---
title: 'Mempool Monitoring'
sidebar_label: 'Mempool Monitoring'
slug: /mempool-monitoring
description: Learn how to monitor Bitcoin mempool with EasyLayer's framework. Track unconfirmed transactions in real-time, analyze fee markets, and detect pending payments.
keywords: ['mempool monitoring', 'unconfirmed transactions', 'Bitcoin mempool', 'pending transactions', 'transaction fees', 'real-time blockchain', 'payment detection']
image: /img/el_twitter_default.png
---

# Mempool Monitoring

Mempool monitoring lets you track unconfirmed transactions in real-time before they're included in blocks. Essential for applications that need to react to pending transactions immediately.

---

## What is the Mempool?

The mempool (memory pool) contains transactions waiting to be confirmed in blocks. When someone broadcasts a Bitcoin transaction, it first sits in the mempool until a miner includes it in a block.

**Why monitor mempool**:
- Detect pending payments before confirmation
- Analyze transaction fee markets
- Track double-spend attempts
- Show "pending" status in wallets
- Build transaction accelerators

## How Mempool Monitoring Works

```
┌─────────────────────────────────────────────────────────┐
│              Mempool Monitoring Flow                     │
└─────────────────────────────────────────────────────────┘

Periodic polling (e.g., every 10 seconds):
       │
       ▼
┌──────────────────┐
│  Fetch mempool   │  Get list of transaction IDs
│  transaction IDs │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Identify new     │  Compare with known transactions
│ transactions     │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│ Load transaction │  Fetch details for new transactions
│    details       │  (filtered by fee rate)
└──────────────────┘
       │
       ▼
┌──────────────────┐
│  Track status    │  Monitor until confirmed or dropped
└──────────────────┘
       │
       ├─────────────────┬──────────────────┐
       ▼                 ▼                  ▼
┌────────────┐    ┌────────────┐    ┌────────────┐
│ Confirmed  │    │  Dropped   │    │  Still     │
│ in block   │    │from mempool│    │  pending   │
└────────────┘    └────────────┘    └────────────┘
```

## Built-in Mempool Model

Bitcoin Crawler includes a system Mempool Model that works out of the box:

**What it tracks**:
- All transaction IDs in mempool
- Transaction details (fee, size, inputs, outputs)
- Load status (which transactions are fully loaded)
- Synchronization state

**Events it generates**:
- Transaction added to mempool
- Transaction details loaded
- Transaction removed (confirmed or dropped)
- Transaction status updated

You can subscribe to these events and query mempool state without writing model code.

## Configuration

Mempool monitoring is **disabled by default** - you must enable it:

**Basic settings**:
- Enable/disable monitoring
- Sync strategy threshold
- Minimum fee rate filter

**Advanced settings**:
- Polling interval
- Batch size for loading
- Multiple provider URLs

Mempool monitoring works **only through RPC** - you configure provider URLs the same way as for blocks.

## Multiple Mempool Sources

You can monitor multiple mempools simultaneously:

```
Configuration:
Provider A: https://provider-a.com
Provider B: https://provider-b.com
Provider C: https://provider-c.com

System behavior:
- Monitors all three mempools
- Merges transaction lists
- Handles duplicates automatically
- Accounts for differences between providers
```

**Why multiple sources**:
- Different providers may have different transactions
- Increases reliability
- Captures transactions that propagate differently

**Important**: This significantly increases request volume - monitor rate limits carefully.

## Request Volume Considerations

Mempool monitoring makes **significantly more requests** than block processing:

**Block processing**:
- 2 requests per block
- Plus periodic height checks
- Predictable volume

**Mempool monitoring**:
- Poll mempool every ~10 seconds
- Fetch details for new transactions
- Track status changes
- Much higher request volume

**Impact**:
- May exceed free provider tiers
- Need to account for costs
- Configure rate limits appropriately
- Consider if mempool is essential for your use case

## Sync Strategies

The system uses different strategies based on mempool size:

### Small Mempool (Below Threshold)

```
Strategy: Full sync in one request
- Uses getRawMempool(true)
- Gets all transactions with details in single call
- Efficient for small mempools
```

### Large Mempool (Above Threshold)

```
Strategy: Incremental sync
- Fetch only transaction IDs
- Load details in batches
- More efficient for large mempools
- Reduces bandwidth
```

System switches automatically based on configured threshold.

## Filtering by Fee Rate

Configure minimum fee rate to reduce load:

**Purpose**: Don't cache very low-fee transactions that likely won't confirm soon

**Behavior**:
- Transactions below threshold are tracked (ID only)
- But not fully loaded (details not fetched)
- Saves bandwidth and storage
- Focus on transactions that matter

**Configuration**: Set minimum fee rate in satoshis per vByte

## Use Cases

### Payment Processors

**Scenario**: Track deposits to customer addresses

**Implementation**:
- Subscribe to mempool transaction events
- Filter by your addresses
- Show "pending" in UI immediately
- Update to "confirmed" when in block

**Benefit**: Better user experience - show pending payments instantly

### Fee Market Analysis

**Scenario**: Analyze current fee rates

**Implementation**:
- Monitor mempool transactions
- Calculate fee distributions
- Track how fees change over time
- Build fee estimation models

**Benefit**: Provide accurate fee recommendations

### Wallet Applications

**Scenario**: Track user's pending transactions

**Implementation**:
- Monitor transactions from user addresses
- Show pending balance separately
- Alert when transaction confirms
- Detect if transaction is dropped

**Benefit**: Complete transaction visibility

### Transaction Accelerators

**Scenario**: Identify stuck low-fee transactions

**Implementation**:
- Find transactions below certain fee rate
- Track how long they stay pending
- Offer acceleration service (RBF, CPFP)

**Benefit**: Service offering for users

## Querying Mempool Data

Through Transport APIs you can:

**Get mempool statistics**:
- Total transactions tracked
- How many fully loaded
- Synchronization status

**Get all transactions**:
- Filter by load status
- Stream large datasets
- Batch processing

**Get transaction IDs**:
- Optionally with load info
- Stream for large mempools

**Check specific transaction**:
- Verify if in mempool
- Get load status
- Retrieve details

All queries work through HTTP, WebSocket, or other configured transports.

## Using Mempool in Custom Models

You can incorporate mempool data into your custom models:

**Subscribe to system mempool events**:
- Transaction added
- Transaction loaded
- Transaction removed

**Filter in your model**:
- Only process relevant transactions
- Based on addresses, amounts, etc.

**Track pending state**:
- Maintain separate pending balances
- Update when transaction confirms

**Handle confirmation**:
- Transaction moves from mempool to block
- Update state accordingly

This gives you complete control over how mempool data affects your business logic.

## Performance Considerations

### Memory Usage

Mempool monitoring increases memory consumption:
- Transaction cache in memory
- Event history
- State tracking

For mempools with 50,000+ transactions, expect significant overhead.

### Request Volume

Calculate expected requests:
- Polling frequency × number of providers
- Plus transaction detail fetches
- Can be 100x more than block processing

Monitor actual usage and adjust configuration.

### Database Impact

Events from mempool are stored same as block events:
- Increases Event Store size
- More writes to database
- Consider if full history needed

## Best Practices

### When to Enable Mempool

**Enable for**:
- Payment processing applications
- Fee market analysis
- Transaction accelerators
- Wallet applications
- Real-time notifications

**Don't enable for**:
- Historical data analysis only
- Simple block indexing
- Low-resource environments
- When pending transactions don't matter

### Configuration Tuning

1. **Set appropriate fee threshold**: Filter out dust transactions
2. **Adjust sync threshold**: Match typical mempool size
3. **Monitor request volume**: Ensure staying within limits
4. **Use single provider** unless you need redundancy

### Model Design

1. **Filter aggressively**: Process only relevant transactions
2. **Handle volatility**: Mempool changes rapidly
3. **Separate pending state**: Don't mix with confirmed data
4. **Cleanup after confirmation**: Remove mempool tracking

### Cost Management

1. **Understand request volume** before enabling
2. **Choose provider tier** that supports expected load
3. **Consider if mempool is necessary** for your use case
4. **Test in development** to measure actual usage

## Troubleshooting

**High request volume**:
- Increase polling interval
- Raise minimum fee rate
- Use single provider
- Disable if not needed

**Slow synchronization**:
- Lower sync threshold
- Increase batch size
- Use faster provider

**Memory issues**:
- Raise minimum fee rate
- Implement cache eviction
- Use PostgreSQL instead of SQLite

**Transactions not appearing**:
- Some transactions skip public mempool
- Your polling interval might miss short-lived transactions
- Different providers have different views
- All expected behavior

## Architecture Context

Mempool monitoring is an optional feature that integrates with the core system:

**System Mempool Model** tracks mempool state using Event Sourcing
**Network Providers** (RPC only) fetch mempool data
**Event Store** persists mempool events
**Transport** exposes mempool data to clients
**Custom Models** can use mempool events in business logic

Mempool adds real-time transaction tracking on top of confirmed block data.