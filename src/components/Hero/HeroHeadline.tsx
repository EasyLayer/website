// src/components/Hero/HeroHeadline.tsx
import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';

const HeroHeadline: FC = () => (
  <div>
    <h1 className="text-4xl font-extrabold text-neutral-700 dark:text-neutral-100 lg:text-5xl lg:leading-tight">
      <Translate id="hero.title.prefix">Build Your Own</Translate>{' '}
      <span className="underline decoration-yellow-500">
        <Translate id="hero.title.highlight">Blockchain Indexer</Translate>
      </span>{' '}
      <Translate id="hero.title.suffix">Using Our Framework</Translate>
    </h1>
    <p className="mt-4 text-xl text-neutral-500 dark:text-neutral-400 sm:mt-5 lg:text-xl">
      <Translate id="hero.subtitle">Install. Describe your model. Run your indexer in minutes.</Translate>
      <br className="hidden sm:block" />
      <span className="font-medium">
        <Translate id="hero.subtitle.highlight">Self-hosted, cost-effective</Translate>
      </span>
      {', '}
      <Translate id="hero.subtitle.rest">and feels like regular backend development.</Translate>
    </p>
  </div>
);

export default HeroHeadline;
