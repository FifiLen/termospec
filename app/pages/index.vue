<script setup lang="ts">
const { data: home } = await useFetch("/api/content/home", {
  key: "home-page",
});

const heroSlides = computed(() => home.value?.hero.slides ?? []);

useSeoMeta({
  title: "Termospec — systemy chłodzenia i wentylacji dla przemysłu",
  description:
    "Projektowanie, produkcja i serwis rozwiązań chłodniczych oraz wentylacyjnych dla przemysłu, górnictwa i infrastruktury technicznej.",
});
</script>

<template>
  <main aria-label="Strona główna" class="bg-surface text-ink">
    <HomeHero v-if="heroSlides.length" :slides="heroSlides" />

    <div class="relative isolate overflow-hidden bg-surface">
      <svg
        aria-hidden="true"
        viewBox="0 0 1600 1000"
        preserveAspectRatio="none"
        fill="none"
        class="pointer-events-none absolute inset-0 z-0 h-full w-full text-signal"
      >
        <path
          d="M -100 170 L 1700 440"
          stroke="currentColor"
          stroke-width="44"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M -100 240 L 1700 510"
          stroke="currentColor"
          stroke-width="44"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M 1700 580 L -100 870"
          stroke="currentColor"
          stroke-width="44"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
        <path
          d="M 1700 650 L -100 940"
          stroke="currentColor"
          stroke-width="44"
          stroke-linecap="butt"
          vector-effect="non-scaling-stroke"
        />
      </svg>

      <div class="relative z-10">
        <HomeScope />
      </div>
      <div class="relative z-10">
        <HomePartners />
      </div>
    </div>

    <!-- <HomeProcess /> -->
    <HomeRealizations />
    <HomeContactForm />
  </main>
</template>
