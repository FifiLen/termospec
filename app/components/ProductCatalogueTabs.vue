<script setup lang="ts">
import type { ProductNavigationEntry } from "~~/types/navigation";
import { hasProductContent } from "~/utils/product-catalogue";

const props = defineProps<{
  entries: ProductNavigationEntry[];
  idBase: string;
  label: string;
  modelValue?: string;
}>();

const emit = defineEmits<{
  select: [entryId: string];
}>();

const rootId = computed(() => `${props.idBase}-models`);

const selectableEntries = computed(() => {
  return props.entries.filter((entry) => entry.kind !== "description");
});

const descriptiveEntries = computed(() => {
  return props.entries.filter((entry) => entry.kind === "description");
});

const activeIndex = computed(() => {
  const selectedIndex = selectableEntries.value.findIndex((entry) => {
    return entry.id === props.modelValue;
  });

  return selectedIndex >= 0 ? selectedIndex : 0;
});

const activeEntry = computed(() => {
  return selectableEntries.value[activeIndex.value];
});

const activeHasContent = computed(() => hasProductContent(activeEntry.value?.details));

// Points visitors from an empty model to a sibling whose sheet is already authored.
const authoredSiblingIndex = computed(() => {
  return selectableEntries.value.findIndex((entry, index) => {
    return index !== activeIndex.value && hasProductContent(entry.details);
  });
});

const authoredSibling = computed(() => {
  return selectableEntries.value[authoredSiblingIndex.value];
});

const tabId = (entry: ProductNavigationEntry) => {
  return `${props.idBase}-tab-${entry.id}`;
};
const panelId = (entry: ProductNavigationEntry) => {
  return `${props.idBase}-panel-${entry.id}`;
};

