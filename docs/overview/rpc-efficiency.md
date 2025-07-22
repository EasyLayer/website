---
title: 'Efficient RPC Calls & Block Processing | EasyLayer Framework'
sidebar: intro
sidebar_label: 'RPC Calls & Block Processing'
slug: /rpc-efficiency
description: Optimize blockchain data processing with EasyLayer's efficient RPC strategy. Minimal requests per block, configurable rate limits, and parallel processing for cost-effective web3 integration with any provider.
keywords: ['RPC efficiency', 'blockchain RPC', 'web3 RPC calls', 'block processing', 'rate limiting', 'blockchain crawler', 'Node.js RPC', 'QuickNode integration', 'websocket blockchain', 'parallel block processing', 'cost optimization']
image: /img/el_twitter_default.png
---

# Efficient RPC Calls & Block Processing

EasyLayer applications read blockchain data directly from nodes using optimized RPC strategies. Whether you use your own blockchain node or a provider service, our framework minimizes costs through intelligent block processing and configurable rate limiting.

## Minimal RPC Requests Strategy

EasyLayer's block crawlers use an optimized approach that requires only **2 RPC calls per block** on average (excluding reorganizations). We fetch the complete block data and parse all necessary information locally, dramatically reducing the number of requests to your node or provider.

This efficient strategy significantly reduces costs for businesses, allowing them to use even basic provider tiers while maintaining full blockchain data access. Instead of multiple requests for transactions, receipts, and logs, we process everything from the complete block data.

## Supported Connection Methods

**[RPC](https://ethereum.org/en/developers/docs/apis/json-rpc/) Calls**: Primary method for blockchain data retrieval with reliable, standardized communication across all supported networks.

**[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) Connections**: Available for select crawlers, providing real-time data streaming for improved performance and lower latency.

## Configurable Block Range Processing

Control exactly which blocks to process with flexible height configuration:

```env
# Start processing from specific block height (optional)
BITCOIN_CRAWLER_START_BLOCK_HEIGHT=800000

# Stop at specific height or process indefinitely (default infinity)
BITCOIN_CRAWLER_MAX_BLOCK_HEIGHT=1000000
```

**Flexible Range Options**: Start from genesis block, specific height, or current block. Set upper limits or process continuously as new blocks arrive.

**Optimized Loading Strategies**: Our crawlers implement advanced strategies for fastest and most efficient block loading based on network characteristics and provider capabilities.

## Provider Rate Limiting

EasyLayer supports configurable rate limiting to match your provider's specific plan and avoid throttling:

```env
# Configure concurrent request limits
BITCOIN_CRAWLER_NETWORK_PROVIDER_RATE_LIMIT_MAX_CONCURRENT_REQUESTS=5

# Set batch size for bulk operations
BITCOIN_CRAWLER_NETWORK_PROVIDER_RATE_LIMIT_MAX_BATCH_SIZE=10

# Add delay between requests (milliseconds)
BITCOIN_CRAWLER_NETWORK_PROVIDER_RATE_LIMIT_REQUEST_DELAY_MS=100
```

**Provider Compatibility**: Works with [QuickNode](https://www.quicknode.com/), [Infura](https://infura.io/), [Alchemy](https://alchemy.com/), and other major blockchain infrastructure providers.

**Adaptive Rate Limiting**: Fine-tune settings to maximize throughput while staying within your provider's rate limits, optimizing cost-effectiveness.

## Parallel Processing Architecture

Block loading runs parallel to your application operations, ensuring continuous data availability without blocking your main application logic. This architecture provides:

- **Non-blocking Operations**: Your application remains responsive while blocks are processed in the background
- **Continuous Synchronization**: Automatic catching up with the latest blockchain state
- **Resource Optimization**: Efficient CPU and memory usage during parallel processing

Need help optimizing your RPC configuration? Join our [community discussions](https://github.com/EasyLayer/core/discussions) or check out our [configuration examples](https://easylayer.io/docs/examples) for provider-specific setups.