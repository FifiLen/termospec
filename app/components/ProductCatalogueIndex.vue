<script setup lang="ts">
import type { ProductNavigationCategory } from "~~/types/navigation";
import { selectableCatalogueEntries } from "~/utils/product-catalogue";

const props = defineProps<{
  categories: ProductNavigationCategory[];
  activeCategorySlug: string;
  activeGroupSlug: string;
  activeEntryId: string;
  expandedCategorySlug: string;
  expandedGroupSlug: string;
}>();

const searchQuery = defineModel<string>("searchQuery", { default: "" });
const searchId = useId();
const emit = defineEmits<{
  categoryExpanded: [categorySlug: string, open: boolean];
  groupExpanded: [categorySlug: string, groupSlug: string, open: boolean];
  selectEntry: [categorySlug: string, groupSlug: string, entryId: string];
}>();
</script>

<template>
  <aside
    class="overflow-y-auto overscroll-contain rounded-[clamp(1.5rem,2.6vw,3.1rem)] bg-brand text-white"
    data-lenis-prevent
    aria-label="Indeks katalogu produktów"
  >
    <div class="sticky top-0 z-20 border-b border-white/15 bg-brand px-5 py-5">
      <label :for="searchId" class="sr-only">
        Szukaj w katalogu produktów
      </label>
      <div class="relative">
        <UIcon
          name="i-lucide-search"
          class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/70"
          aria-hidden="true"
        />
        <input
          :id="searchId"
          v-model="searchQuery"
          type="search"
          class="h-12 w-full rounded-xl border border-white/20 bg-white/10 pl-10 pr-3 text-sm font-medium text-white outline-none transition placeholder:text-white/52 focus:border-white/55 focus:bg-white/15"
          placeholder="Szukaj typu lub kategorii"
          autocomplete="off"
        />
      </div>
    </div>

    <nav aria-label="Główne kategorie produktów">
      <div
        v-for="category in props.categories"
        :key="category.slug"
        class="border-b border-white/15 last:border-b-0"
      >
        <UCollapsible
          :open="props.expandedCategorySlug === category.slug"
          :unmount-on-hide="false"
          :ui="{
            content:
              'overflow-hidden motion-reduce:animate-none motion-reduce:transition-none',
          }"
          @update:open="emit('categoryExpanded', category.slug, $event)"
        >
          <template #default="{ open }">
            <button
              type="button"
              class="group grid w-full grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
              :class="
                props.activeCategorySlug === category.slug || open
                  ? 'bg-white/15 text-white'
                  : 'text-white/72 hover:bg-white/10 hover:text-white'
              "
              :aria-current="props.activeCategorySlug === category.slug ? 'location' : undefined"
            >
              <span class="whitespace-nowrap text-[0.8rem] font-black uppercase leading-5">
                {{ category.label }}
              </span>
              <UIcon
                name="i-lucide-chevron-down"
                class="size-4 transition-transform duration-200 motion-reduce:transition-none"
                :class="open ? 'rotate-180' : ''"
                aria-hidden="true"
              />
            </button>
          </template>

          <template #content>
            <div class="border-t border-white/15 bg-black/10 py-1.5">
              <div v-if="category.groups.length">
                <UCollapsible
                  v-for="group in category.groups"
                  :key="group.slug"
                  :open="props.expandedGroupSlug === group.slug"
                  :unmount-on-hide="false"
                  :ui="{
                    content:
                      'overflow-hidden motion-reduce:animate-none motion-reduce:transition-none',
                  }"
                  @update:open="emit('groupExpanded', category.slug, group.slug, $event)"
                >
                  <template #default="{ open }">
                    <button
                      type="button"
                      class="grid w-full grid-cols-[minmax(0,1fr)_1rem] items-center gap-2 py-3 pe-4 ps-7 text-left text-[0.78rem] font-extrabold leading-5 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                      :class="props.activeGroupSlug === group.slug ? 'bg-white/12 text-white' : 'text-white/68 hover:bg-white/8 hover:text-white'"
                    >
                      <span>{{ group.label }}</span>
                      <UIcon
                        name="i-lucide-chevron-down"
                        class="size-3.5 transition-transform duration-200 motion-reduce:transition-none"
                        :class="open ? 'rotate-180' : ''"
                        aria-hidden="true"
                      />
                    </button>
                  </template>

                  <template #content>
                    <ul
                      class="border-y border-white/10 bg-black/10 py-1.5"
                      :aria-label="`Typy w podkategorii ${group.label}`"
                    >
                      <li
                        v-for="entry in selectableCatalogueEntries(group.entries)"
                        :key="entry.id"
                      >
                        <button
                          type="button"
                          class="w-full py-2 pe-4 ps-10 text-left text-xs font-bold leading-4 transition-colors duration-200 hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                          :class="props.activeEntryId === entry.id ? 'bg-white/14 text-white' : 'text-white/58'"
                          @click="emit('selectEntry', category.slug, group.slug, entry.id)"
                        >
                          {{ entry.label }}
                        </button>
                      </li>
                    </ul>
                  </template>
                </UCollapsible>
              </div>

              <ul
                v-else
                :aria-label="`Typy w kategorii ${category.label}`"
              >
                <li
                  v-for="entry in selectableCatalogueEntries(category.entries)"
                  :key="entry.id"
                >
                  <button
                    type="button"
                    class="w-full py-2.5 pe-4 ps-7 text-left text-xs font-bold leading-4 transition-colors duration-200 hover:bg-white/8 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-white"
                    :class="props.activeEntryId === entry.id ? 'bg-white/14 text-white' : 'text-white/60'"
                    @click="emit('selectEntry', category.slug, '', entry.id)"
                  >
                    {{ entry.label }}
                  </button>
                </li>
              </ul>
            </div>
          </template>
        </UCollapsible>
      </div>
    </nav>
    <p v-if="!props.categories.length" class="px-5 py-6 text-sm text-white/72" role="status">
      Brak pasujących produktów.
    </p>
  </aside>
</template>
