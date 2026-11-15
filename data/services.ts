// Service copy lives in the Studio-editable `content/services/<slug>.yml` files.
// Each service has its own designed layout on /uslugi, so the page and the
// services menu show only these slugs, in this order. A new service file stays
// hidden until it gets a layout here and in `app/pages/uslugi.vue`.
export const serviceLayoutSlugs = [
  "projektowanie-systemow-klimatyzacji-i-wentylacji",
  "serwis-24-7",
  "remonty-urzadzen-chlodniczych",
  "obrobka-metali-skrawaniem-i-laserem",
  "uslugi-spawalnicze-i-konstrukcje-stalowe",
] as const;

export type ServiceLayoutSlug = (typeof serviceLayoutSlugs)[number];

export const orderServicesByLayout = <T extends { slug: string }>(services: T[]) => {
  return serviceLayoutSlugs.flatMap((slug) => {
    const service = services.find((item) => item.slug === slug);
    return service ? [service] : [];
  });
};

export const serviceSlugFromPath = (path: string) => {
  return path.split("/").pop()?.replace(/\.ya?ml$/, "") ?? "";
};
