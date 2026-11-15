<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
} from "~~/types/navigation";
import { selectableCatalogueEntries } from "~/utils/product-catalogue";

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

const focusLabel = computed(() => {
  return activeGroup.value?.label ?? props.category.label;
});

const modelCountLabel = (count: number) => {
  const lastDigit = count % 10;
  const lastTwoDigits = count % 100;

  if (count === 1) return "model";
  if (lastDigit >= 2 && lastDigit <= 4 && (lastTwoDigits < 12 || lastTwoDigits > 14)) return "modele";
  return "modeli";
};

// Derived only from the taxonomy: "6 modeli: TS-150 – TS-400".
const modelSummary = computed(() => {
  const entries = selectableCatalogueEntries(focusEntries.value);
  const first = entries[0];
  const last = entries[entries.length - 1];

  if (!first || !last) return "";
  if (entries.length === 1) return first.label;

  return `${entries.length} ${modelCountLabel(entries.length)}: ${first.label} – ${last.label}`;
});
</script>

<template>
  <article
    :id="props.category.slug"
    class="@container scroll-mt-[calc(var(--site-header-height)+1rem)] bg-white"
  >
    <header
      :id="activeGroup?.slug"
      class="grid scroll-mt-[calc(var(--site-header-height)+1rem)] border-b border-line"
      :class="focusRender ? 'lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]' : ''"
    >
      <div class="flex flex-col justify-center px-6 py-8 md:px-8 lg:px-10 lg:py-10">
        <nav aria-label="Ścieżka w katalogu">
          <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted">
            <li>Produkty</li>
            <template v-if="activeGroup">
              <li aria-hidden="true" class="text-brand">›</li>
              <li>{{ props.category.label }}</li>
            </template>
          </ol>
        </nav>

        <h2 class="mt-4 max-w-[22ch] text-[clamp(1.75rem,3.2cqw,2.75rem)] font-bold leading-[1.12] tracking-[-0.015em] text-heading">
          {{ focusLabel }}
        </h2>

        <p v-if="modelSummary" class="mt-4 text-base font-medium text-muted">
          {{ modelSummary }}
        </p>
      </div>

      <figure
        v-if="focusRender"
        class="grid place-items-center bg-white px-6 pb-8 md:px-8 lg:px-10 lg:py-8"
      >
        <NuxtImg
          :src="focusRender.src"
          :alt="focusRender.alt"
          width="1200"
          height="760"
          sizes="sm:100vw md:100vw lg:45vw xl:45vw 2xl:45vw"
          format="webp"
          loading="eager"
          decoding="async"
          class="h-[13rem] w-full object-contain mix-blend-multiply md:h-[16rem] lg:h-[18rem]"
        />
      </figure>
    </header>

    <ProductCatalogueTabs
      v-if="focusEntries.length"
      :key="focusIdBase"
      :entries="focusEntries"
      :id-base="focusIdBase"
      :label="activeGroup ? `Modele w rodzinie ${activeGroup.label}` : `Modele w kategorii ${props.category.label}`"
      :model-value="props.activeEntryId"
      @select="emit('selectEntry', { groupSlug: activeGroup?.slug || '', entryId: $event })"
    />

    <section
      v-else
      class="px-6 py-10 md:px-8 lg:px-10"
      :aria-label="`Oferta: ${focusLabel}`"
    >
      <p class="design-body max-w-2xl">
        Szczegółową ofertę w tej grupie przygotowujemy. Zapytaj o dostępne rozwiązania — opisz obiekt i warunki pracy w formularzu kontaktowym.
      </p>
      <NuxtLink to="/#kontakt" class="design-button mt-6 bg-brand text-white hover:bg-ink">
        Zapytaj o {{ focusLabel.toLocaleLowerCase("pl") }} <span aria-hidden="true">→</span>
      </NuxtLink>
    </section>

    <ProductCatalogueDisclosure
      v-for="entry in detailedCategoryEntries"
      :key="entry.details.slug"
      :product="entry.details"
      :is-draft="entry.isDraft"
    />
  </article>
</template>
