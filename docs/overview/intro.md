---
id: intro
title: Introduction to EasyLayer
slug: /
sidebar_label: Introduction
description: Learn about EasyLayer's self-hosted blockchain tools for developers. Discover our TypeScript-based solutions for blockchain processing, data indexing, and event handling.
keywords: ['blockchain tools', 'self-hosted', 'TypeScript', 'blockchain processing', 'data indexing', 'event handling', 'NestJS', 'CQRS', 'Event Sourcing', 'DDD']
image: /img/el_twitter_default.png
---

Welcome to EasyLayer, a comprehensive suite of **self-hosted blockchain applications** built with [TypeScript](https://www.typescriptlang.org) and powered by [Node.js](https://nodejs.org). Our mission is simple: make blockchain integration so straightforward that developers can focus entirely on their business logic instead of wrestling with Web3 technical complexities.

## What We Build

EasyLayer creates production-ready applications distributed through npm that you can deploy and run on your own infrastructure. We handle the intricate blockchain mechanics—node connections, data synchronization, event processing, and state management—so you don't have to become a blockchain expert to build blockchain-powered applications.

Currently, our ecosystem includes:

- **Blockchain Crawlers**: Intelligent applications that monitor, index, and process blockchain data in real-time and historically
- **Transport Layer**: Flexible communication protocols to interact with crawler applications
- **Wallet Management** *(coming soon)*: Multi-wallet transaction management with built-in transactionality support

Our applications are built using modern event-driven architecture with **Event Sourcing** patterns. Data is stored row-by-row, enabling horizontal scaling and ensuring data integrity. We support both SQLite and PostgreSQL as EventStore databases, giving you flexibility in deployment scenarios.

## Core Features

### Self-Hosted Infrastructure
You maintain complete control over your blockchain infrastructure. No vendor lock-in, no external dependencies, no mysterious third-party services. Deploy on your servers, your cloud, your rules.

### Custom State Modeling
Instead of storing entire blockchain state (which would be massive and mostly irrelevant), you define exactly what data matters to your business. Track specific addresses, smart contracts, or transaction patterns—nothing more, nothing less.

### Real-Time & Historical Data
Subscribe to live blockchain events as they happen, while simultaneously accessing complete historical data. Our crawlers seamlessly handle both real-time streaming and historical backfilling.

### Flexible Transport Layer
Access your blockchain data through multiple protocols:
- **HTTP RPC**: RESTful API endpoints
- **WebSocket**: Real-time bidirectional communication
- **IPC**: Inter-process communication for local applications
- **TCP**: Direct socket connections for high-performance scenarios

### Automatic Reorganization Handling
Blockchain forks and reorganizations are handled automatically. Your application stays consistent even when the blockchain itself reorganizes, ensuring data integrity without manual intervention.

### Multi-Network Support
Built-in support for multiple blockchain networks:
- **Bitcoin** and Bitcoin forks
- **Ethereum** and EVM-compatible networks
- Additional networks continuously being added

## Architecture & Technology

Our applications utilize emphasizing modern, robust, and scalable software architecture. We adhere to proven patterns including:

- **Event Sourcing**: Complete audit trail and state reconstruction capabilities
- **Command Query Responsibility Segregation (CQRS)**: Optimized read and write operations
- **Domain-Driven Design (DDD)**: Business logic organization that scales with complexity

This architectural foundation ensures our solutions are not only powerful but also maintainable, testable, and extensible for enterprise use.

## Getting Started

Setting up EasyLayer applications is designed to be effortless:

1. **Install**: Pull the application from npm
2. **Configure**: Define your blockchain networks and data models
3. **Deploy**: Run on your infrastructure
4. **Connect**: Start querying blockchain data through your preferred transport

Our custom framework allows complete customization of blockchain data management while abstracting away the complexity of node communication, consensus mechanisms, and data synchronization.

## Community

EasyLayer is a community-driven, open-source project built on transparency and collaboration. The EasyLayer team is committed to developing the future of blockchain tooling together with our community. Every insight, piece of feedback, and contribution helps steer the project toward solving real-world problems.

Join our growing community:
- **Discussions**: Share ideas and get help in our [GitHub Discussions](https://github.com/EasyLayer/core/discussions)
- **Blog**: Stay updated with developments on our [Blog](https://easylayer.io/blog)
- **Twitter**: Follow [@easylayer_io](https://twitter.com/easylayer_ios) for updates and insights

## Support

EasyLayer provides free community support through our open-source platform. If you encounter issues or have questions, our [forum](https://github.com/EasyLayer/core/discussions) connects you with both community members and our core team.

For businesses requiring priority assistance, custom solutions, or direct expert access, we offer paid support options. This model helps sustain the project while ensuring the community always has access to free, high-quality tools.

Learn more about our support options and enterprise solutions in our [examples section](https://easylayer.io/docs/examples).

## Philosophy

EasyLayer is built on three foundational principles:

### Simplicity
Blockchain technology should be accessible to all developers, not just cryptography experts. By abstracting complex mechanisms behind intuitive APIs, we enable developers to create value rather than debug protocol implementations.

### Flexibility
Every business has unique blockchain requirements. Our protocol system and customizable data modeling ensure you can tailor applications to your specific needs without compromising on functionality.

### Power
Simplicity doesn't mean sacrificing capability. Our applications handle enterprise-scale demands while maintaining the ease of use that lets small teams move fast and iterate quickly.

By combining these principles with cutting-edge technology and proven architectural patterns, EasyLayer empowers developers to build the next generation of blockchain applications with confidence and speed.

Ready to simplify your blockchain integration? Let's dive into the documentation and start building something amazing together.