<script setup lang="ts">
import {
  productJsonSchema,
  productSchema,
  productTemplateJson,
  type ProductData,
} from "~~/schemas/product";
import {
  productTranslationRecordSchema,
  type ProductTranslationRecord,
} from "~~/schemas/product-translation";
import { toProductFamily } from "~/utils/product-catalogue";
import type { ProductTranslationValidationSuccess } from "~/utils/product-translation";
import {
  createProductTranslationPackage,
  createProductTranslationPrompt,
  mergeProductTranslation,
  validateProductTranslationPackage,
} from "~/utils/product-translation";
import type { ProductNavigationCategory } from "~~/types/navigation";
import type { ProductFamily } from "~~/types/products";

const props = defineProps<{
  catalogue: ProductNavigationCategory[];
}>();

const nuxtApp = useNuxtApp();

const isStudioAvailable = ref(false);
const isStudioActive = ref(false);
const isOpen = ref(false);
const mode = ref<"product" | "translation">("product");
const rawJson = ref("");
const translationRawJson = ref("");
const fileName = ref("");
const selectedCategorySlug = ref("");
const selectedGroupSlug = ref("");
const selectedEntryId = ref("");
const selectedKind = ref<"model" | "series" | "description">("model");
const errors = ref<string[]>([]);
const successMessage = ref("");
const isSaving = ref(false);
const isLoadingTranslationSources = ref(false);
const isTranslationPreviewOpen = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const translationFileInput = ref<HTMLInputElement | null>(null);
const selectedTranslationSourcePath = ref("");
const translationSources = ref<Array<{
  fsPath: string;
  product: ProductData;
}>>([]);
const savedTranslation = ref<ProductTranslationRecord | null>(null);
const savedTranslationPreview = ref<ProductFamily | null>(null);
const savedTranslationError = ref("");
const isEditingAvailable = computed(() => {
  return mode.value === "product"
    ? rawJson.value.trim().length > 0
    : translationRawJson.value.trim().length > 0 && Boolean(selectedTranslationSource.value);
});
const selectedCategory = computed(() => {
  return props.catalogue.find((category) => category.slug === selectedCategorySlug.value);
});
const availableGroups = computed(() => selectedCategory.value?.groups ?? []);
const availableEntries = computed(() => {
  const group = availableGroups.value.find((item) => {
    return item.slug === selectedGroupSlug.value;
  });

  return (group?.entries ?? selectedCategory.value?.entries ?? []).filter((entry) => {
    return entry.kind !== "description";
  });
});
const selectedTranslationSource = computed(() => {
  return translationSources.value.find((source) => {
    return source.fsPath === selectedTranslationSourcePath.value;
  });
});
const selectedTranslationPackage = computed(() => {
  if (!selectedTranslationSource.value) {
    return null;
  }

  return createProductTranslationPackage(selectedTranslationSource.value.product);
});
let studioObserver: MutationObserver | undefined;

const schemaJson = `${JSON.stringify(productJsonSchema, null, 2)}\n`;
const templateKeys = new Set(Object.keys(JSON.parse(productTemplateJson)));

const aiPrompt = `Na podstawie przekazanych materiałów uzupełnij poniższy szablon produktu Termospec.

Zasady:
- nie zmieniaj nazw pól ani struktury JSON,
- nie dodawaj własnych pól,
- nie wymyślaj danych technicznych,
- odróżnij dane pojedynczego modelu od zakresu całego typoszeregu,
- w "specs" umieść tylko kilka najważniejszych parametrów, a pełną tabelę w "technicalData",
- w "technicalData" rozdziel wartość i jednostkę, np. "150" oraz "kW",
- informacje o warunkach pomiaru i zastrzeżenia wpisz w "technicalNotes",
- kompatybilne urządzenia wpisz w "relatedProducts",
- brakujące teksty pozostaw jako pusty ciąg, a listy jako puste tablice,
- status pozostaw jako "draft",
- ścieżki do niedostarczonych obrazów i dokumentów pozostaw puste,
- zwróć wyłącznie poprawny JSON, bez komentarzy i bez bloku Markdown.

SZABLON:
${productTemplateJson}`;

