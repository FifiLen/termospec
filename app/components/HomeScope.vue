<script setup lang="ts">
import { homeScopeImage, homeScopeItems } from "~~/data/home";
</script>

<template>
  <section
    id="zakres"
    aria-labelledby="scope-title"
    class="bg-surface pb-[clamp(3.5rem,3.4vw,4.1rem)] pt-[clamp(3.5rem,3.4vw,4.1rem)]"
  >
    <div class="design-shell">
      <div class="grid gap-8 lg:grid-cols-[58fr_42fr] lg:items-end lg:gap-0">
        <div>
          <SectionEyebrow label="Zakres działalności" />

          <h2 id="scope-title" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)]">
            Rozwiązania techniczne<br class="hidden lg:inline">
            dla wymagających<br class="hidden lg:inline">
            instalacji.
          </h2>
        </div>

        <p class="design-lead max-w-[44rem] lg:pb-[clamp(0.5rem,1vw,1.2rem)]">
          <strong class="font-semibold">Termospec</strong> łączy projektowanie,
          produkcję, serwis i utrzymanie systemów wykorzystywanych w przemyśle,
          górnictwie oraz infrastrukturze technicznej.
        </p>
      </div>

      <img
        :src="homeScopeImage.src"
        :alt="homeScopeImage.alt"
        :width="homeScopeImage.width"
        :height="homeScopeImage.height"
        loading="lazy"
        decoding="async"
        class="mt-6 h-auto w-full lg:mt-[clamp(0.5rem,1.25vw,1.5rem)]"
      >

      <div class="mt-[clamp(2rem,4.15vw,5rem)] grid gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-[clamp(1.5rem,3.1vw,3.75rem)]">
        <article
          v-for="item in homeScopeItems"
          :key="item.number"
          class="relative flex flex-col rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-white px-[clamp(1.75rem,3.4vw,4.1rem)] pb-[clamp(2rem,2.85vw,3.4rem)] pt-[clamp(2rem,3.45vw,4.1rem)]"
        >
          <span
            aria-hidden="true"
            class="scope-icon absolute right-[clamp(1.25rem,2.1vw,2.5rem)] top-[clamp(1.25rem,1.35vw,1.6rem)] size-[clamp(3rem,4.1vw,4.9rem)] bg-brand"
            :style="{ '--scope-icon': `url(${item.icon})` }"
          />

          <p class="text-[clamp(1.05rem,1.31vw,1.57rem)] font-semibold leading-none text-brand">
            {{ item.number }}
          </p>

          <h3
            class="mt-[clamp(1.5rem,2.3vw,2.75rem)] max-w-[9ch] text-[clamp(2rem,2.82vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.015em] text-heading"
          >
            {{ item.title }}
          </h3>

          <p class="mt-[clamp(1rem,1.5vw,1.8rem)] whitespace-pre-line text-[clamp(1rem,1.15vw,1.38rem)] leading-[1.42] text-muted">
            {{ item.lead }}
          </p>

          <div class="my-[clamp(1.5rem,2.1vw,2.5rem)] h-0.5 bg-line" />

          <ul class="space-y-[clamp(0.4rem,0.55vw,0.65rem)]">
            <li
              v-for="point in item.points"
              :key="point"
              class="flex gap-2 text-[clamp(1rem,1.15vw,1.38rem)] leading-[1.42] text-muted"
            >
              <span aria-hidden="true" class="text-brand">–</span>
              {{ point }}
            </li>
          </ul>

          <div aria-hidden="true" class="min-h-[clamp(2rem,3.5vw,4.2rem)] flex-1" />

          <NuxtLink
            :to="item.action.href"
            class="design-button self-start bg-brand px-[clamp(1.75rem,2.85vw,3.4rem)] text-white hover:bg-ink"
          >
            {{ item.action.label }}
            <span aria-hidden="true">→</span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.scope-icon {
  mask: var(--scope-icon) center / contain no-repeat;
}
</style>
