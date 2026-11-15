<script setup lang="ts">
import type { RealizationContent } from "~~/schemas/realization";

const props = defineProps<{
  realization: Pick<RealizationContent, "id" | "title" | "industry" | "description" | "image">;
}>();

const studioEditable = useStudioEditable();
</script>

<template>
  <article v-bind="studioEditable(props.realization.id)">
    <div class="group aspect-[561/286] overflow-hidden rounded-[clamp(1.25rem,2.35vw,2.8rem)] bg-surface">
      <NuxtImg
        v-if="props.realization.image.src"
        sizes="sm:100vw md:33vw lg:33vw xl:33vw 2xl:592px"
        format="webp"
        :src="props.realization.image.src"
        :alt="props.realization.image.alt"
        width="561"
        height="286"
        loading="lazy"
        decoding="async"
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.025]"
      />
    </div>

    <p class="mt-[clamp(1.25rem,2.2vw,2.65rem)] text-[clamp(0.85rem,0.92vw,1.1rem)] font-light text-muted">
      {{ props.realization.industry }}
    </p>
    <h3 class="mt-[clamp(0.75rem,1.1vw,1.3rem)] text-[clamp(1.25rem,1.5vw,1.8rem)] font-bold leading-tight tracking-[-0.01em] text-heading">
      {{ props.realization.title }}
    </h3>
    <p class="mt-1.5 max-w-[24rem] text-[clamp(0.95rem,1.05vw,1.25rem)] leading-[1.45] text-muted">
      {{ props.realization.description }}
    </p>
  </article>
</template>
