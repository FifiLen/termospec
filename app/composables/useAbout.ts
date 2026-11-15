import type { AboutData } from "~~/schemas/about";

export type AboutContent = AboutData & { id: string };

// Company page copy, key figures and timeline from the Studio-editable `content/about.yml`.
// While Studio is open, the unpublished draft replaces the published record.
export const useAbout = async () => {
  // Resolve Nuxt composables before the await (see useCompany).
  const config = useRuntimeConfig();
  const studioAbout = useState<AboutContent | null>("studio-about", () => null);
  const { data } = await useFetch<AboutContent>("/api/content/about", {
    key: "about-content",
  });

  return computed(() => {
    return config.public.studioEnabled && studioAbout.value
      ? studioAbout.value
      : (data.value ?? null);
  });
};
