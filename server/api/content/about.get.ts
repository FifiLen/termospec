import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const about = await queryCollection(event, "about").first();

  if (!about) {
    throw createError({ statusCode: 404, statusMessage: "Brak treści strony O firmie" });
  }

  return {
    id: about.id,
    profile: about.profile,
    metrics: about.metrics,
    timeline: about.timeline,
  };
});
