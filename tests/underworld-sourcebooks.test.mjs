import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function read(path) { return readFile(new URL(path, import.meta.url), "utf8"); }
const books = [
  { descriptor: JSON.parse(await read("../docs/books/thieves-and-shadow-work.book.json")), markdown: await read("../docs/books/thieves-and-shadow-work.md"), cover: await read("../docs/books/covers/thieves-and-shadow-work.svg") },
  { descriptor: JSON.parse(await read("../docs/books/urban-underworld.book.json")), markdown: await read("../docs/books/urban-underworld.md"), cover: await read("../docs/books/covers/urban-underworld.svg") }
];
const ids = new Set();
for (const book of books) {
  assert.equal(book.descriptor.schemaVersion, 1);
  assert.equal(book.descriptor.category, "Domain");
  assert.equal(book.descriptor.lod, 2);
  assert.ok(book.descriptor.id.startsWith("singularity-city.domain."));
  assert.ok(!ids.has(book.descriptor.id), "duplicate book identity");
  ids.add(book.descriptor.id);
  assert.ok(book.markdown.includes("# " + book.descriptor.title), "book title must match descriptor");
  assert.ok(book.markdown.includes("Nonplayer Characters sourcebook"), "LOD 2 specialization must link to LOD 1 people model");
  assert.ok(book.markdown.includes("Economy package"), "book must preserve shared Economy ownership");
  assert.ok(book.markdown.includes("Implementation boundary"), "book must disclose implementation status");
  assert.ok(book.cover.includes("<svg"), "cover must be SVG");
}
assert.ok(books[0].markdown.includes("not as real-world instruction"));
assert.ok(books[1].markdown.includes("not an operational guide"));
assert.ok(books[1].markdown.includes("not a second ledger"));
console.log("Underworld sourcebooks validated: " + books.map(b => b.descriptor.title).join("; "));
