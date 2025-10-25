import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { BookOpen, Code } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';
import { SITE_URLS, DOCS_URLS } from '../urls';

const StartIcon: FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    opacity="0.5"
  >
    <polyline points="13 17 18 12 13 7" />
    <polyline points="6 17 11 12 6 7" />
  </svg>
);

const CodeHighlight = React.lazy(() => import('./CodeHighlight'));

const ActionButtons: FC = () => (
  <div className="flex items-center gap-2">
    <Link to={DOCS_URLS.BASE}>
      <button
        className={`
          inline-flex items-center space-x-2
          rounded border border-yellow-500
          bg-yellow-500 px-3 py-2 text-sm
          leading-4 text-white transition
          duration-200
          ease-out hover:border-yellow-400 hover:bg-yellow-400
        `}
      >
        <BookOpen size={16} />
        <span>Get Started</span>
      </button>
    </Link>

    <Link to={SITE_URLS.FEATURES}>
      <button
        className={`
          inline-flex items-center space-x-2
          rounded border border-neutral-500
          px-3 py-2
          text-sm leading-4
          text-neutral-700
          transition duration-200
          ease-out hover:border-neutral-400 hover:text-neutral-400
        `}
      >
        <Code size={16} />
        <span>See Features</span>
      </button>
    </Link>
  </div>
);

interface FileViewerProps {
  fileName: string;
  fileExplanation: string;
  children: React.ReactNode;
}

const FileViewer: FC<FileViewerProps> = ({ fileName, fileExplanation, children }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Editor header bar */}
      <div className="flex h-6 w-full items-center justify-between rounded-t-md bg-[#F3EDE0] px-2">
        <span
          className={`
              flex items-center space-x-1 text-sm text-neutral-500 transition
              duration-200 ease-out hover:text-neutral-400
            `}
        >
          <span>{fileName}</span>
          {/* <ArrowUpRight size={14} /> */}
          <span className="text-neutral-400">· {fileExplanation}</span>
        </span>
        <div className="flex space-x-2">
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
        </div>
      </div>
      {/* Editor body */}
      <div className="w-full rounded-b-md text-sm shadow-2xl">{children}</div>
    </div>
  );
};

const Hero: FC = () => {
  const codeSource = String.raw`import { bootstrap, compileStateModelBTC } from '@easylayer/bitcoin-crawler';

export const AddressUtxoWatcherModel = { // Ultra-minimal UTXO watcher for a specific wallet
  modelId: 'wallet-utxo-watcher',
  state: { wallets: new Set(['1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa']), utxos: new Map() }, // State keeps unspent outputs only
  sources: {
    async vout(ctx) { return { a: ctx.vout.scriptPubKey.addresses?.[0], k: \`\${ctx.tx.txid}:\${ctx.vout.n}\`, v: toSat(ctx.vout.value) }; },  // Called for every tx output. Marks potential UTXO.
    async vin(ctx) { return { k: \`\${ctx.vin.txid}:\${ctx.vin.vout}\` }; }, // Called for every tx input. Marks "spent" UTXO by key.
    async block(ctx) { ctx.applyEvent('Deposit', ctx.block.height, { o: ctx.locals.vout, i: ctx.locals.vin }); }, // One event per block: merges all vout + vin for this height
  },
  reducers: { // Reducer updates state on event "Deposit"
    Deposit(s, e) {
      const { o = [], i = [] } = e.payload || {};
      for (const x of o) (s.utxos.get(x.a) || s.utxos.set(x.a, new Map()).get(x.a)).set(x.k, x.v);
      for (const y of i)
        for (const [a, bag] of s.utxos)
          if (bag.delete(y.k) && !bag.size) s.utxos.delete(a);
    },
  },
};

const AddressUtxoWatcher = compileStateModelBTC(AddressUtxoWatcherModel); // Compile model into runnable indexer state machine
bootstrap({ Models: [AddressUtxoWatcher] }).catch(console.error); // Run the node.js blockchain indexer app
`;

  return (
    <SectionContainer className="pb-5 pt-24">
      <div className="lg:grid lg:grid-cols-12 lg:gap-16">
        <div className="z-10 space-y-12 lg:col-span-6">
          {/* Hero title and subtitle */}
          <div>
            <h1
              className={`
                text-4xl font-extrabold text-neutral-700
                lg:text-5xl lg:leading-tight
              `}
            >
              Build Your Own <span className="underline decoration-yellow-500">Blockchain Indexer</span> Using Our
              Framework
            </h1>
            <p className="mt-4 text-xl text-neutral-500 sm:mt-5 lg:text-xl">
              Install. Describe your model. Run your indexer in minutes.
              <br className="hidden sm:block" />
              <span className="font-medium">Self-hosted, cost-effective</span>, and feels like regular backend
              development.
            </p>
          </div>
          {/* EOF Hero title and subtitle */}
          <ActionButtons />
          <div className="flex flex-col gap-4">
            <small className="text-xs text-neutral-500">Works on</small>
            <div className="flex">
              <img
                className="h-8 pr-5 md:h-10 md:pr-10"
                src="img/lending/nodejs-logo.svg"
                alt="nodejs-logo-svg"
                loading="lazy"
              />
              <img
                className="h-8 pr-5 md:h-10 md:pr-10"
                src="img/lending/bitcoin.svg"
                alt="bitcoin-logo-svg"
                loading="lazy"
              />
              <img
                className="h-8 pr-5 md:h-10 md:pr-10"
                src="img/lending/ethereum.svg"
                alt="ethereum-logo-svg"
                loading="lazy"
              />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 lg:col-span-6 lg:mt-0">
          <FileViewer fileName="index.ts" fileExplanation="Your complete blockchain indexer">
            <CodeHighlight language="ts" source={codeSource} />
          </FileViewer>
        </div>
      </div>

      {/* video */}
      {/* <div className="flex justify-center mt-20">
        <div className="w-full lg:w-2/3 xl:w-3/5">
          <div
            className="relative w-full rounded-md shadow-lg"
            style={{ padding: '56.25% 0 0 0' }}
          >
            <iframe
              title="Demo video showcasing EasyLayer"
              className="absolute h-full w-full rounded-md"
              src="https://www.youtube-nocookie.com/embed/ID?playlist=ID&autoplay=0&loop=1&controls=0&showinfo=1&modestbranding=0&rel=0&disablekb=0&mute=1"
              style={{ top: 0, left: 0 }}
              frameBorder="0"
              allow="autoplay; modestbranding; encrypted-media"
            />
          </div>
        </div>
      </div> */}
    </SectionContainer>
  );
};

export default Hero;
