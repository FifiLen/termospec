<script setup lang="ts">
import { realizationSchema, type RealizationData } from "~~/schemas/realization";
import type { StudioMediaItem } from "~~/types/studio";

type FormField = "title" | "industry" | "description" | "image.src" | "image.alt";

const nuxtApp = useNuxtApp();

const isStudioAvailable = ref(false);
const isStudioActive = ref(false);
const isOpen = ref(false);
const isLoading = ref(false);
const isSaving = ref(false);
const titleInput = ref<HTMLInputElement | null>(null);

const title = ref("");
const industry = ref("");
const description = ref("");
const imageSrc = ref("");
const imageAlt = ref("");
const position = ref<"start" | "end">("start");

const existing = ref<Array<{ fsPath: string; realization: RealizationData }>>([]);
const images = ref<string[]>([]);
const fieldErrors = ref<Partial<Record<FormField, string>>>({});
const errorMessage = ref("");
const createdPath = ref("");

const homepageLimit = 3;
const imageExtensions = new Set(["jpg", "jpeg", "png", "webp", "avif"]);
let studioObserver: MutationObserver | undefined;

const industries = computed(() => {
  return [...new Set(existing.value.map((item) => item.realization.industry))]
    .sort((left, right) => left.localeCompare(right, "pl"));
});

const preview = computed(() => ({
  title: title.value || "Tytuł realizacji",
  industry: industry.value || "Branża",
  description: description.value || "Krótki opis zakresu prac pojawi się w tym miejscu.",
  image: { src: imageSrc.value, alt: imageAlt.value },
}));

const fieldValues: Record<FormField, Ref<string>> = {
  title,
  industry,
  description,
  "image.src": imageSrc,
  "image.alt": imageAlt,
};

for (const [field, value] of Object.entries(fieldValues)) {
  watch(value, () => {
    delete fieldErrors.value[field as FormField];
  });
}

const isHiddenOnHomepage = computed(() => {
  return position.value === "end" && existing.value.length >= homepageLimit;
});

const slugify = (value: string) => {
  return value
    .toLocaleLowerCase("pl-PL")
    .replace(/ł/g, "l")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
};

const toYaml = (realization: RealizationData) => {
  const text = (value: string) => JSON.stringify(value);

  return [
    `title: ${text(realization.title)}`,
    `industry: ${text(realization.industry)}`,
    `description: ${text(realization.description)}`,
    "image:",
    `  src: ${text(realization.image.src)}`,
    `  alt: ${text(realization.image.alt)}`,
    `order: ${realization.order}`,
    "",
  ].join("\n");
};

const toPublicPath = (item: StudioMediaItem) => {
  const path = typeof item.path === "string" ? item.path : item.fsPath ?? "";

  return `/${path.replace(/^\/+/, "").replace(/^public\//, "")}`;
};

const resetForm = () => {
  title.value = "";
  industry.value = "";
  description.value = "";
  imageSrc.value = "";
  imageAlt.value = "";
  position.value = "start";
  fieldErrors.value = {};
  errorMessage.value = "";
  createdPath.value = "";
};

const loadStudioData = async () => {
  const host = window.useStudioHost?.();

  if (!host) {
    errorMessage.value = "Formularz działa tylko w aktywnym Nuxt Studio.";
    return;
  }

  isLoading.value = true;

  try {
    const [documents, media] = await Promise.all([
      host.document.db.list(),
      host.media.list(),
    ]);

    existing.value = documents.flatMap((document) => {
      if (!document.fsPath?.startsWith("realizations/")) {
        return [];
      }

      const result = realizationSchema.safeParse(document);

      return result.success ? [{ fsPath: document.fsPath, realization: result.data }] : [];
    });

    images.value = [...new Set(media
      .filter((item) => imageExtensions.has(String(item.extension ?? "").toLowerCase()))
      .map(toPublicPath)
      .filter((path) => path.startsWith("/images/")))]
      .sort((left, right) => {
        const rank = (path: string) => path.startsWith("/images/realizations/") ? 0 : 1;

        return rank(left) - rank(right) || left.localeCompare(right);
      });
  } catch (error) {
    errorMessage.value = error instanceof Error
      ? `Nie udało się pobrać danych ze Studio: ${error.message}`
      : "Nie udało się pobrać danych ze Studio.";
  } finally {
    isLoading.value = false;
  }
};

const openEditor = async () => {
  resetForm();
  isOpen.value = true;
  await nextTick();
  titleInput.value?.focus();
  await loadStudioData();
};

