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
  <Link to={url}>
    <span
      className={`
        mt-3 block cursor-pointer text-sm
        text-neutral-500 hover:text-neutral-400
      `}
    >
      <div className="group flex items-center gap-1">
        <span>{label}</span>
        <div className="transition-all group-hover:ml-0.5">
          <span className="text-yellow-600">
            <ArrowRight size={14} strokeWidth={2} />
          </span>
        </div>
      </div>
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
  <div className="mb-10 space-y-4 md:mb-0">
    <div className="flex items-center">
      <div
        className={`
          inline-flex h-8 w-8 items-center
          justify-center rounded-md
          bg-neutral-700 text-yellow-500
        `}
      >
        <Icon size={20} />
      </div>
      <dt className="ml-4 text-neutral-700">{title}</dt>
    </div>
    <p className="text-neutral-700">{description}</p>
    <TextLink url={url} label="Learn more" />
  </div>
);

const Features: FC = () => (
  <SectionContainer id="features" className="lg:py-18 space-y-16">
    <dl className="grid grid-cols-1 md:gap-16 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-16">
      <Feature
        Icon={Type}
        title="Custom Data Models"
        url="/docs/data-modeling"
        description="Describe what blockchain data you need - wallet balances, fees, specific addresses. Store only relevant data, not the entire blockchain. Simple declarative or class-based syntax."
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
        description="Track unconfirmed transactions in real-time before they hit blocks. Built-in mempool model or integrate into custom models. Essential for payment processors and wallets."
      />
      <Feature
        Icon={Link2}
        title="API & Transports"
        url="/docs/transport-layer"
        description="Built-in APIs through HTTP, WebSocket, IPC, Electron, and browser. Real-time event streams and request-response queries. Use Transport SDK for easy client integration across all protocols."
      />
      <Feature
        Icon={Database}
        title="Event Store & Databases"
        url="/docs/event-store"
        description="Event Sourcing architecture with automatic reorg handling. Choose SQLite for development, PostgreSQL for production, or IndexedDB for browser. Your infrastructure, your data, automatic schema management."
      />
      <Feature
        Icon={RefreshCw}
        title="System Models"
        url="/docs/system-models"
        description="Built-in models for chain validation and mempool monitoring work out of the box. Subscribe to their events immediately. Network integrity verification with Merkle tree checks (configurable)."
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
