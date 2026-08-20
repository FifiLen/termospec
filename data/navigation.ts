import type { ServiceNavigationItem } from "~~/types/navigation";
import { services } from "~~/data/services";

export const serviceNavigation: ServiceNavigationItem[] = services.map(
  ({ label, slug }) => ({
    label,
    slug,
    href: `/uslugi#${slug}`,
  }),
);
