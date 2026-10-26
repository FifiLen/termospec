<script setup lang="ts">
defineProps<{
  label: string;
}>();
</script>

<template>
  <p
    class="flex items-center gap-5 text-[clamp(0.8rem,0.92vw,1.1rem)] font-medium uppercase leading-none tracking-[0.24em] text-muted"
  >
    <span aria-hidden="true" class="h-0.5 w-16 shrink-0 bg-brand lg:w-24" />
    {{ label }}
  </p>
</template>
