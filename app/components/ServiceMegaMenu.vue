<script setup lang="ts">
import type { ServiceNavigationItem } from "~~/types/navigation";

const props = defineProps<{
  services: ServiceNavigationItem[];
}>();

const serviceNumber = (index: number) => String(index + 1).padStart(2, "0");
</script>

<template>
  <section class="w-full rounded-[clamp(1.5rem,2.1vw,2.5rem)] bg-white p-6 shadow-[0_20px_60px_rgb(10_24_71_/_0.12)]" aria-label="Kategorie usług">
    <div class="grid grid-cols-5 gap-4">
      <NuxtLink
        v-for="(service, index) in props.services"
        :key="service.slug"
        :to="service.href"
        class="group flex min-h-56 flex-col rounded-[1.5rem] p-6 transition-colors"
        :class="service.slug === 'serwis-24-7'
          ? 'bg-ink text-white hover:bg-brand'
          : 'bg-surface text-heading hover:bg-ink hover:text-white'"
      >
        <p
          class="text-base font-semibold leading-none"
          :class="service.slug === 'serwis-24-7' ? 'text-white' : 'text-brand group-hover:text-white'"
        >
          {{ serviceNumber(index) }}
        </p>
        <h3 class="mt-auto max-w-none pt-6 text-lg font-bold leading-tight text-current">
          {{ service.label }}
        </h3>
        <span
          class="mt-4 block transition-transform group-hover:translate-x-1"
          :class="service.slug === 'serwis-24-7' ? 'text-white' : 'text-brand group-hover:text-white'"
          aria-hidden="true"
        >
          →
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
