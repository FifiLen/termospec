<script setup lang="ts">
import type { ProductFamily } from "~~/types/products";

interface ProductCatalogueGroup {
  category: string;
  products: ProductFamily[];
}

interface ProductCatalogueAccordionItem extends ProductCatalogueGroup {
  label: string;
  value: string;
}

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

const { data: products } = await useAsyncData<ProductFamily[]>(
  "products",
  async () => {
    const entries = await queryCollection("products")
      .order("order", "ASC")
      .all();

    const toArray = <T,>(value: T[] | undefined | null) => value ?? [];

    return entries.map((entry) => ({
      title: entry.title,
      slug: entry.slug,
      category: entry.category,
      order: entry.order ?? 100,
      isFeatured: entry.isFeatured ?? false,
      lead: entry.lead,
      shortDescription: entry.shortDescription,
      powerRange: entry.powerRange ?? "",
      applications: toArray(entry.applications),
      components: toArray(entry.components),
      features: toArray(entry.features),
      serviceScope: toArray(entry.serviceScope),
      specs: toArray(entry.specs),
      sections: toArray(entry.sections).map((section) => ({
        title: section.title,
        body: section.body,
        items: toArray(section.items),
      })),
      heroImage: entry.heroImage ?? "",
      imageAlt: entry.imageAlt ?? "",
      headerSketch: entry.headerSketch ?? null,
      gallery: toArray(entry.gallery),
      relatedProjects: toArray(entry.relatedProjects).map((project) => ({
        number: project.number,
        category: project.category,
        title: project.title,
        body: project.body,
        image: project.image,
        imageAlt: project.imageAlt,
        scope: toArray(project.scope),
      })),
    }));
  },
);

const searchQuery = ref("");
const activeProductSlug = ref("");
const manuallyExpandedCategories = ref<string[]>([]);
const catalogueAside = ref<HTMLElement | null>(null);

const productList = computed(() => products.value ?? []);
const normalizedSearch = computed(() => normalizeText(searchQuery.value.trim()));

const filteredProducts = computed(() => {
  const query = normalizedSearch.value;

  return productList.value.filter((product) => {
    if (!query) {
      return true;
    }

    const searchableContent = [
      product.title,
      product.category,
      product.lead,
      product.shortDescription,
      product.powerRange,
      ...product.applications,
      ...product.components,
      ...product.features,
      ...product.serviceScope,
      ...product.specs.flatMap((spec) => [spec.label, spec.value]),
      ...product.sections.flatMap((section) => [
        section.title,
        section.body,
        ...section.items,
      ]),
      product.imageAlt,
      product.headerSketch?.alt ?? "",
      product.headerSketch?.src ?? "",
      ...product.gallery.flatMap((media) => [media.alt, media.src]),
      ...product.relatedProjects.flatMap((project) => [
        project.number,
        project.category,
        project.title,
        project.body,
        project.imageAlt,
        ...project.scope,
      ]),
    ].join(" ");

    return normalizeText(searchableContent).includes(query);
  });
});

const groupedProducts = computed<ProductCatalogueGroup[]>(() => {
  const groups = new Map<string, ProductFamily[]>();

  for (const product of filteredProducts.value) {
    const groupProducts = groups.get(product.category) ?? [];
    groupProducts.push(product);
    groups.set(product.category, groupProducts);
  }

  return Array.from(groups.entries()).map(([category, groupProducts]) => ({
    category,
    products: groupProducts,
  }));
});

const accordionItems = computed<ProductCatalogueAccordionItem[]>(() => {
  return groupedProducts.value.map((group) => ({
    ...group,
    label: group.category,
    value: group.category,
  }));
});

const activeProduct = computed(() => {
  return productList.value.find((product) => {
    return product.slug === activeProductSlug.value;
  });
});

const activeCategory = computed(() => activeProduct.value?.category ?? "");

const openCategories = computed(() => {
  const open = new Set<string>();

  if (activeCategory.value) {
    open.add(activeCategory.value);
  }

  if (normalizedSearch.value) {
    for (const group of groupedProducts.value) {
      open.add(group.category);
    }
  }

  for (const category of manuallyExpandedCategories.value) {
    if (groupedProducts.value.some((group) => group.category === category)) {
      open.add(category);
    }
  }

  return open;
});

