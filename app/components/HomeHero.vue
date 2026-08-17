<script setup lang="ts">
import { gsap } from "gsap";
import type { HomeHeroSlide } from "~~/types/home";

const props = defineProps<{
  slides: HomeHeroSlide[];
}>();

const heroRoot = ref<HTMLElement | null>(null);
const activeIndex = ref(0);

let animationContext: gsap.Context | null = null;
let mediaQueries: gsap.MatchMedia | null = null;
let transitionTimeline: gsap.core.Timeline | null = null;
let autoplayCall: gsap.core.Tween | null = null;
let reducedMotion = false;
let interactionPaused = false;
let isTransitioning = false;

const autoplayDelay = 6.5;

function getSlides() {
  if (!heroRoot.value) {
    return [];
  }

  return Array.from(
    heroRoot.value.querySelectorAll<HTMLElement>("[data-hero-slide]"),
  );
}

function cancelAutoplay() {
  autoplayCall?.kill();
  autoplayCall = null;
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

  autoplayCall = gsap.delayedCall(autoplayDelay, () => {
    goToSlide((activeIndex.value + 1) % props.slides.length, 1);
  });
}

function revealSlideImmediately(targetIndex: number) {
  const slides = getSlides();

  slides.forEach((slide, index) => {
    gsap.set(slide, {
      autoAlpha: index === targetIndex ? 1 : 0,
      zIndex: index === targetIndex ? 2 : 1,
    });

    gsap.set(slide.querySelector("[data-hero-image]"), {
      scale: 1,
      xPercent: 0,
    });

    const revealElements = slide.querySelectorAll("[data-hero-reveal]");

    if (revealElements.length) {
      gsap.set(revealElements, {
        autoAlpha: index === targetIndex ? 1 : 0,
        y: 0,
      });
    }
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

  const slides = getSlides();
  const currentSlide = slides[activeIndex.value];
  const nextSlide = slides[targetIndex];

  if (!currentSlide || !nextSlide) {
    return;
  }

  const currentImage = currentSlide.querySelector("[data-hero-image]");
  const currentContent = currentSlide.querySelectorAll("[data-hero-reveal]");
  const nextImage = nextSlide.querySelector("[data-hero-image]");
  const nextContent = nextSlide.querySelectorAll("[data-hero-reveal]");

  isTransitioning = true;
  activeIndex.value = targetIndex;
  transitionTimeline?.kill();

  gsap.set(nextSlide, { autoAlpha: 0, zIndex: 3 });
  gsap.set(nextImage, { scale: 1.075, xPercent: direction * 1.5 });
  if (nextContent.length) {
    gsap.set(nextContent, { autoAlpha: 0, y: 24 });
  }

  transitionTimeline = gsap.timeline({
    onComplete: () => {
      gsap.set(currentSlide, { autoAlpha: 0, zIndex: 1 });
      gsap.set(nextSlide, { zIndex: 2 });
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
      currentSlide,
      { autoAlpha: 0, duration: 0.62, ease: "power2.inOut" },
      0.12,
    )
    .to(
      nextSlide,
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

  const slides = getSlides();

  if (!slides.length) {
    return;
  }

  animationContext = gsap.context(() => {
    gsap.set(slides, { autoAlpha: 0, zIndex: 1 });
    gsap.set(
      slides.flatMap((slide) =>
        Array.from(slide.querySelectorAll("[data-hero-reveal]")),
      ),
      { autoAlpha: 0, y: 24 },
    );
    gsap.set(
      slides
        .slice(1)
        .map((slide) => slide.querySelector("[data-hero-image]")),
      { scale: 1.075 },
    );
    gsap.set(slides[0], { autoAlpha: 1, zIndex: 2 });
    gsap.set(slides[0]?.querySelector("[data-hero-image]"), { scale: 1 });

    gsap
      .timeline({ defaults: { ease: "power3.out" } })
      .to(slides[0]?.querySelectorAll("[data-hero-reveal]") ?? [], {
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
    class="relative isolate min-h-[100svh] overflow-hidden bg-ink text-white"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    @focusin="pauseAutoplay"
    @focusout="handleFocusOut"
  >
    <div class="absolute inset-0">
      <article
        v-for="(slide, index) in props.slides"
        :key="index"
        data-hero-slide
        :aria-hidden="activeIndex !== index"
        class="invisible absolute inset-0"
      >
        <div
          v-if="slide.presentation === 'podzial'"
          class="absolute inset-x-0 top-16 bottom-0 grid grid-rows-2 bg-ink lg:grid-cols-5 lg:grid-rows-1"
        >
          <div class="order-2 flex items-center px-6 py-6 sm:px-8 lg:order-1 lg:col-span-2 lg:px-10 lg:py-12">
            <div class="max-w-2xl">
              <h1
                data-hero-reveal
                class="max-w-[12ch] font-heading text-[clamp(2.1rem,4.2vw,4.5rem)] font-black leading-[0.92] tracking-[-0.055em] text-white"
              >
                {{ slide.title }}
              </h1>

              <p
                data-hero-reveal
                class="mt-4 max-w-xl text-sm leading-6 text-white/75 sm:text-base sm:leading-7 lg:mt-6 lg:text-lg lg:leading-8"
              >
                {{ slide.lead }}
              </p>

              <div
                data-hero-reveal
                class="mt-5 flex flex-wrap items-center gap-2 lg:mt-8 lg:gap-4"
              >
                <NuxtLink
                  :to="slide.primaryLink.href"
                  class="inline-flex min-h-12 items-center gap-6 bg-brand px-5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <span>{{ slide.primaryLink.label }}</span>
                  <span aria-hidden="true">→</span>
                </NuxtLink>

                <NuxtLink
                  :to="slide.secondaryLink.href"
                  class="inline-flex min-h-12 items-center gap-6 bg-brand px-5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <span>{{ slide.secondaryLink.label }}</span>
                  <span aria-hidden="true">↗</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div class="relative order-1 overflow-hidden lg:order-2 lg:col-span-3">
            <picture class="block h-full w-full">
              <source
                media="(max-width: 1023px)"
                :srcset="slide.image.mobile.src"
              />
              <img
                data-hero-image
                :src="slide.image.desktop.src"
                :alt="slide.image.alt"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
                decoding="async"
                class="hero-media h-full w-full object-cover"
                :style="{
                  '--hero-position-mobile': slide.image.mobile.position,
                  '--hero-position-desktop': slide.image.desktop.position,
                }"
              />
            </picture>
            <div
              aria-hidden="true"
              class="absolute inset-y-0 left-0 hidden w-1/4 bg-gradient-to-r from-ink/45 to-transparent lg:block"
            />
          </div>
        </div>

        <template v-else>
          <div class="absolute inset-0">
            <picture class="block h-full w-full">
              <source
                media="(max-width: 1023px)"
                :srcset="slide.image.mobile.src"
              />
              <img
                data-hero-image
                :src="slide.image.desktop.src"
                :alt="slide.image.alt"
                :loading="index === 0 ? 'eager' : 'lazy'"
                :fetchpriority="index === 0 ? 'high' : 'auto'"
                decoding="async"
                class="hero-media h-full w-full object-cover"
                :style="{
                  '--hero-position-mobile': slide.image.mobile.position,
                  '--hero-position-desktop': slide.image.desktop.position,
                }"
              />
            </picture>
          </div>
          <div
            aria-hidden="true"
            class="hero-image-shade absolute inset-0"
          />

          <div
            class="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-[96rem] items-end px-6 pt-32 pb-36 sm:px-8 sm:pb-40 lg:items-center lg:px-10 lg:pt-28 lg:pb-32"
          >
            <div class="max-w-3xl">
              <h1
                data-hero-reveal
                class="max-w-[13ch] font-heading text-[clamp(2.25rem,4.7vw,4.75rem)] font-black leading-[0.9] tracking-[-0.06em] text-white"
              >
                {{ slide.title }}
              </h1>

              <p
                data-hero-reveal
                class="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg sm:leading-8"
              >
                {{ slide.lead }}
              </p>

              <div
                data-hero-reveal
                class="mt-8 flex flex-wrap items-center gap-4"
              >
                <NuxtLink
                  :to="slide.primaryLink.href"
                  class="inline-flex min-h-12 items-center gap-8 bg-brand px-5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <span>{{ slide.primaryLink.label }}</span>
                  <span aria-hidden="true">→</span>
                </NuxtLink>

                <NuxtLink
                  :to="slide.secondaryLink.href"
                  class="inline-flex min-h-12 items-center gap-8 bg-brand px-5 font-mono text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-white hover:text-ink"
                >
                  <span>{{ slide.secondaryLink.label }}</span>
                  <span aria-hidden="true">↗</span>
                </NuxtLink>
              </div>
            </div>
          </div>

          <div
            v-if="slide.caption.label || slide.caption.text"
            class="absolute right-6 bottom-24 z-10 hidden font-mono text-[0.64rem] uppercase tracking-widest text-white/55 sm:block lg:right-10"
          >
            <template v-if="slide.caption.label">
              {{ slide.caption.label }} /
            </template>
            <span class="font-bold text-white/85">{{ slide.caption.text }}</span>
          </div>
        </template>
      </article>
    </div>

    <div
      v-if="props.slides.length > 1"
      class="absolute right-6 bottom-6 z-20 flex items-center gap-2 lg:right-10 lg:bottom-10"
    >
      <button
        type="button"
        aria-label="Poprzedni slajd"
        class="grid size-12 place-items-center border border-white/25 bg-ink/80 text-xl text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
        @click="showPreviousSlide"
      >
        <span aria-hidden="true">←</span>
      </button>
      <button
        type="button"
        aria-label="Następny slajd"
        class="grid size-12 place-items-center border border-white/25 bg-ink/80 text-xl text-white transition-colors hover:border-white hover:bg-white hover:text-ink"
        @click="showNextSlide"
      >
        <span aria-hidden="true">→</span>
      </button>
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

.hero-image-shade {
  background:
    linear-gradient(
      90deg,
      rgb(18 11 56 / 0.92) 0%,
      rgb(18 11 56 / 0.74) 36%,
      rgb(18 11 56 / 0.24) 72%,
      rgb(18 11 56 / 0.14) 100%
    ),
    linear-gradient(0deg, rgb(18 11 56 / 0.62) 0%, transparent 48%);
}

@media (max-width: 63.999rem) {
  .hero-image-shade {
    background:
      linear-gradient(
        0deg,
        rgb(18 11 56 / 0.93) 0%,
        rgb(18 11 56 / 0.58) 58%,
        rgb(18 11 56 / 0.18) 100%
      ),
      linear-gradient(90deg, rgb(18 11 56 / 0.4), transparent 72%);
  }
}
</style>
