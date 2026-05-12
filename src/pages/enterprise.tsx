// src/pages/enterprise.tsx
import type { FC } from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Nav from '../components/Layouts/Nav/index';
import Footer from '../components/Layouts/Footer';
import EnterpriseHero from '../components/EnterpriseHero';
import EnterpriseFeatures from '../components/EnterpriseFeatures';
import EnterpriseForm from '../components/EnterpriseForm';
import './index.css';
import './preflight.css';

const EnterprisePage: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const pageTitle = 'EasyLayer Enterprise — Custom Blockchain State Infrastructure Support';
  const pageDescription =
    'Ask the EasyLayer team about custom state models, self-hosted deployment support, and blockchain indexing architecture help.';
  return (
    <div className="twLandingPage">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`${siteConfig.url}/enterprise`} />
      </Head>
      <Nav />
      <div className="min-h-screen">
        <main>
          <EnterpriseHero />
          <EnterpriseFeatures />
          <EnterpriseForm />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default EnterprisePage;
