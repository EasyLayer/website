---
title: 'Transport Layer & SDK'
sidebar_label: 'Transport Layer & SDK'
slug: /transport-layer
description: Learn about transport protocols in EasyLayer's framework. Access blockchain data through HTTP, WebSocket, IPC, and more with the Transport SDK.
keywords: ['transport layer', 'HTTP RPC', 'WebSocket', 'IPC', 'transport SDK', 'blockchain API', 'real-time events', 'event streaming']
image: /img/el_twitter_default.png
---

# Transport Layer & SDK

The transport layer handles communication between Bitcoin Crawler and your applications. Access real-time event streams and query data through multiple protocols - all using the same message format and APIs.

---

## What is Transport?

Transport is how data flows between the crawler (indexer) and your applications:

**From crawler**:
- Event streams (real-time state changes)
- Query responses (current state, historical data)
- Error messages

**To crawler**:
- Queries (get model state, fetch events)
- Subscriptions (subscribe to event streams)

All transports use identical message formats - switch between them without code changes.

## Transport Flow

```
┌──────────────────────────────────────────────────────────┐
│                Transport Architecture                     │
└──────────────────────────────────────────────────────────┘

┌────────────────────┐
│  Bitcoin Crawler   │
│                    │
│  - Models          │
│  - Event Store     │
│  - State           │
└────────────────────┘
         │
         ▼
┌────────────────────┐
│  Transport Layer   │◄──── Built-in, automatic
│                    │
│  - HTTP RPC        │
│  - WebSocket       │
│  - IPC             │
│  - Electron        │
│  - Browser         │
└────────────────────┘
         │
         ▼
┌────────────────────┐
│   Your Client      │
│   Application      │
│                    │
│  - Query data      │
│  - Subscribe events│
└────────────────────┘
```

## Available Transports

### HTTP RPC

Request-response pattern over HTTP. Simple and reliable.

**Use cases**:
- One-time queries
- Serverless functions
- Cron jobs
- External integrations
- When you don't need real-time updates

**Endpoints**:
- `GET /health` - Health check
- `POST /` - Send queries

**Example query** (conceptual):
```bash
POST http://localhost:3000/
Content-Type: application/json

{
  "action": "query",
  "payload": {
    "constructorName": "GetModelsQuery",
    "dto": { "modelIds": ["my-model"] }
  }
}
```

### HTTP Streaming (NDJSON)

Stream large query results as newline-delimited JSON.

**Use cases**:
- Large datasets (thousands of events)
- Memory-efficient processing
- Progressive rendering
- When response doesn't fit in single HTTP response

**Endpoint**:
- `POST /stream` - Streaming queries

**Behavior**:
- Returns `Transfer-Encoding: chunked`
- Each line is separate JSON object
- Client processes as data arrives

### WebSocket

Real-time bidirectional communication. Best for interactive applications.

**Use cases**:
- Real-time dashboards
- Live monitoring
- Interactive applications
- When you need both queries and event streams
- Most web applications

**Features**:
- Subscribe to event streams
- Send queries
- Receive responses
- Heartbeat (ping/pong) for connection health
- Automatic reconnection (with SDK)

**Connection**:
```
ws://localhost:3001/
or
wss://localhost:3001/ (SSL)
```

### IPC (Inter-Process Communication)

Communication between Node.js processes.

**Use cases**:
- Microservices architecture (Node.js)
- Process isolation
- Resource management
- When you need separate memory spaces

**How it works**:
- Uses Node.js `process.send()` and `process.on('message')`
- Available when crawler runs as child process
- Same message format as other transports

### Electron

Desktop application support.

**Use cases**:
- Desktop applications
- Offline-capable apps
- Native OS integration
- Local-first applications

**Configuration**: Similar to IPC with Electron-specific setup

### Browser

Limited support for browser environments.

**Use cases**:
- Browser extensions
- Client-side explorers
- Privacy-focused apps
- When server deployment not possible

**Limitations**:
- No external server (runs in browser)
- Uses IndexedDB for storage
- Event streaming works differently
- Reduced functionality vs server deployment

## Transport SDK

**@easylayer/transport-sdk** is an open-source client library that simplifies integration:

**Without SDK**:
- Manual WebSocket connection handling
- Custom message formatting
- Implement reconnection logic
- Handle different transports differently

