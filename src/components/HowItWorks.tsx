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
            Install the crawler package for your chain. Define what on-chain data your app needs to track. Point at a
            node or external provider. Run it.
          </Translate>
        </p>
        <br />
        <p className="text-neutral-700">
          <Translate id="howItWorks.description2">
            The framework reads blocks from any height, keeps your state current on every new block, recovers from chain
            reorgs automatically, and serves your data over HTTP, WebSocket, or IPC. Everything runs on your server.
            Your data never leaves your infrastructure.
          </Translate>
        </p>
      </div>

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
