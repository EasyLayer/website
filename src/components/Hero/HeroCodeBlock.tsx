// src/components/Hero/HeroCodeBlock.tsx
import type { FC } from 'react';
import React, { Suspense, useState } from 'react';

const CodeHighlight = React.lazy(() => import('../CodeHighlight'));

const BITCOIN_CODE = `import { bootstrap } from '@easylayer/bitcoin-crawler';

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

const EVM_CODE = `import { bootstrap } from '@easylayer/evm-crawler';

const TRANSFER_TOPIC = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';

export const Erc20TransferModel = {
  modelId: 'erc20-transfers',
  state: { transfers: [], contract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48' },
  sources: {
    async log(ctx) {
      if (ctx.log.address !== ctx.state.contract) return;
      if (ctx.log.topics[0] !== TRANSFER_TOPIC) return;
      return { from: ctx.log.topics[1], to: ctx.log.topics[2], value: ctx.log.data };
    },
    async block(ctx) { ctx.applyEvent('Transfer', ctx.block.number, { logs: ctx.locals.log }); },
  },
  reducers: {
    Transfer(s, e) { s.transfers.push(...(e.payload.logs || [])); },
  },
};`;

type Tab = 'bitcoin' | 'evm';

const FileViewer: FC<{ activeTab: Tab; onTabChange: (t: Tab) => void; children: React.ReactNode }> = ({
  activeTab,
  onTabChange,
  children,
}) => (
  <div className="relative flex flex-col items-center justify-center">
    <div className="flex h-auto w-full flex-col rounded-t-md bg-[#F3EDE0] px-2 pt-2">
      <div className="flex items-center gap-1 pb-2">
        <button
          onClick={() => onTabChange('bitcoin')}
          className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
            activeTab === 'bitcoin' ? 'bg-yellow-500 text-white' : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          Bitcoin
        </button>
        <button
          onClick={() => onTabChange('evm')}
          className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
            activeTab === 'evm' ? 'bg-yellow-500 text-white' : 'text-neutral-500 hover:text-neutral-700'
          }`}
        >
          EVM
        </button>
        <div className="ml-auto flex space-x-2 pr-1">
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
          <div className="h-2 w-2 rounded-full bg-yellow-500" />
        </div>
      </div>
    </div>
    <div className="w-full rounded-b-md text-sm shadow-2xl">{children}</div>
  </div>
);

const HeroCodeBlock: FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('bitcoin');
  return (
    <FileViewer activeTab={activeTab} onTabChange={setActiveTab}>
      <Suspense fallback={<div className="h-64 w-full animate-pulse bg-neutral-100" />}>
        <CodeHighlight language="ts" source={activeTab === 'bitcoin' ? BITCOIN_CODE : EVM_CODE} />
      </Suspense>
    </FileViewer>
  );
};

export default HeroCodeBlock;