const normalizeAiJson = (value: string) => {
  return value
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "")
    .trim();
};

const clearFeedback = () => {
  errors.value = [];
  successMessage.value = "";
};

const slugify = (value: string) => {
  return value
    .toLocaleLowerCase("pl-PL")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

const formatIssuePath = (path: PropertyKey[]) => {
  if (!path.length) {
    return "Produkt";
  }

  return path
    .map((part) => typeof part === "number" ? `[${part + 1}]` : String(part))
    .join(".")
    .replace(".[", "[");
};

const parseProduct = (): ProductData | null => {
  errors.value = [];
  successMessage.value = "";

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(normalizeAiJson(rawJson.value));
  } catch (error) {
    errors.value = [
      error instanceof SyntaxError
        ? `Niepoprawny JSON: ${error.message}`
        : "Nie udało się odczytać JSON.",
    ];
    return null;
  }

  if (!parsedJson || typeof parsedJson !== "object" || Array.isArray(parsedJson)) {
    errors.value = ["JSON musi zawierać jeden produkt jako obiekt, nie tablicę."];
    return null;
  }

  const unknownFields = Object.keys(parsedJson).filter((key) => !templateKeys.has(key));

  if (unknownFields.length) {
    errors.value = [
      `Usuń pola spoza schematu: ${unknownFields.join(", ")}.`,
    ];
    return null;
  }

  const result = productSchema.safeParse(parsedJson);

  if (!result.success) {
    errors.value = result.error.issues.map((issue) => {
      return `${formatIssuePath(issue.path)}: ${issue.message}`;
    });
    return null;
  }

  const product = {
    ...result.data,
    cataloguePlacement: {
      entryId: selectedEntryId.value || result.data.cataloguePlacement.entryId,
      categorySlug: (selectedCategorySlug.value || result.data.cataloguePlacement.categorySlug) as ProductData["cataloguePlacement"]["categorySlug"],
      groupSlug: (selectedGroupSlug.value || result.data.cataloguePlacement.groupSlug) as ProductData["cataloguePlacement"]["groupSlug"],
      kind: selectedKind.value,
    },
    status: "draft" as const,
  };

  if (!product.cataloguePlacement.categorySlug) {
    errors.value = ["Wybierz miejsce produktu w katalogu."];
    return null;
  }

  if (!fileName.value) {
    fileName.value = slugify(product.title);
  }

  return product;
};

const validateProduct = () => {
  const product = parseProduct();

  if (product) {
    successMessage.value = "JSON jest poprawny i gotowy do utworzenia wersji roboczej.";
  }
};

const downloadText = (name: string, content: string) => {
  const blob = new Blob([content], { type: "application/json;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = name;
  anchor.click();
  URL.revokeObjectURL(url);
};

const copyPrompt = async () => {
  await navigator.clipboard.writeText(aiPrompt);
  successMessage.value = "Instrukcja dla AI została skopiowana.";
  errors.value = [];
};

const insertTemplate = () => {
  rawJson.value = productTemplateJson;
  fileName.value = "";
  errors.value = [];
  successMessage.value = "";
};

watch(selectedCategorySlug, () => {
  if (!availableGroups.value.some((group) => group.slug === selectedGroupSlug.value)) {
    selectedGroupSlug.value = "";
  }

  selectedEntryId.value = "";
});

watch(selectedGroupSlug, () => {
  selectedEntryId.value = "";
});

watch(selectedEntryId, (entryId) => {
  const entry = availableEntries.value.find((item) => item.id === entryId);

  if (entry?.kind) {
    selectedKind.value = entry.kind;
  }
});

const readFile = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  rawJson.value = await file.text();
  fileName.value = slugify(file.name.replace(/\.json$/i, ""));
  errors.value = [];
  successMessage.value = "";
  input.value = "";
};

const readTranslationFile = async (event: Event) => {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) {
    return;
  }

  translationRawJson.value = await file.text();
  clearFeedback();
  input.value = "";
};

