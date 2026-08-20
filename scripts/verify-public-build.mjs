import assert from "node:assert/strict";
import { readdir, readFile, stat } from "node:fs/promises";
import path from "node:path";

const publicDirectory = path.resolve(".output/public");

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(entries.map(async (entry) => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  }));

  return files.flat();
};

await stat(publicDirectory).catch(() => {
  throw new Error("Brak .output/public. Najpierw uruchom `npm run build`.");
});

const files = await walk(publicDirectory);
const relativeFiles = files.map((file) => path.relative(publicDirectory, file));
const forbiddenAssets = relativeFiles.filter((file) => {
  return file.startsWith("__nuxt_content/")
    || /(?:^|\/)sqlite3.*\.(?:js|wasm)$/i.test(file);
});

assert.deepEqual(
  forbiddenAssets,
  [],
  `Publiczny build zawiera klientowe artefakty Nuxt Content:\n${forbiddenAssets.join("\n")}`,
);

const javaScriptFiles = files.filter((file) => file.endsWith(".js"));
const forbiddenRuntimeMarkers = [
  "@sqlite.org/sqlite-wasm",
  "sqlite3-worker1-bundler-friendly",
];

for (const file of javaScriptFiles) {
  const source = await readFile(file, "utf8");

  for (const marker of forbiddenRuntimeMarkers) {
    assert.ok(
      !source.includes(marker),
      `${path.relative(publicDirectory, file)} zawiera klientowy marker ${marker}`,
    );
  }
}

const totalJavaScriptBytes = (await Promise.all(
  javaScriptFiles.map(async (file) => (await stat(file)).size),
)).reduce((total, size) => total + size, 0);

console.log(
  `Publiczny build bez SQLite/WASM: ${javaScriptFiles.length} plików JS, ${(totalJavaScriptBytes / 1024).toFixed(1)} KiB.`,
);
