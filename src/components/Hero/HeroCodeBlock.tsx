// src/components/Hero/HeroCodeBlock.tsx
import type { FC } from 'react';
import React, { Suspense } from 'react';
import { translate } from '@docusaurus/Translate';

const CodeHighlight = React.lazy(() => import('../CodeHighlight'));

const CODE_SOURCE = `import { bootstrap } from '@easylayer/bitcoin-crawler';

export const AddressUtxoWatcherModel = {
  modelId: 'wallet-utxo-watcher',
  state: { wallets: new Set(['1A1zP1...Na']), utxos: new Map() },
  sources: {
    async vout(ctx) { return { a: ctx.vout.scriptPubKey.addresses?.[0], k: ctx.tx.txid + ':' + ctx.vout.n, v: ctx.vout.value }; },
    async vin(ctx) { return { k: ctx.vin.txid + ':' + ctx.vin.vout }; },
    async block(ctx) { ctx.applyEvent('Deposit', ctx.block.height, { o: ctx.locals.vout, i: ctx.locals.vin }); },
  },
  reducers: {
    Deposit(s, e) {
      for (const x of e.payload.o || []) (s.utxos.get(x.a) || s.utxos.set(x.a, new Map()).get(x.a)).set(x.k, x.v);
      for (const y of e.payload.i || []) for (const [a, bag] of s.utxos) if (bag.delete(y.k) && !bag.size) s.utxos.delete(a);
    },
  },
};`;

const FileViewer: FC<{ fileName: string; fileExplanation: string; children: React.ReactNode }> = ({
  fileName,
  fileExplanation,
  children,
}) => (
  <div className="relative flex flex-col items-center justify-center">
    <div className="flex h-6 w-full items-center justify-between rounded-t-md bg-[#F3EDE0] px-2">
      <span className="flex items-center space-x-1 text-sm text-neutral-500">
        <span>{fileName}</span>
        <span className="text-neutral-400">· {fileExplanation}</span>
      </span>
      <div className="flex space-x-2">
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
        <div className="h-2 w-2 rounded-full bg-yellow-500" />
      </div>
    </div>
    <div className="w-full rounded-b-md text-sm shadow-2xl">{children}</div>
  </div>
);

const HeroCodeBlock: FC = () => {
  const fileExplanation = translate({
    id: 'hero.codeBlock.fileExplanation',
    message: 'Your complete blockchain indexer',
  });
  return (
    <FileViewer fileName="index.ts" fileExplanation={fileExplanation}>
      <Suspense fallback={<div className="h-64 w-full animate-pulse bg-neutral-100" />}>
        <CodeHighlight language="ts" source={CODE_SOURCE} />
      </Suspense>
    </FileViewer>
  );
};

export default HeroCodeBlock;
