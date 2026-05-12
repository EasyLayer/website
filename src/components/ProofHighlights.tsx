// src/components/ProofHighlights.tsx
// Proof-first homepage section: show concrete product evidence and the practical evaluation path.

import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { ArrowRight, Code, GitHub, HardDrive, Monitor, RefreshCw } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import { DOCS_URLS, SITE_URLS, SOCIAL_URLS } from '../urls';
import { trackEvent } from '../lib/analytics';

interface ProofItem {
  icon: React.ReactNode;
  titleId: string;
  titleFallback: string;
  descriptionId: string;
  descriptionFallback: string;
}

const PROOF_ITEMS: ProofItem[] = [
  {
    icon: <Code size={20} />,
    titleId: 'proofHighlights.customState.title',
    titleFallback: 'Custom state models',
    descriptionId: 'proofHighlights.customState.description',
    descriptionFallback:
      'Model the state your product needs: contract activity, wallet balances, UTXOs, fees, or another focused view.',
  },
  {
    icon: <HardDrive size={20} />,
    titleId: 'proofHighlights.focusedStorage.title',
    titleFallback: 'Focused storage',
    descriptionId: 'proofHighlights.focusedStorage.description',
    descriptionFallback:
      'Persist model events and state instead of storing unrelated chain data in your application database.',
  },
  {
    icon: <RefreshCw size={20} />,
    titleId: 'proofHighlights.reorg.title',
    titleFallback: 'Reorg-aware architecture',
    descriptionId: 'proofHighlights.reorg.description',
    descriptionFallback:
      'Event persistence, rollback, and state restoration are part of the framework architecture, not left as ad-hoc app code.',
  },
  {
    icon: <Monitor size={20} />,
    titleId: 'proofHighlights.transports.title',
    titleFallback: 'Multiple transports',
    descriptionId: 'proofHighlights.transports.description',
    descriptionFallback:
      'Integrate the same state service through HTTP, WebSocket, IPC, Electron IPC, or browser/shared-worker paths.',
  },
];

const ProofHighlights: FC = () => (
  <SectionContainer className="space-y-10 py-16" id="proof-highlights">
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-12 lg:col-span-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
          <Translate id="proofHighlights.eyebrow">Proof-first evaluation</Translate>
        </p>
        <h2 className="mb-4 text-2xl font-bold text-neutral-700 dark:text-neutral-100 lg:text-3xl">
          <Translate id="proofHighlights.title">
            Start with a narrow state model, not a broad platform promise
          </Translate>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          <Translate id="proofHighlights.description">
            EasyLayer makes the most sense when your app needs to own a specific slice of blockchain state. Validate one
            model, one storage path, and one transport before expanding the architecture.
          </Translate>
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to={SITE_URLS.PROOF} onClick={() => trackEvent('hero_proof_click', { location: 'proof_highlights' })}>
            <button className="inline-flex items-center rounded-lg border border-yellow-500 bg-yellow-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-yellow-400">
              <Translate id="proofHighlights.cta.proof">View proof path</Translate>
              <ArrowRight className="ml-2" size={14} />
            </button>
          </Link>
          <Link
            to={DOCS_URLS.SECTIONS.QUICKSTART}
            onClick={() => trackEvent('proof_quickstart_click', { location: 'proof_highlights' })}
          >
            <button className="inline-flex items-center rounded-lg border border-neutral-400 px-4 py-2 text-sm font-semibold text-neutral-700 transition hover:border-neutral-600 dark:text-neutral-300">
              <Translate id="proofHighlights.cta.quickstart">Open quickstart</Translate>
            </button>
          </Link>
        </div>
      </div>
      <div className="col-span-12 grid gap-4 md:grid-cols-2 lg:col-span-7">
        {PROOF_ITEMS.map((item) => (
          <div
            key={item.titleId}
            className="rounded-xl border border-neutral-200 bg-white/80 p-5 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60"
          >
            <div className="mb-4 flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-neutral-800 text-yellow-500 dark:bg-neutral-900">
              {item.icon}
            </div>
            <h3 className="font-semibold text-neutral-700 dark:text-neutral-100">
              <Translate id={item.titleId}>{item.titleFallback}</Translate>
            </h3>
            <p className="mt-2 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
              <Translate id={item.descriptionId}>{item.descriptionFallback}</Translate>
            </p>
          </div>
        ))}
        {/* <div className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-5 md:col-span-2">
          <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
            <Translate id="proofHighlights.note">
              Public numbers and case studies will be useful later, but the first decision should be based on what you can
              inspect now: package code, docs, reference examples, and architecture. Start with one small model and check
              whether the runtime fits.
            </Translate>{' '}
            <Link to={SOCIAL_URLS.GITHUB_CORE} onClick={() => trackEvent('external_github_click', { location: 'proof_highlights_note' })}>
              <span className="font-semibold underline decoration-yellow-500 decoration-2">
                <Translate id="proofHighlights.github">Open the code.</Translate>
              </span>
            </Link>
          </p>
        </div> */}
      </div>
    </div>
  </SectionContainer>
);

export default ProofHighlights;
