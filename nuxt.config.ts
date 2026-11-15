import tailwindcss from '@tailwindcss/vite'

const studioMode = process.env.NUXT_STUDIO_ENABLED
const enableStudio = studioMode === '1'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  buildDir: '.nuxt',
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/image',
    ...(enableStudio ? ['nuxt-studio'] : []),
  ],
  plugins: enableStudio ? ['~/plugins/studio-preview.client'] : [],
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  runtimeConfig: {
    studioLogin: {
      email: '',
      passwordHash: '',
      displayName: 'Redaktor Termospec',
    },
    public: {
      studioEnabled: enableStudio,
      // Production origin for canonical, Open Graph, robots.txt and sitemap URLs.
      // Override per environment with NUXT_PUBLIC_SITE_URL.
      siteUrl: 'https://termospec.pl',
    },
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'pl' },
      titleTemplate: '%s | Termospec',
    },
  },
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('/node_modules/tailwind-merge/')) {
              return 'style-runtime'
            }
          },
        },
      },
    },
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'gsap',
        'lenis',
        'zod/v4',
      ],
    },
    plugins: [
      tailwindcss(),
    ],
  },
  // @ts-ignore Nuxt Studio augments this config only in Studio-enabled builds.
  studio: {
    route: '/_studio',
    i18n: {
      defaultLocale: 'pl',
    },
  },
  image: {
    domains: ['images.unsplash.com'],
    quality: 80,
    // Tailwind defaults plus `xs` (small phones) and `3xl` (full-bleed 1920 px hero).
    // Vercel image optimization only serves these widths.
    screens: {
      'xs': 480,
      'sm': 640,
      'md': 768,
      'lg': 1024,
      'xl': 1280,
      '2xl': 1536,
      '3xl': 1920,
    },
  },
  // Host Grotesk is downloaded at build time and served from /_fonts (no Google Fonts request).
  fonts: {
    families: [{
      name: 'Host Grotesk',
      provider: 'google',
      weights: ['300 800'],
      styles: ['normal'],
      // Polish text needs both subsets; @nuxt/fonts would preload only one of them,
      // so rely on font-display: swap with the generated metric fallbacks instead.
      subsets: ['latin', 'latin-ext'],
    }],
  },
  icon: {
    provider: 'none',
    serverBundle: false,
    clientBundle: {
      scan: true,
      icons: [
        'lucide:accessibility',
        'lucide:chevron-down',
        'lucide:file',
        'lucide:file-json',
        'lucide:hash',
        'lucide:search',
        'lucide:x',
      ],
    },
  },
  nitro: {
    handlers: enableStudio
      ? [{
          route: '/api/studio/login',
          method: 'post',
          handler: './server/studio/login.post.ts',
        }]
      : [],
    prerender: {
      routes: ['/robots.txt', '/sitemap.xml'],
      ignore: [/^\/__nuxt_content\//],
    },
  },
  routeRules: {
    '/': { prerender: true },
    '/produkty': { prerender: true },
    '/uslugi': { prerender: true },
    '/o-firmie': { prerender: true },
    '/o-nas': { redirect: { to: '/o-firmie', statusCode: 301 } },
    '/kontakt': { redirect: { to: '/#kontakt', statusCode: 301 } },
    '/dofinansowania': { prerender: true },
    '/rodo': { prerender: true },
    '/koncesja': { prerender: true },
    '/studio-login': {
      headers: {
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow',
      },
    },
  },
  compatibilityDate: '2024-04-03',
})
