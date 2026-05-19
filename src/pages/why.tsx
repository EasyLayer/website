// src/pages/why.tsx
import type { FC, ReactNode } from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import { ArrowRight, CheckCircle, Database, HardDrive, Monitor, Sliders, XCircle, Zap } from 'react-feather';
import Nav from '../components/Layouts/Nav/index';
import Footer from '../components/Layouts/Footer';
import SectionContainer from '../components/Layouts/SectionContainer';
import { DOCS_URLS, SITE_URLS } from '../urls';
import { trackEvent } from '../lib/analytics';
import './index.css';
import './preflight.css';

interface FitCardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

const FitCard: FC<FitCardProps> = ({ icon, title, children }) => (
  <div className="rounded-xl border border-yellow-500/25 bg-yellow-500/5 p-6">
    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-800 text-yellow-500 dark:bg-neutral-900">
      {icon}
    </div>
    <h3 className="mb-2 font-semibold text-neutral-700 dark:text-neutral-100">{title}</h3>
    <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">{children}</p>
  </div>
);

const Scenario: FC<{ title: string; good: boolean; children: ReactNode }> = ({ title, good, children }) => (
  <div className="rounded-xl border border-neutral-200 bg-white/80 p-5 dark:border-neutral-700 dark:bg-neutral-800/60">
    <div className="mb-3 flex items-center gap-2">
      {good ? (
        <CheckCircle className="text-yellow-600" size={20} />
      ) : (
        <XCircle className="text-neutral-500" size={20} />
      )}
      <h3 className="font-semibold text-neutral-700 dark:text-neutral-100">{title}</h3>
    </div>
    <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">{children}</p>
  </div>
);

