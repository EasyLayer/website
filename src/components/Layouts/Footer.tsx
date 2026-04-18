// src/components/Layouts/Footer.tsx
import type { FC } from 'react';
import React from 'react';
import Link from '@docusaurus/Link';
import Translate from '@docusaurus/Translate';
import SectionContainer from './SectionContainer';
import SubscribeForm from '../SubscribeForm';
import { SOCIAL_URLS, DOCS_URLS, BLOG_URLS, SITE_URLS } from '../../urls';

interface LinkItem {
  text: string;
  textId: string;
  url: string;
}

const docs: LinkItem[] = [
  { text: 'Get Started', textId: 'footer.docs.getStarted', url: DOCS_URLS.SECTIONS.GET_STARTED },
  { text: 'Overview', textId: 'footer.docs.overview', url: DOCS_URLS.SECTIONS.OVERVIEW },
  { text: 'Bitcoin Crawler', textId: 'footer.docs.bitcoinCrawler', url: DOCS_URLS.SECTIONS.BITCOIN_CRAWLER },
  { text: 'Transport SDK', textId: 'footer.docs.transportSdk', url: DOCS_URLS.SECTIONS.TRANSPORT_SDK },
];
const community: LinkItem[] = [
  { text: 'Blog', textId: 'footer.community.blog', url: BLOG_URLS.BASE },
  { text: 'Discussions', textId: 'footer.community.discussions', url: SOCIAL_URLS.DISCUSSIONS },
  { text: 'Twitter', textId: 'footer.community.twitter', url: SOCIAL_URLS.TWITTER },
  { text: 'GitHub', textId: 'footer.community.github', url: SOCIAL_URLS.GITHUB },
];
const company: LinkItem[] = [
  { text: 'Enterprise', textId: 'footer.company.enterprise', url: SITE_URLS.ENTERPRISE },
  { text: 'Privacy Policy', textId: 'footer.company.privacy', url: SITE_URLS.POLICY },
  { text: 'Security Policy', textId: 'footer.company.security', url: SITE_URLS.SECURITY },
  { text: 'Terms of Service', textId: 'footer.company.terms', url: SITE_URLS.TERMS },
  { text: 'Licenses', textId: 'footer.company.licenses', url: SITE_URLS.LICENSES },
];

const Logo: FC = () => (
  <div className="flex flex-shrink-0 items-center">
    <Link to="/">
      <img src="/img/logo.png" width={35} height={35} alt="EasyLayer Logo" />
    </Link>
    <span className="ml-3 text-lg font-semibold text-neutral-700 dark:text-neutral-200">EasyLayer</span>
  </div>
);

const Segment: FC<{ title: string; titleId: string; links: LinkItem[] }> = ({ title, titleId, links }) => (
  <div>
    <h6 className="text-neutral-700 dark:text-neutral-200">
      <Translate id={titleId}>{title}</Translate>
    </h6>
    <ul className="mt-4 space-y-2">
      {links.map((l) => (
        <li key={l.url}>
          <a
            href={l.url}
            className="text-sm text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-400 dark:hover:text-neutral-300"
          >
            <Translate id={l.textId}>{l.text}</Translate>
          </a>
        </li>
      ))}
    </ul>
  </div>
);

const Footer: FC = () => (
  <footer className="border-t dark:border-neutral-800">
    <SectionContainer>
      <div className="grid grid-cols-1 gap-8 xl:grid xl:grid-cols-3">
        <div className="grid grid-cols-1 xl:col-span-2">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <Segment title="Docs" titleId="footer.title.docs" links={docs} />
            <Segment title="Community" titleId="footer.title.community" links={community} />
            <Segment title="Company" titleId="footer.title.company" links={company} />
          </div>
        </div>
        <div className="xl:col-span-1">
          <h3 className="text-base text-neutral-700 dark:text-neutral-200">
            <Translate id="footer.stayUpToDate">Stay up to date</Translate>
          </h3>
          <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
            <Translate id="footer.subscribeDescription">
              Subscribe to get timely updates on new releases, bug fixes, and all the latest EasyLayer news.
            </Translate>
          </p>
          <SubscribeForm className="mt-4 sm:max-w-md" inputBgColor="bg-transparent" />
        </div>
      </div>
      <div className="mt-8 pt-8">
        <Logo />
        <div className="flex justify-between">
          <p className="mt-4 text-xs text-neutral-400">
            <Translate id="footer.copyright">© EasyLayer Team, all rights reserved.</Translate>
          </p>
        </div>
      </div>
    </SectionContainer>
  </footer>
);

export default Footer;
