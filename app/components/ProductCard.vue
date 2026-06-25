<script setup lang="ts">
const props = defineProps<{
  title: string
  slug: string
  lead: string
  shortDescription: string
  category: string
  powerRange?: string
  applications?: string[]
  features?: string[]
  heroImage?: string
  imageAlt?: string
  isFeatured?: boolean
}>()
</script>

<template>
  <article class="product-family-card" :class="{ 'has-media': props.heroImage }">
    <figure
      v-if="props.heroImage"
      class="product-family-media"
    >
      <NuxtImg
        :src="props.heroImage"
        :alt="props.imageAlt || props.title"
        width="900"
        height="675"
        sizes="100vw sm:50vw lg:33vw"
        loading="lazy"
        decoding="async"
      />
    </figure>
    <div class="product-family-body">
      <div class="meta-row">
        <span>{{ props.category }}</span>
        <span v-if="props.powerRange">{{ props.powerRange }}</span>
      </div>
      <h3>{{ props.title }}</h3>
      <p>{{ props.shortDescription }}</p>
      <ul v-if="props.applications?.length" class="mini-feature-list">
        <li v-for="application in props.applications.slice(0, 3)" :key="application">
          {{ application }}
        </li>
      </ul>
    </div>
  </article>
</template>
