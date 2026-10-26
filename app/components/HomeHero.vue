<script setup lang="ts">
import { gsap } from "gsap";
import { aboutMetrics } from "~~/data/about";
import { accessibilityPreferencesEvent } from "~/composables/useAccessibilityPreferences";
import type { HomeHeroFact, HomeHeroSlide } from "~~/types/home";

const props = defineProps<{
  slides: HomeHeroSlide[];
}>();

const heroRoot = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const companyFacts: HomeHeroFact[] = aboutMetrics
  .slice(0, 3)
  .map(({ value, label }) => ({ value, label }));

function slideFacts(slide: HomeHeroSlide) {
  return slide.facts?.length ? slide.facts : companyFacts;
}

function slideCaption(slide: HomeHeroSlide) {
  return [slide.caption.label, slide.caption.text].filter(Boolean).join(" / ");
}

let animationContext: gsap.Context | null = null;
let mediaQueries: gsap.MatchMedia | null = null;
let transitionTimeline: gsap.core.Timeline | null = null;
let autoplayCall: gsap.core.Tween | null = null;
let reducedMotion = false;
let interactionPaused = false;
let isTransitioning = false;

const autoplayDelay = 6.5;

function shouldReduceMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
    || document.documentElement.dataset.accessibilityMotion === "reduced";
}

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

function syncAccessibilityMotionPreference() {
  reducedMotion = shouldReduceMotion();

  if (reducedMotion) {
    transitionTimeline?.kill();
    transitionTimeline = null;
    isTransitioning = false;
    revealSlideImmediately(activeIndex.value);
    cancelAutoplay();
    return;
  }

  scheduleAutoplay();
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
    () => {
      reducedMotion = shouldReduceMotion();

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
  window.addEventListener(accessibilityPreferencesEvent, syncAccessibilityMotionPreference);
});