**With SDK**:
- Simple, unified API across all transports
- Automatic reconnection
- Type-safe queries
- Built-in error handling

**Installation**:
```bash
npm install @easylayer/transport-sdk
```

**Benefits**:
- Write less code
- Consistent interface
- Focus on business logic
- Easier testing

## Message Format

All transports use the same message structure:

### Request Messages

```
{
  "requestId": "optional-uuid",
  "action": "query" | "streamQuery" | "ping" | "pong",
  "payload": {
    "constructorName": "QueryClassName",
    "dto": { /* query parameters */ }
  },
  "timestamp": 1234567890
}
```

### Response Messages

```
{
  "requestId": "matches-request-id",
  "action": "queryResponse" | "event" | "error",
  "payload": { /* response data */ },
  "timestamp": 1234567890
}
```

### Event Messages

```
{
  "action": "event",
  "payload": {
    "aggregateId": "model-id",
    "version": 5,
    "blockHeight": 850000,
    "type": "EventTypeName",
    "payload": { /* event data */ },
    "timestamp": 1234567890
  }
}
```

## Event Streaming

Subscribe to real-time events from your models:

**All events** (WebSocket):
- Connect to WebSocket
- All events from all models stream to client
- Filter client-side as needed

**Filtered events**:
- Subscribe and filter by model ID
- Subscribe and filter by event type
- Handle only relevant events

**Event batches**:
- For efficiency, events may be batched
- Multiple events in single message
- Reduces message overhead

## Querying Data

Through any transport you can:

**Query current model state**:
- Get latest balances, statistics, etc.
- Request-response pattern

**Query state at specific block height**:
- Time-travel queries
- See state as it was historically

**Query event history**:
- Fetch events with filters
- Pagination support
- Stream large result sets

**Query system models**:
- Network chain validation data
- Mempool statistics
- Built-in models work same as custom

All queries use same message format across transports.

## Configuration

Transport configuration through environment variables:

**HTTP settings**:
- Host and port
- SSL certificates
- Message size limits

**WebSocket settings**:
- Host, port, and path
- SSL certificates
- CORS configuration
- Message size limits

**All transports**:
- Heartbeat timeout
- Connection timeout
- Maximum message size

Detailed configuration in framework documentation.

## Cross-Platform Support

Different transports suit different platforms:

**Server deployments**:
- HTTP RPC for external APIs
- WebSocket for web clients
- IPC for microservices

**Desktop applications**:
- Electron transport
- Local HTTP for testing
- SQLite for storage

**Browser**:
- Limited browser support
- IndexedDB for storage
- No external server needed

Choose transport based on deployment target.

## Security

**SSL/TLS**:
- Enable for production
- Secure data in transit
- Configure certificates

**Authentication**:
- Not built into framework
- Implement in your API gateway/proxy
- Or add middleware layer

**CORS** (WebSocket):
- Configure allowed origins
- Restrict in production
- Allow * only for development

**Rate limiting**:
- Implement in proxy/gateway
- Prevent abuse
- Protect your infrastructure

## Best Practices

### Transport Selection

**HTTP RPC**:
- Simple queries without real-time needs
- External integrations
- Batch operations

**WebSocket**:
- Real-time dashboards
- Live monitoring
- Most interactive applications

**IPC**:
- Microservices (Node.js)
- Process isolation needs

**Electron**:
- Desktop applications
- Offline capability

**Browser**:
- When server impossible
- Privacy-first applications

### Performance

1. **Use appropriate transport**: Don't use WebSocket if HTTP RPC sufficient
2. **Batch queries**: Make fewer large queries vs many small
3. **Filter events**: Subscribe only to needed events
4. **Stream large results**: Use streaming for big datasets
5. **Connection pooling**: Reuse connections when possible

### Reliability

1. **Use SDK**: Automatic reconnection logic
2. **Handle errors**: Always catch and handle errors
3. **Implement timeouts**: Don't wait forever
4. **Monitor connections**: Track health status
5. **Fallback strategy**: Support degraded functionality

## Architecture Context

Transport layer connects all components:

**Models** generate events → **Transport** broadcasts
**Event Store** provides data → **Transport** delivers
**Clients** query → **Transport** routes to appropriate handler

Transport is the communication bridge - everything else is processing and storage.