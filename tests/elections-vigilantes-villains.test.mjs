import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function read(path) { return readFile(new URL(path, import.meta.url), "utf8"); }
const names = [
  "elections-and-player-participation",
  "vigilantes-and-civic-justice",
  "villains-and-antagonists"
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
  assert.ok(!ids.has(descriptor.id), "duplicate sourcebook identity");
  ids.add(descriptor.id);
  assert.ok(markdown.includes("# " + descriptor.title), "title must match descriptor");
  assert.ok(markdown.includes("Owner:** Singularity City"));
  assert.ok(markdown.includes("Implementation boundary"));
  assert.equal(descriptor.extends, "singularity-city.domain.nonplayer-characters");
  assert.ok(markdown.includes("Nonplayer Characters"));
  assert.ok(cover.includes("<svg") && cover.includes("</svg>"));
  assert.ok(cover.includes("<title") && cover.includes("</title>"));
  assert.equal((cover.match(/<circle\b/g) || []).length, (cover.match(/<circle\b[^>]*\/>/g) || []).length,
    "all cover circles must be self-closed");
}
const elections = await read("../docs/books/elections-and-player-participation.md");
assert.ok(elections.includes("The background campaign should sometimes be annoying"));
assert.ok(elections.includes("quiet, ordinary, saturated and muted"));
assert.ok(elections.includes("A secret ballot must not be stored as a publicly inspectable player-to-candidate relationship"));
assert.ok(elections.includes("Campaign spending") && elections.includes("shared Economy domain"));
assert.ok(elections.includes("abstains without losing access, rewards or civic standing"));
assert.ok(elections.includes("not an implemented election engine"));
const vigilantes = await read("../docs/books/vigilantes-and-civic-justice.md");
assert.ok(vigilantes.includes("A good intention does not create lawful authority"));
assert.ok(vigilantes.includes("control real account identity and permissions"));
assert.ok(vigilantes.includes("not real-world tactics"));
const villains = await read("../docs/books/villains-and-antagonists.md");
assert.ok(villains.includes("Antagonist is a relationship"));
assert.ok(villains.includes("not a morality classifier"));
assert.ok(villains.includes("consequences"));
console.log("Elections, vigilantes and villains sourcebooks validated: " + names.join("; "));
