<script setup lang="ts">
import { homeRealizationPhotos } from "~~/data/home";

const carousel = ref<HTMLElement | null>(null);
const canScrollPrev = ref(false);
const canScrollNext = ref(true);

const updateCarouselState = () => {
  const element = carousel.value;

  if (!element) {
    return;
  }

  const maxScroll = element.scrollWidth - element.clientWidth;

  canScrollPrev.value = element.scrollLeft > 4;
  canScrollNext.value = element.scrollLeft < maxScroll - 4;
};

const scrollRealizations = (direction: -1 | 1) => {
  const element = carousel.value;

  if (!element) {
    return;
  }

  const card = element.querySelector<HTMLElement>("[data-realization-photo]");
  const styles = window.getComputedStyle(element);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0");
  const distance = (card?.offsetWidth ?? element.clientWidth * 0.86) + gap;

  element.scrollBy({
    left: distance * direction,
    behavior: "smooth",
  });
};

onMounted(async () => {
  await nextTick();
  updateCarouselState();
  window.addEventListener("resize", updateCarouselState);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateCarouselState);
});
</script>

<template>
  <section
    id="realizacje"
    class="bg-white py-24 [--realization-gutter:1.5rem] lg:[--realization-gutter:2.5rem]"
  >
    <div class="ml-[max(var(--realization-gutter),calc((100vw-96rem)/2))]">
      <div
        class="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end pr-[max(var(--realization-gutter),calc((100vw-96rem)/2))]"
      >
        <div>
          <h2
            class="mt-5 max-w-xl font-heading text-4xl font-black leading-[0.98] tracking-[-0.05em] text-ink"
          >
            Wybrane wdrożenia i obszary prac technicznych.
          </h2>
        </div>

        <div class="flex items-center gap-3 lg:justify-end">
          <button
            type="button"
            class="grid h-11 w-11 place-items-center border border-ink/15 bg-white/55 text-ink transition duration-200 hover:border-brand/45 hover:text-brand disabled:pointer-events-none disabled:opacity-35"
            :disabled="!canScrollPrev"
            aria-label="Poprzednie realizacje"
            @click="scrollRealizations(-1)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
            >
              <path d="M15 5 8 12l7 7" />
              <path d="M9 12h11" />
            </svg>
          </button>

          <button
            type="button"
            class="grid h-11 w-11 place-items-center border border-ink/15 bg-white/55 text-ink transition duration-200 hover:border-brand/45 hover:text-brand disabled:pointer-events-none disabled:opacity-35"
            :disabled="!canScrollNext"
            aria-label="Następne realizacje"
            @click="scrollRealizations(1)"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              class="h-4 w-4"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="square"
              stroke-linejoin="miter"
            >
              <path d="M9 5l7 7-7 7" />
              <path d="M4 12h11" />
            </svg>
          </button>

          <a
            href="/produkty"
            class="inline-flex h-11 items-center justify-center bg-brand px-5 text-sm font-bold tracking-tight text-white transition duration-200 hover:bg-brand/90"
          >
            Zobacz produkty
          </a>
        </div>
      </div>

      <div
        ref="carousel"
        class="mt-10 flex gap-6 overflow-x-auto pb-8 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll="updateCarouselState"
      >
        <figure
          v-for="photo in homeRealizationPhotos"
          :key="photo.src"
          data-realization-photo
          class="group relative h-[24rem] w-[20rem] shrink-0 snap-start overflow-hidden bg-ink sm:w-[32rem] md:h-[30rem] md:w-[44rem] lg:w-[56rem] xl:w-[64rem]"
        >
          <img
            :src="photo.src"
            :alt="photo.alt"
            width="1280"
            height="780"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
          />

          <div
            class="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent p-5 md:p-7"
          >
            <figcaption class="text-sm font-bold tracking-tight text-white">
              {{ photo.label }}
            </figcaption>
          </div>
        </figure>
      </div>
    </div>
  </section>
</template>