const loadSavedTranslation = async () => {
  const host = window.useStudioHost?.();
  const source = selectedTranslationSource.value;

  savedTranslation.value = null;
  savedTranslationPreview.value = null;
  savedTranslationError.value = "";
  isTranslationPreviewOpen.value = false;

  if (!host || !source) {
    return;
  }

  try {
    const entryId = source.product.cataloguePlacement.entryId;
    const document = await host.document.db.get(
      `product-translations/en/${entryId}.json`,
    );

    if (!document) {
      return;
    }

    const record = productTranslationRecordSchema.parse(document);
    const mergedProduct = mergeProductTranslation(source.product, record);

    savedTranslation.value = record;
    savedTranslationPreview.value = toProductFamily(mergedProduct, record.content.title);
    isTranslationPreviewOpen.value = true;
  } catch (error) {
    savedTranslationError.value = error instanceof Error
      ? `Zapisana wersja EN wymaga uwagi: ${error.message}`
      : "Nie udało się przygotować podglądu zapisanej wersji EN.";
  }
};

const loadTranslationSources = async () => {
  const host = window.useStudioHost?.();

  if (!host || isLoadingTranslationSources.value) {
    return;
  }

  isLoadingTranslationSources.value = true;

  try {
    const sources = (await host.document.db.list())
      .flatMap((document) => {
        if (!document.fsPath?.startsWith("products/")) {
          return [];
        }

        const result = productSchema.safeParse(document);

        return result.success
          ? [{ fsPath: document.fsPath, product: result.data }]
          : [];
      })
      .sort((left, right) => left.product.title.localeCompare(right.product.title, "pl"));

    translationSources.value = sources;

    if (!sources.some((source) => source.fsPath === selectedTranslationSourcePath.value)) {
      selectedTranslationSourcePath.value = (
        sources.find((source) => {
          return source.product.cataloguePlacement.entryId === "agregaty-tlokowe-ts-150";
        }) ?? sources[0]
      )?.fsPath ?? "";
    }

    await loadSavedTranslation();
  } catch (error) {
    errors.value = [
      error instanceof Error
        ? `Nie udało się pobrać produktów ze Studio: ${error.message}`
        : "Nie udało się pobrać produktów ze Studio.",
    ];
  } finally {
    isLoadingTranslationSources.value = false;
  }
};

watch(selectedTranslationSourcePath, () => {
  void loadSavedTranslation();
});

const setMode = (nextMode: "product" | "translation") => {
  mode.value = nextMode;
  clearFeedback();

  if (nextMode === "translation") {
    void loadTranslationSources();
  }
};

const openImporter = () => {
  isOpen.value = true;

  if (mode.value === "translation") {
    void loadTranslationSources();
  }
};

const copyTranslationJson = async () => {
  if (!selectedTranslationPackage.value) {
    errors.value = ["Wybierz polski produkt do eksportu."];
    return;
  }

  await navigator.clipboard.writeText(
    `${JSON.stringify(selectedTranslationPackage.value, null, 2)}\n`,
  );
  successMessage.value = "Wypełniony JSON produktu PL został skopiowany.";
  errors.value = [];
};

const copyTranslationPrompt = async () => {
  if (!selectedTranslationPackage.value) {
    errors.value = ["Wybierz polski produkt do eksportu."];
    return;
  }

  await navigator.clipboard.writeText(
    createProductTranslationPrompt(selectedTranslationPackage.value),
  );
  successMessage.value = "Instrukcja wraz z JSON-em została skopiowana. Możesz wkleić ją bezpośrednio do ChatGPT.";
  errors.value = [];
};

