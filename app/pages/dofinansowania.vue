<script setup lang="ts">
import { fundingPage, fundingProjects } from "~~/data/dofinansowania";

useSeoMeta({
  title: "Dofinansowania | Termospec",
  description: fundingPage.description,
});
</script>

<template>
  <main class="bg-white pt-16 text-ink">
    <section class="border-b border-line px-6 py-12 lg:px-10 lg:py-16">
      <div class="mx-auto max-w-[96rem] text-center">
        <h1
          class="mx-auto max-w-5xl font-heading text-3xl font-black leading-tight text-ink md:text-5xl"
        >
          {{ fundingPage.title }}
        </h1>
        <div class="mx-auto mt-6 h-1 w-20 bg-brand" aria-hidden="true" />
      </div>
    </section>

    <section class="px-6 py-10 lg:px-10 lg:py-14">
      <div class="mx-auto max-w-[96rem] space-y-16">
        <article
          v-for="project in fundingProjects"
          :key="project.id"
          class="border-b border-brand pb-14 last:border-b-0"
        >
          <p
            v-if="project.eyebrow"
            class="mb-6 text-center font-mono text-xs font-black uppercase tracking-[0.22em] text-brand"
          >
            {{ project.eyebrow }}
          </p>

          <div class="bg-white py-4">
            <NuxtImg
              :src="project.image.src"
              :alt="project.image.alt"
              width="2016"
              sizes="100vw lg:1400px"
              class="mx-auto h-auto w-full max-w-[88rem] object-contain"
              loading="lazy"
              decoding="async"
            />
          </div>

          <div
            class="mx-auto mt-10 max-w-6xl space-y-6 text-center text-base font-medium leading-8 text-ink/72"
          >
            <p
              v-for="paragraph in project.paragraphs"
              :key="paragraph.text"
              :class="paragraph.emphasis ? 'font-black italic text-ink/82' : undefined"
            >
              <template v-if="paragraph.emphasis">„{{ paragraph.text }}”</template>
              <template v-else>{{ paragraph.text }}</template>
            </p>

            <section
              v-for="(section, index) in project.sections"
              :key="`${project.id}-${index}`"
              class="space-y-5"
            >
              <h2
                v-if="section.title"
                class="max-w-none text-base font-black leading-7 text-ink"
              >
                {{ section.title }}
              </h2>

              <p v-for="paragraph in section.paragraphs" :key="paragraph">
                {{ paragraph }}
              </p>

              <ul
                v-if="section.bullets?.length"
                class="mx-auto max-w-4xl list-none space-y-2"
              >
                <li v-for="bullet in section.bullets" :key="bullet">
                  <span aria-hidden="true">- </span>{{ bullet }}
                </li>
              </ul>
            </section>

            <dl v-if="project.facts?.length" class="space-y-4 pt-2">
              <div
                v-for="fact in project.facts"
                :key="fact.label"
                class="text-base"
              >
                <dt
                  v-if="fact.value"
                  class="inline font-black text-ink"
                >
                  {{ fact.label }}:
                </dt>
                <dd class="inline">
                  <template v-if="fact.value"> {{ fact.value }}</template>
                  <template v-else>{{ fact.label }}</template>
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