const accordionValue = computed({
  get() {
    return Array.from(openCategories.value);
  },
  set(value: string | string[] | undefined) {
    const requestedCategories = Array.isArray(value)
      ? value
      : value
        ? [value]
        : [];
    const categoriesKeptOpen = new Set<string>();

    if (activeCategory.value) {
      categoriesKeptOpen.add(activeCategory.value);
    }

    if (normalizedSearch.value) {
      for (const group of groupedProducts.value) {
        categoriesKeptOpen.add(group.category);
      }
    }

    manuallyExpandedCategories.value = requestedCategories.filter((category) => {
      return !categoriesKeptOpen.has(category);
    });
  },
});

const productAnchor = (slug: string) => {
  return `produkt-${slug}`;
};

const productGlobalIndex = (product: ProductFamily) => {
  const index = productList.value.findIndex((item) => {
    return item.slug === product.slug;
  });

  return index > -1 ? index : 0;
};

const setActiveProduct = (product: ProductFamily) => {
  if (activeProductSlug.value === product.slug) {
    return;
  }

  activeProductSlug.value = product.slug;
};

const syncActiveProductFromScroll = () => {
  if (!import.meta.client || !filteredProducts.value.length) {
    return;
  }

  const activationLine = 64 + Math.min(window.innerHeight * 0.24, 240);
  const headerBoundary = 64;
  let currentProduct = filteredProducts.value[0];

  for (const product of filteredProducts.value) {
    const element = document.getElementById(productAnchor(product.slug));

    if (!element) {
      continue;
    }

    const rect = element.getBoundingClientRect();

    if (rect.top <= activationLine && rect.bottom > headerBoundary) {
      currentProduct = product;
      continue;
    }

    if (rect.top > activationLine) {
      break;
    }
  }

  if (currentProduct) {
    setActiveProduct(currentProduct);
  }
};

let activeScrollFrame: number | undefined;

const requestActiveProductSync = () => {
  if (!import.meta.client || activeScrollFrame !== undefined) {
    return;
  }

  activeScrollFrame = window.requestAnimationFrame(() => {
    activeScrollFrame = undefined;
    syncActiveProductFromScroll();
  });
};

const scrollActiveNavigationItemIntoView = async () => {
  if (!import.meta.client || !activeProductSlug.value) {
    return;
  }

  await nextTick();

  const aside = catalogueAside.value;
  const activeLink = Array.from(
    aside?.querySelectorAll<HTMLElement>("[data-product-nav]") ?? [],
  ).find((link) => link.dataset.productNav === activeProductSlug.value);

  if (!aside || !activeLink) {
    return;
  }

  const asideRect = aside.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const topBoundary = asideRect.top + 96;
  const bottomBoundary = asideRect.bottom - 24;

  if (linkRect.top < topBoundary) {
    aside.scrollBy({
      top: linkRect.top - topBoundary,
      behavior: "smooth",
    });
  } else if (linkRect.bottom > bottomBoundary) {
    aside.scrollBy({
      top: linkRect.bottom - bottomBoundary,
      behavior: "smooth",
    });
  }
};

const scrollToProduct = async (product: ProductFamily) => {
  setActiveProduct(product);
  await nextTick();

  if (!import.meta.client) {
    return;
  }

  const target = document.getElementById(productAnchor(product.slug));

  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `#${productAnchor(product.slug)}`);
    requestActiveProductSync();
  }
};

watch(
  filteredProducts,
  async (visibleProducts) => {
    const firstProduct = visibleProducts[0];

    if (firstProduct) {
      setActiveProduct(firstProduct);
    } else {
      activeProductSlug.value = "";
    }

    await nextTick();
    syncActiveProductFromScroll();
    scrollActiveNavigationItemIntoView();
  },
  { immediate: true },
);

watch(activeProductSlug, scrollActiveNavigationItemIntoView);

onMounted(() => {
  const hash = window.location.hash.replace("#", "");
  const hashProduct = productList.value.find(
    (product) => productAnchor(product.slug) === hash,
  );

  if (hashProduct) {
    setActiveProduct(hashProduct);
  }

  requestActiveProductSync();
  window.addEventListener("scroll", requestActiveProductSync, {
    passive: true,
  });
  window.addEventListener("resize", requestActiveProductSync);
});

onBeforeUnmount(() => {
  if (activeScrollFrame !== undefined) {
    window.cancelAnimationFrame(activeScrollFrame);
  }

  window.removeEventListener("scroll", requestActiveProductSync);
  window.removeEventListener("resize", requestActiveProductSync);
});

