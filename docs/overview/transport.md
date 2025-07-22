---
title: 'Transport API - Multiple Protocols | EasyLayer Framework'
sidebar: intro
sidebar_label: 'API & Transports'
slug: /transport
description: Connect to EasyLayer applications via HTTP RPC, WebSocket, TCP, or IPC. Support for real-time events, multiple simultaneous transports, and unified transport-sdk client for seamless integration.
keywords: ['transport API', 'HTTP RPC', 'WebSocket', 'TCP', 'IPC transport', 'real-time events', 'transport-sdk', 'EasyLayer API', 'event streaming', 'client-server communication', 'desktop applications']
image: /img/el_twitter_default.png
---

# API & Transports

EasyLayer applications provide flexible transport options for client-server communication. Choose from HTTP, WebSocket, TCP, or IPC protocols based on your application requirements, with unified client SDK for seamless integration.

## Available Transport Protocols

### HTTP RPC Transport
Out-of-the-box [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) server with standardized RPC API endpoints:

- **RPC Queries**: Send any RPC request through a unified endpoint
- **Stream Endpoint**: Access real-time data streams via HTTP streaming
- **RESTful Interface**: Standard HTTP methods for easy integration with existing systems

### WebSocket Transport
[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) connections provide real-time bidirectional communication:

- **Query Requests**: Send queries similar to HTTP RPC with instant responses
- **Event Subscriptions**: Subscribe to real-time system and custom events
- **Stream Processing**: Handle continuous data streams with low latency
- **Guaranteed Delivery**: At-least-once delivery mechanism ensures events reach clients

### IPC (Inter-Process Communication)
Parent-child process communication for specialized applications:

- **Desktop Applications**: Perfect for desktop software requiring blockchain integration
- **Process Separation**: Isolate blockchain processing from main application logic
- **Local Development**: Efficient communication for local development environments
- **High Performance**: Direct process communication without network overhead

## Unified Client SDK

**[@easylayer/transport-sdk](https://www.npmjs.com/package/@easylayer/transport-sdk)** provides a consistent interface across all transport protocols:

```javascript
import { Client } from '@easylayer/transport-sdk';

// HTTP transport
const client = new Client({ 
  transport: {
    type: 'http',
    baseUrl: 'http://localhost:3000'
  }
});
```

## Real-Time Event System

### Event Types
- **System Events**: Built-in blockchain events (blocks, transactions, reorganizations)
- **Custom Events**: User-defined application events and business logic triggers

### Event Handling
Subscribe to events with handlers for real-time processing:

```javascript
// Subscribe to new blocks
client.subscribe('NewBlockEvent', (event) => {
  console.log('New block:', event.blockHeight);
});

// Handle custom business events
client.subscribe('CustomUserEvent', (event) => {
  // Process custom application logic
});
```

### Guaranteed Delivery
**At-Least-Once Delivery**: Events are guaranteed to be delivered to subscribed clients. If synchronization issues occur between application and client, missed events are delivered after successful reconnection.

**Resilient Connections**: Automatic reconnection and event replay mechanisms ensure no data loss during temporary disconnections.

Ready to integrate with EasyLayer transports? Check our [transport examples](https://easylayer.io/docs/examples) and join our [community discussions](https://github.com/EasyLayer/core/discussions) for implementation guidance.