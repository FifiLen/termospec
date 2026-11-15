import { queryCollection } from "@nuxt/content/server";
import { orderServicesByLayout, serviceSlugFromPath } from "../../../data/services";

export default defineEventHandler(async (event) => {
  const services = await queryCollection(event, "services").all();

  return orderServicesByLayout(services.map((service) => ({
    id: service.id,
    slug: serviceSlugFromPath(service.stem),
    label: service.label,
    intro: service.intro,
    sections: service.sections,
    machines: service.machines,
    closing: service.closing,
    cta: service.cta,
  })));
});
