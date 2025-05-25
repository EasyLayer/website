import { resolve, basename } from 'node:path';
import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import { SOCIAL_URLS, BLOG_URLS, DOCS_URLS } from './src/urls';

const isProduction = process.env.NODE_ENV === 'production'

const config: Config = {
  title: 'EasyLayer.io',
  tagline: 'Self hosted tools for integrating crypto processing and data indexing into your business',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://easylayer.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'EasyLayer', // Usually your GitHub org/user name.
  projectName: 'easylayer', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/img/favicon-32x32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/img/favicon-16x16.png',
      },
    },
    ...(isProduction ? [{
      tagName: 'noscript',
      attributes: {},
      innerHTML: `
        <img height="1" width="1" style="display:none"
          src="https://www.facebook.com/tr?id=994272692834568&ev=PageView&noscript=1"/>
      `
    }] : [])
  ],

  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: 'docs',
          sidebarPath: './sidebars.ts',
          sidebarCollapsible: true,
          async sidebarItemsGenerator({ defaultSidebarItemsGenerator, ...rest }) {
            const items = await defaultSidebarItemsGenerator(rest);
            function transform(item) {
              if (item.type === 'doc') {
                const name = basename(item.id);
                return { ...item, label: name };
              }
              if (item.type === 'category') {
                return {
                  ...item,
                  items: item.items.map(transform),
                };
              }
              return item;
            }

            return items.map(transform);
          },
        },
        blog: {
          path: 'blog',
          showReadingTime: true,
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'All our posts',
          postsPerPage: 'ALL'
        },
        theme: {
          // Allows you to set the path to your custom CSS file, allowing you to customize site styles.
          customCss: [resolve('./src/css/custom.css')],
        },
        ...(!isProduction ? {} : {
          gtag: {
            trackingID: 'G-QWGMMVZT3B',
            anonymizeIP: true,
          },
        })
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    announcementBar: {
      id: 'announcement-bar-id',
      content:
        '<strong>Bitcoin Crawler beta is here!</strong> 🚀 ' +
        `<a href="${BLOG_URLS.BASE}" target="_blank" rel="noopener" ` +
        'style="text-decoration: underline; font-weight: bold;">See what\'s new ⚙️ →</a>',
      backgroundColor: '#22d3ee',
      textColor: '#ffffff',
      isCloseable: false,
    },
    navbar: {
      title: 'EasyLayer',
      logo: {
        alt: 'EasyLayer Logo',
        src: 'img/logo.png',
        href: 'https://easylayer.io/',
        target: '_self',
      },
      items: [
        {
          type: 'doc',
          docId: 'overview/intro',
          label: 'Docs', 
          // position: 'left',
          className: 'navbar-item-docs'
        },
        {
          to: BLOG_URLS.BASE,
          label: 'Blog',
          position: 'left',
        },
        {
          href: SOCIAL_URLS.DISCUSSIONS,
          label: 'Discussions',
          position: 'right',
        },
        {
          href: SOCIAL_URLS.GITHUB,
          className: 'navbar-item-github',
          position: 'right',
        },
        {
          href: SOCIAL_URLS.TWITTER,
          className: 'navbar-item-twitter',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: DOCS_URLS.SECTIONS.GET_STARTED,
            },
            {
              label: 'Overview',
              to: DOCS_URLS.SECTIONS.OVERVIEW,
            },
            {
              label: 'Bitcoin Crawler',
              to: DOCS_URLS.SECTIONS.BITCOIN_CRAWLER,
            },
            {
              label: 'Transport SDK',
              to: DOCS_URLS.SECTIONS.TRANSPORT_SDK,
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Discussion',
              href: SOCIAL_URLS.DISCUSSIONS,
            },
            {
              label: 'Twitter',
              href: SOCIAL_URLS.TWITTER,
            },
            {
              label: 'GitHub',
              href: SOCIAL_URLS.GITHUB,
            },
          ],
        },
        {
          title: 'Company',
          items: [
            {
              label: 'Blog',
              to: BLOG_URLS.BASE,
            },
            {
              label: 'Privacy Policy',
              to: 'policy',
            },
            {
              label: 'Security Policy',
              to: 'security',
            },
            {
              label: 'Terms & Conditions',
              to: 'terms',
            }
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} EasyLayer Team`,
    },
    prism: {
      additionalLanguages: ['bash', 'shell-session'],
      theme: prismThemes.jettwaveLight,
      darkTheme: prismThemes.jettwaveDark,
    },
    image: 'img/el_twitter_default.png',
    metadata: [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@easylayer_io' },
      { name: 'twitter:creator', content: '@easylayer_io' },
      { name: 'twitter:title', content: 'EasyLayer.io' },
      { name: 'twitter:description', content: 'Self hosted tools for integrating crypto processing and data indexing into your business' },
      { name: 'twitter:image', content: 'https://easylayer.io/img/el_twitter_default.png' },
      { name: 'description', content: 'Self hosted tools for integrating crypto processing and data indexing into your business' },
      { name: 'keywords', content: 'crypto, blockchain, bitcoin, ethereum, data indexing, self hosted, tools' },
      { name: 'author', content: 'EasyLayer Team' },
      { name: 'robots', content: 'index, follow' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: 'EasyLayer.io' },
      { property: 'og:description', content: 'Self hosted tools for integrating crypto processing and data indexing into your business' },
      { property: 'og:image', content: 'https://easylayer.io/img/el_twitter_default.png' },
      { property: 'og:url', content: 'https://easylayer.io' },
      { property: 'og:site_name', content: 'EasyLayer.io' },
    ],
  } satisfies Preset.ThemeConfig,

  plugins: [
    async function myPlugin(context, options) {
      return {
        name: 'tailwindcss',
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(tailwindcss);
          postcssOptions.plugins.push(autoprefixer);
          return postcssOptions
        },
      }
    },
    function ignoreBareUrlsInMd() {
      return {
        name: 'ignore-bare-urls-in-md',
        configureWebpack() {
          return {
            module: {
              rules: [
                {
                  test: /\.md$/,
                  include: resolve(__dirname, 'docs'),
                  enforce: 'pre',
                  use: [
                    {
                      loader: require.resolve('string-replace-loader'),
                      options: {
                        // Search for all http://… and https://…, without excluding the brackets at the end
                        search: /(https?:\/\/[^\s\)]+)/g,
                        replace(match, p1, offset, input) {
                          // if there is "](" before the URL, then it is [text](url) - skip it
                          const before = input.slice(offset - 2, offset);
                          if (before === '](') {
                            return match;
                          }
                          // otherwise we wrap it in backticks
                          return '`' + match + '`';
                        },
                      },
                    },
                  ],
                },
              ],
            },
          };
        },
      };
    },
  ],
  scripts: getScripts()
};

function getScripts() {
  const scripts = [
    // 
  ]

  if (isProduction) {
    scripts.push(
      // Facebook Pixel Code
      {
        src: 'https://connect.facebook.net/en_US/fbevents.js',
        async: true,
        defer: true,
      },
      {
        src: '/js/fb-pixel-init.js',
        head: true,
      }
    );
  }
  return scripts
}


export default config;