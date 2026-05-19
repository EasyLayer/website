// src/components/Hero/HeroCTAButtons.tsx
import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { BookOpen, Code, GitHub } from 'react-feather';
import Translate from '@docusaurus/Translate';
import { DOCS_URLS, SITE_URLS, SOCIAL_URLS } from '../../urls';
import { trackEvent } from '../../lib/analytics';

const HeroCTAButtons: FC = () => (
  <div className="flex flex-wrap items-center gap-2">
    <Link to={DOCS_URLS.SECTIONS.QUICKSTART} onClick={() => trackEvent('hero_get_started_click')}>
      <button className="inline-flex items-center space-x-2 rounded border border-yellow-500 bg-yellow-500 px-3 py-2 text-sm leading-4 text-white transition duration-200 ease-out hover:border-yellow-400 hover:bg-yellow-400">
        <BookOpen size={16} />
        <span>
          <Translate id="hero.cta.getStarted">Run quickstart</Translate>
        </span>
      </button>
    </Link>
    <Link to={SITE_URLS.PROOF} onClick={() => trackEvent('hero_proof_click', { location: 'hero' })}>
      <button className="inline-flex items-center space-x-2 rounded border border-neutral-500 px-3 py-2 text-sm leading-4 text-neutral-700 transition duration-200 ease-out hover:border-neutral-400 hover:text-neutral-400 dark:text-neutral-300">
        <Code size={16} />
        <span>
          <Translate id="hero.cta.seeProof">See proof</Translate>
        </span>
      </button>
    </Link>
    <Link to={SOCIAL_URLS.GITHUB_CORE} onClick={() => trackEvent('hero_github_click')}>
      <button className="inline-flex items-center space-x-2 rounded border border-neutral-500 px-3 py-2 text-sm leading-4 text-neutral-700 transition duration-200 ease-out hover:border-neutral-400 hover:text-neutral-400 dark:text-neutral-300">
        <GitHub size={16} />
        <span>
          <Translate id="hero.cta.github">GitHub</Translate>
        </span>
      </button>
    </Link>
  </div>
);

export default HeroCTAButtons;
