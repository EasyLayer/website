---
title: 'Network Providers'
sidebar_label: 'Network Providers'
slug: /network-providers
description: Connect EasyLayer to a Bitcoin or EVM blockchain node via RPC, WebSocket, P2P, or ZMQ. Supports external providers like QuickNode and Alchemy.
keywords: ['blockchain node connection', 'bitcoin rpc', 'ethereum rpc', 'quicknode', 'alchemy', 'p2p bitcoin', 'zmq bitcoin', 'blockchain provider']
image: /img/el_twitter_default.png
---

# Network Providers

A network provider is how the crawler connects to a blockchain node and fetches blocks. EasyLayer supports multiple connection strategies for Bitcoin-like and EVM chains, and works with both self-hosted nodes and external providers.

---

## Bitcoin Providers

### RPC (recommended for most setups)

Connects via JSON-RPC over HTTP. Works with any Bitcoin node and all major external providers. The crawler uses **2 RPC calls per block** during historical sync, which means the QuickNode free tier covers millions of blocks without extra cost.

```bash
PROVIDER_NETWORK_RPC_URLS=https://user:pass@your-node:8332
# or external provider:
PROVIDER_NETWORK_RPC_URLS=https://your-endpoint.quicknode.pro/abc123
```

**Failover**: provide comma-separated URLs. The crawler switches automatically when a provider fails.

```bash
PROVIDER_NETWORK_RPC_URLS=https://primary-node:8332,https://fallback-node:8332
```

### RPC + ZMQ

Combines RPC for historical blocks with ZMQ subscriptions for real-time new-block notifications. Lower latency for live mode, requires ZMQ enabled on your node.

```bash
NETWORK_PROVIDER_TYPE=rpc-zmq
PROVIDER_NETWORK_ZMQ_URL=tcp://your-node:28332
```

### P2P

Connects directly using the Bitcoin peer-to-peer protocol. No RPC node required. Useful for restricted environments or when you want to minimize external dependencies.

```bash
NETWORK_PROVIDER_TYPE=p2p
```

---

## EVM Providers

EVM Crawler connects via JSON-RPC (HTTP) or WebSocket. Works with Ethereum, BSC, Polygon, Arbitrum, Optimism, Base, and any EVM-compatible chain.

```bash
NETWORK_CHAIN_ID=1                              # 1=Ethereum, 56=BSC, 137=Polygon, etc.
PROVIDER_NETWORK_RPC_URLS=https://mainnet.infura.io/v3/YOUR_KEY
# WebSocket for real-time:
PROVIDER_NETWORK_WS_URLS=wss://mainnet.infura.io/ws/v3/YOUR_KEY
```

### Receipt Strategy

Configure how receipts (and thus logs) are fetched:

| Strategy | How it works | Best for |
|---|---|---|
| `auto` | Tries `eth_getBlockReceipts`, falls back per-transaction | Most providers |
| `block-receipts` | Strict batch mode | Providers that support batch receipts |
| `transaction-receipts` | One receipt per transaction | Maximum compatibility |

```bash
RECEIPTS_STRATEGY=auto
```

### Trace Support

Enable trace data when your provider supports `debug_traceBlock` or `trace_block`:

```bash
TRACES_ENABLED=true
```

The crawler checks provider capability at startup and fails immediately if traces are unavailable, so you never get silent missing data.

---

## Historical Sync and Real-Time Mode

Both Bitcoin and EVM crawlers handle sync in two phases:

1. **Historical**: reads blocks from `START_BLOCK_HEIGHT` (or genesis if unset) to the current chain tip as fast as your provider allows
2. **Real-time**: switches automatically once caught up, follows new blocks as they arrive

```bash
START_BLOCK_HEIGHT=840000  # start from a recent block, skip old history
# omit to start live-only
```

---

## Supported External Providers

| Provider | Bitcoin | EVM | Free tier |
|---|---|---|---|
| QuickNode | Yes | Yes | Yes |
| Alchemy | No | Yes | Yes |
| Infura | No | Yes | Yes |
| Self-hosted node | Yes | Yes | N/A |
| Any RPC-compatible | Yes | Yes | Varies |

---

## Related

- [State Models](/docs/data-modeling) — what the crawler feeds your state with
- [Event Store](/docs/event-store) — where events are persisted
