import type { RealizationData } from "~~/schemas/realization";

export const useRealizations = (
  publishedRealizations: Ref<RealizationData[] | null | undefined>,
) => {
  const config = useRuntimeConfig();
  const studioRealizations = useState<RealizationData[]>(
    "studio-realizations",
    () => [],
  );
  const isStudioPreview = useState("studio-realizations-preview", () => false);

  return computed(() => {
    return config.public.studioEnabled && isStudioPreview.value
      ? studioRealizations.value
      : (publishedRealizations.value ?? []);
  });
};
