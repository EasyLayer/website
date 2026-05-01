// src/components/Roadmap.tsx
// Product roadmap section showing released tools, current progress, and upcoming features.

import type { FC } from 'react';
import React from 'react';
import { CheckSquare } from 'react-feather';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

interface FeatureItem {
  textId: string;
  textFallback: string;
}

const releasedFeatures: FeatureItem[] = [
  {
    textId: 'roadmap.item.released1',
    textFallback: '@easylayer/bitcoin-crawler — Bitcoin and Bitcoin-like networks (BTC, BCH, LTC, DOGE)',
  },
  {
    textId: 'roadmap.item.released2',
    textFallback: '@easylayer/evm-crawler — EVM-compatible networks (Ethereum, BSC, Polygon, L2)',
  },
  { textId: 'roadmap.item.released3', textFallback: '@easylayer/transport-sdk — multi-transport client SDK' },
];

const currentPhaseFeatures: FeatureItem[] = [
  { textId: 'roadmap.item.current1', textFallback: 'Performance improvements for Bitcoin and EVM crawlers' },
  {
    textId: 'roadmap.item.current2',
    textFallback: 'Developer onboarding: collecting feedback, helping teams test and configure',
  },
  { textId: 'roadmap.item.current3', textFallback: 'Expanding documentation and examples' },
];

const futurePhaseFeatures: FeatureItem[] = [
  { textId: 'roadmap.item.future1', textFallback: '@easylayer/solana-crawler' },
  { textId: 'roadmap.item.future2', textFallback: '@easylayer/ton-crawler' },
  { textId: 'roadmap.item.future3', textFallback: '@easylayer/tron-crawler' },
];

const Section: FC<{ features: FeatureItem[] }> = ({ features }) => (
  <ul className="space-y-4">
    {features.map(({ textId, textFallback }) => (
      <li key={textId} className="flex items-start gap-2">
        <span className="mt-0.5 text-yellow-500 shrink-0">
          <CheckSquare size={16} />
        </span>
        <span className="text-neutral-600 dark:text-neutral-300 text-sm">
          <Translate id={textId}>{textFallback}</Translate>
        </span>
      </li>
    ))}
  </ul>
);

const Roadmap: FC = () => (
  <SectionContainer className="lg:py-18 space-y-16" id="roadmap">
    <div className="grid grid-cols-12">
      <div className="col-span-12 text-center">
        <h2 className="mb-4 text-xl text-neutral-700 dark:text-neutral-100 lg:text-2xl">
          <Translate id="roadmap.title">⚡ Roadmap ⚡</Translate>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          <Translate id="roadmap.subtitle">From Idea and Concept to Implementation and Expansion</Translate>
        </p>
      </div>
    </div>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Released */}
      <div className="rounded-lg border border-green-500/25 bg-green-500/5 p-5">
        <div className="mb-6 text-center font-bold text-neutral-700 dark:text-neutral-200">
          <Translate id="roadmap.released">✅ Released</Translate>
        </div>
        <Section features={releasedFeatures} />
      </div>

      {/* In Progress */}
      <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/5 p-5">
        <div className="mb-6 text-center font-bold text-neutral-700 dark:text-neutral-200">
          <Translate id="roadmap.inProgress">🚧 In Progress</Translate>
        </div>
        <Section features={currentPhaseFeatures} />
      </div>

      {/* Coming Soon */}
      <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/20 p-5">
        <div className="mb-6 text-center font-bold text-neutral-700 dark:text-neutral-200">
          <Translate id="roadmap.comingSoon">⏳ Coming Soon</Translate>
        </div>
        <Section features={futurePhaseFeatures} />
      </div>
    </div>
  </SectionContainer>
);

export default Roadmap;
