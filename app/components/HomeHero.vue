<script setup lang="ts">
import { gsap } from "gsap";
import { aboutMetrics } from "~~/data/about";
import type { HomeHeroSlide } from "~~/types/home";

const props = defineProps<{
  slides: HomeHeroSlide[];
}>();

const heroRoot = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const heroFacts = aboutMetrics.slice(0, 3);

let animationContext: gsap.Context | null = null;
let mediaQueries: gsap.MatchMedia | null = null;
let transitionTimeline: gsap.core.Timeline | null = null;
let autoplayCall: gsap.core.Tween | null = null;
let reducedMotion = false;
let interactionPaused = false;
let isTransitioning = false;

const autoplayDelay = 6.5;

function getContentSlides() {
  if (!heroRoot.value) {
    return [];
  }

  return Array.from(
    heroRoot.value.querySelectorAll<HTMLElement>("[data-hero-content]"),
  );
}

function getMediaSlides() {
  if (!heroRoot.value) {
    return [];
  }

  return Array.from(
    heroRoot.value.querySelectorAll<HTMLElement>("[data-hero-media-slide]"),
  );
}

function cancelAutoplay() {
  autoplayCall?.kill();
  autoplayCall = null;
}

function getProgressBars() {
  if (!heroRoot.value) {
    return [];
  }

  return Array.from(
    heroRoot.value.querySelectorAll<HTMLElement>("[data-hero-progress]"),
  );
}

function scheduleAutoplay() {
  cancelAutoplay();

  if (
    reducedMotion ||
    interactionPaused ||
    document.hidden ||
    props.slides.length < 2
  ) {
    return;
  }

  const progressBars = getProgressBars();
  const activeProgress = progressBars[0];

  gsap.set(progressBars, { scaleX: 0, transformOrigin: "left" });

  if (!activeProgress) {
    return;
  }

  autoplayCall = gsap.to(activeProgress, {
    scaleX: 1,
    duration: autoplayDelay,
    ease: "none",
    onComplete: () => {
      goToSlide((activeIndex.value + 1) % props.slides.length, 1);
    },
  });
}

function revealSlideImmediately(targetIndex: number) {
  const contentSlides = getContentSlides();
  const mediaSlides = getMediaSlides();

  contentSlides.forEach((slide, index) => {
    gsap.set(slide, {
      autoAlpha: index === targetIndex ? 1 : 0,
      zIndex: index === targetIndex ? 2 : 1,
    });

    const revealElements = slide.querySelectorAll("[data-hero-reveal]");

    if (revealElements.length) {
      gsap.set(revealElements, {
        autoAlpha: index === targetIndex ? 1 : 0,
        y: 0,
      });
    }
  });

  mediaSlides.forEach((slide, index) => {
    gsap.set(slide, {
      autoAlpha: index === targetIndex ? 1 : 0,
      zIndex: index === targetIndex ? 2 : 1,
    });

    gsap.set(slide.querySelector("[data-hero-image]"), {
      scale: 1,
      xPercent: 0,
    });
  });

  activeIndex.value = targetIndex;
}

