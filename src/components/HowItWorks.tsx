// src/components/HowItWorks.tsx
import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

const HowItWorks: FC = () => (
  <SectionContainer className="lg:pb-8">
    <div className="grid grid-cols-12">
      <div className="col-span-12 lg:col-span-4">
        <h2 className="mb-4 text-xl text-neutral-700 lg:text-2xl">
          <Translate id="howItWorks.title">How does it work? 🧐</Translate>
        </h2>
        <p className="text-neutral-700">
          <Translate id="howItWorks.description1">
            Choose the crawler package for your chain, define the state model your application needs, point the runtime
            at a node or provider, and run it as a self-hosted service.
          </Translate>
        </p>
        <br />
        <p className="text-neutral-700">
          <Translate id="howItWorks.description2">
            The framework turns chain data into persisted events, restores state through the EventStore, and exposes
            query/stream access through supported transports. Reorg-aware behavior is part of the architecture, but each
            deployment should still be validated against its chain, provider, and workload.
          </Translate>
        </p>
      </div>

      <div className="col-span-12 mt-8 self-center justify-self-center px-4 sm:px-6 lg:col-span-7 lg:mt-0 lg:px-0 xl:col-span-7 xl:col-start-6">
        <img
          className="block h-auto max-w-full"
          src="img/how_it_works_diagram.png"
          alt="EasyLayer architecture diagram"
          loading="lazy"
        />
      </div>
    </div>
  </SectionContainer>
);

export default HowItWorks;
