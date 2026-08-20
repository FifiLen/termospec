import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler((event) => {
  return queryCollection(event, "products")
    .where("status", "=", "published")
    .order("order", "ASC")
    .all();
});
