import { productSchema, type ProductData } from "#termospec/product-schema";
import {
  productTranslationPackageSchema,
  productTranslationRecordSchema,
  type ProductTranslatedContent,
  type ProductTranslationPackage,
  type ProductTranslationRecord,
} from "#termospec/product-translation-schema";

export interface ProductTranslationValidationSuccess {
  success: true;
  package: ProductTranslationPackage;
  record: ProductTranslationRecord;
}

export interface ProductTranslationValidationFailure {
  success: false;
  errors: string[];
}

export type ProductTranslationValidationResult =
  | ProductTranslationValidationSuccess
  | ProductTranslationValidationFailure;

const canonicalize = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map(canonicalize);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, nestedValue]) => [key, canonicalize(nestedValue)]),
    );
  }

  return value;
};

const hashString = (value: string) => {
  let hash = 0x811c9dc5;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  return (hash >>> 0).toString(16).padStart(8, "0");
};

export const createProductSourceRevision = (productInput: unknown) => {
  const product = productSchema.parse(productInput);
  return `v1-${hashString(JSON.stringify(canonicalize(product)))}`;
};

export const createProductTranslationPackage = (
  productInput: unknown,
): ProductTranslationPackage => {
  const product = productSchema.parse(productInput);
  const entryId = product.cataloguePlacement.entryId;

  if (!entryId) {
    throw new Error("Produkt nie ma stałego identyfikatora entryId.");
  }

  return {
    schemaVersion: 1,
    entryId,
    sourceLocale: "pl",
    targetLocale: "en",
    sourceRevision: createProductSourceRevision(product),
    product,
  };
};

export const createProductTranslationPrompt = (
  translationPackage: ProductTranslationPackage,
) => `Przetłumacz poniższy pakiet produktu Termospec z języka polskiego na angielski.

Zasady obowiązkowe:
- zwróć wyłącznie poprawny JSON, bez komentarzy i bez bloku Markdown,
- zachowaj dokładnie tę samą strukturę, nazwy pól, kolejność i liczbę elementów tablic,
- nie zmieniaj pól pakietu: schemaVersion, entryId, sourceLocale, targetLocale ani sourceRevision,
- nie zmieniaj w product: modelCode, cataloguePlacement, status, order, isFeatured, powerRange ani żadnych ścieżek do obrazów lub dokumentów,
- nie zmieniaj liczb, zakresów liczbowych, kodów modeli ani jednostek technicznych,
- tłumacz teksty przeznaczone dla czytelnika: title, category, lead, shortDescription, seo, nazwy i tekstowe wartości parametrów, technicalNotes, applications, components, features, relatedProducts, serviceScope, sections, opisy alternatywne, tytuły dokumentów i treści realizacji,
- nazwy własne oraz oznaczenia modeli pozostaw bez zmian, jeżeli nie wymagają tłumaczenia,
- niczego nie dopisuj i nie usuwaj.

PAKIET JSON:
${JSON.stringify(translationPackage, null, 2)}`;

const lockedProductSnapshot = (product: ProductData) => ({
  modelCode: product.modelCode,
  cataloguePlacement: product.cataloguePlacement,
  status: product.status,
  order: product.order,
  isFeatured: product.isFeatured,
  powerRange: product.powerRange,
  heroImage: product.heroImage,
  headerSketchSource: product.headerSketch?.src ?? null,
  gallerySources: product.gallery.map((item) => item.src),
  documentFiles: product.documents.map((item) => item.file),
  relatedProjectReferences: product.relatedProjects.map((item) => ({
    number: item.number,
    image: item.image,
  })),
  technicalDataUnits: product.technicalData.map((item) => item.unit),
});

