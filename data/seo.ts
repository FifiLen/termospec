// Public route of each page entry in the Studio-editable `content/seo.yml`.
export const seoPageRoutes = {
  stronaGlowna: "/",
  oFirmie: "/o-firmie",
  uslugi: "/uslugi",
  produkty: "/produkty",
  dofinansowania: "/dofinansowania",
  rodo: "/rodo",
  koncesja: "/koncesja",
} as const;

// The homepage title already names the brand, so it skips the `%s | Termospec` template.
export const standaloneSeoTitlePages = ["stronaGlowna"] as const;
