import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { Terminal, ArrowUpRight, Play, BookOpen, Grid, Layout, Trello, Code } from 'react-feather';
import CodeHighlight from './CodeHighlight';
import SectionContainer from './Layouts/SectionContainer';
import { SOCIAL_URLS, DOCS_URLS } from '../urls';

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

    <Link to={SOCIAL_URLS.GITHUB}>
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
        <span>GitHub</span>
      </button>
    </Link>
  </div>
);

interface FileViewerProps {
  fileName: string;
  fileExplanation: string;
  link: string;
  children: React.ReactNode;
}

const FileViewer: FC<FileViewerProps> = ({ fileName, fileExplanation, link, children }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      {/* Editor header bar */}
      <div className="flex h-6 w-full items-center justify-between rounded-t-md bg-[#F3EDE0] px-2">
        <Link to={link}>
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
        </Link>
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
  const modelSource = `import { BasicEvent, EventBasePayload, Model, Block } from '@easylayer/bitcoin-crawler';

export class CustomEvent<T extends EventBasePayload> extends BasicEvent<T> {}; // Define your custom event

export default class CustomModel extends Model { // Create your model
    constructor() {
      super('uniq-model-id'); // This ID will be used to fetch events and state
    }

    public async parseBlock({ block }: { block: Block }) {} // Maps custom events from block - user defines which data they need
    private onCustomEvent({ payload }: CustomEvent) {} // Updates model state when custom event occurs
}
`;

  const bootstrapSource = `import { bootstrap } from '@easylayer/bitcoin-crawler';
import Model from './model.ts';

bootstrap({
  Models: [Model],
  rpc: true,
  ws: true
}).catch(error => console.error(error));
`;

  const clientSource = `import { bootstrap } from '@easylayer/bitcoin-crawler';

bootstrap({
  Models: [Model],
  rpc: true,
  ws: true
});
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
              {/** Powerful Solutions for Crypto Networks Processing */}
              {/** Next‑Level Blockchain Network Monitoring */}
              {/** Powerful Monitoring & Auditing for Crypto Networks */}
              Real-Time & Historical <span className="underline decoration-yellow-500">Blockchain</span> Data with
              Custom State Modeling
            </h1>
            <p className="mt-4 text-xl text-neutral-500 sm:mt-5 lg:text-xl">
              Run EasyLayer self-hosted apps, build custom state models, and stream both historical and real-time
              blockchain events into your own systems
            </p>
          </div>
          {/* EOF Hero title and subtitle */}
          <ActionButtons />
          <div className="flex flex-col gap-4">
            <small className="text-xs text-neutral-500">Works on</small>
            <div className="flex">
              <img className="h-8 pr-5 md:h-10 md:pr-10" src="img/lending/nodejs-logo.svg" alt="nodejs-logo-svg" />
              <img className="h-8 pr-5 md:h-10 md:pr-10" src="img/lending/bitcoin.svg" alt="bitcoin-logo-svg" />
              <img className="h-8 pr-5 md:h-10 md:pr-10" src="img/lending/ethereum.svg" alt="ethereum-logo-svg" />
            </div>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-4 lg:col-span-6 lg:mt-0">
          <FileViewer fileName="main.ts" fileExplanation="Bootsrap function" link="">
            <CodeHighlight language="ts" source={bootstrapSource} />
          </FileViewer>
          <FileViewer fileName="model.ts" fileExplanation="Describe Your Custom Model" link="">
            <CodeHighlight language="ts" source={modelSource} />
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
