---
title: 'Transport Layer and SDK'
sidebar_label: 'Transport Layer and SDK'
slug: /transport-layer
description: Access blockchain state via HTTP, WebSocket, IPC, Electron, or Browser transports. Use @easylayer/transport-sdk for a unified client API across all environments.
keywords: ['transport layer', 'http blockchain api', 'websocket blockchain', 'ipc blockchain', 'electron blockchain', 'browser blockchain', 'transport sdk', 'blockchain query api']
image: /img/el_twitter_default.png
---

# Transport Layer and SDK

The transport layer is how your application talks to the crawler. EasyLayer ships five built-in transports, and every one of them uses the same query format. Switch transports without changing your application code.

---

## Available Transports

| Transport | Use case | Parallel queries |
|---|---|---|
| **HTTP RPC** | Server apps, serverless, webhooks | No (single-flight) |
| **WebSocket** | Real-time event streams | No |
| **IPC Parent** | Your app spawns the crawler as a child process | Yes (correlationId) |
| **IPC Child** | Crawler spawns your app as a child process | Yes |
| **Electron IPC** | Desktop app (main process to renderer) | N/A |
| **SharedWorker** | Browser extension or SPA | N/A |

---

## Client SDK

Install `@easylayer/transport-sdk` in your application. It provides a single `Client` class that wraps all transports.

```bash
npm install @easylayer/transport-sdk
```

### subscribe() and query()

Two methods cover all use cases:

- **`subscribe(eventType, handler)`** — receive events pushed by the crawler as they happen
- **`query(name, dto?)`** — request current or historical state

```ts
import { Client } from '@easylayer/transport-sdk';

const client = new Client({
  transport: {
    type: 'http',
    inbound: { webhookUrl: 'http://0.0.0.0:4000/events', pongPassword: 'pw' },
    query: { baseUrl: 'http://localhost:3000' },
  },
});

// Receive events in real time
client.subscribe('Deposit', (event) => {
  console.log('New deposit at block', event.blockHeight, event.payload);
});

// Query current state
const [model] = await client.query('GetModelsQuery', { modelIds: ['wallet-tracker'] });
console.log(model.state.balances);
```

---

## HTTP Transport

The HTTP client mounts a webhook handler on your existing server. Inbound events arrive as POST requests; outbound queries are POST requests to the crawler.

```ts
import { createServer } from 'http';
const client = new Client({
  transport: {
    type: 'http',
    inbound: { webhookUrl: 'http://0.0.0.0:4000/events', pongPassword: 'secret' },
    query: { baseUrl: 'http://localhost:3000' },
  },
});
createServer(client.nodeHttpHandler()).listen(4000);
// or: app.use(client.expressRouter())
```

---

## WebSocket Transport

For persistent connections and real-time event streams.

```ts
const client = new Client({
  transport: {
    type: 'ws',
    options: { url: 'ws://localhost:3001', pongPassword: 'secret' },
  },
});
await client.connect();
client.subscribe('BlockConfirmed', (event) => { /* ... */ });
```

`connect()` never rejects. If the initial connection fails, it starts a background reconnect loop silently.

---

## IPC Transport

For Node.js microservice setups where the crawler and your app run as separate processes.

```ts
// Parent process spawns crawler as child
import { spawn } from 'child_process';
const crawlerProcess = spawn('node', ['crawler.js']);

const client = new Client({
  transport: { type: 'ipc-parent', options: { process: crawlerProcess, pongPassword: 'secret' } },
});
```

IPC supports parallel queries via `correlationId` matching, which makes it the highest-throughput option for process-local communication.

---

## Electron Transport

For desktop applications. The crawler runs in the main process; your UI queries it from the renderer.

```ts
// In the renderer process
const client = new Client({
  transport: { type: 'electron-renderer', options: { channel: 'crawler', pongPassword: 'secret' } },
});
```

---

## SharedWorker (Browser)

For browser extensions and SPAs where the crawler runs inside a SharedWorker with IndexedDB storage.

```ts
// In the extension or SPA
const client = new Client({
  transport: { type: 'shared-worker', options: { workerUrl: './crawler.worker.js', pongPassword: 'secret' } },
});
```

---

## How Event Delivery Works

The crawler keeps an outbox table. When your model produces events, they go into the outbox. The transport reads the outbox, sends a batch to your client, and waits for an acknowledgment (ACK). Once the ACK arrives, the batch is deleted from the outbox.

If your handler throws or takes too long (default timeout: 3000 ms), the crawler retries. This gives you at-least-once delivery for every event.

To increase the timeout for slow handlers (e.g. writing to a database on every event):

```ts
const client = new Client({
  transport: {
    type: 'ws',
    options: { url: 'ws://localhost:3001', pongPassword: 'secret', processTimeoutMs: 10_000 },
  },
});
```

---

## Built-in Query Types

| Query | Description |
|---|---|
| `GetModelsQuery` | Current state of one or more models (optionally at a specific block height) |
| `FetchEventsQuery` | Paginated event history with optional filtering |
| `GetNetworkStatsQuery` | Sync status, block height, chain info |
| `GetNetworkLastBlockQuery` | Latest indexed block |

---

## Related

- [State Models](/docs/data-modeling) — what produces the events you subscribe to
- [Event Store](/docs/event-store) — where events are persisted before delivery
- [Transport SDK docs](/docs/get-started/transport-sdk) — full configuration reference
