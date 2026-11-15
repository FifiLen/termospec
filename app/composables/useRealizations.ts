import type { RealizationContent } from "~~/schemas/realization";

export const useRealizations = (
  publishedRealizations: Ref<RealizationContent[] | null | undefined>,
) => {
  const config = useRuntimeConfig();
  const studioRealizations = useState<RealizationContent[]>(
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
