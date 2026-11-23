import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function read(path) { return readFile(new URL(path, import.meta.url), "utf8"); }
const names = [
  "law-enforcement-and-public-safety",
  "justice-courts-and-restitution",
  "governance-and-civic-administration",
  "politics-power-and-public-will"
];
const ids = new Set();
for (const name of names) {
  const descriptor = JSON.parse(await read("../docs/books/" + name + ".book.json"));
  const markdown = await read("../docs/books/" + name + ".md");
  const cover = await read("../docs/books/covers/" + name + ".svg");
  assert.equal(descriptor.schemaVersion, 1);
  assert.equal(descriptor.category, "Domain");
  assert.equal(descriptor.lod, 2);
  assert.ok(descriptor.id.startsWith("singularity-city.domain."));
  assert.ok(!ids.has(descriptor.id), "duplicate civic sourcebook identity");
  ids.add(descriptor.id);
  assert.ok(markdown.includes("# " + descriptor.title), "title must match descriptor");
  assert.ok(markdown.includes("Owner:** Singularity City"));
  assert.ok(markdown.includes("Implementation boundary"));
  assert.equal(descriptor.extends, "singularity-city.domain.nonplayer-characters");
  assert.ok(markdown.includes("Nonplayer Characters"));
  assert.ok(cover.includes("<svg"));
  assert.ok(cover.includes("<title"));
}
const law = await read("../docs/books/law-enforcement-and-public-safety.md");
const justice = await read("../docs/books/justice-courts-and-restitution.md");
const governance = await read("../docs/books/governance-and-civic-administration.md");
const politics = await read("../docs/books/politics-power-and-public-will.md");
assert.ok(law.includes("An allegation is not proof") || law.includes("A call or allegation is not proof"));
assert.ok(justice.includes("finding is not omniscient truth"));
assert.ok(justice.includes("Economy package"));
assert.ok(governance.includes("Economy package"));
assert.ok(politics.includes("not a voter-profiling"));
assert.ok(politics.includes("private affiliation and belief"));
console.log("Civic sourcebooks validated: " + names.join("; "));
