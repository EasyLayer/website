// src/components/EnterpriseHero.tsx
import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

const EnterpriseHero: FC = () => (
  <SectionContainer className="pb-16 pt-24">
    <div className="mx-auto max-w-4xl text-center">
      <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
        <Translate id="enterprise.hero.eyebrow">Custom support</Translate>
      </p>
      <h1 className="text-4xl font-extrabold text-neutral-700 dark:text-neutral-100 lg:text-5xl">
        <Translate id="enterprise.hero.title">
          Need help building self-hosted blockchain state infrastructure?
        </Translate>
      </h1>
      <p className="mx-auto mt-5 max-w-3xl text-xl text-neutral-500 dark:text-neutral-400">
        <Translate id="enterprise.hero.subtitle">
          Tell us about your use case if you need a custom state model, deployment support, or architecture review. The
          current offer is custom technical help around EasyLayer, not a generic managed SaaS plan.
        </Translate>
      </p>
    </div>
  </SectionContainer>
);

export default EnterpriseHero;
