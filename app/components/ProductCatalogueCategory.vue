<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
} from "~~/types/navigation";
import type { ProductFamily } from "~~/types/products";

const props = defineProps<{
  category: ProductNavigationCategory;
}>();

const simpleEntries = (entries: ProductNavigationEntry[]) => {
  return entries.filter((entry) => !entry.details);
};

const categoryTabEntries = (category: ProductNavigationCategory) => {
  return category.groups.length
    ? simpleEntries(category.entries)
    : category.entries;
};

const detailedEntries = (entries: ProductNavigationEntry[]) => {
  return entries.filter(
    (entry): entry is ProductNavigationEntry & { details: ProductFamily } => {
      return Boolean(entry.details);
    },
  );
};
</script>

<template>
  <article
    :id="props.category.slug"
    class="@container scroll-mt-16 border-b border-line bg-white"
  >
    <header class="grid min-h-24 bg-ink text-white">
      <div class="@container flex min-w-0 items-center px-6 py-5 md:px-8 lg:px-10">
        <h2
          class="whitespace-nowrap font-heading text-[clamp(1rem,5cqw,1.875rem)] font-black uppercase leading-tight tracking-tight text-white"
        >
          {{ props.category.label }}
        </h2>
      </div>
    </header>

    <figure
      v-if="props.category.render"
      class="grid min-h-48 place-items-center border-t border-line bg-white p-4"
    >
      <NuxtImg
        :src="props.category.render.src"
        :alt="props.category.render.alt"
        width="900"
        height="560"
        sizes="100vw md:900px"
        loading="lazy"
        decoding="async"
        class="h-48 w-full object-contain mix-blend-multiply"
      />
    </figure>

    <ProductCatalogueTabs
      v-if="categoryTabEntries(props.category).length"
      :entries="categoryTabEntries(props.category)"
      :id-base="`${props.category.slug}-types`"
      :label="`Typy w kategorii ${props.category.label}`"
    />

    <div v-if="props.category.groups.length" class="divide-y divide-line">
      <section
        v-for="group in props.category.groups"
        :id="group.slug"
        :key="group.slug"
        class="scroll-mt-16 bg-white"
      >
        <div
          class="grid min-h-48"
          :class="group.render ? '@2xl:grid-cols-[minmax(0,1fr)_minmax(18rem,38%)]' : ''"
        >
          <header class="@container flex min-w-0 items-center px-6 py-7 md:px-8 lg:px-10">
            <h3
              class="whitespace-nowrap font-heading text-[clamp(0.875rem,3.1cqw,1.5rem)] font-black uppercase leading-tight tracking-tight text-ink"
            >
              {{ group.label }}
            </h3>
          </header>

          <figure
            v-if="group.render"
            class="grid min-h-48 place-items-center border-t border-line bg-white p-4 @2xl:border-s @2xl:border-t-0"
          >
            <NuxtImg
              :src="group.render.src"
              :alt="group.render.alt"
              width="900"
              height="560"
              sizes="100vw md:520px"
              loading="lazy"
              decoding="async"
              class="h-48 w-full object-contain mix-blend-multiply"
            />
          </figure>
        </div>

        <ProductCatalogueTabs
          v-if="group.entries.length"
          :entries="group.entries"
          :id-base="`${group.slug}-types`"
          :label="`Typy w podkategorii ${group.label}`"
        />
      </section>
    </div>

    <template v-if="props.category.groups.length">
      <ProductCatalogueDisclosure
        v-for="entry in detailedEntries(props.category.entries)"
        :key="entry.details?.slug || entry.label"
        :product="entry.details"
        :is-draft="entry.isDraft"
      />
    </template>
  </article>
</template>
