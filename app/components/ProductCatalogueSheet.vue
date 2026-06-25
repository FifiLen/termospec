<script setup lang="ts">
import type {
  ProductFamily,
  ProductMedia,
  ProductSection,
} from "~~/types/products";

const props = defineProps<{
  product: ProductFamily;
  index: number;
}>();

const media = computed<ProductMedia[]>(() => {
  const items: ProductMedia[] = [];

  if (props.product.heroImage) {
    items.push({
      src: props.product.heroImage,
      alt: props.product.imageAlt || props.product.title,
    });
  }

  for (const item of props.product.gallery) {
    if (!items.some((mediaItem) => mediaItem.src === item.src)) {
      items.push(item);
    }
  }

  return items;
});

const realizationImages = computed<ProductMedia[]>(() => {
  if (!media.value.length) {
    return [];
  }

  return Array.from({ length: 6 }, (_, mediaIndex) => {
    return media.value[mediaIndex % media.value.length];
  }).filter((item): item is ProductMedia => Boolean(item));
});

const titleIncludes = (section: ProductSection, fragments: string[]) => {
  const title = section.title.toLocaleLowerCase("pl-PL");

  return fragments.some((fragment) => title.includes(fragment));
};

const findSection = (fragments: string[]) => {
  return props.product.sections.find((section) => {
    return titleIncludes(section, fragments);
  });
};

const applicationContent = computed<ProductSection>(() => {
  const source = findSection(["zastos"]);

  return {
    title: "Zastosowanie",
    body: source?.body || props.product.lead || props.product.shortDescription,
    items: source?.items.length
      ? source.items
      : props.product.applications.slice(0, 4),
  };
});

const technicalSource = computed(() => {
  return (
    props.product.sections.find((section) => {
      return (
        !titleIncludes(section, ["zastos"]) &&
        titleIncludes(section, [
          "zasada",
          "dział",
          "układ",
          "obieg",
          "pracy",
          "charakterystyka",
          "budowa",
          "współpraca",
          "wariant",
        ])
      );
    }) ??
    props.product.sections.find(
      (section) => !titleIncludes(section, ["zastos"]),
    )
  );
});

const technicalTitle = computed(() => {
  const sourceTitle =
    technicalSource.value?.title.toLocaleLowerCase("pl-PL") ?? "";

  if (
    ["budowa", "charakterystyka", "wariant", "wykon", "współpraca"].some(
      (fragment) => sourceTitle.includes(fragment),
    )
  ) {
    return "Budowa / charakterystyka";
  }

  return "Opis działania";
});

const technicalContent = computed<ProductSection>(() => {
  const source = technicalSource.value;
  const fallbackItems = props.product.features.length
    ? props.product.features
    : props.product.components;

  return {
    title: technicalTitle.value,
    body: source?.body || props.product.lead || props.product.shortDescription,
    items: source?.items.length ? source.items : fallbackItems.slice(0, 4),
  };
});
</script>

<template>
  <article
    class="scroll-mt-16 border-b border-line bg-white outline-none"
    tabindex="-1"
  >
    <header class="bg-white">
      <div
        class="flex h-12 items-center gap-5 overflow-hidden bg-ink px-6 md:px-8 lg:px-10"
      >
        <p class="shrink-0 whitespace-nowrap text-sm font-black text-white">
          {{ props.product.category }}
        </p>
        <span
          v-if="props.product.powerRange"
          class="shrink-0 whitespace-nowrap text-sm font-black text-white/68"
        >
          {{ props.product.powerRange }}
        </span>
      </div>

      <div
        class="grid py-12"
        :class="props.product.headerSketch ? 'lg:grid-cols-2' : ''"
      >
        <div class="flex items-center bg-white px-6 pb-0 pt-5 md:px-8 lg:px-10">
          <div class="max-w-4xl">
            <h2
              class="font-heading text-4xl font-black leading-tight tracking-tight text-ink"
            >
              {{ props.product.title }}
            </h2>

            <p class="mt-5 max-w-3xl text-base leading-8 text-ink/64">
              {{ props.product.shortDescription }}
            </p>
          </div>
        </div>

        <figure
          v-if="props.product.headerSketch"
          class="grid items-end justify-items-center bg-white px-6 pb-0 pt-7 md:px-8 md:pt-8 lg:px-10 lg:pt-9"
        >
          <div
            class="grid h-[13rem] w-full place-items-center overflow-hidden md:h-[14rem] lg:h-[15rem] xl:h-[16rem]"
          >
            <NuxtImg
              :src="props.product.headerSketch.src"
              :alt="props.product.headerSketch.alt"
              width="900"
              sizes="100vw lg:50vw"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-contain object-bottom mix-blend-multiply"
            />
          </div>
        </figure>
      </div>
    </header>

    <section
      class="grid gap-px border-t border-line bg-line lg:grid-cols-2"
      aria-label="Opis produktu"
    >
      <div class="bg-white p-6 md:p-8 lg:p-10">
        <h3 class="text-2xl font-black leading-tight text-ink">
          {{ applicationContent.title }}
        </h3>

        <p class="mt-5 max-w-3xl text-base leading-8 text-ink/64">
          {{ applicationContent.body }}
        </p>

        <ul v-if="applicationContent.items.length" class="mt-6 grid gap-3">
          <li
            v-for="item in applicationContent.items"
            :key="item"
            class="grid grid-cols-[0.65rem_minmax(0,1fr)] gap-3 text-sm font-bold leading-6 text-ink/72 before:mt-2 before:h-1.5 before:w-1.5 before:bg-brand before:content-['']"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="bg-white p-6 md:p-8 lg:p-10">
        <h3 class="text-2xl font-black leading-tight text-ink">
          {{ technicalContent.title }}
        </h3>

        <p class="mt-5 max-w-3xl text-base leading-8 text-ink/64">
          {{ technicalContent.body }}
        </p>

        <ul v-if="technicalContent.items.length" class="mt-6 grid gap-3">
          <li
            v-for="item in technicalContent.items"
            :key="item"
            class="grid grid-cols-[0.65rem_minmax(0,1fr)] gap-3 text-sm font-bold leading-6 text-ink/72 before:mt-2 before:h-1.5 before:w-1.5 before:bg-brand before:content-['']"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section
      v-if="realizationImages.length"
      class="overflow-hidden bg-line"
      aria-label="Realizacje"
    >
      <div class="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-3">
        <figure
          v-for="(item, mediaIndex) in realizationImages"
          :key="`${props.product.slug}-realization-${item.src}-${mediaIndex}`"
          class="group relative aspect-[4/3] overflow-hidden bg-soft"
        >
          <NuxtImg
            :src="item.src"
            :alt="item.alt"
            width="900"
            height="680"
            sizes="100vw sm:50vw lg:33vw"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
          />
        </figure>
      </div>
    </section>
  </article>
</template>