const downloadTranslationJson = () => {
  if (!selectedTranslationPackage.value) {
    errors.value = ["Wybierz polski produkt do eksportu."];
    return;
  }

  downloadText(
    `${selectedTranslationPackage.value.entryId}-pl-do-tlumaczenia-en.json`,
    `${JSON.stringify(selectedTranslationPackage.value, null, 2)}\n`,
  );
  successMessage.value = "Pobrano wypełniony pakiet produktu PL.";
  errors.value = [];
};

const parseTranslation = (
  currentSource: ProductData | undefined = selectedTranslationSource.value?.product,
): ProductTranslationValidationSuccess | null => {
  clearFeedback();

  if (!selectedTranslationSource.value || !currentSource) {
    errors.value = ["Wybierz polski produkt, którego tłumaczenie importujesz."];
    return null;
  }

  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(normalizeAiJson(translationRawJson.value));
  } catch (error) {
    errors.value = [
      error instanceof SyntaxError
        ? `Niepoprawny JSON: ${error.message}`
        : "Nie udało się odczytać JSON.",
    ];
    return null;
  }

  const result = validateProductTranslationPackage(parsedJson, currentSource);

  if (!result.success) {
    errors.value = result.errors;
    return null;
  }

  return result;
};

const validateTranslation = () => {
  const result = parseTranslation();

  if (result) {
    successMessage.value = `Pakiet EN dla „${result.record.content.title}” jest poprawny i gotowy do importu.`;
  }
};

const importEnglishTranslation = async () => {
  const host = window.useStudioHost?.();
  const selectedSource = selectedTranslationSource.value;

  if (!host || !selectedSource) {
    errors.value = ["Importer jest dostępny tylko po uruchomieniu Nuxt Studio."];
    return;
  }

  isSaving.value = true;

  try {
    const currentSourceDocument = await host.document.db.get(selectedSource.fsPath);
    const currentSourceResult = productSchema.safeParse(currentSourceDocument);

    if (!currentSourceResult.success) {
      errors.value = ["Nie udało się ponownie odczytać aktualnej polskiej wersji produktu."];
      return;
    }

    const result = parseTranslation(currentSourceResult.data);

    if (!result) {
      return;
    }

    const fsPath = `product-translations/en/${result.record.entryId}.json`;
    const existingDocument = await host.document.db.get(fsPath);

    if (existingDocument) {
      await host.document.db.upsert(fsPath, { ...result.record });
    } else {
      await host.document.db.create(
        fsPath,
        `${JSON.stringify(result.record, null, 2)}\n`,
      );
    }

    await host.app.requestRerender();
    savedTranslation.value = result.record;
    savedTranslationPreview.value = toProductFamily(
      mergeProductTranslation(currentSourceResult.data, result.record),
      result.record.content.title,
    );
    isTranslationPreviewOpen.value = true;
    successMessage.value = `${existingDocument ? "Zaktualizowano" : "Utworzono"} angielską wersję roboczą: content/${fsPath}`;
    errors.value = [];

    const callStudioHook = nuxtApp.hooks.callHook as (
      name: string,
      ...args: unknown[]
    ) => Promise<void>;
    await callStudioHook("studio:document:edit", fsPath);
  } catch (error) {
    errors.value = [
      error instanceof Error
        ? `Nie udało się zaimportować wersji EN: ${error.message}`
        : "Nie udało się zaimportować wersji EN.",
    ];
  } finally {
    isSaving.value = false;
  }
};

