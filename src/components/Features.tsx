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
import { DOCS_URLS } from '../urls';

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
      <span className="group inline-flex items-center gap-1 text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100">
        <span>
          <Translate id={labelId}>{labelFallback}</Translate>
        </span>
        <span className="text-yellow-600 transition-all group-hover:ml-0.5" aria-hidden="true">
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
    titleFallback: 'Custom state models',
    descriptionId: 'features.customModels.description',
    descriptionFallback:
      'Define the state your application needs: wallet balances, UTXOs, contract events, fee statistics, or another model. EasyLayer feeds blockchain data into your model and stores state changes as events.',
    url: DOCS_URLS.SECTIONS.DATA_MODELING,
    ariaId: 'features.customModels.aria',
    ariaFallback: 'Learn more about custom state models',
  },
  {
    Icon: Zap,
    titleId: 'features.networkProviders.title',
    titleFallback: 'Node and provider input',
    descriptionId: 'features.networkProviders.description',
    descriptionFallback:
      'Connect to your own node or supported external providers. The crawler packages separate chain-specific data loading from your application state logic.',
    url: DOCS_URLS.SECTIONS.NETWORK_PROVIDERS,
    ariaId: 'features.networkProviders.aria',
    ariaFallback: 'Learn more about network providers',
  },
  {
    Icon: Clock,
    titleId: 'features.mempool.title',
    titleFallback: 'Optional mempool workflows',
    descriptionId: 'features.mempool.description',
    descriptionFallback:
      'Use mempool monitoring when your application needs pending transaction awareness. Keep it disabled when confirmed-block state is enough.',
    url: DOCS_URLS.SECTIONS.MEMPOOL_MONITORING,
    ariaId: 'features.mempool.aria',
    ariaFallback: 'Learn more about mempool monitoring',
  },
  {
    Icon: Link2,
    titleId: 'features.transports.title',
    titleFallback: 'API and transports',
    descriptionId: 'features.transports.description',
    descriptionFallback:
      'Expose query and event flows through HTTP, WebSocket, IPC, Electron IPC, or browser/shared-worker transports, then consume them through @easylayer/transport-sdk.',
    url: DOCS_URLS.SECTIONS.TRANSPORT_LAYER,
    ariaId: 'features.transports.aria',
    ariaFallback: 'Learn more about API and transports',
  },
  {
    Icon: Database,
    titleId: 'features.eventStore.title',
    titleFallback: 'EventStore and historical reads',
    descriptionId: 'features.eventStore.description',
    descriptionFallback:
      'Persist model changes as ordered events and restore state at previous heights. SQLite, PostgreSQL, and browser storage paths are documented separately by runtime.',
    url: DOCS_URLS.SECTIONS.EVENT_STORE,
    ariaId: 'features.eventStore.aria',
    ariaFallback: 'Learn more about EventStore and databases',
  },
  {
    Icon: RefreshCw,
    titleId: 'features.systemModels.title',
    titleFallback: 'Reorg-aware architecture',
    descriptionId: 'features.systemModels.description',
    descriptionFallback:
      'The core architecture is built around persisted events, rollback, and state restoration so application models do not need ad-hoc reorg handling code.',
    url: DOCS_URLS.SECTIONS.SYSTEM_MODELS,
    ariaId: 'features.systemModels.aria',
    ariaFallback: 'Learn more about system models',
  },
];

const Features: FC = () => (
  <SectionContainer id="features" className="space-y-16 lg:py-18">
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
        <Translate id="features.eyebrow">Core capabilities</Translate>
      </p>
      <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100 lg:text-3xl">
        <Translate id="features.title">Infrastructure pieces you would otherwise build yourself</Translate>
      </h2>
    </div>
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
