---
title: How to Monitor Bitcoin Address Balance - A Complete Guide
authors: [yarikp]
tags: [bitcoin, blockchain, monitoring, state changes, easylayer]
date: 2025-05-01T10:30:00Z
description: 'Learn how to build a real-time Bitcoin address balance monitor using EasyLayer Bitcoin Crawler. Complete tutorial with code examples for tracking address transactions and balance changes.'
keywords: ['Bitcoin blockchain', 'state monitoring', 'blockchain tracking', 'Bitcoin state changes', 'blockchain monitoring', 'EasyLayer']
image: /img/blog/main-default-img.png
---

Monitoring Bitcoin address balances in real-time is a common requirement for exchanges, payment processors, and portfolio tracking applications. In this comprehensive guide, we'll build a complete Bitcoin address balance monitor using EasyLayer's Bitcoin Crawler that tracks transactions and maintains accurate balance state.

<!--truncate-->

## What We're Building

By the end of this tutorial, you'll have a working Bitcoin address monitor that:
- Tracks all incoming and outgoing transactions for a specific address
- Maintains accurate balance calculations in real-time
- Handles blockchain reorganizations automatically
- Provides easy access to current balance via API queries

## Prerequisites

Before we start, make sure you have:
- Node.js version 17 or higher
- Access to a Bitcoin node (your own or QuickNode)
- Basic understanding of Bitcoin transactions and UTXOs

## Setting Up the Project

First, install the Bitcoin Crawler package:

```bash
npm install @easylayer/bitcoin-crawler @easylayer/transport-sdk
npm install uuid @types/uuid  # For generating request IDs
```

## Step 1: Bootstrap the Application

Let's start by creating the main application file that initializes our Bitcoin Crawler:

```typescript
// main.ts
import { bootstrap } from '@easylayer/bitcoin-crawler';
import BalanceModel from './models';

bootstrap({
  Models: [BalanceModel],
  rpc: true,
}).catch((error: Error) => console.error(error));
```

This simple bootstrap call starts the Bitcoin Crawler with our custom balance model and enables RPC transport for querying data.

## Step 2: Define Custom Events

Next, we need to define the events that our model will emit when processing blocks. These events capture the essential transaction data:

```typescript
// events.ts
import { BasicEvent, EventBasePayload } from '@easylayer/bitcoin-crawler';

type TxId = string;
type N = string;
type OutputKey = `${TxId}_${N}`;
type Value = string;

export type Outputs = Map<OutputKey, Value>;

export type Input = {
  txid: string;        // Current transaction ID
  outputTxid: string;  // Referenced output transaction ID
  outputN: number;     // Referenced output index
}

interface BlockAddedEventPayload extends EventBasePayload {
  inputs: Input[];
  outputs: Outputs;
}

export class BlockAddedEvent extends BasicEvent<BlockAddedEventPayload> {}
```

Our event structure captures:
- **Outputs**: New UTXOs created for our monitored address
- **Inputs**: UTXOs spent from our monitored address

## Step 3: Implement the Balance Model

Now for the core logic - our balance tracking model:

```typescript
// models.ts
import { v4 as uuidv4 } from 'uuid';
import { Model } from '@easylayer/bitcoin-crawler';
import { ScriptUtilService } from '@easylayer/bitcoin';
import { Money, Currency } from '@easylayer/common/arithmetic';
import { BlockAddedEvent, Outputs, Input } from './events';

const NETWORK: string = process.env.BITCOIN_CRAWLER_BLOCKCHAIN_NETWORK_NAME || 'testnet';
const CURRENCY: Currency = {
  code: 'BTC',
  minorUnit: 8,
};

export default class BalanceModel extends Model {
  // The Bitcoin address we're monitoring
  address: string = '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa';
  
  // Available UTXOs (unspent outputs)
  outputs: Outputs = new Map();
  
  // Spent inputs (for tracking outgoing transactions)
  inputs: Input[] = [];

  constructor() {
    super('bitcoin-balance-monitor'); // Unique model identifier
  }

  async parseBlock({ block }: { block: any }) {
    const { tx, height } = block;
    const outputs: Outputs = new Map();
    const inputs: Input[] = [];

    // Process each transaction in the block
    for (let transaction of tx) {
      const { txid, vin, vout } = transaction;

      // Check outputs (incoming transactions)
      for (const vo of vout) {
        const scriptHash: string | undefined = ScriptUtilService
          .getScriptHashFromScriptPubKey(vo.scriptPubKey, NETWORK);
        
        if (!scriptHash || scriptHash !== this.address) {
          continue;
        }

        // Found an output to our monitored address
        const value = Money.fromDecimal(vo.value, CURRENCY).toCents();
        outputs.set(`${txid}_${vo.n}`, value);
      }

      // Check inputs (outgoing transactions)
      for (const vi of vin) {
        if (vi.txid && vi.vout !== undefined) {
          inputs.push({
            txid,
            outputTxid: vi.txid,
            outputN: Number(vi.vout),
          });
        }
      }
    }

    // Emit event with transaction data
    await this.apply(
      new BlockAddedEvent({
        aggregateId: this.aggregateId,
        requestId: uuidv4(),
        blockHeight: height,
        inputs,
        outputs
      })
    );
  }

  private onBlockAddedEvent({ payload }: BlockAddedEvent) {
    const { inputs, outputs } = payload;

    // Add new outputs (incoming funds)
    outputs.forEach((value, key) => {
      this.outputs.set(key, value);
    });

    // Remove spent outputs (outgoing funds)
    inputs.forEach((input) => {
      const outputKey = `${input.outputTxid}_${input.outputN}`;
      if (this.outputs.has(outputKey)) {
        this.outputs.delete(outputKey);
      }
      this.inputs.push(input);
    });
  }

  // Calculate current balance from available UTXOs
  getCurrentBalance(): string {
    let totalBalance = 0;
    this.outputs.forEach((value) => {
      totalBalance += parseInt(value);
    });
    
    return Money.fromCents(totalBalance.toString(), CURRENCY).toDecimal();
  }
}
```

