import { company } from "~~/data/company";

interface PageSeoOptions {
  title: string;
  description?: string;
  // Skip the global `%s | Termospec` template when the title already names the brand.
  standaloneTitle?: boolean;
}

export function usePageSeo({ title, description, standaloneTitle = false }: PageSeoOptions) {
  if (standaloneTitle) {
    useHead({ titleTemplate: "%s" });
  }

  useSeoMeta({
    title,
    description,
    ogTitle: standaloneTitle ? title : `${title} | ${company.name}`,
    ogDescription: description,
  });
}
