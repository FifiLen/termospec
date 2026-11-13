// Indexable public routes. Keep aligned with the prerendered routeRules in nuxt.config.ts;
// redirects (/o-nas, /kontakt, /zespol) and /studio-login are intentionally excluded.
export const sitemapRoutes = [
  "/",
  "/produkty",
  "/uslugi",
  "/o-firmie",
  "/dofinansowania",
  "/rodo",
  "/koncesja",
] as const;

export function siteOrigin(siteUrl: string) {
  return siteUrl.replace(/\/+$/, "");
}