const selectEntry = async (index: number, revealProduct = false) => {
  const entry = selectableEntries.value[index];

  if (!entry) {
    return;
  }

  emit("select", entry.id);

  if (!revealProduct || !import.meta.client) {
    return;
  }

  // Scroll to the model bar's own position; it then sticks above the new sheet.
  await nextTick();
  const root = document.getElementById(rootId.value);

  const offset = root ? parseFloat(getComputedStyle(root).scrollMarginTop) || 0 : 0;

  if (root && root.getBoundingClientRect().top < offset) {
    root.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const selectAdjacent = async (
  event: KeyboardEvent,
  index: number,
  direction: -1 | 1,
) => {
  const count = selectableEntries.value.length;

  if (!count) {
    return;
  }

  const nextIndex = (index + direction + count) % count;
  await selectEntry(nextIndex);
  await nextTick();

  const tabs = (event.currentTarget as HTMLElement)
    .parentElement
    ?.querySelectorAll<HTMLElement>("[role='tab']");

  tabs?.[nextIndex]?.focus();
};
</script>

<template>
  <div v-if="props.entries.length" :id="rootId" class="relative scroll-mt-[var(--site-header-height)] bg-white">
    <span :id="activeEntry?.id" class="absolute -top-px scroll-mt-[calc(var(--site-header-height)+1rem)]" aria-hidden="true" />

    <div
      v-if="selectableEntries.length"
      class="sticky top-[calc(var(--site-header-height)+0.5rem)] z-10 border-b border-line bg-white px-6 py-3 md:px-8 md:py-4 lg:px-10"
    >
      <div class="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
        <div class="flex min-w-0 flex-1 items-center gap-4">
          <p class="hidden shrink-0 text-xs font-bold uppercase tracking-[0.16em] text-muted sm:block">
            Modele
          </p>
          <div class="-my-1 min-w-0 flex-1 overflow-x-auto py-1">
            <div
              role="tablist"
              :aria-label="props.label"
              class="flex w-max gap-2"
            >
              <button
                v-for="(entry, index) in selectableEntries"
                :id="tabId(entry)"
                :key="entry.id"
                type="button"
                role="tab"
                :aria-selected="activeIndex === index"
                :aria-controls="activeIndex === index ? panelId(entry) : undefined"
                :tabindex="activeIndex === index ? 0 : -1"
                class="min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                :class="
                  activeIndex === index
                    ? 'bg-brand text-white focus-visible:outline-brand'
                    : 'bg-surface text-heading hover:bg-ink hover:text-white focus-visible:outline-brand'
                "
                @click="selectEntry(index, true)"
                @keydown.left.prevent="selectAdjacent($event, index, -1)"
                @keydown.right.prevent="selectAdjacent($event, index, 1)"
              >
                {{ entry.label }}
                <small
                  v-if="entry.isDraft"
                  class="ms-1 align-middle font-sans text-[0.6rem] font-black uppercase tracking-wide"
                  :class="activeIndex === index ? 'text-white' : 'text-brand'"
                >
                  szkic
                </small>
              </button>
            </div>
          </div>
        </div>

        <NuxtLink
          v-if="activeEntry"
          to="/#kontakt"
          class="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-brand"
        >
          Zapytaj o {{ activeEntry.label }} <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>

    <section
      v-if="descriptiveEntries.length"
      class="border-b border-line px-6 py-8 md:px-8 lg:px-10"
      :aria-label="selectableEntries.length ? 'Dodatkowe wykonania' : 'Zakres oferty'"
    >
      <ul class="max-w-3xl border-t border-line">
        <li
          v-for="entry in descriptiveEntries"
          :key="entry.label"
          class="flex gap-3 border-b border-line py-4 text-base font-semibold leading-6 text-heading"
        >
          <span aria-hidden="true" class="text-brand">–</span>
          <a
            v-if="entry.targetSlug"
            :href="`#${entry.targetSlug}`"
            class="group inline-flex items-center gap-3 underline decoration-brand/45 underline-offset-4 transition hover:text-brand"
          >
            <span>{{ entry.label }}</span>
            <span class="text-brand transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
          </a>
          <span v-else>{{ entry.label }}</span>
        </li>
      </ul>

      <NuxtLink
        v-if="!selectableEntries.length"
        to="/#kontakt"
        class="design-button mt-8 bg-brand text-white hover:bg-ink"
      >
        Wyślij zapytanie <span aria-hidden="true">→</span>
      </NuxtLink>
    </section>

    <div
      v-if="activeEntry"
      :id="panelId(activeEntry)"
      role="tabpanel"
      :aria-labelledby="tabId(activeEntry)"
      class="bg-white"
    >
      <ProductCatalogueDetail
        v-if="activeEntry.details && activeHasContent"
        :product="activeEntry.details"
        :is-draft="activeEntry.isDraft"
        hide-media
      />

      <section v-else class="px-6 py-10 md:px-8 md:py-12 lg:px-10" :aria-label="`Model ${activeEntry.label}`">
        <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand">
          Wybrany model
        </p>
        <h3 class="mt-3 text-[clamp(2rem,3.6cqw,3rem)] font-bold leading-[1.08] tracking-[-0.015em] text-heading">
          {{ activeEntry.label }}
        </h3>
        <p class="design-body mt-5 max-w-2xl">
          Szczegółowa karta modelu {{ activeEntry.label }} jest w przygotowaniu. Parametry i dokumentację otrzymasz w odpowiedzi na zapytanie.
        </p>
        <div class="mt-7 flex flex-wrap gap-3">
          <NuxtLink to="/#kontakt" class="design-button bg-brand text-white hover:bg-ink">
            Zapytaj o {{ activeEntry.label }} <span aria-hidden="true">→</span>
          </NuxtLink>
          <button
            v-if="authoredSibling"
            type="button"
            class="design-button border border-line bg-white text-heading hover:border-ink"
            @click="selectEntry(authoredSiblingIndex, true)"
          >
            Zobacz kartę {{ authoredSibling.label }}
          </button>
        </div>
      </section>
    </div>
  </div>
</template>
