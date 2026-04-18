// src/components/Hero/index.tsx
import type { FC } from 'react';
import React from 'react';
import { translate } from '@docusaurus/Translate';
import SectionContainer from '../Layouts/SectionContainer';
import HeroHeadline from './HeroHeadline';
import HeroCTAButtons from './HeroCTAButtons';
import HeroCodeBlock from './HeroCodeBlock';

const Hero: FC = () => (
  <SectionContainer className="pb-5 pt-24">
    <div className="lg:grid lg:grid-cols-12 lg:gap-16">
      <div className="z-10 space-y-12 lg:col-span-6">
        <HeroHeadline />
        <HeroCTAButtons />
        <div className="flex flex-col gap-4">
          <small className="text-xs text-neutral-500 dark:text-neutral-400">
            {translate({ id: 'hero.worksOn', message: 'Works on' })}
          </small>
          <div className="flex">
            <img className="h-8 pr-5 md:h-10 md:pr-10" src="img/lending/nodejs-logo.svg" alt="Node.js" loading="lazy" />
            <img className="h-8 pr-5 md:h-10 md:pr-10" src="img/lending/bitcoin.svg" alt="Bitcoin" loading="lazy" />
            <img className="h-8 pr-5 md:h-10 md:pr-10" src="img/lending/ethereum.svg" alt="Ethereum" loading="lazy" />
          </div>
        </div>
      </div>
      <div className="mt-16 flex flex-col gap-4 lg:col-span-6 lg:mt-0">
        <HeroCodeBlock />
      </div>
    </div>
  </SectionContainer>
);

export default Hero;
