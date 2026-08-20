<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  navigate: [];
  toggle: [];
}>();

const menuButton = ref<HTMLButtonElement | null>(null);

defineExpose({
  focusMenuButton: () => menuButton.value?.focus(),
});
</script>

<template>
  <div class="flex h-16 items-stretch xl:hidden">
    <div class="flex min-w-0 flex-1 items-center px-4 sm:px-6">
      <NuxtLink
        class="inline-flex outline-none"
        to="/"
        aria-label="Termospec, strona główna"
        @click="emit('navigate')"
      >
        <NuxtImg
          src="/termospec-logo.png"
          alt="Termospec"
          width="112"
          class="block h-auto w-28"
        />
      </NuxtLink>
    </div>

    <button
      ref="menuButton"
      type="button"
      class="relative grid size-16 place-items-center border-s border-line bg-brand text-white transition-colors hover:bg-ink"
      aria-controls="mobile-navigation-panel"
      :aria-expanded="isOpen"
      :aria-label="isOpen ? 'Zamknij menu główne' : 'Otwórz menu główne'"
      @click="emit('toggle')"
    >
      <span class="relative block h-5 w-6" aria-hidden="true">
        <span
          class="absolute start-0 top-1 block h-px w-6 bg-current transition duration-300"
          :class="isOpen ? 'translate-y-[0.35rem] rotate-45' : undefined"
        />
        <span
          class="absolute start-0 top-1/2 block h-px w-6 -translate-y-1/2 bg-current transition duration-200"
          :class="isOpen ? 'opacity-0' : undefined"
        />
        <span
          class="absolute bottom-1 start-0 block h-px w-6 bg-current transition duration-300"
          :class="isOpen ? '-translate-y-[0.35rem] -rotate-45' : undefined"
        />
      </span>
    </button>
  </div>
</template>
