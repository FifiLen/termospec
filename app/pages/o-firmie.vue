<script setup lang="ts">
import { aboutProfile, aboutTimeline } from "~~/data/about";

const milestones = aboutTimeline.slice(0, 5);

useSeoMeta({
  title: "O firmie | Termospec",
  description:
    "Termospec zapewnia kompleksową realizację i obsługę instalacji klimatyzacyjnych oraz wentylacyjnych o dużych mocach.",
});
</script>

<template>
  <main aria-label="O firmie" class="bg-surface text-ink">
    <section
      aria-labelledby="about-title"
      class="pb-[clamp(3.5rem,4.1vw,5rem)] pt-[calc(var(--site-header-height)+clamp(3rem,5vw,6rem))]"
    >
      <div class="design-shell">
        <SectionEyebrow label="O firmie" />

        <h1 id="about-title" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)] max-w-[28ch] text-balance">
          {{ aboutProfile.title }}
        </h1>

        <div class="mt-[clamp(1.5rem,2.5vw,3rem)] grid lg:grid-cols-[58fr_42fr]">
          <p class="design-lead max-w-[46rem] lg:col-start-2">
            {{ aboutProfile.lead }}
          </p>
        </div>

        <img
          src="/budynek-termospec.png"
          alt="Siedziba i zakład Termospec w Żorach"
          width="1672"
          height="941"
          loading="eager"
          decoding="async"
          class="mt-[clamp(2.5rem,4vw,4.8rem)] aspect-[2.45/1] min-h-64 w-full rounded-[clamp(1.5rem,4.95vw,5.95rem)] object-cover"
        >
      </div>
    </section>

    <section aria-label="Profil firmy" class="bg-white py-[clamp(3.5rem,4.1vw,5rem)]">
      <div class="design-shell grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-[clamp(2rem,4vw,4.8rem)]">
        <div>
          <SectionEyebrow label="Profil" />
          <p class="mt-[clamp(1.75rem,2.5vw,3rem)] text-[clamp(1.5rem,2.1vw,2.5rem)] font-bold leading-[1.35] tracking-[-0.01em] text-heading">
            {{ aboutProfile.intro }}
          </p>
        </div>

        <article class="rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-surface p-[clamp(1.75rem,3vw,3.6rem)]">
          <p class="design-body">
            {{ aboutProfile.servicesIntro }}
          </p>
          <div class="my-[clamp(1.25rem,1.6vw,1.9rem)] h-0.5 bg-line" />
          <ul class="grid gap-[clamp(0.5rem,0.75vw,0.9rem)]">
            <li
              v-for="specialty in aboutProfile.specialties"
              :key="specialty"
              class="design-body flex gap-2 text-heading"
            >
              <span aria-hidden="true" class="text-brand">–</span>
              {{ specialty }}
            </li>
          </ul>
          <NuxtLink to="/uslugi" class="design-button mt-[clamp(1.75rem,2.6vw,3.1rem)] bg-brand text-white hover:bg-ink">
            zobacz usługi <span aria-hidden="true">→</span>
          </NuxtLink>
        </article>
      </div>
    </section>

    <section aria-label="Podejście do współpracy" class="py-[clamp(3.5rem,4.1vw,5rem)]">
      <div class="design-shell grid gap-5 lg:grid-cols-2 lg:gap-[clamp(1.5rem,3.1vw,3.75rem)]">
        <article
          v-for="(item, index) in aboutProfile.sections"
          :key="item.title"
          class="flex flex-col rounded-[clamp(1.75rem,3.1vw,3.75rem)] p-[clamp(1.75rem,3.85vw,4.6rem)]"
          :class="index === 0 ? 'bg-ink text-white' : 'bg-white text-heading'"
        >
          <p class="text-[clamp(1.05rem,1.31vw,1.57rem)] font-semibold leading-none" :class="index === 0 ? 'text-white' : 'text-brand'">
            {{ String(index + 1).padStart(2, "0") }}
          </p>
          <h2 class="mt-[clamp(1.5rem,2.3vw,2.75rem)] max-w-[16ch] text-[clamp(2rem,2.82vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.015em] text-current">
            {{ item.title }}
          </h2>
          <div class="my-[clamp(1.5rem,2.1vw,2.5rem)] h-0.5" :class="index === 0 ? 'bg-white/15' : 'bg-line'" />
          <p class="text-[clamp(1rem,1.15vw,1.38rem)] leading-[1.6]" :class="index === 0 ? 'text-white/80' : 'text-muted'">
            {{ item.body }}
          </p>
        </article>
      </div>
    </section>

    <section id="historia" aria-labelledby="history-title" class="bg-white py-[clamp(3.5rem,4.1vw,5rem)]">
      <div class="design-shell">
        <SectionEyebrow label="Historia firmy" />
        <h2 id="history-title" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)]">
          Trzy dekady<br class="hidden lg:inline">
          konsekwentnego rozwoju.
        </h2>

        <ol class="mt-[clamp(2.5rem,4.15vw,5rem)] grid gap-6 lg:grid-cols-5 lg:gap-[clamp(1rem,1.6vw,1.9rem)]">
          <li
            v-for="milestone in milestones"
            :key="milestone.year"
            class="group relative flex flex-col ps-8 lg:ps-0"
          >
            <span aria-hidden="true" class="absolute inset-y-0 start-1.5 w-0.5 bg-line lg:hidden" />
            <p class="text-[clamp(1.5rem,2.1vw,2.5rem)] font-bold leading-none text-brand">
              {{ milestone.year }}
            </p>
            <div aria-hidden="true" class="relative my-[clamp(1.25rem,1.6vw,1.9rem)] hidden h-0.5 bg-line lg:block lg:-me-[clamp(1rem,1.6vw,1.9rem)] lg:group-last:me-0">
              <span class="absolute start-0 top-1/2 size-3.5 -translate-y-1/2 rounded-full bg-brand ring-8 ring-white" />
            </div>
            <span aria-hidden="true" class="absolute start-0 top-[0.35em] size-3.5 rounded-full bg-brand ring-4 ring-white lg:hidden" />
            <article class="mt-4 flex-1 rounded-[clamp(1.5rem,2.1vw,2.5rem)] bg-surface p-[clamp(1.5rem,2vw,2.4rem)] lg:mt-0">
              <h3 class="design-subheading text-[clamp(1.2rem,1.3vw,1.55rem)]">
                {{ milestone.title }}
              </h3>
              <p v-if="milestone.body" class="mt-3 text-[clamp(0.95rem,0.98vw,1.18rem)] leading-[1.55] text-muted">
                {{ milestone.body }}
              </p>
            </article>
          </li>
        </ol>
      </div>
    </section>
  </main>
</template>
