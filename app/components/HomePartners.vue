<script setup lang="ts">
import { homePartnerIndustries, homePartners } from "~~/data/home";
</script>

<template>
  <section class="bg-transparent px-5 pt-20 sm:px-8 lg:px-12 lg:pt-28">
    <div
      class="mx-auto max-w-[92rem] rounded-[2rem] bg-ink px-6 py-14 text-white sm:px-10 sm:py-16 lg:rounded-[2.75rem] lg:px-[4.625rem] lg:py-[5.5rem]"
    >
      <div
        class="grid gap-10 xl:grid-cols-[minmax(0,3fr)_minmax(24rem,2fr)] xl:items-end xl:gap-16"
      >
        <div>
          <p class="flex items-center gap-3 text-sm font-medium text-white/60 sm:text-base">
            <span class="h-2 w-2 shrink-0 rounded-full bg-brand" />
            Partnerzy i klienci
          </p>

          <h2
            class="mt-8 max-w-none text-[clamp(2.6rem,4.2vw,3.65rem)] font-medium leading-[1.03] tracking-[-0.045em] text-white"
          >
            <span class="xl:block">Zaufali nam producenci,</span>
            <span class="xl:block">kopalnie i operatorzy</span>
            <span class="xl:block">infrastruktury.</span>
          </h2>
        </div>

        <p
          class="max-w-[34rem] text-lg leading-8 text-white/60 sm:text-xl sm:leading-9 lg:pb-1"
        >
          Część relacji trwa od pierwszych lat działalności firmy — od dostawy
          urządzeń po stały nadzór serwisowy.
        </p>
      </div>

      <ul
        aria-label="Miejsca na logotypy partnerów i klientów"
        class="mt-16 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5 xl:gap-5"
      >
        <li
          v-for="partner in homePartners"
          :key="partner.id"
          class="grid min-h-28 place-items-center rounded-3xl bg-white/[0.075] px-5 transition-colors duration-300 hover:bg-white/[0.1] lg:min-h-30"
        >
          <span
            :aria-label="partner.label"
            class="text-xs font-medium uppercase tracking-[0.2em] text-white/50"
          >
            Logo
          </span>
        </li>
      </ul>

      <ul class="mt-12 flex flex-wrap gap-3" aria-label="Branże partnerów i klientów">
        <li
          v-for="industry in homePartnerIndustries"
          :key="industry"
          class="rounded-full bg-white/[0.09] px-6 py-2.5 text-base leading-6 text-white sm:text-lg"
        >
          {{ industry }}
        </li>
      </ul>
    </div>
  </section>
</template>
