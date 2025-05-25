import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import SectionContainer from './SectionContainer';
import SubscribeForm from '../SubscribeForm';
// import DarkModeToggle from '../DarkModeToggle';
import { SOCIAL_URLS, DOCS_URLS, BLOG_URLS, SITE_URLS } from '../../urls';

interface LinkItem {
  text: string;
  url: string;
}

const docs: LinkItem[] = [
  {
    text: 'Get Started',
    url: DOCS_URLS.SECTIONS.GET_STARTED,
  },
];

const community: LinkItem[] = [
  {
    text: 'Discussions',
    url: SOCIAL_URLS.DISCUSSIONS,
  },
  {
    text: 'Twitter',
    url: SOCIAL_URLS.TWITTER,
  },
  {
    text: 'GitHub',
    url: SOCIAL_URLS.GITHUB,
  },
];

const company: LinkItem[] = [
  {
    text: 'Blog',
    url: BLOG_URLS.BASE,
  },
  {
    text: 'Privacy Policy',
    url: SITE_URLS.POLICY,
  },
  {
    text: 'Terms of Service',
    url: SITE_URLS.TERMS,
  },
  {
    text: 'Security Policy',
    url: SITE_URLS.SECURITY,
  },
];

const Logo: FC = () => (
  <div className="flex flex-shrink-0 items-center">
    <Link to="/">
      <img src="img/logo.png" width={35} height={35} alt="EasyLayer Logo" />
    </Link>
    <span className="ml-3 text-lg font-semibold text-neutral-700">EasyLayer</span>
  </div>
);

interface SegmentProps {
  title: string;
  links: LinkItem[];
}

const Segment: FC<SegmentProps> = ({ title, links }) => (
  <div>
    <h6 className="text-neutral-700">{title}</h6>
    <ul className="mt-4 space-y-2">
      {links.map((l, idx) => (
        <li key={idx}>
          <a
            href={l.url}
            className={`
              text-sm text-neutral-500 transition-colors
              hover:text-neutral-400
            `}
          >
            {l.text}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: FC = () => {
  return (
    <footer className="border-t">
      <SectionContainer>
        <div className="grid grid-cols-1 gap-8 xl:grid xl:grid-cols-3">
          <div className="grid grid-cols-1 xl:col-span-2">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
              <Segment title="Docs" links={docs} />
              <Segment title="Community" links={community} />
              <Segment title="Company" links={company} />
            </div>
          </div>

          <div className="xl:col-span-1">
            <h3 className="text-base text-neutral-700">Stay up to date</h3>
            <p className="mt-4 text-sm text-neutral-500">
              Subscribe to get timely updates on new releases, bug fixes, and all the latest EasyLayer news.
            </p>

            <SubscribeForm className="mt-4 sm:max-w-md" inputBgColor="bg-transparent" />
          </div>
        </div>
        <div className="mt-8 pt-8">
          <Logo />
          <div className="flex justify-between">
            <p className="mt-4 text-xs text-neutral-400">© EasyLayer Team, all rights reserved.</p>
            {/* <DarkModeToggle /> */}
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
};

export default Footer;
