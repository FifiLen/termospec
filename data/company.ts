// Brand constants for site-wide SEO metadata (Open Graph, JSON-LD).
// Contact details, address and registry data live in the Studio-editable
// `content/company.yml` (see `useCompany`).
export const company = {
  name: "Termospec",
  logo: "/termospec-logo.png",
  ogImage: {
    src: "/images/brand/og-termospec.jpg",
    width: 1200,
    height: 630,
    alt: "Termospec — systemy chłodzenia i wentylacji dla przemysłu",
  },
} as const;
