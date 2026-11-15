<script setup lang="ts">
const { data: home } = await useFetch("/api/content/home", {
  key: "home-page",
});

const { data: publishedRealizations } = await useFetch("/api/content/realizations", {
  key: "home-realizations",
});

const company = await useCompany();
const about = await useAbout();
const studioEditable = useStudioEditable();

const heroSlides = computed(() => home.value?.hero.slides ?? []);
const heroDefaultFacts = computed(() => {
  return (about.value?.metrics ?? []).slice(0, 3).map(({ value, label }) => ({ value, label }));
});
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
    <HomeHero
      v-if="heroSlides.length"
      v-bind="studioEditable(home?.id)"
      :slides="heroSlides"
      :default-facts="heroDefaultFacts"
    />
    <HomeScope />
    <HomeRealizations :realizations="realizations" />
    <HomeContactForm v-if="company" :company="company" />
    <HomePartners />
  </main>
</template>
