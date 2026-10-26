<script setup lang="ts">
import type { ProductFamily, ProductMedia } from "~~/types/products";

const props = defineProps<{
  product: ProductFamily;
  isDraft?: boolean;
  hideHeader?: boolean;
  hideMedia?: boolean;
  locale?: "pl" | "en";
}>();

const labels = computed(() => {
  if (props.locale === "en") {
    return {
      applications: "Applications",
      features: "Product features",
      components: "Product components",
      relatedProducts: "Related products",
      serviceScope: "Support scope",
      draft: "Draft",
      technicalData: "Technical data",
      parameter: "Parameter",
      value: "Value",
      unit: "Unit",
      technicalNotes: "Technical data notes",
      documents: "Downloads",
      purpose: "Product purpose",
      applicationAreas: "Application areas",
      technicalDescription: "How the product works",
      productScope: "Product scope",
      gallery: "Product in its working environment",
      projects: "Related applications",
    };
  }

  return {
    applications: "Zastosowanie",
    features: "Cechy urządzenia",
    components: "Elementy urządzenia",
    relatedProducts: "Urządzenia powiązane",
    serviceScope: "Zakres wsparcia",
    draft: "Szkic",
    technicalData: "Dane techniczne",
    parameter: "Parametr",
    value: "Wartość",
    unit: "Jednostka",
    technicalNotes: "Uwagi do danych technicznych",
    documents: "Dokumenty do pobrania",
    purpose: "Przeznaczenie urządzenia",
    applicationAreas: "Obszary zastosowania",
    technicalDescription: "Jak działa urządzenie",
    productScope: "Zakres produktu",
    gallery: "Urządzenie w środowisku pracy",
    projects: "Powiązane zastosowania",
  };
});

const intro = computed(() => {
  return props.product.shortDescription || props.product.lead;
});

const primaryMedia = computed<ProductMedia | undefined>(() => {
  if (props.product.heroImage) {
    return {
      src: props.product.heroImage,
      alt: props.product.imageAlt || props.product.title,
    };
  }

  return props.product.gallery[0];
});

const sketchBackgroundStyle = computed(() => {
  if (!props.product.headerSketch) {
    return undefined;
  }

  const source = props.product.headerSketch.src.replaceAll('"', '\\"');

  return {
    backgroundImage: `url("${source}")`,
  };
});

const overviewSection = computed(() => {
  const applicationTitle = labels.value.applications.toLocaleLowerCase();

  return props.product.sections.find((section) => {
    return section.title.trim().toLocaleLowerCase() === applicationTitle;
  });
});

const narrativeSections = computed(() => {
  return props.product.sections.filter((section) => section !== overviewSection.value);
});

const supportingLists = computed(() => {
  return [
    { title: labels.value.features, items: props.product.features },
    { title: labels.value.components, items: props.product.components },
    { title: labels.value.relatedProducts, items: props.product.relatedProducts },
    { title: labels.value.serviceScope, items: props.product.serviceScope },
  ].filter((item) => item.items.length);
});

const hasPurpose = computed(() => {
  return Boolean(overviewSection.value?.body || overviewSection.value?.items.length || props.product.applications.length);
});

const purposeItems = computed(() => {
  return props.product.applications.length
    ? props.product.applications
    : overviewSection.value?.items ?? [];
});

const hasProductScope = computed(() => {
  return supportingLists.value.length || props.product.documents.length;
});
</script>

