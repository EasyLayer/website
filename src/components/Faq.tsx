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
    questionId: 'faq.q1.question',
    questionFallback: 'What blockchains are supported?',
    answerId: 'faq.q1.answer',
    answerFallback:
      "Currently Bitcoin Crawler supports Bitcoin and Bitcoin-like networks (Bitcoin Cash, Litecoin, Dogecoin). We're actively developing crawlers for EVM-compatible chains, Solana, and TON. Need a specific network? Contact us — we prioritize based on demand.",
  },
  {
    questionId: 'faq.q2.question',
    questionFallback: 'Do I need to run my own blockchain node?',
    answerId: 'faq.q2.answer',
    answerFallback:
      'No. Bitcoin Crawler makes just 2 RPC requests per block, so you can use external providers like QuickNode without exceeding free tiers. Running your own node is optional and only recommended for very high-volume operations or specific privacy requirements.',
  },
  {
    questionId: 'faq.q3.question',
    questionFallback: 'How much does it cost to run?',
    answerId: 'faq.q3.answer',
    answerFallback:
      'A lightweight server with 2-4 virtual CPUs is enough for most use cases. With our minimal request design (2 per block), external provider costs are negligible — often free. No monthly API subscriptions, no expensive infrastructure. You control the costs.',
  },
  {
    questionId: 'faq.q4.question',
    questionFallback: 'How do blockchain reorganizations work?',
    answerId: 'faq.q4.answer',
    answerFallback:
      'Automatically handled under the hood using Event Sourcing. When a reorg happens, the system rolls back events from orphaned blocks and replays the correct chain. Your state updates automatically — no manual intervention needed.',
  },
  {
    questionId: 'faq.q5.question',
    questionFallback: 'What data can I track with custom models?',
    answerId: 'faq.q5.answer',
    answerFallback:
      'Anything you need: wallet balances, UTXOs, transaction fees, specific addresses, payment monitoring, mempool activity. You describe what matters in your model — framework handles parsing, storage, and indexing.',
  },
  {
    questionId: 'faq.q6.question',
    questionFallback: 'Can I query historical data at specific block heights?',
    answerId: 'faq.q6.answer',
    answerFallback:
      'Yes. Event Sourcing gives you complete history. Query any model state at any block height — see balances as they were at block 850000, replay events from any point, maintain complete audit trails for compliance.',
  },
  {
    questionId: 'faq.q7.question',
    questionFallback: 'How do I access the data from my application?',
    answerId: 'faq.q7.answer',
    answerFallback:
      'Built-in Transport APIs work out of the box: HTTP for simple queries, WebSocket for real-time event streams, IPC for Node.js microservices. Use @easylayer/transport-sdk for easy client integration.',
  },
  {
    questionId: 'faq.q8.question',
    questionFallback: 'What about mempool monitoring?',
    answerId: 'faq.q8.answer',
    answerFallback:
      'Mempool monitoring is optional (disabled by default). Enable it to track unconfirmed transactions, detect pending payments, analyze fee markets, or spot double-spend attempts.',
  },
  {
    questionId: 'faq.q9.question',
    questionFallback: 'Which database should I use — SQLite or PostgreSQL?',
    answerId: 'faq.q9.answer',
    answerFallback:
      'SQLite for development, testing, and small projects (< 1M events). PostgreSQL for production and larger datasets. IndexedDB available for browser environments. Framework manages schema automatically.',
  },
  {
    questionId: 'faq.q10.question',
    questionFallback: 'Is this suitable for production applications?',
    answerId: 'faq.q10.answer',
    answerFallback:
      'Absolutely. Event Sourcing provides complete audit trails, automatic reorg handling ensures data consistency, and self-hosted deployment gives you full control. Already used by payment processors, wallets, and analytics platforms.',
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
