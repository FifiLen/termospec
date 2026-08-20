<script setup lang="ts">
import { serviceNavigation } from "~~/data/navigation";
import { services } from "~~/data/services";

useSeoMeta({
  title: "Usługi | Termospec",
  description:
    "Zakres usług Termospec: projektowanie systemów klimatyzacji i wentylacji, serwis 24/7, remonty urządzeń chłodniczych, obróbka metali oraz konstrukcje stalowe.",
});
</script>

<template>
  <main class="min-h-[100svh] bg-line pt-16 text-ink">
    <section class="grid gap-px bg-line lg:grid-cols-[21rem_minmax(0,1fr)]">
      <header
        class="bg-ink px-6 py-10 text-white md:px-8 lg:sticky lg:top-16 lg:h-[calc(100svh-4rem)] lg:px-10 lg:py-12"
      >
        <p class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/50">
          Termospec / zakres
        </p>
        <h1 class="mt-5 font-heading text-4xl font-black leading-tight tracking-tight text-white">
          Usługi
        </h1>

        <nav aria-label="Zakres usług" class="mt-10 border-t border-white/14">
          <a
            v-for="service in serviceNavigation"
            :key="service.slug"
            :href="service.href"
            class="block border-b border-white/14 py-4 text-xs font-bold leading-5 text-white/70 transition-colors hover:text-white"
          >
            <span>{{ service.label }}</span>
          </a>
        </nav>
      </header>

      <div class="bg-white">
        <article
          v-for="service in services"
          :id="service.slug"
          :key="service.slug"
          class="scroll-mt-16 border-b border-line px-6 py-12 last:border-b-0 md:px-8 lg:px-10 lg:py-16"
        >
          <div class="min-w-0 max-w-5xl">
            <h2
              class="max-w-4xl text-2xl font-black uppercase leading-tight tracking-[-0.035em] text-ink md:text-3xl"
            >
              {{ service.label }}
            </h2>

            <div class="mt-7 max-w-3xl space-y-5">
              <p
                v-for="paragraph in service.intro"
                :key="paragraph"
                class="text-base font-medium leading-8 text-ink/68"
              >
                {{ paragraph }}
              </p>
            </div>

            <div v-if="service.sections?.length" class="mt-10 space-y-10">
              <section
                v-for="(section, sectionIndex) in service.sections"
                :key="section.title || sectionIndex"
                class="border-t border-line pt-7"
              >
                <h3
                  v-if="section.title"
                  class="max-w-2xl text-xl font-black leading-tight tracking-[-0.03em] text-ink"
                >
                  {{ section.title }}
                </h3>

                <div
                  v-if="section.paragraphs?.length"
                  :class="section.title ? 'mt-5' : undefined"
                  class="max-w-3xl space-y-5"
                >
                  <p
                    v-for="paragraph in section.paragraphs"
                    :key="paragraph"
                    class="text-sm font-medium leading-7 text-ink/65 md:text-base md:leading-8"
                  >
                    {{ paragraph }}
                  </p>
                </div>

                <ul
                  v-if="section.points?.length"
                  :class="section.title || section.paragraphs?.length ? 'mt-6' : undefined"
                  class="grid gap-x-8 gap-y-3 md:grid-cols-2"
                >
                  <li
                    v-for="point in section.points"
                    :key="point"
                    class="flex gap-3 text-sm font-bold leading-6 text-ink/72"
                  >
                    <span class="mt-2.5 h-1.5 w-1.5 shrink-0 bg-brand" aria-hidden="true" />
                    <span>{{ point }}</span>
                  </li>
                </ul>
              </section>
            </div>

            <section v-if="service.machines?.length" class="mt-12 border-t border-line pt-8">
              <p class="font-mono text-xs font-black uppercase tracking-[0.24em] text-brand">
                Park maszynowy naszej firmy
              </p>

              <div class="mt-7 grid gap-px bg-line xl:grid-cols-2">
                <article
                  v-for="machine in service.machines"
                  :key="machine.title"
                  class="bg-surface p-6 md:p-8"
                >
                  <h3 class="text-lg font-black uppercase leading-tight text-ink">
                    {{ machine.title }}
                  </h3>
                  <p class="mt-4 text-sm font-medium leading-7 text-ink/62">
                    {{ machine.description }}
                  </p>
                  <dl class="mt-6 border-t border-line pt-5">
                    <div
                      v-for="specification in machine.specifications"
                      :key="specification"
                      class="border-b border-line py-2.5 text-sm font-bold leading-6 text-ink/75 last:border-b-0"
                    >
                      <dd>{{ specification }}</dd>
                    </div>
                  </dl>
                </article>
              </div>
            </section>

            <p
              v-if="service.closing"
              class="mt-8 max-w-3xl border-s-2 border-brand ps-5 text-sm font-bold leading-7 text-ink/72"
            >
              {{ service.closing }}
            </p>

            <NuxtLink
              v-if="service.cta"
              to="/#kontakt"
              class="mt-10 flex max-w-3xl items-center justify-between gap-6 bg-ink px-6 py-5 text-sm font-black leading-6 text-white transition-colors hover:bg-brand"
            >
              <span>{{ service.cta }}</span>
              <span class="shrink-0 text-lg" aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>
  </main>
</template>