useSeoMeta({
  title: "Produkty | Termospec",
  description:
    "Katalog rodzin produktowych Termospec: urządzenia bezpośredniego działania, urządzenia pośredniego działania, chłodnice powietrza CP(N) i chłodnice wyparne CWW.",
});
</script>

<template>
  <main class="min-h-[100svh] bg-line pt-16 text-ink">
    <section
      class="grid min-h-[calc(100svh-4rem)] gap-px bg-line lg:grid-cols-[21rem_minmax(0,1fr)] lg:items-start"
      aria-label="Katalog produktów"
    >
      <aside
        ref="catalogueAside"
        class="bg-white lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:overflow-y-auto"
        aria-label="Indeks katalogu produktów"
      >
        <div class="border-b border-line">
          <div class="bg-ink px-2 py-4">
            <h2 class="whitespace-nowrap text-base font-black leading-none text-white">
              Katalog produktów
            </h2>
          </div>

          <div class="border-t border-line px-2 py-3">
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
                class="h-9 w-full border border-line bg-white pl-9 pr-3 text-sm font-bold text-ink outline-none transition placeholder:text-ink/42 focus:border-brand focus:text-ink"
                placeholder="Szukaj produktów"
                autocomplete="off"
                aria-label="Szukaj produktu w katalogu"
              />
            </div>
          </div>
        </div>

        <nav
          v-if="accordionItems.length"
          class="py-3"
          aria-label="Grupy produktów w katalogu"
        >
          <UAccordion
            v-model="accordionValue"
            :items="accordionItems"
            type="multiple"
            :ui="{
              root: 'divide-y divide-line',
              item: 'border-b-0 py-1.5',
              header: 'flex',
              trigger:
                'group grid min-h-11 w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-none px-2 py-2 text-left text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
              label: 'min-w-0 truncate',
              trailingIcon: 'hidden',
              content:
                'data-[state=open]:animate-[accordion-down_200ms_ease-out] data-[state=closed]:animate-[accordion-up_160ms_ease-out] data-[state=closed]:overflow-hidden focus:outline-none',
              body: 'p-0',
            }"
          >
            <template #default="{ item }">
              <span
                class="block min-w-0 truncate text-sm leading-5"
                :class="
                  activeCategory === item.category
                    ? 'font-bold text-brand'
                    : 'font-bold text-ink/62 group-hover:text-brand'
                "
              >
                {{ item.category }}
              </span>
            </template>

            <template #trailing="{ item, open }">
              <span class="flex items-center gap-2">
                <span class="text-xs font-bold text-ink/34">
                  {{ item.products.length }}
                </span>
                <span
                  class="grid h-5 w-5 place-items-center text-ink/36 transition-transform duration-200"
                  :class="
                    open
                      ? 'rotate-90'
                      : ''
                  "
                  aria-hidden="true"
                >
                  <span class="h-1.5 w-1.5 rotate-[-45deg] border-r border-b border-current"></span>
                </span>
              </span>
            </template>

            <template #content="{ item }">
              <div class="pb-2 pl-2">
                <div class="border-l border-line/80">
                  <a
                    v-for="product in item.products"
                    :key="`${product.slug}-quick-nav`"
                    :href="`#${productAnchor(product.slug)}`"
                    :data-product-nav="product.slug"
                    class="block w-full py-2 pl-4 pr-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                    :class="
                      activeProductSlug === product.slug
                        ? 'text-brand'
                        : 'text-ink/60 hover:text-brand'
                    "
                    :aria-current="
                      activeProductSlug === product.slug
                        ? 'location'
                        : undefined
                    "
                    @click.prevent="scrollToProduct(product)"
                  >
                    <span class="block min-w-0 text-sm font-bold leading-5">
                      {{ product.title }}
                    </span>
                  </a>
                </div>
              </div>
            </template>
          </UAccordion>
        </nav>
      </aside>

      <div class="min-w-0 bg-white">
        <template v-if="filteredProducts.length">
          <ProductCatalogueSheet
            v-for="product in filteredProducts"
            :id="productAnchor(product.slug)"
            :key="product.slug"
            :product="product"
            :index="productGlobalIndex(product)"
          />
        </template>

        <div v-else class="bg-white p-6 md:p-8" role="status">
          <p
            class="border-l-2 border-brand pl-4 text-base font-extrabold text-ink/62"
          >
            Brak produktów pasujących do filtra.
          </p>
        </div>
      </div>
    </section>
  </main>
</template>
