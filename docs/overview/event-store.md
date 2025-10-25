---
title: 'Event Store & Databases'
sidebar_label: 'Event Store & Databases'
slug: /event-store
description: Learn about Event Store databases in EasyLayer's framework. Understand SQLite, PostgreSQL, and IndexedDB storage options for blockchain events and state.
keywords: ['event store', 'SQLite', 'PostgreSQL', 'IndexedDB', 'blockchain storage', 'database configuration', 'event persistence', 'blockchain database']
image: /img/el_twitter_default.png
---

# Event Store & Databases

The Event Store is the database that stores all events and model state. Bitcoin Crawler supports multiple database backends with automatic schema management - you control the database, framework handles everything else.

---

## What is Event Store?

Event Store persists:
- **Events**: Immutable records of all state changes
- **Model State**: Current state derived from events  
- **Metadata**: Block heights, timestamps, versions

Your models generate events → Framework stores in Event Store → State reconstructed from events.

## Storage Flow

```
┌─────────────────────────────────────────────────────────┐
│              Event Store Architecture                    │
└─────────────────────────────────────────────────────────┘

Model generates event
       │
       ▼
┌──────────────────┐
│  Event Store     │  Framework manages
│   Component      │
└──────────────────┘
       │
       ▼
┌──────────────────┐
│   Database       │  You configure and control
│  (SQLite/       │
│   Postgres/     │
│   IndexedDB)    │
└──────────────────┘
       │
       ├────────────────┬──────────────────┐
       ▼                ▼                  ▼
┌────────────┐   ┌────────────┐    ┌────────────┐
│   Events   │   │   State    │    │  Metadata  │
│   Table    │   │  Snapshots │    │   Tables   │
└────────────┘   └────────────┘    └────────────┘
```

## Supported Databases

### SQLite

File-based database, perfect for development and smaller deployments.

**Advantages**:
- Single file, easy to manage
- Zero configuration
- Fast for moderate data
- Easy backups (copy file)
- No separate server needed
- Works on desktop applications

**Best for**:
- Development and testing
- Small to medium projects (< 1M events)
- Desktop applications
- Single-server deployments
- Quick prototypes

**Limitations**:
- Single writer (no concurrent writes from multiple processes)
- Limited for very large datasets
- No built-in replication

**Configuration**:
Just specify file path - framework creates and manages database.

### PostgreSQL

Production-grade relational database for larger deployments.

**Advantages**:
- Handles millions of events
- Excellent performance for large datasets
- Concurrent access from multiple applications
- Advanced indexing
- Replication support
- Connection pooling
- Industry-standard

**Best for**:
- Production deployments
- Large datasets (> 1M events)
- High query volume
- Multiple indexers sharing database server
- When you need replication
- Enterprise applications

**Requirements**:
- PostgreSQL server running
- Database created
- User with appropriate permissions

**Configuration**:
Provide connection settings (host, port, username, password, database name).

### IndexedDB

Browser-based storage for client-side applications.

**Advantages**:
- Works in browser without server
- Client-side privacy (data never leaves browser)
- No server costs
- Offline-capable

**Limitations**:
- Storage quota limits (browser-dependent)
- Performance slower than server databases
- Can't handle massive datasets
- Limited query capabilities compared to SQL

**Best for**:
- Browser extensions
- Client-side blockchain explorers
- Privacy-focused applications
- Offline-first applications
- When server deployment impossible

**Configuration**:
Specify database name for browser environment.

## Database Management

### Automatic Schema Creation

Framework manages database schema automatically:

**First run**:
- Creates all necessary tables
- Sets up indexes
- Configures constraints
- Optimizes for Event Sourcing patterns

**Schema updates**:
- Handles schema changes automatically (when enabled)
- Adds new tables/columns as needed
- Maintains backward compatibility

**User control**:
- Enable/disable automatic schema management
- Recommended: enable in development, manual in production

### Your Data, Your Control

**You own the database**:
- Deploy on your infrastructure
- Configure access controls
- Manage backups
- Set retention policies
- Share between applications (PostgreSQL)

**Framework responsibility**:
- Schema structure
- Event storage operations
- Query optimization
- Index management

## Storage Growth

Event Store size grows over time based on:

**Factors**:
- Number of models
- Events per block
- Event payload size
- Historical depth (how far back you index)
- Mempool monitoring (if enabled)

**Optimization**:
- Store only necessary data in event payloads
- Don't generate events for irrelevant data
- Use appropriate database (PostgreSQL for large)
- Consider retention policies for very old events

**Planning**:
```
Simple model (balance tracking):
  ~100 KB per 1000 blocks

Complex model (full transaction parsing):
  ~10 MB per 1000 blocks

Mempool monitoring:
  +50-100 MB per day (depends on activity)
```

