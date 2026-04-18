// src/pages/index.tsx
import type { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import Nav from '../components/Layouts/Nav/index';
import Footer from '../components/Layouts/Footer';
import Hero from '../components/Hero/index';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import ExampleApps from '../components/ExampleApps';
import Newsletter from '../components/Newsletter';
import Roadmap from '../components/Roadmap';
import Faq from '../components/Faq';
import SectionContainer from '../components/Layouts/SectionContainer';
import styles from './styles.module.css';
import './index.css';
import './preflight.css';

const Background: FC = () => (
  <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
    <span className={classNames(styles.leftLights, 'opacity-100')} />
  </div>
);

const LightsTwo: FC = () => (
  <div className="pointer-events-none absolute left-0 top-[1800px] h-full w-full overflow-hidden lg:top-[1000px]">
    <span className={classNames(styles.lightsTwo, 'opacity-100')} />
  </div>
);

const EnterpriseBanner: FC = () => (
  <SectionContainer className="pb-16">
    <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 dark:bg-neutral-800/60 px-8 py-10 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-yellow-600 mb-3">For teams</p>
      <h2 className="text-2xl font-bold text-neutral-700 dark:text-neutral-100 mb-3">Building something big?</h2>
      <p className="text-neutral-500 dark:text-neutral-400 mb-6 max-w-xl mx-auto">
        Get managed infrastructure, SQL &amp; S3 read models, and direct support from the EasyLayer team.
      </p>
      <Link to="/enterprise">
        <button className="inline-flex items-center rounded border border-yellow-500 bg-yellow-500 px-6 py-2.5 text-sm font-medium text-white transition duration-200 ease-out hover:bg-yellow-400">
          Talk to us →
        </button>
      </Link>
    </div>
  </SectionContainer>
);

const Index: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const imgUrl = useBaseUrl('/img/el_twitter_default.png');
  const coverPhotoAbsoluteUrl = `${siteConfig.url}${imgUrl}`;
  return (
    <div className="twLandingPage">
      <Head>
        <title>EasyLayer — Self-hosted Blockchain Tools</title>
        <meta
          name="description"
          content="EasyLayer provides self-hosted tools for integrating crypto processing and data indexing into your business."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://easylayer.io/" />
        <meta property="og:title" content="EasyLayer — Self-hosted Blockchain Tools" />
        <meta
          property="og:description"
          content="EasyLayer provides self-hosted tools for integrating crypto processing and data indexing into your business."
        />
        <meta property="og:image" content={coverPhotoAbsoluteUrl} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content="EasyLayer — Self-hosted Blockchain Tools" />
        <meta property="twitter:image" content={coverPhotoAbsoluteUrl} />
      </Head>
      <Nav />
      <div className="min-h-screen">
        <main>
          <Background />
          <Hero />
          <Features />
          <HowItWorks />
          <ExampleApps />
          <LightsTwo />
          <Newsletter />
          <Roadmap />
          <Faq />
          <EnterpriseBanner />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
