<template>
  <section
    class="relative isolate overflow-hidden border-b border-ink/10 bg-surface"
  >
    <div
      aria-hidden="true"
      class="absolute inset-0 z-[-2] opacity-[0.25] [background-image:linear-gradient(rgba(8,8,63,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(8,8,63,.08)_1px,transparent_1px)] [background-size:4rem_4rem]"
    />

    <div
      class="mx-auto grid min-h-[calc(100svh-4rem)] max-w-[96rem] grid-cols-1 items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_.95fr] lg:px-10"
    >
      <div>
        <p
          class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand"
        >
          Termospec / technika przemysłowa
        </p>

        <h1
          class="mt-6 max-w-[14ch] font-heading text-[clamp(2.8rem,5.4vw,5.9rem)] font-black leading-[0.92] tracking-[-0.055em] text-ink"
        >
          Systemy chłodzenia i wentylacji dla przemysłu.
        </h1>

        <p class="mt-8 max-w-2xl text-lg leading-8 text-ink/65">
          Projektowanie, produkcja i serwis rozwiązań technicznych dla
          górnictwa, tuneli oraz infrastruktury przemysłowej pracującej w
          wymagających warunkach.
        </p>

        <div class="mt-10 flex flex-wrap gap-3">
          <NuxtLink
            to="#zakres"
            class="inline-flex min-h-12 items-center justify-center border border-ink/15 bg-white/70 px-6 text-sm font-extrabold lowercase tracking-tight text-ink transition-colors hover:border-ink"
          >
            zakres działalności
          </NuxtLink>

          <NuxtLink
            to="#realizacje"
            class="inline-flex min-h-12 items-center justify-center border border-ink/15 bg-transparent px-6 text-sm font-extrabold lowercase tracking-tight text-ink transition-colors hover:border-brand hover:text-brand"
          >
            realizacje
          </NuxtLink>
        </div>
      </div>

      <div class="relative">
        <div
          class="relative overflow-hidden border border-ink/10 bg-white/50 p-3 shadow-[0_3rem_7rem_rgba(8,8,63,.08)]"
        >
          <NuxtImg
            src="/głowna-01.png"
            alt="Przemysłowe urządzenie chłodnicze Termospec"
            width="1672"
            height="941"
            sizes="sm:100vw md:90vw lg:50vw"
            class="aspect-[4/3] w-full object-contain mix-blend-multiply"
          />

          <div
            class="absolute bottom-6 left-6 border-l-2 border-brand bg-white/85 px-4 py-3 backdrop-blur"
          >
            <p
              class="font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-ink/45"
            >
              obszary pracy
            </p>
            <p class="mt-1 text-sm font-black text-ink">
              górnictwo / tunele / przemysł
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
