// Company identity used by site-wide SEO metadata (Open Graph, JSON-LD).
// TODO: verify — legal name, address and phone await final client confirmation
// (see open questions in context/progress-tracker.md).
export const company = {
  name: "Termospec",
  legalName: "Termospec Sp. z o.o.",
  email: "biuro@termospec.pl",
  telephone: "+48 603 899 165",
  logo: "/termospec-logo.png",
  ogImage: {
    src: "/images/brand/og-termospec.jpg",
    width: 1200,
    height: 630,
    alt: "Termospec — systemy chłodzenia i wentylacji dla przemysłu",
  },
  address: {
    streetAddress: "ul. Górnicza 10",
    postalCode: "44-240",
    addressLocality: "Żory",
    addressCountry: "PL",
  },
} as const;
