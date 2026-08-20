import type { ProductData } from "~~/schemas/product";
import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
  ProductNavigationGroup,
} from "~~/types/navigation";
import type {
  ProductFamily,
  ProductMedia,
  ProductRelatedProject,
  ProductSection,
  ProductTechnicalDataRow,
} from "~~/types/products";

export type CatalogueProductRecord = Partial<ProductData> & {
  fsPath?: string;
  stem?: string;
};

export type CatalogueCategoryRecord = Omit<
  ProductNavigationCategory,
  "entries" | "groups"
> & {
  entries?: ProductNavigationEntry[];
  groups?: Array<Omit<ProductNavigationGroup, "entries"> & {
    entries?: ProductNavigationEntry[];
  }>;
};

export const normalizeCatalogueCategories = (
  categories: CatalogueCategoryRecord[] | null | undefined,
): ProductNavigationCategory[] => {
  return (categories ?? []).map((category) => ({
    ...category,
    entries: category.entries ?? [],
    groups: (category.groups ?? []).map((group) => ({
      ...group,
      entries: group.entries ?? [],
    })),
  }));
};

const toArray = <T>(value: T[] | null | undefined): T[] => {
  return Array.isArray(value) ? value : [];
};

export const normalizeCatalogueText = (value: string) => {
  return value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l");
};

export const productSlug = (
  product: CatalogueProductRecord,
  fallbackTitle: string,
) => {
  const source = product.fsPath || product.stem || fallbackTitle;
  const filename = source.split("/").pop() || source;

  return normalizeCatalogueText(filename)
    .replace(/\.(?:ya?ml|json)$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
};

export const toProductFamily = (
  product: CatalogueProductRecord,
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
      .map<ProductTechnicalDataRow>((row) => ({
        label: row.label.trim(),
        value: row.value.trim(),
        unit: row.unit?.trim() ?? "",
      })),
    technicalNotes: toArray(product.technicalNotes),
    relatedProducts: toArray(product.relatedProducts),
    sections: toArray(product.sections).map<ProductSection>((section) => ({
      title: section.title,
      body: section.body,
      items: toArray(section.items),
    })),
    heroImage: product.heroImage?.trim() ?? "",
    imageAlt: product.imageAlt?.trim() ?? "",
    headerSketch: (product.headerSketch as ProductMedia | null | undefined) ?? null,
    gallery: toArray(product.gallery) as ProductMedia[],
    documents: toArray(product.documents).filter((document) => {
      return document.title?.trim() && document.file?.trim();
    }),
    relatedProjects: toArray(product.relatedProjects).map<ProductRelatedProject>(
      (project) => ({
        ...project,
        scope: toArray(project.scope),
      }),
    ),
  };
};

export const mergeProductsIntoCatalogue = (
  categories: ProductNavigationCategory[],
  products: CatalogueProductRecord[],
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

    const stableEntryId = placement.entryId?.trim() || productSlug(product, title);
    const existingEntry = targetEntries.find((entry) => entry.id === stableEntryId)
      ?? (!placement.entryId
        ? targetEntries.find((entry) => {
            return entry.label.localeCompare(title, "pl", {
              sensitivity: "base",
            }) === 0;
          })
        : undefined);
    const details = toProductFamily(product, title);

    if (existingEntry) {
      existingEntry.source = "product";
      existingEntry.isDraft = product.status !== "published";
      existingEntry.details = details;
      continue;
    }

    targetEntries.push({
      id: stableEntryId,
      label: title,
      kind: placement.kind ?? "model",
      source: "product",
      isDraft: product.status !== "published",
      details,
    });
  }

  return merged;
};

export const selectableCatalogueEntries = (
  entries: ProductNavigationEntry[],
) => {
  return entries.filter((entry) => entry.kind !== "description");
};

export interface CatalogueSelectionState {
  categorySlug: string;
  groupSlug: string;
  entryId: string;
}

export const resolveCatalogueSelection = (
  categories: ProductNavigationCategory[],
  current: CatalogueSelectionState,
): CatalogueSelectionState | null => {
  const category = categories.find((item) => {
    return item.slug === current.categorySlug;
  }) ?? categories[0];

  if (!category) {
    return null;
  }

  const group = category.groups.find((item) => {
    return item.slug === current.groupSlug;
  }) ?? category.groups[0];
  const entries = selectableCatalogueEntries(group?.entries ?? category.entries);
  const entryId = entries.some((entry) => entry.id === current.entryId)
    ? current.entryId
    : (entries[0]?.id ?? "");

  return {
    categorySlug: category.slug,
    groupSlug: group?.slug ?? "",
    entryId,
  };
};
