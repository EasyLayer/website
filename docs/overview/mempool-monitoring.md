---
title: 'Mempool Monitoring'
sidebar_label: 'Mempool Monitoring'
slug: /mempool-monitoring
description: Track unconfirmed Bitcoin and EVM transactions in real time before they land in blocks. Build payment detection, fee market tools, and pre-confirmation alerts with EasyLayer.
keywords: ['mempool monitoring', 'unconfirmed transactions', 'bitcoin mempool', 'ethereum mempool', 'pending transactions', 'real-time blockchain', 'payment detection', 'fee market']
image: /img/el_twitter_default.png
---

# Mempool Monitoring

Mempool monitoring lets you track unconfirmed transactions before they get confirmed in a block. It's optional and disabled by default. Enable it when your application needs to react to pending activity.

---

## What the Mempool Is

Every unconfirmed transaction broadcasts to the network and sits in the mempool until a miner or validator includes it in a block. The mempool is a live, constantly-changing pool of pending activity.

Applications that need pre-confirmation awareness rely on mempool access:

- Payment processors that want to detect incoming payments instantly, before the first confirmation
- Wallet apps showing pending outbound transactions
- Fee estimation tools that analyze current mempool congestion
- Double-spend monitors for high-value transactions

---

## How It Works in EasyLayer

When mempool monitoring is enabled, the crawler polls the connected node for mempool contents on a configurable interval. Each snapshot produces a `MempoolRefreshed` system event containing the current pending transactions.

Your state model can include a `mempool` source handler to process these snapshots and track whatever pending state your application needs.

Confirmed mempool transactions are automatically removed from your mempool state when the crawler sees them included in a block. Your model always reflects the accurate distinction between confirmed and pending.

---

## Enabling Mempool Monitoring

### Bitcoin

```bash
MEMPOOL_ENABLED=true
MEMPOOL_PROVIDER_TYPE=rpc        # uses same node as main provider
PROVIDER_MEMPOOL_RPC_URLS=https://your-node-endpoint

# Optional: custom polling interval (milliseconds)
MEMPOOL_LOADER_TIME=5000
```

### EVM

```bash
MEMPOOL_ENABLED=true
PROVIDER_MEMPOOL_RPC_URLS=https://your-evm-endpoint
```

---

## System Event

When mempool monitoring is active, the crawler emits a built-in system event you can subscribe to directly without writing any model code:

- **Bitcoin**: `BitcoinNetworkMempoolRefreshedEvent`
- **EVM**: `EvmMempoolRefreshedEvent`

```ts
client.subscribe('BitcoinNetworkMempoolRefreshedEvent', (event) => {
  const { transactions } = event.payload;
  console.log(`Mempool: ${transactions.length} pending transactions`);
});
```

---

## Including Mempool State in Your Model

Add a `mempool` source to your declarative model to track pending transactions in your own state:

```ts
const PaymentWatcher = {
  modelId: 'payment-watcher',
  state: {
    confirmed: new Map<string, number>(),
    pending: new Map<string, number>(),
  },
  sources: {
    async mempool(ctx) {
      // ctx.transactions contains all current mempool transactions
      const relevant = ctx.transactions.filter(tx =>
        tx.vout?.some(o => o.scriptPubKey.addresses?.includes('1YourAddress'))
      );
      if (relevant.length) return relevant;
    },
    async block(ctx) {
      if (ctx.locals.mempool?.length) {
        ctx.applyEvent('PendingDeposit', ctx.block.height, { txs: ctx.locals.mempool });
      }
    },
  },
  reducers: {
    PendingDeposit(state, event) {
      for (const tx of event.payload.txs) {
        state.pending.set(tx.txid, tx.vout[0].value);
      }
    },
  },
};
```

---

## Performance Considerations

The mempool can contain tens of thousands of transactions. Processing the full mempool on every poll interval can be CPU-intensive if your filtering logic is not efficient. Keep mempool source handlers lightweight: filter early, process only what you need.

For high-frequency mempool analysis (sub-second updates), consider connecting via ZMQ on Bitcoin, which delivers individual transaction broadcasts rather than full snapshots.

---

## Related

- [Network Providers](/docs/network-providers) — configure the node connection for mempool access
- [System Models](/docs/system-models) — built-in mempool events available without custom model code
- [State Models](/docs/data-modeling) — how to include mempool data in your custom state
