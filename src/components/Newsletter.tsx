// src/components/Newsletter.tsx
// Newsletter subscription section.

import type { FC } from 'react';
import React from 'react';
import Translate from '@docusaurus/Translate';
import SubscribeForm from './SubscribeForm';
import SectionContainer from './Layouts/SectionContainer';

const Newsletter: FC = () => (
  <SectionContainer id="subscribe">
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <div className="rounded-lg bg-yellow-500/25 px-6 py-6 md:p-12 lg:p-16 xl:flex xl:items-center">
          <div className="xl:w-0 xl:flex-1">
            <h2 className="text-2xl font-extrabold text-neutral-700 dark:text-neutral-100">
              <Translate id="newsletter.title">Stay up to date 📬</Translate>
            </h2>
            <p className="mt-3 text-lg leading-6 text-neutral-500 dark:text-neutral-400">
              <Translate id="newsletter.description">
                Subscribe to get timely updates on new releases, bug fixes, and all the latest EasyLayer news.
              </Translate>
            </p>
          </div>
          <div className="mt-8 sm:w-full sm:max-w-md xl:ml-8 xl:mt-0">
            <SubscribeForm inputBgColor="bg-[#f5f5f5]" />
          </div>
        </div>
      </div>
    </div>
  </SectionContainer>
);

export default Newsletter;
