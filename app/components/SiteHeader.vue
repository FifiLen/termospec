<script setup lang="ts">
import type { HeaderProductMenuItem } from "~~/types/navigation";

const props = withDefaults(
  defineProps<{
    products?: HeaderProductMenuItem[];
  }>(),
  {
    products: () => [],
  },
);

interface HeaderNavigationItem {
  label: string;
  to: string;
  value: string;
  slot: string;
  active: boolean;
  class?: string;
}

const route = useRoute();
const headerSurface = ref<HTMLElement | null>(null);
const isScrolled = ref(false);

const productNavigationItems = computed<HeaderNavigationItem[]>(() => [
  {
    label: "produkty",
    to: "/produkty",
    value: "products",
    slot: "products",
    active: route.path === "/produkty",
    class:
      route.path === "/produkty"
        ? "text-ink underline decoration-2 underline-offset-8"
        : undefined,
  },
]);

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 8;
};

onMounted(() => {
  updateScrollState();
  window.addEventListener("scroll", updateScrollState, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", updateScrollState);
});
</script>

<template>
  <header class="fixed top-0 inset-x-0 z-50 pointer-events-none text-ink">
    <div
      ref="headerSurface"
      class="w-full bg-white/95 backdrop-blur-md pointer-events-auto border-b border-line transition-colors duration-200"
      :class="isScrolled ? 'bg-white' : undefined"
    >
      <div
        class="w-full grid grid-cols-[auto_minmax(0,1fr)_auto] md:grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center h-16 text-[0.88rem]"
      >
        <div
          class="px-4 md:pl-6 md:pr-9 lg:pl-10 lg:pr-[3.25rem] border-r border-ink/10 flex items-center h-full"
        >
          <NuxtLink
            class="inline-flex outline-none"
            to="/"
            aria-label="Termospec, strona główna"
          >
            <NuxtImg
              src="/termospec-logo.png"
              alt="Termospec"
              width="100"
              class="block h-auto"
            />
          </NuxtLink>
        </div>

        <nav
          class="flex items-center justify-start gap-5 md:gap-12 px-4 md:px-8 lg:px-12 h-full overflow-x-auto whitespace-nowrap lg:overflow-visible [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Główna nawigacja"
        >
          <NuxtLink
            to="/"
            class="font-bold lowercase tracking-tight opacity-40 hover:opacity-100 transition-opacity [&.router-link-active]:opacity-100 [&.router-link-active]:underline [&.router-link-active]:decoration-2 [&.router-link-active]:underline-offset-8 flex items-center h-full relative"
          >
            strona główna
          </NuxtLink>
          <NuxtLink
            to="/produkty"
            class="font-bold lowercase tracking-tight opacity-40 hover:opacity-100 transition-opacity [&.router-link-active]:opacity-100 [&.router-link-active]:underline [&.router-link-active]:decoration-2 [&.router-link-active]:underline-offset-8 flex items-center h-full relative lg:hidden"
          >
            produkty
          </NuxtLink>
          <UNavigationMenu
            :items="productNavigationItems"
            color="neutral"
            variant="link"
            class="hidden h-full lg:flex"
            :delay-duration="90"
            :skip-delay-duration="120"
            :ui="{
              root: 'h-full',
              list: 'h-full',
              item: 'h-full py-0',
              link: 'h-full rounded-none px-0 py-0 text-[0.88rem] font-bold lowercase tracking-tight text-ink/40 before:hidden hover:text-ink data-[state=open]:text-ink focus-visible:outline-none focus-visible:before:outline-none',
              linkLabel: 'truncate',
              linkTrailing: 'ms-1 text-current',
              linkTrailingIcon: 'size-4 shrink-0 transition-transform duration-200',
              content:
                'absolute left-0 top-0 w-[52rem] max-w-[calc(100vw-2rem)] max-h-[70vh] overflow-y-auto',
              viewportWrapper:
                'absolute left-0 top-full z-40 flex w-[52rem] max-w-[calc(100vw-2rem)] justify-start',
              viewport:
                'relative h-(--reka-navigation-menu-viewport-height) w-(--reka-navigation-menu-viewport-width) max-w-[calc(100vw-2rem)] overflow-hidden rounded-none bg-transparent shadow-none ring-0 transition-[width,height] duration-200',
            }"
          >
            <template #products-trailing>
              <span
                class="grid h-4 w-4 place-items-center text-current"
                aria-hidden="true"
              >
                <span class="h-1.5 w-1.5 rotate-45 border-r border-b border-current" />
              </span>
            </template>

            <template #products-content="{ close }">
              <ProductMegaMenu
                :products="props.products"
                :close="close"
              />
            </template>
          </UNavigationMenu>
          <NuxtLink
            to="/o-firmie"
            class="font-bold lowercase tracking-tight opacity-40 hover:opacity-100 transition-opacity [&.router-link-active]:opacity-100 [&.router-link-active]:underline [&.router-link-active]:decoration-2 [&.router-link-active]:underline-offset-8 flex items-center h-full relative"
          >
            o firmie
          </NuxtLink>
        </nav>

        <NuxtLink
          to="/dofinansowania"
          aria-label="Dofinansowania Termospec"
          class="hidden md:flex items-center justify-center px-6 border-l border-ink/10 h-full"
        >
          <NuxtImg
            src="/panel-dofinansowanie.png"
            alt="Dofinansowanie"
            class="block h-16 w-auto object-contain"
          />
        </NuxtLink>

        <div
          class="hidden md:flex items-center justify-center gap-2 px-6 border-l border-ink/10 h-full font-mono text-xs"
        >
          <button class="font-bold text-ink">PL</button>
          <span class="text-ink/20">/</span>
          <button class="text-ink/40 hover:text-ink">EN</button>
        </div>

        <div
          class="px-4 md:pl-3 md:pr-6 lg:pl-7 lg:pr-10 border-l border-ink/10 flex items-center h-full bg-brand transition-colors"
        >
          <NuxtLink
            class="inline-flex items-center gap-2 font-extrabold lowercase tracking-tight text-white"
            to="/#kontakt"
          >
            <span>zapytaj o ofertę</span>
            <span class="font-normal" aria-hidden="true">→</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </header>
</template>
