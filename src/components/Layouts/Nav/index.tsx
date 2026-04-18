// src/components/Layouts/Nav/index.tsx
import type { FC } from 'react';
import React, { useState } from 'react';
import Link from '@docusaurus/Link';
import { Star } from 'react-feather';
import Translate from '@docusaurus/Translate';
import Announcement from './Announcement';
import Transition from '../../../lib/Transition';
import { GitHubIcon, TwitterIcon } from '../../SocialIcons';
import { SOCIAL_URLS, DOCS_URLS, BLOG_URLS, SITE_URLS } from '../../../urls';
import LocaleSwitcher from './LocaleSwitcher';

const Logo: FC = () => (
  <div className="flex flex-shrink-0 items-center">
    <Link to="/">
      <img src="img/logo.png" width={35} height={35} alt="EasyLayer Logo" />
    </Link>
    <span className="ml-3 text-lg font-semibold text-neutral-700 dark:text-neutral-100">
      EasyLayer <sup className="text-base text-yellow-500">βeta</sup>
    </span>
  </div>
);

const SocialIcon: FC<{ Icon: React.ComponentType; url: string }> = ({ Icon, url }) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="hidden border-b-2 border-transparent py-5 text-neutral-700 dark:text-neutral-300 hover:border-yellow-500 hover:text-yellow-500 hover:opacity-75 lg:flex"
  >
    <Icon />
  </a>
);

const GitHubButton: FC = () => (
  <a
    href={SOCIAL_URLS.GITHUB}
    target="_blank"
    rel="noreferrer"
    className="group hidden items-center space-x-2 rounded px-2.5 py-1 text-xs transition duration-200 ease-out hover:bg-neutral-200 dark:hover:bg-neutral-800 lg:flex"
  >
    <div className="flex h-3 w-3 items-center justify-center text-neutral-700 dark:text-neutral-300 group-hover:h-4 group-hover:w-4 group-hover:text-yellow-500">
      <Star strokeWidth={2} />
    </div>
    <span className="truncate text-neutral-700 dark:text-neutral-300">
      <Translate id="nav.github.star">Star us on GitHub</Translate>
    </span>
  </a>
);

const Nav: FC = () => {
  const [open, setOpen] = useState(false);
  const linkClass =
    'border-b-2 border-transparent px-1 py-5 text-sm font-semibold text-neutral-700 dark:text-neutral-200 hover:border-yellow-500 hover:text-yellow-500';
  const navLinks = [
    { to: DOCS_URLS.BASE, labelId: 'nav.docs', label: 'Docs' },
    { to: BLOG_URLS.BASE, labelId: 'nav.blog', label: 'Blog' },
    { to: SITE_URLS.FAQ, labelId: 'nav.faq', label: 'FAQ' },
    { to: SITE_URLS.ENTERPRISE, labelId: 'nav.enterprise', label: 'Enterprise' },
  ];

  return (
    <>
      <Announcement />
      <div className="sticky top-0 z-50">
        <div className="absolute top-0 h-full w-full bg-[#f5f4f0] dark:bg-neutral-900 opacity-80" />
        <nav className="border-b border-gray-400 dark:border-neutral-700 backdrop-blur-sm">
          <div className="relative mx-auto flex h-16 justify-between lg:container lg:px-16 xl:px-20">
            <div className="absolute inset-y-0 left-0 flex items-center px-2 lg:hidden" onClick={() => setOpen(true)}>
              <button className="inline-flex items-center rounded-md p-2 hover:bg-gray-50 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-500">
                <span className="sr-only">Open menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
            <div className="flex flex-1 items-center justify-center sm:items-stretch lg:justify-between">
              <div className="flex items-center">
                <Logo />
                <div className="hidden pl-4 sm:ml-6 sm:space-x-4 lg:flex">
                  {navLinks.map(({ to, labelId, label }) => (
                    <Link key={to} to={to}>
                      <span className={linkClass}>
                        <Translate id={labelId}>{label}</Translate>
                      </span>
                    </Link>
                  ))}
                  <Link to={SITE_URLS.SUBSCRIBE}>
                    <span className="border-b-2 border-transparent px-1 py-5 text-sm font-medium">
                      <span className="rounded bg-yellow-500/25 px-2 py-1 text-neutral-700 dark:text-neutral-200 hover:bg-yellow-500/10">
                        📬 <Translate id="nav.newsletter">Join our Newsletter</Translate>
                      </span>
                    </span>
                  </Link>
                </div>
              </div>
              <div className="flex items-center gap-2 space-x-2">
                <GitHubButton />
                <Link to={SOCIAL_URLS.DISCUSSIONS}>
                  <button className="hidden rounded bg-yellow-500 px-2.5 py-1 text-xs text-white transition duration-200 ease-out hover:bg-yellow-400 lg:block">
                    💬 <Translate id="nav.discussions">Discussions</Translate>
                  </button>
                </Link>
                <SocialIcon Icon={GitHubIcon} url={SOCIAL_URLS.GITHUB} />
                <SocialIcon Icon={TwitterIcon} url={SOCIAL_URLS.TWITTER} />
                <LocaleSwitcher />
              </div>
            </div>
          </div>

          <Transition
            appear={true}
            show={open}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <div className="fixed -inset-y-0 z-50 h-screen w-screen transform overflow-y-scroll bg-white dark:bg-neutral-900 p-4 md:p-8">
              <div className="absolute right-4 top-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center rounded-md bg-white dark:bg-neutral-800 p-2 text-neutral-700 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-neutral-700"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-12 mt-6">
                {[
                  ...navLinks,
                  { to: SOCIAL_URLS.GITHUB, labelId: 'nav.github', label: '⭐️ GitHub' },
                  { to: SOCIAL_URLS.TWITTER, labelId: 'nav.twitter', label: '🐦 Twitter' },
                ].map(({ to, label }) => (
                  <div key={to} className="space-y-1 pb-4 pt-2">
                    <Link to={to}>
                      <span className="block pl-3 pr-4 text-base font-medium text-neutral-700 dark:text-neutral-300">
                        {label}
                      </span>
                    </Link>
                  </div>
                ))}
                <div className="space-y-1 pb-4 pt-2">
                  <Link to={SITE_URLS.SUBSCRIBE} onClick={() => setOpen(false)}>
                    <span className="block rounded bg-yellow-500/25 px-2 py-1 pl-3 pr-4 text-base font-medium text-neutral-700 dark:text-neutral-200 hover:bg-yellow-500/10">
                      📬 Join our Newsletter
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </Transition>
        </nav>
      </div>
    </>
  );
};

export default Nav;