## Understanding the Model Logic

The balance model works by:

1. **Processing each block**: The `parseBlock` method examines every transaction
2. **Identifying relevant transactions**: Using script hash comparison to find transactions involving our address
3. **Tracking UTXOs**: Maintaining a map of unspent outputs that belong to our address
4. **Handling spending**: Removing UTXOs when they're used as inputs in other transactions
5. **Event sourcing**: All changes are recorded as events for auditability and replay capability

## Step 4: Querying the Balance

To retrieve the current balance, we'll use the transport SDK to query our model:

```typescript
// query-balance.ts
import { Client } from '@easylayer/transport-sdk';

const AGGREGATE_ID = 'bitcoin-balance-monitor';

// Initialize the client
const client = new Client({
  transport: {
    type: 'rpc',
    baseUrl: `http://${process.env.HTTP_HOST || 'localhost'}:${process.env.HTTP_PORT || 3000}`,
  },
});

async function getCurrentBalance() {
  try {
    const { payload } = await client.request('query', 'balance-query-1', {
      constructorName: 'GetModelsQuery',
      dto: {
        modelIds: [AGGREGATE_ID],
      },
    });

    // The response contains the current state of our model
    const balanceModel = payload[0];
    console.log('Current Address:', balanceModel.state.address);
    console.log('Current Balance:', balanceModel.state.getCurrentBalance(), 'BTC');
    console.log('Available UTXOs:', balanceModel.state.outputs.size);
    
    return balanceModel.state;
  } catch (error) {
    console.error('Error querying balance:', error);
  }
}

// Query balance every 30 seconds
setInterval(getCurrentBalance, 30000);
getCurrentBalance(); // Initial query
```

## Advanced Features

### Historical Balance Queries

You can query balance at any specific block height:

```typescript
const { payload } = await client.request('query', 'historical-balance', {
  constructorName: 'GetModelsQuery',
  dto: {
    modelIds: [AGGREGATE_ID],
    filter: {
      blockHeight: 850000  // Get balance at specific block
    }
  },
});
```

### Transaction History

Retrieve the complete transaction history for the address:

```typescript
const { payload } = await client.request('query', 'tx-history', {
  constructorName: 'FetchEvents',
  dto: {
    modelIds: [AGGREGATE_ID],
    paging: {
      limit: 50,
      offset: 0
    }
  },
});
```

## Configuration Options

Set up your environment variables for optimal performance:

```bash
# Bitcoin node connection
BITCOIN_CRAWLER_NETWORK_PROVIDER_SELF_NODE_URL=http://user:pass@localhost:8332

# Or use QuickNode
BITCOIN_CRAWLER_NETWORK_PROVIDER_QUICK_NODE_URLS=https://your-quicknode-url

# Processing configuration
BITCOIN_CRAWLER_START_BLOCK_HEIGHT=0
BITCOIN_CRAWLER_BLOCKS_QUEUE_LOADER_CONCURRENCY_COUNT=4

# Server configuration
HTTP_HOST=localhost
HTTP_PORT=3000
```

## Real-World Considerations

### Performance Optimization

- **Batch Processing**: The model processes entire blocks at once for efficiency
- **Concurrent Downloads**: Configure block download concurrency based on your node's capacity
- **Database Choice**: Use PostgreSQL for production environments with high transaction volumes

### Error Handling

The Bitcoin Crawler automatically handles:
- **Blockchain Reorganizations**: Events are replayed when chain reorganizes
- **Network Interruptions**: Automatic reconnection and block gap filling
- **Invalid Transactions**: Malformed data is skipped with appropriate logging

### Security Best Practices

- Run the crawler in a secure environment
- Use environment variables for sensitive configuration
- Implement proper access controls for the RPC endpoints
- Regular backup of the event store database

## Conclusion

You now have a complete Bitcoin address balance monitor that:
- Processes blockchain data in real-time
- Maintains accurate UTXO state
- Handles blockchain reorganizations automatically
- Provides easy API access to balance information

This foundation can be extended for more complex use cases like:
- Multi-address portfolio tracking
- Payment processing systems
- Blockchain analytics platforms
- Automated trading systems

The event-sourcing architecture ensures your data is always consistent and auditable, making it perfect for financial applications that require high reliability and transparency.

Ready to start monitoring Bitcoin addresses? Install the Bitcoin Crawler and begin building your blockchain applications today!