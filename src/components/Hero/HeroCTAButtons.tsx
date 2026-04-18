// src/components/Hero/HeroCTAButtons.tsx
import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { BookOpen, Code } from 'react-feather';
import Translate from '@docusaurus/Translate';
import { DOCS_URLS, SITE_URLS } from '../../urls';

const HeroCTAButtons: FC = () => (
  <div className="flex items-center gap-2">
    <Link to={DOCS_URLS.BASE}>
      <button className="inline-flex items-center space-x-2 rounded border border-yellow-500 bg-yellow-500 px-3 py-2 text-sm leading-4 text-white transition duration-200 ease-out hover:border-yellow-400 hover:bg-yellow-400">
        <BookOpen size={16} />
        <span>
          <Translate id="hero.cta.getStarted">Get Started</Translate>
        </span>
      </button>
    </Link>
    <Link to={SITE_URLS.FEATURES}>
      <button className="inline-flex items-center space-x-2 rounded border border-neutral-500 px-3 py-2 text-sm leading-4 text-neutral-700 dark:text-neutral-300 transition duration-200 ease-out hover:border-neutral-400 hover:text-neutral-400">
        <Code size={16} />
        <span>
          <Translate id="hero.cta.seeFeatures">See Features</Translate>
        </span>
      </button>
    </Link>
  </div>
);

export default HeroCTAButtons;
