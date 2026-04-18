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
  const pageTitle = 'EasyLayer Enterprise — Managed Blockchain Infrastructure';
  const pageDescription =
    'Get managed deployment, SQL read models, S3 pipelines, and priority support for your blockchain data needs.';
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