const closeEditor = () => {
  isOpen.value = false;
};

const nextOrder = () => {
  const orders = existing.value.map((item) => item.realization.order);

  if (!orders.length) {
    return 10;
  }

  return position.value === "start"
    ? Math.min(...orders) - 10
    : Math.max(...orders) + 10;
};

const availablePath = (slug: string) => {
  const taken = new Set(existing.value.map((item) => item.fsPath));
  let candidate = `realizations/${slug}.yml`;
  let suffix = 2;

  while (taken.has(candidate)) {
    candidate = `realizations/${slug}-${suffix}.yml`;
    suffix += 1;
  }

  return candidate;
};

const createRealization = async () => {
  const host = window.useStudioHost?.();

  fieldErrors.value = {};
  errorMessage.value = "";

  const result = realizationSchema.safeParse({
    title: title.value,
    industry: industry.value,
    description: description.value,
    image: { src: imageSrc.value, alt: imageAlt.value },
    order: nextOrder(),
  });

  if (!result.success) {
    for (const issue of result.error.issues) {
      const field = issue.path.join(".") as FormField;
      fieldErrors.value[field] ??= issue.message;
    }

    return;
  }

  const slug = slugify(result.data.title);

  if (!host || !slug) {
    errorMessage.value = !host
      ? "Formularz działa tylko w aktywnym Nuxt Studio."
      : "Tytuł musi zawierać litery lub cyfry.";
    return;
  }

  isSaving.value = true;

  try {
    const fsPath = availablePath(slug);

    await host.document.db.create(fsPath, toYaml(result.data));
    await host.app.requestRerender();
    window.dispatchEvent(new CustomEvent("termospec:realization-updated"));

    const callStudioHook = nuxtApp.hooks.callHook as (
      name: string,
      ...args: unknown[]
    ) => Promise<void>;
    await callStudioHook("studio:document:edit", fsPath);

    createdPath.value = fsPath;
  } catch (error) {
    errorMessage.value = error instanceof Error
      ? `Nie udało się zapisać realizacji: ${error.message}`
      : "Nie udało się zapisać realizacji.";
  } finally {
    isSaving.value = false;
  }
};

const showOnHomepage = async () => {
  closeEditor();
  await navigateTo({ path: "/", hash: "#realizacje" });
};