const createProduct = async () => {
  const product = parseProduct();
  const host = window.useStudioHost?.();

  if (!product) {
    return;
  }

  if (!host) {
    errors.value = ["Importer jest dostępny tylko po uruchomieniu Nuxt Studio."];
    return;
  }

  const slug = slugify(fileName.value || product.title);

  if (!slug) {
    errors.value = ["Podaj poprawną nazwę pliku produktu."];
    return;
  }

  const fsPath = `products/${slug}.json`;
  product.cataloguePlacement.entryId ||= slug;
  isSaving.value = true;

  try {
    if (await host.document.db.get(fsPath)) {
      errors.value = [`Produkt „${slug}.json” już istnieje. Zmień nazwę pliku.`];
      return;
    }

    const createdDocument = await host.document.db.create(
      fsPath,
      `${JSON.stringify(product, null, 2)}\n`,
    );
    await host.app.requestRerender();
    window.dispatchEvent(new CustomEvent("termospec:product-updated"));

    successMessage.value = `Utworzono wersję roboczą: content/${fsPath}`;
    errors.value = [];

    if (createdDocument) {
      const callStudioHook = nuxtApp.hooks.callHook as (
        name: string,
        ...args: unknown[]
      ) => Promise<void>;
      await callStudioHook("studio:document:edit", fsPath);
    }
  } catch (error) {
    errors.value = [
      error instanceof Error
        ? `Nie udało się utworzyć produktu: ${error.message}`
        : "Nie udało się utworzyć produktu.",
    ];
  } finally {
    isSaving.value = false;
  }
};

const closeImporter = () => {
  isOpen.value = false;
  errors.value = [];
  successMessage.value = "";
};

onMounted(() => {
  const updateAvailability = () => {
    isStudioAvailable.value = typeof window.useStudioHost === "function";
    isStudioActive.value = document.body.hasAttribute("data-studio-active");
  };

  updateAvailability();

  if (!isStudioAvailable.value) {
    window.setTimeout(updateAvailability, 750);
  }

  studioObserver = new MutationObserver(updateAvailability);
  studioObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ["data-studio-active"],
  });
});

onBeforeUnmount(() => studioObserver?.disconnect());
</script>

