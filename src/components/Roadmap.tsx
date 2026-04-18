// src/components/Roadmap.tsx
// Product roadmap section showing current progress and upcoming features.

import type { FC } from 'react';
import React from 'react';
import { GitHub, CheckSquare, ArrowRight } from 'react-feather';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

type LinkType = 'issue' | 'task' | 'other';

interface FeatureLink {
  url: string;
  label: string;
  type: LinkType;
}

interface FeatureItem {
  textId: string;
  textFallback: string;
  link?: FeatureLink;
}

const currentPhaseFeatures: FeatureItem[] = [
  {
    textId: 'roadmap.item.current1',
    textFallback: 'Testing and improving @bitcoin-crawler',
    link: { url: '', label: '#1', type: 'issue' },
  },
];

const futurePhaseFeatures: FeatureItem[] = [
  {
    textId: 'roadmap.item.future1',
    textFallback: 'Release beta versions of @evm-crawler, ready for developers to use.',
    link: { url: '', label: '#100', type: 'task' },
  },
];

type IconMap = Record<LinkType, React.ComponentType<{ size?: number; strokeWidth?: number }>>;

const ICON_MAP: IconMap = { issue: GitHub, task: ArrowRight, other: CheckSquare };

const FeatureLinkBadge: FC<FeatureLink> = ({ label, type }) => {
  const Icon = ICON_MAP[type] || ArrowRight;
  return (
    <span className="cursor-pointer rounded-full bg-neutral-600 px-2.5 py-1 text-xs text-white">
      <div className="group inline-flex items-center gap-1">
        <span>{label}</span>
        <div className="transition-all group-hover:ml-0.5">
          <span className="text-yellow-400">
            <Icon size={14} />
          </span>
        </div>
      </div>
    </span>
  );
};

const Section: FC<{ features: FeatureItem[] }> = ({ features }) => (
  <ul className="space-y-6">
    {features.map(({ textId, textFallback, link }) => (
      <li className="grid grid-cols-12" key={textId}>
        <div className="col-span-8 col-start-3 flex items-center">
          <span>
            <span className="text-neutral-600 dark:text-neutral-300">
              <Translate id={textId}>{textFallback}</Translate>
            </span>
            {link && (
              <>
                &nbsp;
                <FeatureLinkBadge {...link} />
              </>
            )}
          </span>
        </div>
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

    <div className="grid grid-cols-1 md:gap-16 lg:grid-cols-2">
      <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/5 p-5">
        <div className="mb-6 text-center font-bold text-neutral-700 dark:text-neutral-200">
          <Translate id="roadmap.inProgress">🚧 In Progress</Translate>
        </div>
        <Section features={currentPhaseFeatures} />
      </div>

      <div className="mt-6 rounded-lg border border-yellow-500/25 bg-yellow-500/20 p-5 lg:mt-0">
        <div className="mb-6 text-center font-bold text-neutral-700 dark:text-neutral-200">
          <Translate id="roadmap.comingSoon">⏳ Coming Soon</Translate>
        </div>
        <Section features={futurePhaseFeatures} />
      </div>
    </div>
  </SectionContainer>
);

export default Roadmap;
