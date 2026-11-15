import { queryCollection } from "@nuxt/content/server";
import { seoPageRoutes } from "../../../data/seo";
import { orderServicesByLayout, serviceSlugFromPath } from "../../../data/services";

export default defineEventHandler(async (event) => {
  const [catalogue, about, company, services, realizations, home, products, seo, funding, rodo] = await Promise.all([
    queryCollection(event, "catalogue").first(),
    queryCollection(event, "about").first(),
    queryCollection(event, "company").first(),
    queryCollection(event, "services").all(),
    queryCollection(event, "realizations").order("order", "ASC").all(),
    queryCollection(event, "home").first(),
    queryCollection(event, "products").where("status", "=", "published").all(),
    queryCollection(event, "seo").first(),
    queryCollection(event, "funding").first(),
    queryCollection(event, "rodo").first(),
  ]);

  const searchSections = buildSearchSections({
    funding: funding ?? null,
    rodo: rodo ?? null,
    pageDescriptions: Object.fromEntries(Object.entries(seoPageRoutes).map(([key, route]) => {
      return [route, seo?.[key as keyof typeof seoPageRoutes]?.opis ?? ""];
    })),
    about: about ?? null,
    company: company ?? null,
    services: orderServicesByLayout(services.map((service) => ({
      ...service,
      slug: serviceSlugFromPath(service.stem),
    }))),
    realizations,
    heroSlides: home?.hero.slides ?? [],
    scopeItems: home?.scope.items ?? [],
    catalogue: catalogue?.categories ?? [],
    products,
  });

  return {
    catalogue,
    searchSections,
  };
});
