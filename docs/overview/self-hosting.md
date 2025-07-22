---
title: 'Self-Hosted Web3 Infrastructure | EasyLayer Framework'
sidebar: intro
sidebar_label: 'Self-Hosted & Private'
slug: /self-hosting
description: Deploy EasyLayer's web3 integration framework entirely on your infrastructure with SQLite or PostgreSQL support. Complete data ownership, GDPR compliance, zero vendor lock-in. Deploy on AWS, Azure, Google Cloud or on-premises with full control over your web3 applications.
keywords: ['self-hosted web3', 'web3 infrastructure', 'Node.js deployment', 'web3 integration', 'EasyLayer deployment', 'npm web3 tools', 'web3 configuration', 'PostgreSQL web3', 'SQLite web3', 'GDPR compliance', 'enterprise web3']
image: /img/el_twitter_default.png
---

# Self-Hosted & Private

EasyLayer is a web3 integration framework designed for complete deployment on your own infrastructure. Your EventStore data remains entirely within your controlled environment, supporting both [SQLite](https://sqlite.org/) for rapid development and [PostgreSQL](https://postgresql.org/) for production-scale applications.

## Complete Control & Compliance

Your web3 data never leaves your infrastructure. No third-party services have access to your sensitive information, ensuring full data sovereignty and maximum privacy protection. Perfect for European businesses requiring GDPR compliance and regulatory adherence by maintaining all data processing within your controlled environment.

Switch cloud providers, modify configurations, or scale independently without external service constraints or unpredictable pricing models. Deploy seamlessly across [AWS](https://aws.amazon.com/) ECS, Lambda functions, other cloud platforms, or on-premises infrastructure according to your operational requirements.

## Database Support

**[SQLite](https://sqlite.org/) Database**: Ideal for development, testing, and lightweight production environments with zero configuration required, file-based storage for fast deployment, and perfect for prototyping and small-scale applications.

**[PostgreSQL](https://postgresql.org/) Database**: Enterprise-grade solution for production workloads with high-performance concurrent operations, advanced optimization, and battle-tested reliability for mission-critical applications.

## Requirements & Setup

To run EasyLayer applications, you need:
- **[Node.js](https://nodejs.org/)** (version 17 or higher)
- **[npm](https://www.npmjs.com/)** or **[yarn](https://yarnpkg.com/)** package manager
- **Database**: [SQLite](https://sqlite.org/) or [PostgreSQL](https://postgresql.org/)
- **Blockchain RPC Access**: Either your own blockchain node or provider access (like [QuickNode](https://www.quicknode.com))

All application settings are managed through environment variables, typically stored in a `.env` file in your application root:

```env
# Blockchain Node Configuration
BITCOIN_CRAWLER_NETWORK_PROVIDER_NODE_HTTP_URL=https://your-node-endpoint.com
```

## Deployment Options

Deploy on cloud platforms like [AWS](https://aws.amazon.com/) ECS, AWS Lambda, [Google Cloud](https://cloud.google.com/) Run, [Azure](https://azure.microsoft.com/) Container Instances, or use traditional server installations, [Docker](https://docker.com/) containerization, [Kubernetes](https://kubernetes.io/) orchestration, and hybrid cloud configurations for on-premises infrastructure.

## Quick Start Installation Guide

TODO

Need help with deployment? Join our [community discussions](https://github.com/EasyLayer/core/discussions) or check out our [deployment examples](https://easylayer.io/docs/examples) for detailed configurations.