---
title: 'State Models'
sidebar_label: 'State Models'
slug: /data-modeling
description: Define what blockchain state your application needs to track. EasyLayer keeps it live and consistent on every block.
keywords: ['blockchain state model', 'custom blockchain data', 'blockchain state tracking', 'on-chain state', 'EasyLayer models', 'bitcoin state', 'ethereum state']
image: /img/el_twitter_default.png
---

# State Models

You tell EasyLayer what on-chain state to maintain. The framework keeps it current, handles reorgs, and serves it to your app. You never touch block parsing infrastructure.

---

## The Core Idea

Traditional blockchain indexers store everything first, then let you query. You get a massive generic dataset and fight to extract what you need.

EasyLayer works differently. You define a State Model: exactly the data your application cares about. The framework feeds blocks into your model, tracks changes as events, and keeps the state live. Your database stays focused and fast. A model tracking a few thousand addresses might use tens of megabytes where a full-node index uses terabytes.

---

## What a Model Defines

Every model has three parts:

**State** is the data you maintain. It can be anything: a map of wallet balances, a list of contract events, a UTXO set, running fee statistics, whatever your application needs. You define the shape.

**Block processing logic** is the code that runs on every new block. It decides which parts of the block matter and records what changed. This is where your business logic lives.

**Event reducers** describe how each recorded change updates the state. Because changes are stored as an ordered log before being applied, the framework can replay or reverse them during a reorg without any extra work from you.

---

## Two Styles

**Declarative** models are objects with `state`, `sources`, and `reducers` fields. Good for most use cases: tracking balances, monitoring addresses, indexing contract events.

```ts
const WalletTracker = {
  modelId: 'wallets',
  state: { balances: new Map<string, bigint>() },
  sources: {
    async vout(ctx) {
      const addr = ctx.vout.scriptPubKey.addresses?.[0];
      if (addr) return { addr, value: ctx.vout.value };
    },
    async block(ctx) {
      if (ctx.locals.vout?.length)
        ctx.applyEvent('Deposit', ctx.block.height, { outputs: ctx.locals.vout });
    },
  },
  reducers: {
    Deposit(state, event) {
      for (const { addr, value } of event.payload.outputs ?? []) {
        state.balances.set(addr, (state.balances.get(addr) ?? 0n) + BigInt(value * 1e8));
      }
    },
  },
};
```

**Class-based** models extend `Model` for complex logic, custom validation, or when you want full TypeScript class features.

---

## What You Get from One Model

- **Live state**: updated on every block, always reflects the current chain tip
- **Historical queries**: query state as it was at any past block height
- **Reorg recovery**: orphaned blocks rolled back, correct chain replayed, state stays consistent
- **Event history**: full log of every change, queryable and filterable
- **Multiple transports**: HTTP, WebSocket, IPC, Electron, Browser

---

## Running Multiple Models

You can run several models in a single crawler instance. Each handles a different concern:

```ts
bootstrap({
  Models: [WalletTracker, FeeMonitor, MempoolWatcher],
});
```

Each model processes the same blocks independently and maintains its own state. Query them separately or together.

---

## State Size

A focused model is small. Tracking 10,000 wallet balances on Bitcoin: a few megabytes. Tracking all ERC-20 transfers for one contract over the last year: a few hundred megabytes in SQLite, easily.

For very large datasets (full UTXO set, all addresses on-chain), the in-process state grows accordingly. At that scale, the enterprise Read Model layer is the right tool: SQL projections optimized for high-volume reads, updated from the same event stream. See [Enterprise](/enterprise).

---

## Related

- [Event Store and Databases](/docs/event-store) — how events are persisted
- [Network Providers](/docs/network-providers) — how blocks are fetched
- [Transport Layer](/docs/transport-layer) — how clients access your state
