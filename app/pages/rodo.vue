<script setup lang="ts">
import { rodoPage } from "~~/data/rodo";

useSeoMeta({
  title: "RODO | Termospec",
  description: rodoPage.description,
});
</script>

<template>
  <main class="bg-surface text-ink">
    <PageIntro eyebrow="Ochrona danych" :title="rodoPage.title" title-id="rodo-title" />

    <div class="design-shell pb-[clamp(3.5rem,4.1vw,5rem)]">
      <article class="rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-white p-[clamp(1.5rem,3.85vw,4.6rem)]">
        <p class="design-lead max-w-[64rem]">
          {{ rodoPage.intro }}
        </p>

        <ol class="mt-[clamp(1.75rem,2.6vw,3.1rem)] max-w-[64rem] border-t-2 border-line">
          <li
            v-for="(item, index) in rodoPage.items"
            :key="item"
            class="grid gap-3 border-b border-line py-[clamp(1rem,1.3vw,1.55rem)] md:grid-cols-[clamp(3rem,4vw,4.8rem)_minmax(0,1fr)]"
          >
            <span class="text-[clamp(1.05rem,1.31vw,1.57rem)] font-semibold leading-[1.4] text-brand">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <p class="design-body">
              {{ item }}
            </p>
          </li>
        </ol>
      </article>
    </div>
  </main>
</template>
