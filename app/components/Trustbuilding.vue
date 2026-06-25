<script setup lang="ts">
import { homePartners } from "~~/data/home";
</script>

<template>
  <section
    class="border-y border-white/10 bg-ink px-6 py-12 text-white lg:px-10"
  >
    <div class="mx-auto max-w-[96rem]">
      <div class="mb-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <div>
          <p
            class="font-mono text-xs font-bold uppercase tracking-[0.28em] text-brand"
          >
            partnerzy i współpraca
          </p>

          <h2
            class="mt-4 max-w-xl text-2xl font-black tracking-[-0.04em] text-white md:text-3xl"
          >
            Zaplecze biznesowe i techniczne wokół projektów przemysłowych.
          </h2>
        </div>
      </div>

      <div
        class="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-3 lg:grid-cols-6"
      >
        <article
          v-for="partner in homePartners"
          :key="partner.name"
          class="group min-h-36 bg-white/[0.045] p-5 transition duration-300 hover:bg-white/[0.075]"
        >
          <div class="flex h-full flex-col justify-between">
            <div class="flex items-center gap-4">
              <div
                class="grid h-12 w-12 shrink-0 place-items-center border border-white/15 bg-white/[0.04] font-heading text-lg font-black tracking-[-0.05em] text-white/80 transition duration-300 group-hover:border-brand/60 group-hover:text-white"
              >
                {{ partner.mark }}
              </div>

              <div class="min-w-0">
                <p
                  class="truncate text-sm font-black tracking-[-0.035em] text-white"
                >
                  {{ partner.name }}
                </p>
                <p class="mt-1 text-xs font-medium text-white/42">
                  {{ partner.sector }}
                </p>
              </div>
            </div>

            <div
              class="mt-6 h-px w-full bg-[linear-gradient(90deg,rgba(227,6,19,.8),transparent)] opacity-40"
            />
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
