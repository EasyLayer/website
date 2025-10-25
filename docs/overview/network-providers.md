---
title: 'Network Providers'
sidebar_label: 'Network Providers'
slug: /network-providers
description: Learn about blockchain network providers in EasyLayer's framework. Understand RPC, P2P, and ZMQ connection strategies, and how to minimize node requests for cost efficiency.
keywords: ['blockchain providers', 'RPC connection', 'P2P protocol', 'ZMQ', 'blockchain node', 'Bitcoin node', 'QuickNode', 'blockchain connectivity', 'minimal requests']
image: /img/el_twitter_default.png
---

# Network Providers

Network providers connect Bitcoin Crawler to blockchain nodes and fetch blocks. The framework supports multiple connection strategies optimized for different use cases and cost requirements.

---

## What Network Providers Do

Providers are responsible for:
- Connecting to blockchain nodes
- Fetching blocks (historical and real-time)
- Detecting new blocks
- Providing block data to your models

The framework handles all provider complexity - you just configure which provider to use.

## Provider Connection Flow

```
┌──────────────────────────────────────────────────────────┐
│              Provider Connection Flow                     │
└──────────────────────────────────────────────────────────┘

Your Configuration
       │
       ▼
┌────────────────┐
│   Provider     │  Framework component
│   Strategy     │
│  - RPC         │
│  - P2P         │
│  - ZMQ         │
└────────────────┘
       │
       ▼
┌────────────────┐
│  Blockchain    │  Your node or external service
│     Node       │  (Bitcoin Core, QuickNode, etc.)
└────────────────┘
       │
       ▼
┌────────────────┐
│    Blocks      │  Delivered to your models
└────────────────┘
```

## Available Strategies

### RPC (HTTP) - Recommended for Most Cases

Uses HTTP requests to communicate with Bitcoin node's RPC interface.

**How it works**:

```
┌─────────────────────────────────────────────────────────┐
│              RPC Pulling Strategy                        │
└─────────────────────────────────────────────────────────┘

Every interval (e.g., 10 seconds):
       │
       ▼
1. Check current height
   Request: getblockcount
       │
       ▼
2. If new block detected:
   Request: getblockhash(height)
   Response: block hash
       │
       ▼
3. Fetch full block
   Request: getblock(hash, verbosity=2)
   Response: block with all transactions
       │
       ▼
4. Deliver to your model

Total: 2 requests per block + 1 periodic height check
```

**Why this is important**: Traditional indexers make separate requests for each transaction. For a block with 3000 transactions, that's 3000+ requests. We fetch everything in just 2 requests (hash + full block data). This keeps costs minimal.

**Advantages**:
- Minimal requests = low cost
- Works with external providers (QuickNode, etc.)
- Works with your own node
- Reliable and well-tested
- Easy to configure

**Best for**:
- Production deployments
- Cost-conscious applications
- Real-time monitoring
- When using external providers

### P2P (Peer-to-Peer)

Direct connection to Bitcoin network using P2P protocol.

**Two modes**:
- **Pulling**: Request blocks at regular intervals
- **Subscription**: Receive block notifications in real-time

**Advantages**:
- Faster block fetching for historical data
- No RPC rate limits
- Lower latency than HTTP
- Direct network access

**Best for**:
- Initial historical sync (faster than RPC)
- When you control the peer node
- Minimizing external dependencies

**Considerations**:
- Connect to your own peer, not random network nodes
- Less stable than RPC for production
- More complex setup

### ZMQ (ZeroMQ)

Real-time notification system when enabled on Bitcoin node.

**How it works**:
- Node publishes messages for new blocks
- Your crawler subscribes to these messages
- Blocks arrive immediately when mined

**Advantages**:
- Lowest latency (no polling)
- Efficient (push vs pull)
- Real-time notifications

**Requirements**:
- Bitcoin node must have ZMQ enabled
- Network access to ZMQ ports
- You must control or configure the node

**Best for**:
- Real-time applications requiring lowest latency
- When you control the Bitcoin node
- After initial historical sync

**Not suitable for**:
- Historical data (only notifies about new blocks)
- External providers (rarely support ZMQ)

## Choosing the Right Strategy

```
Use Case Decision Tree:

Development/Testing
    └──> RPC with external provider (QuickNode free tier)

Production - Real-time monitoring
    └──> RPC pulling with fallback providers

Production - High volume
    └──> Self-hosted node with ZMQ

Historical sync (large range)
    ├──> P2P pulling for initial sync
    └──> Then switch to RPC/ZMQ for real-time

Maximum reliability
    └──> Multiple RPC providers + ZMQ
```

## Self-Hosted vs External Providers

### External Providers (QuickNode, etc.)

