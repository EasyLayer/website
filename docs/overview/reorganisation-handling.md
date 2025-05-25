---
title: 'Blockchain Reorganisation Handling - Automatic State Management'
description: 'Learn how Easylayer applications automatically handle blockchain reorganisations with state updates and system events for blocks, transactions, and heights.'
keywords: ['blockchain reorganisation', 'reorg handling', 'easylayer', 'blockchain state', 'system events', 'automatic updates']
sidebar: intro
sidebar_label: 'Reorganisation handling'
slug: '/reorganisation-handling'
---

# Reorganisation Handling

Blockchain reorganisations (reorgs) are a natural part of blockchain networks where the chain reorganises itself due to competing blocks or network conditions. Easylayer applications handle these reorganisations automatically, ensuring your application state remains consistent and accurate.

## Automatic State Management

When a blockchain reorganisation occurs, Easylayer automatically:

- **Updates application state** to reflect the new chain structure
- **Reverts affected data** that was based on reorganised blocks
- **Maintains data consistency** across all application components
- **Handles complex reorganisations** without manual intervention

Your application continues to operate seamlessly during reorganisations without requiring any additional code or configuration.

## System Events

Easylayer emits comprehensive system events when reorganisations are detected, providing detailed information about what changed:

### Reorganisation Event Structure

```javascript
{
  type: 'blockchain.reorganisation',
  data: {
    reorganisedBlocks: [
      // Array of block hashes that were reorganised
    ],
    reorganisedTransactions: [
      // Array of transaction hashes affected by the reorg
    ],
    reorganisedHeights: [
      // Array of block heights that were reorganised
    ],
    newChainTip: {
      // Information about the new chain head
    }
  }
}
```

## Handling Reorganisation Events

Subscribe to reorganisation events to implement custom logic when reorgs occur:

```javascript
// Listen for reorganisation events
client.subscribe('blockchain.reorganisation', (event) => {
  const { reorganisedBlocks, reorganisedTransactions, reorganisedHeights } = event.data;
  
  // Implement custom reorganisation handling
  console.log(`Reorganisation detected: ${reorganisedBlocks.length} blocks affected`);
  
  // Update UI, notify users, or trigger custom workflows
});
```

## Benefits

- **Zero configuration**: Reorganisation handling works out of the box
- **Automatic recovery**: State automatically updates to match the canonical chain
- **Complete visibility**: Detailed events provide full reorganisation context
- **Reliable data**: Your application always reflects the current blockchain state

Easylayer's built-in reorganisation handling ensures your blockchain applications remain robust and reliable, even during network instability or competing chain scenarios.