import { company } from "~~/data/company";

// Site-wide canonical URL, Open Graph defaults and Organization JSON-LD.
export function useSiteSeo() {
  const route = useRoute();
  const siteUrl = useRuntimeConfig().public.siteUrl.replace(/\/+$/, "");

  const canonicalUrl = computed(() => {
    const path = route.path === "/" ? "/" : route.path.replace(/\/+$/, "");
    return `${siteUrl}${path}`;
  });

  useHead({
    link: [{ rel: "canonical", href: canonicalUrl }],
    script: [
      {
        type: "application/ld+json",
        key: "organization-jsonld",
        innerHTML: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": `${siteUrl}/#organization`,
          name: company.name,
          legalName: company.legalName,
          url: `${siteUrl}/`,
          logo: `${siteUrl}${company.logo}`,
          email: company.email,
          telephone: company.telephone,
          address: {
            "@type": "PostalAddress",
            ...company.address,
          },
        }),
      },
    ],
  });

  useSeoMeta({
    ogType: "website",
    ogSiteName: company.name,
    ogLocale: "pl_PL",
    ogUrl: canonicalUrl,
    ogImage: `${siteUrl}${company.ogImage.src}`,
    ogImageWidth: company.ogImage.width,
    ogImageHeight: company.ogImage.height,
    ogImageAlt: company.ogImage.alt,
    twitterCard: "summary_large_image",
  });
}
