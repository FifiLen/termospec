<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationGroup,
} from "~~/types/navigation";
import type { CatalogueProductRecord } from "~/utils/product-catalogue";
import {
  filterCatalogueCategories,
  normalizeCatalogueCategories,
  resolveCatalogueSelection,
  selectableCatalogueEntries,
} from "~/utils/product-catalogue";

const { data: siteContent } = await useFetch("/api/content/site", {
  key: "site-content",
});

const baseProductNavigation = computed<ProductNavigationCategory[]>(() => {
  return normalizeCatalogueCategories(siteContent.value?.catalogue?.categories);
});

const { data: publishedProducts } = await useFetch("/api/content/products", {
  key: "product-catalogue-page-products",
});

const catalogueProducts = computed<CatalogueProductRecord[]>(() => {
  return publishedProducts.value ?? [];
});

const productNavigation = useProductCatalogue(
  baseProductNavigation,
  catalogueProducts,
);

const searchQuery = ref("");
const filteredCategories = computed(() => {
  return filterCatalogueCategories(productNavigation.value, searchQuery.value);
});

const activeCategorySlug = ref("");
const expandedCategorySlug = ref("");
const activeGroupSlug = ref("");
const expandedGroupSlug = ref("");
const activeEntryId = ref("");

const activeCategory = computed(() => {
  return filteredCategories.value.find((category) => {
    return category.slug === activeCategorySlug.value;
  }) ?? filteredCategories.value[0];
});

const activeGroup = computed(() => {
  const category = activeCategory.value;

  if (!category?.groups.length) {
    return undefined;
  }

  return category.groups.find((group) => {
    return group.slug === activeGroupSlug.value;
  }) ?? category.groups[0];
});

const firstEntryId = (
  category: ProductNavigationCategory,
  group?: ProductNavigationGroup,
) => {
  const entries = selectableCatalogueEntries(group?.entries ?? category.entries);

  return entries[0]?.id ?? "";
};

const replaceHash = (slug: string) => {
  if (import.meta.client) {
    window.history.replaceState(null, "", `#${slug}`);
  }
};

