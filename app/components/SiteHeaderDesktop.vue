<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ServiceNavigationItem,
} from "~~/types/navigation";

const props = withDefaults(
  defineProps<{
    productCategories?: ProductNavigationCategory[];
    services?: ServiceNavigationItem[];
    overlay?: boolean;
    accessibilityOpen: boolean;
  }>(),
  {
    productCategories: () => [],
    services: () => [],
    overlay: false,
  },
);

const emit = defineEmits<{
  toggleAccessibility: [];
}>();

const route = useRoute();
const { open: isSearchOpen } = useContentSearch();
const openMenu = ref<"products" | "services" | null>(null);

const focusProductMenu = async () => {
  openMenu.value = "products";
  await nextTick();
  document.querySelector<HTMLInputElement>("#desktop-products-menu input")?.focus();
};

watch(() => route.fullPath, () => {
  openMenu.value = null;
});
</script>

<template>
  <div
    class="relative hidden w-full xl:block"
    @mouseleave="openMenu = null"
    @keydown.esc="openMenu = null"
  >
    <div class="grid min-h-[var(--site-header-height)] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-7 bg-white px-[var(--design-gutter)] shadow-[0_1px_0_rgb(10_24_71_/_0.08)]">
      <NuxtLink to="/" aria-label="Termospec, strona główna" class="inline-flex pe-2 outline-none">
        <img src="/images/brand/termospec-logo.svg" alt="Termospec" width="275" height="40" class="h-auto w-[clamp(11rem,14.3vw,17.2rem)]">
      </NuxtLink>

      <nav class="flex items-center gap-[clamp(0.25rem,1.1vw,1.4rem)] ps-[clamp(1rem,8vw,10rem)]" aria-label="Główna nawigacja">
        <NuxtLink
          to="/o-firmie"
          class="rounded-full px-[clamp(0.75rem,0.8vw,1rem)] py-2.5 text-[clamp(1rem,1.18vw,1.42rem)] font-bold transition-colors"
          :class="route.path === '/o-firmie' ? 'text-brand' : 'text-heading hover:text-brand'"
        >
          O firmie
        </NuxtLink>

        <NuxtLink
          to="/produkty"
          class="rounded-full px-[clamp(0.75rem,0.8vw,1rem)] py-2.5 text-[clamp(1rem,1.18vw,1.42rem)] font-bold transition-colors"
          :class="openMenu === 'products' || route.path.startsWith('/produkty') ? 'text-brand' : 'text-heading hover:text-brand'"
          :aria-expanded="openMenu === 'products'"
          aria-haspopup="true"
          aria-controls="desktop-products-menu"
          @keydown.down.prevent="focusProductMenu"
          @mouseenter="openMenu = 'products'"
          @focus="openMenu = 'products'"
          @click="openMenu = null"
        >
          Produkty
        </NuxtLink>

        <NuxtLink
          to="/uslugi"
          class="rounded-full px-[clamp(0.75rem,0.8vw,1rem)] py-2.5 text-[clamp(1rem,1.18vw,1.42rem)] font-bold transition-colors"
          :class="openMenu === 'services' || route.path.startsWith('/uslugi') ? 'text-brand' : 'text-heading hover:text-brand'"
          :aria-expanded="openMenu === 'services'"
          aria-haspopup="true"
          aria-controls="desktop-services-menu"
          @mouseenter="openMenu = 'services'"
          @focus="openMenu = 'services'"
          @click="openMenu = null"
        >
          Usługi
        </NuxtLink>

        <NuxtLink to="/#kontakt" class="rounded-full px-[clamp(0.75rem,0.8vw,1rem)] py-2.5 text-[clamp(1rem,1.18vw,1.42rem)] font-bold text-heading transition-colors hover:text-brand">
          Kontakt
        </NuxtLink>

        <NuxtLink
          to="/koncesja"
          class="rounded-full px-[clamp(0.75rem,0.8vw,1rem)] py-2.5 text-[clamp(1rem,1.18vw,1.42rem)] font-bold transition-colors"
          :class="route.path === '/koncesja' ? 'text-brand' : 'text-heading hover:text-brand'"
        >
          Koncesja
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-chip px-4 text-sm text-ink/48 transition-colors hover:text-ink"
          @click="isSearchOpen = true"
        >
          <svg
            class="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" />
          </svg>
          <span>szukaj</span>
        </button>

        <div class="flex min-h-11 items-center rounded-full bg-chip p-1 text-xs font-medium">
          <button type="button" class="grid min-h-9 min-w-10 place-items-center rounded-full bg-ink px-3 text-white" aria-pressed="true">PL</button>
          <button type="button" class="grid min-h-9 min-w-10 place-items-center rounded-full px-3 text-ink/42" aria-pressed="false">EN</button>
        </div>

        <button
          type="button"
          data-accessibility-trigger
          class="grid size-11 shrink-0 place-items-center rounded-full transition-colors"
          :class="props.accessibilityOpen ? 'text-brand' : 'bg-chip text-ink hover:bg-field hover:text-brand'"
          aria-label="Ustawienia dostępności"
          aria-haspopup="dialog"
          aria-controls="accessibility-panel"
          :aria-expanded="props.accessibilityOpen"
          title="Ustawienia dostępności"
          @click="emit('toggleAccessibility')"
        >
          <svg
            class="size-5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="16" cy="4" r="1" />
            <path d="m18 19 1-7-6 1M5 8l3-3 5.5 3-2.36 3.5m-6.9 3a5 5 0 0 0 6.88 6" />
            <path d="M13.76 17.5a5 5 0 0 0-6.88-6" />
          </svg>
        </button>

        <NuxtLink
          to="/dofinansowania"
          aria-label="Dofinansowanie ze środków Unii Europejskiej"
          class="grid h-11 w-32 place-items-center overflow-hidden rounded-full bg-chip px-3 transition-colors hover:bg-field"
        >
          <NuxtImg src="/panel-dofinansowanie.png" alt="Unia Europejska" width="150" class="max-h-9 w-auto object-contain" />
        </NuxtLink>
      </div>
    </div>

    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="-translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="-translate-y-2 opacity-0"
    >
      <div v-if="openMenu" class="absolute inset-x-0 top-full pt-3">
        <div class="design-shell">
          <ProductMegaMenu
            v-if="openMenu === 'products'"
            id="desktop-products-menu"
            :categories="props.productCategories"
            @navigate="openMenu = null"
          />
          <ServiceMegaMenu
            v-else
            id="desktop-services-menu"
            :services="props.services"
          />
        </div>
      </div>
    </Transition>
  </div>
</template>
