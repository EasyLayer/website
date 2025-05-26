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
      'EasyLayer currently supports Bitcoin and all EVM-compatible chains (Ethereum, Polygon, Arbitrum, etc.) out of the box. ' +
      'The framework is designed to be chain-agnostic - you can add support for any blockchain by defining its events and state models.',
  },
  {
    question: 'What technologies does EasyLayer use?',
    answer:
      'EasyLayer is built with Node.js and TypeScript, but you can use it with any JavaScript code. ' +
      'No complex setup required - just install the package and start building your blockchain application.',
  },
  {
    question: 'How does EasyLayer handle blockchain data synchronization?',
    answer:
      'EasyLayer automatically handles blockchain data synchronization through its event-driven architecture. ' +
      'It tracks all relevant transactions, maintains state consistency, and provides real-time updates through the Transport layer. ' +
      'You can also replay historical events from any block height for auditing or recovery purposes.',
  },
  {
    question: 'What storage options are available for event persistence?',
    answer:
      'EasyLayer supports PostgreSQL and SQLite as event stores out of the box. ' +
      'The event store is used to persist all domain events, allowing you to rebuild your state at any point in time and maintain full transaction history.',
  },
  {
    question: 'How can I monitor specific blockchain events or states?',
    answer:
      'You can monitor any blockchain events by defining your domain model and event handlers. ' +
      'For example, to track a wallet balance, you just need to define the state model - EasyLayer will automatically handle and real-time updates.',
  },
  {
    question: 'Is EasyLayer suitable for production use?',
    answer:
      'EasyLayer is currently in active development with a focus on stability and production readiness. ' +
      "We're continuously testing and improving our core components (@bitcoin-crawler and @evm-crawler) to ensure reliable performance in production environments.",
  },
  {
    question: 'How does EasyLayer ensure data consistency?',
    answer:
      'EasyLayer uses an event-sourcing pattern to maintain data consistency. ' +
      'All state changes are captured as events, which are persisted in the event store. ' +
      'This allows for deterministic state reconstruction and ensures that your application state is always consistent with the blockchain.',
  },
  {
    question: 'Can I use my own blockchain node with EasyLayer?',
    answer:
      'Yes, you can use your own blockchain node or any compatible provider. ' +
      'EasyLayer is designed to work with both self-hosted nodes and third-party providers, giving you flexibility in how you connect to the blockchain.',
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
