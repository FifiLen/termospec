import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";
import { parse } from "yaml";

import { seoPageRoutes } from "../data/seo.ts";
import { seoSchema } from "../schemas/seo.ts";
import { sitemapRoutes } from "../server/utils/sitemap-routes.ts";

test("every indexable page has an SEO entry in seo.yml", async () => {
  const seo = seoSchema.parse(parse(await readFile(path.join(process.cwd(), "content/seo.yml"), "utf8")));

  assert.deepEqual(Object.keys(seoSchema.shape).sort(), Object.keys(seoPageRoutes).sort());
  assert.deepEqual(Object.values(seoPageRoutes).sort(), [...sitemapRoutes].sort());

  for (const [key, entry] of Object.entries(seo)) {
    assert.ok(entry.tytul.trim(), `${key} needs a title`);
  }
});
