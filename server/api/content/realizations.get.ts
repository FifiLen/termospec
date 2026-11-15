import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const realizations = await queryCollection(event, "realizations")
    .order("order", "ASC")
    .all();

  return realizations.map((realization) => ({
    id: realization.id,
    title: realization.title,
    industry: realization.industry,
    description: realization.description,
    image: realization.image,
    order: realization.order,
  }));
});
