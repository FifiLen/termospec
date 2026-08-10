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
const headerSurface = ref<HTMLElement | null>(null);
const mobileMenuButton = ref<HTMLButtonElement | null>(null);
const mobileMenuPanel = ref<HTMLElement | null>(null);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isMobileProductsOpen = ref(route.path === "/produkty");
const isMobileServicesOpen = ref(route.path === "/uslugi");

let previousDocumentOverflow = "";
let desktopBreakpoint: MediaQueryList | null = null;

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

const updateScrollState = () => {
  isScrolled.value = window.scrollY > 8;
};

const setPageInteractionDisabled = (disabled: boolean) => {
  document
    .querySelectorAll<HTMLElement>("main, footer")
    .forEach((element) => {
      element.inert = disabled;
    });
};

const closeMobileMenu = (restoreFocus = false) => {
  isMobileMenuOpen.value = false;

  if (restoreFocus) {
    nextTick(() => mobileMenuButton.value?.focus());
  }
};

const toggleMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    closeMobileMenu(true);
    return;
  }

  isMobileMenuOpen.value = true;
};

const scrollToMobileProductCategory = (slug: string) => {
  mobileMenuPanel.value
    ?.querySelector<HTMLElement>(`#mobile-product-category-${slug}`)
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === "Escape" && isMobileMenuOpen.value) {
    closeMobileMenu(true);
  }
};

const handleDesktopBreakpoint = (
  event: MediaQueryListEvent | MediaQueryList,
) => {
  if (event.matches && isMobileMenuOpen.value) {
    closeMobileMenu();
  }
};

watch(isMobileMenuOpen, async (isOpen) => {
  if (isOpen) {
    previousDocumentOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setPageInteractionDisabled(true);
    await nextTick();
    mobileMenuPanel.value
      ?.querySelector<HTMLElement>("[data-mobile-menu-focus]")
      ?.focus();
    return;
  }

  document.documentElement.style.overflow = previousDocumentOverflow;
  setPageInteractionDisabled(false);
});

watch(
  () => route.fullPath,
  () => {
    closeMobileMenu();
    isMobileProductsOpen.value = route.path === "/produkty";
    isMobileServicesOpen.value = route.path === "/uslugi";
  },
);

onMounted(() => {
  updateScrollState();
  desktopBreakpoint = window.matchMedia("(min-width: 80rem)");
  desktopBreakpoint.addEventListener("change", handleDesktopBreakpoint);
  window.addEventListener("scroll", updateScrollState, { passive: true });
  window.addEventListener("keydown", handleKeydown);
});

onBeforeUnmount(() => {
  desktopBreakpoint?.removeEventListener("change", handleDesktopBreakpoint);
  window.removeEventListener("scroll", updateScrollState);
  window.removeEventListener("keydown", handleKeydown);
  document.documentElement.style.overflow = previousDocumentOverflow;
  setPageInteractionDisabled(false);
});
</script>

