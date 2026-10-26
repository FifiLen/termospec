<script setup lang="ts">
import { homeRealizations } from "~~/data/home";
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

      <div class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 md:grid-cols-3 md:gap-[clamp(1.25rem,2.4vw,2.9rem)]">
        <article v-for="realization in homeRealizations" :key="realization.title">
          <div class="group aspect-[561/286] overflow-hidden rounded-[clamp(1.25rem,2.35vw,2.8rem)] bg-surface">
            <img
              :src="realization.src"
              :alt="realization.alt"
              width="561"
              height="286"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            >
          </div>

          <p class="mt-[clamp(1.25rem,2.2vw,2.65rem)] text-[clamp(0.85rem,0.92vw,1.1rem)] font-light text-muted">
            {{ realization.industry }}
          </p>
          <h3 class="mt-[clamp(0.75rem,1.1vw,1.3rem)] text-[clamp(1.25rem,1.5vw,1.8rem)] font-bold leading-tight tracking-[-0.01em] text-heading">
            {{ realization.title }}
          </h3>
          <p class="mt-1.5 max-w-[24rem] text-[clamp(0.95rem,1.05vw,1.25rem)] leading-[1.45] text-muted">
            {{ realization.description }}
          </p>
        </article>
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
