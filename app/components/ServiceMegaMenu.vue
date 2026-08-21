<script setup lang="ts">
import type { ServiceNavigationItem } from "~~/types/navigation";

const props = defineProps<{
  services: ServiceNavigationItem[];
}>();
</script>

<template>
  <section class="w-full rounded-[1.75rem] bg-white p-8 shadow-[0_20px_60px_rgb(18_11_56_/_0.1)]" aria-label="Kategorie usług">
    <div class="grid grid-cols-5 gap-4">
      <NuxtLink
        v-for="service in props.services"
        :key="service.slug"
        :to="service.href"
        class="group flex min-h-64 flex-col rounded-[1.5rem] p-6 transition-colors"
        :class="service.slug === 'serwis-24-7'
          ? 'bg-ink text-white hover:bg-[#1b1648]'
          : 'bg-[#f4f0ea] text-ink hover:bg-[#ebe6dd]'"
      >
        <p
          class="text-xs"
          :class="service.slug === 'serwis-24-7' ? 'text-white' : 'text-ink/38'"
        >
          Usługa
        </p>
        <h3
          class="mt-4 font-sans text-lg font-semibold leading-tight tracking-[-0.02em]"
          :class="service.slug === 'serwis-24-7' ? 'text-white' : 'text-ink'"
        >
          {{ service.label }}
        </h3>
        <span
          class="mt-auto block pt-6 text-brand transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
