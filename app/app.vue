<script setup lang="ts">
import { searchQuickLinkGroups } from "~~/data/search";
import { serviceNavigation } from "~~/data/navigation";
import { normalizeCatalogueCategories } from "~/utils/product-catalogue";

const route = useRoute()
const config = useRuntimeConfig()

const searchTerm = ref('')

const { data: siteContent } = await useFetch('/api/content/site', {
  key: 'site-content',
})

const { data: catalogueContent } = await useFetch('/api/content/catalogue', {
  key: 'catalogue-navigation',
})

const baseProductNavigation = computed(() => {
  return normalizeCatalogueCategories(
    catalogueContent.value?.categories ?? siteContent.value?.catalogue?.categories,
  )
})
const productNavigation = useProductCatalogue(baseProductNavigation)
const studioEnabled = computed(() => config.public.studioEnabled)
const isStudioLogin = computed(() => route.path === '/studio-login')

type SearchSection = {
  id: string
  title: string
  titles: string[]
  level: number
  content: string
}

const searchFiles = computed<SearchSection[]>(() => {
  return (siteContent.value?.searchSections ?? []) as SearchSection[]
})

const contentSearchItems = computed(() => {
  return searchFiles.value.map((file) => {
    const prefixParts = [...new Set(file.titles.filter((title) => title && title !== file.title))]

    return {
      label: file.title,
      prefix: prefixParts.length ? `${prefixParts.join(' > ')} >` : undefined,
      suffix: file.content.replaceAll('<', '&lt;').replaceAll('>', '&gt;'),
      to: file.id,
      icon: file.level > 1 ? 'i-lucide-hash' : 'i-lucide-file',
    }
  })
})

const searchGroups = computed(() => [
  ...searchQuickLinkGroups,
  {
    id: 'content',
    label: 'Strony i treści',
    items: contentSearchItems.value,
    postFilter: (term: string, items: typeof contentSearchItems.value) => term ? items : [],
  },
])

const contentSearchUi = {
  modal: 'sm:max-w-4xl sm:h-[34rem]',
  viewport: 'scroll-py-2 divide-y divide-ink/10',
  group: 'px-3 py-4',
  label: 'px-3 pb-2 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink/42',
  item: 'min-h-12 rounded-xl px-3 py-2.5',
  itemLeadingIcon: 'text-ink/42',
  itemLabel: 'truncate space-x-1 text-ink/56',
  itemLabelBase: 'font-medium text-ink',
  itemLabelPrefix: 'text-ink/38',
  itemLabelSuffix: 'text-ink/42',
}

</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtPage v-if="isStudioLogin" />

  <div
    v-else
    class="min-h-svh overflow-x-clip bg-surface"
  >
    <SiteHeader
      :product-categories="productNavigation"
      :services="serviceNavigation"
    />
    <div
      class="relative z-[1] min-h-svh bg-surface"
    >
      <NuxtPage />
    </div>
    <SiteFooter />
  </div>

  <ClientOnly v-if="!isStudioLogin">
    <UiLocaleProvider>
      <LazyProductJsonImporter
        v-if="studioEnabled"
        :catalogue="baseProductNavigation"
      />

      <LazyUContentSearch
        v-model:search-term="searchTerm"
        :groups="searchGroups"
        :color-mode="false"
        :ui="contentSearchUi"
        preserve-group-order
        size="lg"
        shortcut="meta_k"
        title="Wyszukiwarka"
        description="Przeszukaj produkty, usługi i pozostałe treści serwisu."
        placeholder="Szukaj w serwisie"
        :fuse="{ fuseOptions: { ignoreDiacritics: true, threshold: 0.22 }, resultLimit: 10 }"
      />
    </UiLocaleProvider>
  </ClientOnly>
</template>
