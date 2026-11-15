import type { ServiceContent } from "~~/schemas/service";

// Services from the Studio-editable `content/services/*.yml`, in /uslugi layout order.
// While Studio is open, unpublished drafts replace the published records.
export const useServices = async () => {
  // Resolve Nuxt composables before the await (see useCompany).
  const config = useRuntimeConfig();
  const studioServices = useState<ServiceContent[] | null>("studio-services", () => null);
  const { data } = await useFetch<ServiceContent[]>("/api/content/services", {
    key: "services-content",
  });

  return computed(() => {
    return config.public.studioEnabled && studioServices.value
      ? studioServices.value
      : (data.value ?? []);
  });
};
