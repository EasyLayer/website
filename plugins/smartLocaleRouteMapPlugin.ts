import fs from 'node:fs';
import path from 'node:path';
import type {LoadContext, Plugin} from '@docusaurus/types';

type ContentKind = 'blog' | 'pages' | 'docs';

type PluginOptions = {
  siteBaseUrl?: string;
  blogRouteBasePath?: string;
  docsRouteBasePath?: string;
};

type RouteEntry = {
  key: string;
  kind: ContentKind;
  routesByLocale: Record<string, string>;
};

type GlobalData = {
  siteUrl: string;
  siteBaseUrl: string;
  defaultLocale: string;
  locales: string[];
  localeLabels: Record<string, string>;
  localeHreflangs: Record<string, string>;
  localePathSegments: Record<string, string>;
  routeToKey: Record<string, string>;
  entriesByKey: Record<string, RouteEntry>;
};

const CONTENT_FILE_EXTENSIONS = new Set(['.md', '.mdx', '.js', '.jsx', '.ts', '.tsx', '.html']);
const HREFLANG_ALTERNATE_LINK_REGEX = /\s*<link\b(?=[^>]*\brel=(?:"alternate"|'alternate'|alternate))(?=[^>]*\bhreflang=(?:"[^"]+"|'[^']+'|[^\s>]+))[^>]*>/g;
const CANONICAL_LINK_REGEX = /<link\b[^>]*\brel=(?:"canonical"|'canonical'|canonical)[^>]*>/;

function exists(filePath: string): boolean {
  return fs.existsSync(filePath);
}

function ensurePosix(value: string): string {
  return value.split(path.sep).join('/');
}

function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

function normalizeRoutePath(value: string): string {
  const cleaned = `/${trimSlashes(value)}`;
  return cleaned === '/' ? '/' : `${cleaned}/`;
}

function joinRoute(...parts: Array<string | undefined>): string {
  const joined = parts
    .filter(Boolean)
    .map((part) => trimSlashes(part as string))
    .filter(Boolean)
    .join('/');
  return normalizeRoutePath(joined);
}

function addBaseUrl(route: string, siteBaseUrl: string): string {
  const normalizedRoute = normalizeRoutePath(route);
  if (siteBaseUrl === '/') {
    return normalizedRoute;
  }
  return joinRoute(siteBaseUrl, normalizedRoute);
}

function toAbsoluteUrl(route: string, siteUrl: string, siteBaseUrl: string): string {
  const pathname = addBaseUrl(route, siteBaseUrl);
  return new URL(pathname, siteUrl).toString();
}

function readText(filePath: string): string {
  return fs.readFileSync(filePath, 'utf8');
}

function writeText(filePath: string, value: string): void {
  fs.writeFileSync(filePath, value, 'utf8');
}

function parseFrontMatterBlock(content: string): string | null {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? match[1] : null;
}

function parseFrontMatterValue(frontMatter: string | null, fieldName: string): string | undefined {
  if (!frontMatter) return undefined;

  const escaped = fieldName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`^${escaped}:\\s*(.+)$`, 'm');
  const match = frontMatter.match(regex);
  if (!match) return undefined;

  let value = match[1].trim();
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1).trim();
  }
  return value || undefined;
}

function walkFiles(dirPath: string): string[] {
  if (!exists(dirPath)) return [];
  const result: string[] = [];

  for (const entry of fs.readdirSync(dirPath, {withFileTypes: true})) {
    if (entry.name.startsWith('.')) continue;

    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      result.push(...walkFiles(fullPath));
      continue;
    }
    if (!entry.isFile()) continue;
    if (!CONTENT_FILE_EXTENSIONS.has(path.extname(entry.name))) continue;
    result.push(fullPath);
  }

  return result;
}

function stripContentExtension(relativeFilePath: string): string {
  return relativeFilePath.replace(/\.(md|mdx|js|jsx|ts|tsx|html)$/i, '');
}

function stripDatePrefix(fileNameWithoutExt: string): string {
  return fileNameWithoutExt.replace(/^\d{4}-\d{2}-\d{2}-/, '');
}

function computePageRoute(relativeFilePath: string): string {
  const noExt = stripContentExtension(ensurePosix(relativeFilePath));
  const segments = noExt.split('/').filter(Boolean);
  if (segments.length === 0) return '/';
  if (segments[segments.length - 1] === 'index') segments.pop();
  if (segments.length === 0) return '/';
  return joinRoute(...segments);
}

function computeBlogRoute(relativeFilePath: string, blogRouteBasePath: string): string {
  const noExt = stripContentExtension(path.basename(relativeFilePath));
  return joinRoute(blogRouteBasePath, stripDatePrefix(noExt));
}

