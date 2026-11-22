import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";

const catalog = JSON.parse(readFileSync("data/places.json", "utf8"));
assert.equal(catalog.schema, "singularity-city.catalog.v1");
assert.ok(catalog.city?.id, "catalog must identify its city");
assert.ok(Array.isArray(catalog.places) && catalog.places.length > 0, "catalog must contain places");

const ids = new Set();
for (const place of catalog.places) {
  assert.ok(place.id && !ids.has(place.id), `missing or duplicate place id: ${place.id}`);
  ids.add(place.id);
  assert.ok(place.title && place.description, `${place.id}: missing presentation fields`);
  assert.ok(Number.isFinite(place.coordinates?.x) && Number.isFinite(place.coordinates?.y), `${place.id}: missing SVG coordinates`);
  assert.ok(place.coordinates.x >= 0 && place.coordinates.x <= 900, `${place.id}: x coordinate outside map`);
  assert.ok(place.coordinates.y >= 0 && place.coordinates.y <= 590, `${place.id}: y coordinate outside map`);
  assert.ok(place.owner?.repository && place.owner?.path, `${place.id}: missing provenance`);
  assert.ok(Array.isArray(place.capabilities), `${place.id}: capabilities must be an array`);
  if (place.owner.repository === "TrentBest/TheSingularityWorkshop.SingularityCity") {
    assert.ok(existsSync(place.owner.path), `${place.id}: local source path does not exist: ${place.owner.path}`);
  }
}
const html = readFileSync("index.html", "utf8");
const js = readFileSync("assets/js/city.js", "utf8");
assert.match(html, /id="place-markers"/, "SVG must expose the dynamic marker layer");
assert.match(html, /id="source-repository"/, "page must expose source provenance");
assert.match(html, /docs\/BUILD_YOUR_CITY\.md/, "page must link to the city-building guide");
assert.match(js, /data\/places\.json/, "renderer must load the repository catalog");
assert.match(js, /renderMarkers/, "renderer must project catalog places into SVG");
console.log(`Validated ${catalog.places.length} city places and their provenance contracts.`);