<template>
  <article class="relative isolate scroll-mt-28 overflow-hidden bg-white">
    <div
      v-if="props.product.headerSketch"
      aria-hidden="true"
      :style="sketchBackgroundStyle"
      class="pointer-events-none absolute inset-0 z-0 bg-center bg-no-repeat opacity-[0.11] mix-blend-multiply [background-size:auto_24rem] sm:[background-size:auto_34rem] lg:[background-size:100%_auto]"
    />

    <div class="relative z-10 w-full px-6 py-10 md:px-8 md:py-12 lg:px-10 lg:py-14">
      <div
        v-if="!props.hideHeader || primaryMedia"
        class="grid items-center gap-10 lg:gap-14"
        :class="!props.hideHeader && primaryMedia && !props.hideMedia ? 'lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.1fr)]' : ''"
      >
        <header
          v-if="!props.hideHeader"
          class="w-full"
        >
          <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand">
              Wybrany model
            </p>
            <span
              v-if="props.product.powerRange"
              class="text-xs font-semibold text-ink/44"
            >
              {{ props.product.powerRange }}
            </span>
            <span
              v-if="props.isDraft"
              class="text-xs font-bold uppercase tracking-[0.12em] text-brand"
            >
              {{ labels.draft }}
            </span>
          </div>

          <div class="mt-4 flex flex-wrap items-end gap-x-5 gap-y-2">
            <h3 class="text-[clamp(2.75rem,5cqw,5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-ink">
              {{ props.product.title }}
            </h3>
            <span
              v-if="props.product.modelCode && props.product.modelCode !== props.product.title"
              class="pb-1 text-sm font-semibold text-ink/44"
            >
              {{ props.product.modelCode }}
            </span>
          </div>

          <p v-if="intro" class="mt-6 max-w-2xl text-base leading-7 text-ink/64 md:text-lg md:leading-8">
            {{ intro }}
          </p>
        </header>

        <div v-if="primaryMedia && !props.hideMedia" class="grid items-center">
          <figure class="grid min-h-56 place-items-center overflow-hidden">
            <NuxtImg
              :src="primaryMedia.src"
              :alt="primaryMedia.alt"
              width="900"
              height="680"
              sizes="100vw lg:60vw"
              loading="lazy"
              decoding="async"
              class="h-full max-h-96 w-full object-contain mix-blend-multiply"
            />
          </figure>
        </div>
      </div>

      <dl
        v-if="props.product.specs.length"
        class="mt-10 grid border-y border-line sm:grid-cols-2 xl:grid-cols-3"
      >
        <div
          v-for="spec in props.product.specs"
          :key="`${spec.label}-${spec.value}`"
          class="py-5 sm:pe-6 xl:border-e xl:border-line xl:px-6 xl:first:ps-0 xl:last:border-e-0"
        >
          <dt class="text-[0.68rem] font-bold uppercase tracking-[0.14em] text-ink/42">
            {{ spec.label }}
          </dt>
          <dd class="mt-2 text-base font-semibold leading-6 text-ink">{{ spec.value }}</dd>
        </div>
      </dl>

      <section
        v-if="hasPurpose"
        class="mt-12 grid overflow-hidden rounded-2xl bg-surface lg:mt-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)]"
      >
        <div class="bg-ink px-6 py-8 text-white md:px-8 md:py-10 lg:px-10 lg:py-12">
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
            {{ labels.purpose }}
          </p>
          <h4 class="mt-4 max-w-lg text-3xl font-bold leading-[1.12] tracking-[-0.015em] text-white md:text-4xl">
            {{ overviewSection?.title || labels.applications }}
          </h4>
          <p v-if="overviewSection?.body" class="mt-6 max-w-xl text-base leading-8 text-white/72">
            {{ overviewSection.body }}
          </p>
        </div>

        <div v-if="purposeItems.length" class="px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12">
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            {{ labels.applicationAreas }}
          </p>
          <ul class="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2">
            <li
              v-for="item in purposeItems"
              :key="item"
              class="flex gap-4 border-t border-line pt-4 text-base font-semibold leading-6 text-ink"
            >
              <span class="mt-2 size-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section v-if="props.product.gallery.length" class="mt-12 lg:mt-16">
        <div class="mb-6 border-b border-line pb-5">
          <h4 class="text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink md:text-3xl">
            {{ labels.gallery }}
          </h4>
        </div>

        <div class="grid gap-3 sm:grid-cols-2">
          <figure
            v-for="media in props.product.gallery"
            :key="media.src"
            class="overflow-hidden rounded-2xl bg-surface"
            :class="props.product.gallery.length === 1 ? 'sm:col-span-2' : ''"
          >
            <NuxtImg
              :src="media.src"
              :alt="media.alt"
              width="1200"
              height="760"
              sizes="100vw sm:50vw lg:40vw"
              loading="lazy"
              decoding="async"
              class="aspect-[16/10] h-full w-full object-cover"
            />
          </figure>
        </div>
      </section>

      <section v-if="narrativeSections.length" class="mt-12 lg:mt-16">
        <div class="grid gap-8 border-b border-line pb-7 md:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] md:items-end">
          <h4 class="text-3xl font-bold leading-[1.12] tracking-[-0.015em] text-ink md:text-4xl">
            {{ labels.technicalDescription }}
          </h4>
          <p v-if="props.product.lead" class="max-w-2xl text-base leading-7 text-ink/58 md:justify-self-end">
            {{ props.product.lead }}
          </p>
        </div>

        <div class="grid gap-px overflow-hidden rounded-b-2xl bg-line md:grid-cols-2">
          <article
            v-for="section in narrativeSections"
            :key="section.title"
            class="bg-white px-1 py-8 md:px-8 md:py-10"
          >
            <h5 class="text-2xl font-semibold leading-tight tracking-[-0.025em] text-ink">
              {{ section.title }}
            </h5>
            <p v-if="section.body" class="mt-5 max-w-2xl text-base leading-8 text-ink/64">
              {{ section.body }}
            </p>
            <ul v-if="section.items.length" class="mt-6 grid gap-3">
              <li
                v-for="item in section.items"
                :key="item"
                class="flex gap-3 text-sm font-semibold leading-6 text-ink/70"
              >
                <span class="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section v-if="props.product.technicalData.length" class="mt-12 lg:mt-16">
        <h4 class="text-3xl font-bold leading-[1.12] tracking-[-0.015em] text-ink md:text-4xl">
          {{ labels.technicalData }}
        </h4>

        <div class="mt-7 overflow-x-auto border-t border-line">
          <table class="w-full min-w-lg border-collapse text-start">
            <thead>
              <tr class="border-b border-line text-xs font-black uppercase tracking-wide text-ink/42">
                <th scope="col" class="py-4 pe-5 text-start">{{ labels.parameter }}</th>
                <th scope="col" class="py-4 pe-5 text-start">{{ labels.value }}</th>
                <th scope="col" class="py-4 text-start">{{ labels.unit }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in props.product.technicalData"
                :key="`${row.label}-${row.value}-${row.unit}`"
                class="border-b border-line/70 text-sm leading-6 text-ink"
              >
                <th scope="row" class="py-4 pe-5 text-start font-bold">{{ row.label }}</th>
                <td class="py-4 pe-5 font-bold tabular-nums">{{ row.value }}</td>
                <td class="py-4 text-ink/58">{{ row.unit || "—" }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ul
          v-if="props.product.technicalNotes.length"
          class="mt-4 grid gap-2 text-xs leading-5 text-ink/58"
          :aria-label="labels.technicalNotes"
        >
          <li v-for="note in props.product.technicalNotes" :key="note">{{ note }}</li>
        </ul>
      </section>

      <section v-if="hasProductScope" class="mt-12 lg:mt-16">
        <h4 class="text-3xl font-bold leading-[1.12] tracking-[-0.015em] text-ink md:text-4xl">
          {{ labels.productScope }}
        </h4>

        <div class="mt-7 grid gap-px overflow-hidden rounded-2xl bg-line sm:grid-cols-2 xl:grid-cols-3">
          <section
            v-for="list in supportingLists"
            :key="list.title"
            class="bg-surface p-6 md:p-7"
          >
            <h5 class="text-lg font-semibold leading-tight text-ink">
              {{ list.title }}
            </h5>
            <ul class="mt-5 grid gap-3">
              <li
                v-for="item in list.items"
                :key="item"
                class="flex gap-3 text-sm font-semibold leading-6 text-ink/64"
              >
                <span class="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <section v-if="props.product.documents.length" class="bg-surface p-6 md:p-7">
            <h5 class="text-lg font-semibold leading-tight text-ink">
              {{ labels.documents }}
            </h5>
            <ul class="mt-5 grid gap-3">
              <li v-for="document in props.product.documents" :key="document.file">
                <a
                  :href="document.file"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start justify-between gap-5 text-sm font-bold leading-5 text-ink transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span>{{ document.title }}</span>
                  <span class="shrink-0 text-xs uppercase text-brand">↗</span>
                </a>
              </li>
            </ul>
          </section>
        </div>
      </section>

      <section v-if="props.product.relatedProjects.length" class="mt-12 lg:mt-16">
        <div class="mb-7 border-b border-line pb-5">
          <p class="text-xs font-bold uppercase tracking-[0.16em] text-brand">
            {{ labels.projects }}
          </p>
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          <article
            v-for="project in props.product.relatedProjects"
            :key="`${project.number}-${project.title}`"
            class="grid overflow-hidden rounded-2xl bg-surface sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
            :class="props.product.relatedProjects.length === 1 ? 'lg:col-span-2 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]' : ''"
          >
            <NuxtImg
              v-if="project.image"
              :src="project.image"
              :alt="project.imageAlt"
              width="900"
              height="720"
              sizes="100vw sm:40vw lg:24vw"
              loading="lazy"
              decoding="async"
              class="h-full min-h-56 w-full object-cover"
            />
            <div class="p-6 md:p-7">
              <p v-if="project.category" class="text-xs font-bold uppercase tracking-[0.14em] text-brand">
                {{ project.category }}
              </p>
              <h5 class="mt-3 text-xl font-semibold leading-tight text-ink">
                {{ project.title }}
              </h5>
              <p v-if="project.body" class="mt-4 text-sm leading-6 text-ink/64">
                {{ project.body }}
              </p>
              <ul v-if="project.scope.length" class="mt-5 flex flex-wrap gap-2">
                <li
                  v-for="item in project.scope"
                  :key="item"
                  class="rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-ink/64"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
    </div>
  </article>
</template>
