import type { FC } from 'react';
import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { ChevronDown, ChevronRight } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import { SOCIAL_URLS } from '../urls';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    question: 'What blockchains are supported?',
    answer:
      "Currently Bitcoin Crawler supports Bitcoin and Bitcoin-like networks (Bitcoin Cash, Litecoin, Dogecoin). We're actively developing crawlers for EVM-compatible chains, Solana, and TON. Need a specific network? Contact us - we prioritize based on demand.",
  },
  {
    question: 'Do I need to run my own blockchain node?',
    answer:
      'No. Bitcoin Crawler makes just 2 RPC requests per block, so you can use external providers like QuickNode without exceeding free tiers. Running your own node is optional and only recommended for very high-volume operations or specific privacy requirements.',
  },
  {
    question: 'How much does it cost to run?',
    answer:
      'A lightweight server with 2-4 virtual CPUs is enough for most use cases. With our minimal request design (2 per block), external provider costs are negligible - often free. No monthly API subscriptions, no expensive infrastructure. You control the costs.',
  },
  {
    question: 'How do blockchain reorganizations work?',
    answer:
      'Automatically handled under the hood using Event Sourcing. When a reorg happens, the system rolls back events from orphaned blocks and replays the correct chain. Your state updates automatically - no manual intervention needed. You can optionally subscribe to reorg events for custom logic.',
  },
  {
    question: 'What data can I track with custom models?',
    answer:
      'Anything you need: wallet balances, UTXOs, transaction fees, specific addresses, payment monitoring, mempool activity. You describe what matters in your model - framework handles parsing, storage, and indexing. Store only relevant data, not the entire blockchain.',
  },
  {
    question: 'Can I query historical data at specific block heights?',
    answer:
      'Yes. Event Sourcing gives you complete history. Query any model state at any block height - see balances as they were at block 850000, replay events from any point, maintain complete audit trails for compliance.',
  },
  {
    question: 'How do I access the data from my application?',
    answer:
      'Built-in Transport APIs work out of the box: HTTP for simple queries, WebSocket for real-time event streams, IPC for Node.js microservices. Use @easylayer/transport-sdk for easy client integration. No need to build custom APIs.',
  },
  {
    question: 'What about mempool monitoring?',
    answer:
      'Mempool monitoring is optional (disabled by default). Enable it to track unconfirmed transactions, detect pending payments, analyze fee markets, or spot double-spend attempts. Note: mempool monitoring significantly increases request volume.',
  },
  {
    question: 'Which database should I use - SQLite or PostgreSQL?',
    answer:
      'SQLite for development, testing, and small projects (< 1M events). PostgreSQL for production and larger datasets. IndexedDB available for browser environments. Framework manages schema automatically - you just configure connection.',
  },
  {
    question: 'Is this suitable for production applications?',
    answer:
      'Absolutely. Event Sourcing provides complete audit trails, automatic reorg handling ensures data consistency, and self-hosted deployment gives you full control. Already used by payment processors, wallets, and analytics platforms. Perfect for compliance and financial applications.',
  },
];

interface FaqItemProps {
  faq: FAQItem;
  index: number;
}

const FaqItem: FC<FaqItemProps> = ({ faq, index }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="py-6">
      <dt className="text-base text-neutral-700">
        <button
          className="flex w-full items-center justify-between text-left"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <span>{faq.question}</span>
          <div className="ml-6 text-yellow-500">
            {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </div>
        </button>
      </dt>
      {isExpanded && <dd className="mt-2 text-neutral-500">{faq.answer}</dd>}
    </div>
  );
};

const Faq: FC = () => {
  return (
    <SectionContainer className="space-y-16" id="faq">
      <div className="grid grid-cols-12" id="faq">
        <div className="col-span-12 text-center">
          <h2 className="mb-4 text-xl text-neutral-700 lg:text-2xl">Frequently asked questions</h2>
          <p className="text-neutral-500">
            For anything not covered here, join&nbsp;
            <a href={SOCIAL_URLS.DISCUSSIONS} className="font-medium underline decoration-yellow-500 decoration-2">
              our Forum
            </a>
            !
          </p>
        </div>
      </div>

      <dl className="mx-auto mt-6 max-w-3xl divide-y divide-neutral-300">
        {faqs.map((faq, idx) => (
          <FaqItem key={idx} index={idx} faq={faq} />
        ))}
      </dl>
    </SectionContainer>
  );
};

export default Faq;
