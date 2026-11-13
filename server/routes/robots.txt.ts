export default defineEventHandler((event) => {
  const origin = siteOrigin(useRuntimeConfig(event).public.siteUrl);

  setHeader(event, "content-type", "text/plain; charset=utf-8");

  return `User-agent: *
Disallow: /_studio
Disallow: /studio-login

Sitemap: ${origin}/sitemap.xml
`;
});
