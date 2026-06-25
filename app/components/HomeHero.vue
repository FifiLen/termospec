<script setup lang="ts">
import { homeHero } from "~~/data/home";
</script>

<template>
  <section
    class="relative isolate flex min-h-[calc(100svh-4rem)] items-center justify-start overflow-hidden border-b border-ink/10 bg-surface"
  >
    <!-- Pełnowymiarowe zdjęcie w tle z techniczną obróbką (grayscale/contrast) -->
    <div class="absolute inset-0 z-[-2] h-full w-full bg-ink/5">
      <NuxtImg
        :src="homeHero.image.src"
        :alt="homeHero.image.alt"
        width="1920"
        height="1080"
        sizes="100vw"
        class="h-full w-full object-cover grayscale opacity-40 contrast-125 mix-blend-multiply"
      />
    </div>

    <!-- Nakładka z siatką konstrukcyjną (Blueprint overlay) rozpięta nad zdjęciem -->
    <div
      aria-hidden="true"
      class="absolute inset-0 z-[-1] opacity-[0.2] [background-image:linear-gradient(rgba(8,8,63,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(8,8,63,.08)_1px,transparent_1px)] [background-size:3rem_3rem]"
    />

    <!-- Linie graniczne wyznaczające przestrzeń roboczą (HUD lines) -->
    <div
      class="absolute top-10 left-0 right-0 border-t border-ink/5 pointer-events-none"
    />
    <div
      class="absolute bottom-10 left-0 right-0 border-t border-ink/5 pointer-events-none"
    />
    <div
      class="absolute left-10 top-0 bottom-0 border-l border-ink/5 pointer-events-none hidden lg:block"
    />

    <!-- Główny kontener pozycjonujący -->
    <div class="mx-auto w-full max-w-[96rem] px-6 py-20 lg:px-10">
      <!-- Płaski, ostro ścięty panel z treścią (Zero cieni, czytelność przez backdrop-blur i solidny border) -->
      <div
        class="relative max-w-2xl border border-ink/15 bg-surface/85 p-8 backdrop-blur-xl sm:p-12 lg:p-16"
      >
        <!-- Peryferyjne znaczniki techniczne montowane na rogach panelu -->
        <div
          class="absolute -top-px -left-px font-mono text-[10px] text-brand translate-x-1 translate-y-1"
        >
          ⌥
        </div>
        <div
          class="absolute top-3 right-4 font-mono text-[9px] tracking-widest text-ink/30 uppercase select-none"
        >
          [ sec_ctrl_01 ]
        </div>

        <p
          class="font-mono text-xs font-bold uppercase tracking-[0.3em] text-brand"
        >
          // {{ homeHero.eyebrow }}
        </p>

        <h1
          class="mt-6 font-heading text-[clamp(2.4rem,4.8vw,4.8rem)] font-black leading-[0.95] tracking-[-0.05em] text-ink uppercase"
        >
          {{ homeHero.title }}
        </h1>

        <p class="mt-6 text-base leading-7 text-ink/75 sm:text-lg sm:leading-8">
          {{ homeHero.lead }}
        </p>

        <!-- Dolna sekcja panelu zintegrowana z przyciskami -->
        <div class="mt-10 grid grid-cols-1 gap-px bg-ink/10 sm:grid-cols-2">
          <NuxtLink
            :to="homeHero.primaryLink.href"
            class="flex min-h-12 items-center justify-between bg-ink px-5 font-mono text-xs font-bold uppercase tracking-wider text-surface transition-colors hover:bg-brand"
          >
            <span>{{ homeHero.primaryLink.label }}</span>
            <span>→</span>
          </NuxtLink>

          <NuxtLink
            :to="homeHero.secondaryLink.href"
            class="flex min-h-12 items-center justify-between bg-surface px-5 font-mono text-xs font-bold uppercase tracking-wider text-ink transition-colors hover:bg-ink/5"
          >
            <span>{{ homeHero.secondaryLink.label }}</span>
            <span class="text-ink/30">//</span>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Dyskretny pasek z podpisem zdjęcia zakotwiczony w dolnej krawędzi ekranu -->
    <div
      class="absolute bottom-0 right-0 border-t border-l border-ink/10 bg-surface/90 px-4 py-2 font-mono text-[10px] tracking-tight text-ink/50 backdrop-blur-sm hidden sm:block"
    >
      {{ homeHero.caption.label }}:
      <span class="font-bold text-ink">{{ homeHero.caption.text }}</span>
    </div>
  </section>
</template>
