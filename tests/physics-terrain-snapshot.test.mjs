import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { importPhysicsTerrain } from "../assets/js/physics-terrain-adapter.mjs";
import { buildPhysicsTerrainCells } from "../assets/js/physics-terrain-overlay.mjs";

const exportUrl = new URL("../data/terrain/physics-volcanic-terrain.json", import.meta.url);
const exported = JSON.parse(readFileSync(exportUrl, "utf8"));

test("checked-in Physics producer snapshot imports and renders without changing elevations", () => {
  const terrain = importPhysicsTerrain(exported);
  assert.equal(terrain.provenance.kind, "physics-produced");
  assert.equal(terrain.provenance.source.revision, "3b40a7ede4b3752e99adbdb488e39c1e66c57c42");
  assert.equal(terrain.provenance.source.runId, "45053864606");
  assert.equal(terrain.coordinateFrame.id, "physics-local-east-north-v1");
  assert.equal(terrain.elevation.datum, "model-base-elevation");
  assert.equal(terrain.elevation.columns, 24);
  assert.equal(terrain.elevation.rows, 18);

  const cells = buildPhysicsTerrainCells(terrain);
  assert.equal(cells.length, exported.elevations.length);
  assert.deepEqual(cells.map(cell => cell.elevation), exported.elevations);
  assert.equal(cells[0].elevation, exported.elevations[0]);
  assert.equal(cells.at(-1).elevation, exported.elevations.at(-1));
});
