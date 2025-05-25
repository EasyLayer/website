---
title: Understanding CQRS and Event Sourcing in Modern Applications
authors: [yarikp]
tags: [nestjs, cqrs, event sourcing, transactional, nestjs/cqrs, architecture, design patterns, easylayer]
date: 2024-03-19T10:30:00Z
description: A comprehensive guide to CQRS and Event Sourcing patterns. Learn how these architectural patterns can improve your application's scalability, maintainability, and performance.
keywords: ['CQRS', 'Event Sourcing', 'architecture patterns', 'design patterns', 'scalability', 'maintainability', 'performance', 'software architecture']
image: /img/blog/main-default-img.png
---

Hello there!

My name is Yaroslav, and in this article, I'm sharing my small investigation on the [@nestjs/cqrs](https://github.com/nestjs/cqrs) module. At [EasyLayer](https://easylayer.io), we use CQRS together with Event Sourcing (and it's quite an adventure, I must say).

This article isn't a full guide on CQRS or Event Sourcing. We'll quickly look at what these are and why they're used. I'll focus mainly on **how the NestJS CQRS module works** and what tools it offers for using CQRS and Event Sourcing.

<!--truncate-->

## Concept of @nestjs/cqrs

The **@nestjs/cqrs** package is designed more as a tool rather than a complete framework for CQRS. This means it can be extended and modified to fit the needs of your project. The package takes full advantage of [reflect-metadata](https://www.npmjs.com/package/reflect-metadata) and [rxjs](https://rxjs.dev/), making it quite powerful and flexible.

*reflect-metadata* allows for handling metadata in TypeScript, making it easier to create and use decorators for dependency injection and class behavior management.

*rxjs* provides async data handling through publishers and subscribers. This approach works well for managing data streams and events, which is important in a CQRS architecture.

## What are CQRS and Event Sourcing?

CQRS is an architectural pattern that separates read and write operations in an application. It emphasizes that methods should only return a value if they do not cause side effects (for example, do not change the state of an object or external variables). This principle is called *Command Query Responsibility Segregation* (CQRS).

CQRS separates the logic of handling **commands** (actions that change the state) from **queries** (read operations). This allows for separately testing, optimizing, and scaling read and write infrastructures, which is helpful for large and complex systems.

Often, Event Sourcing is used alongside CQRS. Without going into deep detail, Event Sourcing plays a key role in ensuring transactionality in the CQRS architecture, but it is not the only solution.

Instead of repeating what you can find online, check out a detailed [document](https://cqrs.wordpress.com/wp-content/uploads/2010/11/cqrs_documents.pdf) on CQRS by Greg Young, a CQRS [guide](https://learn.microsoft.com/en-us/azure/architecture/patterns/cqrs) from Microsoft, and info on Event Sourcing at [microservices.io](https://microservices.io/patterns/data/event-sourcing.html).

Now, let's talk about the *@nestjs/cqrs* module.

## How does the @nestjs/cqrs module work? Example with a block diagram

I have a great [repository](https://github.com/EasyLayer/cqrs-poc) that's set up as a sandbox where I've already configured everything for testing and exploring this module, so go ahead and download it now. I specifically included the @nestjs/cqrs module and its source code so you can debug and study it.

<p align="center">
  <img src="/img/blog/cqrs-block-diagram.webp" alt="cqrs-block-diagram" />
</p>

I will use class and interface names from the @nestjs/cqrs module.

As shown in the diagram, we divide the system into two parts: the state change flow and the data query flow, which are managed by the *ICommand* and *IQuery* interfaces.

Commands (*ICommand*) represent intentions to change the system's state. These are objects that contain both action and context.

The command flow in the @nestjs/cqrs module works with the *CommandBus*, which acts as a central mechanism for dispatching commands. CommandBus serves as a coordinator, directing commands to the appropriate *CommandHandlers*. These handlers implement the *ICommandHandler* interface and then activate the *AggregateRoot* model, which is responsible for executing the business logic and maintaining the system's state.

Often, *AggregateRoot* is considered a domain in the context of [Domain-Driven Design (DDD)](https://en.wikipedia.org/wiki/Domain-driven_design), but essentially, it's just a model representing the state of your system.

The result of a successful state update is an *IEvent*. In Event Sourcing, a key point is that a single event changes the state of an aggregate and is recorded in the database. After processing a command, it can generate one or more events that record the changes that happened. These events are saved in a Write-database, which works as an Event Store. The state of the aggregate is changed only if the event is successfully recorded in the database, ensuring the persistence of the system's state changes.

Successful saving of events in the Event Store leads to their publication. This is where the *EventBus* and the publisher mechanism come into play. The EventBus distributes events among different parts of the system. The published events are then caught by *EventHandlers* asynchronously. These event handlers are responsible for updating the Read-database, making sure that data is up-to-date for read operations.

In the CQRS architecture implemented through the @nestjs/cqrs module, the Query flow is different from the command flow because it focuses only on reading data without making changes to the system's state. The main component here is the *QueryBus*, which is similar to the CommandBus but is used for handling queries.

The *IQuery* interface defines the format of a query. Each query describes a specific set of data that needs to be retrieved from the system. Classes that implement the *IQueryHandler* interface are responsible for handling these queries. These handlers receive queries through the *QueryBus* and carry out data retrieval operations.

The *QueryBus* acts as a mediator, receiving queries and directing them to the appropriate handlers. This provides clear separation of query logic and its distribution within the system.

An important aspect of the query flow is that all read operations are performed with the Read-database. This provides high performance and scalability for read operations, as they do not affect the main database where writing occurs.

## Command workflow with a sequence diagram

Now, let's look deeper into what happens when a client makes a request to execute a command. We will examine each of the main classes involved in this flow.

<p align="center">
  <img src="/img/blog/cqrs-command-workflow-diagram.webp" alt="cqrs-command-workflow-with-sequence-diagram" />
</p>

Let's say a client makes a REST request to the server. The request in the *Controller* starts the action *CommandBus.execute(command: ICommand)*.

```ts
class CommandBus extends ObservableBus {
  register(handlers: ICommandHandler[]): void;
  execute(command: T): Promise<any>;
}
```

Under the hood, *CommandBus* has two main methods:

- *register(handlers: ICommandHandler[])* - This method registers all *ICommandHandlers* in the system at module startup. Using the *@CommandHandler()* decorator and the *reflect-metadata* library, it links handlers to specific commands.

First, the *@CommandHandler* decorator adds the annotation *__commandHandler__* to the handler's metadata and the annotation *__command__* to the *ICommand* of this handler.

```ts
const CommandHandler = (command) => {
  return (target) => {
    if (!Reflect.hasOwnMetadata('__command__', command)) {
      Reflect.defineMetadata('__command__', { id: (0, uuid_1.v4)() }, command);
    }
    Reflect.defineMetadata('__commandHandler__', command, target);
  };
};
```

Second, the decorator adds a unique identifier *metadata.id* for the command specified in the decorator and links the specific command to the specific handler using this id. This allows two different handlers to handle the same command. In *CommandBus*, these links are stored in a *Map()* structure, where the key is the auto-generated *metadata.id = uuid()* for a specific command, and the value in this structure is an instance of a specific *ICommandHandler* class extracted from the *Dependency Injection (DI)* container.

- *execute(command: ICommand)* - This method performs two important actions:

```ts
execute(command) {
  …
  this._publisher.publish(command);
  return handler.execute(command);
}
```

It first publishes the command asynchronously using the built-in *ICommandPublisher*. What does publish mean? — *CommandBus* inherits from *ObservableBus*, and it has a variable *this.subject$* which is a *Subject* from *rxjs*, allowing system components to subscribe to it and process commands asynchronously.

```ts
import { Observable, Subject } from 'rxjs';
class ObservableBus extends Observable {
  protected _subject$: Subject<any>;
  get subject$(): Subject<any>;
}
```

By sending commands through *Subject.next()*, *CommandBus* allows the system to respond to command events in real-time without waiting for responses. This reactive ability makes sure that commands can trigger further actions or responses immediately as they occur.

> Currently, in @nestjs/cqrs, there are no built-in mechanisms for subscribing to command events, although such features might be introduced in the future or could be implemented by developers to enhance functionality.

Then, the method calls *handler.execute(command)* on the appropriate handler. It's important to note that handler.execute() returns a **promise**, which allows the *CommandBus* to wait for the processing of the command result or an error.

The work of *ICommandHandler* involves an async method *async execute(command: ICommand)*. It's expected that *ICommandHandler* will perform several actions:

- Change the State of *AggregateRoot*: First, it should modify the state of the *AggregateRoot* model. If the model was previously created, we try to restore it from the write database, or create a new one. Importantly, *AggregateRoot* is a model and it does not depend on services.

```ts
abstract class AggregateRoot {
  apply(event: T, isFromHistory?: boolean): void;
}
```

> In @nestjs/cqrs, there is a mechanism that allows us to merge event publication methods into the model instance. More on this later.
 
- Save State Changes to the Write Database: In Event Sourcing, each change in state is considered a separate event and is stored in the Event Store.

> @nestjs/cqrs doesn't handle database operations directly - that's your job.

- **Publish an Event about the Successful State Change:** This is managed by the *AggregateRoot* model itself and its **commit()** method. Under the hood, this method gets all unpublished events added to the model and publishes them on the *EventBus*. An important note is that the *commit()* method in the @nestjs/cqrs implementation is synchronous. Once *commit()* is executed, the command handler completes and a response is sent to the user.

How does the *AggregateRoot* model publish an event on the *EventBus* if it's just a model and has no dependencies on services?

In @nestjs/cqrs, object merging is used where methods such as **publish()** and **publishAll()** from the *EventBus* are merged into the *AggregateRoot* model using the *EventPublisher* class. This allows the model to be self-contained and independent.

> The EventPublisher class is simply a service, does not have an interface, and should not be confused with IEventPublisher.

```ts
export declare class EventPublisher {
  private readonly eventBus;
  constructor(eventBus: EventBus<IEvent>);
  mergeClassContext<T extends Type<any>>(metatype: T): T;
  mergeObjectContext<T>(object: T): T;
}
```

Now, let's understand what the publish method does and how the *EventBus* works under the hood. Like the *CommandBus*, the *EventBus* also inherits from *ObservableBus* and has a *Subject* stream from *rxjs*, which acts as both an observer and an observable. This means it can generate events and we can subscribe to it.

```ts
class EventBus extends ObservableBus<IEvent> implements IEventBus<IEvent> {
  private _publisher: IEventPublisher;

  publish(event: IEvent, context?: any) {
    return this._publisher.publish(event, context);
  }
  publishAll(events: IEvent[], context?: any) {
    if (this._publisher.publishAll) {
      return this._publisher.publishAll(events, context);
    }
    return (events || []).map((event) => this._publisher.publish(event, context));
  }
}
```

When the publish method is called on the *EventBus*, it executes **subject.next(event)**. This is the main action of the publication mechanism, where the provided event is placed into the event stream stored in the Subject. All subscribers to this topic will immediately receive the new event.

```ts
interface IEventPublisher {
  publish(event: IEvent, context?: unknown): any;
  publishAll?(events: IEvent[], context?: unknown): any;
}
```

At the start of the module, event handlers are registered. In the @nestjs/cqrs module, there are two types: **IEventHandler** and **Saga**, handled by the methods *register(handlers: IEventHandler[])* and *registerSagas(funcs: Function[])*.

```ts
class EventBus {
  register(handlers: IEventHandler[]): void;
  registerSagas(funcs: Function[]): void;
}
```

### Event Handlers Registration

```ts
import { from, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class EventBus extends ObservableBus<IEvent> {
  private subscriptions = [];

  register(handlers = []) {
    handlers.forEach(handler => this.registerHandler(handler));
  }

  registerHandler(handler) {
    const events = this.reflectEvents(handler);
    events.forEach(event => this.bind(handler, event));
  }

  reflectEvents(handler) {
    return Reflect.getMetadata('events', handler) || [];
  }

  bind(handler, event) {
    const stream$ = from([event]);
    const subscription = stream$
      .pipe(mergeMap(event => Promise.resolve(handler.handle(event))))
      .subscribe();

    this.subscriptions.push(subscription);
  }
}
```

1. Event handlers are registered using the *@EventHandler()* decorator. Like command handlers, this decorator generates metadata including annotations *__eventHandler__* and *__event__*, assigning an identifier to each event and linking it to one or more handlers.
2. Handlers are registered by subscribing to the stream from *EventPublisher*, and these subscriptions are stored in an array in **EventBus.subscriptions**.
3. Events are processed through **mergeMap()**, meaning all event handlers run in parallel. This makes sure that event processing is efficient and non-blocking.
4. The *handle(event)* method is invoked during processing, wrapped in a forced **Promise.resolve(handler.handle(event))**. This works with synchronous handlers within an async flow.
5. In case of an error in the stream, errors are directed to *UnhandledExceptionBus*, allowing for centralized error handling.

### Sagas Registration

```ts
import { from } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

class EventBus extends ObservableBus<IEvent> {
  private subscriptions = [];
  private commandBus = new CommandBus();

  registerSagas(sagas = []) {
    sagas.forEach(saga => this.registerSaga(saga));
  }

  registerSaga(saga) {
    const events = this.reflectEvents(saga);
    events.forEach(event => this.bindSaga(saga, event));
  }

  bindSaga(saga, event) {
    const stream$ = from([event]);
    const subscription = stream$
      .pipe(mergeMap(command => defer(() => this.commandBus.execute(command))))
      .subscribe();

    this.subscriptions.push(subscription);
  }
}
```

1. Sagas are decorated with *@Saga()* on methods, linking them to specific events.
2. Each saga method returns one or more commands in response to events.
3. Commands returned by sagas are executed via **CommandBus.execute()**, enabling long-running transactions and orchestration.

### UnhandledExceptionBus

```ts
class UnhandledExceptionBus extends ObservableBus<any> {}
```

All handler and saga errors go through the *UnhandledExceptionBus*, allowing subscription and monitoring of exceptions outside individual handlers.

## Query workflow with a sequence diagram

Below is the sequence diagram showing the query flow:

<p align="center">
  <img src="/img/blog/cqrs-query-workflow-diagram.webp" alt="cqrs-query-workflow-with-sequence-diagram" />
</p>

1. **Controller** invokes `QueryBus.execute(query: IQuery)`.
2. **QueryBus** publishes the query to the RxJS subject stream.
3. **IQueryHandler** gets projections from the read database and returns the result.

```ts
class QueryBus extends ObservableBus {
  register(handlers: IQueryHandler[]): void;
  async execute(query: IQuery): Promise<any>;
}
```

```ts
const QueryHandler = (query) => {
  return (target) => {
    Reflect.defineMetadata('__query__', query, target);
    Reflect.defineMetadata('__queryHandler__', query, target);
  };
};
```

## Conclusion

This exploration into the **@nestjs/cqrs** module shows the architectural advantages of CQRS—improved performance, scalability, and a clear separation of concerns. By splitting command handling (writes) from query handling (reads), applications can optimize and scale each side independently. Event Sourcing offers a solid audit log and transactional integrity.

Understanding the inner workings of CommandBus, EventBus, QueryBus, handlers, and sagas helps developers customize the module to complex domain-driven designs and microservices architectures. Sure, it's not the simplest thing in the world, but once you get it, it's quite powerful.

**GitHub repository:** [EasyLayer/cqrs-poc](https://github.com/EasyLayer/cqrs-poc)  
**Discussion:** [EasyLayer/core Discussion #2](https://github.com/EasyLayer/core/discussions/2)