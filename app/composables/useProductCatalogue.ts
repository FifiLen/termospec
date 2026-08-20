import type { ProductNavigationCategory } from "~~/types/navigation";
import type { CatalogueProductRecord } from "~/utils/product-catalogue";
import { mergeProductsIntoCatalogue } from "~/utils/product-catalogue";

export const useProductCatalogue = (
  baseCategories: Ref<ProductNavigationCategory[]>,
  publishedProducts?: Ref<CatalogueProductRecord[] | null | undefined>,
) => {
  const config = useRuntimeConfig();
  const studioProducts = useState<CatalogueProductRecord[]>(
    "studio-catalogue-products",
    () => [],
  );
  const isStudioPreview = useState("studio-catalogue-preview", () => false);

  return computed(() => {
    const products = config.public.studioEnabled && isStudioPreview.value
      ? studioProducts.value
      : (publishedProducts?.value ?? []);

    return mergeProductsIntoCatalogue(baseCategories.value, products);
  });
};
