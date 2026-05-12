// src/pages/proof.tsx
import type { FC, ReactNode } from 'react';
import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate from '@docusaurus/Translate';
import { ArrowRight, Code, Database, GitHub, HardDrive, Monitor, RefreshCw, Server, Zap } from 'react-feather';
import Nav from '../components/Layouts/Nav/index';
import Footer from '../components/Layouts/Footer';
import SectionContainer from '../components/Layouts/SectionContainer';
import CodeHighlight from '../components/CodeHighlight';
import { DOCS_URLS, SITE_URLS, SOCIAL_URLS } from '../urls';
import { trackEvent } from '../lib/analytics';
import './index.css';
import './preflight.css';

interface CardProps {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}

const Card: FC<CardProps> = ({ icon, title, children }) => (
  <div className="rounded-xl border border-neutral-200 bg-white/80 p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/60">
    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-neutral-800 text-yellow-500 dark:bg-neutral-900">
      {icon}
    </div>
    <h3 className="mb-2 text-lg font-semibold text-neutral-700 dark:text-neutral-100">{title}</h3>
    <div className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">{children}</div>
  </div>
);

const FlowStep: FC<{ label: string; title: string; children: ReactNode }> = ({ label, title, children }) => (
  <div className="rounded-xl border border-yellow-500/25 bg-yellow-500/5 p-5">
    <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-yellow-600">{label}</p>
    <h3 className="mb-2 font-semibold text-neutral-700 dark:text-neutral-100">{title}</h3>
    <p className="text-sm leading-6 text-neutral-500 dark:text-neutral-400">{children}</p>
  </div>
);

const CODE = `// Your application stores the state it actually needs.
// EasyLayer feeds blocks into the model and persists the emitted events.

const ContractMonitor = {
  modelId: 'contract-monitor',
  state: { transfers: [] },
  sources: {
    async log(ctx) {
      if (ctx.log.address !== TARGET_CONTRACT) return;
      return { txHash: ctx.tx.hash, blockHeight: ctx.block.height };
    },
    async block(ctx) {
      if (!ctx.locals.log?.length) return;
      ctx.applyEvent('TransfersSeen', ctx.block.height, {
        transfers: ctx.locals.log,
      });
    },
  },
};`;

