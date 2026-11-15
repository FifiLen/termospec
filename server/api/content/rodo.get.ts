import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const record = await queryCollection(event, "rodo").first();

  if (!record) {
    throw createError({ statusCode: 404, statusMessage: "Brak treści klauzuli RODO" });
  }

  return {
    id: record.id,
    title: record.title,
    intro: record.intro,
    items: record.items,
  };
});
