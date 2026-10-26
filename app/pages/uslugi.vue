<script setup lang="ts">
import { services } from "~~/data/services";

const designService = services[0]!;
const emergencyService = services[1]!;
const repairService = services[2]!;
const metalService = services[3]!;
const weldingService = services[4]!;

const designPoints = designService.sections?.[0]?.points ?? [];
const designFeatures = designService.sections?.slice(1) ?? [];
const emergencyPrimary = emergencyService.sections?.[0];
const emergencySummary = emergencyService.sections?.[1]?.paragraphs ?? [];
const repairPrimary = repairService.sections?.[0];
const repairFeatures = repairService.sections?.slice(1) ?? [];
const metalPoints = metalService.sections?.[0]?.points ?? [];

const serviceNumber = (index: number) => String(index + 1).padStart(2, "0");

const splitSpecification = (specification: string) => {
  const [label, ...value] = specification.split(" — ");

  return {
    label,
    value: value.join(" — "),
  };
};

useSeoMeta({
  title: "Usługi | Termospec",
  description:
    "Zakres usług Termospec: projektowanie systemów klimatyzacji i wentylacji, serwis 24/7, remonty urządzeń chłodniczych, obróbka metali oraz konstrukcje stalowe.",
});
</script>

<template>
  <main aria-label="Usługi" class="bg-surface text-ink">
    <section
      aria-labelledby="services-title"
      class="pb-[clamp(3rem,3.4vw,4.1rem)] pt-[calc(var(--site-header-height)+clamp(3rem,5vw,6rem))]"
    >
      <div class="design-shell">
        <div class="grid gap-8 lg:grid-cols-[58fr_42fr] lg:items-end lg:gap-0">
          <div>
            <SectionEyebrow label="Zakres usług" />
            <h1 id="services-title" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)]">
              Usługi
            </h1>
          </div>

          <p class="design-lead max-w-[44rem] lg:pb-[clamp(0.25rem,0.6vw,0.75rem)]">
            Poza działalnością stricte produkcyjną, oferujemy szeroki zakres usług – od projektowania i modernizacji instalacji, poprzez montaż i uruchomienie urządzeń, aż po ich regularny serwis, konserwację oraz remonty.
          </p>
        </div>

        <nav aria-label="Zakres usług" class="mt-[clamp(2.5rem,4.15vw,5rem)]">
          <ul class="grid gap-4 sm:grid-cols-2 lg:grid-cols-5 lg:gap-[clamp(1rem,1.6vw,1.9rem)]">
            <li v-for="(service, index) in services" :key="service.slug">
              <a
                :href="`#${service.slug}`"
                class="group flex h-full min-h-[clamp(11rem,13vw,15.5rem)] flex-col rounded-[clamp(1.5rem,2.1vw,2.5rem)] p-[clamp(1.5rem,2vw,2.4rem)] transition-colors"
                :class="index === 1 ? 'bg-ink text-white hover:bg-brand' : 'bg-white text-heading hover:bg-ink hover:text-white'"
              >
                <span class="text-[clamp(1rem,1.15vw,1.38rem)] font-semibold leading-none" :class="index === 1 ? 'text-white' : 'text-brand group-hover:text-white'">
                  {{ serviceNumber(index) }}
                </span>
                <span class="mt-auto pt-8 text-[clamp(1.1rem,1.2vw,1.45rem)] font-bold leading-[1.25]">
                  {{ service.label }}
                </span>
                <span aria-hidden="true" class="mt-4 transition-transform group-hover:translate-x-1" :class="index === 1 ? 'text-white' : 'text-brand group-hover:text-white'">→</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </section>

    <section
      :id="designService.slug"
      class="scroll-mt-[var(--site-header-height)] bg-white py-[clamp(3.5rem,4.1vw,5rem)]"
      :aria-labelledby="`${designService.slug}-title`"
    >
      <div class="design-shell">
        <SectionEyebrow :label="serviceNumber(0)" />
        <h2 :id="`${designService.slug}-title`" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)] max-w-[22ch]">
          {{ designService.label }}
        </h2>

        <div class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-[clamp(2rem,4vw,4.8rem)]">
          <div>
            <p v-for="paragraph in designService.intro" :key="paragraph" class="design-lead max-w-[48rem]">
              {{ paragraph }}
            </p>

            <ul class="mt-[clamp(2rem,2.6vw,3.1rem)] grid gap-x-10 gap-y-[clamp(0.5rem,0.75vw,0.9rem)] md:grid-cols-2">
              <li v-for="point in designPoints" :key="point" class="design-body flex gap-2">
                <span aria-hidden="true" class="text-brand">–</span>
                {{ point }}
              </li>
            </ul>

            <img
              src="/images/realizations/uklad-chlodzenia-instalacja-przemyslowa.png"
              alt="Przemysłowa instalacja chłodnicza Termospec"
              width="1600"
              height="900"
              loading="lazy"
              decoding="async"
              class="mt-[clamp(2.5rem,3.5vw,4.2rem)] aspect-[1.85/1] w-full rounded-[clamp(1.25rem,2.35vw,2.8rem)] object-cover"
            >
          </div>

          <div class="grid content-start gap-[clamp(1rem,1.6vw,1.9rem)]">
            <article
              v-for="feature in designFeatures"
              :key="feature.title"
              class="rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-surface p-[clamp(1.75rem,3vw,3.6rem)]"
            >
              <h3 class="design-subheading">{{ feature.title }}</h3>
              <div class="my-[clamp(1.25rem,1.6vw,1.9rem)] h-0.5 bg-line" />
              <p v-for="paragraph in feature.paragraphs" :key="paragraph" class="design-body mt-3 first-of-type:mt-0">
                {{ paragraph }}
              </p>
            </article>

            <article v-if="designService.cta" class="rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-ink p-[clamp(1.75rem,3vw,3.6rem)] text-white">
              <p class="text-[clamp(1.05rem,1.31vw,1.57rem)] font-semibold leading-[1.5]">
                {{ designService.cta }}
              </p>
              <NuxtLink to="/#kontakt" class="design-button mt-[clamp(1.5rem,2.1vw,2.5rem)] bg-brand text-white hover:bg-white hover:text-brand">
                wyślij zapytanie <span aria-hidden="true">→</span>
              </NuxtLink>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section
      :id="emergencyService.slug"
      class="scroll-mt-[var(--site-header-height)] py-[clamp(3.5rem,4.1vw,5rem)]"
      :aria-labelledby="`${emergencyService.slug}-title`"
    >
      <div class="design-shell">
        <div class="rounded-[clamp(1.75rem,3.1vw,3.75rem)] bg-ink px-[clamp(1.5rem,3.85vw,4.6rem)] py-[clamp(2.5rem,4.6vw,5.5rem)] text-white">
          <p class="flex items-center gap-5 text-[clamp(0.8rem,0.92vw,1.1rem)] font-medium uppercase leading-none tracking-[0.24em] text-white/70">
            <span aria-hidden="true" class="h-0.5 w-16 shrink-0 bg-brand lg:w-24" />
            {{ serviceNumber(1) }}
          </p>
          <h2 :id="`${emergencyService.slug}-title`" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)] text-white">
            {{ emergencyService.label }}
          </h2>

          <div class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 lg:grid-cols-2 lg:gap-[clamp(2rem,4.6vw,5.5rem)]">
            <div>
              <div class="space-y-5">
                <p
                  v-for="(paragraph, index) in emergencyService.intro"
                  :key="paragraph"
                  class="text-[clamp(1rem,1.15vw,1.38rem)] leading-[1.6]"
                  :class="index === 0 ? 'text-[clamp(1.05rem,1.31vw,1.57rem)] text-white' : 'text-white/75'"
                >
                  {{ paragraph }}
                </p>
              </div>

              <div class="my-[clamp(2rem,2.6vw,3.1rem)] h-0.5 bg-white/15" />

              <h3 class="design-subheading text-white">{{ emergencyPrimary?.title }}</h3>
              <p v-for="paragraph in emergencyPrimary?.paragraphs" :key="paragraph" class="mt-4 text-[clamp(1rem,1.15vw,1.38rem)] leading-[1.6] text-white/75">
                {{ paragraph }}
              </p>

              <div class="mt-6 space-y-4">
                <p v-for="paragraph in emergencySummary" :key="paragraph" class="text-[clamp(1rem,1.15vw,1.38rem)] leading-[1.6] text-white/75">
                  {{ paragraph }}
                </p>
              </div>
            </div>

            <div class="flex flex-col">
              <ul class="grid gap-[clamp(0.75rem,1vw,1.2rem)]">
                <li
                  v-for="point in emergencyPrimary?.points"
                  :key="point"
                  class="flex gap-2 text-[clamp(1.05rem,1.31vw,1.57rem)] leading-[1.45] text-white"
                >
                  <span aria-hidden="true" class="text-brand">–</span>
                  {{ point }}
                </li>
              </ul>

              <p v-if="emergencyService.cta" class="mt-[clamp(2rem,3vw,3.6rem)] text-[clamp(1rem,1.15vw,1.38rem)] font-semibold leading-[1.6] text-white">
                {{ emergencyService.cta }}
              </p>
              <ServiceHotline class="mt-[clamp(1.25rem,1.6vw,1.9rem)]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      :id="repairService.slug"
      class="scroll-mt-[var(--site-header-height)] bg-white py-[clamp(3.5rem,4.1vw,5rem)]"
      :aria-labelledby="`${repairService.slug}-title`"
    >
      <div class="design-shell">
        <SectionEyebrow :label="serviceNumber(2)" />
        <h2 :id="`${repairService.slug}-title`" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)] max-w-[22ch]">
          {{ repairService.label }}
        </h2>

        <div class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-[clamp(2rem,4vw,4.8rem)]">
          <div>
            <div class="space-y-5">
              <p v-for="(paragraph, index) in repairService.intro" :key="paragraph" :class="index === 0 ? 'design-lead' : 'design-body'">
                {{ paragraph }}
              </p>
            </div>

            <article class="mt-[clamp(2rem,3vw,3.6rem)] rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-surface p-[clamp(1.75rem,3vw,3.6rem)]">
              <h3 class="design-subheading">{{ repairPrimary?.title }}</h3>
              <p class="design-body mt-2">W ramach usług wykonujemy m.in.:</p>
              <div class="my-[clamp(1.25rem,1.6vw,1.9rem)] h-0.5 bg-line" />
              <ul class="grid gap-x-10 gap-y-[clamp(0.5rem,0.75vw,0.9rem)] md:grid-cols-2">
                <li v-for="point in repairPrimary?.points" :key="point" class="design-body flex gap-2">
                  <span aria-hidden="true" class="text-brand">–</span>
                  {{ point }}
                </li>
              </ul>
            </article>

            <article v-if="repairService.cta" class="mt-[clamp(1rem,1.6vw,1.9rem)] rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-ink p-[clamp(1.75rem,3vw,3.6rem)] text-white">
              <p class="text-[clamp(1.05rem,1.31vw,1.57rem)] font-semibold leading-[1.5]">{{ repairService.cta }}</p>
              <NuxtLink to="/#kontakt" class="design-button mt-[clamp(1.5rem,2.1vw,2.5rem)] bg-brand text-white hover:bg-white hover:text-brand">
                wyślij zapytanie <span aria-hidden="true">→</span>
              </NuxtLink>
            </article>
          </div>

          <div class="grid content-start gap-[clamp(1rem,1.6vw,1.9rem)]">
            <img
              src="/images/products/chlodziarka-bezposredniego-dzialania-wyrobisko-ujecie-01.png"
              alt="Urządzenie chłodnicze Termospec podczas pracy"
              width="1200"
              height="900"
              loading="lazy"
              decoding="async"
              class="aspect-[4/3] w-full rounded-[clamp(1.25rem,2.35vw,2.8rem)] object-cover"
            >

            <article v-for="feature in repairFeatures" :key="feature.title" class="rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-surface p-[clamp(1.75rem,3vw,3.6rem)]">
              <h3 class="design-subheading">{{ feature.title }}</h3>
              <p v-for="paragraph in feature.paragraphs" :key="paragraph" class="design-body mt-4">
                {{ paragraph }}
              </p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section
      :id="metalService.slug"
      class="scroll-mt-[var(--site-header-height)] py-[clamp(3.5rem,4.1vw,5rem)]"
      :aria-labelledby="`${metalService.slug}-title`"
    >
      <div class="design-shell">
        <SectionEyebrow :label="serviceNumber(3)" />
        <h2 :id="`${metalService.slug}-title`" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)]">
          {{ metalService.label }}
        </h2>

        <div class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 lg:grid-cols-[58fr_42fr] lg:gap-[clamp(2rem,4vw,4.8rem)]">
          <div class="space-y-5">
            <p v-for="(paragraph, index) in metalService.intro" :key="paragraph" :class="index === 0 ? 'design-lead font-semibold' : 'design-body'">
              {{ paragraph }}
            </p>
          </div>

          <ul class="grid content-start gap-3">
            <li
              v-for="point in metalPoints"
              :key="point"
              class="design-body flex gap-2 rounded-[clamp(1rem,1.3vw,1.55rem)] bg-white px-[clamp(1.25rem,1.6vw,1.9rem)] py-[clamp(1rem,1.15vw,1.4rem)] text-heading"
            >
              <span aria-hidden="true" class="text-brand">–</span>
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="mt-[clamp(3.5rem,5vw,6rem)]">
          <SectionEyebrow label="Park maszynowy naszej firmy" />

          <div class="mt-[clamp(2rem,2.6vw,3.1rem)] grid gap-5 lg:grid-cols-2 lg:gap-[clamp(1.5rem,2.4vw,2.9rem)]">
            <article
              v-for="machine in metalService.machines"
              :key="machine.title"
              class="flex flex-col rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-white p-[clamp(1.75rem,3vw,3.6rem)]"
            >
              <h3 class="design-subheading">{{ machine.title }}</h3>
              <p class="design-body mt-4">{{ machine.description }}</p>

              <dl class="mt-[clamp(1.5rem,2.1vw,2.5rem)] border-t-2 border-line">
                <div
                  v-for="specification in machine.specifications"
                  :key="specification"
                  class="flex items-start justify-between gap-6 border-b border-line py-[clamp(0.65rem,0.8vw,0.95rem)] text-[clamp(0.9rem,0.92vw,1.1rem)] leading-snug"
                >
                  <dt class="text-muted">{{ splitSpecification(specification).label }}</dt>
                  <dd class="text-right font-semibold text-heading">{{ splitSpecification(specification).value }}</dd>
                </div>
              </dl>
            </article>
          </div>

          <p v-if="metalService.closing" class="design-body mt-[clamp(2rem,3vw,3.6rem)] max-w-[60rem]">
            {{ metalService.closing }}
          </p>
        </div>
      </div>
    </section>

    <section
      :id="weldingService.slug"
      class="scroll-mt-[var(--site-header-height)] bg-white py-[clamp(3.5rem,4.1vw,5rem)]"
      :aria-labelledby="`${weldingService.slug}-title`"
    >
      <div class="design-shell">
        <SectionEyebrow :label="serviceNumber(4)" />
        <h2 :id="`${weldingService.slug}-title`" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)] max-w-[22ch]">
          {{ weldingService.label }}
        </h2>

        <div class="mt-[clamp(2.5rem,4vw,4.8rem)] grid gap-10 lg:grid-cols-2 lg:items-center lg:gap-[clamp(2rem,4vw,4.8rem)]">
          <div class="space-y-5">
            <p v-for="(paragraph, index) in weldingService.intro" :key="paragraph" :class="index === 0 ? 'design-lead' : 'design-body'">
              {{ paragraph }}
            </p>
          </div>
          <img
            src="/images/hero/hero-obrobka-stali.jpg"
            alt="Obróbka stali w zakładzie Termospec"
            width="1920"
            height="1241"
            loading="lazy"
            decoding="async"
            class="aspect-[1.4/1] w-full rounded-[clamp(1.25rem,2.35vw,2.8rem)] object-cover"
          >
        </div>
      </div>
    </section>

    <section aria-labelledby="services-contact-title" class="py-[clamp(3.5rem,3.75vw,4.5rem)]">
      <div class="design-shell">
        <div class="grid gap-10 rounded-[clamp(1.75rem,3.1vw,3.75rem)] bg-ink px-[clamp(1.5rem,3.85vw,4.6rem)] py-[clamp(2.5rem,4.6vw,5.5rem)] text-white lg:grid-cols-[58fr_42fr] lg:items-center lg:gap-[clamp(2rem,4vw,4.8rem)]">
          <div>
            <h2 id="services-contact-title" class="max-w-[24ch] text-[clamp(1.75rem,2.3vw,2.75rem)] font-bold leading-[1.2] tracking-[-0.015em] text-white">
              Skontaktuj się z nami, aby omówić zakres prac i przygotować ofertę dopasowaną do Twoich potrzeb!
            </h2>
            <p class="mt-[clamp(1.5rem,2.1vw,2.5rem)] text-[clamp(1.05rem,1.31vw,1.57rem)] leading-[1.6] text-white/90">
              <a href="tel:+48324358050" class="hover:text-white">tel. +48 (32) 435 80 50</a><br>
              <a href="mailto:biuro@termospec.pl" class="hover:text-white">biuro@termospec.pl</a>
            </p>
            <NuxtLink to="/#kontakt" class="design-button mt-[clamp(1.5rem,2.1vw,2.5rem)] bg-brand text-white hover:bg-white hover:text-brand">
              wyślij zapytanie <span aria-hidden="true">→</span>
            </NuxtLink>
          </div>

          <ServiceHotline />
        </div>
      </div>
    </section>
  </main>
</template>
