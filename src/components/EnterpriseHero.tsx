// src/components/EnterpriseHero.tsx
import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

const EnterpriseHero: FC = () => (
  <SectionContainer className="pb-8 pt-24">
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-6 inline-flex items-center rounded-full bg-yellow-500/15 px-4 py-1.5 text-sm font-medium text-yellow-700">
        <Translate id="enterprise.hero.badge">⚡ EasyLayer PRO Services</Translate>
      </div>
      <h1 className="text-4xl font-extrabold text-neutral-700 dark:text-neutral-100 lg:text-5xl lg:leading-tight">
        <Translate id="enterprise.hero.title">Blockchain Infrastructure Built for Your Business</Translate>
      </h1>
      <p className="mt-6 text-xl text-neutral-500 dark:text-neutral-400 leading-relaxed">
        <Translate id="enterprise.hero.description">
          Skip the infrastructure complexity. Get managed deployment, optimised read models, and direct team support —
          so your engineers focus on product, not ops.
        </Translate>
      </p>
      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
        <a href="#contact">
          <button className="inline-flex items-center rounded border border-yellow-500 bg-yellow-500 px-6 py-3 text-base font-medium text-white transition duration-200 ease-out hover:bg-yellow-400">
            <Translate id="enterprise.hero.cta.primary">Talk to us →</Translate>
          </button>
        </a>
        <Link to="/docs">
          <button className="inline-flex items-center rounded border border-neutral-400 px-6 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 transition duration-200 ease-out hover:border-yellow-500 hover:text-yellow-500">
            <Translate id="enterprise.hero.cta.secondary">Read the Docs</Translate>
          </button>
        </Link>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-neutral-500 dark:text-neutral-400">
        <span>✓ Bitcoin &amp; EVM support</span>
        <span>✓ Self-hosted or fully managed</span>
        <span>✓ Priority support included</span>
        <span>✓ Custom SLAs available</span>
      </div>
    </div>
  </SectionContainer>
);

export default EnterpriseHero;
