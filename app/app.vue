<script setup lang="ts">
import { searchQuickLinks } from "~~/data/search";
import type { HeaderProductMenuItem } from "~~/types/navigation";

const route = useRoute()

const searchTerm = ref('')

const { data: searchNavigation } = await useAsyncData('search-navigation', () => {
  return queryCollectionNavigation('pages')
})

const { data: searchFiles } = useLazyAsyncData('search-files', () => {
  return queryCollectionSearchSections('pages')
}, {
  server: false,
})

const { data: headerProducts } = await useAsyncData<HeaderProductMenuItem[]>(
  "header-products",
  async () => {
    const entries = await queryCollection("products")
      .order("order", "ASC")
      .all();

    return entries.map((entry) => ({
      title: entry.title,
      slug: entry.slug,
      category: entry.category,
      shortDescription: entry.shortDescription,
      powerRange: entry.powerRange ?? "",
      heroImage: entry.heroImage ?? "",
      imageAlt: entry.imageAlt ?? "",
      headerSketch: entry.headerSketch ?? null,
    }));
  },
);

const productMenuItems = computed(() => headerProducts.value ?? []);

const pageFrameClass = computed(() => {
  if (route.path === '/') {
    return 'relative z-[1] min-h-svh bg-surface'
  }

  return 'relative z-[1] min-h-svh bg-surface shadow-[0_26px_70px_rgb(15_19_151_/_0.22)]'
})
</script>

<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <div class="min-h-svh overflow-x-clip bg-surface">
      <SiteHeader :products="productMenuItems" />
      <FloatingHeaderActions />
      <div
        :class="pageFrameClass"
      >
        <NuxtPage />
      </div>
      <SiteFooter />
    </div>

    <ClientOnly>
      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :links="searchQuickLinks"
        :files="searchFiles"
        :navigation="searchNavigation"
        :color-mode="false"
        shortcut="meta_k"
        placeholder="Szukaj w serwisie"
        :fuse="{ fuseOptions: { ignoreDiacritics: true }, resultLimit: 30 }"
      />
    </ClientOnly>
  </UApp>
</template>
