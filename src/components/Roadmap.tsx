import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import { GitHub, CheckSquare, ArrowRight } from 'react-feather';
import SectionContainer from './Layouts/SectionContainer';

type LinkType = 'issue' | 'task' | 'other';

interface FeatureLink {
  url: string;
  label: string;
  type: LinkType;
}

interface FeatureItem {
  text: string;
  link?: FeatureLink;
}

interface SectionProps {
  features: FeatureItem[];
}

// Features for the current phase
const currentPhaseFeatures: FeatureItem[] = [
  {
    text: 'Testing and improving @bitcoin-state-listener and @evm-state-listener.',
    link: {
      url: 'https://github.com/EasyLayer/website/issue/1',
      label: '#1',
      type: 'issue',
    },
  },
];

// Features for the future phase
const futurePhaseFeatures: FeatureItem[] = [
  {
    text: 'Release stable versions of @bitcoin-state-listener and @evm-state-listener, ready for developers to use.',
    link: {
      url: 'https://github.com/EasyLayer/website/projects/2',
      label: '#100',
      type: 'task',
    },
  },
];

const FeatureLinkComponent: FC<FeatureLink> = ({ url, label, type }) => {
  // Map link types to corresponding icons
  const iconMap: Record<LinkType, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
    issue: GitHub,
    task: ArrowRight,
    other: CheckSquare,
  };
  const Icon = iconMap[type] || ArrowRight;

  return (
    <Link to={url}>
      <span
        className={`
          cursor-pointer rounded-full
          bg-neutral-600 px-2.5
          py-1 text-xs text-white
        `}
      >
        <div className="group inline-flex items-center gap-1">
          <span>{label}</span>
          <div className="transition-all group-hover:ml-0.5">
            <span className="text-yellow-400">
              <Icon size={14} />
            </span>
          </div>
        </div>
      </span>
    </Link>
  );
};

// --- Section Component ---
const Section: FC<SectionProps> = ({ features }) => (
  <ul className="space-y-6">
    {features.map(({ text, link }, idx) => (
      <li className="grid grid-cols-12" key={idx}>
        <div className="col-span-8 col-start-3 flex items-center">
          <span>
            <span className="text-neutral-600">{text}</span>
            {link && (
              <>
                &nbsp;
                <FeatureLinkComponent url={link.url} label={link.label} type={link.type} />
              </>
            )}
          </span>
        </div>
      </li>
    ))}
  </ul>
);

// --- Main Roadmap Component ---
const Roadmap: FC = () => (
  <SectionContainer className="lg:py-18 space-y-16" id="roadmap">
    {/* Section title */}
    <div className="grid grid-cols-12">
      <div className="col-span-12 text-center">
        <h2 className="mb-4 text-xl text-neutral-700 lg:text-2xl">⚡ Roadmap ⚡</h2>
        <p className="text-neutral-500">From Idea and Concept to Implementation and Expansion</p>
      </div>
    </div>

    <div className="grid grid-cols-1 md:gap-16 lg:grid-cols-2">
      <div className="rounded-lg border border-yellow-500/25 bg-yellow-500/5 p-5">
        <div className="mb-6 text-center font-bold text-neutral-700">Beta Testing Phase</div>
        <Section features={currentPhaseFeatures} />
      </div>

      <div className="mt-6 rounded-lg border border-yellow-500/25 bg-yellow-500/20 p-5 lg:mt-0">
        <div className="mb-6 text-center font-bold text-neutral-700">Release Apps Phase</div>
        <Section features={futurePhaseFeatures} />
      </div>
    </div>
  </SectionContainer>
);

export default Roadmap;
