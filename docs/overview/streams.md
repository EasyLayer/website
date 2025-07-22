---
title: 'Live & Historical Streams | EasyLayer Framework'
sidebar: intro
sidebar_label: 'Live & Historical Streams'
slug: /streams
description: Process blockchain data with EasyLayer's unified live and historical streams. Sync entire chain history and maintain real-time feeds through the same endpoint for dashboards, alerts, and analytics.
keywords: ['blockchain streams', 'live data', 'historical data', 'real-time blockchain', 'blockchain sync', 'web3 streams', 'EasyLayer streams', 'blockchain feeds', 'data processing', 'chain history']
image: /img/el_twitter_default.png
---

# Live & Historical Streams

EasyLayer applications seamlessly process both historical blockchain data and real-time streams through unified endpoints. Sync the entire chain history once and maintain continuous real-time feeds for dashboards, alerts, and analytics without switching data sources.

## Unified Data Processing

**Single Endpoint Architecture**: Your application uses the same data processing logic and endpoints for both historical synchronization and live data streams, ensuring consistency across all time periods.

**Automatic Mode Switching**: When historical sync reaches the blockchain's current height, EasyLayer automatically transitions to real-time mode without interruption or configuration changes.

## Flexible Starting Options

Configure your data processing strategy with environment variables:

```env
# Start from specific block height
BITCOIN_CRAWLER_START_BLOCK_HEIGHT=800000

# Process until specific height or continue indefinitely
BITCOIN_CRAWLER_MAX_BLOCK_HEIGHT=infinity
```

### Historical Processing Modes

**Complete Chain History**: Load all blockchain data from the genesis block by omitting the start height configuration, perfect for comprehensive analytics and full blockchain state reconstruction.

**Partial History Sync**: Start from any specific block height to focus on relevant time periods or reduce initial synchronization time for recent data analysis.

**Real-Time Only**: Skip historical data entirely by setting the start height to the current blockchain height, ideal for monitoring new transactions and events only.

## Real-Time Stream Features

**Continuous Processing**: Once historical sync completes (if enabled), applications automatically process new blocks as they're mined, maintaining up-to-date blockchain state.

**Live Dashboards**: Build real-time dashboards and monitoring tools that display current blockchain activity alongside historical trends using the same data processing pipeline.

**Instant Alerts**: Implement real-time alerts and notifications based on new blockchain events without separate streaming infrastructure.

## Use Cases & Applications

**Analytics Dashboards**: Combine historical trends with live data for comprehensive blockchain analytics and business intelligence applications.

**Transaction Monitoring**: Track specific addresses or contracts across entire blockchain history and continue monitoring new activity in real-time.

**DeFi Applications**: Maintain accurate liquidity pools, trading volumes, and protocol states using both historical context and live updates.

**Compliance Systems**: Audit entire transaction histories while monitoring ongoing activities for regulatory compliance and reporting.

## Performance Benefits

**Optimized Sync Strategy**: EasyLayer uses intelligent block processing strategies to minimize synchronization time while maintaining data accuracy and completeness.

**Memory Efficiency**: Stream processing architecture handles large blockchain datasets without excessive memory usage, suitable for production environments.

**Provider Flexibility**: Works with any [RPC provider](https://ethereum.org/en/developers/docs/apis/json-rpc/) or self-hosted blockchain nodes, adapting to your infrastructure preferences.

Need help configuring streams for your use case? Join our [community discussions](https://github.com/EasyLayer/core/discussions) or explore our [streaming examples](https://easylayer.io/docs/examples) for implementation patterns.