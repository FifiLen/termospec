<script setup lang="ts">
type ProductItem = {
  title: string
  slug: string
  lead: string
  shortDescription: string
  category: string
  powerRange?: string
  applications?: string[]
  features?: string[]
  heroImage?: string
  imageAlt?: string
  isFeatured?: boolean
}

defineProps<{
  products: ProductItem[]
}>()
</script>

<template>
  <section class="section">
    <div class="section-heading">
      <p class="eyebrow">Produkty</p>
      <h2>Urządzenia chłodnicze</h2>
      <NuxtLink class="text-link" to="/produkty">Pełny katalog</NuxtLink>
    </div>
    <div v-if="products.length" class="product-family-grid">
      <ProductCard
        v-for="product in products"
        :key="product.slug"
        v-bind="product"
      />
    </div>
    <div v-else class="empty-state">
      Brak wyróżnionych produktów. Dodaj produkt w kolekcji <code>content/products</code>.
    </div>
  </section>
</template>
