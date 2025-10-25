import type { FC } from 'react';
import React from 'react';
import { GitHub, ArrowUpRight, Monitor } from 'react-feather';
import Link from '@docusaurus/Link';
import SectionContainer from './Layouts/SectionContainer';
import { EXAMPLE_APPS, DOCS_URLS, SITE_URLS } from '../urls';

interface ExampleItem {
  title: string;
  description: string;
  authorName: string;
  authorImg: string;
  repoName: string;
  repoUrl: string;
  demoUrl?: string;
}

const examples: ExampleItem[] = [
  {
    title: 'System Examples - Getting Started 🚀',
    description:
      'Learn how to connect Bitcoin Crawler in different modes: HTTP RPC, P2P, ZMQ subscriptions, and various configurations',
    authorName: 'easylayer',
    authorImg: `${SITE_URLS.BASE}/img/logo.png`,
    repoName: '@easylayer/bitcoin-crawler',
    repoUrl: EXAMPLE_APPS.BITCOIN_SYSTEM,
  },
  {
    title: 'Basic Wallet Watcher 👛',
    description:
      'Track wallet balances - when funds arrive and when they leave. Simple UTXO monitoring for payment processors and wallets',
    authorName: 'easylayer',
    authorImg: `${SITE_URLS.BASE}/img/logo.png`,
    repoName: '@easylayer/bitcoin-crawler',
    repoUrl: EXAMPLE_APPS.BITCOIN_BASIC_WALLET_WATCHER,
  },
  {
    title: 'Advanced Wallet Watcher 💎',
    description:
      'Full wallet monitoring with mempool tracking - detect deposits, pending transactions, double-spend attempts',
    authorName: 'easylayer',
    authorImg: `${SITE_URLS.BASE}/img/logo.png`,
    repoName: '@easylayer/bitcoin-crawler',
    repoUrl: EXAMPLE_APPS.BITCOIN_ADVANCED_WALLET_WATCHER,
  },
];

interface SeeTheCodeButtonProps {
  repoUrl: string;
}

const SeeTheCodeButton: FC<SeeTheCodeButtonProps> = ({ repoUrl }) => (
  <Link to={repoUrl}>
    <button
      className={`
        flex items-center
        rounded
        border border-yellow-500 bg-transparent
        px-2.5 py-1 text-xs text-neutral-500
        transition duration-200 ease-out hover:text-neutral-400
      `}
    >
      <span>See the code</span>
      <ArrowUpRight className="ml-2" size={14} />
    </button>
  </Link>
);

interface DemoButtonProps {
  demoUrl: string;
}

const DemoButton: FC<DemoButtonProps> = ({ demoUrl }) => (
  <Link to={demoUrl}>
    <button
      className={`
        flex items-center
        rounded
        bg-yellow-500 px-2.5 py-1
        text-xs text-white
        transition duration-200 ease-out hover:bg-yellow-400
      `}
    >
      <span>Demo</span>
      <Monitor className="ml-2" size={14} />
    </button>
  </Link>
);

interface ExampleCardProps extends ExampleItem {}

const ExampleCard: FC<ExampleCardProps> = ({
  title,
  description,
  authorName,
  authorImg,
  repoName,
  repoUrl,
  demoUrl,
}) => (
  <>
    {/* Top half */}
    <div
      className={`
        flex h-40 flex-col rounded rounded-b-none
        border-l border-r border-t border-yellow-500/25
        bg-yellow-500/5 p-5
      `}
    >
      <div className="mb-4">
        <h4 className="mb-4 text-neutral-700">{title}</h4>
        <p className="mb-4 text-sm text-neutral-500">{description}</p>
        <div>
          <img className="inline w-6 rounded-full" src={authorImg} alt={`${authorName} GitHub profile picture`} />
          <span className="ml-2 text-sm text-neutral-700">{authorName}</span>
        </div>
      </div>
    </div>

    {/* Bottom half */}
    <div
      className={`
        flex flex-col rounded rounded-t-none border-b
        border-l border-r border-yellow-500/25 bg-yellow-500/20 p-5
      `}
    >
      <Link to={repoUrl}>
        <span className="flex items-center text-sm text-neutral-500 hover:text-neutral-400">
          <span>{repoName}</span>
          <span className="ml-1 inline-block">
            <GitHub size={14} />
          </span>
        </span>
      </Link>

      {/* Action buttons */}
      <div className="mt-3 flex items-center gap-2">
        <SeeTheCodeButton repoUrl={repoUrl} />
        {/* Demo apps are not mobile-friendly yet so hiding them on mobile for now. */}
        <span className="hidden md:block">{demoUrl && <DemoButton demoUrl={demoUrl} />}</span>
      </div>
    </div>
  </>
);

const ExampleApps: FC = () => {
  return (
    <SectionContainer className="space-y-16" id="examples">
      <div className="grid grid-cols-12">
        <div className="col-span-12 text-center">
          <h2 className="mb-4 text-xl text-neutral-700 lg:text-2xl">Not sure where to begin?</h2>
          <p className="text-neutral-500">
            Browse our examples to see EasyLayer in action and gather ideas for your next project.
          </p>
        </div>
      </div>

      <div className="mt-16 grid grid-cols-12 gap-5">
        {examples.slice(0, 6).map((e, idx) => (
          <div className="col-span-12 lg:col-span-6 xl:col-span-4" key={idx}>
            <ExampleCard {...e} />
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Link to={DOCS_URLS.SECTIONS.EXAMPLES}>
          <span
            className={`
              flex items-center font-medium text-neutral-500 underline
              decoration-yellow-500 decoration-2 transition duration-200
              ease-out hover:text-neutral-400
            `}
          >
            <span>See all examples</span>
            <ArrowUpRight className="ml-1" size={14} />
          </span>
        </Link>
      </div>
    </SectionContainer>
  );
};

export default ExampleApps;
