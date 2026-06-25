import type { ProductMedia } from "./products";

export interface HeaderProductMenuItem {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  powerRange: string;
  heroImage: string;
  imageAlt: string;
  headerSketch: ProductMedia | null;
}
