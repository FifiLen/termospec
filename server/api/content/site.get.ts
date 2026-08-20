import {
  queryCollection,
  queryCollectionNavigation,
  queryCollectionSearchSections,
} from "@nuxt/content/server";

export default defineEventHandler(async (event) => {
  const [navigation, catalogue, searchSections] = await Promise.all([
    queryCollectionNavigation(event, "pages"),
    queryCollection(event, "catalogue").first(),
    queryCollectionSearchSections(event, "pages"),
  ]);

  return {
    navigation,
    catalogue,
    searchSections,
  };
});
