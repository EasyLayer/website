---
title: 'Self-Hosted Blockchain Infrastructure'
sidebar: intro
sidebar_label: 'Self Hosted'
slug: /self-hosting
description: Learn how to deploy and manage EasyLayer's self-hosted blockchain applications. Complete guide to installation, configuration, and infrastructure management.
keywords: ['self-hosted blockchain', 'blockchain infrastructure', 'Node.js deployment', 'blockchain node setup', 'EasyLayer deployment', 'npm blockchain tools', 'blockchain configuration']
image: /img/el_twitter_default.png
---

Self-hosted means you download, deploy, and run EasyLayer applications on your own servers or cloud infrastructure. You're not dependent on external services, third-party APIs, or vendor availability. Your blockchain data processing happens within your network perimeter, ensuring maximum security, privacy, and control.

## Key Benefits of Self-Hosting

**Complete Data Ownership**: Your blockchain data never leaves your infrastructure. No third-party services have access to your data.

**Zero Vendor Lock-in**: Switch providers, modify configurations, or scale independently without being constrained by external service limitations or pricing models.

**Customizable Performance**: Optimize hardware, database configurations, and network settings specifically for your use case and traffic patterns.

**Compliance & Security**: Meet enterprise security requirements and regulatory compliance standards by keeping all data processing within your controlled environment.

**Cost Predictability**: No per-request fees or usage-based pricing surprises. Your infrastructure costs are predictable and scalable according to your needs.

## Installation Requirements

### Prerequisites

To run EasyLayer applications, you need:

- **Node.js** (version 17 or higher)
- **npm** or **yarn** package manager
- **Database**: SQLite or PostgreSQL
- **Blockchain Node Access**: Either your own blockchain node or provider access (like [QuickNode]https://www.quicknode.com))

Each application comes as a complete, ready-to-run package with all necessary dependencies included.

## Application Architecture

### Bootstrap Function

Every EasyLayer application exports an asynchronous `bootstrap` function that serves as the main entry point:

```typescript
import { bootstrap } from '@easylayer/bitcoin-crawler';

bootstrap().catch(error => console.error(error));
```

The bootstrap function:
- Initializes the application with your configuration
- Establishes database connections
- Connects to blockchain nodes
- Starts event processing and data synchronization
- Launches the transport layer (HTTP, WebSocket, etc.)

### Configuration Management

All application settings are managed through environment variables, typically stored in a `.env` file in your application root:

```env
# Blockchain Node Configuration
BITCOIN_CRAWLER_NETWORK_PROVIDER_SELF_NODE_URL=https://your-node-endpoint.com
```

Need help with deployment? Join our [community discussions](https://github.com/EasyLayer/core/discussions) or check out our [deployment examples](https://easylayer.io/docs/examples) for detailed configurations.