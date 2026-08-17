<script setup lang="ts">
import { searchQuickLinks } from "~~/data/search";
import { serviceNavigation } from "~~/data/navigation";

const route = useRoute()

const searchTerm = ref('')

const { data: searchNavigation } = await useAsyncData('search-navigation', () => {
  return queryCollectionNavigation('pages')
})

const { data: productCatalogue } = await useAsyncData(
  'global-product-catalogue',
  () => queryCollection('catalogue').first(),
)

const baseProductNavigation = computed(() => productCatalogue.value?.categories ?? [])
const productNavigation = useProductCatalogue(baseProductNavigation)

const { data: searchFiles } = useLazyAsyncData('search-files', () => {
  return queryCollectionSearchSections('pages')
}, {
  server: false,
})

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
      <ProductJsonImporter :catalogue="baseProductNavigation" />

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
