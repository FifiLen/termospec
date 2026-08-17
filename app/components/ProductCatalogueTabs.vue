<script setup lang="ts">
import type { ProductNavigationEntry } from "~~/types/navigation";

const props = defineProps<{
  entries: ProductNavigationEntry[];
  idBase: string;
  label: string;
}>();

const selectableEntries = computed(() => {
  return props.entries.filter((entry) => entry.kind !== "description");
});

const descriptiveEntries = computed(() => {
  return props.entries.filter((entry) => entry.kind === "description");
});

const activeIndex = ref(0);

const activeEntry = computed(() => {
  return selectableEntries.value[activeIndex.value];
});

watch(selectableEntries, (entries) => {
  if (activeIndex.value >= entries.length) {
    activeIndex.value = 0;
  }
});

const tabId = (index: number) => `${props.idBase}-tab-${index}`;
const panelId = (index: number) => `${props.idBase}-panel-${index}`;

const selectEntry = async (index: number, revealProduct = false) => {
  activeIndex.value = index;

  if (!revealProduct || !import.meta.client) {
    return;
  }

  await nextTick();
  document.getElementById(panelId(index))?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
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
  <div v-if="props.entries.length" class="relative border-t border-line bg-white">
    <div
      v-if="selectableEntries.length"
      class="sticky top-16 z-30 border-b border-line bg-white/95 backdrop-blur-sm"
    >
      <div class="overflow-x-auto">
        <div
          role="tablist"
          :aria-label="props.label"
          class="flex w-max min-w-full"
        >
          <button
            v-for="(entry, index) in selectableEntries"
            :id="tabId(index)"
            :key="`${entry.label}-${index}`"
            type="button"
            role="tab"
            :aria-selected="activeIndex === index"
            :aria-controls="entry.details ? panelId(index) : undefined"
            :tabindex="activeIndex === index ? 0 : -1"
            class="min-w-24 flex-1 shrink-0 px-4 py-3.5 font-mono text-sm font-bold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px]"
            :class="
              activeIndex === index
                ? 'bg-brand text-white focus-visible:outline-white'
                : 'text-ink hover:bg-white hover:text-brand focus-visible:outline-brand'
            "
            @click="selectEntry(index, true)"
            @keydown.left.prevent="selectAdjacent($event, index, -1)"
            @keydown.right.prevent="selectAdjacent($event, index, 1)"
          >
            {{ entry.label }}
            <small
              v-if="entry.isDraft"
              class="ms-1 align-middle font-sans text-[0.6rem] font-black uppercase tracking-wide"
              :class="activeIndex === index ? 'text-white/72' : 'text-brand'"
            >
              szkic
            </small>
          </button>
        </div>
      </div>
    </div>

    <ul
      v-if="descriptiveEntries.length"
      class="grid gap-3 border-t border-line px-6 py-4 md:px-8 lg:px-10"
    >
      <li
        v-for="entry in descriptiveEntries"
        :key="entry.label"
        class="text-sm font-bold leading-6 text-ink/64"
      >
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

    <div
      v-if="activeEntry?.details"
      :id="panelId(activeIndex)"
      role="tabpanel"
      :aria-labelledby="tabId(activeIndex)"
      class="scroll-mt-28 bg-white"
    >
      <ProductCatalogueDetail
        :product="activeEntry.details"
        :is-draft="activeEntry.isDraft"
      />
    </div>
  </div>
</template>