function goToSlide(targetIndex: number, direction = 1) {
  if (
    targetIndex === activeIndex.value ||
    isTransitioning ||
    targetIndex < 0 ||
    targetIndex >= props.slides.length
  ) {
    scheduleAutoplay();
    return;
  }

  cancelAutoplay();

  if (reducedMotion) {
    revealSlideImmediately(targetIndex);
    return;
  }

  const contentSlides = getContentSlides();
  const mediaSlides = getMediaSlides();
  const currentContentSlide = contentSlides[activeIndex.value];
  const nextContentSlide = contentSlides[targetIndex];
  const currentMediaSlide = mediaSlides[activeIndex.value];
  const nextMediaSlide = mediaSlides[targetIndex];

  if (!currentContentSlide || !nextContentSlide || !currentMediaSlide || !nextMediaSlide) {
    return;
  }

  const currentImage = currentMediaSlide.querySelector("[data-hero-image]");
  const currentContent = currentContentSlide.querySelectorAll("[data-hero-reveal]");
  const nextImage = nextMediaSlide.querySelector("[data-hero-image]");
  const nextContent = nextContentSlide.querySelectorAll("[data-hero-reveal]");

  isTransitioning = true;
  activeIndex.value = targetIndex;
  transitionTimeline?.kill();

  gsap.set(nextContentSlide, { autoAlpha: 0, zIndex: 3 });
  gsap.set(nextMediaSlide, { autoAlpha: 0, zIndex: 3 });
  gsap.set(nextImage, { scale: 1.075, xPercent: direction * 1.5 });
  if (nextContent.length) {
    gsap.set(nextContent, { autoAlpha: 0, y: 24 });
  }

  transitionTimeline = gsap.timeline({
    onComplete: () => {
      gsap.set(currentContentSlide, { autoAlpha: 0, zIndex: 1 });
      gsap.set(currentMediaSlide, { autoAlpha: 0, zIndex: 1 });
      gsap.set(nextContentSlide, { zIndex: 2 });
      gsap.set(nextMediaSlide, { zIndex: 2 });
      isTransitioning = false;
      transitionTimeline = null;
      scheduleAutoplay();
    },
  });

  if (currentContent.length) {
    transitionTimeline.to(
      currentContent,
      {
        autoAlpha: 0,
        y: -14,
        duration: 0.32,
        stagger: 0.025,
        ease: "power2.in",
      },
      0,
    );
  }

  transitionTimeline
    .to(
      currentImage,
      { scale: 1.035, duration: 0.9, ease: "power2.inOut" },
      0,
    )
    .to(
      currentContentSlide,
      { autoAlpha: 0, duration: 0.62, ease: "power2.inOut" },
      0.12,
    )
    .to(
      currentMediaSlide,
      { autoAlpha: 0, duration: 0.62, ease: "power2.inOut" },
      0.12,
    )
    .to(
      nextContentSlide,
      { autoAlpha: 1, duration: 0.74, ease: "power2.out" },
      0.18,
    )
    .to(
      nextMediaSlide,
      { autoAlpha: 1, duration: 0.74, ease: "power2.out" },
      0.18,
    )
    .to(
      nextImage,
      {
        scale: 1,
        xPercent: 0,
        duration: 1.15,
        ease: "power3.out",
      },
      0.18,
    );

  if (nextContent.length) {
    transitionTimeline.to(
      nextContent,
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.62,
        stagger: 0.055,
        ease: "power3.out",
      },
      0.4,
    );
  }
}

function showPreviousSlide() {
  const targetIndex =
    (activeIndex.value - 1 + props.slides.length) % props.slides.length;
  goToSlide(targetIndex, -1);
}

function showNextSlide() {
  goToSlide((activeIndex.value + 1) % props.slides.length, 1);
}

function pauseAutoplay() {
  interactionPaused = true;
  cancelAutoplay();
}

function resumeAutoplay() {
  interactionPaused = false;
  scheduleAutoplay();
}

function handleFocusOut(event: FocusEvent) {
  const nextTarget = event.relatedTarget;

  if (
    nextTarget instanceof Node &&
    heroRoot.value?.contains(nextTarget)
  ) {
    return;
  }

  resumeAutoplay();
}

function handleVisibilityChange() {
  if (document.hidden) {
    cancelAutoplay();
  } else {
    scheduleAutoplay();
  }
}

watch(
  () => props.slides.length,
  async (slideCount) => {
    cancelAutoplay();

    if (!slideCount) {
      activeIndex.value = 0;
      return;
    }

    activeIndex.value = Math.min(activeIndex.value, slideCount - 1);
    await nextTick();
    revealSlideImmediately(activeIndex.value);
    scheduleAutoplay();
  },
);

onMounted(() => {
  if (!heroRoot.value) {
    return;
  }

  const contentSlides = getContentSlides();
  const mediaSlides = getMediaSlides();

  if (!contentSlides.length || !mediaSlides.length) {
    return;
  }

  const firstContentSlide = contentSlides[0];
  const firstMediaSlide = mediaSlides[0];

  if (!firstContentSlide || !firstMediaSlide) {
    return;
  }

  animationContext = gsap.context(() => {
    gsap.set(contentSlides, { autoAlpha: 0, zIndex: 1 });
    gsap.set(mediaSlides, { autoAlpha: 0, zIndex: 1 });
    gsap.set(
      contentSlides.flatMap((slide) =>
        Array.from(slide.querySelectorAll("[data-hero-reveal]")),
      ),
      { autoAlpha: 0, y: 24 },
    );
    gsap.set(
      mediaSlides
        .slice(1)
        .map((slide) => slide.querySelector("[data-hero-image]")),
      { scale: 1.075 },
    );
    gsap.set(firstContentSlide, { autoAlpha: 1, zIndex: 2 });
    gsap.set(firstMediaSlide, { autoAlpha: 1, zIndex: 2 });

    const firstImage = firstMediaSlide.querySelector("[data-hero-image]");

    if (firstImage) {
      gsap.set(firstImage, { scale: 1 });
    }

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(firstContentSlide.querySelectorAll("[data-hero-reveal]"), {
        autoAlpha: 1,
        y: 0,
        duration: 0.72,
        stagger: 0.07,
      });
  }, heroRoot.value);

  mediaQueries = gsap.matchMedia();
  mediaQueries.add(
    {
      reduceMotion: "(prefers-reduced-motion: reduce)",
      allowMotion: "(prefers-reduced-motion: no-preference)",
    },
    (context) => {
      reducedMotion = Boolean(context.conditions?.reduceMotion);

      if (reducedMotion) {
        revealSlideImmediately(activeIndex.value);
        cancelAutoplay();
      } else {
        scheduleAutoplay();
      }
    },
    heroRoot.value,
  );

  document.addEventListener("visibilitychange", handleVisibilityChange);
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  cancelAutoplay();
  transitionTimeline?.kill();
  mediaQueries?.revert();
  animationContext?.revert();
});
</script>

