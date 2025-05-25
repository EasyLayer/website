import type { FC, ComponentType } from 'react';
import React, { ReactNode } from 'react';
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
        title="Self-Hosted Infrastructure"
        url="/docs/self-hosting"
        description={`
          Take full control of your infrastructure with our self-hosted solution. Deploy and manage your nodes with complete autonomy.
        `}
      />
      <Feature
        Icon={Type}
        title="Custom State Modelling"
        url="/docs/state-modelling"
        description={`
          Define precise state models for specific addresses or smart contracts, eliminating the need to store the entire blockchain state.
        `}
      />
      <Feature
        Icon={Clock}
        title="Real-Time & Historical Data"
        url="/docs/data-access"
        description={`
          Access both real-time blockchain events through subscriptions and historical data with our comprehensive data access layer.
        `}
      />
      <Feature
        Icon={Link2}
        title="Flexible Transport Layer"
        url="/docs/transport"
        description={`
          Choose from multiple transport protocols including RPC, WebSocket, IPC, and TCP to match your specific integration needs.
        `}
      />
      <Feature
        Icon={RefreshCw}
        title="Automatic Reorganization"
        url="/docs/reorganisation-handling"
        description={`
          Built-in handling of blockchain reorganizations ensures data consistency and reliability across all supported networks.
        `}
      />
      <Feature
        Icon={Globe}
        title="Multi-Chain Support"
        url="/docs/networks"
        description={`
          Comprehensive support for Bitcoin, its forks, and all EVM-compatible networks including Ethereum and its derivatives.
        `}
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