const addAnother = async () => {
  resetForm();
  await nextTick();
  titleInput.value?.focus();
  await loadStudioData();
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
      class="fixed bottom-[4.5rem] end-5 z-[90] flex h-11 items-center gap-2 rounded-full bg-brand px-5 text-xs font-bold uppercase tracking-[0.06em] text-white shadow-lg transition hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      @click="openEditor"
    >
      <UIcon name="i-lucide-plus" class="size-4" aria-hidden="true" />
      <span>Dodaj realizację</span>
    </button>

    <Teleport to="body">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-[100] grid place-items-center bg-ink/72 p-4 md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="realization-editor-title"
        @click.self="closeEditor"
        @keydown.esc="closeEditor"
      >
        <section class="flex max-h-[calc(100svh-2rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[1.75rem] bg-white text-ink md:max-h-[calc(100svh-4rem)]">
          <header class="flex items-start justify-between gap-6 border-b border-line px-6 py-5 md:px-8">
            <div>
              <h2 id="realization-editor-title" class="max-w-none text-2xl font-bold leading-tight text-heading">
                Dodaj realizację
              </h2>
              <p class="mt-1 max-w-2xl text-sm leading-6 text-muted">
                Uzupełnij pola — po prawej widzisz kartę dokładnie tak, jak pojawi się na stronie.
                Realizacja zapisze się jako wersja robocza w Studio.
              </p>
            </div>
            <button
              type="button"
              class="shrink-0 text-3xl leading-none text-muted hover:text-brand"
              aria-label="Zamknij formularz"
              @click="closeEditor"
            >
              ×
            </button>
          </header>

          <div v-if="createdPath" class="overflow-y-auto px-6 py-10 md:px-8">
            <div class="mx-auto max-w-xl text-center">
              <span class="mx-auto grid size-14 place-items-center rounded-full bg-surface text-brand">
                <UIcon name="i-lucide-check" class="size-7" aria-hidden="true" />
              </span>
              <h3 class="mx-auto mt-5 max-w-none text-xl font-bold text-heading" role="status">
                Realizacja „{{ preview.title }}” jest gotowa jako wersja robocza
              </h3>
              <p class="mt-3 text-sm leading-6 text-muted">
                Widzisz ją już w podglądzie Studio. Żeby pojawiła się na publicznej stronie,
                opublikuj zmiany przyciskiem publikacji w Studio.
              </p>
              <p class="mt-3 font-mono text-xs text-muted/80">content/{{ createdPath }}</p>
              <div class="mt-8 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  class="h-11 rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-[0.06em] text-white transition hover:bg-ink"
                  @click="showOnHomepage"
                >
                  Pokaż na stronie głównej
                </button>
                <button
                  type="button"
                  class="h-11 rounded-full bg-chip px-6 text-xs font-bold uppercase tracking-[0.06em] text-ink transition hover:bg-ink hover:text-white"
                  @click="addAnother"
                >
                  Dodaj kolejną
                </button>
              </div>
            </div>
          </div>

          <form
            v-else
            id="realization-editor-form"
            class="grid gap-8 overflow-y-auto px-6 py-6 md:px-8 lg:grid-cols-[minmax(0,1fr)_22rem]"
            novalidate
            @submit.prevent="createRealization"
          >
            <div class="grid content-start gap-5">
              <div>
                <label for="realization-title" class="block text-sm font-bold text-heading">Tytuł realizacji</label>
                <input
                  id="realization-title"
                  ref="titleInput"
                  v-model="title"
                  type="text"
                  class="mt-2 h-12 w-full rounded-xl border border-transparent bg-field px-4 text-base outline-none focus:border-brand"
                  placeholder="np. Chłodzenie hali magazynowej"
                  :aria-invalid="Boolean(fieldErrors.title)"
                  aria-describedby="realization-title-error"
                >
                <p v-if="fieldErrors.title" id="realization-title-error" class="mt-1.5 text-sm text-brand">{{ fieldErrors.title }}</p>
              </div>

              <div>
                <label for="realization-industry" class="block text-sm font-bold text-heading">Branża</label>
                <input
                  id="realization-industry"
                  v-model="industry"
                  type="text"
                  list="realization-industries"
                  class="mt-2 h-12 w-full rounded-xl border border-transparent bg-field px-4 text-base outline-none focus:border-brand"
                  placeholder="np. Górnictwo"
                  :aria-invalid="Boolean(fieldErrors.industry)"
                  aria-describedby="realization-industry-hint"
                >
                <datalist id="realization-industries">
                  <option v-for="item in industries" :key="item" :value="item" />
                </datalist>
                <p v-if="fieldErrors.industry" id="realization-industry-hint" class="mt-1.5 text-sm text-brand">{{ fieldErrors.industry }}</p>
                <p v-else-if="industries.length" id="realization-industry-hint" class="mt-1.5 text-sm text-muted">
                  Użyte wcześniej: {{ industries.join(", ") }}
                </p>
              </div>

              <div>
                <div class="flex items-baseline justify-between gap-4">
                  <label for="realization-description" class="block text-sm font-bold text-heading">Krótki opis</label>
                  <span class="text-xs text-muted" aria-live="polite">{{ description.length }} znaków</span>
                </div>
                <textarea
                  id="realization-description"
                  v-model="description"
                  rows="3"
                  class="mt-2 w-full resize-y rounded-xl border border-transparent bg-field px-4 py-3 text-base leading-6 outline-none focus:border-brand"
                  placeholder="Jedno lub dwa zdania o zakresie prac."
                  :aria-invalid="Boolean(fieldErrors.description)"
                  aria-describedby="realization-description-hint"
                />
                <p v-if="fieldErrors.description" id="realization-description-hint" class="mt-1.5 text-sm text-brand">{{ fieldErrors.description }}</p>
                <p v-else id="realization-description-hint" class="mt-1.5 text-sm text-muted">Najlepiej wygląda do ok. 90 znaków — tak jak obecne karty.</p>
              </div>

              <fieldset>
                <legend class="text-sm font-bold text-heading">Zdjęcie</legend>
                <p class="mt-1 text-sm text-muted">
                  Wybierz zdjęcie z biblioteki mediów. Nowe zdjęcie najpierw dodaj w zakładce mediów Studio.
                </p>
                <p v-if="isLoading" class="mt-3 text-sm text-muted">Wczytywanie zdjęć…</p>
                <div
                  v-else-if="images.length"
                  class="mt-3 grid max-h-64 grid-cols-3 gap-2 overflow-y-auto rounded-xl bg-surface p-2 sm:grid-cols-4"
                >
                  <label
                    v-for="image in images"
                    :key="image"
                    class="relative block aspect-[561/286] cursor-pointer overflow-hidden rounded-lg ring-2 ring-offset-2 ring-offset-surface transition"
                    :class="imageSrc === image ? 'ring-brand' : 'ring-transparent hover:ring-line'"
                    :title="image"
                  >
                    <input v-model="imageSrc" class="sr-only" type="radio" name="realization-image" :value="image">
                    <img :src="image" alt="" loading="lazy" class="h-full w-full object-cover">
                    <span class="sr-only">{{ image }}</span>
                  </label>
                </div>
                <p v-else class="mt-3 text-sm text-muted">Brak zdjęć w bibliotece mediów.</p>
                <p v-if="fieldErrors['image.src']" class="mt-1.5 text-sm text-brand">{{ fieldErrors["image.src"] }}</p>

                <label for="realization-alt" class="mt-4 block text-sm font-bold text-heading">Co widać na zdjęciu?</label>
                <input
                  id="realization-alt"
                  v-model="imageAlt"
                  type="text"
                  class="mt-2 h-12 w-full rounded-xl border border-transparent bg-field px-4 text-base outline-none focus:border-brand"
                  placeholder="np. Agregat chłodniczy Termospec w hali produkcyjnej"
                  :aria-invalid="Boolean(fieldErrors['image.alt'])"
                  aria-describedby="realization-alt-hint"
                >
                <p v-if="fieldErrors['image.alt']" id="realization-alt-hint" class="mt-1.5 text-sm text-brand">{{ fieldErrors["image.alt"] }}</p>
                <p v-else id="realization-alt-hint" class="mt-1.5 text-sm text-muted">Opis dla osób niewidomych i wyszukiwarek.</p>
              </fieldset>

              <fieldset>
                <legend class="text-sm font-bold text-heading">Miejsce na liście</legend>
                <div class="mt-2 grid gap-2 sm:grid-cols-2">
                  <label
                    v-for="option in [
                      { value: 'start', label: 'Na początku', hint: 'Pojawi się jako pierwsza na stronie głównej.' },
                      { value: 'end', label: 'Na końcu', hint: 'Trafi za istniejące realizacje.' },
                    ]"
                    :key="option.value"
                    class="cursor-pointer rounded-xl border-2 px-4 py-3 transition"
                    :class="position === option.value ? 'border-brand bg-white' : 'border-transparent bg-field hover:border-line'"
                  >
                    <input v-model="position" class="sr-only" type="radio" name="realization-position" :value="option.value">
                    <span class="block text-sm font-bold text-heading">{{ option.label }}</span>
                    <span class="mt-0.5 block text-sm text-muted">{{ option.hint }}</span>
                  </label>
                </div>
                <p v-if="isHiddenOnHomepage" class="mt-2 text-sm text-muted">
                  Strona główna pokazuje trzy pierwsze realizacje, więc ta nie będzie tam widoczna.
                </p>
              </fieldset>
            </div>

            <aside class="lg:sticky lg:top-0 lg:self-start" aria-label="Podgląd karty">
              <p class="text-xs font-bold uppercase tracking-[0.12em] text-muted">Podgląd karty</p>
              <div class="mt-3 rounded-[1.5rem] bg-white p-1">
                <RealizationCard :realization="preview" />
              </div>
            </aside>
          </form>

          <footer v-if="!createdPath" class="flex flex-wrap items-center justify-end gap-3 border-t border-line px-6 py-4 md:px-8">
            <p v-if="errorMessage" class="me-auto text-sm text-brand" role="alert">{{ errorMessage }}</p>
            <button
              type="button"
              class="h-11 rounded-full px-5 text-xs font-bold uppercase tracking-[0.06em] text-muted hover:text-ink"
              @click="closeEditor"
            >
              Anuluj
            </button>
            <button
              type="submit"
              form="realization-editor-form"
              class="h-11 rounded-full bg-brand px-6 text-xs font-bold uppercase tracking-[0.06em] text-white transition hover:bg-ink disabled:cursor-wait disabled:opacity-60"
              :disabled="isSaving || isLoading"
            >
              {{ isSaving ? "Zapisywanie…" : "Zapisz wersję roboczą" }}
            </button>
          </footer>
        </section>
      </div>
    </Teleport>
  </div>
</template>
