<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  overlay: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
  toggle: [];
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
