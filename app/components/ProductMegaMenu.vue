<script setup lang="ts">
import type { ProductNavigationCategory } from "~~/types/navigation";
import {
  filterCatalogueCategories,
  resolveCatalogueSelection,
} from "~/utils/product-catalogue";

const props = defineProps<{
  categories: ProductNavigationCategory[];
}>();
const emit = defineEmits<{ navigate: [] }>();

const searchQuery = ref("");
const filteredCategories = computed(() => {
  return filterCatalogueCategories(props.categories, searchQuery.value);
});
const selection = ref({ categorySlug: "", groupSlug: "", entryId: "" });
const expandedCategorySlug = ref("");
const expandedGroupSlug = ref("");

const activeCategory = computed(() => filteredCategories.value.find((category) => {
  return category.slug === selection.value.categorySlug;
}));
const activeGroup = computed(() => activeCategory.value?.groups.find((group) => {
  return group.slug === selection.value.groupSlug;
}));
const activeEntry = computed(() => {
  return (activeGroup.value?.entries ?? activeCategory.value?.entries ?? [])
    .find((entry) => entry.id === selection.value.entryId);
});
const previewRender = computed(() => activeGroup.value?.render ?? activeCategory.value?.render);
const previewLabel = computed(() => activeGroup.value?.label ?? activeCategory.value?.label);
const previewTarget = computed(() => {
  const id = activeEntry.value?.id || activeGroup.value?.slug || activeCategory.value?.slug;
  return id ? `/produkty#${id}` : "/produkty";
});

const selectBranch = (categorySlug: string, groupSlug = "", entryId = "") => {
  const next = resolveCatalogueSelection(filteredCategories.value, {
    categorySlug,
    groupSlug,
    entryId,
  });
  if (!next) return;
  selection.value = next;
  expandedCategorySlug.value = next.categorySlug;
  expandedGroupSlug.value = next.groupSlug;
};

const setCategoryExpanded = (categorySlug: string, open: boolean) => {
  if (open) selectBranch(categorySlug);
  else expandedCategorySlug.value = "";
};
const setGroupExpanded = (categorySlug: string, groupSlug: string, open: boolean) => {
  if (open) selectBranch(categorySlug, groupSlug);
  else expandedGroupSlug.value = "";
};

watch(filteredCategories, (categories) => {
  const next = resolveCatalogueSelection(categories, selection.value);
  if (!next) {
    selection.value = { categorySlug: "", groupSlug: "", entryId: "" };
    expandedCategorySlug.value = "";
    expandedGroupSlug.value = "";
    return;
  }
  const categoryChanged = selection.value.categorySlug !== next.categorySlug;
  const groupChanged = selection.value.groupSlug !== next.groupSlug;
  selection.value = next;
  if (categoryChanged) expandedCategorySlug.value = next.categorySlug;
  if (categoryChanged || groupChanged) expandedGroupSlug.value = next.groupSlug;
}, { immediate: true });
</script>

<template>
  <section
    class="grid h-[min(42rem,calc(100dvh-7.25rem))] min-h-0 w-full grid-cols-[20rem_minmax(0,1fr)] gap-5 overflow-hidden rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-white p-4 shadow-[0_20px_60px_rgb(10_24_71_/_0.12)]"
    aria-label="Katalog produktów — podgląd"
    data-lenis-prevent
  >
    <ProductCatalogueIndex
      v-model:search-query="searchQuery"
      :categories="filteredCategories"
      :active-category-slug="selection.categorySlug"
      :active-group-slug="selection.groupSlug"
      :active-entry-id="selection.entryId"
      :expanded-category-slug="expandedCategorySlug"
      :expanded-group-slug="expandedGroupSlug"
      class="min-h-0 rounded-[1.25rem]"
      @category-expanded="setCategoryExpanded"
      @group-expanded="setGroupExpanded"
      @select-entry="selectBranch"
    />

    <div class="min-h-0 min-w-0 overflow-y-auto overscroll-contain">
      <NuxtLink
        v-if="activeCategory"
        :to="previewTarget"
        class="group flex h-full min-h-64 flex-col rounded-[1.25rem] p-5 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand xl:p-7"
        @click.stop="emit('navigate')"
      >
        <div class="shrink-0">
          <p v-if="activeGroup" class="text-xs font-bold uppercase tracking-[0.12em] text-brand">
            {{ activeCategory.label }}
          </p>
          <h2 class="mt-3 max-w-[28ch] text-2xl font-bold leading-tight tracking-[-0.01em] text-ink 2xl:text-3xl">
            {{ previewLabel }}
          </h2>
          <p v-if="activeEntry" class="mt-3 text-base font-medium text-ink/58">
            {{ activeEntry.label }}
          </p>
        </div>

        <div class="my-5 flex min-h-0 flex-1 items-center justify-center">
          <NuxtImg
            v-if="previewRender"
            :src="previewRender.src"
            :alt="previewRender.alt"
            width="900"
            height="570"
            sizes="600px 2xl:900px"
            class="h-full max-h-[26rem] w-full object-contain"
            loading="eager"
            decoding="async"
          />
        </div>

        <div class="flex shrink-0 items-center justify-between gap-4 border-t border-line pt-5 text-sm font-medium text-ink transition-colors group-hover:text-brand">
          <span>Zobacz w katalogu</span>
          <span aria-hidden="true">→</span>
        </div>
      </NuxtLink>
      <div v-else class="flex h-full flex-col items-center justify-center gap-5 p-8 text-center">
        <p class="text-sm text-ink/62" role="status">
          {{ props.categories.length ? 'Brak kategorii lub typów pasujących do wyszukiwania.' : 'Katalog jest ładowany…' }}
        </p>
        <NuxtLink to="/produkty" class="text-sm font-medium text-brand underline underline-offset-4" @click="emit('navigate')">
          Pełny katalog
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
