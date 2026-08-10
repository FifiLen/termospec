<script setup lang="ts">
import type { ServiceNavigationItem } from "~~/types/navigation";

const props = defineProps<{
  services: ServiceNavigationItem[];
  close?: () => void;
}>();

const closeMenu = () => {
  props.close?.();
};
</script>

<template>
  <section
    class="w-[calc(100vw-13.25rem)] max-w-[52rem] whitespace-normal overflow-hidden border-x border-b border-line bg-white shadow-lift"
    aria-label="Kategorie usług"
  >
    <header
      class="flex min-h-16 items-center justify-between gap-8 border-b border-line bg-ink px-5 text-white"
    >
      <div>
        <p class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/50">
          Zakres usług
        </p>
        <p class="mt-1 text-sm font-black">Wsparcie techniczne Termospec</p>
      </div>

      <NuxtLink
        to="/uslugi"
        class="inline-flex min-h-10 items-center gap-6 bg-brand px-4 font-mono text-[0.65rem] font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
        @click="closeMenu"
      >
        <span>Wszystkie usługi</span>
        <span aria-hidden="true">→</span>
      </NuxtLink>
    </header>

    <div class="grid grid-cols-2 gap-px bg-line">
      <NuxtLink
        v-for="service in props.services"
        :key="service.slug"
        :to="service.href"
        class="group grid min-h-28 grid-cols-[2.25rem_minmax(0,1fr)_auto] items-start gap-3 bg-white p-5 outline-none transition-colors hover:bg-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-3px] focus-visible:outline-brand"
        @click="closeMenu"
      >
        <span class="font-mono text-[0.62rem] font-bold text-brand">
          {{ service.number }}
        </span>
        <span class="text-sm font-black uppercase leading-5 text-ink">
          {{ service.label }}
        </span>
        <span class="text-brand transition-transform group-hover:translate-x-1" aria-hidden="true">
          →
        </span>
      </NuxtLink>
    </div>
  </section>
</template>
