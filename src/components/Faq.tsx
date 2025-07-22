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
    question: 'Which blockchains are supported?',
    answer:
      'EasyLayer supports all Bitcoin-like chains (Bitcoin, Litecoin, Dogecoin, etc.) and every EVM-compatible network (Ethereum, Polygon, Arbitrum, Optimism, BSC, and more). You can plug in additional chains by adding a TypeScript adapter.',
  },
  {
    question: 'How many RPC calls does EasyLayer make per block?',
    answer:
      'Never more than two: one call to fetch the block itself and, when the chain exposes extra data, an optional call for supplementary information. This keeps traffic minimal and predictable for any provider you choose.',
  },
  {
    question: 'Can I track historical balances for a wallet or contract?',
    answer:
      'Yes. EasyLayer automatically keeps the full state history, so you can retrieve a balance - or any custom state - at **any** block height on demand.',
  },
  {
    question: 'How does EasyLayer handle chain reorganisations?',
    answer:
      'Reorgs are handled natively. If a fork occurs, the engine rolls back orphaned data and replays the new blocks automatically. There is no hard depth limit - your database always mirrors the canonical chain.',
  },
  {
    question: 'Do I need to run my own full node?',
    answer:
      'Not necessarily. You can point EasyLayer at any standard RPC provider such as Infura, Alchemy, QuickNode, or a self-hosted node. Terraform modules are available if you prefer to deploy your own infrastructure.',
  },
  {
    question: 'What technologies power EasyLayer?',
    answer:
      'Core components are written in Node.js (TypeScript). PostgreSQL is used for persistence, but SQLite is also supported for lightweight scenarios.',
  },
  {
    question: 'How do I create custom business models?',
    answer:
      'Simply write a TypeScript class that describes the events and state you care about - balances, invoices, liquidity pools, compliance flags, and so on. EasyLayer auto-generates storage and keeps the model in sync in real time.',
  },
  {
    question: 'What resources are required to run EasyLayer?',
    answer:
      'A small VM or container with 2 vCPUs, 4 GB RAM, and a PostgreSQL instance is typically enough. Deployment options include Docker, bare metal, AWS ECS, and AWS Lambda.',
  },
  {
    question: 'How does EasyLayer guarantee data consistency?',
    answer:
      'The platform uses an event-sourcing pattern: every state change is captured as an immutable event. This allows deterministic state reconstruction and ensures that application state always aligns with the blockchain.',
  },
  {
    question: 'Is EasyLayer suitable for compliance and reporting?',
    answer:
      'Yes. Full audit trails, point-in-time queries, and configurable retention policies make it ideal for AML5, MiCA, Travel Rule, and other regulatory requirements.',
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
