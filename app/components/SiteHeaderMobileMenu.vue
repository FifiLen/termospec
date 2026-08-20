<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ServiceNavigationItem,
} from "~~/types/navigation";

const props = withDefaults(
  defineProps<{
    productCategories?: ProductNavigationCategory[];
    services?: ServiceNavigationItem[];
  }>(),
  {
    productCategories: () => [],
    services: () => [],
  },
);

const emit = defineEmits<{
  navigate: [];
}>();

const route = useRoute();
const { open: isSearchOpen } = useContentSearch();
const panel = ref<HTMLElement | null>(null);
const isProductsOpen = ref(route.path === "/produkty");
const isServicesOpen = ref(route.path === "/uslugi");

const scrollToProductCategory = (slug: string) => {
  panel.value
    ?.querySelector<HTMLElement>(`#mobile-product-category-${slug}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

defineExpose({
  focusFirstItem: () => {
    panel.value
      ?.querySelector<HTMLElement>("[data-mobile-menu-focus]")
      ?.focus();
  },
});
</script>

<template>
  <div
    id="mobile-navigation-panel"
    ref="panel"
    class="pointer-events-auto fixed inset-x-0 bottom-0 top-16 overflow-y-auto overscroll-contain bg-ink text-white xl:hidden"
  >
    <div
      class="mx-auto grid min-h-full w-full max-w-[96rem] md:grid-cols-[minmax(0,1fr)_18rem]"
    >
      <nav
        class="px-6 py-8 sm:px-8 md:px-10 md:py-10"
        aria-label="Nawigacja mobilna"
      >
        <div
          class="mb-6 flex items-center justify-between font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/45"
        >
          <span>Menu główne</span>
          <span>Termospec / PL</span>
        </div>

        <div class="border-t border-white/15">
          <NuxtLink
            data-mobile-menu-focus
            to="/o-firmie"
            class="group grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center border-b border-white/15 py-3 outline-none"
            @click="emit('navigate')"
          >
            <span class="font-mono text-[0.65rem] text-white/35">01</span>
            <span
              class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70"
            >
              O firmie
            </span>
            <span class="text-lg text-brand" aria-hidden="true">↗</span>
          </NuxtLink>

          <div class="border-b border-white/15">
            <button
              type="button"
              class="group grid min-h-20 w-full grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center py-3 text-left outline-none"
              :aria-expanded="isProductsOpen"
              aria-controls="mobile-products-list"
              @click="isProductsOpen = !isProductsOpen"
            >
              <span class="font-mono text-[0.65rem] text-white/35">02</span>
              <span
                class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70"
              >
                Produkty
              </span>
              <span
                class="grid size-8 place-items-center border border-white/25 text-lg text-white"
                aria-hidden="true"
              >
                <span
                  class="transition-transform duration-300"
                  :class="{ 'rotate-45': isProductsOpen }"
                >+</span>
              </span>
            </button>

            <div
              id="mobile-products-list"
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :class="isProductsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              :aria-hidden="!isProductsOpen"
              :inert="!isProductsOpen"
            >
              <div class="overflow-hidden">
                <div class="mb-5 ms-[2.75rem] border-s border-white/15 ps-4">
                  <NuxtLink
                    to="/produkty"
                    class="flex min-h-12 items-center justify-between border-b border-white/15 text-sm font-black text-white"
                    @click="emit('navigate')"
                  >
                    <span>Pełny katalog</span>
                    <span class="text-brand" aria-hidden="true">→</span>
                  </NuxtLink>

                  <section
                    v-for="category in props.productCategories"
                    :id="`mobile-product-category-${category.slug}`"
                    :key="category.slug"
                    class="scroll-mt-5 border-b border-white/10 py-4 last:border-b-0"
                  >
                    <div class="grid grid-cols-[2rem_minmax(0,1fr)] gap-2">
                      <span
                        class="font-mono text-[0.58rem] font-bold text-brand"
                      >{{ category.number }}</span>
                      <div>
                        <h3
                          class="text-xs font-black uppercase leading-5 text-white"
                        >
                          {{ category.label }}
                        </h3>
                        <ul v-if="category.entries.length" class="mt-2 grid gap-1">
                          <li
                            v-for="entry in category.entries"
                            :key="entry.id"
                            class="text-[0.7rem] font-bold leading-5 text-white/58"
                          >
                            <button
                              v-if="entry.targetSlug"
                              type="button"
                              class="text-left underline decoration-brand/60 underline-offset-4"
                              @click="scrollToProductCategory(entry.targetSlug)"
                            >
                              {{ entry.label }}
                            </button>
                            <span v-else>{{ entry.label }}</span>
                          </li>
                        </ul>

                        <div v-if="category.groups.length" class="mt-3 grid gap-3">
                          <section
                            v-for="group in category.groups"
                            :key="group.slug"
                            class="border-s border-white/15 ps-3"
                          >
                            <h4
                              class="text-[0.64rem] font-black uppercase leading-4 text-white/72"
                            >
                              {{ group.label }}
                            </h4>
                            <p
                              v-if="group.entries.length"
                              class="mt-1 font-mono text-[0.58rem] font-bold leading-5 text-white/42"
                            >
                              {{
                                group.entries
                                  .map((entry) => entry.label)
                                  .join(" · ")
                              }}
                            </p>
                          </section>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>

          <div class="border-b border-white/15">
            <button
              type="button"
              class="group grid min-h-20 w-full grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center py-3 text-left outline-none"
              :aria-expanded="isServicesOpen"
              aria-controls="mobile-services-list"
              @click="isServicesOpen = !isServicesOpen"
            >
              <span class="font-mono text-[0.65rem] text-white/35">03</span>
              <span
                class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70"
              >
                Usługi
              </span>
              <span
                class="grid size-8 place-items-center border border-white/25 text-lg text-white"
                aria-hidden="true"
              >
                <span
                  class="transition-transform duration-300"
                  :class="{ 'rotate-45': isServicesOpen }"
                >+</span>
              </span>
            </button>

            <div
              id="mobile-services-list"
              class="grid transition-[grid-template-rows] duration-300 ease-out"
              :class="isServicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
              :aria-hidden="!isServicesOpen"
              :inert="!isServicesOpen"
            >
              <div class="overflow-hidden">
                <div class="mb-5 ms-[2.75rem] border-s border-white/15 ps-4">
                  <NuxtLink
                    to="/uslugi"
                    class="flex min-h-12 items-center justify-between border-b border-white/15 text-sm font-black text-white"
                    @click="emit('navigate')"
                  >
                    <span>Wszystkie usługi</span>
                    <span class="text-brand" aria-hidden="true">→</span>
                  </NuxtLink>

                  <NuxtLink
                    v-for="service in props.services"
                    :key="service.slug"
                    :to="service.href"
                    class="block border-b border-white/10 py-3 last:border-b-0"
                    @click="emit('navigate')"
                  >
                    <span
                      class="text-xs font-black uppercase leading-5 text-white/76"
                    >{{ service.label }}</span>
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>

          <NuxtLink
            to="/#kontakt"
            class="group grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center border-b border-white/15 py-3 outline-none"
            @click="emit('navigate')"
          >
            <span class="font-mono text-[0.65rem] text-white/35">04</span>
            <span
              class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70"
            >
              Kontakt
            </span>
            <span class="text-lg text-brand" aria-hidden="true">↘</span>
          </NuxtLink>

          <div
            class="grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)] items-center border-b border-white/15 py-3"
          >
            <span class="font-mono text-[0.65rem] text-white/35">05</span>
            <button
              type="button"
              class="flex h-full w-full items-center justify-between rounded-none p-0 font-heading text-[clamp(1.8rem,7vw,3rem)] font-black tracking-[-0.04em] text-white transition-colors hover:text-white/70"
              @click="isSearchOpen = true; emit('navigate')"
            >
              <span>Szukaj</span>
              <svg
                class="size-6 text-brand"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <aside
        class="flex flex-col border-t border-white/15 bg-white/[0.035] px-6 py-7 sm:px-8 md:border-s md:border-t-0 md:px-7 md:py-10"
        aria-label="Dodatkowe opcje nawigacji"
      >
        <div>
          <p
            class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/35"
          >
            Dodatkowe informacje
          </p>

          <NuxtLink
            to="/dofinansowania"
            class="mt-5 flex min-h-12 items-center justify-between border-y border-white/15 text-sm font-bold text-white"
            @click="emit('navigate')"
          >
            <span>Dofinansowania</span>
            <span class="text-brand" aria-hidden="true">↗</span>
          </NuxtLink>

          <div class="mt-6 flex items-center gap-3 font-mono text-xs">
            <button
              type="button"
              class="grid size-11 place-items-center border border-white/35 bg-white text-ink"
              aria-pressed="true"
            >
              PL
            </button>
            <button
              type="button"
              class="grid size-11 place-items-center border border-white/15 text-white/40"
              aria-pressed="false"
            >
              EN
            </button>
          </div>
        </div>

        <NuxtLink
          to="/#kontakt"
          class="mt-8 flex min-h-14 items-center justify-between bg-brand px-5 font-mono text-xs font-bold uppercase tracking-wider text-white md:mt-auto"
          @click="emit('navigate')"
        >
          <span>Zapytaj o ofertę</span>
          <span aria-hidden="true">→</span>
        </NuxtLink>
      </aside>
    </div>
  </div>
</template>
