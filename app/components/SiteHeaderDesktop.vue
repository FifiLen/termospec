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
    <div class="grid min-h-[4.5rem] grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-7 rounded-[1.75rem] bg-white px-6 shadow-[0_16px_50px_rgb(18_11_56_/_0.08)]">
      <NuxtLink to="/" aria-label="Termospec, strona główna" class="inline-flex pe-2 outline-none">
        <NuxtImg src="/termospec-logo.png" alt="Termospec" width="132" class="h-auto w-32" />
      </NuxtLink>

      <nav class="flex items-center gap-1" aria-label="Główna nawigacja">
        <NuxtLink
          to="/o-firmie"
          class="rounded-full px-5 py-3 text-sm font-medium lowercase transition-colors"
          :class="route.path === '/o-firmie' ? 'bg-[#f1ede6] text-ink' : 'text-ink/62 hover:text-ink'"
        >
          o firmie
        </NuxtLink>

        <NuxtLink
          to="/produkty"
          class="rounded-full px-5 py-3 text-sm font-medium lowercase transition-colors"
          :class="openMenu === 'products' || route.path.startsWith('/produkty') ? 'bg-ink text-white' : 'text-ink/62 hover:text-ink'"
          :aria-expanded="openMenu === 'products'"
          aria-haspopup="true"
          aria-controls="desktop-products-menu"
          @keydown.down.prevent="focusProductMenu"
          @mouseenter="openMenu = 'products'"
          @focus="openMenu = 'products'"
          @click="openMenu = null"
        >
          produkty
        </NuxtLink>

        <NuxtLink
          to="/uslugi"
          class="rounded-full px-5 py-3 text-sm font-medium lowercase transition-colors"
          :class="openMenu === 'services' || route.path.startsWith('/uslugi') ? 'bg-ink text-white' : 'text-ink/62 hover:text-ink'"
          :aria-expanded="openMenu === 'services'"
          aria-haspopup="true"
          aria-controls="desktop-services-menu"
          @mouseenter="openMenu = 'services'"
          @focus="openMenu = 'services'"
          @click="openMenu = null"
        >
          usługi
        </NuxtLink>

        <NuxtLink to="/#kontakt" class="rounded-full px-5 py-3 text-sm font-medium lowercase text-ink/62 transition-colors hover:text-ink">
          kontakt
        </NuxtLink>

        <NuxtLink
          to="/koncesja"
          class="rounded-full px-5 py-3 text-sm font-medium lowercase transition-colors"
          :class="route.path === '/koncesja' ? 'bg-panel-soft text-ink' : 'text-ink/62 hover:text-ink'"
        >
          koncesja
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <button
          type="button"
          class="inline-flex min-h-11 items-center gap-2.5 rounded-full bg-[#f1ede6] px-4 text-sm text-ink/48 transition-colors hover:text-ink"
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

        <div class="flex min-h-11 items-center rounded-full bg-[#f1ede6] p-1 text-xs font-medium">
          <button type="button" class="grid min-h-9 min-w-10 place-items-center rounded-full bg-ink px-3 text-white" aria-pressed="true">PL</button>
          <button type="button" class="grid min-h-9 min-w-10 place-items-center rounded-full px-3 text-ink/42" aria-pressed="false">EN</button>
        </div>

        <button
          type="button"
          data-accessibility-trigger
          class="grid size-11 shrink-0 place-items-center rounded-full transition-colors"
          :class="props.accessibilityOpen ? 'bg-ink text-white' : 'bg-[#f1ede6] text-ink hover:bg-[#e9e3da] hover:text-brand'"
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
          class="grid h-11 w-32 place-items-center overflow-hidden rounded-full bg-[#f1ede6] px-3 transition-colors hover:bg-[#e9e3da]"
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
    </Transition>
  </div>
</template>
