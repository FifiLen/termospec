import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const record = await queryCollection(event, "funding").first();

  if (!record) {
    throw createError({ statusCode: 404, statusMessage: "Brak treści strony Dofinansowania" });
  }

  return {
    id: record.id,
    title: record.title,
    projects: record.projects,
  };
});
