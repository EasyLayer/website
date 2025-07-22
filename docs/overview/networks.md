---
title: 'Supported Blockchain Networks - Bitcoin, Ethereum & More | EasyLayer Framework'
sidebar: intro
sidebar_label: 'Supported Blockchain Networks'
slug: /networks
description: Connect EasyLayer applications to Bitcoin, Ethereum networks and their forks. Use your own node or supported providers like QuickNode for blockchain connectivity across Bitcoin Core compatible and EVM-compatible networks.
keywords: ['blockchain networks', 'bitcoin crawler', 'ethereum support', 'EVM networks', 'bitcoin forks', 'blockchain nodes', 'QuickNode', 'BSC', 'Polygon', 'L2 networks', 'web3.js', 'ethers.js', 'bitcoin core API']
image: /img/el_twitter_default.png
---

# Supported Blockchain Networks

EasyLayer provides specialized crawler packages for major blockchain ecosystems, supporting both native networks and their compatible forks. Connect to any network using your own nodes or trusted providers.

## Bitcoin Core Compatible Networks

**[@easylayer/bitcoin-crawler](https://www.npmjs.com/package/@easylayer/bitcoin-crawler)** supports [Bitcoin](https://bitcoin.org/) and all networks compatible with [Bitcoin Core API](https://developer.bitcoin.org/reference/rpc/):

- **Bitcoin (BTC)**: The original cryptocurrency network
- **Bitcoin Cash (BCH)**: Bitcoin fork with larger block sizes  
- **Dogecoin (DOGE)**: Popular meme cryptocurrency network
- **Litecoin (LTC)**: Silver to Bitcoin's gold
- **Other Bitcoin Forks**: Any network implementing Bitcoin Core RPC compatibility

**API Compatibility**: Works with any blockchain that implements the standard Bitcoin Core RPC interface, providing consistent data access across Bitcoin-derived networks.

## EVM Compatible Networks

**[@easylayer/evm-crawler](https://www.npmjs.com/package/@easylayer/evm-crawler)** supports [Ethereum](https://ethereum.org/) and all EVM-compatible networks that work with [web3.js](https://web3js.readthedocs.io/) and [ethers.js](https://docs.ethers.org/):

### Layer 1 Networks
- **Ethereum (ETH)**: The original smart contract platform
- **Binance Smart Chain (BSC)**: High-performance EVM-compatible network
- **Polygon (MATIC)**: Ethereum scaling solution
- **Avalanche C-Chain**: Fast, low-cost EVM network

### Other EVM Networks
- **Arbitrum**: Optimistic rollup scaling solution
- **Optimism**: Another optimistic rollup for Ethereum
- **Polygon zkEVM**: Zero-knowledge Ethereum Virtual Machine
- **Base**: Coinbase's Layer 2 network

## Planned Network Expansion

**Coming Soon**: We're actively developing crawler packages for additional major blockchain ecosystems:

- **[Solana](https://solana.com/)**: High-performance blockchain for decentralized applications
- **[TON](https://ton.org/)**: The Open Network, originally developed by Telegram

## Custom Network Requests

**Need a Specific Network?** If you require support for a blockchain network not currently listed, we'd love to hear from you:

- Join our [community discussions](https://github.com/EasyLayer/core/discussions) to request new networks
- Connect with our development team for enterprise network integration needs

Ready to start building on your preferred network? Check our [configuration examples](https://easylayer.io/docs/examples) for network-specific setup guides.