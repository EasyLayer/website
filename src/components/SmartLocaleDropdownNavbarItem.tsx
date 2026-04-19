import React, { useMemo } from 'react';
import clsx from 'clsx';
import { usePluginData } from '@docusaurus/useGlobalData';
import { useLocation } from '@docusaurus/router';
import {
  detectLocaleFromPath,
  resolveLocalizedHref,
  stripBaseUrl,
  type SmartLocalePluginData,
} from '../lib/smartLocaleRouting';

type Props = {
  className?: string;
  mobile?: boolean;
  dropdownLabel?: string;
  fallbackToHome?: boolean;
};

const SHORT_LOCALE_LABELS: Record<string, string> = { en: 'EN', ua: 'UA' };

export default function SmartLocaleDropdownNavbarItem(props: Props) {
  const { className, mobile = false, dropdownLabel = 'Language', fallbackToHome = false } = props;
  const location = useLocation();
  const pluginData = usePluginData('smart-locale-route-map') as SmartLocalePluginData;

  const browserPathname =
    typeof window !== 'undefined' && window.location?.pathname ? window.location.pathname : location.pathname;

  const currentPathWithoutBaseUrl = useMemo(
    () => stripBaseUrl(browserPathname, pluginData.siteBaseUrl),
    [browserPathname, pluginData.siteBaseUrl]
  );

  const activeLocale = useMemo(
    () =>
      detectLocaleFromPath(
        currentPathWithoutBaseUrl,
        pluginData.locales,
        pluginData.defaultLocale,
        pluginData.localePathSegments
      ),
    [currentPathWithoutBaseUrl, pluginData.locales, pluginData.defaultLocale, pluginData.localePathSegments]
  );

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    const targetLocale = event.target.value;

    if (targetLocale === activeLocale) {
      return;
    }

    const href = resolveLocalizedHref({
      pathname: browserPathname,
      search: typeof window !== 'undefined' ? window.location.search : '',
      hash: typeof window !== 'undefined' ? window.location.hash : '',
      targetLocale,
      pluginData,
      fallbackToHome,
    });

    const currentFullPath = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (href === currentFullPath) {
      return;
    }

    window.location.assign(href);
  }

  return (
    <div
      className={clsx(
        'inline-flex items-center rounded border border-neutral-300 bg-white px-2 py-1 text-neutral-700 transition duration-150 ease-out hover:border-yellow-500 hover:text-yellow-500',
        mobile ? 'min-w-[92px]' : 'min-w-[74px]',
        className
      )}
    >
      <label className="sr-only" htmlFor={mobile ? 'smart-locale-mobile' : 'smart-locale-desktop'}>
        {dropdownLabel}
      </label>

      <select
        id={mobile ? 'smart-locale-mobile' : 'smart-locale-desktop'}
        value={activeLocale}
        onChange={handleChange}
        className={clsx(
          'm-0 w-full appearance-none border-0 bg-transparent p-0 pr-4 text-xs font-semibold outline-none',
          'text-neutral-700 shadow-none focus:outline-none focus:ring-0',
          mobile ? 'min-w-[64px]' : 'min-w-[46px]'
        )}
      >
        {pluginData.locales.map((locale) => (
          <option key={locale} value={locale}>
            {SHORT_LOCALE_LABELS[locale] ?? locale.toUpperCase()}
          </option>
        ))}
      </select>

      <span aria-hidden="true" className="pointer-events-none -ml-3 text-[10px] opacity-60">
        ▾
      </span>
    </div>
  );
}
