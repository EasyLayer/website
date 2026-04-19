export type RouteEntry = {
  key: string;
  kind: 'blog' | 'pages' | 'docs';
  routesByLocale: Record<string, string>;
};

export type SmartLocalePluginData = {
  siteBaseUrl: string;
  defaultLocale: string;
  locales: string[];
  localeLabels: Record<string, string>;
  localePathSegments: Record<string, string>;
  routeToKey: Record<string, string>;
  entriesByKey: Record<string, RouteEntry>;
};

export function trimSlashes(value: string): string {
  return value.replace(/^\/+|\/+$/g, '');
}

export function normalizeRoutePath(value: string): string {
  const cleaned = `/${trimSlashes(value)}`;
  return cleaned === '/' ? '/' : `${cleaned}/`;
}

export function joinRoute(...parts: Array<string | undefined>): string {
  const joined = parts
    .filter(Boolean)
    .map((part) => trimSlashes(part as string))
    .filter(Boolean)
    .join('/');

  return normalizeRoutePath(joined);
}

export function stripBaseUrl(pathname: string, baseUrl: string): string {
  const normalizedPath = normalizeRoutePath(pathname);
  const normalizedBaseUrl = baseUrl === '/' ? '/' : normalizeRoutePath(baseUrl);

  if (normalizedBaseUrl === '/') {
    return normalizedPath;
  }

  const basePrefix = normalizedBaseUrl.endsWith('/') ? normalizedBaseUrl.slice(0, -1) : normalizedBaseUrl;

  if (normalizedPath === normalizedBaseUrl || normalizedPath === `${basePrefix}/`) {
    return '/';
  }

  if (normalizedPath.startsWith(`${basePrefix}/`)) {
    return normalizeRoutePath(normalizedPath.slice(basePrefix.length));
  }

  return normalizedPath;
}

export function addBaseUrl(pathname: string, baseUrl: string): string {
  const normalizedPath = normalizeRoutePath(pathname);
  if (baseUrl === '/') {
    return normalizedPath;
  }
  return joinRoute(baseUrl, normalizedPath);
}

export function stripAnyLocalePrefix(pathname: string, localePathSegments: Record<string, string>): string {
  const normalized = normalizeRoutePath(pathname);

  for (const segment of Object.values(localePathSegments)) {
    if (!segment) {
      continue;
    }

    const prefix = `/${trimSlashes(segment)}`;

    if (normalized === `${prefix}/`) {
      return '/';
    }

    if (normalized.startsWith(`${prefix}/`)) {
      return normalizeRoutePath(normalized.slice(prefix.length));
    }
  }

  return normalized;
}

export function detectLocaleFromPath(
  pathname: string,
  locales: string[],
  defaultLocale: string,
  localePathSegments: Record<string, string>
): string {
  const normalized = normalizeRoutePath(pathname);

  for (const locale of locales) {
    const segment = localePathSegments[locale];
    if (!segment) {
      continue;
    }

    const prefix = `/${trimSlashes(segment)}`;
    if (normalized === `${prefix}/` || normalized.startsWith(`${prefix}/`)) {
      return locale;
    }
  }

  return defaultLocale;
}

export function applyLocalePrefix(
  pathname: string,
  targetLocale: string,
  localePathSegments: Record<string, string>
): string {
  const stripped = stripAnyLocalePrefix(pathname, localePathSegments);
  const targetSegment = localePathSegments[targetLocale];

  if (!targetSegment) {
    return stripped;
  }

  return joinRoute(targetSegment, stripped);
}

export function resolveLocalizedHref(params: {
  pathname: string;
  search: string;
  hash: string;
  targetLocale: string;
  pluginData: SmartLocalePluginData;
  fallbackToHome?: boolean;
}): string {
  const { pathname, search, hash, targetLocale, pluginData, fallbackToHome = false } = params;

  const currentPathWithoutBaseUrl = stripBaseUrl(pathname, pluginData.siteBaseUrl);
  const currentRouteKey = pluginData.routeToKey[normalizeRoutePath(currentPathWithoutBaseUrl)];
  const currentEntry = currentRouteKey ? pluginData.entriesByKey[currentRouteKey] : undefined;

  const mappedRoute = currentEntry?.routesByLocale[targetLocale];
  const fallbackRoute = applyLocalePrefix(currentPathWithoutBaseUrl, targetLocale, pluginData.localePathSegments);

  const finalRoute =
    mappedRoute ??
    fallbackRoute ??
    (fallbackToHome ? applyLocalePrefix('/', targetLocale, pluginData.localePathSegments) : '/');

  return `${addBaseUrl(finalRoute, pluginData.siteBaseUrl)}${search}${hash}`;
}
