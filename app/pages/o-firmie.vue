<script setup lang="ts">
import { aboutProfile, aboutTimeline } from "~~/data/about";

useSeoMeta({
  title: "O firmie | Termospec",
  description:
    "Termospec zapewnia kompleksową realizację i obsługę instalacji klimatyzacyjnych oraz wentylacyjnych o dużych mocach.",
});
</script>

<template>
  <main aria-label="O firmie" class="overflow-hidden bg-surface font-sans text-ink">
    <section class="px-5 pb-20 pt-32 sm:px-8 lg:px-12 lg:pb-28 lg:pt-40" aria-labelledby="about-title">
      <div class="mx-auto max-w-[92rem]">
        <p class="flex items-center gap-3 text-xs font-medium text-ink/52">
          <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          O firmie
        </p>

        <h1
          id="about-title"
          class="mt-7 max-w-[24ch] text-balance font-sans text-[clamp(2.65rem,5.2vw,5.35rem)] font-medium leading-[0.98] tracking-[-0.055em] text-ink"
        >
          {{ aboutProfile.title }}
        </h1>

        <p class="mt-8 max-w-[46rem] text-base leading-7 text-ink/58 md:text-lg md:leading-8">
          {{ aboutProfile.lead }}
        </p>

        <figure class="about-media mt-14 overflow-hidden rounded-[1.75rem] bg-[#ebe6dd] md:mt-20">
          <NuxtImg
            src="/budynek-termospec.png"
            alt="Siedziba i zakład Termospec w Żorach"
            width="2200"
            height="900"
            class="aspect-[2.45/1] min-h-64 w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </figure>

        <div class="mt-20 grid gap-12 lg:mt-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            <p class="text-[clamp(1.45rem,2.25vw,2.15rem)] font-medium leading-[1.42] tracking-[-0.025em] text-ink">
              {{ aboutProfile.intro }}
            </p>
          </div>

          <div class="lg:pt-1">
            <p class="text-base leading-7 text-ink/58 md:text-lg md:leading-8">
              {{ aboutProfile.servicesIntro }}
            </p>
            <ul class="mt-9 grid content-start gap-y-6">
              <li
                v-for="specialty in aboutProfile.specialties"
                :key="specialty"
                class="grid grid-cols-[0.5rem_1fr] gap-4 text-base leading-7 text-ink"
              >
                <span class="mt-[0.7rem] size-1.5 rounded-full bg-brand" aria-hidden="true" />
                <span>{{ specialty }}.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-label="Podejście do współpracy">
      <div class="mx-auto grid max-w-[92rem] gap-5 lg:grid-cols-2">
        <article
          v-for="(item, index) in aboutProfile.sections"
          :key="item.title"
          class="about-panel flex min-h-[22rem] flex-col justify-between rounded-[1.75rem] p-8 md:p-12 lg:p-14"
          :class="index === 0 ? 'bg-ink text-white' : 'bg-[#ebe6dd] text-ink'"
        >
          <h2 class="max-w-[16ch] font-sans text-[clamp(2rem,3vw,3.1rem)] font-medium leading-[1.05] tracking-[-0.045em]" :class="index === 0 ? 'text-white' : 'text-ink'">
            {{ item.title }}
          </h2>
          <p class="mt-12 max-w-[35rem] text-sm leading-7 md:text-base" :class="index === 0 ? 'text-white/66' : 'text-ink/58'">
            {{ item.body }}
          </p>
        </article>
      </div>
    </section>

    <section id="historia" class="px-5 py-20 sm:px-8 lg:px-12 lg:py-28" aria-labelledby="history-title">
      <div class="mx-auto max-w-[92rem]">
        <p class="flex items-center gap-3 text-xs font-medium text-ink/52">
          <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          Historia firmy
        </p>
        <h2 id="history-title" class="mt-7 max-w-[15ch] font-sans text-[clamp(2.75rem,4.7vw,4.8rem)] font-medium leading-[1.02] tracking-[-0.05em] text-ink">
          Trzy dekady konsekwentnego rozwoju.
        </h2>

        <div class="mt-20 hidden lg:block">
          <div class="grid min-h-[22rem] grid-cols-5 items-end gap-5">
            <template v-for="(milestone, index) in aboutTimeline.slice(0, 5)" :key="`top-${milestone.year}`">
              <article
                v-if="index % 2 === 0"
                class="timeline-card w-full max-w-64 justify-self-center rounded-[1.5rem] p-7 transition duration-300 hover:-translate-y-1"
                :class="index === 2 ? 'bg-ink text-white' : 'bg-[#ebe6dd] text-ink'"
              >
                <h3 class="font-sans text-xl font-semibold leading-[1.15] tracking-[-0.025em]" :class="index === 2 ? 'text-white' : 'text-ink'">
                  {{ milestone.title }}
                </h3>
                <p v-if="milestone.body" class="mt-5 text-sm leading-6" :class="index === 2 ? 'text-white/66' : 'text-ink/52'">
                  {{ milestone.body }}
                </p>
              </article>
              <div v-else aria-hidden="true" />
            </template>
          </div>

          <div class="relative mt-7 grid grid-cols-5 border-t-2 border-[#dfd8cc]">
            <div
              v-for="milestone in aboutTimeline.slice(0, 5)"
              :key="`axis-${milestone.year}`"
              class="group relative pt-7 text-center"
            >
              <span class="absolute left-1/2 top-0 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand ring-8 ring-surface transition-transform duration-300 group-hover:scale-125" aria-hidden="true" />
              <p class="text-[clamp(1.25rem,1.7vw,1.75rem)] font-medium leading-tight tracking-[-0.03em] text-brand">
                {{ milestone.year }}
              </p>
            </div>
          </div>

          <div class="grid min-h-[24rem] grid-cols-5 items-start gap-5 pt-14">
            <template v-for="(milestone, index) in aboutTimeline.slice(0, 5)" :key="`bottom-${milestone.year}`">
              <article
                v-if="index % 2 === 1"
                class="timeline-card w-full max-w-64 justify-self-center rounded-[1.5rem] bg-[#ebe6dd] p-7 text-ink transition duration-300 hover:-translate-y-1"
              >
                <h3 class="font-sans text-xl font-semibold leading-[1.15] tracking-[-0.025em] text-ink">
                  {{ milestone.title }}
                </h3>
                <p v-if="milestone.body" class="mt-5 text-sm leading-6 text-ink/52">
                  {{ milestone.body }}
                </p>
              </article>
              <div v-else aria-hidden="true" />
            </template>
          </div>
        </div>

        <ol class="relative mt-14 space-y-7 ps-8 before:absolute before:inset-y-3 before:start-1.5 before:w-px before:bg-[#dfd8cc] lg:hidden">
          <li v-for="(milestone, index) in aboutTimeline.slice(0, 5)" :key="`mobile-${milestone.year}`" class="relative">
            <span class="absolute -start-[1.875rem] top-6 size-3 rounded-full bg-brand ring-4 ring-surface" aria-hidden="true" />
            <p class="mb-3 text-lg font-medium tracking-[-0.02em] text-brand">{{ milestone.year }}</p>
            <article class="rounded-[1.5rem] p-6" :class="index === 2 ? 'bg-ink text-white' : 'bg-[#ebe6dd] text-ink'">
              <h3 class="font-sans text-xl font-semibold leading-tight" :class="index === 2 ? 'text-white' : 'text-ink'">{{ milestone.title }}</h3>
              <p v-if="milestone.body" class="mt-4 text-sm leading-6" :class="index === 2 ? 'text-white/66' : 'text-ink/52'">{{ milestone.body }}</p>
            </article>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>

<style scoped>
@keyframes about-rise {
  from {
    opacity: 0;
    transform: translateY(1.25rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (prefers-reduced-motion: no-preference) {
  .about-media {
    animation: about-rise 700ms 120ms cubic-bezier(0.22, 1, 0.36, 1) both;
  }

  .about-panel {
    transition: transform 260ms ease;
  }

  .about-panel:hover {
    transform: translateY(-0.3rem);
  }
}
</style>
