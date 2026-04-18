// src/components/ExampleApps.tsx
// Grid of example applications built with EasyLayer.

import type { FC } from 'react';
import React from 'react';
import { GitHub, ArrowUpRight, Monitor } from 'react-feather';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';
import { EXAMPLE_APPS, DOCS_URLS, SITE_URLS } from '../urls';

interface ExampleItem {
  titleId: string;
  titleFallback: string;
  descriptionId: string;
  descriptionFallback: string;
  authorName: string;
  authorImg: string;
  repoName: string;
  repoUrl: string;
  demoUrl?: string;
}

const EXAMPLES: ExampleItem[] = [
  {
    titleId: 'examples.app1.title',
    titleFallback: 'System Examples — Getting Started 🚀',
    descriptionId: 'examples.app1.description',
    descriptionFallback:
      'Learn how to connect Bitcoin Crawler in different modes: HTTP RPC, P2P, ZMQ subscriptions, and various configurations.',
    authorName: 'easylayer',
    authorImg: `${SITE_URLS.BASE}/img/logo.png`,
    repoName: '@easylayer/bitcoin-crawler',
    repoUrl: EXAMPLE_APPS.BITCOIN_SYSTEM,
  },
  {
    titleId: 'examples.app2.title',
    titleFallback: 'Basic Wallet Watcher 👛',
    descriptionId: 'examples.app2.description',
    descriptionFallback:
      'Track wallet balances — when funds arrive and when they leave. Simple UTXO monitoring for payment processors and wallets.',
    authorName: 'easylayer',
    authorImg: `${SITE_URLS.BASE}/img/logo.png`,
    repoName: '@easylayer/bitcoin-crawler',
    repoUrl: EXAMPLE_APPS.BITCOIN_BASIC_WALLET_WATCHER,
  },
  {
    titleId: 'examples.app3.title',
    titleFallback: 'Advanced Wallet Watcher 💎',
    descriptionId: 'examples.app3.description',
    descriptionFallback:
      'Full wallet monitoring with mempool tracking — detect deposits, pending transactions, double-spend attempts.',
    authorName: 'easylayer',
    authorImg: `${SITE_URLS.BASE}/img/logo.png`,
    repoName: '@easylayer/bitcoin-crawler',
    repoUrl: EXAMPLE_APPS.BITCOIN_ADVANCED_WALLET_WATCHER,
  },
];

const SeeTheCodeButton: FC<{ repoUrl: string }> = ({ repoUrl }) => (
  <Link to={repoUrl}>
    <button className="flex items-center rounded border border-yellow-500 bg-transparent px-2.5 py-1 text-xs text-neutral-500 dark:text-neutral-400 transition duration-200 ease-out hover:text-neutral-400">
      <span>
        <Translate id="examples.seeCode">See the code</Translate>
      </span>
      <ArrowUpRight className="ml-2" size={14} />
    </button>
  </Link>
);

const DemoButton: FC<{ demoUrl: string }> = ({ demoUrl }) => (
  <Link to={demoUrl}>
    <button className="flex items-center rounded bg-yellow-500 px-2.5 py-1 text-xs text-white transition duration-200 ease-out hover:bg-yellow-400">
      <span>Demo</span>
      <Monitor className="ml-2" size={14} />
    </button>
  </Link>
);

const ExampleCard: FC<ExampleItem> = ({
  titleId,
  titleFallback,
  descriptionId,
  descriptionFallback,
  authorName,
  authorImg,
  repoName,
  repoUrl,
  demoUrl,
}) => (
  <>
    <div className="flex h-40 flex-col rounded rounded-b-none border-l border-r border-t border-yellow-500/25 bg-yellow-500/5 p-5">
      <div className="mb-4">
        <h4 className="mb-4 text-neutral-700 dark:text-neutral-200">
          <Translate id={titleId}>{titleFallback}</Translate>
        </h4>
        <p className="mb-4 text-sm text-neutral-500 dark:text-neutral-400">
          <Translate id={descriptionId}>{descriptionFallback}</Translate>
        </p>
        <div>
          <img className="inline w-6 rounded-full" src={authorImg} alt={`${authorName} profile`} />
          <span className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">{authorName}</span>
        </div>
      </div>
    </div>
    <div className="flex flex-col rounded rounded-t-none border-b border-l border-r border-yellow-500/25 bg-yellow-500/20 p-5">
      <Link to={repoUrl}>
        <span className="flex items-center text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-400">
          <span>{repoName}</span>
          <span className="ml-1 inline-block">
            <GitHub size={14} />
          </span>
        </span>
      </Link>
      <div className="mt-3 flex items-center gap-2">
        <SeeTheCodeButton repoUrl={repoUrl} />
        <span className="hidden md:block">{demoUrl && <DemoButton demoUrl={demoUrl} />}</span>
      </div>
    </div>
  </>
);

const ExampleApps: FC = () => (
  <SectionContainer className="space-y-16" id="examples">
    <div className="grid grid-cols-12">
      <div className="col-span-12 text-center">
        <h2 className="mb-4 text-xl text-neutral-700 dark:text-neutral-100 lg:text-2xl">
          <Translate id="examples.title">Not sure where to begin?</Translate>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          <Translate id="examples.description">
            Browse our examples to see EasyLayer in action and gather ideas for your next project.
          </Translate>
        </p>
      </div>
    </div>

    <div className="mt-16 grid grid-cols-12 gap-5">
      {EXAMPLES.map((e) => (
        <div className="col-span-12 lg:col-span-6 xl:col-span-4" key={e.titleId}>
          <ExampleCard {...e} />
        </div>
      ))}
    </div>

    <div className="flex justify-center">
      <Link to={DOCS_URLS.SECTIONS.EXAMPLES}>
        <span className="flex items-center font-medium text-neutral-500 dark:text-neutral-400 underline decoration-yellow-500 decoration-2 transition duration-200 ease-out hover:text-neutral-400">
          <span>
            <Translate id="examples.seeAll">See all examples</Translate>
          </span>
          <ArrowUpRight className="ml-1" size={14} />
        </span>
      </Link>
    </div>
  </SectionContainer>
);

export default ExampleApps;
