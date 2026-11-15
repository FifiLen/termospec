<script setup lang="ts">
import type {
  ProductNavigationCategory,
  ServiceNavigationItem,
} from "~~/types/navigation";
import type { CompanyData } from "~~/schemas/company";

const props = withDefaults(
  defineProps<{
    productCategories?: ProductNavigationCategory[];
    services?: ServiceNavigationItem[];
    serviceHotline?: CompanyData["serviceHotline"];
  }>(),
  {
    productCategories: () => [],
    services: () => [],
  },
);

const emit = defineEmits<{
  navigate: [];
  openAccessibility: [];
}>();

const route = useRoute();
const panel = ref<HTMLElement | null>(null);
const isProductsOpen = ref(route.path === "/produkty");
const isServicesOpen = ref(route.path === "/uslugi");

defineExpose({
  focusFirstItem: () => {
    panel.value?.querySelector<HTMLElement>("[data-mobile-menu-focus]")?.focus();
  },
});
</script>

<template>
  <div id="mobile-navigation-panel" ref="panel" class="pointer-events-auto fixed inset-0 overflow-y-auto overscroll-contain bg-ink text-white xl:hidden">
    <div class="mx-auto flex min-h-full w-full max-w-xl flex-col px-5 py-5 sm:px-7">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="inline-flex min-h-11 items-center" aria-label="Termospec, strona główna" @click="emit('navigate')">
          <img src="/images/brand/termospec-logo-white.svg" alt="Termospec" width="229" height="33" class="h-auto w-32 sm:w-36">
        </NuxtLink>

        <button type="button" class="grid size-11 place-items-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/[0.16]" aria-label="Zamknij menu" @click="emit('navigate')">
          ×
        </button>
      </div>

      <nav class="mt-10" aria-label="Nawigacja mobilna">
        <NuxtLink
          data-mobile-menu-focus
          to="/o-firmie"
          class="flex min-h-16 items-center justify-between rounded-[1.25rem] px-5 text-[1.7rem] font-medium tracking-[-0.035em] transition-colors"
          :class="route.path === '/o-firmie' ? 'bg-white/10 text-white' : 'text-white/[0.86] hover:bg-white/[0.06]'"
          @click="emit('navigate')"
        >
          <span>o firmie</span><span class="text-base text-brand" aria-hidden="true">→</span>
        </NuxtLink>

        <div>
          <button
            type="button"
            class="flex min-h-16 w-full items-center justify-between rounded-[1.25rem] px-5 text-left text-[1.7rem] font-medium tracking-[-0.035em] text-white/[0.86] transition-colors hover:bg-white/[0.06]"
            :aria-expanded="isProductsOpen"
            aria-controls="mobile-products-list"
            @click="isProductsOpen = !isProductsOpen"
          >
            <span>produkty</span><span class="text-xl text-white/38" aria-hidden="true">{{ isProductsOpen ? '−' : '+' }}</span>
          </button>
          <div id="mobile-products-list" class="grid transition-[grid-template-rows] duration-300" :class="isProductsOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'" :inert="!isProductsOpen">
            <div class="overflow-hidden">
              <div class="mx-5 mb-4 rounded-[1.25rem] bg-white/[0.06] px-5 py-2">
                <NuxtLink to="/produkty" class="flex min-h-11 items-center justify-between border-b border-white/10 text-sm font-semibold text-white" @click="emit('navigate')">
                  Pełny katalog <span class="text-brand" aria-hidden="true">→</span>
                </NuxtLink>
                <NuxtLink
                  v-for="category in props.productCategories"
                  :key="category.slug"
                  :to="`/produkty#${category.groups[0]?.entries[0]?.id || category.entries[0]?.id || ''}`"
                  class="block border-b border-white/[0.08] py-3 text-sm text-white/62 last:border-b-0 hover:text-white"
                  @click="emit('navigate')"
                >
                  {{ category.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div>
          <button
            type="button"
            class="flex min-h-16 w-full items-center justify-between rounded-[1.25rem] px-5 text-left text-[1.7rem] font-medium tracking-[-0.035em] text-white/[0.86] transition-colors hover:bg-white/[0.06]"
            :aria-expanded="isServicesOpen"
            aria-controls="mobile-services-list"
            @click="isServicesOpen = !isServicesOpen"
          >
            <span>usługi</span><span class="text-xl text-white/38" aria-hidden="true">{{ isServicesOpen ? '−' : '+' }}</span>
          </button>
          <div id="mobile-services-list" class="grid transition-[grid-template-rows] duration-300" :class="isServicesOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'" :inert="!isServicesOpen">
            <div class="overflow-hidden">
              <div class="mx-5 mb-4 rounded-[1.25rem] bg-white/[0.06] px-5 py-2">
                <NuxtLink v-for="service in props.services" :key="service.slug" :to="service.href" class="block border-b border-white/[0.08] py-3 text-sm text-white/62 last:border-b-0 hover:text-white" @click="emit('navigate')">
                  {{ service.label }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <NuxtLink to="/#kontakt" class="flex min-h-16 items-center justify-between rounded-[1.25rem] px-5 text-[1.7rem] font-medium tracking-[-0.035em] text-white/[0.86] transition-colors hover:bg-white/[0.06]" @click="emit('navigate')">
          <span>kontakt</span><span class="text-base text-white/38" aria-hidden="true">→</span>
        </NuxtLink>

        <NuxtLink
          to="/koncesja"
          class="flex min-h-16 items-center justify-between rounded-[1.25rem] px-5 text-[1.7rem] font-medium tracking-[-0.035em] transition-colors"
          :class="route.path === '/koncesja' ? 'bg-white/10 text-white' : 'text-white/[0.86] hover:bg-white/[0.06]'"
          @click="emit('navigate')"
        >
          <span>koncesja</span><span class="text-base text-white/38" aria-hidden="true">→</span>
        </NuxtLink>

        <button
          type="button"
          data-accessibility-trigger
          class="flex min-h-16 w-full items-center justify-between rounded-[1.25rem] px-5 text-left text-[1.7rem] font-medium tracking-[-0.035em] text-white/[0.86] transition-colors hover:bg-white/[0.06]"
          aria-controls="accessibility-panel"
          aria-haspopup="dialog"
          aria-expanded="false"
          @click="emit('openAccessibility')"
        >
          <span>Dostosuj widok</span><span class="text-base text-white/38" aria-hidden="true">→</span>
        </button>
      </nav>

      <a
        v-if="props.serviceHotline"
        :href="telephoneHref(props.serviceHotline.phone)"
        class="mt-8 rounded-[1.5rem] bg-white/10 p-5 transition-colors hover:bg-white/[0.14]"
      >
        <span class="block text-xs text-white/65">{{ props.serviceHotline.label }}</span>
        <span class="mt-2 block text-2xl font-medium tracking-[-0.025em] text-white">{{ props.serviceHotline.phone }}</span>
      </a>

      <div class="mt-auto grid grid-cols-[auto_1fr] gap-3 pt-8">
        <div class="flex rounded-full bg-white/10 p-1 text-xs">
          <button type="button" class="grid min-h-11 min-w-11 place-items-center rounded-full bg-white px-3 font-semibold text-ink" aria-pressed="true">PL</button>
          <button type="button" class="grid min-h-11 min-w-11 cursor-not-allowed place-items-center rounded-full px-3 text-white/45" aria-pressed="false" disabled title="Wersja angielska w przygotowaniu">EN</button>
        </div>
        <NuxtLink to="/dofinansowania" class="grid min-h-12 place-items-center overflow-hidden rounded-2xl bg-white px-4 transition-colors hover:bg-chip" aria-label="Dofinansowanie ze środków Unii Europejskiej" @click="emit('navigate')">
          <NuxtImg src="/panel-dofinansowanie.png" alt="Unia Europejska" width="150" class="max-h-10 w-auto object-contain" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
