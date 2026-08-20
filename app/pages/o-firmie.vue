<script setup lang="ts">
import {
  aboutHero,
  aboutMetrics,
  aboutProfile,
  aboutTimeline,
} from "~~/data/about";
import { homeProcessSteps, homeScopeItems } from "~~/data/home";

const { data: teamMembers } = await useFetch("/api/content/team", {
  key: "about-team",
});

useSeoMeta({
  title: "O firmie | Termospec",
  description:
    "Od blisko 30 lat Termospec oferuje rozwiązania chłodnicze, klimatyzacyjne i wentylacyjne dla przemysłu, górnictwa oraz obiektów komercyjnych.",
});
</script>

<template>
  <main aria-label="O firmie" class="bg-surface text-ink">
    <section class="border-b border-line bg-white">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[96rem] px-6 lg:px-10">
          <div class="grid lg:min-h-[46rem] lg:grid-cols-2">
            <div class="min-w-0 pb-16 pt-24 lg:pb-20 lg:pt-44 lg:pr-12">
              <div class="w-full max-w-2xl">
                <NuxtImg
                  src="/termospec-logo.png"
                  alt="Termospec"
                  width="128"
                  class="hidden h-auto lg:block"
                />

                <h1
                  class="max-w-xl font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink lg:mt-10"
                >
                  {{ aboutHero.title }}
                </h1>

                <div
                  class="mt-10 grid gap-6 text-base font-medium leading-8 text-ink/68 md:grid-cols-2"
                >
                  <p
                    v-for="(paragraph, index) in aboutHero.lead"
                    :key="paragraph"
                    :class="index === 2 ? 'md:col-span-2' : undefined"
                  >
                    {{ paragraph }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <figure
          class="relative min-h-[28rem] overflow-hidden bg-ink lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2"
        >
          <NuxtImg
            :src="aboutHero.image.src"
            :alt="aboutHero.image.alt"
            width="1200"
            height="1400"
            sizes="100vw lg:50vw"
            class="h-full w-full object-cover"
            loading="eager"
            decoding="async"
          />
        </figure>
      </div>

      <div class="px-6 lg:px-10">
        <div class="mx-auto max-w-[96rem]">
          <div class="grid gap-px border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
            <article
              v-for="(metric, index) in aboutMetrics"
              :key="metric.label"
              class="bg-white p-6 md:p-8"
            >
              <p
                class="font-mono text-[0.68rem] font-black uppercase tracking-[0.24em] text-brand"
              >
                {{ String(index + 1).padStart(2, "0") }} / {{ metric.label }}
              </p>
              <p
                class="mt-7 font-heading text-3xl font-black leading-none tracking-[-0.05em] text-ink md:text-4xl"
              >
                {{ metric.value }}
              </p>
              <p
                class="mt-5 max-w-sm text-sm font-medium leading-7 text-ink/62"
              >
                {{ metric.body }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-white px-6 py-20 lg:px-10 lg:py-24">
      <div class="mx-auto grid max-w-[96rem] gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
        <div>
          <p class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand">
            profil firmy
          </p>
          <h2
            class="mt-5 max-w-3xl font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink"
          >
            {{ aboutProfile.title }}
          </h2>
          <p class="mt-8 max-w-3xl text-base font-medium leading-8 text-ink/68">
            {{ aboutProfile.intro }}
          </p>

          <div class="mt-10 grid gap-px bg-line md:grid-cols-2">
            <article
              v-for="section in aboutProfile.sections"
              :key="section.title"
              class="bg-surface p-6 md:p-8"
            >
              <h3 class="text-xl font-black leading-tight tracking-[-0.03em] text-ink">
                {{ section.title }}
              </h3>
              <p class="mt-5 text-sm font-medium leading-7 text-ink/65">
                {{ section.body }}
              </p>
            </article>
          </div>

          <div class="mt-10 bg-ink p-7 text-white md:p-9">
            <p class="font-mono text-xs font-black uppercase tracking-[0.24em] text-brand">
              Specjalizujemy się w
            </p>
            <ul class="mt-7 space-y-4">
              <li
                v-for="specialty in aboutProfile.specialties"
                :key="specialty"
                class="flex gap-4 border-b border-white/12 pb-4 text-sm font-bold leading-6 text-white/78 last:border-b-0 last:pb-0"
              >
                <span class="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
                <span>{{ specialty }}</span>
              </li>
            </ul>
          </div>
        </div>

        <aside
          v-if="aboutTimeline.length"
          class="lg:border-s lg:border-line lg:ps-14"
          aria-labelledby="about-timeline-title"
        >
          <p class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand">
            historia firmy
          </p>
          <h3
            id="about-timeline-title"
            class="mt-4 font-heading text-2xl font-black tracking-[-0.04em] text-ink"
          >
            Kalendarium
          </h3>
          <p class="mt-4 max-w-xl text-sm font-medium leading-7 text-ink/62">
            Najważniejsze etapy rozwoju firmy — od rozpoczęcia działalności po dzisiejszą skalę realizacji.
          </p>

          <ol class="mt-10">
            <li
              v-for="milestone in aboutTimeline"
              :key="`${milestone.year}-${milestone.title}`"
              class="group relative border-s border-line pb-10 ps-8 last:border-transparent last:pb-0"
            >
              <span
                class="absolute -start-1.5 top-1 h-3 w-3 bg-brand transition-transform duration-300 group-hover:scale-125"
                aria-hidden="true"
              />
              <div class="grid gap-3 xl:grid-cols-[7.5rem_minmax(0,1fr)] xl:gap-7">
                <p class="font-mono text-xs font-black uppercase tracking-[0.14em] text-brand">
                  {{ milestone.year }}
                </p>
                <div>
                  <h4
                    class="text-lg font-black leading-tight tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand"
                  >
                    {{ milestone.title }}
                  </h4>
                  <p
                    v-if="milestone.body"
                    class="mt-3 max-w-xl text-sm font-medium leading-7 text-ink/62"
                  >
                    {{ milestone.body }}
                  </p>
                </div>
              </div>
            </li>
          </ol>
        </aside>
      </div>
    </section>

    <section class="bg-ink px-6 py-24 text-white lg:px-10">
      <div class="mx-auto max-w-[96rem]">
        <div class="w-full text-center">
          <p
            class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand"
          >
            zakres działalności
          </p>
          <h2
            class="mx-auto mt-5 w-full max-w-[96rem] font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-white"
          >
            Kompetencje skoncentrowane wokół temperatury i przepływu powietrza.
          </h2>
        </div>

        <div class="mt-12 grid gap-px bg-white/12 lg:grid-cols-3">
          <article
            v-for="item in homeScopeItems"
            :key="item.title"
            class="bg-white/[0.045] p-7 transition duration-300 hover:bg-white/[0.07]"
          >
            <p
              class="font-mono text-xs font-black uppercase tracking-[0.24em] text-brand"
            >
              {{ item.number }}
            </p>
            <h3
              class="mt-8 text-2xl font-black leading-tight tracking-[-0.04em] text-white"
            >
              {{ item.title }}
            </h3>
            <p
              class="mt-5 whitespace-pre-line text-sm font-medium leading-7 text-white/62"
            >
              {{ item.lead }}
            </p>

            <div class="my-7 border-t border-white/10" />

            <ul class="space-y-3">
              <li
                v-for="point in item.points"
                :key="point"
                class="flex gap-3 text-sm font-bold text-white/78"
              >
                <span
                  class="mt-2 h-1.5 w-1.5 shrink-0 bg-brand"
                  aria-hidden="true"
                />
                <span>{{ point }}</span>
              </li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="border-b border-line bg-white px-6 py-24 lg:px-10">
      <div class="mx-auto max-w-[96rem]">
        <div class="grid gap-8 lg:grid-cols-[0.7fr_1.3fr] lg:items-end">
          <div>
            <p
              class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand"
            >
              sposób pracy
            </p>
            <h2
              class="mt-5 max-w-lg font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink"
            >
              Od rozpoznania warunków po obsługę instalacji.
            </h2>
          </div>

          <p
            class="max-w-2xl text-base font-medium leading-8 text-ink/62 lg:justify-self-end"
          >
            Projekty techniczne wymagają ciągłości: od analizy i doboru
            urządzeń, przez wdrożenie, aż po późniejszy serwis i modernizacje.
          </p>
        </div>

        <div class="mt-12 grid gap-px bg-line md:grid-cols-2 lg:grid-cols-4">
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

            <p class="mt-4 text-sm font-medium leading-7 text-ink/62">
              {{ step.body }}
            </p>
          </article>
        </div>
      </div>
    </section>

    <TeamGrid id="zespol" :members="teamMembers || []" />
    <HomeContactForm />
  </main>
</template>
