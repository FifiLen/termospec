<script setup lang="ts">
const props = defineProps<{
  name: string
  role: string
  photo?: string
  bio: string
  email?: string
}>()

const fallbackPhoto = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80'
</script>

<template>
  <article class="team-card">
    <img
      :src="props.photo || fallbackPhoto"
      :alt="props.name"
      width="720"
      height="720"
      loading="lazy"
      decoding="async"
    />
    <div class="team-card-body">
      <p class="role">{{ props.role }}</p>
      <h3>{{ props.name }}</h3>
      <p>{{ props.bio }}</p>
      <a v-if="props.email" class="text-link" :href="`mailto:${props.email}`">{{ props.email }}</a>
    </div>
  </article>
</template>