Calculate based on your model and plan storage accordingly.

## Performance Considerations

### SQLite Optimization

**Benefits**:
- Simple file-based
- Fast for moderate datasets
- Low overhead

**Considerations**:
- Single writer limitation
- Performance degrades with very large databases
- Consider PostgreSQL if exceeding 10GB

### PostgreSQL Optimization

**Benefits**:
- Excellent large dataset performance
- Concurrent access support
- Advanced query optimization
- Replication support

**Tuning**:
- Configure connection pool size
- Adjust cache settings
- Monitor query performance
- Add indexes for your query patterns

**Scaling**:
- Use read replicas for query-heavy workloads
- Partition large tables (if needed)
- Separate database server from crawler

## Backup and Recovery

### Backup Strategy

**SQLite**:
- Stop application or ensure no writes
- Copy database file
- Automated with cron/scheduled tasks
- Store backups off-site

**PostgreSQL**:
- Use pg_dump for logical backups
- Configure WAL archiving for point-in-time recovery
- Set up automated backup schedule
- Test restore procedures regularly

**Best practices**:
- Regular schedule (daily minimum, hourly for critical)
- Off-site storage
- Test restores periodically
- Keep multiple backup versions
- Encrypt backups if sensitive data

### Disaster Recovery

**Corrupted database**:
- Restore from latest backup
- Replay from last known good state
- Verify data integrity after restore

**Data loss**:
- Restore from backup
- May need to re-sync from affected block height
- Event Sourcing helps recovery

## Multi-Application Setup

### Sharing PostgreSQL Server

Multiple crawler instances can share PostgreSQL server:

**Approach**:
- Each crawler uses separate database
- Or separate schemas in same database
- Share PostgreSQL server resources
- Manage connections with pooling

**Benefits**:
- Resource efficiency
- Centralized management
- Easier backups
- Cost savings

**Considerations**:
- Monitor total connections
- Tune PostgreSQL for multiple clients
- Consider disk I/O capacity

## Security

### Access Control

**SQLite**:
- File system permissions
- Restrict access to database file
- Encrypt file system if needed

**PostgreSQL**:
- Dedicated database user per crawler
- Grant minimum required permissions
- Use SSL for connections
- Network firewall rules

**General**:
- Never expose database directly to internet
- Use strong passwords
- Regular security updates
- Monitor access logs

### Data Protection

**Encryption**:
- At rest: Encrypt file system or use database encryption
- In transit: Use SSL for PostgreSQL connections
- Backups: Encrypt backup files

**Compliance**:
- Your data stays on your infrastructure
- You control retention policies
- Full audit trail via Event Sourcing
- Meet regulatory requirements

## Best Practices

### Database Selection

```
Decision tree:

Development/Testing
    └──> SQLite

Desktop Application
    └──> SQLite

Small Project (< 1M events)
    └──> SQLite or PostgreSQL

Production (> 1M events)
    └──> PostgreSQL

Browser Extension
    └──> IndexedDB

High Concurrency
    └──> PostgreSQL

Multiple Indexers
    └──> PostgreSQL (shared server)
```

### Capacity Planning

1. **Estimate event volume**: Events per block × blocks per day
2. **Calculate storage**: Event size × total events
3. **Add buffer**: 30-50% for indexes and metadata
4. **Plan growth**: Factor in historical sync + ongoing
5. **Monitor actual usage**: Adjust as needed

### Maintenance

**SQLite**:
- Run VACUUM periodically to reclaim space
- Monitor file size growth
- Check integrity with PRAGMA integrity_check

**PostgreSQL**:
- Configure autovacuum appropriately
- Monitor table bloat
- REINDEX if needed
- Update statistics regularly

### Monitoring

**Track metrics**:
- Database size
- Growth rate
- Query performance
- Connection pool usage
- Disk space available

**Set alerts**:
- Disk space warnings
- Slow query detection
- Connection pool exhaustion
- Database errors

## Reorganization Impact

When blockchain reorganizes, Event Store automatically handles it:

**What happens**:
1. Events from orphaned blocks marked as rolled back
2. State recalculated without those events
3. New blocks processed
4. New events stored
5. State updated

**Database operations**:
- No events deleted (immutable log maintained)
- Rollback markers added
- New events appended
- State snapshots updated

**Your responsibility**: None - automatic

## Architecture Context

Event Store integrates with all system components:

**Models** generate events → **Event Store** persists
**Event Sourcing** pattern → **Event Store** implements
**Transport** queries data → **Event Store** provides
**Database** stores → **Event Store** manages

Event Store is the persistence layer - it ensures all state changes are safely stored and retrievable. events)
    └──> SQLite or PostgreSQL