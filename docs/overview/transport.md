---
title: 'Transport API - Multiple Protocols for Easylayer Applications'
description: 'Connect to Easylayer applications via HTTP RPC, WebSocket, TCP, or IPC. Support for real-time events, multiple simultaneous transports, and unified transport-sdk client.'
keywords: ['transport api', 'easylayer', 'websocket', 'tcp', 'http rpc', 'ipc', 'real-time events', 'transport-sdk']
sidebar: intro
sidebar_label: 'Transport API'
slug: '/transport'
---

# Transport API

Easylayer applications support multiple transport protocols for flexible client-server communication. Choose the transport that best fits your use case and infrastructure requirements.

## Supported Transports

### HTTP RPC
Traditional request-response communication over HTTP protocol.
- **Use case**: Web applications, REST-like interactions
- **Events**: Not supported
- **Connection**: Stateless

### WebSocket (WS)
Real-time bidirectional communication over WebSocket protocol.
- **Use case**: Real-time applications, live updates
- **Events**: Full support with subscriptions
- **Connection**: Persistent

### TCP
Direct TCP socket communication for high-performance scenarios.
- **Use case**: High-throughput applications, low-latency requirements
- **Events**: Full support with subscriptions
- **Connection**: Persistent

### IPC (Inter-Process Communication)
Communication between processes on the same machine.
- **Use case**: Child process communication, local integrations
- **Events**: Full support with subscriptions
- **Connection**: Local only
- **Limitation**: Works only as a child process

## Multiple Transport Support

Easylayer applications can run multiple transports simultaneously, allowing clients to connect using their preferred protocol. Configure multiple transports in your application settings to provide maximum flexibility.

## Event Subscriptions

Real-time event subscriptions are available on all transports except HTTP RPC:
- ✅ WebSocket: Full event streaming
- ✅ TCP: Full event streaming  
- ✅ IPC: Full event streaming
- ❌ HTTP RPC: Request-response only

## Transport SDK

The `transport-sdk` package provides a unified client interface for connecting to Easylayer applications across all supported transports. It handles protocol differences and provides a consistent API for your client applications.

```javascript
import { TransportClient } from 'transport-sdk';

// Connect using your preferred transport
const client = new TransportClient({
  transport: 'ws', // 'http', 'ws', 'tcp', or 'ipc'
  url: 'ws://localhost:3000'
});
```

## Getting Started

1. Configure your desired transports in the application settings
2. Install the `transport-sdk` for client-side integration
3. Choose the appropriate transport based on your requirements
4. Start building your connected application

The transport layer abstracts protocol complexity while providing the performance and features you need for modern applications.