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

const focusLabel = computed(() => {
  return activeGroup.value?.label ?? props.category.label;
});
</script>

<template>
  <article
    :id="props.category.slug"
    class="@container scroll-mt-28 bg-white"
  >
    <header class="border-b border-line px-6 py-8 md:px-8 lg:px-10 lg:py-10">
      <div class="min-w-0">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Kategoria produktów
        </p>
        <h2
          class="mt-3 max-w-[26ch] text-[clamp(1.9rem,4cqw,3.75rem)] font-medium leading-[0.98] tracking-[-0.05em] text-ink"
        >
          {{ props.category.label }}
        </h2>
      </div>
    </header>

    <section
      v-if="hasFocusStage"
      class="relative grid overflow-hidden border-b border-line bg-surface"
      :class="focusRender ? 'lg:grid-cols-[minmax(20rem,0.85fr)_minmax(26rem,1.15fr)]' : ''"
      :aria-label="focusLabel"
    >
      <div
        class="flex min-h-[16rem] flex-col justify-between px-6 py-8 md:px-8 lg:min-h-[24rem] lg:px-10 lg:py-10"
      >
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-ink/44">
          {{ activeGroup ? "Rodzina urządzeń" : "Grupa urządzeń" }}
        </p>
        <h3
          class="mt-10 max-w-[20ch] text-[clamp(1.65rem,3.1cqw,3rem)] font-medium leading-[1.02] tracking-[-0.045em] text-ink"
        >
          {{ focusLabel }}
        </h3>
      </div>

      <figure
        v-if="focusRender"
        class="grid min-h-[19rem] place-items-center bg-white px-6 py-8 md:px-8 lg:min-h-[24rem] lg:px-10"
      >
        <NuxtImg
          :src="focusRender.src"
          :alt="focusRender.alt"
          width="1200"
          height="760"
          sizes="100vw lg:52vw"
          loading="eager"
          decoding="async"
          class="h-[17rem] w-full object-contain mix-blend-multiply md:h-[20rem] lg:h-[22rem]"
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