const extractTranslatedContent = (product: ProductData): ProductTranslatedContent => ({
  title: product.title,
  category: product.category,
  lead: product.lead,
  shortDescription: product.shortDescription,
  seo: product.seo,
  specs: product.specs,
  technicalData: product.technicalData.map(({ label, value }) => ({ label, value })),
  technicalNotes: product.technicalNotes,
  applications: product.applications,
  components: product.components,
  features: product.features,
  relatedProducts: product.relatedProducts,
  serviceScope: product.serviceScope,
  sections: product.sections,
  imageAlt: product.imageAlt,
  headerSketch: product.headerSketch ? { alt: product.headerSketch.alt } : null,
  gallery: product.gallery.map(({ alt }) => ({ alt })),
  documents: product.documents.map(({ title }) => ({ title })),
  relatedProjects: product.relatedProjects.map((project) => ({
    category: project.category,
    title: project.title,
    body: project.body,
    imageAlt: project.imageAlt,
    scope: project.scope,
  })),
});

const numericTokens = (value: string) => {
  return value.match(/\d+(?:[.,]\d+)?/g)?.map((token) => token.replace(",", ".")) ?? [];
};

const collectStringPairs = (
  source: unknown,
  translated: unknown,
  path = "product",
): Array<{ path: string; source: string; translated: string }> => {
  if (typeof source === "string" && typeof translated === "string") {
    return [{ path, source, translated }];
  }

  if (Array.isArray(source) && Array.isArray(translated)) {
    return source.flatMap((item, index) => {
      return collectStringPairs(item, translated[index], `${path}[${index + 1}]`);
    });
  }

  if (source && translated && typeof source === "object" && typeof translated === "object") {
    return Object.entries(source).flatMap(([key, value]) => {
      return collectStringPairs(
        value,
        (translated as Record<string, unknown>)[key],
        `${path}.${key}`,
      );
    });
  }

  return [];
};

const compareArrayShape = (
  source: ProductTranslatedContent,
  translated: ProductTranslatedContent,
) => {
  const errors: string[] = [];
  const arrayFields = [
    "specs",
    "technicalData",
    "technicalNotes",
    "applications",
    "components",
    "features",
    "relatedProducts",
    "serviceScope",
    "sections",
    "gallery",
    "documents",
    "relatedProjects",
  ] as const;

  for (const field of arrayFields) {
    if (source[field].length !== translated[field].length) {
      errors.push(`Pole product.${field} musi zachować liczbę elementów z wersji polskiej.`);
    }
  }

  source.sections.forEach((section, index) => {
    if (section.items.length !== translated.sections[index]?.items.length) {
      errors.push(`Pole product.sections[${index + 1}].items musi zachować liczbę elementów.`);
    }
  });

  source.relatedProjects.forEach((project, index) => {
    if (project.scope.length !== translated.relatedProjects[index]?.scope.length) {
      errors.push(`Pole product.relatedProjects[${index + 1}].scope musi zachować liczbę elementów.`);
    }
  });

  return errors;
};

