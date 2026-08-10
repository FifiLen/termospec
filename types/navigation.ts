export interface NavigationMedia {
  src: string;
  alt: string;
}

export interface ProductNavigationEntry {
  label: string;
  targetSlug?: string;
}

export interface ProductNavigationGroup {
  label: string;
  slug: string;
  entries: ProductNavigationEntry[];
  note?: string;
  render?: NavigationMedia | null;
}

export interface ProductNavigationCategory {
  number: string;
  label: string;
  slug: string;
  entries: ProductNavigationEntry[];
  groups: ProductNavigationGroup[];
  note?: string;
  render?: NavigationMedia | null;
}

export interface ServiceNavigationItem {
  number: string;
  label: string;
  slug: string;
  href: string;
}
