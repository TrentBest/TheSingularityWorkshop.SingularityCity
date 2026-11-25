import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const scene = JSON.parse(await readFile(new URL("data/maps/greenhollow-living-scene.json", root), "utf8"));
const commerce = JSON.parse(await readFile(new URL("data/commerce-route-fixture.json", root), "utf8"));
const candidates = JSON.parse(await readFile(new URL("data/npc-generation/greenhollow-candidates.json", root), "utf8"));
const schema = JSON.parse(await readFile(new URL("schemas/living-scene.schema.json", root), "utf8"));
const svg = await readFile(new URL("assets/images/greenhollow-living-map-study.svg", root), "utf8");

assert.equal(scene.schema, "singularity-city.living-scene.v1");
assert.equal(schema.$id.endsWith("/schemas/living-scene.schema.json"), true);
assert.equal(scene.status, "data-bound-preview");
assert.equal(scene.coordinateSpace.width, 1280);
assert.equal(scene.coordinateSpace.height, 800);
assert.equal(scene.source.mapAsset, "assets/images/greenhollow-living-map-study.svg");
assert.equal(scene.source.domainFixture, "data/commerce-route-fixture.json");

const unique = (items, label) => {
  const values = items.map(item => item.id);
  assert.equal(new Set(values).size, values.length, label + " IDs must be unique");
  return new Set(values);
};
const layerIds = unique(scene.layers, "Layer");
unique(scene.features, "Feature");
const actorIds = unique(scene.actors, "Actor");
for (const actorId of actorIds) {
  assert.match(svg, new RegExp('<g\\s+id="' + actorId + '"(?:\\s|>)'), "SVG group must expose actor ID " + actorId);
}

for (const feature of scene.features) {
  assert.ok(layerIds.has(feature.layerId), feature.id + " must reference an existing layer");
  if (feature.representationStatus === "domain-bound") {
    assert.ok(feature.cityEntityId, feature.id + " must expose its City entity ID");
  }
}
const people = new Set(commerce.people.map(person => person.id));
const candidateIds = new Set(candidates.candidates.map(candidate => candidate.candidateId));
for (const actor of scene.actors) {
  assert.ok(layerIds.has(actor.layerId), actor.id + " must reference an existing layer");
  if (actor.representationStatus === "domain-bound") {
    assert.ok(actor.sourcePersonId, actor.id + " must bind to a source person");
    assert.ok(people.has(actor.sourcePersonId), actor.id + " source person must resolve");
  } else if (actor.representationStatus === "generated-candidate") {
    assert.ok(actor.sourceCandidateId, actor.id + " must bind to a candidate");
    assert.ok(candidateIds.has(actor.sourceCandidateId), actor.id + " candidate must resolve");
    assert.equal(actor.motion, "ambient-only", "Generated candidates are not simulated actors");
  } else {
    assert.equal(actor.motion, "ambient-only", "Decorative actors cannot claim domain-driven motion");
    assert.equal(actor.sourcePersonId, undefined, "Decorative actors must not impersonate domain identities");
    assert.equal(actor.sourceCandidateId, undefined, "Decorative actors must not impersonate generated candidates");
  }
}
assert.ok(scene.actors.some(actor => actor.sourcePersonId === "mara-peddler"));
assert.match(svg, /id="mara-peddler-map-actor"/, "Mara SVG group must be addressable by manifest ID");
assert.equal(scene.actors.filter(actor => actor.representationStatus === "generated-candidate").length, 3);
assert.ok(scene.limitations.length >= 4);
assert.deepEqual(scene.childMaps, [], "No nested child map is claimed until one exists");

console.log("Greenhollow living-scene manifest and identity bindings validated.");
