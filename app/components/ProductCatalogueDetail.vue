<script setup lang="ts">
import type { ProductFamily, ProductMedia } from "~~/types/products";

const props = defineProps<{
  product: ProductFamily;
  isDraft?: boolean;
  hideHeader?: boolean;
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

const informationLists = computed(() => {
  return [
    { title: labels.value.applications, items: props.product.applications },
    { title: labels.value.features, items: props.product.features },
    { title: labels.value.components, items: props.product.components },
    { title: labels.value.relatedProducts, items: props.product.relatedProducts },
    { title: labels.value.serviceScope, items: props.product.serviceScope },
  ].filter((item) => item.items.length);
});

const hasPrimaryDetails = computed(() => {
  return props.product.technicalData.length || props.product.sections.length;
});

const hasSupportingDetails = computed(() => {
  return informationLists.value.length || props.product.documents.length;
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

    <div class="relative z-10 w-full px-6 py-10 md:px-10 md:py-14 lg:px-12 lg:py-16">
      <div
        v-if="!props.hideHeader || primaryMedia"
        class="grid items-center gap-10 lg:gap-14"
        :class="!props.hideHeader && primaryMedia ? 'lg:grid-cols-[minmax(0,0.82fr)_minmax(30rem,1.18fr)]' : ''"
      >
        <header
          v-if="!props.hideHeader"
          class="w-full bg-surface p-7 sm:p-9 lg:p-10 xl:p-12"
        >
          <p class="max-w-[28ch] font-heading text-[clamp(1.5rem,2.5vw,2.25rem)] font-black leading-[1.08] tracking-tight text-ink">
            {{ props.product.category }}
          </p>

          <div class="mt-5 flex flex-wrap items-end gap-x-5 gap-y-2">
            <h3 class="font-mono text-[clamp(1.25rem,1.8vw,1.75rem)] font-bold leading-none tracking-tight text-brand">
              {{ props.product.title }}
            </h3>
            <span
              v-if="props.product.modelCode && props.product.modelCode !== props.product.title"
              class="pb-1 font-mono text-xs font-bold text-ink/48"
            >
              {{ props.product.modelCode }}
            </span>
            <span
              v-if="props.isDraft"
              class="pb-1 text-xs font-black uppercase text-brand"
            >
              {{ labels.draft }}
            </span>
          </div>

          <p v-if="intro" class="mt-6 max-w-xl text-base leading-7 text-ink/64">
            {{ intro }}
          </p>

          <dl
            v-if="props.product.specs.length"
            class="mt-9 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3"
          >
            <div v-for="spec in props.product.specs" :key="`${spec.label}-${spec.value}`">
              <dt class="text-[0.68rem] font-black uppercase tracking-wide text-ink/42">
                {{ spec.label }}
              </dt>
              <dd class="mt-1.5 text-sm font-black leading-5 text-ink">
                {{ spec.value }}
              </dd>
            </div>
          </dl>
        </header>

        <div v-if="primaryMedia" class="grid items-center">
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
        v-if="props.hideHeader && props.product.specs.length"
        class="mt-10 grid gap-x-8 gap-y-6 sm:grid-cols-2 xl:grid-cols-3"
      >
        <div v-for="spec in props.product.specs" :key="`${spec.label}-${spec.value}`">
          <dt class="text-[0.68rem] font-black uppercase tracking-wide text-ink/42">
            {{ spec.label }}
          </dt>
          <dd class="mt-1.5 text-sm font-black leading-5 text-ink">{{ spec.value }}</dd>
        </div>
      </dl>

      <div
        v-if="hasPrimaryDetails || hasSupportingDetails"
        class="mt-14 grid gap-12 lg:mt-18 lg:gap-16"
        :class="hasPrimaryDetails && hasSupportingDetails ? 'lg:grid-cols-[minmax(0,1fr)_20rem]' : ''"
      >
        <div v-if="hasPrimaryDetails" class="space-y-12 lg:space-y-14">
          <section v-if="props.product.technicalData.length">
            <p class="font-mono text-xs font-bold text-brand">00</p>
            <h4 class="mt-2 font-heading text-2xl font-black leading-tight text-ink">
              {{ labels.technicalData }}
            </h4>

            <div class="mt-6 overflow-x-auto">
              <table class="w-full min-w-lg border-collapse text-start">
                <thead>
                  <tr class="border-b border-line text-xs font-black uppercase tracking-wide text-ink/42">
                    <th scope="col" class="py-3 pe-5 text-start">{{ labels.parameter }}</th>
                    <th scope="col" class="py-3 pe-5 text-start">{{ labels.value }}</th>
                    <th scope="col" class="py-3 text-start">{{ labels.unit }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="row in props.product.technicalData"
                    :key="`${row.label}-${row.value}-${row.unit}`"
                    class="border-b border-line/70 text-sm leading-6 text-ink"
                  >
                    <th scope="row" class="py-3 pe-5 text-start font-bold">{{ row.label }}</th>
                    <td class="py-3 pe-5 font-mono font-bold">{{ row.value }}</td>
                    <td class="py-3 text-ink/58">{{ row.unit || "—" }}</td>
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

          <section
            v-for="(section, index) in props.product.sections"
            :key="section.title"
            class="grid gap-4 sm:grid-cols-[2.5rem_minmax(0,1fr)]"
          >
            <span class="font-mono text-xs font-bold text-brand">
              {{ String(index + 1).padStart(2, "0") }}
            </span>
            <div>
              <h4 class="font-heading text-2xl font-black leading-tight text-ink">
                {{ section.title }}
              </h4>
              <p v-if="section.body" class="mt-4 max-w-3xl text-base leading-8 text-ink/64">
                {{ section.body }}
              </p>
              <ul v-if="section.items.length" class="mt-5 grid gap-3">
                <li
                  v-for="item in section.items"
                  :key="item"
                  class="flex gap-3 text-sm font-bold leading-6 text-ink/70"
                >
                  <span class="mt-2 size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                  <span>{{ item }}</span>
                </li>
              </ul>

            </div>
          </section>
        </div>

        <aside v-if="hasSupportingDetails" class="space-y-10 lg:pt-1">
          <section v-for="list in informationLists" :key="list.title">
            <h4 class="font-heading text-lg font-black leading-tight text-ink">
              {{ list.title }}
            </h4>
            <ul class="mt-4 grid gap-3">
              <li
                v-for="item in list.items"
                :key="item"
                class="flex gap-3 text-sm font-bold leading-5 text-ink/64"
              >
                <span class="mt-1.5 size-1.5 shrink-0 bg-brand" aria-hidden="true" />
                <span>{{ item }}</span>
              </li>
            </ul>
          </section>

          <section v-if="props.product.documents.length">
            <h4 class="font-heading text-lg font-black leading-tight text-ink">
              {{ labels.documents }}
            </h4>
            <ul class="mt-4 grid gap-3">
              <li v-for="document in props.product.documents" :key="document.file">
                <a
                  :href="document.file"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex items-start justify-between gap-5 text-sm font-bold leading-5 text-ink transition-colors hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                >
                  <span>{{ document.title }}</span>
                  <span class="shrink-0 font-mono text-xs uppercase text-brand">↗</span>
                </a>
              </li>
            </ul>
          </section>
        </aside>
      </div>
    </div>
  </article>
</template>
