<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
} from "~~/types/navigation";

const props = defineProps<{
  category: ProductNavigationCategory;
  activeGroupSlug?: string;
  activeEntryId?: string;
}>();

const emit = defineEmits<{
  selectEntry: [payload: { groupSlug: string; entryId: string }];
}>();

const activeGroup = computed(() => {
  if (!props.category.groups.length) {
    return undefined;
  }

  return props.category.groups.find((group) => {
    return group.slug === props.activeGroupSlug;
  }) ?? props.category.groups[0];
});

const focusEntries = computed(() => {
  return activeGroup.value?.entries ?? props.category.entries;
});

const focusRender = computed(() => {
  return activeGroup.value?.render ?? props.category.render;
});

const focusIdBase = computed(() => {
  return activeGroup.value
    ? `${activeGroup.value.slug}-types`
    : `${props.category.slug}-types`;
});

const detailedCategoryEntries = computed(() => {
  if (!props.category.groups.length) {
    return [];
  }

  return props.category.entries.filter((entry): entry is ProductNavigationEntry & {
    details: NonNullable<ProductNavigationEntry["details"]>;
  } => Boolean(entry.details));
});

const hasFocusStage = computed(() => {
  return Boolean(activeGroup.value || focusRender.value);
});
</script>

<template>
  <article
    :id="props.category.slug"
    class="@container scroll-mt-16 bg-white"
  >
    <header class="grid min-h-24 bg-ink text-white">
      <div class="flex min-w-0 items-center px-6 py-5 md:px-8 lg:px-10">
        <h2
          class="whitespace-nowrap font-heading text-[clamp(1.25rem,3cqw,2rem)] font-black uppercase leading-tight tracking-tight text-white"
        >
          {{ props.category.label }}
        </h2>
      </div>
    </header>

    <section
      v-if="hasFocusStage"
      class="relative grid min-h-[22rem] overflow-hidden border-b border-line bg-white"
      :class="activeGroup && focusRender ? 'lg:grid-cols-[minmax(22rem,1fr)_minmax(28rem,0.9fr)]' : ''"
      :aria-label="activeGroup?.label || props.category.label"
    >
      <div
        v-if="activeGroup"
        class="flex min-h-[18rem] items-center px-6 py-10 md:px-8 lg:min-h-[22rem] lg:px-10"
      >
        <h3
          class="max-w-[26ch] font-heading text-[clamp(1.45rem,2.7cqw,2.25rem)] font-black uppercase leading-[1.08] tracking-tight text-ink"
        >
          {{ activeGroup.label }}
        </h3>
      </div>

      <figure
        v-if="focusRender"
        class="grid min-h-[22rem] place-items-center bg-white px-6 py-7 md:px-8 lg:px-10"
      >
        <NuxtImg
          :src="focusRender.src"
          :alt="focusRender.alt"
          width="1200"
          height="760"
          sizes="100vw lg:52vw"
          loading="eager"
          decoding="async"
          class="h-[18rem] w-full object-contain mix-blend-multiply md:h-[20rem] lg:h-[22rem]"
        />
      </figure>
    </section>

    <ProductCatalogueTabs
      v-if="focusEntries.length"
      :key="focusIdBase"
      :entries="focusEntries"
      :id-base="focusIdBase"
      :label="activeGroup ? `Typy w podkategorii ${activeGroup.label}` : `Typy w kategorii ${props.category.label}`"
      :model-value="props.activeEntryId"
      @select="emit('selectEntry', { groupSlug: activeGroup?.slug || '', entryId: $event })"
    />

    <ProductCatalogueDisclosure
      v-for="entry in detailedCategoryEntries"
      :key="entry.details.slug"
      :product="entry.details"
      :is-draft="entry.isDraft"
    />
  </article>
</template>