<template>
  <div v-if="isStudioAvailable && isStudioActive">
    <button
      type="button"
      class="fixed bottom-5 end-5 z-[90] flex h-11 items-center gap-2 bg-ink px-4 text-xs font-black uppercase text-white shadow-lg transition hover:bg-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      @click="openImporter"
    >
      <UIcon name="i-lucide-file-json" class="size-4" aria-hidden="true" />
      <span>Import produktu</span>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] grid place-items-center bg-ink/72 p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-import-title"
        @click.self="closeImporter"
        @keydown.esc="closeImporter"
      >
        <section
          class="flex max-h-[calc(100svh-2rem)] w-full flex-col overflow-hidden bg-white md:max-h-[calc(100svh-4rem)]"
          :class="mode === 'translation' ? 'max-w-6xl' : 'max-w-4xl'"
        >
          <header class="flex items-start justify-between gap-6 border-b border-line px-5 py-4 md:px-7">
            <div>
              <h2 id="product-import-title" class="text-xl leading-tight md:text-2xl">
                {{ mode === "product" ? "Import produktu z JSON" : "Tłumaczenie produktu PL → EN" }}
              </h2>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-ink/58">
                {{ mode === "product"
                  ? "Wklej odpowiedź AI lub wczytaj plik. Produkt zostanie zapisany jako wersja robocza."
                  : "Wyeksportuj wypełniony produkt PL, przetłumacz pakiet w AI i zaimportuj osobną wersję EN." }}
              </p>
            </div>
            <button
              type="button"
              class="shrink-0 text-2xl leading-none text-ink/50 hover:text-brand"
              aria-label="Zamknij importer"
              @click="closeImporter"
            >
              ×
            </button>
          </header>

          <div class="grid grid-cols-2 border-b border-line text-xs font-black uppercase">
            <button
              type="button"
              class="h-12 border-e border-line transition"
              :class="mode === 'product' ? 'bg-ink text-white' : 'bg-white text-ink/58 hover:text-brand'"
              @click="setMode('product')"
            >
              Nowy produkt
            </button>
            <button
              type="button"
              class="h-12 transition"
              :class="mode === 'translation' ? 'bg-ink text-white' : 'bg-white text-ink/58 hover:text-brand'"
              @click="setMode('translation')"
            >
              Wersja angielska
            </button>
          </div>

          <div class="overflow-y-auto px-5 py-5 md:px-7">
            <template v-if="mode === 'product'">
              <div class="flex flex-wrap gap-x-5 gap-y-2 border-b border-line pb-4 text-xs font-bold">
                <button type="button" class="text-brand hover:underline" @click="copyPrompt">
                  Kopiuj instrukcję dla AI
                </button>
                <button type="button" class="text-ink/62 hover:text-brand" @click="downloadText('product-template.json', productTemplateJson)">
                  Pobierz pusty szablon
                </button>
                <button type="button" class="text-ink/62 hover:text-brand" @click="downloadText('product-schema.json', schemaJson)">
                  Pobierz JSON Schema
                </button>
                <button type="button" class="text-ink/62 hover:text-brand" @click="fileInput?.click()">
                  Wczytaj gotowy plik
                </button>
                <input ref="fileInput" class="sr-only" type="file" accept="application/json,.json" @change="readFile">
              </div>

              <label for="product-json" class="mt-5 block text-xs font-black uppercase text-ink">
                Dane produktu
              </label>
              <textarea
                id="product-json"
                v-model="rawJson"
                rows="16"
                spellcheck="false"
                class="mt-2 w-full resize-y border border-line bg-soft p-4 font-mono text-xs leading-5 text-ink outline-none focus:border-brand"
                placeholder="Wklej tutaj poprawny obiekt JSON…"
              />

              <fieldset class="mt-4 grid gap-4 border-t border-line pt-4 md:grid-cols-2 xl:grid-cols-4">
                <legend class="mb-3 text-xs font-black uppercase text-ink">
                  Miejsce w katalogu
                </legend>

                <div>
                  <label for="product-category" class="block text-xs font-bold text-ink/62">
                    Kategoria
                  </label>
                  <select
                    id="product-category"
                    v-model="selectedCategorySlug"
                    class="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
                  >
                    <option value="">Wybierz kategorię…</option>
                    <option v-for="category in props.catalogue" :key="category.slug" :value="category.slug">
                      {{ category.number }} — {{ category.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="product-group" class="block text-xs font-bold text-ink/62">
                    Podkategoria
                  </label>
                  <select
                    id="product-group"
                    v-model="selectedGroupSlug"
                    class="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand disabled:bg-soft disabled:text-ink/38"
                    :disabled="!availableGroups.length"
                  >
                    <option value="">Bez podkategorii</option>
                    <option v-for="group in availableGroups" :key="group.slug" :value="group.slug">
                      {{ group.label }}
                    </option>
                  </select>
                </div>

                <div>
                  <label for="product-kind" class="block text-xs font-bold text-ink/62">
                    Sposób wyświetlania
                  </label>
                  <select
                    id="product-kind"
                    v-model="selectedKind"
                    class="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand"
                  >
                    <option value="model">Model</option>
                    <option value="series">Typoszereg</option>
                    <option value="description">Opis</option>
                  </select>
                </div>

                <div>
                  <label for="product-entry" class="block text-xs font-bold text-ink/62">
                    Pozycja katalogowa
                  </label>
                  <select
                    id="product-entry"
                    v-model="selectedEntryId"
                    class="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand disabled:bg-soft disabled:text-ink/38"
                    :disabled="!availableEntries.length"
                  >
                    <option value="">Nowa pozycja katalogowa</option>
                    <option v-for="entry in availableEntries" :key="entry.id" :value="entry.id">
                      {{ entry.label }}
                    </option>
                  </select>
                </div>
              </fieldset>

              <div class="mt-4 grid gap-4 md:grid-cols-[minmax(0,1fr)_14rem] md:items-end">
                <div>
                  <label for="product-file-name" class="block text-xs font-black uppercase text-ink">
                    Nazwa pliku
                  </label>
                  <div class="mt-2 flex h-11 border border-line bg-white focus-within:border-brand">
                    <input
                      id="product-file-name"
                      v-model="fileName"
                      type="text"
                      class="min-w-0 flex-1 px-3 text-sm text-ink outline-none"
                      placeholder="uzupełni się z tytułu"
                    >
                    <span class="flex items-center border-s border-line px-3 font-mono text-xs text-ink/42">.json</span>
                  </div>
                </div>

                <button
                  type="button"
                  class="h-11 border border-line bg-white px-4 text-xs font-black uppercase text-ink transition hover:border-brand hover:text-brand"
                  @click="insertTemplate"
                >
                  Wstaw pusty szablon
                </button>
              </div>
            </template>

            <template v-else>
              <div class="grid gap-4 border-b border-line pb-5 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div>
                  <label for="translation-source" class="block text-xs font-black uppercase text-ink">
                    Produkt źródłowy PL
                  </label>
                  <select
                    id="translation-source"
                    v-model="selectedTranslationSourcePath"
                    class="mt-2 h-11 w-full border border-line bg-white px-3 text-sm text-ink outline-none focus:border-brand disabled:bg-soft disabled:text-ink/38"
                    :disabled="isLoadingTranslationSources || !translationSources.length"
                  >
                    <option v-if="isLoadingTranslationSources" value="">Pobieranie produktów…</option>
                    <option v-else-if="!translationSources.length" value="">Brak produktów w Studio</option>
                    <option v-for="source in translationSources" :key="source.fsPath" :value="source.fsPath">
                      {{ source.product.title }} — {{ source.product.cataloguePlacement.entryId }}
                    </option>
                  </select>
                </div>

                <button
                  type="button"
                  class="h-11 border border-line bg-white px-4 text-xs font-black uppercase text-ink transition hover:border-brand hover:text-brand disabled:opacity-40"
                  :disabled="isLoadingTranslationSources"
                  @click="loadTranslationSources"
                >
                  Odśwież listę
                </button>
              </div>

              <div
                v-if="savedTranslation"
                class="mt-5 flex flex-wrap items-center justify-between gap-4 border border-line bg-white px-4 py-3"
              >
                <div>
                  <p class="text-xs font-black uppercase text-ink">
                    Zapisana wersja EN
                    <span class="ms-2 text-brand">
                      {{ savedTranslation.status === "draft" ? "Draft" : "Published" }}
                    </span>
                  </p>
                  <p class="mt-1 font-mono text-[0.68rem] text-ink/48">
                    {{ savedTranslation.entryId }} · {{ savedTranslation.sourceRevision }}
                  </p>
                </div>
                <button
                  type="button"
                  class="h-10 border border-line bg-white px-4 text-xs font-black uppercase text-ink transition hover:border-brand hover:text-brand"
                  :aria-expanded="isTranslationPreviewOpen"
                  @click="isTranslationPreviewOpen = !isTranslationPreviewOpen"
                >
                  {{ isTranslationPreviewOpen ? "Ukryj podgląd EN" : "Pokaż podgląd EN" }}
                </button>
              </div>

              <p
                v-else-if="savedTranslationError"
                class="mt-5 border-s-2 border-brand ps-4 text-sm leading-6 text-brand"
                role="alert"
              >
                {{ savedTranslationError }}
              </p>

              <div class="mt-5 bg-soft p-4">
                <p class="text-xs font-black uppercase text-ink">1. Eksport wersji polskiej</p>
                <p class="mt-1 text-sm leading-6 text-ink/62">
                  Najszybciej użyć instrukcji z JSON-em i wkleić ją bezpośrednio do ChatGPT. Sam JSON możesz też skopiować lub pobrać.
                </p>
                <div class="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    class="h-10 bg-brand px-4 text-xs font-black uppercase text-white transition hover:bg-ink disabled:opacity-40"
                    :disabled="!selectedTranslationPackage"
                    @click="copyTranslationPrompt"
                  >
                    Kopiuj instrukcję + JSON
                  </button>
                  <button
                    type="button"
                    class="h-10 border border-line bg-white px-4 text-xs font-black uppercase text-ink transition hover:border-brand hover:text-brand disabled:opacity-40"
                    :disabled="!selectedTranslationPackage"
                    @click="copyTranslationJson"
                  >
                    Kopiuj sam JSON
                  </button>
                  <button
                    type="button"
                    class="h-10 border border-line bg-white px-4 text-xs font-black uppercase text-ink transition hover:border-brand hover:text-brand disabled:opacity-40"
                    :disabled="!selectedTranslationPackage"
                    @click="downloadTranslationJson"
                  >
                    Pobierz JSON
                  </button>
                </div>
              </div>

              <div class="mt-5 flex items-end justify-between gap-4">
                <div>
                  <label for="translation-json" class="block text-xs font-black uppercase text-ink">
                    2. Gotowy pakiet po tłumaczeniu na EN
                  </label>
                  <p class="mt-1 text-xs leading-5 text-ink/52">
                    Import zapisuje oddzielny draft EN i nie modyfikuje produktu polskiego.
                  </p>
                </div>
                <button
                  type="button"
                  class="shrink-0 text-xs font-bold text-ink/62 hover:text-brand"
                  @click="translationFileInput?.click()"
                >
                  Wczytaj plik
                </button>
                <input ref="translationFileInput" class="sr-only" type="file" accept="application/json,.json" @change="readTranslationFile">
              </div>
              <textarea
                id="translation-json"
                v-model="translationRawJson"
                rows="16"
                spellcheck="false"
                class="mt-2 w-full resize-y border border-line bg-soft p-4 font-mono text-xs leading-5 text-ink outline-none focus:border-brand"
                placeholder="Wklej tutaj JSON zwrócony przez ChatGPT…"
              />

              <section
                v-if="isTranslationPreviewOpen && savedTranslationPreview"
                class="mt-6 overflow-hidden border border-line bg-white"
                aria-labelledby="saved-translation-preview-title"
              >
                <header class="flex items-center justify-between gap-4 border-b border-line bg-ink px-5 py-3 text-white">
                  <h3 id="saved-translation-preview-title" class="font-heading text-base font-black">
                    Podgląd zapisanej wersji angielskiej
                  </h3>
                  <span class="font-mono text-[0.68rem] font-bold uppercase text-white/62">
                    Studio preview
                  </span>
                </header>
                <ProductCatalogueDetail
                  :product="savedTranslationPreview"
                  :is-draft="savedTranslation?.status === 'draft'"
                  locale="en"
                />
              </section>
            </template>

            <ul v-if="errors.length" class="mt-4 border-s-2 border-brand ps-4 text-sm leading-6 text-brand" role="alert">
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
            <p v-else-if="successMessage" class="mt-4 border-s-2 border-ink ps-4 text-sm font-bold leading-6 text-ink" role="status">
              {{ successMessage }}
            </p>
          </div>

          <footer class="flex flex-wrap justify-end gap-3 border-t border-line px-5 py-4 md:px-7">
            <button
              type="button"
              class="h-11 px-4 text-xs font-black uppercase text-ink/58 hover:text-ink"
              @click="mode === 'product' ? validateProduct() : validateTranslation()"
            >
              Tylko sprawdź
            </button>
            <button
              type="button"
              class="h-11 bg-brand px-5 text-xs font-black uppercase text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-60"
              :disabled="isSaving || !isEditingAvailable"
              @click="mode === 'product' ? createProduct() : importEnglishTranslation()"
            >
              {{ isSaving
                ? (mode === "product" ? "Tworzenie…" : "Importowanie…")
                : (mode === "product" ? "Utwórz wersję roboczą" : "Importuj wersję EN") }}
            </button>
          </footer>
        </section>
      </div>
    </Teleport>
  </div>
</template>