const focusCatalogue = async () => {
  await nextTick();

  if (!import.meta.client || !activeCategory.value) {
    return;
  }

  document.getElementById(activeCategory.value.slug)?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const activateCategory = async (
  categorySlug: string,
  shouldFocus = true,
) => {
  const category = filteredCategories.value.find((item) => {
    return item.slug === categorySlug;
  });

  if (!category) {
    return;
  }

  activeCategorySlug.value = category.slug;
  expandedCategorySlug.value = category.slug;
  activeGroupSlug.value = category.groups[0]?.slug ?? "";
  expandedGroupSlug.value = activeGroupSlug.value;
  activeEntryId.value = firstEntryId(category, category.groups[0]);
  replaceHash(activeGroupSlug.value || category.slug);

  if (shouldFocus) {
    await focusCatalogue();
  }
};

const activateGroup = async (
  categorySlug: string,
  groupSlug: string,
  shouldFocus = true,
) => {
  const category = filteredCategories.value.find((item) => {
    return item.slug === categorySlug;
  });
  const group = category?.groups.find((item) => item.slug === groupSlug);

  if (!category || !group) {
    return;
  }

  activeCategorySlug.value = category.slug;
  expandedCategorySlug.value = category.slug;
  activeGroupSlug.value = group.slug;
  expandedGroupSlug.value = group.slug;
  activeEntryId.value = firstEntryId(category, group);
  replaceHash(group.slug);

  if (shouldFocus) {
    await focusCatalogue();
  }
};

const setCategoryExpanded = (
  categorySlug: string,
  open: boolean,
) => {
  expandedCategorySlug.value = open ? categorySlug : "";

  if (open) {
    void activateCategory(categorySlug, false);
  }
};

const setGroupExpanded = (
  categorySlug: string,
  groupSlug: string,
  open: boolean,
) => {
  expandedGroupSlug.value = open ? groupSlug : "";

  if (open) {
    void activateGroup(categorySlug, groupSlug, false);
  }
};

const activateEntry = async (
  categorySlug: string,
  groupSlug: string,
  entryId: string,
) => {
  if (groupSlug) {
    await activateGroup(categorySlug, groupSlug, false);
  } else {
    await activateCategory(categorySlug, false);
  }

  activeEntryId.value = entryId;
  replaceHash(entryId);
  await focusCatalogue();
};

const syncSelectedEntry = (payload: {
  groupSlug: string;
  entryId: string;
}) => {
  activeEntryId.value = payload.entryId;
  replaceHash(payload.entryId);
};

watch(
  filteredCategories,
  (categories) => {
    const selection = resolveCatalogueSelection(categories, {
      categorySlug: activeCategorySlug.value,
      groupSlug: activeGroupSlug.value,
      entryId: activeEntryId.value,
    });

    if (!selection) {
      activeCategorySlug.value = "";
      activeGroupSlug.value = "";
      activeEntryId.value = "";
      expandedCategorySlug.value = "";
      expandedGroupSlug.value = "";
      return;
    }

    const categoryChanged = selection.categorySlug !== activeCategorySlug.value;
    const groupChanged = selection.groupSlug !== activeGroupSlug.value;

    activeCategorySlug.value = selection.categorySlug;
    activeGroupSlug.value = selection.groupSlug;
    activeEntryId.value = selection.entryId;

    if (categoryChanged) {
      expandedCategorySlug.value = selection.categorySlug;
    }

    if (categoryChanged || groupChanged) {
      expandedGroupSlug.value = selection.groupSlug;
    }
  },
  { immediate: true },
);

const route = useRoute();
const syncRouteSelection = () => {
  const hash = route.hash.replace("#", "");
  const category = productNavigation.value.find((item) => {
    return item.slug === hash
      || item.entries.some((entry) => entry.id === hash)
      || item.groups.some((group) => {
        return group.slug === hash || group.entries.some((entry) => entry.id === hash);
      });
  });

  if (!category) {
    return;
  }

  searchQuery.value = "";
  const group = category.groups.find((item) => item.slug === hash);
  const entryGroup = category.groups.find((item) => {
    return item.entries.some((entry) => entry.id === hash);
  });

  if (entryGroup) {
    void activateGroup(category.slug, entryGroup.slug, false).then(() => {
      activeEntryId.value = hash;
      replaceHash(hash);
    });
  } else if (category.entries.some((entry) => entry.id === hash)) {
    void activateCategory(category.slug, false).then(() => {
      activeEntryId.value = hash;
      replaceHash(hash);
    });
  } else if (group) {
    void activateGroup(category.slug, group.slug, false);
  } else {
    void activateCategory(category.slug, false);
  }
};

onMounted(syncRouteSelection);
watch(() => route.hash, syncRouteSelection);

useSeoMeta({
  title: "Produkty | Termospec",
  description:
    "Katalog produktów Termospec: agregaty chłodnicze, chłodnice powietrza, parowniki, chłodnice wyparne, systemy redukcji ciśnienia, zbiorniki, sterowanie i wentylatory.",
});
</script>

<template>
  <main class="min-h-[100svh] bg-surface pb-[clamp(3.5rem,4.1vw,5rem)] pt-[calc(var(--site-header-height)+clamp(1.5rem,2.5vw,3rem))] text-ink">
    <h1 class="sr-only">Katalog produktów</h1>

    <section
      class="design-shell grid items-start gap-5 lg:grid-cols-[clamp(18rem,19vw,23rem)_minmax(0,1fr)] lg:gap-[clamp(1.25rem,1.6vw,1.9rem)]"
      aria-label="Katalog produktów"
    >
      <ProductCatalogueIndex
        v-model:search-query="searchQuery"
        :categories="filteredCategories"
        :active-category-slug="activeCategorySlug"
        :active-group-slug="activeGroupSlug"
        :active-entry-id="activeEntryId"
        :expanded-category-slug="expandedCategorySlug"
        :expanded-group-slug="expandedGroupSlug"
        class="lg:sticky lg:top-[calc(var(--site-header-height)+1.5rem)] lg:max-h-[calc(100svh-var(--site-header-height)-3rem)]"
        @category-expanded="setCategoryExpanded"
        @group-expanded="setGroupExpanded"
        @select-entry="activateEntry"
      />

      <div class="min-w-0 overflow-clip rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-white">
        <ProductCatalogueCategory
          v-if="activeCategory"
          :key="`${activeCategory.slug}-${activeGroup?.slug || 'category'}`"
          :category="activeCategory"
          :active-group-slug="activeGroup?.slug"
          :active-entry-id="activeEntryId"
          @select-entry="syncSelectedEntry"
        />

        <div v-else class="min-h-[22rem] bg-white p-6 md:p-8 lg:p-10" role="status">
          <p class="border-s-2 border-brand ps-4 text-base font-extrabold text-ink/62">
            Brak kategorii lub typów pasujących do wyszukiwania.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
