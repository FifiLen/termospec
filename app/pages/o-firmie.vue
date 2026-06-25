<script setup lang="ts">
import { aboutHero, aboutMetrics } from "~~/data/about";
import {
  homeProcessSteps,
  homeRealizationPhotos,
  homeScopeItems,
} from "~~/data/home";

const aboutRealizationPhotos = homeRealizationPhotos.slice(0, 3);

const { data: teamMembers } = await useAsyncData("about-team", () => {
  return queryCollection("team")
    .order("order", "ASC")
    .all()
    .then((members) => {
      return members.map((member) => ({
        name: member.name,
        role: member.role,
        photo: member.photo,
      }));
    });
});

useSeoMeta({
  title: "O firmie | Termospec",
  description:
    "Od 25 lat Termospec oferuje rozwiązania zwalczające zagrożenia temperaturowe w kopalniach podziemnych oraz tunelach.",
});
</script>

<template>
  <main aria-label="O firmie" class="bg-surface text-ink">
    <section class="border-b border-line bg-white">
      <div class="relative overflow-hidden">
        <div class="mx-auto max-w-[96rem] pr-6 lg:pr-10">
          <div class="grid lg:min-h-[46rem] lg:grid-cols-2">
            <div class="pb-16 pt-10 lg:pb-20 lg:pt-44 lg:pr-12">
              <div class="w-full max-w-2xl">
                <NuxtImg
                  src="/termospec-logo.png"
                  alt="Termospec"
                  width="128"
                  class="block h-auto"
                />

                <h1
                  class="mt-10 max-w-xl font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink"
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
    <section
      class="w-full border-y border-white bg-ink"
      aria-label="Wybrane realizacje Termospec"
    >
      <div class="grid gap-px bg-white sm:grid-cols-2 lg:grid-cols-3">
        <figure
          v-for="photo in aboutRealizationPhotos"
          :key="photo.src"
          class="relative aspect-[3/4] overflow-hidden bg-ink sm:aspect-[4/5] lg:aspect-[3/4]"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            width="1280"
            height="960"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          />
        </figure>
      </div>
    </section>
    <HomeContactForm />
  </main>
</template>
