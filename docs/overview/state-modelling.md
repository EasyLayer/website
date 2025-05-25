---
title: 'Custom State Modelling'
sidebar: intro
sidebar_label: 'State Modelling'
slug: /state-modelling
description: Learn how to define custom blockchain state models with EasyLayer's framework. Create efficient data structures, events, and parsing logic for your specific use case.
keywords: ['blockchain state modelling', 'custom data models', 'blockchain events', 'block parsing', 'EasyLayer framework', 'blockchain data extraction', 'event-driven architecture']
image: /img/el_twitter_default.png
---

EasyLayer's state modelling framework allows you to define exactly what blockchain data matters to your application. Instead of storing entire blockchain state (which would be massive and mostly irrelevant), you create custom models that extract and track only the specific information your business logic requires.

## Why Custom State Models?

Blockchain networks contain enormous amounts of data, but most applications only need a small subset. For example:
- A DeFi dashboard might only track specific token transfers and liquidity pool changes
- An NFT marketplace only needs to monitor minting, transfers, and metadata updates
- A payment processor might focus solely on transactions to/from specific addresses

Custom state modelling lets you define these precise requirements, resulting in:
- **Efficient storage**: Only relevant data is indexed and stored
- **Faster queries**: Optimized data structures for your specific use cases
- **Reduced costs**: Minimal database and compute requirements
- **Simplified logic**: Work with domain-specific data models instead of raw blockchain data

## Framework Overview

EasyLayer's crawler applications use a declarative framework where you define:

1. **State Models**: Data structures representing your business entities
2. **Events**: Domain events that occur when state changes

## Defining State Models

State models are TypeScript interfaces or classes that represent your domain entities:

```typescript
// Define a simple balance tracking model
interface WalletBalance {
  address: string;
  balance: bigint;
  lastUpdatedBlock: number;
  lastUpdatedTimestamp: Date;
}

// Define a more complex smart contract interaction model
interface TokenTransfer {
  id: string;
  tokenContract: string;
  from: string;
  to: string;
  amount: bigint;
  blockNumber: number;
  transactionHash: string;
  logIndex: number;
  timestamp: Date;
}
```

Models can be as simple or complex as needed:
- Simple value objects for basic tracking
- Rich domain entities with computed properties
- Nested structures for complex relationships
- Arrays and collections for one-to-many relationships

## Creating Events

Events represent significant state changes in your domain. They're fired when your parsers detect relevant blockchain activity:

```typescript
// Balance change event
interface BalanceChangedEvent {
  type: 'BalanceChanged';
  address: string;
  oldBalance: bigint;
  newBalance: bigint;
  blockNumber: number;
  transactionHash?: string;
}

// Token transfer event
interface TokenTransferEvent {
  type: 'TokenTransfer';
  tokenContract: string;
  from: string;
  to: string;
  amount: bigint;
  blockNumber: number;
  transactionHash: string;
}

// Custom business event
interface LargeTransferEvent {
  type: 'LargeTransfer';
  amount: bigint;
  threshold: bigint;
  participants: string[];
  blockNumber: number;
}
```

Events serve multiple purposes:
- **Audit trail**: Complete history of state changes
- **Real-time notifications**: Subscribe to events as they happen
- **Business logic triggers**: React to specific conditions
- **Integration points**: Connect to external systems

## Block Parsing Logic

Block parsers examine each blockchain block and extract data relevant to your models:

```typescript
interface BlockParser {
  // Parse a block and return state updates and events
  parseBlock(block: BlockData): ParseResult;
}

interface ParseResult {
  stateUpdates: StateUpdate[];
  events: DomainEvent[];
}

// Example parser for tracking specific addresses
class AddressBalanceParser implements BlockParser {
  constructor(private watchedAddresses: Set<string>) {}

  parseBlock(block: BlockData): ParseResult {
    const updates: StateUpdate[] = [];
    const events: DomainEvent[] = [];

    // Examine each transaction in the block
    for (const tx of block.transactions) {
      // Check if transaction affects watched addresses
      if (this.isRelevantTransaction(tx)) {
        const balanceUpdate = this.extractBalanceUpdate(tx);
        const balanceEvent = this.createBalanceEvent(tx, balanceUpdate);
        
        updates.push(balanceUpdate);
        events.push(balanceEvent);
      }
    }

    return { stateUpdates: updates, events };
  }

  private isRelevantTransaction(tx: Transaction): boolean {
    return this.watchedAddresses.has(tx.from) || 
           this.watchedAddresses.has(tx.to);
  }
}
```

Parsers can implement various strategies:
- **Address-based**: Track specific wallet addresses
- **Contract-based**: Monitor smart contract interactions
- **Pattern-based**: Detect transaction patterns or conditions
- **Value-based**: Track transactions above certain thresholds

## Event Subscription

Once you've defined events, you can optionally subscribe to them for real-time processing:

```typescript
// Subscribe to specific event types
crawler.subscribe('BalanceChanged', (event: BalanceChangedEvent) => {
  console.log(`Balance changed for ${event.address}: ${event.newBalance}`);
  
  // Trigger business logic
  if (event.newBalance > ALERT_THRESHOLD) {
    sendAlert(event.address, event.newBalance);
  }
});

// Subscribe to multiple event types
crawler.subscribe(['TokenTransfer', 'LargeTransfer'], (event) => {
  // Handle different event types
  switch (event.type) {
    case 'TokenTransfer':
      updateTokenAnalytics(event);
      break;
    case 'LargeTransfer':
      flagForReview(event);
      break;
  }
});

// Subscribe to all events
crawler.subscribe('*', (event) => {
  // Log all events for debugging
  logger.info('Event occurred:', event);
});
```

Event subscription is entirely optional—you can define events without subscribing to them. This allows you to:
- Build event history for later analysis
- Enable/disable real-time processing as needed
- Add subscribers dynamically based on runtime conditions

## Best Practices

### Model Design
- **Keep models focused**: Each model should represent a single concept
- **Use appropriate types**: Leverage TypeScript's type system for safety
- **Consider indexing**: Design models with your query patterns in mind
- **Plan for evolution**: Models should be extensible for future requirements

### Event Design
- **Be specific**: Create granular events for precise business logic
- **Include context**: Events should contain all necessary information
- **Use consistent naming**: Follow naming conventions across your domain
- **Consider privacy**: Don't include sensitive data in events

### Parser Efficiency
- **Filter early**: Skip irrelevant transactions as quickly as possible
- **Batch updates**: Group related state changes for efficiency
- **Handle errors**: Gracefully handle malformed or unexpected data
- **Log appropriately**: Include enough context for debugging without spam

### Event Handling
- **Keep handlers lightweight**: Heavy processing should be asynchronous
- **Handle failures**: Event handlers should be resilient to errors
- **Avoid side effects**: Prefer pure functions where possible
- **Consider ordering**: Some events may need to be processed in sequence

## Next Steps

With custom state modelling, you can create highly efficient, purpose-built blockchain data processing applications. The framework handles the complex blockchain mechanics while you focus on defining exactly what data matters to your business.

Ready to build your first state model? Check out our [crawler examples](https://easylayer.io/docs/examples) for complete implementations