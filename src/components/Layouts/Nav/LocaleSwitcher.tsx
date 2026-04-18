// src/components/Layouts/Nav/LocaleSwitcher.tsx
import type { FC } from 'react';
import React, { useState, useRef, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useAlternatePageUtils } from '@docusaurus/theme-common/internal';

const LOCALE_LABELS: Record<string, string> = { en: 'EN', ua: 'UA' };

const LocaleSwitcher: FC = () => {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, locales } = i18n;
  const alternatePageUtils = useAlternatePageUtils();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  if (locales.length <= 1) return null;

  return (
    <div ref={ref} className="relative hidden lg:block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1 rounded px-2 py-1 text-xs font-semibold text-neutral-700 border border-neutral-300 hover:border-yellow-500 hover:text-yellow-500 transition duration-150 ease-out"
        aria-label="Switch language"
        aria-expanded={open}
      >
        <span>🌐</span>
        <span>{LOCALE_LABELS[currentLocale] ?? currentLocale.toUpperCase()}</span>
        <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" className="opacity-60">
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 rounded border border-neutral-200 bg-white shadow-md z-50 py-1 min-w-[80px]">
          {locales.map((locale) => {
            const to = alternatePageUtils.createUrl({ locale, fullyQualified: false });
            const isCurrent = locale === currentLocale;
            return (
              <a
                key={locale}
                href={to}
                hrefLang={locale}
                onClick={() => setOpen(false)}
                className={`block px-3 py-1.5 text-xs font-medium ${
                  isCurrent
                    ? 'text-yellow-600 bg-yellow-50'
                    : 'text-neutral-700 hover:bg-neutral-50 hover:text-yellow-500'
                } transition duration-100`}
              >
                {LOCALE_LABELS[locale] ?? locale.toUpperCase()}
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default LocaleSwitcher;
