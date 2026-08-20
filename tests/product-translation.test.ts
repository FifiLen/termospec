import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { parse } from "yaml";

import {
  createProductTranslationPackage,
  createProductTranslationPrompt,
  mergeProductTranslation,
  validateProductTranslationPackage,
} from "../app/utils/product-translation.ts";
import type { ProductTranslationPackage } from "../schemas/product-translation.ts";

const repositoryRoot = process.cwd();

const readTs150 = async () => {
  const source = await readFile(
    path.join(repositoryRoot, "content/products/agregaty-tlokowe-ts-150.yml"),
    "utf8",
  );

  return parse(source) as unknown;
};

const clonePackage = (translationPackage: ProductTranslationPackage) => {
  return structuredClone(translationPackage);
};

test("TS-150 exports as a complete Polish translation package", async () => {
  const source = await readTs150();
  const translationPackage = createProductTranslationPackage(source);
  const prompt = createProductTranslationPrompt(translationPackage);

  assert.equal(translationPackage.entryId, "agregaty-tlokowe-ts-150");
  assert.equal(translationPackage.sourceLocale, "pl");
  assert.equal(translationPackage.targetLocale, "en");
  assert.equal(translationPackage.product.title, "TS-150");
  assert.ok(translationPackage.product.sections.length > 0);
  assert.ok(translationPackage.product.gallery.length > 0);
  assert.match(prompt, /Przetłumacz poniższy pakiet produktu Termospec/);
  assert.match(prompt, /"entryId": "agregaty-tlokowe-ts-150"/);
});

test("translated copy creates a separate English draft overlay", async () => {
  const source = await readTs150();
  const translated = clonePackage(createProductTranslationPackage(source));

  translated.product.category = "Piston compressor refrigeration units";
  translated.product.lead = "A local refrigeration unit for underground workings.";
  translated.product.sections[0]!.title = "Application";
  translated.product.sections[0]!.body = "Used in underground hard coal mines.";
  translated.product.specs[1]!.label = "Cooling type";
  translated.product.specs[1]!.value = "Direct air cooling";

  const result = validateProductTranslationPackage(translated, source);

  assert.equal(result.success, true);

  if (!result.success) {
    return;
  }

  assert.equal(result.record.locale, "en");
  assert.equal(result.record.sourceLocale, "pl");
  assert.equal(result.record.status, "draft");
  assert.equal(result.record.content.sections[0]?.title, "Application");
  assert.equal("cataloguePlacement" in result.record.content, false);
  assert.equal("heroImage" in result.record.content, false);
});

test("translation import rejects changes to protected product data", async () => {
  const source = await readTs150();
  const translated = clonePackage(createProductTranslationPackage(source));

  translated.product.heroImage = "/images/products/other-product.jpg";

  const result = validateProductTranslationPackage(translated, source);

  assert.equal(result.success, false);

  if (result.success) {
    return;
  }

  assert.ok(result.errors.some((error) => error.includes("chronione dane techniczne")));
});

test("translation import rejects stale packages and changed numbers", async () => {
  const source = await readTs150();
  const translationPackage = createProductTranslationPackage(source);
  const staleSource = structuredClone(source) as Record<string, unknown>;
  staleSource.lead = "Zmieniony polski opis źródłowy.";

  const staleResult = validateProductTranslationPackage(translationPackage, staleSource);
  assert.equal(staleResult.success, false);

  if (!staleResult.success) {
    assert.ok(staleResult.errors.some((error) => error.includes("zmieniła się od eksportu")));
  }

  const changedNumbers = clonePackage(translationPackage);
  changedNumbers.product.sections[1]!.body = changedNumbers.product.sections[1]!.body
    .replace("26 °C", "28 °C");

  const numericResult = validateProductTranslationPackage(changedNumbers, source);
  assert.equal(numericResult.success, false);

  if (!numericResult.success) {
    assert.ok(numericResult.errors.some((error) => error.includes("zachować wszystkie liczby")));
  }
});

test("saved TS-150 English draft matches and merges with the current Polish source", async () => {
  const source = await readTs150();
  const savedTranslation = JSON.parse(await readFile(
    path.join(
      repositoryRoot,
      "content/product-translations/en/agregaty-tlokowe-ts-150.json",
    ),
    "utf8",
  )) as unknown;

  const merged = mergeProductTranslation(source, savedTranslation);

  assert.equal(merged.title, "TS-150");
  assert.equal(
    merged.category,
    "Refrigeration units with reciprocating compressor",
  );
  assert.equal(merged.sections[1]?.title, "Operating principle");
  assert.equal(merged.powerRange, "150–450 kW");
  assert.equal(
    merged.heroImage,
    "/images/products/catalogue-renders/agregaty-sprezarka-tlokowa.jpg",
  );
  assert.equal(
    merged.gallery[0]?.src,
    "/images/products/chlodziarka-bezposredniego-dzialania-wyrobisko-ujecie-01.png",
  );
  assert.equal(
    merged.gallery[0]?.alt,
    "Illustrative view of the refrigeration unit in an underground mine working",
  );
});
