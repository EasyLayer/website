---
title: 'Supported Blockchain Networks - Bitcoin, Ethereum & More'
description: 'Connect Easylayer applications to Bitcoin, Ethereum networks and their forks. Use your own node or supported providers like QuickNode for blockchain connectivity.'
keywords: ['blockchain networks', 'bitcoin crawler', 'ethereum support', 'blockchain nodes', 'quicknode', 'blockchain providers', 'bitcoin forks']
sidebar: intro
sidebar_label: 'Networks'
slug: '/networks'
---

# Supported Networks

Easylayer applications connect to various blockchain networks through dedicated crawlers that synchronize and process blockchain data in real-time.

## Currently Supported

### Bitcoin & Bitcoin Forks
Our Bitcoin crawler supports Bitcoin mainnet and all Bitcoin-based networks including:
- **Bitcoin** (BTC)
- **Bitcoin Cash** (BCH)
- **Litecoin** (LTC)
- **Dogecoin** (DOGE)
- **Other Bitcoin forks** with compatible protocols

The Bitcoin crawler handles UTXO tracking, transaction processing, and block reorganisations across all supported networks.

## Coming Soon

### Ethereum & EVM Networks
Ethereum support is currently in development and will include:
- **Ethereum mainnet**
- **Layer 2 solutions** (Polygon, Arbitrum, Optimism)
- **EVM-compatible chains** (BSC, Avalanche, Fantom)
- **Ethereum testnets** (Goerli, Sepolia)

## Node Connectivity

Easylayer applications require connection to blockchain nodes to access network data. You have several options:

### Your Own Node
Run your own blockchain node for:
- **Full control** over data access and performance
- **Maximum reliability** and uptime
- **Cost optimization** for high-volume applications
- **Enhanced privacy** and security

### Supported Providers

#### QuickNode
We provide a built-in adapter for QuickNode, offering:
- **Easy setup** with API key configuration
- **Reliable infrastructure** with global endpoints
- **Multiple networks** support through single provider
- **Managed service** without node maintenance

```javascript
// QuickNode configuration example
{
  provider: 'quicknode',
  apiKey: 'your-quicknode-api-key',
  network: 'bitcoin-mainnet'
}
```

### Request Additional Providers

Need support for other blockchain infrastructure providers? Let us know in our [GitHub Discussions](https://github.com/easylayer/discussions) and we'll prioritize based on community demand.

Popular providers we're considering:
- Alchemy
- Infura
- Moralis
- Ankr
- GetBlock

## Getting Started

1. **Choose your network** from supported options
2. **Set up node access** (own node or provider)
3. **Configure your application** with connection details
4. **Start building** your blockchain application

Whether you're building on Bitcoin's proven network or preparing for Ethereum's smart contract capabilities, Easylayer provides the infrastructure to connect your applications to the blockchain world.