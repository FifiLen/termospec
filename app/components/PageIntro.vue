<script setup lang="ts">
defineProps<{
  eyebrow: string;
  title: string;
  titleId?: string;
}>();
</script>

<template>
  <section
    :aria-labelledby="titleId"
    class="pb-[clamp(2.5rem,3.4vw,4.1rem)] pt-[calc(var(--site-header-height)+clamp(3rem,5vw,6rem))]"
  >
    <div class="design-shell">
      <div class="grid gap-8 lg:grid-cols-[58fr_42fr] lg:items-end lg:gap-0">
        <div>
          <SectionEyebrow :label="eyebrow" />
          <h1 :id="titleId" class="design-heading mt-[clamp(1.75rem,2.5vw,3rem)] max-w-[24ch] text-balance">
            {{ title }}
          </h1>
        </div>

        <div v-if="$slots.default" class="design-lead max-w-[44rem] lg:pb-[clamp(0.25rem,0.6vw,0.75rem)]">
          <slot />
        </div>
      </div>
    </div>
  </section>
</template>
