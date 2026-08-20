import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { parse } from "yaml";

import {
  mergeProductsIntoCatalogue,
  normalizeCatalogueText,
  resolveCatalogueSelection,
  type CatalogueProductRecord,
} from "../app/utils/product-catalogue.ts";
import {
  productCatalogueCategorySlugs,
  productCatalogueGroupSlugs,
} from "../schemas/product.ts";
import type {
  ProductNavigationCategory,
  ProductNavigationEntry,
} from "../types/navigation.ts";

interface CatalogueFile {
  categories: ProductNavigationCategory[];
}

const repositoryRoot = process.cwd();

const readYaml = async <T>(filePath: string): Promise<T> => {
  return parse(await readFile(filePath, "utf8")) as T;
};

test("product title changes do not duplicate a catalogue entry", () => {
  const categories: ProductNavigationCategory[] = [{
    number: "01",
    label: "Agregaty",
    slug: "agregaty",
    entries: [{ id: "ts-150", label: "TS-150", kind: "model" }],
    groups: [],
  }];
  const products: CatalogueProductRecord[] = [{
    title: "TS-150 nowa nazwa",
    status: "published",
    cataloguePlacement: {
      entryId: "ts-150",
      categorySlug: "agregaty",
      groupSlug: "",
      kind: "model",
    },
  }];

  const merged = mergeProductsIntoCatalogue(categories, products);

  assert.equal(merged[0]?.entries.length, 1);
  assert.equal(merged[0]?.entries[0]?.id, "ts-150");
  assert.equal(merged[0]?.entries[0]?.details?.title, "TS-150 nowa nazwa");
});

test("catalogue refresh preserves an existing selected product", () => {
  const categories: ProductNavigationCategory[] = [{
    number: "01",
    label: "Agregaty",
    slug: "agregaty",
    entries: [],
    groups: [{
      label: "Agregaty tłokowe",
      slug: "agregaty-tlokowe",
      entries: [
        { id: "ts-150", label: "TS-150", kind: "model" },
        { id: "ts-350", label: "TS-350", kind: "model" },
      ],
    }],
  }];

  const selection = resolveCatalogueSelection(structuredClone(categories), {
    categorySlug: "agregaty",
    groupSlug: "agregaty-tlokowe",
    entryId: "ts-350",
  });

  assert.deepEqual(selection, {
    categorySlug: "agregaty",
    groupSlug: "agregaty-tlokowe",
    entryId: "ts-350",
  });
});

test("catalogue selection falls back only when the selected product disappears", () => {
  const categories: ProductNavigationCategory[] = [{
    number: "01",
    label: "Agregaty",
    slug: "agregaty",
    entries: [
      { id: "ts-150", label: "TS-150", kind: "model" },
      { id: "ts-350", label: "TS-350", kind: "model" },
    ],
    groups: [],
  }];

  const selection = resolveCatalogueSelection(categories, {
    categorySlug: "agregaty",
    groupSlug: "",
    entryId: "usuniety-produkt",
  });

  assert.equal(selection?.entryId, "ts-150");
});

test("catalogue and product placement identifiers are internally consistent", async () => {
  const catalogue = await readYaml<CatalogueFile>(
    path.join(repositoryRoot, "content/catalogue.yml"),
  );
  const categorySlugs = catalogue.categories.map((category) => category.slug);
  const groupSlugs = catalogue.categories.flatMap((category) => {
    return category.groups.map((group) => group.slug);
  });
  const allEntries = catalogue.categories.flatMap((category) => {
    return [
      ...category.entries.map((entry) => ({ category, group: undefined, entry })),
      ...category.groups.flatMap((group) => {
        return group.entries.map((entry) => ({ category, group, entry }));
      }),
    ];
  });
  const entryIds = allEntries.map(({ entry }) => entry.id);
  const searchIndex = await readFile(
    path.join(repositoryRoot, "content/produkty.md"),
    "utf8",
  );
  const normalizedSearchIndex = normalizeCatalogueText(searchIndex)
    .replace(/[^a-z0-9]+/g, " ");

  assert.equal(new Set(categorySlugs).size, categorySlugs.length);
  assert.equal(new Set(groupSlugs).size, groupSlugs.length);
  assert.equal(new Set(entryIds).size, entryIds.length);
  assert.deepEqual(
    [...productCatalogueCategorySlugs].filter(Boolean).sort(),
    [...categorySlugs].sort(),
  );
  assert.deepEqual(
    [...productCatalogueGroupSlugs].filter(Boolean).sort(),
    [...groupSlugs].sort(),
  );

  for (const label of [
    ...catalogue.categories.map((category) => category.label),
    ...catalogue.categories.flatMap((category) => {
      return category.groups.map((group) => group.label);
    }),
    ...allEntries.map(({ entry }) => entry.label),
  ]) {
    const normalizedLabel = normalizeCatalogueText(label)
      .replace(/[^a-z0-9]+/g, " ")
      .trim();

    assert.ok(
      normalizedSearchIndex.includes(normalizedLabel),
      `search index is missing: ${label}`,
    );
  }

  const productDirectory = path.join(repositoryRoot, "content/products");
  const productFiles = (await readdir(productDirectory))
    .filter((fileName) => /\.(?:ya?ml|json)$/i.test(fileName));

  for (const fileName of productFiles) {
    const productPath = path.join(productDirectory, fileName);
    const product = fileName.endsWith(".json")
      ? JSON.parse(await readFile(productPath, "utf8")) as CatalogueProductRecord
      : await readYaml<CatalogueProductRecord>(productPath);
    const expectedEntryId = fileName.replace(/\.(?:ya?ml|json)$/i, "");
    const placement = product.cataloguePlacement;

    assert.ok(placement, `${fileName}: missing cataloguePlacement`);
    assert.equal(placement.entryId, expectedEntryId, `${fileName}: unstable entryId`);

    const match = allEntries.find(({ category, group, entry }) => {
      return entry.id === placement.entryId
        && category.slug === placement.categorySlug
        && (group?.slug ?? "") === placement.groupSlug;
    });

    assert.ok(match, `${fileName}: placement does not resolve to catalogue.yml`);
  }
});
