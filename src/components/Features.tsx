import type { FC, ComponentType } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';
import { Database, Clock, Link2, RefreshCw, ArrowRight, Type, Zap } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import styles from '../pages/styles.module.css';

interface TextLinkProps {
  url: string;
  label: string;
}

const TextLink: FC<TextLinkProps> = ({ url, label }) => (
  <Link to={url} aria-label={label} className="mt-3 inline-block text-sm">
    <span className="group inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900">
      <span>{label}</span>
      <span className="transition-all group-hover:ml-0.5 text-yellow-600" aria-hidden="true">
        <ArrowRight size={14} strokeWidth={2} />
      </span>
    </span>
  </Link>
);

interface FeatureProps {
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  title: string;
  description: string;
  url: string;
}

const Feature: FC<FeatureProps> = ({ Icon, title, description, url }) => (
  // ОБЯЗАТЕЛЬНО единый контейнер, чтобы грид считал это одной карточкой
  <div className="mb-10 space-y-4 md:mb-0">
    {/* Семантика dl: dt + dd внутри одной группы */}
    <dt className="flex items-center">
      <span
        className={`
          inline-flex h-8 w-8 items-center justify-center rounded-md
          bg-neutral-700 text-yellow-500
        `}
        aria-hidden="true"
      >
        <Icon size={20} />
      </span>
      <span className="ml-4 text-neutral-700">{title}</span>
    </dt>
    <dd>
      <p className="text-neutral-700">{description}</p>
      <TextLink url={url} label={`Learn more about ${title}`} />
    </dd>
  </div>
);

const Features: FC = () => (
  <SectionContainer id="features" className="lg:py-18 space-y-16">
    {/* dl остаётся грид-контейнером, а каждая фича — один <div> внутри */}
    <dl className="grid grid-cols-1 md:gap-16 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-16">
      <Feature
        Icon={Type}
        title="Custom Data Models"
        url="/docs/data-modeling"
        description="Describe what blockchain data you need—wallet balances, fees, specific addresses. Store only relevant data, not the entire blockchain. Simple declarative or class-based syntax."
      />
      <Feature
        Icon={Zap}
        title="Network Providers"
        url="/docs/network-providers"
        description="Just 2 RPC requests per block for Bitcoin. Connect to your node or external providers like QuickNode. Multiple strategies: RPC pulling, P2P, ZMQ subscriptions with automatic failover."
      />
      <Feature
        Icon={Clock}
        title="Mempool Monitoring"
        url="/docs/mempool-monitoring"
        description="Track unconfirmed transactions in real time before they hit blocks. Built-in mempool model or integrate into custom models. Essential for payment processors and wallets."
      />
      <Feature
        Icon={Link2}
        title="API & Transports"
        url="/docs/transport-layer"
        description="Built-in APIs over HTTP, WebSocket, IPC, Electron, and browser. Real-time event streams and request–response queries. Use the Transport SDK for easy client integration."
      />
      <Feature
        Icon={Database}
        title="Event Store & Databases"
        url="/docs/event-store"
        description="Event Sourcing with automatic reorg handling. Choose SQLite for development, PostgreSQL for production, or IndexedDB for browser. Your infra, your data, auto-managed schema."
      />
      <Feature
        Icon={RefreshCw}
        title="System Models"
        url="/docs/system-models"
        description="Built-in models for chain validation and mempool monitoring work out of the box. Subscribe to their events immediately. Network integrity checks with Merkle proofs (configurable)."
      />
    </dl>
  </SectionContainer>
);

const FeaturesWithSkewedBorder: FC = () => (
  <div className="relative">
    <div className={classNames(styles.sectionSkewedContainer)}>
      <div className={classNames(styles.sectionSkewed, 'border-b border-yellow-500/25 bg-neutral-100/50')}></div>
    </div>
    <div className="relative">
      <Features />
    </div>
  </div>
);

export default FeaturesWithSkewedBorder;
