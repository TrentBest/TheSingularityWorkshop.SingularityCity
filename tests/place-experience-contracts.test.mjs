import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const json = async path => JSON.parse(await readFile(new URL(path, root), "utf8"));
const catalog = await json("data/places.json");
const placeSchema = await json("schemas/place-catalog.schema.json");
const entrySchema = await json("schemas/experience-entry.schema.json");
const blueprint = await json("data/city-blueprint.json");
const entry = await json("tests/fixtures/underworks.experience-entry.json");

assert.equal(placeSchema.properties.schema.const, catalog.schema);
assert.equal(entrySchema.properties.schema.const, "singularity-city.experience-entry.v1");
assert.equal(catalog.city.id, blueprint.cityId);
assert.ok(placeSchema.required.includes("places"));
assert.ok(entrySchema.required.includes("place") && entrySchema.required.includes("target"));
assert.equal(entry.schema, entrySchema.properties.schema.const);

const unique = (items, label) => {
  const ids = items.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, label + " IDs must be unique");
  return new Set(ids);
};
const placeIds = unique(catalog.places, "Place");
const districtIds = unique(blueprint.districts, "District");
for (const place of catalog.places) {
  assert.ok(place.title && place.description && place.owner?.repository && place.owner?.path);
  assert.ok(Number.isFinite(place.coordinates?.x) && Number.isFinite(place.coordinates?.y));
  assert.ok(Array.isArray(place.capabilities));
  assert.ok(["concept", "planned", "interactive-prototype", "reference-integration", "implemented"].includes(place.status));
}
assert.ok(placeIds.has(entry.place.placeId), "experience entry must resolve to a catalog place");
assert.ok(districtIds.has(entry.place.districtId), "experience entry must resolve to a blueprint district");
assert.equal(entry.place.cityId, catalog.city.id);
assert.ok(entry.owner.repository && entry.target.domain && entry.entryPointId);
assert.ok(entry.capabilities.length && new Set(entry.capabilities).size === entry.capabilities.length);
assert.ok(["public", "host-authorized", "restricted", "invitation-only"].includes(entry.access.policy));
assert.equal(entry.target.siteReference.kind, "city-district");
assert.equal(entry.target.siteReference.anchor, entry.place.districtId);

console.log("Validated " + catalog.places.length + " City places and the versioned Underworks experience-entry contract against " + blueprint.districts.length + " districts.");
