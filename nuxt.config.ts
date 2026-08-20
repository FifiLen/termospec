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
  plugins: enableStudio ? ['~/plugins/studio-products.client'] : [],
  runtimeConfig: {
    studioLogin: {
      email: '',
      passwordHash: '',
      displayName: 'Redaktor Termospec',
    },
    public: {
      studioEnabled: enableStudio,
    },
  },
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  app: {
    head: {
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,400;9..40,500;9..40,600;9..40,700;9..40,800&family=Manrope:wght@500;600;700;800&display=swap',
        },
      ],
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
    '/studio-login': {
      headers: {
        'cache-control': 'no-store',
        'x-robots-tag': 'noindex, nofollow',
      },
    },
  },
  compatibilityDate: '2024-04-03',
})
