import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
} from "~~/types/navigation";
import type {
  ProductDocument,
  ProductFamily,
  ProductMedia,
  ProductRelatedProject,
  ProductSection,
  ProductSpec,
  ProductTechnicalDataRow,
} from "~~/types/products";

interface CataloguePlacement {
  categorySlug?: string;
  groupSlug?: string;
  kind?: ProductNavigationEntry["kind"];
}

interface CatalogueProduct {
  title?: string;
  modelCode?: string;
  category?: string;
  status?: "draft" | "published";
  order?: number;
  fsPath?: string;
  stem?: string;
  cataloguePlacement?: CataloguePlacement;
  isFeatured?: boolean;
  lead?: string;
  shortDescription?: string;
  powerRange?: string;
  applications?: string[];
  components?: string[];
  features?: string[];
  serviceScope?: string[];
  specs?: ProductSpec[];
  technicalData?: ProductTechnicalDataRow[];
  technicalNotes?: string[];
  relatedProducts?: string[];
  sections?: ProductSection[];
  heroImage?: string;
  imageAlt?: string;
  headerSketch?: ProductMedia | null;
  gallery?: ProductMedia[];
  documents?: ProductDocument[];
  relatedProjects?: ProductRelatedProject[];
}

interface StudioCatalogueHost {
  document: {
    db: {
      list: () => Promise<CatalogueProduct[]>;
    };
  };
}

const toArray = <T>(value: T[] | null | undefined): T[] => {
  return Array.isArray(value) ? value : [];
};

const productSlug = (product: CatalogueProduct, fallbackTitle: string) => {
  const source = product.fsPath || product.stem || fallbackTitle;
  const filename = source.split("/").pop() || source;

  return filename
    .replace(/\.(?:ya?ml|json)$/i, "")
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

const toProductFamily = (
  product: CatalogueProduct,
  title: string,
): ProductFamily => {
  return {
    title,
    slug: productSlug(product, title),
    modelCode: product.modelCode?.trim() ?? "",
    category: product.category?.trim() || "Bez kategorii",
    order: Number(product.order ?? 100),
    isFeatured: product.isFeatured ?? false,
    lead: product.lead?.trim() ?? "",
    shortDescription: product.shortDescription?.trim() ?? "",
    powerRange: product.powerRange?.trim() ?? "",
    applications: toArray(product.applications),
    components: toArray(product.components),
    features: toArray(product.features),
    serviceScope: toArray(product.serviceScope),
    specs: toArray(product.specs),
    technicalData: toArray(product.technicalData)
      .filter((row) => row.label?.trim() && row.value?.trim())
      .map((row) => ({
        label: row.label.trim(),
        value: row.value.trim(),
        unit: row.unit?.trim() ?? "",
      })),
    technicalNotes: toArray(product.technicalNotes),
    relatedProducts: toArray(product.relatedProducts),
    sections: toArray(product.sections).map((section) => ({
      title: section.title,
      body: section.body,
      items: toArray(section.items),
    })),
    heroImage: product.heroImage?.trim() ?? "",
    imageAlt: product.imageAlt?.trim() ?? "",
    headerSketch: product.headerSketch ?? null,
    gallery: toArray(product.gallery),
    documents: toArray(product.documents).filter((document) => {
      return document.title?.trim() && document.file?.trim();
    }),
    relatedProjects: toArray(product.relatedProjects).map((project) => ({
      ...project,
      scope: toArray(project.scope),
    })),
  };
};

const mergeProductsIntoCatalogue = (
  categories: ProductNavigationCategory[],
  products: CatalogueProduct[],
) => {
  const merged = structuredClone(categories);
  const sortedProducts = [...products].sort((left, right) => {
    return (left.order ?? 100) - (right.order ?? 100)
      || (left.title ?? "").localeCompare(right.title ?? "", "pl");
  });

  for (const product of sortedProducts) {
    const title = product.title?.trim();
    const placement = product.cataloguePlacement;

    if (!title || !placement?.categorySlug) {
      continue;
    }

    const category = merged.find((item) => item.slug === placement.categorySlug);

    if (!category) {
      continue;
    }

    const targetEntries = placement.groupSlug
      ? category.groups.find((group) => group.slug === placement.groupSlug)?.entries
      : category.entries;

    if (!targetEntries) {
      continue;
    }

    const alreadyListed = targetEntries.some((entry) => {
      return entry.label.localeCompare(title, "pl", { sensitivity: "base" }) === 0;
    });

    const details = toProductFamily(product, title);

    if (alreadyListed) {
      const existingEntry = targetEntries.find((entry) => {
        return entry.label.localeCompare(title, "pl", { sensitivity: "base" }) === 0;
      });

      if (existingEntry) {
        existingEntry.source = "product";
        existingEntry.isDraft = product.status !== "published";
        existingEntry.details = details;
      }
    } else {
      targetEntries.push({
        label: title,
        kind: placement.kind ?? "model",
        source: "product",
        isDraft: product.status !== "published",
        details,
      });
    }
  }

  return merged;
};

export const useProductCatalogue = (
  baseCategories: Ref<ProductNavigationCategory[]>,
) => {
  const studioProducts = useState<CatalogueProduct[]>(
    "studio-catalogue-products",
    () => [],
  );
  const isStudioPreview = useState("studio-catalogue-preview", () => false);

  const { data: publishedProducts } = useAsyncData(
    "published-catalogue-products",
    () => queryCollection("products")
      .where("status", "=", "published")
      .order("order", "ASC")
      .all(),
  );

  const refreshStudioProducts = async () => {
    const studioWindow = window as Window & {
      useStudioHost?: () => StudioCatalogueHost;
    };
    const host = studioWindow.useStudioHost?.();

    if (!host) {
      isStudioPreview.value = false;
      studioProducts.value = [];
      return;
    }

    isStudioPreview.value = true;
    studioProducts.value = (await host.document.db.list()).filter((document) => {
      return document.fsPath?.startsWith("products/");
    });
  };

  if (import.meta.client) {
    let refreshTimer: ReturnType<typeof window.setInterval> | undefined;

    onMounted(() => {
      void refreshStudioProducts();
      refreshTimer = window.setInterval(() => {
        void refreshStudioProducts();
      }, 1000);
      window.addEventListener("termospec:product-updated", refreshStudioProducts);
    });

    onBeforeUnmount(() => {
      if (refreshTimer) {
        window.clearInterval(refreshTimer);
      }
      window.removeEventListener("termospec:product-updated", refreshStudioProducts);
    });
  }

  return computed(() => {
    const products = isStudioPreview.value
      ? studioProducts.value
      : (publishedProducts.value ?? []);

    return mergeProductsIntoCatalogue(baseCategories.value, products);
  });
};
