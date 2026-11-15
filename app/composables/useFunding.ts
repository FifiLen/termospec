import type { FundingData } from "~~/schemas/funding";

export type FundingContent = FundingData & { id: string };

// Page copy from the Studio-editable `content/dofinansowania.yml`.
// While Studio is open, the unpublished draft replaces the published record.
export const useFunding = async () => {
  // Resolve Nuxt composables before the await (see useCompany).
  const config = useRuntimeConfig();
  const studioDraft = useState<FundingContent | null>("studio-funding", () => null);
  const { data } = await useFetch<FundingContent>("/api/content/funding", {
    key: "funding-content",
  });

  return computed(() => {
    return config.public.studioEnabled && studioDraft.value
      ? studioDraft.value
      : (data.value ?? null);
  });
};
