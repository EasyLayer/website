---
title: State Models
slug: /data-modeling
sidebar_label: State Models
description: Define the focused blockchain state your application needs and let EasyLayer maintain it from blocks, logs, transactions, or mempool data.
keywords: ['blockchain state model', 'custom blockchain state', 'EasyLayer models', 'Bitcoin state model', 'EVM state model']
image: /img/el_twitter_default.png
---

# State Models

A State Model is the part you own. It defines what blockchain data becomes product state.

EasyLayer owns the runtime around it: block loading, persistence, event history, state restore, transport delivery, and integration with system models.

## The model boundary

```text
Raw blockchain data
        |
        v
Model filter / processing logic
        |
        v
Domain events produced by your model
        |
        v
Model state reconstructed from events
```

A model should not try to keep everything. It should keep the state your product needs.

Examples:

| Product state | Model responsibility |
|---|---|
| Selected wallet balances | Track outputs/transfers relevant to the selected addresses. |
| One contract state | Read logs/calls for that contract and maintain domain state. |
| Fee dashboard | Aggregate block/transaction fee data into current statistics. |
| Protocol monitor | Convert protocol-specific events into alerts or status. |
| Desktop wallet data | Keep local state in a desktop/browser-compatible store. |

## Why this matters for storage

A full blockchain dataset can be large because it stores every block, transaction, log, input, output, and historical detail.

A focused EasyLayer model can store only the events/state your application needs. For example, if your product monitors one smart contract, the model does not need to persist unrelated contracts. If your wallet tracks selected addresses, the model does not need to keep every address on the chain.

Do not publish exact storage numbers until they are measured for a concrete workload. The correct public claim is qualitative:

```text
EasyLayer lets the application persist focused model state instead of storing unrelated full-chain data.
```

## What a model contains

A model normally has three parts:

| Part | Purpose |
|---|---|
| State | The data you want to query later. |
| Event decisions | The logic that decides when a block/log/transaction changes that state. |
| Reducers | The logic that applies each event to state. |

## Small first model

A useful first model is small enough to verify manually.

```text
Track one contract or address list
        |
        v
Emit one event type
        |
        v
Maintain one state object
        |
        v
Expose one query
```

After that works, expand the model.

## Model styles

Package-specific docs show the exact API for each package/version. Conceptually, EasyLayer supports two model styles.

### Declarative model

Good for straightforward scanning and reducers.

```ts
const ContractEventsModel = {
  modelId: 'contract-events',
  state: {
    totalEvents: 0,
  },
  sources: {
    async log(ctx) {
      if (ctx.log.address !== TARGET_CONTRACT) return;
      return { transactionHash: ctx.log.transactionHash };
    },
    async block(ctx) {
      const events = ctx.locals.log ?? [];
      if (events.length > 0) {
        ctx.applyEvent('ContractEventsObserved', ctx.blockNumber, { events });
      }
    },
  },
  reducers: {
    ContractEventsObserved(state, event) {
      state.totalEvents += event.payload.events.length;
    },
  },
};
```

### Class-based model

Good when the model needs more control over iteration, validation, branching, or cross-transaction logic.

```ts
export class WalletActivityModel extends Model {
  static override modelId = 'wallet-activity';

  public activity = [];

  async processBlock(ctx) {
    for (const tx of ctx.block.tx ?? []) {
      // inspect only the transactions relevant to your product
      // then emit a domain event
    }
  }
}
```

## What not to put into a model

Do not put unrelated full-chain storage into a model just because the raw data is available.

A model is not a warehouse. It is a product-specific state boundary.

If the product later needs large historical projections, design a separate read model/projection path instead of overloading the live state model.

## Related

- [EventStore](/docs/event-store)
- [Network Providers](/docs/network-providers)
- [Transport Layer](/docs/transport-layer)
