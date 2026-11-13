import type { CatalogueProductRecord } from "~/utils/product-catalogue";
import { realizationSchema, type RealizationData } from "~~/schemas/realization";
import type { StudioHost } from "~~/types/studio";

export default defineNuxtPlugin((nuxtApp) => {
  const studioProducts = useState<CatalogueProductRecord[]>(
    "studio-catalogue-products",
    () => [],
  );
  const isStudioPreview = useState("studio-catalogue-preview", () => false);
  const studioRealizations = useState<RealizationData[]>(
    "studio-realizations",
    () => [],
  );
  const isRealizationPreview = useState("studio-realizations-preview", () => false);

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

          return result.success ? [result.data] : [];
        })
        .sort((left, right) => left.order - right.order);
      isRealizationPreview.value = true;
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
