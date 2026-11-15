// Nuxt Studio opens a document's editor when an element carrying its content id
// (`data-content-id`) is double-clicked. Render the attribute only in Studio builds
// so the public HTML stays free of editing markers.
export const useStudioEditable = () => {
  const config = useRuntimeConfig();

  return (contentId?: string | null) => {
    return config.public.studioEnabled && contentId
      ? { "data-content-id": contentId }
      : {};
  };
};
