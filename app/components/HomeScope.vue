<script setup lang="ts">
import { homeScopeImage, homeScopeItems } from "~~/data/home";
</script>

<template>
  <section
    id="zakres"
    class="relative isolate overflow-hidden bg-white px-6 py-24 pt-40 lg:px-10"
  >
    <div
      class="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 overflow-hidden lg:block"
      aria-hidden="true"
    >
      <NuxtImg
        src="/budynek-termospec.png"
        alt="Termospec"
        class="h-full w-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-ink/18" />
    </div>

    <div class="relative mx-auto max-w-[96rem]">
      <div class="flex flex-col gap-8">
        <NuxtImg
          src="/termospec-logo.png"
          alt="Termospec"
          width="100"
          class="block h-auto"
        />
        <h2
          class="max-w-xl font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink"
        >
          Rozwiązania techniczne dla wymagających instalacji.
        </h2>

        <p class="max-w-2xl text-base leading-8 text-ink/62">
          Termospec łączy projektowanie, produkcję, serwis i utrzymanie systemów
          wykorzystywanych w przemyśle, górnictwie oraz infrastrukturze
          technicznej.
        </p>
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <article
          v-for="item in homeScopeItems"
          :key="item.title"
          class="relative overflow-hidden border border-brand bg-white p-8"
        >
          <h3
            class="max-w-sm text-2xl font-black leading-tight tracking-[-0.04em] text-ink"
          >
            {{ item.title }}
          </h3>

          <p class="mt-4 whitespace-pre-line text-sm leading-7 text-ink/62">
            {{ item.lead }}
          </p>

          <div class="my-6 border-t border-ink/5" />

          <ul class="space-y-3">
            <li
              v-for="point in item.points"
              :key="point"
              class="flex items-start gap-3 text-sm font-medium text-ink/75"
            >
              <span class="mt-2 h-1.5 w-1.5 shrink-0 bg-brand" />
              <span>{{ point }}</span>
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