function computeDocsRoute(relativeFilePath: string, docsRouteBasePath: string): string {
  const noExt = stripContentExtension(ensurePosix(relativeFilePath));
  const segments = noExt.split('/').filter(Boolean);
  if (segments[segments.length - 1] === 'index') segments.pop();
  return segments.length === 0 ? joinRoute(docsRouteBasePath) : joinRoute(docsRouteBasePath, ...segments);
}

function computeRouteFromFile(params: {
  kind: ContentKind;
  filePath: string;
  relativeFilePath: string;
  blogRouteBasePath: string;
  docsRouteBasePath: string;
}): string {
  const {kind, filePath, relativeFilePath, blogRouteBasePath, docsRouteBasePath} = params;
  const content = readText(filePath);
  const frontMatter = parseFrontMatterBlock(content);
  const slug = parseFrontMatterValue(frontMatter, 'slug');

  if (slug) {
    if (kind === 'blog') return joinRoute(blogRouteBasePath, slug);
    if (kind === 'docs') return slug.startsWith('/') ? normalizeRoutePath(slug) : joinRoute(docsRouteBasePath, slug);
    return slug.startsWith('/') ? normalizeRoutePath(slug) : joinRoute(slug);
  }

  if (kind === 'blog') return computeBlogRoute(relativeFilePath, blogRouteBasePath);
  if (kind === 'docs') return computeDocsRoute(relativeFilePath, docsRouteBasePath);
  return computePageRoute(relativeFilePath);
}

function getLocalePathSegment(
  locale: string,
  defaultLocale: string,
  localeConfigs: Record<string, {path?: string; label?: string; htmlLang?: string}> | undefined,
): string {
  if (locale === defaultLocale) return '';
  return trimSlashes(localeConfigs?.[locale]?.path ?? locale);
}

function applyLocaleToRoute(params: {
  route: string;
  locale: string;
  defaultLocale: string;
  localeConfigs: Record<string, {path?: string; label?: string; htmlLang?: string}> | undefined;
}): string {
  const {route, locale, defaultLocale, localeConfigs} = params;
  const localeSegment = getLocalePathSegment(locale, defaultLocale, localeConfigs);
  return localeSegment ? joinRoute(localeSegment, route) : normalizeRoutePath(route);
}

function addContentFiles(params: {
  entriesByKey: Record<string, RouteEntry>;
  kind: ContentKind;
  locale: string;
  rootDir: string;
  keyPrefix: string;
  blogRouteBasePath: string;
  docsRouteBasePath: string;
  defaultLocale: string;
  localeConfigs: Record<string, {path?: string; label?: string; htmlLang?: string}> | undefined;
}) {
  const {entriesByKey, kind, locale, rootDir, keyPrefix, blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs} = params;

  for (const filePath of walkFiles(rootDir)) {
    const relativeFilePath = ensurePosix(path.relative(rootDir, filePath));
    if (!relativeFilePath || relativeFilePath === 'authors.yml') continue;

    const key = `${kind}:${keyPrefix}${relativeFilePath}`;
    const route = computeRouteFromFile({kind, filePath, relativeFilePath, blogRouteBasePath, docsRouteBasePath});
    const localizedRoute = applyLocaleToRoute({route, locale, defaultLocale, localeConfigs});

    if (!entriesByKey[key]) {
      entriesByKey[key] = {key, kind, routesByLocale: {}};
    }
    entriesByKey[key].routesByLocale[locale] = localizedRoute;
  }
}

function routeToHtmlFile(route: string, outDir: string): string {
  const normalizedRoute = normalizeRoutePath(route);
  if (normalizedRoute === '/') {
    return path.join(outDir, 'index.html');
  }
  return path.join(outDir, trimSlashes(normalizedRoute), 'index.html');
}

function buildAlternateLinks(entry: RouteEntry, globalData: GlobalData): string {
  const tags: string[] = [];

  for (const locale of globalData.locales) {
    const localeRoute = entry.routesByLocale[locale];
    if (!localeRoute) {
      continue;
    }

    tags.push(
      `<link data-rh="true" rel="alternate" href="${toAbsoluteUrl(localeRoute, globalData.siteUrl, globalData.siteBaseUrl)}" hreflang="${globalData.localeHreflangs[locale] ?? locale}">`,
    );
  }

  const defaultRoute = entry.routesByLocale[globalData.defaultLocale];
  if (defaultRoute) {
    tags.push(
      `<link data-rh="true" rel="alternate" href="${toAbsoluteUrl(defaultRoute, globalData.siteUrl, globalData.siteBaseUrl)}" hreflang="x-default">`,
    );
  }

  return tags.join('');
}

