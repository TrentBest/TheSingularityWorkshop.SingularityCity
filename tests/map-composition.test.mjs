import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const readJson = async (path) => JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
const catalog = await readJson("../data/maps/tile-catalog.json");
const scene = await readJson("../data/maps/greenhollow-living-scene.json");
const maps = await Promise.all([
  readJson("../data/maps/greenhollow-market-district.map.json"),
  readJson("../data/maps/greenhollow-market-stall-interior.map.json"),
  readJson("../data/maps/greenhollow-inn-interior.map.json")
]);
const tileIds = new Set(catalog.tiles.map((tile) => tile.id));
const featureIds = new Set(scene.features.map((feature) => feature.id));

function validateMapSet(items) {
  const ids = new Set();
  for (const map of items) {
    assert.equal(map.schema, "singularity-city.map-instance.v1", `${map.id}: schema version`);
    assert.match(map.id, /^[a-z0-9-]+$/);
    assert.ok(!ids.has(map.id), `duplicate map id: ${map.id}`);
    ids.add(map.id);
    assert.equal(map.authority, "presentation-only", `${map.id}: composition remains presentation-only`);
    assert.equal(map.coordinateSpace.kind, "tile-grid");
    assert.equal(map.coordinateSpace.units, "tile");
    assert.ok(Number.isInteger(map.coordinateSpace.columns) && map.coordinateSpace.columns > 0);
    assert.ok(Number.isInteger(map.coordinateSpace.rows) && map.coordinateSpace.rows > 0);
    assert.ok(Array.isArray(map.placements) && map.placements.length > 0);
    const placementIds = new Set();
    const occupied = new Set();
    for (const placement of map.placements) {
      assert.ok(!placementIds.has(placement.id), `${map.id}: duplicate placement id ${placement.id}`);
      placementIds.add(placement.id);
      assert.ok(tileIds.has(placement.tileId), `${map.id}: unknown tile ${placement.tileId}`);
      assert.ok(Number.isInteger(placement.x) && placement.x >= 0 && placement.x < map.coordinateSpace.columns);
      assert.ok(Number.isInteger(placement.y) && placement.y >= 0 && placement.y < map.coordinateSpace.rows);
      assert.ok([0, 90, 180, 270].includes(placement.rotation));
      assert.equal(typeof placement.layerId, "string");
      const cellLayer = `${placement.x},${placement.y},${placement.layerId}`;
      assert.ok(!occupied.has(cellLayer), `${map.id}: duplicate placement in cell/layer ${cellLayer}`);
      occupied.add(cellLayer);
    }
    for (const binding of map.featureBindings) {
      assert.ok(featureIds.has(binding.featureId), `${map.id}: unknown scene feature ${binding.featureId}`);
      assert.ok(["city-domain", "external-domain", "generated-candidate", "presentation-only"].includes(binding.authority));
    }
    const childIds = new Set();
    for (const child of map.childMaps) {
      assert.ok(!childIds.has(child.mapId), `${map.id}: duplicate child map reference ${child.mapId}`);
      childIds.add(child.mapId);
      assert.ok([0, 90, 180, 270].includes(child.transform.rotation));
      assert.ok(Number.isFinite(child.transform.translation.x) && Number.isFinite(child.transform.translation.y));
      assert.ok(Number.isFinite(child.transform.scale) && child.transform.scale > 0);
    }
    if (map.parentMapId) assert.ok(map.parentFeatureId, `${map.id}: child map must identify its parent feature`);
    else assert.ok(!map.parentFeatureId, `${map.id}: root map cannot have an orphan parent feature`);
  }
  for (const map of items) {
    for (const child of map.childMaps) {
      const childMap = items.find((candidate) => candidate.id === child.mapId);
      assert.ok(childMap, `${map.id}: missing child map ${child.mapId}`);
      assert.equal(childMap.parentMapId, map.id, `${child.mapId}: parent map mismatch`);
      assert.ok(map.featureBindings.some((binding) => binding.featureId === childMap.parentFeatureId),
        `${child.mapId}: parent feature is not bound by ${map.id}`);
    }
  }
  const visiting = new Set();
  const visited = new Set();
  function visit(id) {
    if (visiting.has(id)) throw new Error(`map hierarchy cycle at ${id}`);
    if (visited.has(id)) return;
    visiting.add(id);
    const map = items.find((candidate) => candidate.id === id);
    for (const child of map.childMaps) visit(child.mapId);
    visiting.delete(id);
    visited.add(id);
  }
  for (const map of items) visit(map.id);
}

test("Greenhollow district and building maps resolve every tile and feature", () => {
  assert.equal(catalog.authority, "presentation-only");
  validateMapSet(maps);
  assert.equal(maps[0].childMaps.length, 2);
  assert.equal(maps[1].parentMapId, maps[0].id);
  assert.equal(maps[2].parentMapId, maps[0].id);
});
test("map composition rejects missing tiles", () => {
  const broken = structuredClone(maps); broken[0].placements[0].tileId = "not-in-catalog";
  assert.throws(() => validateMapSet(broken), /unknown tile/);
});
test("map composition rejects duplicate map and placement identities", () => {
  const duplicateMap = structuredClone(maps); duplicateMap[1].id = duplicateMap[0].id;
  assert.throws(() => validateMapSet(duplicateMap), /duplicate map id/);
  const duplicatePlacement = structuredClone(maps); duplicatePlacement[0].placements[1].id = duplicatePlacement[0].placements[0].id;
  assert.throws(() => validateMapSet(duplicatePlacement), /duplicate placement id/);
});
test("map composition rejects invalid bounds and hierarchy cycles", () => {
  const outOfBounds = structuredClone(maps); outOfBounds[0].placements[0].x = 99;
  assert.throws(() => validateMapSet(outOfBounds));
  const cycle = structuredClone(maps);
  cycle[1].featureBindings.push({ featureId: "greenhollow-market-building-study", authority: "presentation-only" });
  cycle[1].childMaps.push({ mapId: cycle[0].id, relation: "contains", transform: { translation: { x: 0, y: 0 }, rotation: 0, scale: 1 } });
  cycle[0].parentMapId = cycle[1].id;
  cycle[0].parentFeatureId = "greenhollow-market-building-study";
  assert.throws(() => validateMapSet(cycle), /cycle/);
});
test("child transforms require positive scale", () => {
  const invalid = structuredClone(maps); invalid[0].childMaps[0].transform.scale = 0;
  assert.throws(() => validateMapSet(invalid));
});