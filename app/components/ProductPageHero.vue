<script setup lang="ts">
export type HeroIcon = "shield" | "leaf" | "globe";

export interface HeroSection {
  label: string;
  text: string;
  icon?: HeroIcon;
  number?: string;
}

export interface HeroData {
  eyebrow?: string;
  title: string;
  lead: string;
  sections: HeroSection[];
}

const props = withDefaults(
  defineProps<{
    intro: HeroData;
    imageSrc?: string;
  }>(),
  {
    imageSrc: "/ts-hero-bg.webp",
  },
);

const fallbackIcons: HeroIcon[] = ["shield", "leaf", "globe"];

const getIcon = (section: HeroSection, index: number): HeroIcon => {
  return section.icon ?? fallbackIcons[index % fallbackIcons.length] ?? "shield";
};

const getNumber = (section: HeroSection, index: number): string => {
  return section.number ?? String(index + 1).padStart(2, "0");
};
</script>

<template>
  <section
    class="relative isolate col-span-full row-start-1 overflow-hidden bg-white"
    style="--hero-ink: var(--ink, #08083f); --hero-brand: var(--brand, #e30613)"
  >
    <!-- Ambient background -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_82%_18%,rgba(227,6,19,0.07),transparent_34rem),radial-gradient(circle_at_12%_10%,rgba(8,8,63,0.045),transparent_28rem)]"
    />

    <!-- Technical frame lines -->
    <div
      aria-hidden="true"
      class="pointer-events-none absolute inset-x-6 top-[clamp(5.5rem,7vw,8rem)] bottom-[2.8rem] z-[1] max-[1100px]:hidden lg:inset-x-10"
    >
      <span
        class="absolute left-0 top-[4.8rem] h-[33rem] border-l border-dashed border-[#08083f]/15"
      />
      <span
        class="absolute left-0 top-[4.8rem] w-[6.4rem] border-t border-dashed border-[#08083f]/15"
      />
      <span
        class="absolute left-[-0.18rem] top-[4.6rem] h-1.5 w-1.5 rounded-full border border-[color:var(--hero-brand)] bg-white"
      />
      <span
        class="absolute left-[-0.2rem] bottom-0 h-2 w-2 border-b border-l border-[#08083f]/25"
      />
      <span
        class="absolute right-0 bottom-0 h-2 w-2 border-b border-r border-[#08083f]/25"
      />
    </div>

    <div
      class="relative z-10 w-full px-6 pt-[clamp(5rem,7vw,8.25rem)] pb-[clamp(3.5rem,5vw,5.75rem)] lg:px-10"
    >
      <!-- Hero top -->
      <div
        class="relative min-h-[clamp(31rem,39vw,43rem)] max-[1100px]:min-h-0"
      >
        <!-- Right graphic, desktop -->
        <div
          aria-hidden="true"
          class="pointer-events-none absolute inset-y-[-4rem] right-[-2vw] z-0 w-[min(65vw,1120px)] max-[1280px]:right-[-8vw] max-[1100px]:hidden"
        >
          <NuxtImg
            :src="props.imageSrc"
            alt=""
            width="1500"
            height="1070"
            sizes="100vw lg:65vw"
            loading="eager"
            decoding="async"
            fetchpriority="high"
            class="absolute right-0 top-1/2 w-full max-w-none -translate-y-1/2 select-none opacity-[0.96] contrast-[1.04] saturate-[0.96]"
          />

          <div
            class="absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgba(255,255,255,.98)_18%,rgba(255,255,255,.82)_34%,rgba(255,255,255,.36)_52%,rgba(255,255,255,0)_72%)]"
          />
        </div>

        <!-- Left content -->
        <div class="relative z-10 max-w-[48rem] pt-[clamp(1rem,3vw,3.8rem)]">
          <div
            class="mb-12 flex items-center gap-5 max-[1100px]:mb-8 max-sm:gap-3"
          >
            <span
              aria-hidden="true"
              class="relative block h-px w-24 bg-[color:var(--hero-brand)] max-sm:w-12"
            >
              <span
                class="absolute right-[-0.18rem] top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full border border-[color:var(--hero-brand)] bg-white"
              />
            </span>

            <p
              class="m-0 text-[0.78rem] font-black uppercase leading-none tracking-[0.28em] text-[color:var(--hero-brand)] max-sm:text-[0.68rem] max-sm:tracking-[0.18em]"
            >
              {{ props.intro.eyebrow ?? "technologia dla górnictwa" }}
            </p>
          </div>

          <h1
            class="m-0 max-w-[12ch] text-4xl font-black leading-tight tracking-tight text-[color:var(--hero-ink)]"
          >
            {{ props.intro.title }}
          </h1>

          <div
            aria-hidden="true"
            class="mt-10 h-[3px] w-20 bg-[color:var(--hero-brand)] max-md:mt-7"
          />

          <p
            class="m-0 mt-10 max-w-[58ch] text-[color:var(--hero-ink)]/75 text-[clamp(1rem,1.15vw,1.22rem)] font-medium leading-[1.85] tracking-[-0.025em] max-md:mt-7 max-md:leading-[1.75]"
          >
            {{ props.intro.lead }}
          </p>

          <!-- Mobile/tablet graphic -->
          <NuxtImg
            :src="props.imageSrc"
            alt=""
            width="1500"
            height="1070"
            sizes="100vw"
            loading="eager"
            decoding="async"
            class="mt-10 hidden w-full select-none rounded-2xl opacity-[0.92] max-[1100px]:block max-sm:hidden"
          />
        </div>
      </div>

      <!-- Cards -->
      <div
        class="relative z-20 grid grid-cols-3 gap-[clamp(1.25rem,2vw,2.35rem)] max-[1100px]:mt-12 max-[980px]:grid-cols-1"
      >
        <article
          v-for="(section, index) in props.intro.sections"
          :key="section.label"
          class="group relative min-h-[17rem] overflow-hidden rounded-[0.375rem] border border-[#08083f]/10 bg-white/90 p-[clamp(1.3rem,1.75vw,1.85rem)] shadow-[0_1.5rem_4rem_rgba(8,8,63,0.055)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[color:var(--hero-brand)]/35 hover:shadow-[0_2rem_5rem_rgba(8,8,63,0.10)] max-sm:min-h-0"
        >
          <!-- Card technical corners -->
          <span
            aria-hidden="true"
            class="absolute left-[-1px] top-[-1px] h-5 w-5 border-l border-t border-[#08083f]/20"
          />
          <span
            aria-hidden="true"
            class="absolute right-[-1px] bottom-[-1px] h-5 w-5 border-b border-r border-[#08083f]/20"
          />
          <span
            aria-hidden="true"
            class="absolute inset-x-7 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(227,6,19,.38),transparent)] opacity-0 transition duration-300 group-hover:opacity-100"
          />

          <span
            class="absolute right-8 top-8 text-[1.35rem] font-black leading-none tracking-[-0.04em] text-[#08083f]/35 max-sm:right-6 max-sm:top-6"
          >
            {{ getNumber(section, index) }}
          </span>

          <div
            class="relative z-10 flex items-start gap-7 max-sm:flex-col max-sm:gap-5"
          >
            <!-- Icon -->
            <div
              class="grid h-[7rem] w-[7rem] shrink-0 place-items-center rounded-full border border-[#08083f]/12 bg-white shadow-[inset_0_0_0_0.35rem_rgba(8,8,63,0.025)] text-[color:var(--hero-brand)] transition duration-300 group-hover:scale-[1.04] group-hover:border-[color:var(--hero-brand)]/30"
            >
              <!-- Shield -->
              <svg
                v-if="getIcon(section, index) === 'shield'"
                aria-hidden="true"
                viewBox="0 0 48 48"
                class="h-11 w-11"
                fill="none"
              >
                <path
                  d="M24 7.5 38 13v10.4c0 8.7-5.4 14.7-14 17.1-8.6-2.4-14-8.4-14-17.1V13l14-5.5Z"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linejoin="round"
                />
                <path
                  d="m18.2 24.2 4.1 4.2 8.2-9.1"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>

              <!-- Leaf -->
              <svg
                v-else-if="getIcon(section, index) === 'leaf'"
                aria-hidden="true"
                viewBox="0 0 48 48"
                class="h-11 w-11"
                fill="none"
              >
                <path
                  d="M39 8.5c-12.4.8-22.7 5.1-27.2 13.7-3.6 6.8-.4 13.4 6.1 15.1 9.4 2.4 18.7-6.7 21.1-28.8Z"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 40c6.5-9.4 14.4-15.7 24-20"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
              </svg>

              <!-- Globe -->
              <svg
                v-else
                aria-hidden="true"
                viewBox="0 0 48 48"
                class="h-11 w-11"
                fill="none"
              >
                <circle
                  cx="24"
                  cy="24"
                  r="16.5"
                  stroke="currentColor"
                  stroke-width="2.3"
                />
                <path
                  d="M7.5 24h33M24 7.5c4.4 4.5 6.6 10 6.6 16.5S28.4 36 24 40.5C19.6 36 17.4 30.5 17.4 24S19.6 12 24 7.5Z"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.4 14.2h25.2M11.4 33.8h25.2"
                  stroke="currentColor"
                  stroke-width="2.3"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <!-- Text -->
            <div class="min-w-0 pt-3 pr-10 max-sm:pt-0 max-sm:pr-0">
              <h2
                class="m-0 text-[clamp(1rem,1.05vw,1.12rem)] font-black leading-tight tracking-[-0.035em] text-[color:var(--hero-brand)]"
              >
                {{ section.label }}
              </h2>

              <p
                class="m-0 mt-6 text-[0.98rem] font-medium leading-[1.85] tracking-[-0.018em] text-[#08083f]/70 max-sm:mt-4"
              >
                {{ section.text }}
              </p>
            </div>
          </div>

          <!-- Bottom blueprint detail -->
          <div
            aria-hidden="true"
            class="absolute bottom-0 left-0 right-0 h-16 bg-[linear-gradient(180deg,transparent,rgba(8,8,63,0.018))]"
          />
        </article>
      </div>
    </div>
  </section>
</template>
