import type { CatalogueProductRecord } from "~/utils/product-catalogue";
import type { StudioHost } from "~~/types/studio";

export default defineNuxtPlugin((nuxtApp) => {
  const studioProducts = useState<CatalogueProductRecord[]>(
    "studio-catalogue-products",
    () => [],
  );
  const isStudioPreview = useState("studio-catalogue-preview", () => false);

  let refreshTimer: number | undefined;
  let refreshPending = false;
  let refreshErrorReported = false;

  const refreshStudioProducts = async () => {
    if (refreshPending) {
      return;
    }

    const host: StudioHost | undefined = window.useStudioHost?.();

    if (!host) {
      isStudioPreview.value = false;
      studioProducts.value = [];
      return;
    }

    refreshPending = true;

    try {
      const products = (await host.document.db.list()).filter((document) => {
        return document.fsPath?.startsWith("products/");
      });
      studioProducts.value = products;
      isStudioPreview.value = true;
      refreshErrorReported = false;
    } catch (error) {
      if (!studioProducts.value.length) {
        isStudioPreview.value = false;
      }

      if (!refreshErrorReported) {
        console.warn(
          "Nie udało się odświeżyć produktów ze Studio. Zachowano ostatnie dostępne dane.",
          error,
        );
        refreshErrorReported = true;
      }
    } finally {
      refreshPending = false;
    }
  };

  const start = () => {
    void refreshStudioProducts();
    refreshTimer = window.setInterval(refreshStudioProducts, 1000);
    window.addEventListener("termospec:product-updated", refreshStudioProducts);
  };

  const stop = () => {
    if (refreshTimer) {
      window.clearInterval(refreshTimer);
    }

    window.removeEventListener("termospec:product-updated", refreshStudioProducts);
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
