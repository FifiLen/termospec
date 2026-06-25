<template>
  <div
    class="fixed right-4 top-[4.75rem] z-40 flex items-center gap-2 md:right-6 lg:right-10"
    role="group"
    aria-label="Szybkie akcje strony"
  >
    <UContentSearchButton
      label="Szukaj"
      color="neutral"
      variant="ghost"
      size="lg"
      :tooltip="{ content: { side: 'left' } }"
      class="size-12 justify-center rounded-full border border-line bg-white/95 p-0 text-ink shadow-soft backdrop-blur-md transition hover:border-brand hover:bg-white hover:text-brand hover:shadow-lift"
      :ui="{ leadingIcon: 'size-5' }"
    />

    <button
      type="button"
      class="inline-flex size-12 items-center justify-center rounded-full border border-line bg-white/95 text-ink shadow-soft backdrop-blur-md transition disabled:cursor-default disabled:opacity-100"
      aria-label="Dostępność, funkcja w przygotowaniu"
      title="Dostępność"
      disabled
    >
      <UIcon name="i-lucide-accessibility" class="size-5" aria-hidden="true" />
    </button>
  </div>
</template>