function replaceHreflangAlternates(html: string, entry: RouteEntry, globalData: GlobalData): string {
  const withoutAlternates = html.replace(HREFLANG_ALTERNATE_LINK_REGEX, '');
  const alternateLinks = buildAlternateLinks(entry, globalData);

  if (!alternateLinks) {
    return withoutAlternates;
  }

  if (CANONICAL_LINK_REGEX.test(withoutAlternates)) {
    return withoutAlternates.replace(CANONICAL_LINK_REGEX, `${alternateLinks}$&`);
  }

  return withoutAlternates.replace('</head>', `${alternateLinks}</head>`);
}

function updateBuiltHtmlAlternates(outDir: string, globalData: GlobalData): void {
  const handledFiles = new Set<string>();

  for (const entry of Object.values(globalData.entriesByKey)) {
    for (const route of Object.values(entry.routesByLocale)) {
      const htmlFilePath = routeToHtmlFile(route, outDir);
      if (handledFiles.has(htmlFilePath) || !exists(htmlFilePath)) {
        continue;
      }

      handledFiles.add(htmlFilePath);
      const currentHtml = readText(htmlFilePath);
      const nextHtml = replaceHreflangAlternates(currentHtml, entry, globalData);

      if (nextHtml !== currentHtml) {
        writeText(htmlFilePath, nextHtml);
      }
    }
  }
}

export default function smartLocaleRouteMapPlugin(
  context: LoadContext,
  options: PluginOptions = {},
): Plugin<GlobalData> {
  const blogRouteBasePath = options.blogRouteBasePath ?? 'blog';
  const docsRouteBasePath = options.docsRouteBasePath ?? 'docs';
  let globalData: GlobalData | undefined;

  return {
    name: 'smart-locale-route-map',

    async loadContent() {
      const {siteDir, siteConfig} = context;
      const {i18n} = siteConfig;
      const locales = i18n.locales;
      const defaultLocale = i18n.defaultLocale;
      const localeConfigs = i18n.localeConfigs as Record<string, {path?: string; label?: string; htmlLang?: string}> | undefined;
      const entriesByKey: Record<string, RouteEntry> = {};

      addContentFiles({entriesByKey, kind: 'blog', locale: defaultLocale, rootDir: path.join(siteDir, 'blog'), keyPrefix: '', blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs});
      addContentFiles({entriesByKey, kind: 'pages', locale: defaultLocale, rootDir: path.join(siteDir, 'src', 'pages'), keyPrefix: '', blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs});
      addContentFiles({entriesByKey, kind: 'docs', locale: defaultLocale, rootDir: path.join(siteDir, 'docs'), keyPrefix: '', blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs});

      for (const locale of locales) {
        if (locale === defaultLocale) continue;

        addContentFiles({entriesByKey, kind: 'blog', locale, rootDir: path.join(siteDir, 'i18n', locale, 'docusaurus-plugin-content-blog'), keyPrefix: '', blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs});
        addContentFiles({entriesByKey, kind: 'pages', locale, rootDir: path.join(siteDir, 'i18n', locale, 'docusaurus-plugin-content-pages'), keyPrefix: '', blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs});

        const docsCurrentRoot = path.join(siteDir, 'i18n', locale, 'docusaurus-plugin-content-docs', 'current');
        const docsDirectRoot = path.join(siteDir, 'i18n', locale, 'docusaurus-plugin-content-docs');
        addContentFiles({entriesByKey, kind: 'docs', locale, rootDir: exists(docsCurrentRoot) ? docsCurrentRoot : docsDirectRoot, keyPrefix: '', blogRouteBasePath, docsRouteBasePath, defaultLocale, localeConfigs});
      }

      const routeToKey: Record<string, string> = {};
      for (const entry of Object.values(entriesByKey)) {
        for (const route of Object.values(entry.routesByLocale)) {
          routeToKey[normalizeRoutePath(route)] = entry.key;
        }
      }

      const localeLabels: Record<string, string> = {};
      const localeHreflangs: Record<string, string> = {};
      const localePathSegments: Record<string, string> = {};
      for (const locale of locales) {
        localeLabels[locale] = localeConfigs?.[locale]?.label ?? locale;
        localeHreflangs[locale] = localeConfigs?.[locale]?.htmlLang ?? locale;
        localePathSegments[locale] = getLocalePathSegment(locale, defaultLocale, localeConfigs);
      }

      globalData = {
        siteUrl: siteConfig.url,
        siteBaseUrl: options.siteBaseUrl ?? siteConfig.baseUrl,
        defaultLocale,
        locales,
        localeLabels,
        localeHreflangs,
        localePathSegments,
        routeToKey,
        entriesByKey,
      };

      return globalData;
    },

    async contentLoaded({content, actions}) {
      actions.setGlobalData(content);
    },

    async postBuild({outDir}) {
      if (!globalData) {
        return;
      }

      updateBuiltHtmlAlternates(outDir, globalData);
    },
  };
}
