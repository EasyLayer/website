import type { FC, ComponentType } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import classNames from 'classnames';
import {
  Server,
  Database,
  Clock,
  Link2,
  RefreshCw,
  Globe,
  ArrowRight,
  Settings,
  Type,
  Star,
  Mail,
  Terminal,
  Layers,
  Coffee,
  Code,
  Unlock,
  Repeat,
  Send,
  Grid,
  Zap,
} from 'react-feather';

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
  <SectionContainer className="lg:py-18 space-y-16">
    <dl className="grid grid-cols-1 md:gap-16 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-16">
      <Feature
        Icon={Server}
        title="Self-Hosted & Private"
        url="/docs/self-hosting"
        description={`Deploy entirely on your own infrastructure: the EventStore supports SQLite for quick setups or PostgreSQL for production workloads. Your data never leaves your servers.`}
      />
      <Feature
        Icon={Zap}
        title="2 RPC Calls per Block"
        url="/docs/rpc-efficiency"
        description={`The crawler fetches full block data with just 2 RPC requests, keeping node load low and reducing operating costs.`}
      />
      <Feature
        Icon={RefreshCw}
        title="Reorg-Proof Consistency"
        url="/docs/reorganisation-handling"
        description={`Automatic fork handler rolls back and replays data for chain reorganisations of any depth-no manual intervention required.`}
      />
      <Feature
        Icon={Clock}
        title="Live & Historical Streams"
        url="/docs/streams"
        description={`Sync the entire chain history once and keep a continuous real-time feed through the same endpoint for dashboards or alerts.`}
      />
      <Feature
        Icon={Type}
        title="Custom State Models"
        url="/docs/state-modelling"
        description={`Define only the states you need in a custom model file. Smaller datasets, faster queries, and lower storage overhead.`}
      />
      <Feature
        Icon={Layers}
        title="Instant Block Snapshots"
        url="/docs/snapshots"
        description={`Request the exact state of any model at a specific block height with a single call-ideal.`}
      />
      <Feature
        Icon={Link2}
        title="Built-In API & Transports"
        url="/docs/transport"
        description={`
          REST for simplicity, WebSocket for event pushes, IPC for desktop apps. The
          server launches automatically-no hand-written controllers or middleware needed.
        `}
      />
      <Feature
        Icon={Globe}
        title="Bitcoin & EVM Ready"
        url="/docs/networks"
        description={`Bundled crawlers support Bitcoin forks and all EVM-compatible chains; extend to new networks with minimal configuration.`}
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
