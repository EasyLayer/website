import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { ArrowRight } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';

interface TextLinkProps {
  url: string;
  label: string;
}

const TextLink: FC<TextLinkProps> = ({ url, label }) => (
  <Link to={url}>
    <span
      className={`
        mt-3 block cursor-pointer text-sm
        text-neutral-600 hover:text-neutral-500
      `}
    >
      <div className="group flex items-center gap-1">
        <span>{label}</span>
        <div className="transition-all group-hover:ml-0.5">
          <span className="text-yellow-600">
            <ArrowRight size={14} strokeWidth={2} />
          </span>
        </div>
      </div>
    </span>
  </Link>
);

interface FeatureProps {
  title: string;
  description: string;
  url?: string;
}

const Feature: FC<FeatureProps> = ({ title, description, url }) => (
  <div className="col-span-12 md:col-span-6">
    <div className="lg:mt-5">
      <dt>
        <h4 className="mb-4">
          <span className="rounded bg-yellow-500/25 box-decoration-clone px-2 py-1 leading-[1.73] text-neutral-700">
            {title}
          </span>
        </h4>
        <p className="text-neutral-600">{description}</p>
        {url && <TextLink url={url} label="Learn more" />}
      </dt>
    </div>
  </div>
);

const HowItWorks: FC = () => {
  return (
    <SectionContainer className="lg:pb-8">
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-4">
          <h2 className="mb-4 text-xl text-neutral-700 lg:text-2xl">How does it work? 🧐</h2>
          <p className="text-neutral-700">
            Install crawler package and describe your custom <code>Model</code> - what blockchain data you need to
            track. Configure blockchain <code>Node Provider</code> (your self node or external like QuickNode) and{' '}
            <code>Event Store</code> (SQLite,PostgreSQL or IndexDB). That's it - framework handles everything else.
            <br />
            <br />
            Your model parses blocks and generates domain events. Framework stores them with Event Sourcing pattern,
            automatically handles blockchain reorgs, and exposes <code>Transport</code> APIs (HTTP, WebSocket, IPC) for
            queries and real-time event streams.
          </p>

          {/* Features */}
          {/* <div className="py-8">
            <dl className="grid grid-cols-12 gap-y-4 md:gap-8">
              <Feature
                title=""
                url=""
                description=""
              />

              <Feature
                title=""
                url=""
                description=""
              />
            </dl>
          </div>{' '} */}
          {/* EOF Features */}
        </div>

        <div
          className="col-span-12 lg:col-span-7 xl:col-span-7 xl:col-start-6
                  self-center justify-self-center
                  mt-8 lg:mt-0 px-4 sm:px-6 lg:px-0"
        >
          <img className="block max-w-full h-auto" src="img/how_it_works_diagram.png" alt="Diagram" loading="lazy" />
        </div>
      </div>
    </SectionContainer>
  );
};

export default HowItWorks;
