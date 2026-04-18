// src/components/HowItWorks.tsx
// "How does it work" explainer section with a diagram.

import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

const HowItWorks: FC = () => (
  <SectionContainer className="lg:pb-8">
    <div className="grid grid-cols-12">
      {/* Left — text explanation */}
      <div className="col-span-12 lg:col-span-4">
        <h2 className="mb-4 text-xl text-neutral-700 dark:text-neutral-100 lg:text-2xl">
          <Translate id="howItWorks.title">How does it work? 🧐</Translate>
        </h2>
        <p className="text-neutral-700 dark:text-neutral-300">
          <Translate id="howItWorks.description1">
            Install crawler package and describe your custom Model — what blockchain data you need to track. Configure
            blockchain Node Provider (your self node or external like QuickNode) and Event Store (SQLite, PostgreSQL or
            IndexedDB). That's it — framework handles everything else.
          </Translate>
        </p>
        <br />
        <p className="text-neutral-700 dark:text-neutral-300">
          <Translate id="howItWorks.description2">
            Your model parses blocks and generates domain events. Framework stores them with Event Sourcing pattern,
            automatically handles blockchain reorgs, and exposes Transport APIs (HTTP, WebSocket, IPC) for queries and
            real-time event streams.
          </Translate>
        </p>
      </div>

      {/* Right — diagram */}
      <div
        className="col-span-12 lg:col-span-7 xl:col-span-7 xl:col-start-6
                    self-center justify-self-center
                    mt-8 lg:mt-0 px-4 sm:px-6 lg:px-0"
      >
        <img
          className="block max-w-full h-auto"
          src="img/how_it_works_diagram.png"
          alt="EasyLayer architecture diagram"
          loading="lazy"
        />
      </div>
    </div>
  </SectionContainer>
);

export default HowItWorks;
