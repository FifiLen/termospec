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
  <main aria-label="Usługi" class="overflow-hidden bg-surface pt-32 font-sans text-ink sm:pt-36 lg:pt-40">
    <section class="px-5 pb-16 sm:px-8 lg:px-12 lg:pb-20">
      <div class="mx-auto max-w-[92rem]">
        <p class="flex items-center gap-3 text-xs font-medium text-ink/52">
          <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
          Usługi
        </p>

        <div class="mt-8 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:gap-20">
          <h1 class="font-sans text-[clamp(3.5rem,6vw,6.5rem)] font-medium leading-[0.94] tracking-[-0.06em] text-ink">
            Usługi
          </h1>
          <p class="max-w-[42rem] text-base leading-8 text-ink/58 md:text-lg md:leading-9">
            Poza działalnością stricte produkcyjną, oferujemy szeroki zakres usług – od projektowania i modernizacji instalacji, poprzez montaż i uruchomienie urządzeń, aż po ich regularny serwis, konserwację oraz remonty.
          </p>
        </div>
      </div>
    </section>

    <nav aria-label="Zakres usług" class="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
      <div class="mx-auto grid max-w-[92rem] gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <a
          v-for="(service, index) in services"
          :key="service.slug"
          :href="`#${service.slug}`"
          class="group flex min-h-48 flex-col justify-between rounded-[1.65rem] p-7 transition duration-300 hover:-translate-y-1"
          :class="index === 1 ? 'bg-ink text-white' : 'bg-[#ebe6dd] text-ink hover:bg-[#e4ded4]'"
        >
          <span class="text-xs font-medium" :class="index === 1 ? 'text-white/46' : 'text-ink/34'">
            {{ serviceNumber(index) }}
          </span>
          <span class="mt-10 text-lg font-semibold leading-[1.25] tracking-[-0.025em]" :class="index === 1 ? 'text-white' : 'text-ink'">
            {{ service.label }}
          </span>
        </a>
      </div>
    </nav>

    <section
      :id="designService.slug"
      class="scroll-mt-32 px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"
      :aria-labelledby="`${designService.slug}-title`"
    >
      <div class="mx-auto max-w-[92rem]">
        <div>
          <h2
            :id="`${designService.slug}-title`"
            class="max-w-[27ch] font-sans text-[clamp(2.45rem,4vw,4.6rem)] font-medium uppercase leading-[1.02] tracking-[-0.05em] text-ink"
          >
            {{ designService.label }}
          </h2>
        </div>

        <div class="mt-12 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-20">
          <div>
            <p v-for="paragraph in designService.intro" :key="paragraph" class="max-w-[65ch] text-base leading-8 text-ink/60 md:text-lg md:leading-9">
              {{ paragraph }}
            </p>

            <ul class="mt-9 grid gap-x-10 gap-y-5 md:grid-cols-2">
              <li v-for="point in designPoints" :key="point" class="grid grid-cols-[0.45rem_1fr] gap-4 text-base leading-7 text-ink">
                <span class="mt-2.5 size-1.5 rounded-full bg-brand" aria-hidden="true" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <figure class="mt-12 overflow-hidden rounded-[1.9rem] bg-[#ebe6dd]">
              <NuxtImg
                src="/images/realizations/uklad-chlodzenia-instalacja-przemyslowa.png"
                alt="Przemysłowa instalacja chłodnicza Termospec"
                width="1600"
                height="900"
                class="aspect-[1.75/1] w-full object-cover"
              />
            </figure>
          </div>

          <div class="grid content-start gap-5">
            <article
              v-for="(feature, index) in designFeatures"
              :key="feature.title"
              class="rounded-[1.75rem] p-8 md:p-10"
              :class="index === 1 ? 'bg-ink text-white' : 'bg-[#ebe6dd] text-ink'"
            >
              <h3 class="font-sans text-2xl font-semibold leading-tight tracking-[-0.035em]" :class="index === 1 ? 'text-white' : 'text-ink'">
                {{ feature.title }}
              </h3>
              <p v-for="paragraph in feature.paragraphs" :key="paragraph" class="mt-5 text-sm leading-7 md:text-base md:leading-8" :class="index === 1 ? 'text-white/66' : 'text-ink/56'">
                {{ paragraph }}
              </p>
            </article>

            <NuxtLink v-if="designService.cta" to="/#kontakt" class="group rounded-[1.75rem] bg-[#eee9e2] p-8 transition-colors hover:bg-[#e5ded5] md:p-10">
              <p class="text-base font-medium leading-8 text-ink md:text-lg">
                {{ designService.cta }}
              </p>
              <span class="mt-6 inline-block text-brand transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section
      :id="emergencyService.slug"
      class="scroll-mt-28 px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20"
      :aria-labelledby="`${emergencyService.slug}-title`"
    >
      <div class="mx-auto max-w-[96rem] rounded-[2.5rem] bg-ink px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-24">
        <div>
          <h2
            :id="`${emergencyService.slug}-title`"
            class="font-sans text-[clamp(3rem,5vw,5.5rem)] font-medium uppercase leading-[0.95] tracking-[-0.055em] text-white"
          >
            {{ emergencyService.label }}
          </h2>
        </div>

        <div class="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <div class="space-y-5">
              <p v-for="(paragraph, index) in emergencyService.intro" :key="paragraph" class="text-base leading-8 md:text-lg md:leading-9" :class="index === 0 ? 'text-white/78' : 'text-white/56'">
                {{ paragraph }}
              </p>
            </div>

            <article class="mt-10 rounded-[1.75rem] bg-white/[0.07] p-8">
              <h3 class="font-sans text-2xl font-semibold leading-tight tracking-[-0.03em] text-white">
                {{ emergencyPrimary?.title }}
              </h3>
              <p v-for="paragraph in emergencyPrimary?.paragraphs" :key="paragraph" class="mt-5 text-base leading-8 text-white/66">
                {{ paragraph }}
              </p>
            </article>

            <div class="mt-9 space-y-5">
              <p v-for="paragraph in emergencySummary" :key="paragraph" class="text-base leading-8 text-white/64 md:text-lg md:leading-9">
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div>
            <ul class="grid gap-5">
              <li v-for="point in emergencyPrimary?.points" :key="point" class="grid grid-cols-[0.45rem_1fr] gap-4 text-base leading-7 text-white md:text-lg md:leading-8">
                <span class="mt-3 size-1.5 rounded-full bg-[#ef5571]" aria-hidden="true" />
                <span>{{ point }}</span>
              </li>
            </ul>

            <article class="mt-10 rounded-[1.75rem] bg-white p-8 text-ink md:p-10">
              <p v-if="emergencyService.cta" class="text-base font-medium leading-8 text-ink md:text-lg">
                {{ emergencyService.cta }}
              </p>
              <a href="tel:+48603899165" class="mt-8 flex items-end justify-between gap-5">
                <span>
                  <span class="block text-xs text-ink/38">Serwis 24h</span>
                  <span class="mt-2 block text-2xl font-semibold tracking-[-0.03em] text-ink md:text-3xl">+48 603 899 165</span>
                </span>
                <span class="rounded-full bg-brand/10 px-4 py-2 text-xs font-medium text-brand">24/7</span>
              </a>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section
      :id="repairService.slug"
      class="scroll-mt-32 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      :aria-labelledby="`${repairService.slug}-title`"
    >
      <div class="mx-auto max-w-[92rem]">
        <div>
          <h2
            :id="`${repairService.slug}-title`"
            class="max-w-[26ch] font-sans text-[clamp(2.45rem,4vw,4.6rem)] font-medium uppercase leading-[1.02] tracking-[-0.05em] text-ink"
          >
            {{ repairService.label }}
          </h2>
        </div>

        <div class="mt-12 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div>
            <div class="space-y-5">
              <p v-for="paragraph in repairService.intro" :key="paragraph" class="text-base leading-8 text-ink/60 md:text-lg md:leading-9">
                {{ paragraph }}
              </p>
            </div>

            <article class="mt-10 rounded-[1.9rem] bg-[#ebe6dd] p-8 md:p-10">
              <h3 class="font-sans text-2xl font-semibold leading-tight tracking-[-0.03em] text-ink">
                {{ repairPrimary?.title }}
              </h3>
              <p class="mt-3 text-base text-ink/52">W ramach usług wykonujemy m.in.:</p>
              <ul class="mt-7 grid gap-x-8 gap-y-5 md:grid-cols-2">
                <li v-for="point in repairPrimary?.points" :key="point" class="grid grid-cols-[0.45rem_1fr] gap-4 text-sm leading-7 text-ink md:text-base">
                  <span class="mt-2.5 size-1.5 rounded-full bg-brand" aria-hidden="true" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </article>
          </div>

          <div class="grid content-start gap-5">
            <figure class="overflow-hidden rounded-[1.9rem] bg-[#ebe6dd]">
              <NuxtImg
                src="/images/products/chlodziarka-bezposredniego-dzialania-wyrobisko-ujecie-01.png"
                alt="Urządzenie chłodnicze Termospec podczas pracy"
                width="1200"
                height="900"
                class="aspect-[4/3] w-full object-cover"
              />
            </figure>

            <article v-for="feature in repairFeatures" :key="feature.title" class="rounded-[1.75rem] bg-[#eee9e2] p-8">
              <h3 class="font-sans text-xl font-semibold leading-tight tracking-[-0.025em] text-ink">
                {{ feature.title }}
              </h3>
              <p v-for="paragraph in feature.paragraphs" :key="paragraph" class="mt-4 text-sm leading-7 text-ink/56 md:text-base md:leading-8">
                {{ paragraph }}
              </p>
            </article>

            <NuxtLink v-if="repairService.cta" to="/#kontakt" class="group rounded-[1.75rem] bg-ink p-8 transition-colors hover:bg-brand">
              <p class="text-base font-medium leading-8 text-white md:text-lg">{{ repairService.cta }}</p>
              <span class="mt-6 inline-block text-white transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <section
      :id="metalService.slug"
      class="scroll-mt-32 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      :aria-labelledby="`${metalService.slug}-title`"
    >
      <div class="mx-auto max-w-[92rem]">
        <div>
          <h2
            :id="`${metalService.slug}-title`"
            class="font-sans text-[clamp(2.45rem,4vw,4.6rem)] font-medium uppercase leading-[1.02] tracking-[-0.05em] text-ink"
          >
            {{ metalService.label }}
          </h2>
        </div>

        <div class="mt-12 grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-20">
          <div class="space-y-5">
            <p v-for="(paragraph, index) in metalService.intro" :key="paragraph" :class="index === 0 ? 'text-xl font-medium leading-9 tracking-[-0.02em] text-ink md:text-2xl md:leading-10' : 'text-base leading-8 text-ink/58 md:text-lg'">
              {{ paragraph }}
            </p>
          </div>

          <ul class="grid gap-3">
            <li v-for="point in metalPoints" :key="point" class="rounded-[1.35rem] bg-[#ebe6dd] px-6 py-5 text-base leading-7 text-ink md:text-lg md:leading-8">
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="mt-24">
          <p class="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.06em] text-ink/52">
            <span class="size-1.5 rounded-full bg-brand" aria-hidden="true" />
            Park maszynowy naszej firmy
          </p>

          <div class="mt-8 grid gap-5 lg:grid-cols-2">
            <article
              v-for="(machine, index) in metalService.machines"
              :key="machine.title"
              class="rounded-[1.9rem] p-7 md:p-9"
              :class="index === 3 ? 'bg-ink text-white' : 'bg-[#ebe6dd] text-ink'"
            >
              <div class="grid aspect-[2.1/1] place-items-end overflow-hidden rounded-[1.35rem] p-5" :class="index === 3 ? 'bg-white/[0.06]' : 'bg-surface'">
                <p class="justify-self-start text-[0.65rem] font-medium uppercase tracking-[0.14em]" :class="index === 3 ? 'text-white/34' : 'text-ink/28'">
                  Dokumentacja zdjęciowa maszyny
                </p>
              </div>

              <h3 class="mt-8 font-sans text-2xl font-semibold uppercase leading-tight tracking-[-0.03em]" :class="index === 3 ? 'text-white' : 'text-ink'">
                {{ machine.title }}
              </h3>
              <p class="mt-5 text-sm leading-7 md:text-base md:leading-8" :class="index === 3 ? 'text-white/64' : 'text-ink/56'">
                {{ machine.description }}
              </p>

              <dl class="mt-7 grid gap-2.5">
                <div
                  v-for="specification in machine.specifications"
                  :key="specification"
                  class="flex items-start justify-between gap-5 rounded-xl px-4 py-3 text-sm leading-6"
                  :class="index === 3 ? 'bg-white/[0.07]' : 'bg-surface'"
                >
                  <dt :class="index === 3 ? 'text-white/54' : 'text-ink/48'">{{ splitSpecification(specification).label }}</dt>
                  <dd class="text-right font-semibold" :class="index === 3 ? 'text-white' : 'text-ink'">{{ splitSpecification(specification).value }}</dd>
                </div>
              </dl>
            </article>
          </div>

          <p v-if="metalService.closing" class="mt-10 max-w-[88ch] text-base leading-8 text-ink/58 md:text-lg md:leading-9">
            {{ metalService.closing }}
          </p>
        </div>
      </div>
    </section>

    <section
      :id="weldingService.slug"
      class="scroll-mt-32 px-5 py-20 sm:px-8 lg:px-12 lg:py-28"
      :aria-labelledby="`${weldingService.slug}-title`"
    >
      <div class="mx-auto max-w-[92rem]">
        <div>
          <h2
            :id="`${weldingService.slug}-title`"
            class="max-w-[27ch] font-sans text-[clamp(2.45rem,4vw,4.6rem)] font-medium uppercase leading-[1.02] tracking-[-0.05em] text-ink"
          >
            {{ weldingService.label }}
          </h2>
        </div>

        <div class="mt-12 grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center lg:gap-20">
          <div class="space-y-5">
            <p v-for="paragraph in weldingService.intro" :key="paragraph" class="text-base leading-8 text-ink/60 md:text-lg md:leading-9">
              {{ paragraph }}
            </p>
          </div>
          <figure class="overflow-hidden rounded-[1.9rem] bg-[#ebe6dd]">
            <NuxtImg
              src="/images/hero/obrobka-skrawaniem-wycinanie-laserowe.png"
              alt="Obróbka i konstrukcje stalowe w zakładzie Termospec"
              width="1400"
              height="1000"
              class="aspect-[1.4/1] w-full object-cover"
            />
          </figure>
        </div>
      </div>
    </section>

    <section class="px-5 pb-24 pt-10 sm:px-8 lg:px-12 lg:pb-32">
      <div class="mx-auto grid max-w-[92rem] gap-12 rounded-[2.25rem] bg-ink px-7 py-14 text-white md:px-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-20 lg:px-16 lg:py-20">
        <h2 class="max-w-[24ch] font-sans text-[clamp(1.85rem,2.7vw,3rem)] font-medium leading-[1.1] tracking-[-0.035em] text-white">
          Skontaktuj się z nami, aby omówić zakres prac i przygotować ofertę dopasowaną do Twoich potrzeb!
        </h2>

        <dl class="grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
          <div>
            <dt class="text-xs text-white/42">Biuro</dt>
            <dd class="mt-2"><a href="tel:+48324358050" class="text-xl font-medium text-white transition-colors hover:text-white/72 md:text-2xl">+48 (32) 435 80 50</a></dd>
          </div>
          <div>
            <dt class="text-xs text-white/42">E-mail</dt>
            <dd class="mt-2"><a href="mailto:biuro@termospec.pl" class="text-xl font-medium text-white transition-colors hover:text-white/72 md:text-2xl">biuro@termospec.pl</a></dd>
          </div>
          <div>
            <dt class="text-xs text-white/42">Serwis 24h</dt>
            <dd class="mt-2"><a href="tel:+48603899165" class="text-xl font-medium text-white transition-colors hover:text-white/72 md:text-2xl">+48 603 899 165</a></dd>
          </div>
        </dl>
      </div>
    </section>
  </main>
</template>
