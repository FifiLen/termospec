<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  overlay: boolean;
  accessibilityOpen: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
  toggle: [];
  toggleAccessibility: [];
}>();

const { open: isSearchOpen } = useContentSearch();
const menuButton = ref<HTMLButtonElement | null>(null);

defineExpose({
  focusMenuButton: () => menuButton.value?.focus(),
});
</script>

<template>
  <div class="flex min-h-16 w-full items-center rounded-[1.5rem] bg-white px-4 shadow-[0_14px_40px_rgb(18_11_56_/_0.09)] xl:hidden">
    <NuxtLink class="inline-flex outline-none" to="/" aria-label="Termospec, strona główna" @click="emit('navigate')">
      <NuxtImg src="/termospec-logo.png" alt="Termospec" width="120" class="h-auto w-28" />
    </NuxtLink>

    <div class="ms-auto flex items-center gap-2">
      <button
        type="button"
        class="grid size-11 place-items-center rounded-full bg-[#f1ede6] text-ink/48 transition-colors hover:text-ink"
        aria-label="Otwórz wyszukiwanie"
        @click="isSearchOpen = true"
      >
        <span class="size-3.5 rounded-full border border-current" aria-hidden="true" />
      </button>

      <button
        type="button"
        data-accessibility-trigger
        class="grid size-11 place-items-center rounded-full transition-colors"
        :class="accessibilityOpen ? 'bg-ink text-white' : 'bg-[#f1ede6] text-ink/48 hover:text-ink'"
        aria-label="Ustawienia dostępności"
        aria-haspopup="dialog"
        aria-controls="accessibility-panel"
        :aria-expanded="accessibilityOpen"
        @click="emit('toggleAccessibility')"
      >
        <svg
          class="size-5"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <circle cx="16" cy="4" r="1" />
          <path d="m18 19 1-7-6 1M5 8l3-3 5.5 3-2.36 3.5m-6.9 3a5 5 0 0 0 6.88 6" />
          <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
        </svg>
      </button>

      <button
        ref="menuButton"
        type="button"
        class="grid size-11 place-items-center rounded-full bg-ink text-white transition-colors hover:bg-brand"
        aria-controls="mobile-navigation-panel"
        :aria-expanded="isOpen"
        :aria-label="isOpen ? 'Zamknij menu główne' : 'Otwórz menu główne'"
        @click="emit('toggle')"
      >
        <span class="relative block h-4 w-5" aria-hidden="true">
          <span class="absolute start-0 top-0 block h-px w-5 bg-current" />
          <span class="absolute start-0 top-1/2 block h-px w-5 -translate-y-1/2 bg-current" />
          <span class="absolute bottom-0 start-0 block h-px w-5 bg-current" />
        </span>
      </button>
    </div>
  </div>
</template>
