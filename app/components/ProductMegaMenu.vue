<script setup lang="ts">
import type { HeaderProductMenuItem } from "~~/types/navigation";

interface ProductMegaMenuCard extends HeaderProductMenuItem {
  href: string;
}

const props = defineProps<{
  products: HeaderProductMenuItem[];
  close?: () => void;
}>();

const productHref = (slug: string) => `/produkty#produkt-${slug}`;

const menuProducts = computed<ProductMegaMenuCard[]>(() => {
  return props.products.map((product) => ({
    ...product,
    href: productHref(product.slug),
  }));
});

const closeMenu = () => {
  props.close?.();
};
</script>

<template>
  <div
    class="w-[52rem] max-w-[calc(100vw-2rem)] overflow-hidden border-x border-b border-line bg-white shadow-lift"
  >
    <div v-if="!menuProducts.length" class="p-6">
      <p class="border-l-2 border-brand pl-4 text-sm font-black text-ink/62">
        Produkty w menu zostaną pokazane po uzupełnieniu katalogu.
      </p>
    </div>

    <div v-else class="grid grid-cols-3 gap-4 bg-white p-4">
      <NuxtLink
        v-for="product in menuProducts"
        :key="product.slug"
        :to="product.href"
        class="group/product flex h-60 min-w-0 flex-col border border-transparent bg-white px-4 py-4 text-center outline-none transition hover:border-brand focus-visible:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-brand"
        @click="closeMenu"
      >
        <h3 class="mx-auto min-h-12 max-w-56 whitespace-normal text-balance text-base font-black leading-tight text-ink">
          {{ product.title }}
        </h3>

        <figure class="mt-5 grid flex-1 place-items-center overflow-hidden">
          <img
            v-if="product.headerSketch?.src"
            :src="product.headerSketch.src"
            :alt="product.headerSketch.alt"
            width="360"
            height="240"
            loading="lazy"
            decoding="async"
            class="h-full max-h-32 w-full object-contain transition duration-300 group-hover/product:scale-[1.04]"
          />
        </figure>
      </NuxtLink>
    </div>
  </div>
</template>