const ProofPage: FC = () => {
  const { siteConfig } = useDocusaurusContext();
  const title = 'EasyLayer Proof — Code, Architecture, and Runnable Evaluation Path';
  const description =
    'Evaluate EasyLayer through current code, docs, examples, custom state models, focused storage, and transport integration paths.';

  return (
    <div className="twLandingPage">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${siteConfig.url}${SITE_URLS.PROOF}`} />
      </Head>
      <Nav />
      <main className="min-h-screen">
        <SectionContainer className="pb-16 pt-24">
          <div className="mx-auto max-w-5xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
              <Translate id="proofPage.eyebrow">Technical proof path</Translate>
            </p>
            <h1 className="text-4xl font-extrabold leading-tight text-neutral-700 lg:text-6xl dark:text-neutral-100">
              <Translate id="proofPage.title">Prove the indexing model before you build on it</Translate>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-xl leading-8 text-neutral-500 dark:text-neutral-400">
              <Translate id="proofPage.subtitle">
                EasyLayer is useful when your product needs its own blockchain state service: custom models, focused
                storage, event history, reorg-aware architecture, and transports for server, desktop, and browser apps.
              </Translate>
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                to={DOCS_URLS.SECTIONS.QUICKSTART}
                onClick={() => trackEvent('proof_quickstart_click', { location: 'proof_hero' })}
              >
                <button className="inline-flex items-center rounded-lg border border-yellow-500 bg-yellow-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-yellow-400">
                  <Translate id="proofPage.cta.quickstart">Start with the quickstart</Translate>
                  <ArrowRight className="ml-2" size={15} />
                </button>
              </Link>
              <Link
                to={SOCIAL_URLS.GITHUB_CORE}
                onClick={() => trackEvent('proof_github_click', { location: 'proof_hero' })}
              >
                <button className="inline-flex items-center rounded-lg border border-neutral-400 px-5 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-600 dark:text-neutral-200">
                  <GitHub className="mr-2" size={17} />
                  <Translate id="proofPage.cta.github">Inspect the repositories</Translate>
                </button>
              </Link>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16">
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            <Card icon={<Code size={22} />} title="Custom state, not generic archives">
              Define the state your product needs: a smart-contract monitor, wallet activity feed, UTXO tracker, balance
              model, or fee monitor. The service persists your model events instead of forcing your app to store and
              filter a full blockchain copy.
            </Card>
            <Card icon={<HardDrive size={22} />} title="Focused storage footprint">
              If you only need one contract, a set of wallets, or a narrow business state, the application database
              should hold that state and its event history — not terabytes of unrelated chain data.
            </Card>
            <Card icon={<RefreshCw size={22} />} title="Reorg-aware architecture">
              EasyLayer is built around persisted events, rollback, and state restoration. The site should show this as
              an architecture capability and keep production guarantees tied to tested deployments.
            </Card>
            <Card icon={<Database size={22} />} title="EventStore as source of truth">
              Model changes are recorded as ordered events. That gives the service a replayable history for historical
              reads, recovery, and debugging instead of hidden in-memory state.
            </Card>
            <Card icon={<Monitor size={22} />} title="Transports for real apps">
              HTTP, WebSocket, IPC, Electron IPC, and browser/shared-worker paths make the same state service usable
              from backend services, desktop apps, browser extensions, and frontend clients.
            </Card>
            <Card icon={<Server size={22} />} title="Self-hosted control">
              Run the service on your infrastructure and choose your node/provider. EasyLayer is not a hosted black box;
              it is a framework for owning the runtime around your blockchain state.
            </Card>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-16">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-yellow-600">
                <Translate id="proofPage.flow.eyebrow">What to validate first</Translate>
              </p>
              <h2 className="mb-5 text-3xl font-bold text-neutral-700 dark:text-neutral-100">
                <Translate id="proofPage.flow.title">A practical evaluation path</Translate>
              </h2>
              <div className="space-y-4">
                <FlowStep label="Step 1" title="Run a package example">
                  Start with the current Bitcoin or EVM crawler docs. Confirm the service starts, persists events, and
                  can answer a query through a transport.
                </FlowStep>
                <FlowStep label="Step 2" title="Replace the generic model with your own state">
                  Pick one narrow product state. A single contract, a wallet set, or one business event stream is enough
                  to test the value of focused indexing.
                </FlowStep>
                <FlowStep label="Step 3" title="Check the integration surface">
                  Decide where the state must be consumed: backend service, WebSocket client, desktop app, browser
                  extension, or another process through IPC.
                </FlowStep>
              </div>
            </div>
            <div className="self-center rounded-xl shadow-2xl">
              <CodeHighlight language="typescript" source={CODE} />
            </div>
          </div>
        </SectionContainer>

        <SectionContainer className="pb-20">
          <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 dark:border-neutral-700 dark:bg-neutral-800/50">
            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <h2 className="mb-3 text-2xl font-bold text-neutral-700 dark:text-neutral-100">
                  <Translate id="proofPage.current.title">What is proven on the site today</Translate>
                </h2>
                <p className="leading-7 text-neutral-500 dark:text-neutral-400">
                  <Translate id="proofPage.current.description">
                    The current public proof is the codebase, package documentation, architecture explanations, and
                    reference examples. Benchmarks and case studies should be added only after they are measured and
                    reviewed, but the developer can already evaluate the runtime model and integration path.
                  </Translate>
                </p>
              </div>
              <div className="flex flex-col justify-center gap-3">
                <Link to={DOCS_URLS.SECTIONS.FIRST_CUSTOM_MODEL}>
                  <button className="w-full rounded-lg border border-yellow-500 bg-yellow-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-yellow-400">
                    Build first model
                  </button>
                </Link>
                <Link to={SITE_URLS.WHY}>
                  <button className="w-full rounded-lg border border-neutral-400 px-4 py-3 text-sm font-semibold text-neutral-700 transition hover:border-neutral-600 dark:text-neutral-200">
                    Check fit
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

export default ProofPage;
