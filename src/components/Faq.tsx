// src/components/Faq.tsx
// Frequently asked questions accordion section.

import type { FC } from 'react';
import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import { ChevronDown, ChevronRight } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import { SOCIAL_URLS } from '../urls';

interface FAQItem {
  questionId: string;
  questionFallback: string;
  answerId: string;
  answerFallback: string;
}

const FAQS: FAQItem[] = [
  {
    questionId: 'faq.q0.question',
    questionFallback: 'What is EasyLayer and how is it different from The Graph or SQD?',
    answerId: 'faq.q0.answer',
    answerFallback:
      'EasyLayer is a self-hosted framework for building blockchain state services and custom indexers. You define the state model your product needs, then run the service on your infrastructure. It is a better fit when you need custom state, event history, reorg-aware workflows, and runtime control. Hosted APIs or managed indexing platforms may be a better fit when you only need simple generic data quickly.',
  },
  {
    questionId: 'faq.q00.question',
    questionFallback: 'What does "blockchain state service" mean in practice?',
    answerId: 'faq.q00.answer',
    answerFallback:
      'You tell the framework what on-chain data matters to your application: wallet balances, contract events, UTXOs, fee statistics, or another state shape. The crawler feeds chain data into your model, persists state changes as events, and lets your application query state or subscribe to updates through supported transports.',
  },
  {
    questionId: 'faq.q1.question',
    questionFallback: 'What blockchains are supported?',
    answerId: 'faq.q1.answer',
    answerFallback:
      'Current public packages focus on Bitcoin/Bitcoin-like networks and EVM-compatible networks. Check the package docs and examples for the exact supported crawler version and runtime you plan to use.',
  },
  {
    questionId: 'faq.q4.question',
    questionFallback: 'How does reorganization handling work?',
    answerId: 'faq.q4.answer',
    answerFallback:
      'EasyLayer is designed around Event Sourcing, rollback, and state restoration. State changes are stored with block context, so the framework can restore models when the canonical chain changes. The exact behavior depends on the crawler/runtime version and should be validated for your deployment.',
  },
  {
    questionId: 'faq.q6.question',
    questionFallback: 'Can I query state at a past block height?',
    answerId: 'faq.q6.answer',
    answerFallback:
      'Yes. Because every change is stored as an ordered event log, you can reconstruct what the state looked like at any block in the past. Query balances as they were at block 850000, replay events from any point, or build audit trails for compliance. This is part of the core architecture, not an add-on.',
  },
  {
    questionId: 'faq.q2.question',
    questionFallback: 'Do I need to run my own blockchain node?',
    answerId: 'faq.q2.answer',
    answerFallback:
      'No. You can use supported external providers or your own node, depending on your chain, privacy needs, and expected workload. Validate provider limits before relying on a free tier for production.',
  },
  {
    questionId: 'faq.q3.question',
    questionFallback: 'How much does it cost to run?',
    answerId: 'faq.q3.answer',
    answerFallback:
      'Cost depends on chain, block range, provider limits, model complexity, storage backend, and traffic. The site should publish exact benchmark or cost numbers only after they are measured for a documented setup.',
  },
  {
    questionId: 'faq.q5.question',
    questionFallback: 'What data can I track?',
    answerId: 'faq.q5.answer',
    answerFallback:
      'Anything on-chain: wallet balances, UTXOs, transaction fees, specific address activity, contract events, token transfers, mempool state. You define the state shape in your model. The framework handles fetching, parsing, storage, and keeping it current.',
  },
  {
    questionId: 'faq.q_browser.question',
    questionFallback: 'Can I use EasyLayer in a browser or desktop app?',
    answerId: 'faq.q_browser.answer',
    answerFallback:
      'Some packages include browser or desktop-oriented transport/storage paths, such as Electron IPC and browser/shared-worker clients. Use the package docs and tests to confirm whether your exact runtime is supported before committing to that architecture.',
  },
  {
    questionId: 'faq.q8.question',
    questionFallback: 'What about mempool monitoring?',
    answerId: 'faq.q8.answer',
    answerFallback:
      'Mempool monitoring is optional and disabled by default. Enable it to track unconfirmed transactions in real time before they land in blocks. Useful for payment detection, fee market analysis, or double-spend monitoring.',
  },
  {
    questionId: 'faq.q7.question',
    questionFallback: 'How does my application read the data?',
    answerId: 'faq.q7.answer',
    answerFallback:
      'Five built-in transports: HTTP for queries, WebSocket for real-time event streams, IPC for Node.js process communication, Electron IPC for desktop apps, and SharedWorker for browser environments. Use @easylayer/transport-sdk for a unified client API across all of them.',
  },
  {
    questionId: 'faq.q9.question',
    questionFallback: 'Which database should I use?',
    answerId: 'faq.q9.answer',
    answerFallback:
      'SQLite for development and small projects. PostgreSQL for production and larger datasets. IndexedDB for browser and Electron environments. The framework manages the schema automatically in all cases.',
  },
  {
    questionId: 'faq.q10.question',
    questionFallback: 'Is this ready for production?',
    answerId: 'faq.q10.answer',
    answerFallback:
      'EasyLayer is actively developed. The architecture is built around Event Sourcing and reorg-aware workflows, but teams should validate the current package versions against their use case before treating them as production infrastructure. If you run into issues, bring them to GitHub Discussions.',
  },
];

interface FaqItemProps {
  faq: FAQItem;
}

const FaqItem: FC<FaqItemProps> = ({ faq }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="py-6">
      <dt className="text-base text-neutral-700 dark:text-neutral-200">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
        >
          <span>
            <Translate id={faq.questionId}>{faq.questionFallback}</Translate>
          </span>
          <div className="ml-6 text-yellow-500">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </button>
      </dt>
      {isExpanded && (
        <dd className="mt-2 text-neutral-500 dark:text-neutral-400">
          <Translate id={faq.answerId}>{faq.answerFallback}</Translate>
        </dd>
      )}
    </div>
  );
};

const Faq: FC = () => (
  <SectionContainer className="space-y-16" id="faq">
    <div className="grid grid-cols-12">
      <div className="col-span-12 text-center">
        <h2 className="mb-4 text-xl text-neutral-700 dark:text-neutral-100 lg:text-2xl">
          <Translate id="faq.title">Frequently asked questions</Translate>
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400">
          <Translate id="faq.subtitle">For anything not covered here, join</Translate>{' '}
          <a href={SOCIAL_URLS.DISCUSSIONS} className="font-medium underline decoration-yellow-500 decoration-2">
            <Translate id="faq.forum">our Forum</Translate>
          </a>
          !
        </p>
      </div>
    </div>

    <dl className="mx-auto mt-6 max-w-3xl divide-y divide-neutral-300 dark:divide-neutral-700">
      {FAQS.map((faq) => (
        <FaqItem key={faq.questionId} faq={faq} />
      ))}
    </dl>
  </SectionContainer>
);

export default Faq;
