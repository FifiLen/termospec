import { company } from "~~/data/company";
import { standaloneSeoTitlePages } from "~~/data/seo";
import type { SeoData, SeoPageKey } from "~~/schemas/seo";

export type SeoContent = SeoData & { id: string };

// Page title and description from the Studio-editable `content/seo.yml`.
// While Studio is open, the unpublished draft replaces the published record.
export async function usePageSeo(page: SeoPageKey) {
  // Register every Nuxt composable before the await; the meta getters read the
  // fetched record once it resolves.
  const config = useRuntimeConfig();
  const studioSeo = useState<SeoContent | null>("studio-seo", () => null);
  const request = useFetch<SeoContent>("/api/content/seo", { key: "seo-content" });

  const entry = computed(() => {
    const seo = config.public.studioEnabled && studioSeo.value ? studioSeo.value : request.data.value;
    return seo?.[page];
  });
  const standaloneTitle = (standaloneSeoTitlePages as readonly SeoPageKey[]).includes(page);
  const description = () => entry.value?.opis || undefined;

  if (standaloneTitle) {
    useHead({ titleTemplate: "%s" });
  }

  useSeoMeta({
    title: () => entry.value?.tytul,
    description,
    ogTitle: () => {
      const title = entry.value?.tytul;
      return title && !standaloneTitle ? `${title} | ${company.name}` : title;
    },
    ogDescription: description,
  });

  await request;
}