<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-50 text-ink">
    <div
      ref="headerSurface"
      class="pointer-events-auto w-full border-b border-line bg-white/95 backdrop-blur-md transition-colors duration-200"
      :class="isScrolled ? 'bg-white' : undefined"
    >
      <div class="flex h-16 items-stretch xl:hidden">
        <div class="flex min-w-0 flex-1 items-center px-4 sm:px-6">
          <NuxtLink
            class="inline-flex outline-none"
            to="/"
            aria-label="Termospec, strona główna"
            @click="closeMobileMenu"
          >
            <NuxtImg
              src="/termospec-logo.png"
              alt="Termospec"
              width="112"
              class="block h-auto w-28"
            />
          </NuxtLink>
        </div>

        <button
          ref="mobileMenuButton"
          type="button"
          class="relative grid size-16 place-items-center border-s border-line bg-brand text-white transition-colors hover:bg-ink"
          aria-controls="mobile-navigation-panel"
          :aria-expanded="isMobileMenuOpen"
          :aria-label="
            isMobileMenuOpen ? 'Zamknij menu główne' : 'Otwórz menu główne'
          "
          @click="toggleMobileMenu"
        >
          <span class="relative block h-5 w-6" aria-hidden="true">
            <span
              class="absolute start-0 top-1 block h-px w-6 bg-current transition duration-300"
              :class="
                isMobileMenuOpen
                  ? 'translate-y-[0.35rem] rotate-45'
                  : undefined
              "
            />
            <span
              class="absolute start-0 top-1/2 block h-px w-6 -translate-y-1/2 bg-current transition duration-200"
              :class="isMobileMenuOpen ? 'opacity-0' : undefined"
            />
            <span
              class="absolute bottom-1 start-0 block h-px w-6 bg-current transition duration-300"
              :class="
                isMobileMenuOpen
                  ? '-translate-y-[0.35rem] -rotate-45'
                  : undefined
              "
            />
          </span>
        </button>
      </div>

      <div
        class="hidden h-16 w-full grid-cols-[auto_minmax(0,1fr)_auto_auto_auto] items-center text-[0.88rem] xl:grid"
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
              link: 'h-full rounded-none px-0 py-0 text-[0.88rem] font-bold lowercase tracking-tight text-ink/40 before:hidden hover:text-ink data-[state=open]:text-ink focus-visible:outline-none focus-visible:before:outline-none',
              linkLabel: 'truncate',
              linkTrailing: 'ms-1 text-current',
              linkTrailingIcon: 'size-4 shrink-0 transition-transform duration-200',
              content:
                'absolute left-0 top-0 max-h-[70vh] overflow-y-auto',
              viewportWrapper:
                'absolute -left-[7.75rem] top-full z-40 flex max-w-[calc(100vw-13.25rem)] justify-start',
              viewport:
                'relative h-(--reka-navigation-menu-viewport-height) w-(--reka-navigation-menu-viewport-width) max-w-[calc(100vw-13.25rem)] overflow-hidden rounded-none bg-transparent shadow-none ring-0 transition-[width,height] duration-200',
            }"
          >
            <template #products-trailing>
              <span class="grid size-4 place-items-center text-current" aria-hidden="true">
                <span class="size-1.5 rotate-45 border-e border-b border-current" />
              </span>
            </template>

            <template #services-trailing>
              <span class="grid size-4 place-items-center text-current" aria-hidden="true">
                <span class="size-1.5 rotate-45 border-e border-b border-current" />
              </span>
            </template>

            <template #products-content="{ close }">
              <ProductMegaMenu
                :categories="props.productCategories"
                :close="close"
              />
            </template>

            <template #services-content="{ close }">
              <ServiceMegaMenu
                :services="props.services"
                :close="close"
              />
            </template>
          </UNavigationMenu>

          <NuxtLink
            to="/#kontakt"
            class="relative flex h-full items-center font-bold lowercase tracking-tight opacity-40 transition-opacity hover:opacity-100"
          >
            kontakt
          </NuxtLink>

          <UContentSearchButton
            label="szukaj"
            color="neutral"
            variant="ghost"
            class="h-full rounded-none px-0 font-bold lowercase tracking-tight text-ink/40 hover:bg-transparent hover:text-ink"
            :ui="{ leadingIcon: 'size-4', label: '!inline font-bold' }"
          />
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

        <div class="flex h-full items-center justify-center gap-2 border-s border-ink/10 px-6 font-mono text-xs">
          <button class="font-bold text-ink">PL</button>
          <span class="text-ink/20">/</span>
          <button class="text-ink/40 hover:text-ink">EN</button>
        </div>

        <div class="flex h-full items-center border-s border-ink/10 bg-brand ps-7 pe-10 transition-colors">
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

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <div
        v-if="isMobileMenuOpen"
        id="mobile-navigation-panel"
        ref="mobileMenuPanel"
        class="pointer-events-auto fixed inset-x-0 bottom-0 top-16 overflow-y-auto overscroll-contain bg-ink text-white xl:hidden"
      >
        <div class="mx-auto grid min-h-full w-full max-w-[96rem] md:grid-cols-[minmax(0,1fr)_18rem]">
          <nav class="px-6 py-8 sm:px-8 md:px-10 md:py-10" aria-label="Nawigacja mobilna">
            <div class="mb-6 flex items-center justify-between font-mono text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white/45">
              <span>Menu główne</span>
              <span>Termospec / PL</span>
            </div>

            <div class="border-t border-white/15">
              <NuxtLink
                data-mobile-menu-focus
                to="/o-firmie"
                class="group grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center border-b border-white/15 py-3 outline-none"
                @click="closeMobileMenu"
              >
                <span class="font-mono text-[0.65rem] text-white/35">01</span>
                <span class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70">
                  O firmie
                </span>
                <span class="text-lg text-brand" aria-hidden="true">↗</span>
              </NuxtLink>

              <div class="border-b border-white/15">
                <button
                  type="button"
                  class="group grid min-h-20 w-full grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center py-3 text-left outline-none"
                  :aria-expanded="isMobileProductsOpen"
                  aria-controls="mobile-products-list"
                  @click="isMobileProductsOpen = !isMobileProductsOpen"
                >
                  <span class="font-mono text-[0.65rem] text-white/35">02</span>
                  <span class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70">
                    Produkty
                  </span>
                  <span class="grid size-8 place-items-center border border-white/25 text-lg text-white" aria-hidden="true">
                    <span class="transition-transform duration-300" :class="{ 'rotate-45': isMobileProductsOpen }">+</span>
                  </span>
                </button>

                <div
                  id="mobile-products-list"
                  class="grid transition-[grid-template-rows] duration-300 ease-out"
                  :class="isMobileProductsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                  :aria-hidden="!isMobileProductsOpen"
                  :inert="!isMobileProductsOpen"
                >
                  <div class="overflow-hidden">
                    <div class="mb-5 ms-[2.75rem] border-s border-white/15 ps-4">
                      <NuxtLink
                        to="/produkty"
                        class="flex min-h-12 items-center justify-between border-b border-white/15 text-sm font-black text-white"
                        @click="closeMobileMenu"
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
                          <span class="font-mono text-[0.58rem] font-bold text-brand">{{ category.number }}</span>
                          <div>
                            <h3 class="text-xs font-black uppercase leading-5 text-white">{{ category.label }}</h3>
                            <p v-if="category.note" class="mt-1 font-mono text-[0.56rem] italic text-white/38">{{ category.note }}</p>

                            <ul v-if="category.entries.length" class="mt-2 grid gap-1">
                              <li v-for="entry in category.entries" :key="entry.label" class="text-[0.7rem] font-bold leading-5 text-white/58">
                                <button
                                  v-if="entry.targetSlug"
                                  type="button"
                                  class="text-left underline decoration-brand/60 underline-offset-4"
                                  @click="entry.targetSlug && scrollToMobileProductCategory(entry.targetSlug)"
                                >
                                  {{ entry.label }}
                                </button>
                                <span v-else>{{ entry.label }}</span>
                              </li>
                            </ul>

                            <div v-if="category.groups.length" class="mt-3 grid gap-3">
                              <section v-for="group in category.groups" :key="group.slug" class="border-s border-white/15 ps-3">
                                <h4 class="text-[0.64rem] font-black uppercase leading-4 text-white/72">{{ group.label }}</h4>
                                <p v-if="group.note" class="mt-1 font-mono text-[0.54rem] italic text-white/35">{{ group.note }}</p>
                                <p v-if="group.entries.length" class="mt-1 font-mono text-[0.58rem] font-bold leading-5 text-white/42">
                                  {{ group.entries.map((entry) => entry.label).join(" · ") }}
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
                  :aria-expanded="isMobileServicesOpen"
                  aria-controls="mobile-services-list"
                  @click="isMobileServicesOpen = !isMobileServicesOpen"
                >
                  <span class="font-mono text-[0.65rem] text-white/35">03</span>
                  <span class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70">
                    Usługi
                  </span>
                  <span class="grid size-8 place-items-center border border-white/25 text-lg text-white" aria-hidden="true">
                    <span class="transition-transform duration-300" :class="{ 'rotate-45': isMobileServicesOpen }">+</span>
                  </span>
                </button>

                <div
                  id="mobile-services-list"
                  class="grid transition-[grid-template-rows] duration-300 ease-out"
                  :class="isMobileServicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'"
                  :aria-hidden="!isMobileServicesOpen"
                  :inert="!isMobileServicesOpen"
                >
                  <div class="overflow-hidden">
                    <div class="mb-5 ms-[2.75rem] border-s border-white/15 ps-4">
                      <NuxtLink
                        to="/uslugi"
                        class="flex min-h-12 items-center justify-between border-b border-white/15 text-sm font-black text-white"
                        @click="closeMobileMenu"
                      >
                        <span>Wszystkie usługi</span>
                        <span class="text-brand" aria-hidden="true">→</span>
                      </NuxtLink>

                      <NuxtLink
                        v-for="service in props.services"
                        :key="service.slug"
                        :to="service.href"
                        class="grid grid-cols-[2rem_minmax(0,1fr)] gap-2 border-b border-white/10 py-3 last:border-b-0"
                        @click="closeMobileMenu"
                      >
                        <span class="font-mono text-[0.58rem] font-bold text-brand">{{ service.number }}</span>
                        <span class="text-xs font-black uppercase leading-5 text-white/76">{{ service.label }}</span>
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>

              <NuxtLink
                to="/#kontakt"
                class="group grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)_auto] items-center border-b border-white/15 py-3 outline-none"
                @click="closeMobileMenu"
              >
                <span class="font-mono text-[0.65rem] text-white/35">04</span>
                <span class="font-heading text-[clamp(1.8rem,7vw,3rem)] font-black leading-none tracking-[-0.04em] text-white transition group-hover:text-white/70">
                  Kontakt
                </span>
                <span class="text-lg text-brand" aria-hidden="true">↘</span>
              </NuxtLink>

              <div class="grid min-h-20 grid-cols-[2.75rem_minmax(0,1fr)] items-center border-b border-white/15 py-3">
                <span class="font-mono text-[0.65rem] text-white/35">05</span>
                <UContentSearchButton
                  label="Szukaj"
                  color="neutral"
                  variant="ghost"
                  class="h-full w-full justify-between rounded-none p-0 font-heading text-[clamp(1.8rem,7vw,3rem)] font-black tracking-[-0.04em] text-white hover:bg-transparent hover:text-white/70"
                  :ui="{ leadingIcon: 'order-last size-6 text-brand', label: '!inline font-black' }"
                  @click="closeMobileMenu"
                />
              </div>
            </div>
          </nav>

          <aside
            class="flex flex-col border-t border-white/15 bg-white/[0.035] px-6 py-7 sm:px-8 md:border-s md:border-t-0 md:px-7 md:py-10"
            aria-label="Dodatkowe opcje nawigacji"
          >
            <div>
              <p class="font-mono text-[0.62rem] font-bold uppercase tracking-[0.2em] text-white/35">
                Dodatkowe informacje
              </p>

              <NuxtLink
                to="/dofinansowania"
                class="mt-5 flex min-h-12 items-center justify-between border-y border-white/15 text-sm font-bold text-white"
                @click="closeMobileMenu"
              >
                <span>Dofinansowania</span>
                <span class="text-brand" aria-hidden="true">↗</span>
              </NuxtLink>

              <div class="mt-6 flex items-center gap-3 font-mono text-xs">
                <button type="button" class="grid size-11 place-items-center border border-white/35 bg-white text-ink" aria-pressed="true">PL</button>
                <button type="button" class="grid size-11 place-items-center border border-white/15 text-white/40" aria-pressed="false">EN</button>
              </div>
            </div>

            <NuxtLink
              to="/#kontakt"
              class="mt-8 flex min-h-14 items-center justify-between bg-brand px-5 font-mono text-xs font-bold uppercase tracking-wider text-white md:mt-auto"
              @click="closeMobileMenu"
            >
              <span>Zapytaj o ofertę</span>
              <span aria-hidden="true">→</span>
            </NuxtLink>
          </aside>
        </div>
      </div>
    </Transition>
  </header>
</template>
