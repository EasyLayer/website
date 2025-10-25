// Base URLs
const BASE_URLS = {
  GITHUB: 'https://github.com/easylayer',
  TWITTER: 'https://x.com/easylayer_io',
  BLOG: '/blog',
  DOCS: '/docs',
  SITE: 'https://easylayer.io',
  API: {
    LOOPS: 'https://app.loops.so/api/newsletter-form/cm9mjezmt4kn9x98ppgfr1h67',
  },
} as const;

// Social Media URLs
export const SOCIAL_URLS = {
  TWITTER: BASE_URLS.TWITTER,
  GITHUB: BASE_URLS.GITHUB,
  GITHUB_CORE: `${BASE_URLS.GITHUB}/core`,
  GITHUB_WEBSITE: `${BASE_URLS.GITHUB}/website`,
  DISCUSSIONS: `${BASE_URLS.GITHUB}/core/discussions`,
} as const;

// Blog URLs
export const BLOG_URLS = {
  BASE: BASE_URLS.BLOG,
  POSTS: {
    GETTING_STARTED: `${BASE_URLS.BLOG}/getting-started`,
  },
} as const;

// Documentation URLs
export const DOCS_URLS = {
  BASE: BASE_URLS.DOCS,
  SECTIONS: {
    GET_STARTED: `${BASE_URLS.DOCS}/get-started`,
    OVERVIEW: `${BASE_URLS.DOCS}/overview`,
    BITCOIN_CRAWLER: `${BASE_URLS.DOCS}/get-started/bitcoin-crawler`,
    TRANSPORT_SDK: `${BASE_URLS.DOCS}/get-started/transport-sdk`,
    EXAMPLES: `${BASE_URLS.DOCS}/examples`,
  },
} as const;

// Example Apps URLs
export const EXAMPLE_APPS = {
  BITCOIN_SYSTEM: `${BASE_URLS.GITHUB}/bitcoin-crawler/tree/master/examples/system`,
  BITCOIN_BASIC_WALLET_WATCHER: `${BASE_URLS.GITHUB}/bitcoin-crawler/tree/master/examples/business/base-wallet-watcher`,
  BITCOIN_ADVANCED_WALLET_WATCHER: `${BASE_URLS.GITHUB}/bitcoin-crawler/tree/master/examples/business/advanced-wallet-watcher`,
} as const;

// Site URLs
export const SITE_URLS = {
  BASE: BASE_URLS.SITE,
  POLICY: '/policy',
  SECURITY: '/security',
  TERMS: '/terms',
  LICENSES: '/licenses',
  FAQ: '#faq',
  SUBSCRIBE: '#subscribe',
  FEATURES: '#features',
} as const;

// API URLs
export const API_URLS = {
  NEWSLETTER: BASE_URLS.API.LOOPS,
} as const;

// Type for all URLs
export type AppUrls = typeof SOCIAL_URLS & typeof BLOG_URLS & typeof DOCS_URLS;

// Helper function to get blog post URL
export const getBlogPostUrl = (slug: string): string => `${BASE_URLS.BLOG}/${slug}`;

// Helper function to get documentation URL
export const getDocsUrl = (section: string): string => `${BASE_URLS.DOCS}/${section}`;

// Helper function to get example app URL
export const getExampleAppUrl = (app: keyof typeof EXAMPLE_APPS): string => EXAMPLE_APPS[app];
