import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const seo = await queryCollection(event, "seo").first();

  if (!seo) {
    throw createError({ statusCode: 404, statusMessage: "Brak ustawień SEO" });
  }

  return {
    id: seo.id,
    stronaGlowna: seo.stronaGlowna,
    oFirmie: seo.oFirmie,
    uslugi: seo.uslugi,
    produkty: seo.produkty,
    dofinansowania: seo.dofinansowania,
    rodo: seo.rodo,
    koncesja: seo.koncesja,
  };
});
