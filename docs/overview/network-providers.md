---
title: Network Providers
slug: /network-providers
sidebar_label: Network Providers
description: Understand how EasyLayer connects to blockchain nodes and RPC providers without forcing your application to store unrelated chain data.
keywords: ['blockchain RPC provider', 'Bitcoin node', 'EVM RPC', 'EasyLayer provider', 'self-hosted blockchain crawler']
image: /img/el_twitter_default.png
---

# Network Providers

A network provider is how the crawler reads blockchain data.

EasyLayer does not replace the blockchain node or RPC provider. It uses one to fetch blocks, transactions, logs, traces, mempool data, or network status, then feeds only the relevant data into your models.

## Provider role

```text
Node / RPC provider
        |
        v
Crawler package
        |
        v
Model processing
        |
        v
EventStore + transports
```

The provider supplies raw chain data. Your model decides what part becomes application state.

## Own node vs RPC provider

| Option | Good for | Trade-off |
|---|---|---|
| Own node | Maximum control, predictable access, no third-party dependency. | More disk, setup, monitoring, and maintenance. |
| RPC provider | Faster start, easier testing, no node operations. | Rate limits, pricing, payload limits, provider-specific behavior. |

EasyLayer is useful in both cases. Even when the provider has the full chain, your application does not need to store unrelated full-chain data if your model only needs focused state.

## Bitcoin-like chains

Bitcoin-style crawlers usually need block data and transaction/output data. The model can track a narrow UTXO/address subset without turning the application database into a full blockchain archive.

Typical first models:

- selected wallet activity;
- selected UTXO set;
- fee statistics;
- block progress/system monitoring.

## EVM-compatible chains

EVM crawlers usually need blocks, transactions, receipts, logs, and optionally traces or mempool data depending on the model.

Typical first models:

- events for one contract;
- transfers relevant to selected addresses;
- protocol-specific status from logs;
- selected call/trace monitoring when the provider supports it.

## Rate limits and payload size

Provider performance is not only requests per second. Large block responses, trace calls, receipts, and historical sync can be heavy.

Start with a narrow model and measure:

```text
blocks processed per minute
provider latency
timeouts/retries
payload size
EventStore growth
model state growth
```

Do not publish benchmark numbers until they are measured for the exact package, network, provider, model, and storage backend.

## Start height

A crawler normally needs a start height or checkpoint strategy.

For evaluation:

```text
start from a recent block range
prove the model logic
then decide how much history to replay
```

Do not begin with full-history sync unless it is necessary for the proof.

## Related

- [State Models](/docs/data-modeling)
- [EventStore](/docs/event-store)
- [Mempool Monitoring](/docs/mempool-monitoring)