<template>
  <section
    ref="heroRoot"
    aria-label="Najważniejsze obszary działalności Termospec"
    aria-roledescription="karuzela"
    class="relative isolate min-h-[44rem] overflow-hidden bg-ink text-white lg:min-h-[100svh]"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    @focusin="pauseAutoplay"
    @focusout="handleFocusOut"
  >
    <div class="relative min-h-[44rem] w-full overflow-hidden bg-ink lg:min-h-[100svh]">
      <div class="absolute inset-0 z-0 overflow-hidden">
        <article
          v-for="(slide, index) in props.slides"
          :key="`media-${index}`"
          data-hero-media-slide
          :aria-hidden="activeIndex !== index"
          class="invisible absolute inset-0"
        >
          <picture
            v-if="slide.presentation === 'pelny-kadr'"
            aria-hidden="true"
            class="absolute -inset-8 block overflow-hidden"
          >
            <source media="(max-width: 1023px)" :srcset="slide.image.mobile.src" />
            <img
              :src="slide.image.desktop.src"
              alt=""
              loading="lazy"
              decoding="async"
              class="hero-media h-full w-full scale-110 object-cover opacity-35 blur-2xl"
              :style="{
                '--hero-position-mobile': slide.image.mobile.position,
                '--hero-position-desktop': slide.image.desktop.position,
              }"
            />
          </picture>

          <picture class="absolute inset-0 block overflow-hidden">
            <source media="(max-width: 1023px)" :srcset="slide.image.mobile.src" />
            <img
              data-hero-image
              :src="slide.image.desktop.src"
              :alt="slide.image.alt"
              :loading="index === 0 ? 'eager' : 'lazy'"
              :fetchpriority="index === 0 ? 'high' : 'auto'"
              decoding="async"
              class="hero-media h-full w-full will-change-transform"
              :class="
                slide.presentation === 'pelny-kadr'
                  ? 'object-cover lg:object-contain'
                  : 'object-cover'
              "
              :style="{
                '--hero-position-mobile': slide.image.mobile.position,
                '--hero-position-desktop': slide.image.desktop.position,
              }"
            />
          </picture>

          <div
            class="absolute inset-0"
            :class="slide.presentation === 'pelny-kadr' ? 'bg-ink/10' : 'bg-ink/5'"
            aria-hidden="true"
          />
        </article>
      </div>

      <div class="absolute inset-0 z-10">
        <article
          v-for="(slide, index) in props.slides"
          :key="`content-${index}`"
          data-hero-content
          :aria-hidden="activeIndex !== index"
          :inert="activeIndex !== index"
          class="invisible absolute inset-0"
        >
          <div
            v-if="slide.presentation !== 'pelny-kadr'"
            class="absolute inset-x-0 bottom-0 min-h-[70%] border-t border-white/10 bg-ink/85 backdrop-blur-xl md:inset-y-0 md:right-auto md:min-h-0 md:w-[48%] md:border-r md:border-t-0 lg:w-[42%]"
          >
            <div class="flex min-h-full flex-col justify-center px-5 pb-24 pt-10 sm:px-8 md:h-full md:px-10 md:pb-24 md:pt-36 lg:px-12 xl:px-16">
              <div class="max-w-[38rem]">
                <p
                  data-hero-reveal
                  :aria-label="[slide.caption.label || 'Termospec', slide.caption.text].filter(Boolean).join(' ')"
                  class="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.14em] text-white/62 sm:text-sm"
                >
                  <span aria-hidden="true" class="h-0.5 w-9 shrink-0 bg-brand" />
                  <span>
                    {{ [slide.caption.label || 'Termospec', slide.caption.text].filter(Boolean).join(' / ') }}
                  </span>
                </p>

                <h1
                  data-hero-reveal
                  :aria-label="slide.title.replace('\n', ' ')"
                  class="mt-5 max-w-[10ch] text-[clamp(2.55rem,4.8vw,4.8rem)] font-medium leading-[0.94] tracking-[-0.055em] text-white sm:mt-6"
                >
                  <span
                    v-for="(line, lineIndex) in slide.title.split('\n')"
                    :key="lineIndex"
                    aria-hidden="true"
                    class="block"
                  >
                    {{ line }}
                  </span>
                </h1>

                <p
                  data-hero-reveal
                  class="mt-6 max-w-[34rem] text-sm leading-6 text-white/68 sm:text-base sm:leading-7 lg:mt-7 lg:text-lg lg:leading-8"
                >
                  {{ slide.lead }}
                </p>

                <div data-hero-reveal class="mt-7 flex flex-wrap items-center gap-3 lg:mt-8">
                  <NuxtLink
                    :to="slide.primaryLink.href"
                    class="inline-flex min-h-11 items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white transition-colors hover:bg-white hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {{ slide.primaryLink.label }}
                  </NuxtLink>

                  <NuxtLink
                    :to="slide.secondaryLink.href"
                    class="inline-flex min-h-11 items-center justify-center rounded-full border border-white/35 px-6 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                  >
                    {{ slide.secondaryLink.label }}
                  </NuxtLink>
                </div>

                <dl
                  data-hero-reveal
                  class="mt-8 hidden grid-cols-3 gap-5 border-t border-white/15 pt-6 xl:grid"
                >
                  <div v-for="fact in heroFacts" :key="fact.label" class="min-w-0">
                    <dt class="text-[clamp(1.2rem,1.65vw,1.65rem)] font-medium leading-tight tracking-[-0.035em] text-white">
                      {{ fact.value }}
                    </dt>
                    <dd class="mt-2 text-xs leading-5 text-white/42">
                      {{ fact.label }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </article>
      </div>

      <div
        v-if="props.slides.length > 1"
        class="pointer-events-none absolute inset-x-5 bottom-5 z-30 sm:inset-x-8 sm:bottom-8 lg:inset-x-12"
      >
        <div
          class="pointer-events-auto ms-auto w-fit max-w-full overflow-hidden rounded-full bg-ink/90 text-white backdrop-blur-xl"
        >
          <span class="block h-px w-full bg-white/15">
            <span
              data-hero-progress
              class="block h-full w-full origin-left scale-x-0 bg-brand"
            />
          </span>

          <div class="flex min-h-16 items-center gap-3 px-3 sm:gap-5 sm:px-4">
            <div class="flex items-center gap-0.5" aria-label="Wybierz slajd">
              <button
                v-for="(_slide, index) in props.slides"
                :key="`selector-${index}`"
                type="button"
                :aria-label="`Pokaż slajd ${index + 1}`"
                :aria-current="activeIndex === index ? 'true' : undefined"
                class="grid size-9 place-items-center rounded-full text-xs font-semibold tabular-nums transition-colors"
                :class="
                  activeIndex === index
                    ? 'bg-white text-ink'
                    : 'text-white/45 hover:bg-white/10 hover:text-white'
                "
                @click="goToSlide(index, index > activeIndex ? 1 : -1)"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </button>
            </div>

            <span class="h-7 w-px bg-white/15" aria-hidden="true" />

            <div class="flex items-center gap-1">
              <button
                type="button"
                aria-label="Poprzedni slajd"
                class="grid size-10 place-items-center rounded-full text-sm text-white transition-colors hover:bg-white hover:text-ink"
                @click="showPreviousSlide"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Następny slajd"
                class="grid size-10 place-items-center rounded-full bg-brand text-sm text-white transition-colors hover:bg-white hover:text-ink"
                @click="showNextSlide"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p class="sr-only" aria-live="polite">
      Slajd {{ activeIndex + 1 }} z {{ props.slides.length }}:
      {{ props.slides[activeIndex]?.title }}
    </p>
  </section>
</template>

<style scoped>
.hero-media {
  object-position: var(--hero-position-mobile, center);
}

@media (min-width: 64rem) {
  .hero-media {
    object-position: var(--hero-position-desktop, center);
  }
}
</style>
