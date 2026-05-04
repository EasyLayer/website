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
      'EasyLayer is a framework for building real-time blockchain state services. You define what on-chain data to track, and the framework keeps that state live and consistent on every new block, with automatic reorganization handling built in. It is also self-hosted: the service runs on your infrastructure, your data never leaves your servers. The open-source Write Model handles real-time state, mempool monitoring, and Event Sourcing with full history. For teams that need to store very large datasets like entire chain history or all wallet addresses, the enterprise Read Model builds SQL or S3 projections on top of the same event stream with no size limits. The Graph and SQD are cloud indexing platforms focused on querying public protocol data through a GraphQL schema. EasyLayer is different in focus: real-time state maintenance with automatic reorg handling, self-hosted, and working with both Bitcoin and EVM chains natively.',
  },
  {
    questionId: 'faq.q00.question',
    questionFallback: 'What does "blockchain state service" mean in practice?',
    answerId: 'faq.q00.answer',
    answerFallback:
      'You tell the framework what on-chain data matters to your application: wallet balances, contract events, UTXOs, fee statistics, anything. It reads every block, updates that state in real time, and keeps it consistent through chain reorganizations automatically. Your application queries the current state or subscribes to live updates over HTTP, WebSocket, or IPC. No polling, no stale data, no manual reorg handling.',
  },
  {
    questionId: 'faq.q1.question',
    questionFallback: 'What blockchains are supported?',
    answerId: 'faq.q1.answer',
    answerFallback:
      'Bitcoin Crawler supports Bitcoin and Bitcoin-compatible networks: Bitcoin Cash, Litecoin, Dogecoin, and others. EVM Crawler supports Ethereum and EVM-compatible networks: BSC, Polygon, Arbitrum, Optimism, and other L2s. Solana, TON, and Tron crawlers are in development. Need a specific network? Open a discussion on GitHub.',
  },
  {
    questionId: 'faq.q4.question',
    questionFallback: 'How does reorganization handling work?',
    answerId: 'faq.q4.answer',
    answerFallback:
      'Reorgs are handled automatically through Event Sourcing. Every state change is stored as an immutable event with its block height. When a reorg occurs, the framework rolls back events from orphaned blocks in reverse order and replays the correct chain. Your state is consistent again without any code from you, regardless of how long the reorg is.',
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
      'No. Bitcoin Crawler uses 2 RPC calls per block, so free tiers on providers like QuickNode cover most use cases. Running your own node is optional and only worth it at very high volumes or for specific privacy requirements.',
  },
  {
    questionId: 'faq.q3.question',
    questionFallback: 'How much does it cost to run?',
    answerId: 'faq.q3.answer',
    answerFallback:
      'A 2-4 vCPU server covers most production workloads. With the minimal RPC design, external provider costs are often zero on free tiers. Total cost for a typical deployment runs from free up to around $20 per month for server and provider combined.',
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
      'Yes. The framework ships browser-safe bundles with IndexedDB as the storage backend. You can run a full blockchain state service inside an Electron desktop app or a browser extension with no server required.',
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
      'Both Bitcoin Crawler and EVM Crawler are in stable beta. The automatic reorg handling and Event Sourcing architecture are core to the design, not afterthoughts. If you run into issues, bring them to GitHub Discussions.',
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