export const validateProductTranslationPackage = (
  packageInput: unknown,
  currentSourceInput: unknown,
): ProductTranslationValidationResult => {
  const packageResult = productTranslationPackageSchema.safeParse(packageInput);
  const sourceResult = productSchema.safeParse(currentSourceInput);

  if (!packageResult.success) {
    return {
      success: false,
      errors: packageResult.error.issues.map((issue) => {
        const path = issue.path.length ? issue.path.join(".") : "Pakiet";
        return `${path}: ${issue.message}`;
      }),
    };
  }

  if (!sourceResult.success) {
    return {
      success: false,
      errors: ["Nie udało się odczytać aktualnej polskiej wersji produktu."],
    };
  }

  const translationPackage = packageResult.data;
  const sourceProduct = sourceResult.data;
  const translatedProduct = translationPackage.product;
  const errors: string[] = [];

  if (translationPackage.entryId !== sourceProduct.cataloguePlacement.entryId) {
    errors.push("entryId pakietu nie odpowiada wybranemu polskiemu produktowi.");
  }

  if (translatedProduct.cataloguePlacement.entryId !== translationPackage.entryId) {
    errors.push("Nie zmieniaj product.cataloguePlacement.entryId.");
  }

  if (translationPackage.sourceRevision !== createProductSourceRevision(sourceProduct)) {
    errors.push("Polska wersja produktu zmieniła się od eksportu. Pobierz świeży JSON i przetłumacz go ponownie.");
  }

  if (JSON.stringify(lockedProductSnapshot(translatedProduct)) !== JSON.stringify(lockedProductSnapshot(sourceProduct))) {
    errors.push("Tłumaczenie zmienia chronione dane techniczne, publikacyjne albo ścieżki plików.");
  }

  const sourceContent = extractTranslatedContent(sourceProduct);
  const translatedContent = extractTranslatedContent(translatedProduct);
  errors.push(...compareArrayShape(sourceContent, translatedContent));

  for (const pair of collectStringPairs(sourceContent, translatedContent)) {
    if (JSON.stringify(numericTokens(pair.source)) !== JSON.stringify(numericTokens(pair.translated))) {
      errors.push(`${pair.path}: tłumaczenie musi zachować wszystkie liczby z polskiej wersji.`);
    }
  }

  if (errors.length) {
    return { success: false, errors: [...new Set(errors)] };
  }

  return {
    success: true,
    package: translationPackage,
    record: {
      schemaVersion: 1,
      entryId: translationPackage.entryId,
      sourceLocale: "pl",
      locale: "en",
      sourceRevision: translationPackage.sourceRevision,
      status: "draft",
      content: translatedContent,
    },
  };
};

export const mergeProductTranslation = (
  sourceInput: unknown,
  recordInput: unknown,
): ProductData => {
  const sourceProduct = productSchema.parse(sourceInput);
  const record = productTranslationRecordSchema.parse(recordInput);
  const errors: string[] = [];

  if (record.entryId !== sourceProduct.cataloguePlacement.entryId) {
    errors.push("Tłumaczenie nie odpowiada wybranemu produktowi źródłowemu.");
  }

  if (record.sourceRevision !== createProductSourceRevision(sourceProduct)) {
    errors.push("Tłumaczenie powstało dla innej wersji polskiego produktu.");
  }

  const sourceContent = extractTranslatedContent(sourceProduct);
  errors.push(...compareArrayShape(sourceContent, record.content));

  for (const pair of collectStringPairs(sourceContent, record.content)) {
    if (JSON.stringify(numericTokens(pair.source)) !== JSON.stringify(numericTokens(pair.translated))) {
      errors.push(`${pair.path}: tłumaczenie nie zachowuje liczb z polskiej wersji.`);
    }
  }

  if (errors.length) {
    throw new Error([...new Set(errors)].join(" "));
  }

  const translated = record.content;

  return {
    ...sourceProduct,
    title: translated.title,
    category: translated.category,
    lead: translated.lead,
    shortDescription: translated.shortDescription,
    seo: translated.seo,
    specs: translated.specs,
    technicalData: sourceProduct.technicalData.map((row, index) => ({
      ...row,
      ...translated.technicalData[index],
    })),
    technicalNotes: translated.technicalNotes,
    applications: translated.applications,
    components: translated.components,
    features: translated.features,
    relatedProducts: translated.relatedProducts,
    serviceScope: translated.serviceScope,
    sections: translated.sections,
    imageAlt: translated.imageAlt,
    headerSketch: sourceProduct.headerSketch && translated.headerSketch
      ? { ...sourceProduct.headerSketch, alt: translated.headerSketch.alt }
      : sourceProduct.headerSketch,
    gallery: sourceProduct.gallery.map((media, index) => ({
      ...media,
      alt: translated.gallery[index]?.alt ?? media.alt,
    })),
    documents: sourceProduct.documents.map((document, index) => ({
      ...document,
      title: translated.documents[index]?.title ?? document.title,
    })),
    relatedProjects: sourceProduct.relatedProjects.map((project, index) => ({
      ...project,
      ...translated.relatedProjects[index],
    })),
  };
};
