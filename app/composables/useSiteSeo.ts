import { company } from "~~/data/company";
import type { CompanyContent } from "~/composables/useCompany";

// Site-wide canonical URL, Open Graph defaults and Organization JSON-LD.
export function useSiteSeo(contact: Ref<CompanyContent | null>) {
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
        innerHTML: computed(() => JSON.stringify(organizationJsonLd(siteUrl, contact.value))),
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

function organizationJsonLd(siteUrl: string, contact: CompanyContent | null) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: company.name,
    url: `${siteUrl}/`,
    logo: `${siteUrl}${company.logo}`,
    ...(contact && {
      legalName: contact.legalName,
      email: contact.email,
      telephone: contact.phone,
      ...(contact.fax && { faxNumber: contact.fax }),
      taxID: contact.registry.nip,
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.address.street,
        postalCode: contact.address.postalCode,
        addressLocality: contact.address.city,
        addressCountry: "PL",
      },
      contactPoint: [{
        "@type": "ContactPoint",
        contactType: "technical support",
        name: contact.serviceHotline.label,
        telephone: contact.serviceHotline.phone,
      }],
    }),
  };
}
