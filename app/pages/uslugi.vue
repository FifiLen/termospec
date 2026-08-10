<script setup lang="ts">
import { serviceNavigation } from "~~/data/navigation";

useSeoMeta({
  title: "Usługi | Termospec",
  description:
    "Zakres usług Termospec: projektowanie systemów klimatyzacji i wentylacji, serwis 24/7, remonty urządzeń chłodniczych, obróbka metali oraz konstrukcje stalowe.",
});
</script>

<template>
  <main class="min-h-[100svh] bg-line pt-16 text-ink">
    <section class="grid gap-px bg-line lg:grid-cols-[21rem_minmax(0,1fr)]">
      <header class="bg-ink px-6 py-10 text-white md:px-8 lg:min-h-[calc(100svh-4rem)] lg:px-10 lg:py-12">
        <p class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/50">
          Termospec / zakres
        </p>
        <h1 class="mt-5 font-heading text-4xl font-black leading-tight tracking-tight">
          Usługi
        </h1>
      </header>

      <div class="bg-white">
        <article
          v-for="service in serviceNavigation"
          :id="service.slug"
          :key="service.slug"
          class="scroll-mt-16 grid min-h-40 grid-cols-[3.25rem_minmax(0,1fr)] gap-5 border-b border-line px-6 py-8 last:border-b-0 md:grid-cols-[4.5rem_minmax(0,1fr)] md:items-center md:px-8 lg:min-h-44 lg:px-10"
        >
          <span class="font-mono text-xs font-bold text-brand">
            {{ service.number }}
          </span>
          <h2 class="max-w-4xl text-xl font-black uppercase leading-tight text-ink md:text-2xl">
            {{ service.label }}
          </h2>
        </article>
      </div>
    </section>
  </main>
</template>
