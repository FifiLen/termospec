<script setup lang="ts">
import { fundingPage, fundingProjects } from "~~/data/dofinansowania";

useSeoMeta({
  title: "Dofinansowania | Termospec",
  description: fundingPage.description,
});
</script>

<template>
  <main class="bg-surface text-ink">
    <PageIntro eyebrow="Dofinansowania" :title="fundingPage.title" title-id="funding-title" />

    <div class="design-shell grid gap-[clamp(1.25rem,2vw,2.4rem)] pb-[clamp(3.5rem,4.1vw,5rem)]">
      <article
        v-for="project in fundingProjects"
        :key="project.id"
        class="rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-white p-[clamp(1.5rem,3.85vw,4.6rem)]"
      >
        <p
          v-if="project.eyebrow"
          class="text-[clamp(0.8rem,0.92vw,1.1rem)] font-semibold uppercase leading-snug tracking-[0.18em] text-brand"
        >
          {{ project.eyebrow }}
        </p>

        <NuxtImg
          :src="project.image.src"
          :alt="project.image.alt"
          width="2016"
          sizes="100vw lg:1400px"
          class="mt-[clamp(1.5rem,2.1vw,2.5rem)] h-auto w-full max-w-[88rem] object-contain"
          loading="lazy"
          decoding="async"
        />

        <div class="my-[clamp(1.75rem,2.6vw,3.1rem)] h-0.5 bg-line" />

        <div class="max-w-[64rem] space-y-[clamp(1rem,1.3vw,1.55rem)]">
          <p
            v-for="paragraph in project.paragraphs"
            :key="paragraph.text"
            :class="paragraph.emphasis ? 'design-lead font-semibold italic text-heading' : 'design-body'"
          >
            <template v-if="paragraph.emphasis">„{{ paragraph.text }}”</template>
            <template v-else>{{ paragraph.text }}</template>
          </p>

          <section
            v-for="(section, index) in project.sections"
            :key="`${project.id}-${index}`"
            class="space-y-3 pt-2"
          >
            <h2 v-if="section.title" class="design-subheading">
              {{ section.title }}
            </h2>

            <p v-for="paragraph in section.paragraphs" :key="paragraph" class="design-body">
              {{ paragraph }}
            </p>

            <ul v-if="section.bullets?.length" class="grid gap-[clamp(0.4rem,0.55vw,0.65rem)]">
              <li v-for="bullet in section.bullets" :key="bullet" class="design-body flex gap-2">
                <span aria-hidden="true" class="text-brand">–</span>
                {{ bullet }}
              </li>
            </ul>
          </section>
        </div>

        <ul v-if="project.facts?.length" class="mt-[clamp(1.75rem,2.6vw,3.1rem)] max-w-[64rem] border-t-2 border-line">
          <li
            v-for="fact in project.facts"
            :key="fact.label"
            class="grid gap-1 border-b border-line py-[clamp(0.75rem,0.95vw,1.15rem)] text-[clamp(0.95rem,1.05vw,1.25rem)] leading-snug sm:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] sm:gap-6"
          >
            <template v-if="fact.value">
              <span class="text-muted">{{ fact.label }}</span>
              <span class="font-semibold text-heading">{{ fact.value }}</span>
            </template>
            <span v-else class="font-semibold text-heading sm:col-span-2">{{ fact.label }}</span>
          </li>
        </ul>
      </article>
    </div>
  </main>
</template>
