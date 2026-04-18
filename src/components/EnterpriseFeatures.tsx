// src/components/EnterpriseFeatures.tsx
import type { FC } from 'react';
import React from 'react';
import Translate, { translate } from '@docusaurus/Translate';
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
  <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/5 dark:bg-neutral-800/50 p-6 space-y-4">
    <div className="text-3xl">{icon}</div>
    <h3 className="text-lg font-bold text-neutral-700 dark:text-neutral-100">
      <Translate id={titleId}>{titleFallback}</Translate>
    </h3>
    <p className="text-sm text-neutral-500 dark:text-neutral-400">
      <Translate id={descriptionId}>{descriptionFallback}</Translate>
    </p>
    <ul className="space-y-2">
      {bullets.map((b, i) => (
        <li key={i} className="flex items-start gap-2 text-sm text-neutral-600 dark:text-neutral-300">
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
    titleFallback: 'Managed Infrastructure',
    descriptionId: 'enterprise.feature1.desc',
    descriptionFallback: 'We deploy and operate EasyLayer for your team. No DevOps expertise required.',
    bullets: [
      'Full deployment on your cloud or ours',
      'Monitoring, alerting and on-call',
      'Automatic upgrades and reorg recovery',
      'SLA-backed availability',
    ],
  },
  {
    icon: '🗄️',
    titleId: 'enterprise.feature2.title',
    titleFallback: 'SQL Read Models',
    descriptionId: 'enterprise.feature2.desc',
    descriptionFallback: 'Describe your schema — we store blockchain data directly in PostgreSQL for fast reads.',
    bullets: [
      'Custom table schemas via config',
      'Optimised indexes for high-throughput reads',
      'Compatible with any Postgres client or ORM',
      'Ideal for analytics and reporting',
    ],
  },
  {
    icon: '🪣',
    titleId: 'enterprise.feature3.title',
    titleFallback: 'S3 / Object Storage Models',
    descriptionId: 'enterprise.feature3.desc',
    descriptionFallback: 'Stream blockchain data to S3 or compatible storage in multiple formats.',
    bullets: [
      'Parquet, JSON, CSV output formats',
      'Partitioned by block range or date',
      'Compatible with Athena, BigQuery, Snowflake',
      'Webhook notifications on new files',
    ],
  },
  {
    icon: '🛡️',
    titleId: 'enterprise.feature4.title',
    titleFallback: 'Priority Support',
    descriptionId: 'enterprise.feature4.desc',
    descriptionFallback: 'Direct access to the EasyLayer engineering team.',
    bullets: [
      'Dedicated Slack / Telegram channel',
      'Response time SLA (business hours)',
      'Architecture review and consulting',
      'Early access to new features',
    ],
  },
];

const STEPS = [
  {
    step: '01',
    titleId: 'enterprise.step1.title',
    titleFallback: 'Tell us your use case',
    descId: 'enterprise.step1.desc',
    descFallback: 'Fill in the form below. Takes 2 minutes.',
  },
  {
    step: '02',
    titleId: 'enterprise.step2.title',
    titleFallback: 'We design the setup',
    descId: 'enterprise.step2.desc',
    descFallback: 'Our team proposes the right service mix for your needs.',
  },
  {
    step: '03',
    titleId: 'enterprise.step3.title',
    titleFallback: 'You ship faster',
    descId: 'enterprise.step3.desc',
    descFallback: 'Focus on your product — we handle the infrastructure.',
  },
];

const EnterpriseFeatures: FC = () => (
  <>
    <SectionContainer className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100 lg:text-3xl">
          <Translate id="enterprise.proServices.title">PRO Services</Translate>
        </h2>
        <p className="mt-3 text-neutral-500 dark:text-neutral-400">
          <Translate id="enterprise.proServices.subtitle">
            Everything you need to run blockchain data infrastructure at scale.
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
      <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/10 dark:bg-neutral-800/50 px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100">
            <Translate id="enterprise.howItWorks.title">How it works</Translate>
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {STEPS.map(({ step, titleId, titleFallback, descId, descFallback }) => (
            <div key={step} className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-yellow-500 text-white font-bold text-lg">
                {step}
              </div>
              <h3 className="font-semibold text-neutral-700 dark:text-neutral-100 mb-2">
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
