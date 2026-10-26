<script setup lang="ts">
import { homePartners } from "~~/data/home";

const track = ref<HTMLUListElement | null>(null);

function scrollPartners(direction: 1 | -1) {
  const element = track.value;

  if (!element) {
    return;
  }

  element.scrollBy({ left: direction * element.clientWidth, behavior: "smooth" });
}
</script>

<template>
  <section
    aria-labelledby="partners-title"
    class="bg-white pb-[clamp(3.5rem,3.75vw,4.5rem)] pt-[clamp(3.5rem,3.4vw,4.1rem)]"
  >
    <div class="design-shell">
      <div class="grid gap-8 lg:grid-cols-[58fr_42fr] lg:items-end lg:gap-0">
        <div>
          <SectionEyebrow label="Partnerzy i klienci" />

          <h2 id="partners-title" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)]">
            Zaufali nam producenci,<br class="hidden lg:inline">
            kopalnie i operatorzy<br class="hidden lg:inline">
            infrastruktury.
          </h2>
        </div>

        <p class="design-lead max-w-[44rem] lg:pb-[clamp(0.5rem,1.3vw,1.6rem)]">
          Część relacji trwa od pierwszych lat działalności firmy — od dostawy
          urządzeń po stały nadzór serwisowy.
        </p>
      </div>

      <div
        class="mt-[clamp(2.5rem,3.55vw,4.25rem)] flex min-h-[clamp(7rem,11.2vw,13.45rem)] items-center gap-2 rounded-[clamp(1.5rem,3.1vw,3.75rem)] bg-surface px-[clamp(0.5rem,1.4vw,1.7rem)]"
      >
        <button
          type="button"
          aria-label="Poprzednie logotypy"
          class="grid size-11 shrink-0 place-items-center rounded-full text-[2rem] font-light text-placeholder transition-colors hover:text-muted"
          @click="scrollPartners(-1)"
        >
          <span aria-hidden="true">←</span>
        </button>

        <ul
          ref="track"
          aria-label="Miejsca na logotypy partnerów i klientów"
          class="partner-track grid min-w-0 flex-1 snap-x snap-mandatory auto-cols-[50%] grid-flow-col overflow-x-auto sm:auto-cols-[33.333%] lg:auto-cols-[20%]"
        >
          <li
            v-for="partner in homePartners"
            :key="partner.id"
            class="grid snap-start place-items-center px-4 py-6"
          >
            <span
              :aria-label="partner.label"
              class="text-[clamp(1.75rem,3.4vw,4.1rem)] font-extrabold uppercase leading-none tracking-[0.01em] text-placeholder [font-stretch:125%]"
            >
              Logo
            </span>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Następne logotypy"
          class="grid size-11 shrink-0 place-items-center rounded-full text-[2rem] font-light text-placeholder transition-colors hover:text-muted"
          @click="scrollPartners(1)"
        >
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partner-track {
  scrollbar-width: none;
}

.partner-track::-webkit-scrollbar {
  display: none;
}
</style>
