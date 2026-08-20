<script setup lang="ts">
import { pl } from '@nuxt/ui/locale'

const locale = shallowRef(pl)

provide(Symbol.for('nuxt-ui.locale-context'), locale)
</script>

<template>
  <slot />
</template>