onUnmounted(() => {
  document.removeEventListener("visibilitychange", handleVisibilityChange);
  window.removeEventListener(accessibilityPreferencesEvent, syncAccessibilityMotionPreference);
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
    class="relative isolate overflow-hidden bg-ink text-white"
    @mouseenter="pauseAutoplay"
    @mouseleave="resumeAutoplay"
    @focusin="pauseAutoplay"
    @focusout="handleFocusOut"
  >
    <div class="relative min-h-[44rem] w-full overflow-hidden bg-ink lg:min-h-[max(100svh,40rem)]">
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
            v-if="slide.presentation !== 'pelny-kadr'"
            class="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/10 lg:hidden"
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
            class="hero-stage design-shell flex h-full flex-col justify-end pb-32 pt-28 lg:justify-center lg:pb-[var(--hero-gap)] lg:pt-[calc(var(--site-header-height)+var(--hero-gap))]"
          >
            <div class="max-w-[clamp(20rem,46vw,55rem)]">
              <p
                v-if="slideCaption(slide)"
                data-hero-reveal
                class="flex items-center gap-5 text-[clamp(0.75rem,0.92vw,1.1rem)] uppercase leading-none tracking-[0.14em] text-white/80"
              >
                <span aria-hidden="true" class="h-0.5 w-[clamp(2.5rem,3.65vw,4.4rem)] shrink-0 bg-brand" />
                <span>{{ slideCaption(slide) }}</span>
              </p>

              <h1
                data-hero-reveal
                :aria-label="slide.title.replace('\n', ' ')"
                class="mt-[clamp(1.25rem,2.2vw,2.65rem)] max-w-[clamp(17rem,46vw,55rem)] text-[clamp(2.4rem,min(4.84vw,8.6svh),5.8rem)] font-bold leading-[0.99] tracking-[-0.018em] text-white"
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
                class="mt-[clamp(1.25rem,1.95vw,2.35rem)] max-w-[clamp(18rem,30vw,36rem)] text-[clamp(1rem,1.245vw,1.5rem)] leading-[1.53] text-white"
              >
                {{ slide.lead }}
              </p>

              <div
                data-hero-reveal
                class="mt-[clamp(1.75rem,2.45vw,2.95rem)] flex flex-wrap items-center gap-[clamp(0.75rem,1.6vw,1.9rem)]"
              >
                <NuxtLink
                  :to="slide.primaryLink.href"
                  class="design-button min-h-[clamp(3rem,3.55vw,4.25rem)] px-[clamp(1.25rem,2vw,2.4rem)] text-[clamp(0.95rem,1.1vw,1.32rem)] bg-brand text-white hover:bg-white hover:text-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {{ slide.primaryLink.label }}
                  <span aria-hidden="true">→</span>
                </NuxtLink>

                <NuxtLink
                  :to="slide.secondaryLink.href"
                  class="design-button min-h-[clamp(3rem,3.55vw,4.25rem)] px-[clamp(1.25rem,2.2vw,2.65rem)] text-[clamp(0.95rem,1.1vw,1.32rem)] border-[1.5px] border-white/90 text-white hover:border-white hover:bg-white hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {{ slide.secondaryLink.label }}
                  <span aria-hidden="true">→</span>
                </NuxtLink>
              </div>

              <dl
                data-hero-reveal
                class="mt-[clamp(2rem,3vw,3.6rem)] hidden max-w-[clamp(18rem,31vw,37.25rem)] flex-wrap gap-x-[clamp(1.5rem,2.6vw,3.1rem)] gap-y-5 xl:flex-nowrap border-t-2 border-white pt-[clamp(1.75rem,3.3vw,3.95rem)] sm:flex"
              >
                <div
                  v-for="fact in slideFacts(slide)"
                  :key="fact.value"
                  class="flex min-w-0 flex-col-reverse ps-[0.6rem] xl:shrink-0 xl:whitespace-nowrap"
                >
                  <dt class="mt-1 text-[clamp(0.75rem,0.78vw,0.94rem)] leading-snug text-white/85">
                    {{ fact.label }}
                  </dt>
                  <dd class="text-[clamp(1.05rem,1.18vw,1.42rem)] font-semibold leading-tight text-white">
                    {{ fact.value }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </article>
      </div>

      <div
        v-if="props.slides.length > 1"
        class="pointer-events-none absolute inset-x-0 bottom-5 z-30 sm:bottom-8 lg:bottom-[clamp(2rem,4.05vw,4.9rem)]"
      >
        <div class="design-shell flex justify-end">
          <div
            class="pointer-events-auto relative flex min-h-[clamp(3.75rem,4.1vw,4.9rem)] w-fit max-w-full items-center gap-[clamp(0.75rem,1.6vw,1.9rem)] overflow-hidden rounded-full bg-ink px-[clamp(0.5rem,0.75vw,0.9rem)] text-white"
          >
            <span
              data-hero-progress
              aria-hidden="true"
              class="absolute inset-x-10 bottom-0 h-0.5 origin-left scale-x-0 bg-brand"
            />

            <div class="flex items-center gap-[clamp(0rem,0.4vw,0.5rem)]" aria-label="Wybierz slajd">
              <button
                v-for="(_slide, index) in props.slides"
                :key="`selector-${index}`"
                type="button"
                :aria-label="`Pokaż slajd ${index + 1}`"
                :aria-current="activeIndex === index ? 'true' : undefined"
                class="grid size-[clamp(2.5rem,2.75vw,3.3rem)] place-items-center rounded-full text-[clamp(0.8rem,0.85vw,1rem)] font-medium tabular-nums transition-colors"
                :class="
                  activeIndex === index
                    ? 'bg-white text-ink'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                "
                @click="goToSlide(index, index > activeIndex ? 1 : -1)"
              >
                {{ String(index + 1).padStart(2, '0') }}
              </button>
            </div>

            <span class="h-[clamp(2.25rem,3.1vw,3.75rem)] w-0.5 bg-white/45" aria-hidden="true" />

            <div class="flex items-center gap-[clamp(0.5rem,1vw,1.2rem)]">
              <button
                type="button"
                aria-label="Poprzedni slajd"
                class="grid size-[clamp(2.5rem,2.65vw,3.2rem)] place-items-center rounded-full text-lg text-white transition-colors hover:bg-white hover:text-ink"
                @click="showPreviousSlide"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                aria-label="Następny slajd"
                class="grid size-[clamp(2.5rem,2.65vw,3.2rem)] place-items-center rounded-full bg-brand text-lg text-white transition-colors hover:bg-white hover:text-brand"
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
.hero-stage {
  --hero-gap: clamp(1.5rem, 5svh, 3.5rem);
}

.hero-media {
  object-position: var(--hero-position-mobile, center);
}

@media (min-width: 64rem) {
  .hero-media {
    object-position: var(--hero-position-desktop, center);
  }
}
</style>
