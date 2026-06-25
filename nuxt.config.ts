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
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lenis',
      ],
    },
    plugins: [
      tailwindcss(),
    ],
  },
  studio: {
    route: '/_studio',
  },
  image: {
    domains: ['images.unsplash.com'],
  },
  routeRules: {
    '/': { prerender: true },
    '/produkty': { prerender: true },
    '/o-firmie': { prerender: true },
    '/o-nas': { redirect: { to: '/o-firmie', statusCode: 301 } },
    '/kontakt': { redirect: { to: '/#kontakt', statusCode: 301 } },
    '/dofinansowania': { prerender: true },
    '/rodo': { prerender: true },
  },
  compatibilityDate: '2024-04-03',
})
