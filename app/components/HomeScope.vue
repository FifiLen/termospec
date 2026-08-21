<script setup lang="ts">
import { homeScopeImage, homeScopeItems } from "~~/data/home";
</script>

<template>
  <section id="zakres" class="bg-transparent px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
    <div class="mx-auto max-w-[92rem]">
      <div
        class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:items-end lg:gap-16"
      >
        <div>
          <p class="flex items-center gap-3 text-sm font-medium text-muted">
            <span class="h-2 w-2 shrink-0 rounded-full bg-brand" aria-hidden="true" />
            Zakres działalności
          </p>

          <h2
            class="mt-7 max-w-none text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.045em] text-ink"
          >
            <span class="xl:block">Rozwiązania techniczne</span>
            <span class="xl:block">dla wymagających</span>
            <span class="xl:block">instalacji.</span>
          </h2>
        </div>

        <p class="max-w-[38rem] text-lg leading-8 text-muted lg:pb-2 lg:text-xl lg:leading-9">
          Termospec łączy projektowanie, produkcję, serwis i utrzymanie systemów
          wykorzystywanych w przemyśle, górnictwie oraz infrastrukturze
          technicznej.
        </p>
      </div>

      <div class="group mt-14 aspect-[13/4] overflow-hidden rounded-3xl bg-line/45 lg:mt-16">
        <NuxtImg
          :src="homeScopeImage.src"
          :alt="homeScopeImage.alt"
          width="2600"
          height="800"
          loading="lazy"
          class="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.015]"
        />
      </div>

      <div class="mt-8 grid gap-5 lg:grid-cols-3">
        <article
          v-for="item in homeScopeItems"
          :key="item.number"
          class="flex min-h-[30rem] flex-col rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1 sm:p-9"
          :class="
            item.tone === 'brand'
              ? 'bg-brand text-white'
              : 'bg-panel-soft text-ink'
          "
        >
          <p
            class="text-sm"
            :class="item.tone === 'brand' ? 'text-white/55' : 'text-muted'"
          >
            {{ item.number }}
          </p>

          <h3
            class="mt-6 text-3xl font-medium leading-[1.06] tracking-[-0.035em]"
            :class="item.tone === 'brand' ? 'text-white' : 'text-ink'"
          >
            {{ item.title }}
          </h3>

          <p
            class="mt-5 whitespace-pre-line text-base leading-7"
            :class="item.tone === 'brand' ? 'text-white/72' : 'text-muted'"
          >
            {{ item.lead }}
          </p>

          <div
            class="my-7 border-t"
            :class="item.tone === 'brand' ? 'border-white/18' : 'border-ink/10'"
          />

          <ul class="space-y-3">
            <li
              v-for="point in item.points"
              :key="point"
              class="text-sm font-medium leading-6"
              :class="item.tone === 'brand' ? 'text-white/90' : 'text-ink/82'"
            >
              {{ point }}
            </li>
          </ul>

          <NuxtLink
            :to="item.action.href"
            class="group/action mt-auto inline-flex min-h-11 items-center gap-4 self-start rounded-full px-5 py-2.5 text-sm font-semibold transition-colors"
            :class="
              item.tone === 'brand'
                ? 'bg-white/15 text-white hover:bg-white/22'
                : 'bg-surface text-ink hover:bg-ink hover:text-white'
            "
          >
            {{ item.action.label }}
            <span
              aria-hidden="true"
              class="transition-transform duration-200 group-hover/action:translate-x-1"
              :class="item.tone === 'brand' ? 'text-white' : 'text-brand'"
            >
              →
            </span>
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>
