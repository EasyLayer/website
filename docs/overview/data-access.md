---
title: 'Data Access - Historical & Real-Time'
sidebar: intro
sidebar_label: 'Data Access'
slug: /data-access
description: Learn how EasyLayer crawlers seamlessly handle both historical blockchain data and real-time processing. Configure block heights and access patterns for your specific needs.
keywords: ['blockchain data access', 'historical blockchain data', 'real-time blockchain', 'block height configuration', 'EasyLayer crawler', 'blockchain synchronization', 'event subscription']
image: /img/el_twitter_default.png
---

EasyLayer crawlers provide seamless access to blockchain data across time—from historical analysis of past blocks to real-time monitoring of new transactions. The beauty of our approach is its simplicity: you specify a starting block height, and the crawler intelligently handles everything else.

## Unified Data Processing

Unlike traditional blockchain tools that require separate configurations for historical vs. real-time data, EasyLayer crawlers operate with a unified model:

- **Historical Processing**: Crawl through past blocks to build initial state
- **Real-Time Processing**: Monitor new blocks as they're mined
- **Seamless Transition**: Automatically switch from historical to real-time mode
- **Consistent Events**: Your event subscriptions work identically in both modes

## Block Height Configuration

The starting point for any crawler is defining where to begin processing blocks:

```bash
BITCOIN_CRAWLER_START_BLOCK_HEIGHT=100
```

## Best Practices

### Choosing Start Blocks

- **New Projects**: Start from `'latest'` for real-time only monitoring
- **Existing Projects**: Use the block when your contracts were deployed
- **Analytics**: Start from genesis or significant protocol milestones
- **Development**: Use recent blocks (`'latest-1000'`) for faster testing

### Event Processing Strategy

- **Separate Logic**: Handle historical vs. real-time events differently when needed
- **Batch Processing**: Group historical events for efficiency
- **Rate Limiting**: Throttle external API calls during catchup
- **State Validation**: Verify final state after historical processing

### Performance Optimization

- **Selective Parsing**: Only parse blocks containing relevant transactions
- **Efficient Queries**: Optimize database queries for your access patterns  
- **Memory Management**: Monitor memory usage during large historical catches
- **Parallel Processing**: Use multiple crawler instances for different block ranges

Your crawler will automatically process the last week of blocks, then seamlessly transition to monitoring new blocks in real-time. Event subscriptions work identically throughout the entire process.

Need help configuring your data access patterns? Check our [configuration examples](https://easylayer.io/docs/examples) or join the [community discussions](https://github.com/EasyLayer/core/discussions).