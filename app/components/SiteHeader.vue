<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ServiceNavigationItem,
} from "~~/types/navigation";

withDefaults(
  defineProps<{
    productCategories?: ProductNavigationCategory[];
    services?: ServiceNavigationItem[];
  }>(),
  {
    productCategories: () => [],
    services: () => [],
  },
);

interface MobileBarHandle {
  focusMenuButton: () => void;
}

interface MobileMenuHandle {
  focusFirstItem: () => void;
}

const route = useRoute();
const mobileBar = ref<MobileBarHandle | null>(null);
const mobileMenu = ref<MobileMenuHandle | null>(null);
const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

let previousDocumentOverflow = "";
let desktopBreakpoint: MediaQueryList | null = null;

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
    nextTick(() => mobileBar.value?.focusMenuButton());
  }
};

const toggleMobileMenu = () => {
  if (isMobileMenuOpen.value) {
    closeMobileMenu(true);
    return;
  }

  isMobileMenuOpen.value = true;
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

watch(isMobileMenuOpen, (isOpen) => {
  if (isOpen) {
    previousDocumentOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    setPageInteractionDisabled(true);
    return;
  }

  document.documentElement.style.overflow = previousDocumentOverflow;
  setPageInteractionDisabled(false);
});

watch(
  mobileMenu,
  (menu) => {
    if (isMobileMenuOpen.value) {
      menu?.focusFirstItem();
    }
  },
  { flush: "post" },
);

watch(
  () => route.fullPath,
  () => closeMobileMenu(),
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
      class="pointer-events-auto w-full border-b border-line bg-white/95 backdrop-blur-md transition-colors duration-200"
      :class="isScrolled ? 'bg-white' : undefined"
    >
      <SiteHeaderMobileBar
        ref="mobileBar"
        :is-open="isMobileMenuOpen"
        @navigate="closeMobileMenu()"
        @toggle="toggleMobileMenu"
      />
      <SiteHeaderDesktop
        :product-categories="productCategories"
        :services="services"
      />
    </div>

    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-x-full opacity-0"
      enter-to-class="translate-x-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-x-0 opacity-100"
      leave-to-class="translate-x-full opacity-0"
    >
      <LazySiteHeaderMobileMenu
        v-if="isMobileMenuOpen"
        ref="mobileMenu"
        :product-categories="productCategories"
        :services="services"
        @navigate="closeMobileMenu()"
      />
    </Transition>
  </header>
</template>
