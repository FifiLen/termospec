<script setup lang="ts">
import {
  homeFeaturedRealization,
  homeRealizations,
} from "~~/data/home";
</script>

<template>
  <section id="realizacje" class="bg-surface px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
    <div class="mx-auto max-w-[92rem]">
      <div
        class="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(24rem,0.9fr)] lg:items-end lg:gap-16"
      >
        <div>
          <p class="flex items-center gap-3 text-sm font-medium text-muted">
            <span class="h-2 w-2 shrink-0 rounded-full bg-brand" />
            Realizacje
          </p>

          <h2
            class="mt-7 max-w-none text-[clamp(2.75rem,5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.045em] text-ink"
          >
            <span class="xl:block">Instalacje, które pracują</span>
            <span class="xl:block">tam, gdzie warunki są</span>
            <span class="xl:block">najtrudniejsze.</span>
          </h2>
        </div>

        <p class="max-w-[38rem] text-lg leading-8 text-muted lg:pb-2 lg:text-xl lg:leading-9">
          Wybrane projekty z ostatnich lat — od chłodzenia wyrobisk podziemnych
          po instalacje procesowe w zakładach produkcyjnych.
        </p>
      </div>

      <article class="mt-14 overflow-hidden rounded-3xl bg-line/45 lg:mt-16">
        <div class="group aspect-[30/13] overflow-hidden bg-line/60">
          <img
            :src="homeFeaturedRealization.src"
            :alt="homeFeaturedRealization.alt"
            width="2400"
            height="1040"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.015]"
          />
        </div>

        <div
          class="grid gap-10 px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(28rem,0.9fr)] lg:gap-16 lg:px-12 lg:py-11"
        >
          <div>
            <p class="text-sm leading-6 text-muted">
              {{ homeFeaturedRealization.industry }}
            </p>
            <h3
              class="mt-3 max-w-2xl text-3xl font-medium leading-[1.08] tracking-[-0.035em] text-ink lg:text-4xl"
            >
              {{ homeFeaturedRealization.title }}
            </h3>
            <p class="mt-5 max-w-2xl text-base leading-7 text-muted lg:text-lg lg:leading-8">
              {{ homeFeaturedRealization.description }}
            </p>
          </div>

          <dl class="grid grid-cols-2 gap-x-8 gap-y-6 self-end">
            <div
              v-for="metric in homeFeaturedRealization.metrics"
              :key="metric.label"
            >
              <dt class="text-sm text-muted">{{ metric.label }}</dt>
              <dd class="mt-1 text-xl font-medium tracking-[-0.025em] text-ink">
                {{ metric.value }}
              </dd>
            </div>
          </dl>
        </div>
      </article>

      <div class="mt-8 grid gap-8 md:grid-cols-3 md:gap-5 lg:gap-8">
        <article v-for="realization in homeRealizations" :key="realization.title">
          <div class="group aspect-[4/3] overflow-hidden rounded-3xl bg-line/45">
            <img
              :src="realization.src"
              :alt="realization.alt"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
            />
          </div>

          <p class="mt-5 text-sm leading-6 text-muted">{{ realization.industry }}</p>
          <h3
            class="mt-2 text-2xl font-medium leading-[1.12] tracking-[-0.035em] text-ink"
          >
            {{ realization.title }}
          </h3>
          <p class="mt-4 text-base leading-7 text-muted">
            {{ realization.description }}
          </p>
        </article>
      </div>

      <div
        class="mt-14 flex flex-col gap-7 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <p class="max-w-2xl text-base leading-7 text-muted">
          Pełna lista realizacji oraz referencje dostępne na życzenie — także dla
          konkretnej branży lub typu obiektu.
        </p>

        <NuxtLink
          to="/#kontakt"
          class="group inline-flex min-h-12 shrink-0 items-center justify-center gap-4 self-start rounded-full bg-ink px-7 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-brand sm:self-auto"
        >
          Wszystkie realizacje
          <span
            aria-hidden="true"
            class="text-brand transition-transform duration-200 group-hover:translate-x-1 group-hover:text-white"
          >
            →
          </span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
