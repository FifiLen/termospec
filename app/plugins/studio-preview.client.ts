import type { CatalogueProductRecord } from "~/utils/product-catalogue";
import { companySchema } from "~~/schemas/company";
import { realizationSchema, type RealizationContent } from "~~/schemas/realization";
import type { CompanyContent } from "~/composables/useCompany";
import type { StudioHost } from "~~/types/studio";

export default defineNuxtPlugin((nuxtApp) => {
  const studioProducts = useState<CatalogueProductRecord[]>(
    "studio-catalogue-products",
    () => [],
  );
  const isStudioPreview = useState("studio-catalogue-preview", () => false);
  const studioRealizations = useState<RealizationContent[]>(
    "studio-realizations",
    () => [],
  );
  const isRealizationPreview = useState("studio-realizations-preview", () => false);
  const studioCompany = useState<CompanyContent | null>("studio-company", () => null);

  let refreshTimer: number | undefined;
  let refreshPending = false;
  let refreshErrorReported = false;

  const refreshStudioDocuments = async () => {
    if (refreshPending) {
      return;
    }

    const host: StudioHost | undefined = window.useStudioHost?.();

    if (!host) {
      isStudioPreview.value = false;
      studioProducts.value = [];
      isRealizationPreview.value = false;
      studioRealizations.value = [];
      studioCompany.value = null;
      return;
    }

    refreshPending = true;

    try {
      const documents = await host.document.db.list();
      const products = documents.filter((document) => {
        return document.fsPath?.startsWith("products/");
      });
      studioProducts.value = products;
      isStudioPreview.value = true;
      studioRealizations.value = documents
        .flatMap((document) => {
          if (!document.fsPath?.startsWith("realizations/")) {
            return [];
          }

          const result = realizationSchema.safeParse(document);

          return result.success
            ? [{ ...result.data, id: typeof document.id === "string" ? document.id : undefined }]
            : [];
        })
        .sort((left, right) => left.order - right.order);
      isRealizationPreview.value = true;

      const companyDocument = documents.find((document) => document.fsPath === "company.yml");
      const company = companySchema.safeParse(companyDocument);
      // An invalid draft keeps the last valid preview instead of blanking contact details.
      if (company.success && typeof companyDocument?.id === "string") {
        studioCompany.value = { ...company.data, id: companyDocument.id };
      }

      refreshErrorReported = false;
    } catch (error) {
      if (!studioProducts.value.length) {
        isStudioPreview.value = false;
      }

      if (!studioRealizations.value.length) {
        isRealizationPreview.value = false;
      }

      if (!refreshErrorReported) {
        console.warn(
          "Nie udało się odświeżyć treści ze Studio. Zachowano ostatnie dostępne dane.",
          error,
        );
        refreshErrorReported = true;
      }
    } finally {
      refreshPending = false;
    }
  };

  const start = () => {
    void refreshStudioDocuments();
    refreshTimer = window.setInterval(refreshStudioDocuments, 1000);
    window.addEventListener("termospec:product-updated", refreshStudioDocuments);
    window.addEventListener("termospec:realization-updated", refreshStudioDocuments);
  };

  const stop = () => {
    if (refreshTimer) {
      window.clearInterval(refreshTimer);
    }

    window.removeEventListener("termospec:product-updated", refreshStudioDocuments);
    window.removeEventListener("termospec:realization-updated", refreshStudioDocuments);
    window.removeEventListener("beforeunload", stop);
  };

  nuxtApp.hook("app:mounted", () => {
    start();
    window.addEventListener("beforeunload", stop);
  });

  if (import.meta.hot) {
    import.meta.hot.dispose(stop);
  }
});
