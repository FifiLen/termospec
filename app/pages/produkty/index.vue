<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationGroup,
} from "~~/types/navigation";

const { data: catalogue } = await useAsyncData(
  "product-catalogue-page",
  () => queryCollection("catalogue").first(),
);

const baseProductNavigation = computed<ProductNavigationCategory[]>(() => {
  return catalogue.value?.categories ?? [];
});

const productNavigation = useProductCatalogue(baseProductNavigation);

const polishLetters: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

const normalizeText = (value: string) => {
  return value
    .toLocaleLowerCase("pl-PL")
    .replace(/[ąćęłńóśźż]/g, (letter) => polishLetters[letter] ?? letter)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

const filterGroup = (
  group: ProductNavigationGroup,
  query: string,
): ProductNavigationGroup | null => {
  const groupHeadingMatches = normalizeText(group.label).includes(query);

  if (groupHeadingMatches) {
    return group;
  }

  const matchingEntries = group.entries.filter((entry) => {
    return normalizeText(entry.label).includes(query);
  });

  return matchingEntries.length
    ? {
        ...group,
        entries: matchingEntries,
      }
    : null;
};

const searchQuery = ref("");
const activeCategorySlug = ref(productNavigation.value[0]?.slug ?? "");
const expandedCategorySlug = ref(activeCategorySlug.value);
const normalizedSearch = computed(() => normalizeText(searchQuery.value.trim()));

interface CatalogueNavigationChild {
  label: string;
  targetSlug: string;
}

const categoryNavigationChildren = (
  category: ProductNavigationCategory,
): CatalogueNavigationChild[] => {
  if (category.groups.length) {
    const groups = category.groups.map((group) => ({
      label: group.label,
      targetSlug: group.slug,
    }));
    const categoryProducts = category.entries.flatMap((entry) => {
      return entry.details
        ? [{
            label: entry.label,
            targetSlug: `produkt-${entry.details.slug}`,
          }]
        : [];
    });

    return [...groups, ...categoryProducts];
  }

  return category.entries
    .filter((entry) => entry.kind !== "description")
    .map((entry, index) => ({
      label: entry.label,
      targetSlug: `${category.slug}-types-tab-${index}`,
    }));
};

const filteredCategories = computed<ProductNavigationCategory[]>(() => {
  const query = normalizedSearch.value;

  if (!query) {
    return productNavigation.value;
  }

  return productNavigation.value.flatMap((category) => {
    const categoryHeadingMatches = normalizeText(category.label).includes(query);

    if (categoryHeadingMatches) {
      return [category];
    }

    const matchingEntries = category.entries.filter((entry) => {
      return normalizeText(entry.label).includes(query);
    });
    const matchingGroups = category.groups
      .map((group) => filterGroup(group, query))
      .filter((group): group is ProductNavigationGroup => Boolean(group));

    if (!matchingEntries.length && !matchingGroups.length) {
      return [];
    }

    return [
      {
        ...category,
        entries: matchingEntries,
        groups: matchingGroups,
      },
    ];
  });
});

const setActiveCategory = (slug: string) => {
  activeCategorySlug.value = slug;
};

const setExpandedCategory = (slug: string, open: boolean) => {
  expandedCategorySlug.value = open ? slug : "";
};

const scrollToCatalogueTarget = async (
  targetSlug: string,
  categorySlug: string,
) => {
  setActiveCategory(categorySlug);
  expandedCategorySlug.value = categorySlug;
  await nextTick();

  if (!import.meta.client) {
    return;
  }

  const target = document.getElementById(targetSlug);

  if (!target) {
    return;
  }

  if (target.getAttribute("role") === "tab" && target instanceof HTMLButtonElement) {
    target.click();
  }

  if (target instanceof HTMLDetailsElement) {
    target.open = true;
  }

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  window.history.replaceState(null, "", `#${targetSlug}`);
};

const syncActiveCategoryFromScroll = () => {
  if (!import.meta.client || !filteredCategories.value.length) {
    return;
  }

  const activationLine = 64 + Math.min(window.innerHeight * 0.24, 220);
  let currentCategory = filteredCategories.value[0];

  for (const category of filteredCategories.value) {
    const element = document.getElementById(category.slug);

    if (!element) {
      continue;
    }

    if (element.getBoundingClientRect().top <= activationLine) {
      currentCategory = category;
      continue;
    }

    break;
  }

  if (currentCategory) {
    setActiveCategory(currentCategory.slug);
  }
};

let activeScrollFrame: number | undefined;

const requestActiveCategorySync = () => {
  if (!import.meta.client || activeScrollFrame !== undefined) {
    return;
  }

  activeScrollFrame = window.requestAnimationFrame(() => {
    activeScrollFrame = undefined;
    syncActiveCategoryFromScroll();
  });
};

watch(
  filteredCategories,
  async (categories) => {
    activeCategorySlug.value = categories[0]?.slug ?? "";

    if (normalizedSearch.value) {
      expandedCategorySlug.value = categories[0]?.slug ?? "";
    }

    await nextTick();
    requestActiveCategorySync();
  },
);

onMounted(() => {
  const hash = window.location.hash.replace("#", "");
  const hashCategory = productNavigation.value.find((category) => {
    return (
      category.slug === hash ||
      category.groups.some((group) => group.slug === hash)
    );
  });

  if (hashCategory) {
    setActiveCategory(hashCategory.slug);
  }

  requestActiveCategorySync();
  window.addEventListener("scroll", requestActiveCategorySync, {
    passive: true,
  });
  window.addEventListener("resize", requestActiveCategorySync);
});

onBeforeUnmount(() => {
  if (activeScrollFrame !== undefined) {
    window.cancelAnimationFrame(activeScrollFrame);
  }

  window.removeEventListener("scroll", requestActiveCategorySync);
  window.removeEventListener("resize", requestActiveCategorySync);
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
      class="grid min-h-[calc(100svh-4rem)] gap-px bg-line sm:grid-cols-[18rem_minmax(0,1fr)] sm:items-start"
      aria-label="Katalog produktów"
    >
      <aside
        class="bg-white sm:sticky sm:top-16 sm:h-[calc(100svh-4rem)] sm:overflow-y-auto"
        aria-label="Indeks katalogu produktów"
      >
        <div class="border-b border-line px-5 py-4">
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
              class="h-11 w-full border border-line bg-white pl-10 pr-3 text-sm font-bold text-ink outline-none transition placeholder:text-ink/42 focus:border-brand"
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
              @update:open="setExpandedCategory(category.slug, $event)"
            >
              <template #default="{ open }">
                <button
                  type="button"
                  :data-category-nav="category.slug"
                  class="group grid w-full grid-cols-[1.75rem_minmax(0,1fr)_1rem] items-center gap-2 px-4 py-3.5 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                  :class="
                    activeCategorySlug === category.slug || open
                      ? 'text-brand'
                      : 'text-ink/58 hover:text-brand'
                  "
                  :aria-current="activeCategorySlug === category.slug ? 'location' : undefined"
                >
                  <span class="font-mono text-[0.62rem] font-bold">
                    {{ category.number }}
                  </span>
                  <span class="whitespace-nowrap text-[0.68rem] font-black uppercase leading-5">
                    {{ category.label }}
                  </span>
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
                  class="border-t border-line bg-soft py-1"
                  :aria-label="`Produkty w kategorii ${category.label}`"
                >
                  <li
                    v-for="child in categoryNavigationChildren(category)"
                    :key="child.targetSlug"
                  >
                    <button
                      type="button"
                      class="w-full py-2.5 pe-4 ps-12 text-left text-[0.68rem] font-bold leading-4 text-ink/62 transition-colors duration-200 hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand"
                      @click="scrollToCatalogueTarget(child.targetSlug, category.slug)"
                    >
                      {{ child.label }}
                    </button>
                  </li>
                </ul>
              </template>
            </UCollapsible>
          </div>
        </nav>
      </aside>

      <div class="min-w-0 bg-white">
        <template v-if="filteredCategories.length">
          <ProductCatalogueCategory
            v-for="category in filteredCategories"
            :key="category.slug"
            :category="category"
          />
        </template>

        <div v-else class="min-h-[22rem] bg-white p-6 md:p-8 lg:p-10" role="status">
          <p class="border-s-2 border-brand ps-4 text-base font-extrabold text-ink/62">
            Brak kategorii lub typów pasujących do wyszukiwania.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
