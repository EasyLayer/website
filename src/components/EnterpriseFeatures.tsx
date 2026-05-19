// src/components/EnterpriseFeatures.tsx
import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';
import SectionContainer from './Layouts/SectionContainer';

interface CardProps {
  icon: string;
  titleId: string;
  titleFallback: string;
  descriptionId: string;
  descriptionFallback: string;
  bullets: string[];
}

const FeatureCard: FC<CardProps> = ({ icon, titleId, titleFallback, descriptionId, descriptionFallback, bullets }) => (
  <div className="space-y-4 rounded-lg border border-yellow-500/25 bg-yellow-500/5 p-6 dark:bg-neutral-800/50">
    <div className="text-3xl">{icon}</div>
    <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-100">
      <Translate id={titleId}>{titleFallback}</Translate>
    </h3>
    <p className="text-sm text-neutral-500 dark:text-neutral-400">
      <Translate id={descriptionId}>{descriptionFallback}</Translate>
    </p>
    <ul className="space-y-2">
      {bullets.map((b) => (
        <li key={b} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
          <span className="mt-0.5 text-yellow-500">✓</span>
          <span>{b}</span>
        </li>
      ))}
    </ul>
  </div>
);

const FEATURES: CardProps[] = [
  {
    icon: '🏗️',
    titleId: 'enterprise.feature1.title',
    titleFallback: 'Deployment review',
    descriptionId: 'enterprise.feature1.desc',
    descriptionFallback: 'Get help choosing a self-hosted setup for your chain, runtime, and expected workload.',
    bullets: [
      'Runtime architecture review',
      'Node/provider strategy',
      'Database and storage choice',
      'Operational risks and trade-offs',
    ],
  },
  {
    icon: '🧩',
    titleId: 'enterprise.feature2.title',
    titleFallback: 'Custom state models',
    descriptionId: 'enterprise.feature2.desc',
    descriptionFallback:
      'Design the model that matches your product instead of forcing your app around a generic dataset.',
    bullets: [
      'Wallet/account state',
      'UTXO or transfer tracking',
      'Protocol-specific event models',
      'Historical query requirements',
    ],
  },
  {
    icon: '🗄️',
    titleId: 'enterprise.feature3.title',
    titleFallback: 'Read model planning',
    descriptionId: 'enterprise.feature3.desc',
    descriptionFallback:
      'For larger deployments, discuss whether SQL or S3 projections make sense on top of the event stream.',
    bullets: [
      'PostgreSQL read paths',
      'S3/object storage archives',
      'Batching and replay strategy',
      'Consumer/API access patterns',
    ],
  },
  {
    icon: '🛠️',
    titleId: 'enterprise.feature4.title',
    titleFallback: 'Implementation support',
    descriptionId: 'enterprise.feature4.desc',
    descriptionFallback:
      'Work directly with the EasyLayer team when the open-source quickstart is not enough for your use case.',
    bullets: ['Architecture consulting', 'Example adaptation', 'Integration debugging', 'Roadmap fit review'],
  },
];

const STEPS = [
  {
    step: '01',
    titleId: 'enterprise.step1.title',
    titleFallback: 'Describe the use case',
    descId: 'enterprise.step1.desc',
    descFallback: 'Send the chain, state model, traffic expectations, and what you already tried.',
  },
  {
    step: '02',
    titleId: 'enterprise.step2.title',
    titleFallback: 'We check the fit',
    descId: 'enterprise.step2.desc',
    descFallback: 'The team reviews whether EasyLayer is a practical fit and what would need custom work.',
  },
  {
    step: '03',
    titleId: 'enterprise.step3.title',
    titleFallback: 'Agree the next step',
    descId: 'enterprise.step3.desc',
    descFallback: 'That might be a proof-of-concept, architecture review, or implementation support package.',
  },
];

const EnterpriseFeatures: FC = () => (
  <>
    <SectionContainer className="py-16">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100 lg:text-3xl">
          <Translate id="enterprise.proServices.title">What custom support can cover</Translate>
        </h2>
        <p className="mt-3 text-neutral-500 dark:text-neutral-400">
          <Translate id="enterprise.proServices.subtitle">
            This is a technical support path for serious EasyLayer use cases, not a generic cloud pricing plan.
          </Translate>
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {FEATURES.map((f) => (
          <FeatureCard key={f.titleId} {...f} />
        ))}
      </div>
    </SectionContainer>
    <SectionContainer className="pb-16">
      <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 px-8 py-12 dark:bg-neutral-800/50">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100">
            <Translate id="enterprise.howItWorks.title">How it works</Translate>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map(({ step, titleId, titleFallback, descId, descFallback }) => (
            <div key={step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-lg font-bold text-white">
                {step}
              </div>
              <h3 className="mb-2 font-semibold text-neutral-700 dark:text-neutral-100">
                <Translate id={titleId}>{titleFallback}</Translate>
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                <Translate id={descId}>{descFallback}</Translate>
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  </>
);

export default EnterpriseFeatures;
