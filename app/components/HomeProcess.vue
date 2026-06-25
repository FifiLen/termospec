<script setup lang="ts">
import { homeProcessSteps } from "~~/data/home";
</script>

<template>
  <section class="border-y border-ink/10 bg-white px-6 py-24 lg:px-10">
    <div class="mx-auto max-w-[96rem]">
      <div class="max-w-3xl">
        <p
          class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand"
        >
          zaplecze techniczne
        </p>

        <h2
          class="mt-5 font-heading text-[clamp(2.1rem,3.5vw,3.8rem)] font-black leading-[0.98] tracking-[-0.05em] text-ink"
        >
          Od rozpoznania warunków po serwis instalacji.
        </h2>

        <p class="mt-6 max-w-2xl text-base leading-8 text-ink/62">
          Projekty przemysłowe wymagają nie tylko dostarczenia urządzeń, ale też
          zrozumienia środowiska pracy, parametrów instalacji i późniejszej
          eksploatacji.
        </p>
      </div>

      <div class="mt-14 grid gap-px bg-ink/10 md:grid-cols-2 lg:grid-cols-4">
        <article
          v-for="step in homeProcessSteps"
          :key="step.number"
          class="bg-white p-7"
        >
          <p
            class="font-mono text-xs font-black uppercase tracking-[0.22em] text-brand"
          >
            {{ step.number }}
          </p>

          <h3 class="mt-8 text-xl font-black tracking-[-0.035em] text-ink">
            {{ step.title }}
          </h3>

          <p class="mt-4 text-sm leading-7 text-ink/62">
            {{ step.body }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
