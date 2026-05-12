---
title: Transport Layer
slug: /transport-layer
sidebar_label: Transport Layer
description: Choose how applications connect to an EasyLayer state service through HTTP, WebSocket, IPC, Electron IPC, or browser transports.
keywords: ['EasyLayer transport', 'transport-sdk', 'blockchain websocket', 'blockchain HTTP API', 'Electron IPC blockchain', 'browser blockchain state']
image: /img/el_twitter_default.png
---

# Transport Layer

The transport layer is how another application talks to an EasyLayer crawler/state service.

It is not the state model. Build the model first, then choose the transport that fits the consumer.

## Transport choice

| Consumer | Good first transport |
|---|---|
| Backend service that queries state | HTTP |
| Service that needs live events | WebSocket or HTTP webhook |
| Parent/child Node processes | IPC parent/child |
| Desktop application | Electron IPC |
| Browser extension or SPA runtime | SharedWorker/browser transport |

## Runtime shape

```text
EasyLayer crawler
        |
        +--> HTTP query endpoint
        +--> WebSocket live events
        +--> IPC process channel
        +--> Electron IPC
        +--> Browser/shared-worker runtime
```

The client uses `@easylayer/transport-sdk` so application code can use the same high-level operations across transports.

## Main operations

| Operation | Purpose |
|---|---|
| `query(name, dto)` | Ask the service for current or historical state. |
| `subscribe(eventType, handler)` | Receive model or system events. |
| `connect()` / `close()` | Manage transport lifecycle where needed. |

## Delivery behavior

When a remote transport is configured, model events can be delivered through an outbox/ACK flow.

```text
model event persisted
        |
        v
outbox batch sent
        |
        v
client processes events
        |
        v
client ACK confirms batch
        |
        v
outbox rows removed
```

If no remote transport is configured, the crawler can still run local-only. In that mode the EventStore persists model events, but remote outbox rows are not written.

## What to choose first

Start simple:

- use HTTP when you only need queries;
- use WebSocket when live event streams are central;
- use IPC when both processes are local and throughput/low overhead matters;
- use Electron IPC or browser/shared-worker transport only when the runtime requires it.

Do not add every transport during evaluation. Add one integration path, verify it, then expand.

## Security and operations

Transport setup should include:

- authentication/secret handling where supported;
- payload size limits;
- handler timeouts;
- reconnect behavior for persistent transports;
- clear handling of slow or failing subscribers.

Use package-specific Transport SDK docs for exact options and version-specific examples.

## Related

- [EventStore](/docs/event-store)
- [System Models](/docs/system-models)
- [Transport SDK package docs](/docs/get-started/transport-sdk)
