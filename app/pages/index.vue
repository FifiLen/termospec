<script setup lang="ts">
const home = await useHome();

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

await usePageSeo("stronaGlowna");
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
    <HomeScope v-if="home" v-bind="studioEditable(home.id)" :scope="home.scope" />
    <HomeRealizations :realizations="realizations" />
    <HomeContactForm
      v-if="company"
      :company="company"
      :topics="home?.contact.topics ?? []"
      :topics-content-id="home?.id"
    />
    <HomePartners />
  </main>
</template>
