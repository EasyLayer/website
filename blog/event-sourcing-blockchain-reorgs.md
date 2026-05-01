---
title: "How Event Sourcing Solves Blockchain Reorganizations Automatically"
authors: [yarikp]
tags: [blockchain, event-sourcing, reorg, reorganization, bitcoin, ethereum, easylayer]
date: 2025-05-10T10:30:00Z
description: Blockchain reorganizations are one of the hardest problems to handle correctly in blockchain applications. Event Sourcing solves them automatically — here's how.
keywords: ['blockchain reorganization', 'blockchain reorg handling', 'event sourcing blockchain', 'bitcoin reorg', 'ethereum reorg', 'blockchain state consistency', 'easylayer reorg']
image: /img/blog/main-default-img.png
---

Blockchain reorganizations are one of the most underestimated problems in blockchain application development. Most developers know they exist. Far fewer have dealt with the fallout when their application handles one incorrectly.

EasyLayer handles reorgs automatically through Event Sourcing. Here's what that means in practice.

<!--truncate-->

## What Is a Blockchain Reorganization?
"
In a blockchain network, miners (or validators) can produce competing blocks at the same height. When two valid blocks appear at the same time, different parts of the network temporarily disagree on which one is canonical. The network resolves this by extending the longest chain — the shorter competing chain gets "orphaned."

When this happens, any transactions that were only in the orphaned chain are back in the mempool (or may never confirm). Applications that treated those transactions as confirmed are now in an inconsistent state.

This is a reorg. They happen constantly:

- **Bitcoin:** 1-block reorgs happen a few times per year on mainnet; shorter forks happen more often on testnet
- **Ethereum:** 1-block reorgs happen occasionally; L2 chains can have them more frequently
- **Solana, BSC, other high-speed chains:** short reorgs are common by design

The longer the reorg (how many blocks are rolled back), the more damage to application state that hasn't handled it.

## How Applications Typically Break

Consider a simple payment processor that marks a payment as "confirmed" when it appears in a block:

```
Block 850000 received → payment 0xabc found → mark as CONFIRMED
```

If block 850000 gets orphaned in a 2-block reorg:

```
Block 850000 orphaned ← this payment was never really confirmed
Block 850001 orphaned
New block 850000' → payment 0xabc NOT here → was it double-spent?
New block 850001'
```

If your application didn't handle the reorg, you now have a "confirmed" payment in your database that never actually confirmed. The customer's payment attempt may have failed. Or worse — they got credited and the payment is gone.

The naive fix is to "watch for reorgs and undo things." But what exactly do you undo? How far back? How do you know what state you were in before those blocks? This gets complicated fast.

## The Event Sourcing Approach

Event Sourcing solves this problem at the architecture level by making it impossible to have inconsistent state.

The core idea: **never store the current state directly. Store the sequence of events that produced the state. Reconstruct state by replaying events.**

In EasyLayer, every state change is stored as an immutable event in the EventStore:

```
Event 1: BlockProcessed { height: 850000, deposits: [{address: '1A1z', value: 0.5}] }
Event 2: BlockProcessed { height: 850001, deposits: [...] }
Event 3: BlockProcessed { height: 850002, deposits: [...] }
```

When a reorg occurs, the framework knows exactly which events correspond to which blocks. It rolls back events from orphaned blocks in reverse order, then replays the correct chain:

```
Reorg detected at height 850000
→ Roll back Event 3 (block 850002)
→ Roll back Event 2 (block 850001)
→ Roll back Event 1 (block 850000)
→ Apply new Event 1' (block 850000' — the canonical chain)
→ Apply new Event 2' (block 850001')
→ Apply new Event 3' (block 850002')
State is now consistent with the canonical chain
```

Your application code doesn't change at all. The model you wrote — the Aggregate — defines how to apply and roll back events. The framework handles detecting the reorg and calling the right operations.

## What This Looks Like in Code

When you define a model in EasyLayer, you write reducers that update state when an event is applied:

```ts
const DepositTracker = {
  modelId: 'deposits',
  state: { confirmed: new Map<string, number>() },

  sources: {
    async vout(ctx) {
      const address = ctx.vout.scriptPubKey.addresses?.[0];
      if (!address) return;
      return { address, value: ctx.vout.value, txid: ctx.tx.txid };
    },
    async block(ctx) {
      if (ctx.locals.vout?.length) {
        ctx.applyEvent('DepositFound', ctx.block.height, { outputs: ctx.locals.vout });
      }
    },
  },

  reducers: {
    DepositFound(state, event) {
      for (const { address, value } of event.payload.outputs) {
        state.confirmed.set(address, (state.confirmed.get(address) ?? 0) + value);
      }
    },
  },
};
```

The framework uses Event Sourcing internally to handle reorgs. Because events are stored immutably and state is reconstructed from them, rolling back a block means rolling back the events from that block — the state automatically returns to what it was before.

No special rollback code. No "undo" logic in your application. No database transactions to manually reverse.

## Historical Queries as a Bonus

The same architecture that makes reorg handling automatic also gives you historical queries for free.

Because state is stored as an event sequence, you can reconstruct what the model's state was at any block height:

```ts
// What were the confirmed balances at block 849999?
const result = await client.query('GetModelsQuery', {
  modelIds: ['deposits'],
  filter: { blockHeight: 849999 },
});
```

This is useful for compliance (prove what a balance was at a specific time), auditing, debugging, and analytics.

## In Practice

EasyLayer's crawlers handle reorgs of any length automatically. The system detects when the new block's `previousblockhash` doesn't match the last indexed block, triggers a rollback to the divergence point, and replays the canonical chain. This happens in the background — your application keeps running, clients keep receiving events, state stays consistent.

For most Bitcoin applications, this means you can treat reorg handling as a solved problem and focus on your business logic.

Full documentation: [EasyLayer docs](/docs) · Questions: [GitHub Discussions](https://github.com/easylayer/core/discussions)
