<script setup lang="ts">
import type { AccessibilityTextSize } from "~/composables/useAccessibilityPreferences";

const props = defineProps<{
  open: boolean;
}>();

const emit = defineEmits<{
  close: [];
}>();

const panel = ref<HTMLElement | null>(null);
const closeButton = ref<HTMLButtonElement | null>(null);

const {
  preferences,
  hasCustomPreferences,
  setTextSize,
  toggleHighContrast,
  toggleReduceMotion,
  resetPreferences,
} = useAccessibilityPreferences();

const textSizes: Array<{
  value: AccessibilityTextSize;
  label: string;
  sampleClass: string;
}> = [
  { value: "default", label: "Standardowy", sampleClass: "text-xs" },
  { value: "large", label: "Większy", sampleClass: "text-sm" },
  { value: "largest", label: "Największy", sampleClass: "text-base" },
];

const closeFromOutside = (event: PointerEvent) => {
  const target = event.target;

  if (!(target instanceof Node) || panel.value?.contains(target)) {
    return;
  }

  if (target instanceof Element && target.closest("[data-accessibility-trigger]")) {
    return;
  }

  emit("close");
};

const closeAndRestoreFocus = () => {
  emit("close");
  nextTick(() => {
    Array.from(
      document.querySelectorAll<HTMLElement>(
        "[data-accessibility-trigger][aria-expanded='false']",
      ),
    )
      .find((trigger) => trigger.getClientRects().length > 0)
      ?.focus();
  });
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeAndRestoreFocus();
  }
};

watch(
  () => props.open,
  async (isOpen) => {
    if (isOpen) {
      await nextTick();
      closeButton.value?.focus();
      document.addEventListener("pointerdown", closeFromOutside);
      document.addEventListener("keydown", handleKeydown);
      return;
    }

    document.removeEventListener("pointerdown", closeFromOutside);
    document.removeEventListener("keydown", handleKeydown);
  },
);

onBeforeUnmount(() => {
  document.removeEventListener("pointerdown", closeFromOutside);
  document.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <Transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="-translate-y-2 scale-[0.98] opacity-0"
    enter-to-class="translate-y-0 scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="translate-y-0 scale-100 opacity-100"
    leave-to-class="-translate-y-2 scale-[0.98] opacity-0"
  >
    <section
      v-if="props.open"
      id="accessibility-panel"
      ref="panel"
      class="absolute end-0 top-[calc(100%+0.75rem)] z-[60] w-[min(23rem,calc(100vw-2rem))] overflow-hidden rounded-[1.5rem] bg-white shadow-[0_24px_70px_rgb(18_11_56_/_0.18)]"
      role="dialog"
      aria-modal="false"
      aria-labelledby="accessibility-panel-title"
    >
      <div class="flex items-start justify-between gap-5 bg-ink px-6 py-5 text-white">
        <div>
          <p class="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-white/52">Dostępność</p>
          <h2 id="accessibility-panel-title" class="mt-1 text-lg font-semibold tracking-[-0.03em] text-white">Dostosuj widok</h2>
        </div>
        <button
          ref="closeButton"
          type="button"
          class="grid size-9 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/18"
          aria-label="Zamknij panel dostosowania widoku"
          @click="closeAndRestoreFocus"
        >
          <svg class="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
            <path d="m6 6 12 12M18 6 6 18" />
          </svg>
        </button>
      </div>

      <div class="space-y-6 px-6 py-6 text-ink">
        <div>
          <div class="flex items-baseline justify-between gap-4">
            <p class="text-sm font-semibold">Rozmiar tekstu</p>
            <span class="text-xs text-ink/52">Wybierz wygodny poziom</span>
          </div>
          <div class="mt-3 grid grid-cols-3 rounded-xl bg-panel-soft p-1" role="group" aria-label="Rozmiar tekstu">
            <button
              v-for="size in textSizes"
              :key="size.value"
              type="button"
              class="flex min-h-11 items-center justify-center rounded-lg font-semibold transition-colors"
              :class="preferences.textSize === size.value ? 'bg-ink text-white shadow-sm' : 'text-ink/58 hover:text-ink'"
              :aria-pressed="preferences.textSize === size.value"
              :aria-label="size.label"
              @click="setTextSize(size.value)"
            >
              <span :class="size.sampleClass" aria-hidden="true">A</span>
            </button>
          </div>
        </div>

        <div class="divide-y divide-line border-y border-line">
          <div class="flex items-center justify-between gap-5 py-4">
            <div>
              <p class="text-sm font-semibold">Wyższy kontrast</p>
              <p class="mt-1 text-xs leading-5 text-ink/52">Wyraźniejsze tło, obramowania i tekst pomocniczy.</p>
            </div>
            <button
              type="button"
              role="switch"
              class="relative h-7 w-12 shrink-0 rounded-full transition-colors"
              :class="preferences.highContrast ? 'bg-brand' : 'bg-ink/18'"
              :aria-checked="preferences.highContrast"
              :aria-label="preferences.highContrast ? 'Wyłącz wyższy kontrast' : 'Włącz wyższy kontrast'"
              @click="toggleHighContrast"
            >
              <span class="absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform" :class="preferences.highContrast ? 'translate-x-6' : 'translate-x-1'" />
            </button>
          </div>

          <div class="flex items-center justify-between gap-5 py-4">
            <div>
              <p class="text-sm font-semibold">Ogranicz ruch</p>
              <p class="mt-1 text-xs leading-5 text-ink/52">Zatrzymuje automatyczne przejścia i płynne przewijanie.</p>
            </div>
            <button
              type="button"
              role="switch"
              class="relative h-7 w-12 shrink-0 rounded-full transition-colors"
              :class="preferences.reduceMotion ? 'bg-brand' : 'bg-ink/18'"
              :aria-checked="preferences.reduceMotion"
              :aria-label="preferences.reduceMotion ? 'Wyłącz ograniczenie ruchu' : 'Włącz ograniczenie ruchu'"
              @click="toggleReduceMotion"
            >
              <span class="absolute top-1 size-5 rounded-full bg-white shadow-sm transition-transform" :class="preferences.reduceMotion ? 'translate-x-6' : 'translate-x-1'" />
            </button>
          </div>
        </div>

        <button
          type="button"
          class="inline-flex min-h-11 items-center justify-center rounded-full border border-line px-5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-panel-soft disabled:cursor-not-allowed disabled:opacity-45"
          :disabled="!hasCustomPreferences"
          @click="resetPreferences"
        >
          Przywróć ustawienia domyślne
        </button>
      </div>
    </section>
  </Transition>
</template>
