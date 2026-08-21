<script setup lang="ts">
import type { ProductNavigationCategory } from "~~/types/navigation";

const props = defineProps<{
  categories: ProductNavigationCategory[];
}>();

const toProduct = (id?: string) => id ? `/produkty#${id}` : "/produkty";

const categoryTarget = (category: ProductNavigationCategory) => {
  return toProduct(category.entries[0]?.id || category.groups[0]?.entries[0]?.id);
};

</script>

<template>
  <section class="max-h-[calc(100vh-8.5rem)] w-full overflow-y-auto rounded-[1.75rem] bg-white px-10 py-9 shadow-[0_20px_60px_rgb(18_11_56_/_0.1)]" aria-label="Pełny katalog produktów">
    <div v-if="props.categories.length" class="columns-3 gap-14">
      <section v-for="category in props.categories" :key="category.slug" class="mb-10 break-inside-avoid">
          <NuxtLink :to="categoryTarget(category)" class="group block">
            <h3
              class="font-sans font-medium transition-colors group-hover:text-brand"
              :class="category.entries.length ? 'text-base leading-6 text-ink' : 'text-sm leading-5 text-ink/38'"
            >
              {{ category.label }}
            </h3>
          </NuxtLink>

          <ul v-if="category.entries.length" class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            <li v-for="entry in category.entries" :key="entry.id">
              <NuxtLink :to="toProduct(entry.id)" class="text-xs leading-5 text-ink/44 transition-colors hover:text-brand">
                {{ entry.label }}
              </NuxtLink>
            </li>
          </ul>

          <div v-if="category.groups.length" class="mt-4 grid gap-5">
            <section v-for="group in category.groups" :key="group.slug">
              <NuxtLink :to="toProduct(group.entries[0]?.id)" class="text-base font-medium leading-6 text-ink transition-colors hover:text-brand">
                {{ group.label }}
              </NuxtLink>
              <ul v-if="group.entries.length" class="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                <li v-for="entry in group.entries" :key="entry.id">
                  <NuxtLink :to="toProduct(entry.id)" class="text-xs leading-5 text-ink/44 transition-colors hover:text-brand">
                    {{ entry.label }}
                  </NuxtLink>
                </li>
              </ul>
            </section>
          </div>

          <NuxtLink v-if="!category.entries.length && !category.groups.length" to="/produkty" class="mt-4 inline-flex text-sm font-medium text-ink transition-colors hover:text-brand">
            Zobacz kategorię →
          </NuxtLink>
      </section>
    </div>

    <div v-else class="grid min-h-40 place-items-center text-sm text-ink/42">Katalog jest ładowany…</div>
  </section>
</template>
