<script setup lang="ts">
const hotline = {
  label: "Serwis 24/7",
  display: "+48 603 899 165",
  href: "tel:+48603899165",
};
</script>

<template>
  <a
    :href="hotline.href"
    class="flex items-center gap-[clamp(1.25rem,2.6vw,3.1rem)] rounded-[clamp(1.25rem,1.6vw,1.9rem)] bg-brand px-[clamp(1.5rem,3.3vw,4rem)] py-[clamp(1.25rem,2vw,2.4rem)] text-white transition-colors hover:bg-white hover:text-brand"
  >
    <svg
      class="size-[clamp(3rem,4.1vw,4.95rem)] shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.3"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      <path d="m3 3 1.6-.6 5.6 5.6-1.4 1.4L3.2 3.8z" />
      <path d="m13.2 12 7.2 7.2a1.6 1.6 0 0 1 0 2.2l-.2.2a1.6 1.6 0 0 1-2.2 0L10.8 14.4z" />
    </svg>
    <span>
      <span class="block text-[clamp(0.85rem,1.02vw,1.22rem)] font-semibold uppercase leading-none tracking-[0.2em]">
        {{ hotline.label }}
      </span>
      <span class="mt-2 block whitespace-nowrap text-[clamp(1.35rem,2.1vw,2.5rem)] font-bold leading-tight">
        {{ hotline.display }}
      </span>
    </span>
  </a>
</template>
