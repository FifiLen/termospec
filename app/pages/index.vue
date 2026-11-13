<script setup lang="ts">
const { data: home } = await useFetch("/api/content/home", {
  key: "home-page",
});

const { data: publishedRealizations } = await useFetch("/api/content/realizations", {
  key: "home-realizations",
});

const heroSlides = computed(() => home.value?.hero.slides ?? []);
const realizations = useRealizations(publishedRealizations);

usePageSeo({
  standaloneTitle: true,
  title: "Termospec — systemy chłodzenia i wentylacji dla przemysłu",
  description:
    "Projektowanie, produkcja i serwis rozwiązań chłodniczych oraz wentylacyjnych dla przemysłu, górnictwa i infrastruktury technicznej.",
});
</script>

<template>
  <main aria-label="Strona główna" class="bg-surface text-ink">
    <h1 class="sr-only">Termospec — systemy chłodzenia i wentylacji dla przemysłu</h1>
    <HomeHero v-if="heroSlides.length" :slides="heroSlides" />
    <HomeScope />
    <HomeRealizations :realizations="realizations" />
    <HomeContactForm />
    <HomePartners />
  </main>
</template>
