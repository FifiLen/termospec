import type { CompanyData } from "~~/schemas/company";

export type CompanyContent = CompanyData & { id: string };

// Company identity and contact details from the Studio-editable `content/company.yml`.
// While Studio is open, the unpublished draft replaces the published record.
export const useCompany = async () => {
  // Resolve every Nuxt composable before the await: the Nuxt instance is not
  // restored after an await inside a composable (only in <script setup>).
  const config = useRuntimeConfig();
  const studioCompany = useState<CompanyContent | null>("studio-company", () => null);
  const { data } = await useFetch<CompanyContent>("/api/content/company", {
    key: "company-content",
  });

  return computed(() => {
    return config.public.studioEnabled && studioCompany.value
      ? studioCompany.value
      : (data.value ?? null);
  });
};
