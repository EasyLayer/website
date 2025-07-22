---
title: 'Blockchain Reorganisation Handling | EasyLayer Framework'
sidebar: intro
sidebar_label: 'Blockchain Reorganisation Handling'
slug: /reorganisation-handling
description: EasyLayer automatically detects and handles blockchain reorganisations with state rollbacks and system events. Maintain data consistency across any reorganisation depth with automatic model updates and event notifications.
keywords: ['blockchain reorganisation', 'reorg handling', 'blockchain state management', 'automatic rollback', 'system events', 'data consistency', 'EasyLayer reorg', 'blockchain reliability', 'state reconstruction', 'web3 consistency']
image: /img/el_twitter_default.png
---

# Blockchain Reorganisation Handling

EasyLayer framework automatically detects blockchain reorganisations and maintains data consistency by reconstructing the chain state and rolling back affected changes. Your applications receive detailed reorganisation events without requiring manual intervention.

## Automatic Detection & State Management

When a blockchain reorganisation occurs, EasyLayer automatically detects the change and begins reconstructing the correct chain state. The framework rolls back all affected data to maintain consistency across your application's state.

**Automatic Model Updates**: Custom user models are automatically rebuilt during reorganisation events. Developers don't need to implement manual rollback logic or worry about data inconsistencies.

**Any Depth Support**: EasyLayer handles reorganisations of any depth, from single block reorganisations to deep chain restructuring, depending on the specific blockchain's characteristics.

## System Events & Notifications

During reorganisation, your application receives detailed event notifications:

```typescript
export type LightBlock = {
  height: number;
  hash: string;
  previousblockhash: string;
  tx: string[];
};

// Example reorganisation event structure
BitcoinNetworkReorganizedEvent {
  blocks: LightBlock[]
}
```

**Comprehensive Data**: Events include all affected block hashes, heights, and transaction hashes, providing complete visibility into what data was reorganised.

**Real-time Notifications**: Applications receive events immediately when reorganisations are detected, enabling responsive handling of state changes.

## Business Benefits

**Data Integrity**: Automatic reorganisation handling ensures your business logic always operates on the correct, final blockchain state without manual intervention.

**Reliable Operations**: Eliminate concerns about stale or incorrect data affecting business decisions, transactions, or user interactions.

**Reduced Development Complexity**: No need to implement custom reorganisation detection or rollback mechanisms in your application code.

## Node Reliability Considerations

Reorganisation detection depends on your blockchain node's reliability and synchronization status. For production applications:

**Trusted Providers**: Use established providers like [QuickNode](https://www.quicknode.com/), [Infura](https://infura.io/), or [Alchemy](https://alchemy.com/) that maintain properly synchronized nodes.

**Self-Hosted Nodes**: If running your own [Bitcoin](https://bitcoin.org/) or [Ethereum](https://ethereum.org/) nodes, ensure proper configuration and synchronization to detect reorganisations accurately.

**Network Monitoring**: Consider monitoring multiple nodes or providers to cross-verify reorganisation events for critical business applications.

Need help implementing reorganisation handling? Join our [community discussions](https://github.com/EasyLayer/core/discussions) or check out our [event handling examples](https://easylayer.io/docs/examples) for detailed implementation patterns.