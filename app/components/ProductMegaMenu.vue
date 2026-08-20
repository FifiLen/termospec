<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
} from "~~/types/navigation";

const props = defineProps<{
  categories: ProductNavigationCategory[];
}>();

const menuScrollArea = ref<HTMLElement | null>(null);

const menuColumns = computed(() => {
  return [
    props.categories.slice(0, 1),
    props.categories.slice(1, 5),
    props.categories.slice(5),
  ];
});

const scrollToCategory = (slug: string) => {
  const target = menuScrollArea.value?.querySelector<HTMLElement>(
    `[data-product-category="${slug}"]`,
  );

  target?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const handleEntry = (entry: ProductNavigationEntry) => {
  if (entry.targetSlug) {
    scrollToCategory(entry.targetSlug);
  }
};
</script>

<template>
  <section
    class="w-[calc(100vw-13.25rem)] max-w-[72rem] whitespace-normal overflow-hidden border-x border-b border-line bg-white shadow-lift"
    aria-label="Kategorie i typy produktów"
  >
    <header
      class="flex min-h-16 items-center justify-between gap-8 border-b border-line bg-ink px-5 text-white"
    >
      <div>
        <p class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/50">
          Indeks techniczny
        </p>
        <p class="mt-1 text-sm font-black">Produkty Termospec</p>
      </div>

      <NuxtLink
        to="/produkty"
        class="inline-flex min-h-10 items-center gap-6 bg-brand px-4 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
      >
        <span>Otwórz katalog</span>
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </header>

    <div
      ref="menuScrollArea"
      class="grid max-h-[70vh] grid-cols-3 gap-px overflow-y-auto bg-line"
    >
      <div
        v-for="(column, columnIndex) in menuColumns"
        :key="`product-menu-column-${columnIndex}`"
        class="flex min-w-0 flex-col gap-px bg-line"
      >
        <article
          v-for="category in column"
          :key="category.slug"
          :data-product-category="category.slug"
          class="scroll-mt-4 bg-white p-5"
        >
          <div class="grid grid-cols-[2.25rem_minmax(0,1fr)] gap-3">
            <span class="pt-0.5 font-mono text-[0.62rem] font-bold text-brand">
              {{ category.number }}
            </span>

            <div class="min-w-0">
              <div class="flex items-start gap-3">
                <h3 class="text-base font-black uppercase leading-5 text-ink">
                  {{ category.label }}
                </h3>

                <img
                  v-if="category.render"
                  :src="category.render.src"
                  :alt="category.render.alt"
                  width="72"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  class="ms-auto h-12 w-18 shrink-0 object-contain"
                />
              </div>

              <ul v-if="category.entries.length" class="mt-3 grid gap-1.5">
                <li
                  v-for="entry in category.entries"
                  :key="entry.label"
                  class="text-sm font-bold leading-5 text-ink/62"
                >
                  <button
                    v-if="entry.targetSlug"
                    type="button"
                    class="text-left underline decoration-brand/45 underline-offset-4 transition hover:text-brand"
                    @click="handleEntry(entry)"
                  >
                    {{ entry.label }}
                  </button>
                  <span v-else>{{ entry.label }}</span>
                </li>
              </ul>

              <div v-if="category.groups.length" class="mt-4 grid gap-4">
                <section
                  v-for="group in category.groups"
                  :key="group.slug"
                  class="border-s border-line ps-3"
                >
                  <div class="flex items-start gap-3">
                    <h4 class="text-[0.8rem] font-black uppercase leading-5 text-ink/78">
                      {{ group.label }}
                    </h4>

                    <img
                      v-if="group.render"
                      :src="group.render.src"
                      :alt="group.render.alt"
                      width="64"
                      height="40"
                      loading="lazy"
                      decoding="async"
                      class="ms-auto h-10 w-16 shrink-0 object-contain"
                    />
                  </div>

                  <ul v-if="group.entries.length" class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                    <li
                      v-for="entry in group.entries"
                      :key="entry.label"
                      class="font-mono text-xs font-bold leading-4 text-ink/55"
                    >
                      {{ entry.label }}
                    </li>
                  </ul>
                </section>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
