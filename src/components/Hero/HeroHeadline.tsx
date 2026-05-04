// src/components/Hero/HeroHeadline.tsx
import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';

const HeroHeadline: FC = () => (
  <div>
    <h1 className="text-4xl font-extrabold text-neutral-700 lg:text-5xl lg:leading-tight">
      <Translate id="hero.title.prefix">Build a</Translate>{' '}
      <span className="underline decoration-yellow-500">
        <Translate id="hero.title.highlight">Self-Hosted Blockchain</Translate>
      </span>{' '}
      <Translate id="hero.title.suffix">State Service</Translate>
    </h1>
    <p className="mt-4 text-xl text-neutral-500 sm:mt-5 lg:text-xl">
      <Translate id="hero.subtitle">
        Point at a Bitcoin or EVM node. Get live, always-current on-chain state running on your own server.
      </Translate>
      <br className="hidden sm:block" />
      <Translate id="hero.subtitle.line2">
        Every block updates your state automatically. Reorgs handled. Query via HTTP or WebSocket.
      </Translate>
      <br className="hidden sm:block" />
      <span className="font-medium text-neutral-600">
        <Translate id="hero.subtitle.highlight">Your data, your server, no subscription fees.</Translate>
      </span>
    </p>
  </div>
);

export default HeroHeadline;
