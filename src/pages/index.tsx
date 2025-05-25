import type { FC } from 'react';
import React from 'react';
import classNames from 'classnames';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import Nav from '../components/Layouts/Nav/index';
import Footer from '../components/Layouts/Footer';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import ExampleApps from '../components/ExampleApps';
import Newsletter from '../components/Newsletter';
import Roadmap from '../components/Roadmap';
import Faq from '../components/Faq';

import './index.css';
import './preflight.css';

import styles from './styles.module.css';

import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const Background = () => {
  return (
    <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
      <span className={classNames(styles.leftLights, 'opacity-100')} />
    </div>
  );
};

const LightsTwo = () => (
  <div className="pointer-events-none absolute left-0 top-[1800px] h-full w-full overflow-hidden lg:top-[1000px]">
    <span className={classNames(styles.lightsTwo, 'opacity-100')} />
  </div>
);

const Index: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const imgUrl = useBaseUrl('/img/el_twitter_default.png');
  const coverPhotoAbsoluteUrl: string = `${siteConfig.url}${imgUrl}`;

  return (
    <div className="twLandingPage">
      <Head>
        <title>EasyLayer - Self-hosted Blockchain Tools</title>
        <meta
          name="description"
          content="EasyLayer provides self-hosted tools for integrating crypto processing and data indexing into your business. Built with TypeScript and NestJS."
        />
        <meta
          name="keywords"
          content="blockchain tools, self-hosted, TypeScript, blockchain processing, data indexing, NestJS, CQRS, Event Sourcing"
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://easylayer.io/" />
        <meta property="og:title" content="EasyLayer - Self-hosted Blockchain Tools" />
        <meta
          property="og:description"
          content="EasyLayer provides self-hosted tools for integrating crypto processing and data indexing into your business."
        />
        <meta property="og:image" content={coverPhotoAbsoluteUrl} />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://easylayer.io/" />
        <meta property="twitter:title" content="EasyLayer - Self-hosted Blockchain Tools" />
        <meta
          property="twitter:description"
          content="EasyLayer provides self-hosted tools for integrating crypto processing and data indexing into your business."
        />
        <meta property="twitter:image" content={coverPhotoAbsoluteUrl} />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'EasyLayer',
            url: 'https://easylayer.io',
            description: 'Self-hosted tools for integrating crypto processing and data indexing into your business',
            potentialAction: {
              '@type': 'SearchAction',
              target: 'https://easylayer.io/search?q={search_term_string}',
              'query-input': 'required name=search_term_string',
            },
          })}
        </script>
      </Head>
      <Nav />
      <div className="min-h-screen">
        <main>
          <Background />
          <div>
            <Hero />
            <Features />
            <HowItWorks />
            <ExampleApps />
            <LightsTwo />
            <Newsletter />
            <Roadmap />
            <Faq />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
