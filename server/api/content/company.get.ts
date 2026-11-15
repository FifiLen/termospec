import { queryCollection } from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const company = await queryCollection(event, "company").first();

  if (!company) {
    throw createError({ statusCode: 404, statusMessage: "Brak danych firmy" });
  }

  return {
    id: company.id,
    legalName: company.legalName,
    address: company.address,
    phone: company.phone,
    fax: company.fax,
    email: company.email,
    serviceHotline: company.serviceHotline,
    registry: company.registry,
  };
});