**Advantages**:
- No maintenance
- No server costs for node
- Often free tier available
- Instantly available

**With our minimal requests**:
- 2 requests per block means ~300 requests/hour for Bitcoin
- Easily stays in free tiers
- Predictable costs

**Best for**:
- Most applications
- Cost optimization
- Quick start

### Self-Hosted Node

**Advantages**:
- No rate limits
- Complete control
- Privacy (your queries stay private)

**Costs**:
- Server hardware/cloud
- Maintenance time
- Storage (hundreds of GB)
- Network bandwidth

**Best for**:
- Very high volume operations
- Privacy requirements
- Specific node configurations needed

**Our recommendation**: Start with external provider. With our minimal request design (2 per block), costs are negligible. Only move to self-hosted if you have specific requirements.

## Multiple Providers (Fallback)

Configure multiple provider URLs for automatic failover:

```
Configuration:
Provider 1: https://provider-a.com
Provider 2: https://provider-b.com
Provider 3: https://provider-c.com

Normal operation:
    Uses Provider 1

Provider 1 fails:
    Automatically switches to Provider 2

Provider 2 fails:
    Automatically switches to Provider 3
```

**Benefits**:
- Increased reliability
- No downtime during provider issues
- No code changes needed

**Important**: Different providers might have slightly different chain views, especially during reorgs. The framework handles this automatically, but be aware of potential temporary inconsistencies.

## Request Optimization

### Why Minimal Requests Matter

**Cost example**:
- Block with 3000 transactions
- Traditional: 1 (block) + 3000 (transactions) = 3001 requests
- Bitcoin Crawler: 2 requests (hash + full block)
- **Savings: 99.9% fewer requests**

**Impact**:
- Stay in free provider tiers
- Lower costs for paid tiers
- Reduced node load for self-hosted
- Faster sync (fewer network round trips)

### The Two Requests

**Request 1: Get block hash by height**
```
getblockhash(850000)
→ Returns: "00000000000000000002a7c4..."
```

**Request 2: Get full block with transactions**
```
getblock("00000000000000000002a7c4...", verbosity=2)
→ Returns: Complete block with all transactions included
```

**Plus**: One periodic height check (e.g., every 10 seconds) to detect new blocks.

No separate transaction requests needed - everything comes in the full block.

## Rate Limiting

Configure rate limiting to respect provider limits:

**Settings**:
- Maximum concurrent requests
- Maximum batch size
- Delay between batches

**Why configure**:
- Prevent hitting provider rate limits
- Ensure smooth historical sync
- Avoid throttling or bans

**Automatic management**: Framework handles request scheduling based on your configuration.

## Configuration Overview

Provider configuration happens through environment variables:

**Basic setup**:
- Node URL (your node or provider)
- Provider type (selfnode, quicknode, etc.)
- Strategy (pull, p2p_pull, p2p_subscription, zmq)

**Advanced settings**:
- Request timeout
- Rate limiting parameters
- Retry logic
- Fallback providers

See full configuration documentation for complete details.

## Best Practices

### Starting Out

1. **Use external RPC provider** with pulling strategy
2. **Configure fallback URLs** for reliability
3. **Monitor request usage** to verify staying in limits
4. **Start with recent blocks** (not genesis) for faster testing

### Production

1. **Choose strategy based on requirements**:
   - Real-time monitoring: RPC pulling
   - Lowest latency: ZMQ (with your node)
   - High reliability: Multiple RPC providers

2. **Configure rate limiting** appropriately for your provider tier

3. **Monitor provider health**:
   - Track response times
   - Watch for errors
   - Test failover works

4. **Consider costs**:
   - Calculate expected request volume
   - Verify provider pricing
   - Our 2-per-block design keeps costs low

### Scaling

1. **External providers scale easily** - just upgrade tier if needed
2. **Self-hosted nodes** require server upgrades and maintenance
3. **Multiple indexers** can share same provider (configure rate limits)

## Troubleshooting

**Connection failures**:
- Verify node is running and accessible
- Check firewall rules
- Validate URL format

**Rate limit exceeded**:
- Reduce concurrent requests
- Increase delay between batches
- Upgrade provider tier
- Add fallback providers

**Slow synchronization**:
- For historical sync: Consider P2P pulling
- Increase batch size (if provider allows)
- Use provider with better performance
- Check network connectivity

**Inconsistent data between providers**:
- Normal during reorgs - framework handles automatically
- Verify all providers are on same network (mainnet/testnet)
- Check provider sync status

## Architecture Context

Network providers are one component in the complete system:

**Providers** fetch blocks from blockchain nodes
**Models** process blocks and generate events
**Event Store** persists events
**Transport** exposes data to clients

Providers focus solely on getting block data reliably and efficiently - everything else is handled by other components.