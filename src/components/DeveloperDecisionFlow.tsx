// src/components/DeveloperDecisionFlow.tsx
// Homepage decision section: when to use EasyLayer and what to do next.

import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { ArrowRight } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import { DOCS_URLS, SITE_URLS } from '../urls';
import { trackEvent } from '../lib/analytics';

const DeveloperDecisionFlow: FC = () => (
  <SectionContainer className="pb-16">
    <div className="rounded-2xl border border-neutral-200 bg-white/80 p-8 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60">
      <div className="grid gap-8 lg:grid-cols-3">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-yellow-600">
            <Translate id="decisionFlow.eyebrow">Good fit</Translate>
          </p>
          <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100">
            <Translate id="decisionFlow.title">Use EasyLayer when your app needs focused blockchain state</Translate>
          </h2>
        </div>
        <div className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          <p>
            <Translate id="decisionFlow.goodFit">
              EasyLayer is a fit when you need to monitor a contract, wallet set, UTXO view, or protocol-specific state
              and you want to store only the state changes your product actually needs.
            </Translate>
          </p>
        </div>
        <div className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">
          <p>
            <Translate id="decisionFlow.notFit">
              If you only need a generic hosted lookup today, a managed API may be faster. EasyLayer is strongest when
              the state model, integration path, and self-hosted control matter.
            </Translate>
          </p>
          <Link
            to={SITE_URLS.WHY}
            onClick={() => trackEvent('homepage_why_click', { location: 'decision_flow' })}
            className="mt-4 inline-flex items-center font-medium text-neutral-700 underline decoration-yellow-500 decoration-2 dark:text-neutral-200"
          >
            <Translate id="decisionFlow.cta">See when it fits</Translate>
            <ArrowRight className="ml-1" size={14} />
          </Link>
        </div>
      </div>
      <div className="mt-8 grid gap-3 border-t border-neutral-200 pt-6 text-sm dark:border-neutral-700 md:grid-cols-3">
        <Link
          to={DOCS_URLS.SECTIONS.QUICKSTART}
          className="rounded-lg border border-yellow-500/25 p-4 hover:bg-yellow-500/5"
        >
          <strong className="text-neutral-700 dark:text-neutral-100">
            <Translate id="decisionFlow.step1.title">1. Run the quickstart</Translate>
          </strong>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            <Translate id="decisionFlow.step1.description">Validate the package and transport path locally.</Translate>
          </p>
        </Link>
        <Link
          to={DOCS_URLS.SECTIONS.FIRST_CUSTOM_MODEL}
          className="rounded-lg border border-yellow-500/25 p-4 hover:bg-yellow-500/5"
        >
          <strong className="text-neutral-700 dark:text-neutral-100">
            <Translate id="decisionFlow.step2.title">2. Build a narrow model</Translate>
          </strong>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            <Translate id="decisionFlow.step2.description">
              Track one contract, wallet set, or event stream first.
            </Translate>
          </p>
        </Link>
        <Link to={SITE_URLS.PROOF} className="rounded-lg border border-yellow-500/25 p-4 hover:bg-yellow-500/5">
          <strong className="text-neutral-700 dark:text-neutral-100">
            <Translate id="decisionFlow.step3.title">3. Check the proof path</Translate>
          </strong>
          <p className="mt-1 text-neutral-500 dark:text-neutral-400">
            <Translate id="decisionFlow.step3.description">
              Review current evidence and limits before expanding scope.
            </Translate>
          </p>
        </Link>
      </div>
    </div>
  </SectionContainer>
);

export default DeveloperDecisionFlow;
