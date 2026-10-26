<script setup lang="ts">
import type { ProductFamily } from "~~/types/products";

const props = defineProps<{
  product: ProductFamily;
  isDraft?: boolean;
}>();

const intro = computed(() => {
  return props.product.shortDescription || props.product.lead;
});
</script>

<template>
  <details
    :id="`produkt-${props.product.slug}`"
    class="group scroll-mt-16 border-t border-line bg-white"
  >
    <summary
      class="grid cursor-pointer list-none gap-5 px-6 py-6 marker:hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-brand md:grid-cols-[minmax(0,1fr)_auto] md:items-center md:px-8 lg:px-10 [&::-webkit-details-marker]:hidden"
    >
      <div class="min-w-0">
        <div class="flex flex-wrap items-center gap-x-3 gap-y-1">
          <p class="text-xs font-black uppercase tracking-wide text-brand">
            Karta produktu
          </p>
          <span
            v-if="props.product.powerRange"
            class="text-xs font-bold text-ink/52"
          >
            {{ props.product.powerRange }}
          </span>
          <span
            v-if="props.isDraft"
            class="text-xs font-black uppercase text-brand"
          >
            Szkic
          </span>
        </div>

        <h3 class="mt-2 font-heading text-xl font-black leading-tight text-ink md:text-2xl">
          {{ props.product.title }}
        </h3>
        <p v-if="intro" class="mt-2 max-w-4xl text-sm leading-6 text-ink/62">
          {{ intro }}
        </p>
      </div>

      <span class="inline-flex items-center gap-2 text-xs font-black uppercase text-ink transition group-open:text-brand">
        <span class="group-open:hidden">Pokaż szczegóły</span>
        <span class="hidden group-open:inline">Ukryj szczegóły</span>
        <UIcon
          name="i-lucide-chevron-down"
          class="size-4 transition-transform duration-200 group-open:rotate-180"
          aria-hidden="true"
        />
      </span>
    </summary>

    <ProductCatalogueDetail
      :product="props.product"
      :is-draft="props.isDraft"
      hide-header
    />
  </details>
</template>
