import assert from "node:assert/strict";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import test from "node:test";

const repositoryRoot = process.cwd();

const walk = async (directory: string): Promise<string[]> => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));

  return files.flat();
};

test("Nuxt Content queries stay outside the Vue client boundary", async () => {
  const appDirectory = path.join(repositoryRoot, "app");
  const clientSources = (await walk(appDirectory)).filter((file) => {
    return /\.(?:ts|vue)$/.test(file);
  });

  for (const file of clientSources) {
    const source = await readFile(file, "utf8");

    assert.ok(
      !/\bqueryCollection(?:Navigation|SearchSections|ItemSurroundings)?\s*\(/.test(source),
      `${path.relative(repositoryRoot, file)} imports the browser Content database`,
    );
  }
});

test("SiteHeader remains a coordinator instead of a navigation monolith", async () => {
  const source = await readFile(
    path.join(repositoryRoot, "app/components/SiteHeader.vue"),
    "utf8",
  );

  for (const component of [
    "<SiteHeaderDesktop",
    "<SiteHeaderMobileBar",
    "<LazySiteHeaderMobileMenu",
  ]) {
    assert.ok(source.includes(component), `SiteHeader is missing ${component}`);
  }

  assert.ok(
    source.split("\n").length < 180,
    "SiteHeader should only coordinate extracted navigation components",
  );
});
