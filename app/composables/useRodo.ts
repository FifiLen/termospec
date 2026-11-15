import type { RodoData } from "~~/schemas/rodo";

export type RodoContent = RodoData & { id: string };

// Page copy from the Studio-editable `content/rodo.yml`.
// While Studio is open, the unpublished draft replaces the published record.
export const useRodo = async () => {
  // Resolve Nuxt composables before the await (see useCompany).
  const config = useRuntimeConfig();
  const studioDraft = useState<RodoContent | null>("studio-rodo", () => null);
  const { data } = await useFetch<RodoContent>("/api/content/rodo", {
    key: "rodo-content",
  });

  return computed(() => {
    return config.public.studioEnabled && studioDraft.value
      ? studioDraft.value
      : (data.value ?? null);
  });
};
