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

interface HeaderNavigationItem {
  label: string;
  to: string;
  value: string;
  slot: string;
  active: boolean;
  class?: string;
}

const route = useRoute();
const { open: isSearchOpen } = useContentSearch();

const megaMenuItems = computed<HeaderNavigationItem[]>(() => [
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
  {
    label: "usługi",
    to: "/uslugi",
    value: "services",
    slot: "services",
    active: route.path === "/uslugi",
    class:
      route.path === "/uslugi"
        ? "text-ink underline decoration-2 underline-offset-8"
        : undefined,
  },
]);
</script>

<template>
  <div
    class="hidden h-16 w-full grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center text-base xl:grid"
  >
    <div class="flex h-full items-center border-e border-ink/10 ps-10 pe-[3.25rem]">
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
      class="flex h-full items-center justify-start gap-9 overflow-visible whitespace-nowrap px-10"
      aria-label="Główna nawigacja"
    >
      <NuxtLink
        to="/o-firmie"
        class="relative flex h-full items-center font-bold lowercase tracking-tight opacity-40 transition-opacity hover:opacity-100 [&.router-link-active]:opacity-100 [&.router-link-active]:underline [&.router-link-active]:decoration-2 [&.router-link-active]:underline-offset-8"
      >
        o firmie
      </NuxtLink>

      <UNavigationMenu
        :items="megaMenuItems"
        color="neutral"
        variant="link"
        class="flex h-full"
        :delay-duration="90"
        :skip-delay-duration="120"
        :ui="{
          root: 'h-full',
          list: 'h-full gap-9',
          item: 'h-full py-0',
          link: 'h-full rounded-none px-0 py-0 text-base font-bold lowercase tracking-tight text-ink/40 before:hidden hover:text-ink data-[state=open]:text-ink focus-visible:outline-none focus-visible:before:outline-none',
          linkLabel: 'truncate',
          linkTrailing: 'ms-1 text-current',
          linkTrailingIcon: 'size-4 shrink-0 transition-transform duration-200',
          content: 'absolute left-0 top-0 max-h-[70vh] overflow-y-auto',
          viewportWrapper:
            'absolute -left-[7.75rem] top-full z-40 flex max-w-[calc(100vw-13.25rem)] justify-start',
          viewport:
            'relative h-(--reka-navigation-menu-viewport-height) w-(--reka-navigation-menu-viewport-width) max-w-[calc(100vw-13.25rem)] overflow-hidden rounded-none bg-transparent shadow-none ring-0 transition-[width,height] duration-200',
        }"
      >
        <template #products-trailing>
          <span
            class="grid size-4 place-items-center text-current"
            aria-hidden="true"
          >
            <span class="size-1.5 rotate-45 border-e border-b border-current" />
          </span>
        </template>

        <template #services-trailing>
          <span
            class="grid size-4 place-items-center text-current"
            aria-hidden="true"
          >
            <span class="size-1.5 rotate-45 border-e border-b border-current" />
          </span>
        </template>

        <template #products-content>
          <ProductMegaMenu :categories="props.productCategories" />
        </template>

        <template #services-content>
          <ServiceMegaMenu :services="props.services" />
        </template>
      </UNavigationMenu>

      <NuxtLink
        to="/#kontakt"
        class="relative flex h-full items-center font-bold lowercase tracking-tight opacity-40 transition-opacity hover:opacity-100"
      >
        kontakt
      </NuxtLink>

      <button
        type="button"
        class="inline-flex h-full items-center gap-2 px-0 font-bold lowercase tracking-tight text-ink/40 transition-colors hover:text-ink"
        @click="isSearchOpen = true"
      >
        <svg
          class="size-4"
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
        <span>szukaj</span>
      </button>
    </nav>

    <NuxtLink
      to="/dofinansowania"
      aria-label="Dofinansowania Termospec"
      class="flex h-full items-center justify-center border-s border-ink/10 px-6"
    >
      <NuxtImg
        src="/panel-dofinansowanie.png"
        alt="Dofinansowanie"
        class="block h-16 w-auto object-contain"
      />
    </NuxtLink>

    <div
      class="flex h-full items-center justify-center gap-2 border-s border-ink/10 px-6 font-mono text-xs"
    >
      <button class="font-bold text-ink">PL</button>
      <span class="text-ink/20">/</span>
      <button class="text-ink/40 hover:text-ink">EN</button>
    </div>

    <div
      class="flex h-full items-center border-s border-ink/10 bg-brand ps-7 pe-10 transition-colors"
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
</template>
