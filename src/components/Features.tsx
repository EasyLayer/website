// src/components/Features.tsx
// Feature cards grid section — six core EasyLayer capabilities.

import type { FC, ComponentType } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';
import Translate, { translate } from '@docusaurus/Translate';
import { Database, Clock, Link2, RefreshCw, ArrowRight, Type, Zap } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import styles from '../pages/styles.module.css';

interface TextLinkProps {
  url: string;
  labelId: string;
  labelFallback: string;
  ariaId: string;
  ariaFallback: string;
}

const TextLink: FC<TextLinkProps> = ({ url, labelId, labelFallback, ariaId, ariaFallback }) => {
  const ariaLabel = translate({ id: ariaId, message: ariaFallback });
  return (
    <Link to={url} aria-label={ariaLabel} className="mt-3 inline-block text-sm">
      <span className="group inline-flex items-center gap-1 text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100">
        <span>
          <Translate id={labelId}>{labelFallback}</Translate>
        </span>
        <span className="transition-all group-hover:ml-0.5 text-yellow-600" aria-hidden="true">
          <ArrowRight size={14} strokeWidth={2} />
        </span>
      </span>
    </Link>
  );
};

interface FeatureProps {
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  titleId: string;
  titleFallback: string;
  descriptionId: string;
  descriptionFallback: string;
  url: string;
  learnMoreId: string;
  learnMoreFallback: string;
  ariaId: string;
  ariaFallback: string;
}

const Feature: FC<FeatureProps> = ({
  Icon,
  titleId,
  titleFallback,
  descriptionId,
  descriptionFallback,
  url,
  learnMoreId,
  learnMoreFallback,
  ariaId,
  ariaFallback,
}) => (
  <div className="mb-10 space-y-4 md:mb-0">
    <dt className="flex items-center">
      <span
        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-neutral-700 text-yellow-500"
        aria-hidden="true"
      >
        <Icon size={20} />
      </span>
      <span className="ml-4 text-neutral-700 dark:text-neutral-200">
        <Translate id={titleId}>{titleFallback}</Translate>
      </span>
    </dt>
    <dd>
      <p className="text-neutral-700 dark:text-neutral-300">
        <Translate id={descriptionId}>{descriptionFallback}</Translate>
      </p>
      <TextLink
        url={url}
        labelId={learnMoreId}
        labelFallback={learnMoreFallback}
        ariaId={ariaId}
        ariaFallback={ariaFallback}
      />
    </dd>
  </div>
);

const FEATURES: Omit<FeatureProps, 'learnMoreId' | 'learnMoreFallback'>[] = [
  {
    Icon: Type,
    titleId: 'features.customModels.title',
    titleFallback: 'Custom Data Models',
    descriptionId: 'features.customModels.description',
    descriptionFallback:
      'Tell the framework what on-chain state to track: wallet balances, contract events, UTXOs, anything your app needs. It reads every block, updates your state in real time, and handles chain reorgs automatically. You control the data structure and the server.',
    url: '/docs/data-modeling',
    ariaId: 'features.customModels.aria',
    ariaFallback: 'Learn more about Custom Data Models',
  },
  {
    Icon: Zap,
    titleId: 'features.networkProviders.title',
    titleFallback: 'Network Providers',
    descriptionId: 'features.networkProviders.description',
    descriptionFallback:
      'Connect Bitcoin or EVM nodes via JSON-RPC, WebSocket, P2P, or ZMQ. Use QuickNode, Alchemy, or your own node. Just 2 RPC calls per Bitcoin block. Automatic failover between providers. Historical sync + real-time mode.',
    url: '/docs/network-providers',
    ariaId: 'features.networkProviders.aria',
    ariaFallback: 'Learn more about Network Providers',
  },
  {
    Icon: Clock,
    titleId: 'features.mempool.title',
    titleFallback: 'Mempool Monitoring',
    descriptionId: 'features.mempool.description',
    descriptionFallback:
      'Track unconfirmed transactions in real time before they hit blocks. Optional for Bitcoin and EVM crawlers. Essential for payment processors, wallets, and fee market analysis.',
    url: '/docs/mempool-monitoring',
    ariaId: 'features.mempool.aria',
    ariaFallback: 'Learn more about Mempool Monitoring',
  },
  {
    Icon: Link2,
    titleId: 'features.transports.title',
    titleFallback: 'API & Transports',
    descriptionId: 'features.transports.description',
    descriptionFallback:
      'Five built-in transports: HTTP, WebSocket, IPC (parent/child), Electron, and Browser. Real-time event streams and request–response queries. Use @easylayer/transport-sdk for a unified client API across all of them.',
    url: '/docs/transport-layer',
    ariaId: 'features.transports.aria',
    ariaFallback: 'Learn more about API & Transports',
  },
  {
    Icon: Database,
    titleId: 'features.eventStore.title',
    titleFallback: 'Event Store & Databases',
    descriptionId: 'features.eventStore.description',
    descriptionFallback:
      'Event Sourcing out of the box: every state change is an immutable event. Query model state at any block height. Choose SQLite (dev/desktop), PostgreSQL (production), or IndexedDB (browser). Schema managed automatically.',
    url: '/docs/event-store',
    ariaId: 'features.eventStore.aria',
    ariaFallback: 'Learn more about Event Store & Databases',
  },
  {
    Icon: RefreshCw,
    titleId: 'features.systemModels.title',
    titleFallback: 'System Models',
    descriptionId: 'features.systemModels.description',
    descriptionFallback:
      'Built-in chain validation and mempool models work out of the box — subscribe to their events immediately. Automatic reorg detection and rollback regardless of reorg length. Network integrity checks configurable per deployment.',
    url: '/docs/system-models',
    ariaId: 'features.systemModels.aria',
    ariaFallback: 'Learn more about System Models',
  },
];

const Features: FC = () => (
  <SectionContainer id="features" className="lg:py-18 space-y-16">
    <dl className="grid grid-cols-1 md:gap-16 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-16">
      {FEATURES.map((f) => (
        <Feature key={f.titleId} {...f} learnMoreId="features.learnMore" learnMoreFallback="Learn more" />
      ))}
    </dl>
  </SectionContainer>
);

const FeaturesWithSkewedBorder: FC = () => (
  <div className="relative">
    <div className={classNames(styles.sectionSkewedContainer)}>
      <div
        className={classNames(
          styles.sectionSkewed,
          'border-b border-yellow-500/25 bg-neutral-100/50 dark:bg-neutral-800/30'
        )}
      />
    </div>
    <div className="relative">
      <Features />
    </div>
  </div>
);

export default FeaturesWithSkewedBorder;
