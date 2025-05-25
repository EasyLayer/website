---
title: Different Ways to Start NestJS Applications - A Simple Guide
authors: [yarikp]
tags: [nestjs, http, websocket, microservices, tcp, context, launch modes, typescript, backend, development, easylayer]
date: 2024-03-20T10:30:00Z
description: Learn the different ways to start NestJS applications. This guide covers development, production, and testing setups.
keywords: ['NestJS', 'application launch modes', 'TypeScript', 'backend development', 'development environment', 'production environment', 'testing environment']
image: /img/blog/main-default-img.png
---

Hello!

My name is Yaroslav, and I work at [EasyLayer](https://easylayer.io). Today, I want to share what I learned about starting [NestJS](https://nestjs.com/) applications. This guide will show you different ways to run NestJS beyond just HTTP servers.

This article explains the different ways to start NestJS applications. We needed this at EasyLayer when we had to run apps in different ways. I'll start with simple examples and move to more complex ones.

<!--truncate-->

## HTTP Server Mode

Most NestJS applications start as HTTP servers. This is the most common way to build web applications. HTTP servers handle requests from browsers and other clients.

First, install these packages for a basic NestJS app:

```bash
yarn add @nestjs/core @nestjs/common @nestjs/platform-express rxjs reflect-metadata
```

> NOTE: I have a [repository](https://github.com/EasyLayer/nestjs-launch-modes-poc) where you can test all these examples. Feel free to download it and try the code yourself.

NestJS usually runs on [Express](https://expressjs.com/), but you can also use [Fastify](https://fastify.dev/). For this guide, we'll use Express.

Here's how to start a simple HTTP server:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

bootstrap();
```

Controllers handle requests in NestJS. They are the main entry points for your app.

Here's a simple controller example:

```ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
```

You need to register controllers in a module:

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController]
})
export class AppModule {}
```

HTTP server mode is the most common way to use NestJS. Most web applications start this way.

> But NestJS can do much more than just HTTP servers. It has many other useful features for different types of applications.

## Context Mode

Context mode lets you use NestJS features without starting a web server. This is useful for:
- Console applications
- Background scripts
- Task schedulers
- Database migrations
- CLI tools

You need the same dependencies as before:

```bash
yarn add @nestjs/core @nestjs/common reflect-metadata rxjs
```

Here's how to create a context application:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);
  const appService = appContext.get(AppService);
  await appService.doSomething();
}

bootstrap();
```

We use `NestFactory.createApplicationContext()` instead of `NestFactory.create()`. This gives you access to all NestJS services without starting a web server.

### Why Use Context Mode?

- Use NestJS dependency injection in scripts and CLI tools
- Perfect for database migrations and maintenance tasks
- Great for background jobs and queue processing
- Easy to test services in isolation

Context mode lets you use NestJS features in many different types of applications, not just web servers.

## Custom Web Server

You can create a custom server inside a NestJS context application. This gives you more control over how your server works.

Here's how to create a context app without the standard HTTP server:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
}

bootstrap();
```

In your `AppModule`, create a provider that starts a custom HTTP server:

```ts
import { Module } from '@nestjs/common';
import { createServer, IncomingMessage, ServerResponse } from 'http';

@Module({
  providers: [
    {
      provide: 'HTTP_SERVER',
      useFactory: () => {
        const server = createServer((req: IncomingMessage, res: ServerResponse) => {
          res.writeHead(200, { 'Content-Type': 'text/plain' });
          res.end('Hello from custom HTTP server!');
        });

        server.listen(3000, () => {
          console.log('Custom HTTP server listening on port 3000');
        });

        return server;
      },
    },
  ],
})
export class AppModule {}
```

This example:
1. Creates an HTTP server using Node.js `http.createServer()`
2. Starts the server on port 3000
3. Handles HTTP requests in the server callback

> NOTE: When you create your own server, you need to manage its lifecycle. For example, you should close the server when the app shuts down.

This approach gives you full control over HTTP request handling while using NestJS features.

## WebSocket Mode

For real-time communication, NestJS uses WebSocket gateways instead of controllers. Gateways handle two-way communication between client and server.

A gateway is a class with the `@WebSocketGateway()` decorator. This decorator makes a regular class able to handle WebSocket events.

NestJS supports two WebSocket platforms: [Socket.IO](https://socket.io/) and [`ws`](https://www.npmjs.com/package/ws). You can choose based on your needs.

Install WebSocket dependencies:

```bash
yarn add @nestjs/core @nestjs/common @nestjs/websockets @nestjs/platform-socket.io reflect-metadata rxjs
```

Here's a WebSocket gateway that runs on port 3001:

```ts
import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';

@WebSocketGateway(3001)
export class EventsGateway {
  @SubscribeMessage('message')
  handleEvent(@MessageBody() data: string): void {
    console.log('handle event');
  }
}
```

> If you don't specify a port, the gateway will use the same port as your HTTP server.

Register the gateway as a provider:

```ts
import { Module } from '@nestjs/common';
import { EventsGateway } from './events-gateway';

@Module({
  providers: [EventsGateway]
})
export class AppModule {}
```

In microservice mode, a WebSocket gateway can run without an HTTP server.

## Microservice Mode

A microservice is a standalone application that communicates using different transports like TCP, MQTT, Redis, NATS, RabbitMQ, Kafka, and others.

Install the microservices package:

```bash
yarn add @nestjs/microservices
```

For specific transports, install additional packages (like `kafkajs` for Kafka or `amqplib` for RabbitMQ).

Here's how to create a TCP microservice:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3000 },
  });
  await app.listen();
}

bootstrap();
```

You can run multiple listeners with an HTTP server:

```ts
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3001 },
  });

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost'],
      queue: 'nest_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
}

bootstrap();
```

Controllers handle messages in microservices using decorators like `@MessagePattern()` and `@EventPattern()`.

## WebSocket Gateway without Other Listeners

You can start a TCP microservice without actually listening for TCP messages:

```ts
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const tcpApp = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: { host: 'localhost', port: 3000 },
  });
  await tcpApp.init();
}

bootstrap();
```

Then you can run a WebSocket gateway on port 3001 as shown earlier.

## Sending Messages via Transport

You can use a context application to send messages without running a full server:

```ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppService } from './app.service';

async function bootstrap() {
  try {
    const appContext = await NestFactory.createApplicationContext(AppModule);
    const appService = appContext.get(AppService);
    await appService.sendMessage('message from context event provider');
  } catch (error) {
    console.log('Application error: ', error);
    process.exit(1);
  }
}

bootstrap();
```

Setup in `AppModule`:

```ts
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppService } from './app.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'RABBITMQ_PRODUCER',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost'],
          queue: 'nest_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  providers: [AppService],
})
export class AppModule {}
```

```ts
import { Injectable, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(@Inject('RABBITMQ_PRODUCER') private readonly client: ClientProxy) {}

  async sendMessage(message: string) {
    return this.client.emit('create_item', { text: message });
  }
}
```

This approach is great for sending messages between microservices without running a full server.

**References**

- GitHub repository: https://github.com/EasyLayer/nestjs-launch-modes-poc
- Discussion: https://github.com/EasyLayer/core/discussions/1