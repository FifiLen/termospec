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
      isStudioPreview.value = true;
      studioProducts.value = (await host.document.db.list()).filter((document) => {
        return document.fsPath?.startsWith("products/");
      });
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
