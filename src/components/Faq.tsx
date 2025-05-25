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
    question: 'Which blockchains do our applications support?',
    answer:
      'Our out-of-the-box listeners include `bitcoin-state-listener` for the Bitcoin network and `evm-state-listener` for any EVM‑compatible chains (Ethereum, Polygon, Arbitrum, etc.). ' +
      'If you need another chain, just define its events and models and EasyLayer will handle the rest.',
  },
  {
    question: 'What is the tech stack and compatibility?',
    answer:
      'EasyLayer is built on Node.js with TypeScript and offers full JavaScript compatibility. ' +
      'You can implement your custom logic in either TypeScript or plain JavaScript without extra build configuration.',
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
