<script setup lang="ts">
import { searchQuickLinks } from "~~/data/search";
import { serviceNavigation } from "~~/data/navigation";
import { normalizeCatalogueCategories } from "~/utils/product-catalogue";

const route = useRoute()
const config = useRuntimeConfig()

const searchTerm = ref('')

const { data: siteContent } = await useFetch('/api/content/site', {
  key: 'site-content',
})

const baseProductNavigation = computed(() => {
  return normalizeCatalogueCategories(siteContent.value?.catalogue?.categories)
})
const productNavigation = useProductCatalogue(baseProductNavigation)
const studioEnabled = computed(() => config.public.studioEnabled)
const searchNavigation = computed(() => siteContent.value?.navigation ?? [])
const searchFiles = computed(() => siteContent.value?.searchSections ?? [])

const pageFrameClass = computed(() => {
  if (route.path === '/') {
    return 'relative z-[1] min-h-svh bg-surface'
  }

  return 'relative z-[1] min-h-svh bg-surface shadow-[0_26px_70px_rgb(15_19_151_/_0.22)]'
})
</script>

<template>
  <NuxtRouteAnnouncer />
  <div class="min-h-svh overflow-x-clip bg-surface">
    <SiteHeader
      :product-categories="productNavigation"
      :services="serviceNavigation"
    />
    <FloatingHeaderActions />
    <div
      :class="pageFrameClass"
    >
      <NuxtPage />
    </div>
    <SiteFooter />
  </div>

  <ClientOnly>
    <UiLocaleProvider>
      <LazyProductJsonImporter
        v-if="studioEnabled"
        :catalogue="baseProductNavigation"
      />

      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :links="searchQuickLinks"
        :files="searchFiles"
        :navigation="searchNavigation"
        :color-mode="false"
        shortcut="meta_k"
        title="Wyszukiwarka"
        description="Przeszukaj produkty, usługi i pozostałe treści serwisu."
        placeholder="Szukaj w serwisie"
        :fuse="{ fuseOptions: { ignoreDiacritics: true }, resultLimit: 30 }"
      />
    </UiLocaleProvider>
  </ClientOnly>
</template>
