<script setup lang="ts">
import {
  productJsonSchema,
  productSchema,
  productTemplateJson,
  type ProductData,
} from "~~/schemas/product";
import type { ProductNavigationCategory } from "~~/types/navigation";

const props = defineProps<{
  catalogue: ProductNavigationCategory[];
}>();

interface StudioHost {
  document: {
    db: {
      create: (fsPath: string, content: string) => Promise<unknown>;
      get: (fsPath: string) => Promise<unknown>;
    };
  };
  app: {
    requestRerender: () => Promise<void>;
  };
}

declare global {
  interface Window {
    useStudioHost?: () => StudioHost;
    useNuxtApp?: () => {
      hooks: {
        callHook: (name: string, ...args: unknown[]) => Promise<void>;
      };
    };
  }
}

const isStudioAvailable = ref(false);
const isStudioActive = ref(false);
const isOpen = ref(false);
const rawJson = ref("");
const fileName = ref("");
const selectedCategorySlug = ref("");
const selectedGroupSlug = ref("");
const selectedKind = ref<"model" | "series" | "description">("model");
const errors = ref<string[]>([]);
const successMessage = ref("");
const isSaving = ref(false);
const fileInput = ref<HTMLInputElement | null>(null);
const isEditingAvailable = computed(() => rawJson.value.trim().length > 0);
const selectedCategory = computed(() => {
  return props.catalogue.find((category) => category.slug === selectedCategorySlug.value);
});
const availableGroups = computed(() => selectedCategory.value?.groups ?? []);
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
      categorySlug: selectedCategorySlug.value || result.data.cataloguePlacement.categorySlug,
      groupSlug: selectedGroupSlug.value || result.data.cataloguePlacement.groupSlug,
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
      await window.useNuxtApp?.().hooks.callHook("studio:document:edit", fsPath);
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
      @click="isOpen = true"
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
        <section class="flex max-h-[calc(100svh-2rem)] w-full max-w-4xl flex-col overflow-hidden bg-white md:max-h-[calc(100svh-4rem)]">
          <header class="flex items-start justify-between gap-6 border-b border-line px-5 py-4 md:px-7">
            <div>
              <h2 id="product-import-title" class="text-xl leading-tight md:text-2xl">
                Import produktu z JSON
              </h2>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-ink/58">
                Wklej odpowiedź AI lub wczytaj plik. Produkt zostanie zapisany jako wersja robocza.
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

          <div class="overflow-y-auto px-5 py-5 md:px-7">
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

            <fieldset class="mt-4 grid gap-4 border-t border-line pt-4 md:grid-cols-3">
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
              @click="validateProduct"
            >
              Tylko sprawdź
            </button>
            <button
              type="button"
              class="h-11 bg-brand px-5 text-xs font-black uppercase text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-60"
              :disabled="isSaving || !isEditingAvailable"
              @click="createProduct"
            >
              {{ isSaving ? "Tworzenie…" : "Utwórz wersję roboczą" }}
            </button>
          </footer>
        </section>
      </div>
    </Teleport>
  </div>
</template>
