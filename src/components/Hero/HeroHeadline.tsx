// src/components/Hero/HeroHeadline.tsx
import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';

const HeroHeadline: FC = () => (
  <div>
    <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
      <Translate id="hero.eyebrow">Self-hosted blockchain state services</Translate>
    </p>
    <h1 className="text-4xl font-extrabold text-neutral-700 lg:text-5xl lg:leading-tight">
      <Translate id="hero.title.prefix">Build custom</Translate>{' '}
      <span className="underline decoration-yellow-500">
        <Translate id="hero.title.highlight">blockchain state</Translate>
      </span>{' '}
      <Translate id="hero.title.suffix">without writing indexing infrastructure from scratch</Translate>
    </h1>
    <p className="mt-4 text-xl text-neutral-500 sm:mt-5 lg:text-xl">
      <Translate id="hero.subtitle">
        EasyLayer helps TypeScript developers persist blockchain events, build custom state models, handle reorg-aware
        workflows, and expose data through HTTP, WebSocket, IPC, desktop, or browser transports.
      </Translate>
      <br className="hidden sm:block" />
      <span className="font-medium text-neutral-600">
        <Translate id="hero.subtitle.highlight">Start with proof, quickstart, and code you can inspect.</Translate>
      </span>
    </p>
  </div>
);

export default HeroHeadline;
