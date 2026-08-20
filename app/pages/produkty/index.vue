<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationGroup,
} from "~~/types/navigation";
import type { CatalogueProductRecord } from "~/utils/product-catalogue";
import {
  normalizeCatalogueText,
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

const normalizeText = (value: string) => {
  return normalizeCatalogueText(value);
};

const filterGroup = (
  group: ProductNavigationGroup,
  query: string,
): ProductNavigationGroup | null => {
  if (normalizeText(group.label).includes(query)) {
    return group;
  }

  const entries = group.entries.filter((entry) => {
    return normalizeText(entry.label).includes(query);
  });

  return entries.length ? { ...group, entries } : null;
};

const searchQuery = ref("");
const normalizedSearch = computed(() => normalizeText(searchQuery.value.trim()));

const filteredCategories = computed<ProductNavigationCategory[]>(() => {
  const query = normalizedSearch.value;

  if (!query) {
    return productNavigation.value;
  }

  return productNavigation.value.flatMap((category) => {
    if (normalizeText(category.label).includes(query)) {
      return [category];
    }

    const entries = category.entries.filter((entry) => {
      return normalizeText(entry.label).includes(query);
    });
    const groups = category.groups
      .map((group) => filterGroup(group, query))
      .filter((group): group is ProductNavigationGroup => Boolean(group));

    return entries.length || groups.length
      ? [{ ...category, entries, groups }]
      : [];
  });
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

onMounted(() => {
  const hash = window.location.hash.replace("#", "");
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
});

useSeoMeta({
  title: "Produkty | Termospec",
  description:
    "Katalog produktów Termospec: agregaty chłodnicze, chłodnice powietrza, parowniki, chłodnice wyparne, systemy redukcji ciśnienia, zbiorniki, sterowanie i wentylatory.",
});
</script>

<template>
  <main class="min-h-[100svh] bg-line pt-16 text-ink">
    <h1 class="sr-only">Katalog produktów</h1>

    <section
      class="grid min-h-[calc(100svh-4rem)] gap-px bg-line sm:grid-cols-[20rem_minmax(0,1fr)] sm:items-start"
      aria-label="Katalog produktów"
    >
      <aside
        class="bg-white sm:sticky sm:top-16 sm:h-[calc(100svh-4rem)] sm:overflow-y-auto"
        aria-label="Indeks katalogu produktów"
      >
        <div class="sticky top-0 z-20 border-b border-line bg-white px-4 py-4">
          <label for="product-search" class="sr-only">
            Szukaj w katalogu produktów
          </label>
          <div class="relative">
            <UIcon
              name="i-lucide-search"
              class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-brand"
              aria-hidden="true"
            />
            <input
              id="product-search"
              v-model="searchQuery"
              type="search"
              class="h-12 w-full border border-line bg-white pl-10 pr-3 text-base font-bold text-ink outline-none transition placeholder:text-ink/42 focus:border-brand"
              placeholder="Szukaj typu lub kategorii"
              autocomplete="off"
            />
          </div>
        </div>

        <nav aria-label="Główne kategorie produktów">
          <div
            v-for="category in filteredCategories"
            :key="category.slug"
            class="border-b border-line"
          >
            <UCollapsible
              :open="expandedCategorySlug === category.slug"
              :unmount-on-hide="false"
              :ui="{
                content:
                  'overflow-hidden motion-reduce:animate-none motion-reduce:transition-none',
              }"
              @update:open="setCategoryExpanded(category.slug, $event)"
            >
              <template #default="{ open }">
                <button
                  type="button"
                  class="group grid w-full grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 px-4 py-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                  :class="
                    activeCategorySlug === category.slug || open
                      ? 'text-brand'
                      : 'text-ink/62 hover:text-brand'
                  "
                  :aria-current="activeCategorySlug === category.slug ? 'location' : undefined"
                >
                  <span class="whitespace-nowrap text-[0.8rem] font-black uppercase leading-5">
                    {{ category.label }}
                  </span>
                  <UIcon
                    name="i-lucide-chevron-down"
                    class="size-4 transition-transform duration-200 motion-reduce:transition-none"
                    :class="open ? 'rotate-180' : ''"
                    aria-hidden="true"
                  />
                </button>
              </template>

              <template #content>
                <div class="border-t border-line bg-soft py-1.5">
                  <div v-if="category.groups.length">
                    <UCollapsible
                      v-for="group in category.groups"
                      :key="group.slug"
                      :open="expandedGroupSlug === group.slug"
                      :unmount-on-hide="false"
                      :ui="{
                        content:
                          'overflow-hidden motion-reduce:animate-none motion-reduce:transition-none',
                      }"
                      @update:open="setGroupExpanded(category.slug, group.slug, $event)"
                    >
                      <template #default="{ open }">
                        <button
                          type="button"
                          class="grid w-full grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 py-3 pe-4 ps-7 text-left text-[0.78rem] font-extrabold leading-5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                          :class="activeGroupSlug === group.slug ? 'text-brand' : 'text-ink/68 hover:text-brand'"
                        >
                          <span>{{ group.label }}</span>
                          <UIcon
                            name="i-lucide-chevron-down"
                            class="size-3.5 transition-transform duration-200 motion-reduce:transition-none"
                            :class="open ? 'rotate-180' : ''"
                            aria-hidden="true"
                          />
                        </button>
                      </template>

                      <template #content>
                        <ul
                          class="border-y border-line/70 bg-white py-1.5"
                          :aria-label="`Typy w podkategorii ${group.label}`"
                        >
                          <li
                            v-for="entry in selectableCatalogueEntries(group.entries)"
                            :key="entry.id"
                          >
                            <button
                              type="button"
                              class="w-full py-2 pe-4 ps-10 text-left font-mono text-xs font-bold leading-4 transition-colors duration-200 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                              :class="activeEntryId === entry.id ? 'text-brand' : 'text-ink/58'"
                              @click="activateEntry(category.slug, group.slug, entry.id)"
                            >
                              {{ entry.label }}
                            </button>
                          </li>
                        </ul>
                      </template>
                    </UCollapsible>
                  </div>

                  <ul
                    v-else
                    :aria-label="`Typy w kategorii ${category.label}`"
                  >
                    <li
                      v-for="entry in selectableCatalogueEntries(category.entries)"
                      :key="entry.id"
                    >
                      <button
                        type="button"
                        class="w-full py-2.5 pe-4 ps-7 text-left font-mono text-xs font-bold leading-4 transition-colors duration-200 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                        :class="activeEntryId === entry.id ? 'text-brand' : 'text-ink/60'"
                        @click="activateEntry(category.slug, '', entry.id)"
                      >
                        {{ entry.label }}
                      </button>
                    </li>
                  </ul>
                </div>
              </template>
            </UCollapsible>
          </div>
        </nav>
      </aside>

      <div class="min-w-0 bg-white">
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
