import type { ServiceNavigationItem } from "~~/types/navigation";

export const toServiceNavigation = (
  services: Array<{ label: string; slug: string }>,
): ServiceNavigationItem[] => services.map(({ label, slug }) => ({
  label,
  slug,
  href: `/uslugi#${slug}`,
}));