const WhyPage: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const title = 'Why EasyLayer — Custom Blockchain State Without Storing Everything';
  const description =
    'Use EasyLayer when your product needs focused blockchain state, self-hosted control, event history, and transport integration without building the whole indexing stack.';

  return (
    <div className="twLandingPage">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteConfig.url}${SITE_URLS.WHY}`} />
      </Head>
      <Nav />
      <main className="min-h-screen">
        <SectionContainer className="pb-16 pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
              <Translate id="whyPage.eyebrow">When EasyLayer makes sense</Translate>
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-neutral-700 lg:text-6xl dark:text-neutral-100">
              <Translate id="whyPage.title">
                Use EasyLayer when you need your own blockchain state, not another full dataset
              </Translate>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-neutral-500 dark:text-neutral-400">
              <Translate id="whyPage.subtitle">
                EasyLayer helps you run a focused state service: track the contracts, wallets, events, or UTXOs that
                matter to your product, persist the state changes, and expose them through transports your application
                can use.
              </Translate>
            </p>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <FitCard icon={<Sliders size={21} />} title="Custom state is the product">
              Your application needs a state model you control: a contract monitor, wallet activity feed, balance
              tracker, UTXO view, or protocol-specific state.
            </FitCard>
            <FitCard icon={<HardDrive size={21} />} title="You do not want to store everything">
              If one contract or wallet set matters, your app should not need to archive and query unrelated chain data
              just to answer product-specific questions.
            </FitCard>
            <FitCard icon={<Monitor size={21} />} title="The state must integrate anywhere">
              Use transports for backend services, WebSocket clients, Node IPC, Electron desktop apps, or browser/shared
              worker environments.
            </FitCard>
            <FitCard icon={<Database size={21} />} title="You want replayable state changes">
              EventStore gives the model an ordered history so the service can support recovery, historical reads, and
              reorg-aware workflows.
            </FitCard>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white/80 p-7 dark:border-neutral-700 dark:bg-neutral-800/60">
              <h2 className="mb-5 text-2xl font-bold text-neutral-700 dark:text-neutral-100">
                <Translate id="whyPage.goodFit.title">Good fit</Translate>
              </h2>
              <div className="space-y-4">
                <Scenario good title="Smart-contract or protocol monitoring">
                  You need to watch a narrow set of on-chain events and maintain your own business state instead of
                  storing a full explorer-style dataset.
                </Scenario>
                <Scenario good title="Desktop or browser-integrated apps">
                  Your app needs blockchain state inside Electron, browser extensions, or frontend-adjacent runtime
                  flows, not only a backend HTTP API.
                </Scenario>
                <Scenario good title="Self-hosted indexing infrastructure">
                  You want control over the node/provider, database, runtime, and schema, but you do not want to build
                  EventStore, reorg handling, transports, and model wiring from zero.
                </Scenario>
              </div>
            </div>
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 dark:border-neutral-700 dark:bg-neutral-900/40">
              <h2 className="mb-5 text-2xl font-bold text-neutral-700 dark:text-neutral-100">
                <Translate id="whyPage.notFit.title">Not the best first step</Translate>
              </h2>
              <div className="space-y-4">
                <Scenario good={false} title="You only need one generic hosted lookup">
                  A managed blockchain API can be faster if the product only needs a balance, transaction, or token
                  lookup and does not need to own the state model.
                </Scenario>
                <Scenario good={false} title="You need a managed SaaS with SLA today">
                  EasyLayer is currently best evaluated as self-hosted infrastructure and custom support, not as a
                  finished managed cloud product.
                </Scenario>
                <Scenario good={false} title="Your required chain/runtime is not supported yet">
                  Validate the package and transport support before committing. Unsupported networks should be treated
                  as custom work or future roadmap, not current capability.
                </Scenario>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16">
          <h2 className="mb-6 text-2xl font-bold text-neutral-700 dark:text-neutral-100">
            <Translate id="whyPage.compare.title">How to compare your options</Translate>
          </h2>
          <div className="overflow-x-auto rounded-xl border border-neutral-200 bg-white/80 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-100">
                <tr>
                  <th className="p-4">Option</th>
                  <th className="p-4">Best when</th>
                  <th className="p-4">What you give up</th>
                  <th className="p-4">Storage/runtime shape</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200 text-neutral-500 dark:divide-neutral-700 dark:text-neutral-400">
                <tr>
                  <td className="p-4 font-medium text-neutral-700 dark:text-neutral-100">Hosted blockchain APIs</td>
                  <td className="p-4">You need common data quickly.</td>
                  <td className="p-4">Less control over schema, replay, runtime behavior, and long-term dependency.</td>
                  <td className="p-4">Provider-owned infrastructure and generic datasets.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-neutral-700 dark:text-neutral-100">Build internally</td>
                  <td className="p-4">Your team has time to own the full indexing stack.</td>
                  <td className="p-4">
                    You must implement persistence, reorg handling, transports, replay, tests, and ops.
                  </td>
                  <td className="p-4">Whatever your team designs and maintains.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-neutral-700 dark:text-neutral-100">Generic indexers</td>
                  <td className="p-4">You want a broad query layer or ecosystem-specific indexing model.</td>
                  <td className="p-4">
                    May not match custom runtime, desktop/browser integration, or focused state ownership.
                  </td>
                  <td className="p-4">Often broader data first, product state second.</td>
                </tr>
                <tr>
                  <td className="p-4 font-medium text-neutral-700 dark:text-neutral-100">EasyLayer</td>
                  <td className="p-4">You need focused custom state and self-hosted control.</td>
                  <td className="p-4">
                    You still operate the service and must validate the package fit for your workload.
                  </td>
                  <td className="p-4">
                    Persist your model state/events; avoid storing unrelated chain data in the app DB.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-20">
          <div className="rounded-2xl border border-yellow-500/25 bg-yellow-500/10 p-8">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <div className="mb-3 flex items-center gap-2 text-yellow-700">
                  <Zap size={20} />
                  <span className="text-xs font-semibold uppercase tracking-widest">Next step</span>
                </div>
                <h2 className="mb-3 text-2xl font-bold text-neutral-700 dark:text-neutral-100">
                  <Translate id="whyPage.next.title">Validate one narrow state model first</Translate>
                </h2>
                <p className="leading-7 text-neutral-500 dark:text-neutral-400">
                  <Translate id="whyPage.next.description">
                    Choose one contract, wallet set, or event stream. If EasyLayer can maintain that state with the
                    storage footprint and integration path you need, then expand the model or ask for custom deployment
                    help.
                  </Translate>
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <Link to={DOCS_URLS.SECTIONS.QUICKSTART} onClick={() => trackEvent('why_quickstart_click')}>
                  <button className="w-full rounded-lg border border-yellow-500 bg-yellow-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-yellow-400">
                    <Translate id="whyPage.cta.quickstart">Run quickstart</Translate>
                    <ArrowRight className="ml-2 inline" size={14} />
                  </button>
                </Link>
                <Link to={SITE_URLS.PROOF} onClick={() => trackEvent('why_proof_click')}>
                  <button className="w-full rounded-lg border border-neutral-400 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-600 dark:text-neutral-200">
                    <Translate id="whyPage.cta.proof">Review proof path</Translate>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </SectionContainer>
      </main>
      <Footer />
    </div>
  );
};

export default WhyPage;
