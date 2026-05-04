// src/components/Hero/index.tsx
import type { FC } from 'react';
import React from 'react';
import { translate } from '@docusaurus/Translate';
import SectionContainer from '../Layouts/SectionContainer';
import HeroHeadline from './HeroHeadline';
import HeroCTAButtons from './HeroCTAButtons';
import HeroCodeBlock from './HeroCodeBlock';

const chains = [
  'Nodejs',
  'Bitcoin',
  'Ethereum',
  'BNB Chain',
  'Polygon',
  'Arbitrum',
  'Optimism',
  'Dogecoin',
  'Litecoin',
  'Bitcoin Cash',
  // '+ more',
];

const ChainBadges: FC = () => (
  <div className="flex flex-wrap gap-2">
    {chains.map((name) => (
      <span
        key={name}
        className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-medium text-neutral-500"
      >
        {name}
      </span>
    ))}
  </div>
);

const Hero: FC = () => (
  <SectionContainer className="pb-5 pt-24">
    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
      <div className="z-10 space-y-12 lg:col-span-6">
        <HeroHeadline />
        <HeroCTAButtons />
        <div className="flex flex-col gap-3">
          <small className="text-xs text-neutral-500">
            {translate({ id: 'hero.worksOn', message: 'Works on/with' })}
          </small>
          <ChainBadges />
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-4 lg:col-span-6 lg:mt-0">
        <HeroCodeBlock />
      </div>
    </div>
  </SectionContainer>
);

export default Hero;
