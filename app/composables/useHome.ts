import type { HomeData } from "~~/schemas/home";

export type HomeContent = HomeData & { id: string };

// Homepage hero, scope cards and contact form topics from the Studio-editable
// `content/home.yml`. While Studio is open, the unpublished draft replaces it.
export const useHome = async () => {
  // Resolve Nuxt composables before the await (see useCompany).
  const config = useRuntimeConfig();
  const studioHome = useState<HomeContent | null>("studio-home", () => null);
  const { data } = await useFetch<HomeContent>("/api/content/home", {
    key: "home-page",
  });

  return computed(() => {
    return config.public.studioEnabled && studioHome.value
      ? studioHome.value
      : (data.value ?? null);
  });
};
