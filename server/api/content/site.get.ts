import { queryCollection } from "@nuxt/content/server";
import { aboutProfile, aboutTimeline } from "../../../data/about";
import { fundingPage, fundingProjects } from "../../../data/dofinansowania";
import { homeScopeItems } from "../../../data/home";
import { rodoPage } from "../../../data/rodo";
import { orderServicesByLayout, serviceSlugFromPath } from "../../../data/services";

export default defineEventHandler(async (event) => {
  const [catalogue, company, services, realizations, home, products] = await Promise.all([
    queryCollection(event, "catalogue").first(),
    queryCollection(event, "company").first(),
    queryCollection(event, "services").all(),
    queryCollection(event, "realizations").order("order", "ASC").all(),
    queryCollection(event, "home").first(),
    queryCollection(event, "products").where("status", "=", "published").all(),
  ]);

  const searchSections = buildSearchSections({
    pages: { aboutProfile, aboutTimeline, fundingPage, fundingProjects, homeScopeItems, rodoPage },
    company: company ?? null,
    services: orderServicesByLayout(services.map((service) => ({
      ...service,
      slug: serviceSlugFromPath(service.stem),
    }))),
    realizations,
    heroSlides: home?.hero.slides ?? [],
    catalogue: catalogue?.categories ?? [],
    products,
  });

  return {
    catalogue,
    searchSections,
  };
});
