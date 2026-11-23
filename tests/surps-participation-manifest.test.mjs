import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function read(path) {
  return readFile(new URL("../" + path, import.meta.url), "utf8");
}

const manifest = JSON.parse(await read(".surps/participation.json"));
const catalogue = await read(manifest.cataloguePath);

assert.equal(manifest.schemaVersion, 1);
assert.equal(manifest.repository, "TrentBest/TheSingularityWorkshop.SingularityCity");
assert.equal(manifest.cataloguePath, "docs/books/index.md");
assert.ok(Array.isArray(manifest.books) && manifest.books.length > 0);

const ids = new Set();
const sourcePaths = new Set();
for (const book of manifest.books) {
  assert.ok(book.id && book.title && book.category, "book identity fields are required");
  assert.ok(book.id.startsWith("singularity-city."), "City books must use the City identity namespace");
  assert.ok(!ids.has(book.id), "duplicate book ID: " + book.id);
  ids.add(book.id);
  assert.equal(book.status, "draft", "local participation must not imply publication");
  assert.equal(book.version.split(".").length, 3);
  assert.ok(book.version.split(".").every(part => part.length > 0 && [...part].every(char => char >= "0" && char <= "9")));

  for (const path of [book.bookPath, book.descriptorPath, book.coverPath]) {
    assert.ok(path && !sourcePaths.has(path), "missing or duplicate source path: " + path);
    sourcePaths.add(path);
    await read(path);
  }

  const descriptor = JSON.parse(await read(book.descriptorPath));
  assert.equal(descriptor.schemaVersion, manifest.schemaVersion);
  assert.equal(descriptor.id, book.id, "manifest and descriptor IDs must match");
  assert.equal(descriptor.title, book.title, "manifest and descriptor titles must match");
  assert.equal(descriptor.category, book.category);
  assert.equal(descriptor.lod, book.lod);
  assert.equal(descriptor.version, book.version);
  assert.equal(descriptor.cover, book.coverPath);

  const markdown = await read(book.bookPath);
  assert.ok(markdown.includes("# " + book.title), "source title must match descriptor");
  assert.ok(catalogue.includes("(" + (book.bookPath.startsWith("docs/books/") ? book.bookPath.slice(11) : book.bookPath) + ")"),
    "canonical catalogue must link to " + book.bookPath);
}

assert.ok(catalogue.includes("canonical local SURPS catalogue"));
console.log("SURPS participation manifest validated: " + manifest.books.length + " draft City sourcebooks.");
