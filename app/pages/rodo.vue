<script setup lang="ts">
import { rodoPage } from "~~/data/rodo";

useSeoMeta({
  title: "RODO | Termospec",
  description: rodoPage.description,
});
</script>

<template>
  <main class="bg-white pt-16 text-ink">
    <section class="border-b border-line px-6 py-12 lg:px-10 lg:py-16">
      <div class="mx-auto max-w-[96rem] text-center">
        <p class="font-mono text-xs font-black uppercase tracking-[0.22em] text-brand">
          ochrona danych
        </p>
        <h1
          class="mx-auto mt-5 max-w-4xl font-heading text-3xl font-black leading-tight text-ink md:text-5xl"
        >
          {{ rodoPage.title }}
        </h1>
        <div class="mx-auto mt-6 h-1 w-20 bg-brand" aria-hidden="true" />
      </div>
    </section>

    <section class="px-6 py-10 lg:px-10 lg:py-14">
      <div class="mx-auto max-w-[72rem]">
        <p class="text-base font-medium leading-8 text-ink/72">
          {{ rodoPage.intro }}
        </p>

        <ol class="mt-10 space-y-6">
          <li
            v-for="(item, index) in rodoPage.items"
            :key="item"
            class="grid gap-4 border-t border-line pt-6 md:grid-cols-[3rem_minmax(0,1fr)]"
          >
            <span class="font-mono text-sm font-black text-brand">
              {{ index + 1 }}.
            </span>
            <p class="text-base font-medium leading-8 text-ink/72">
              {{ item }}
            </p>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>
