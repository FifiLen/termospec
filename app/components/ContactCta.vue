<script setup lang="ts">
defineProps<{
  title: string
  description: string
  ctaLabel: string
  ctaHref: string
}>()
</script>

<template>
  <section class="contact-cta">
    <div>
      <p class="eyebrow">Kontakt</p>
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
    <NuxtLink class="button button-primary" :to="ctaHref">{{ ctaLabel }}</NuxtLink>
  </section>
</template>
