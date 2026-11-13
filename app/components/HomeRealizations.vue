<script setup lang="ts">
import type { RealizationData } from "~~/schemas/realization";

const props = defineProps<{
  realizations: RealizationData[];
}>();

const visibleRealizations = computed(() => props.realizations.slice(0, 3));
</script>

<template>
  <section
    id="realizacje"
    aria-labelledby="realizations-title"
    class="bg-white pb-[clamp(3.5rem,3.4vw,4.1rem)] pt-[clamp(3.5rem,4.1vw,5rem)]"
  >
    <div class="design-shell">
      <div class="grid gap-8 lg:grid-cols-[58fr_42fr] lg:items-end lg:gap-0">
        <div>
          <SectionEyebrow label="Realizacje" />

          <h2 id="realizations-title" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)]">
            Instalacje, które pracują<br class="hidden lg:inline">
            tam, gdzie warunki są<br class="hidden lg:inline">
            najtrudniejsze.
          </h2>
        </div>

        <p class="design-lead max-w-[44rem] leading-[1.4] lg:pb-[clamp(0.5rem,1vw,1.2rem)]">
          <strong class="font-semibold">Wybrane projekty z ostatnich lat</strong>
          — od chłodzenia wyrobisk podziemnych po instalacje procesowe
          w zakładach produkcyjnych.
        </p>
      </div>

      <div v-if="visibleRealizations.length" class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 md:grid-cols-3 md:gap-[clamp(1.25rem,2.4vw,2.9rem)]">
        <RealizationCard
          v-for="(realization, index) in visibleRealizations"
          :key="`${index}-${realization.title}`"
          :realization="realization"
        />
      </div>

      <div
        class="mt-[clamp(2.5rem,4.8vw,5.75rem)] flex flex-col gap-7 border-t-[6px] border-surface pt-[clamp(1.75rem,3.5vw,4.2rem)] sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="design-lead max-w-[43rem] font-semibold">
          Pełna lista realizacji oraz referencje dostępne na życzenie — także dla
          konkretnej branży lub typu obiektu.
        </p>

        <NuxtLink
          to="/#kontakt"
          class="design-button shrink-0 self-start bg-brand px-[clamp(1.75rem,4.4vw,5.3rem)] text-white hover:bg-ink sm:me-[1.5vw] sm:self-auto"
        >
          zobacz więcej realizacji
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
