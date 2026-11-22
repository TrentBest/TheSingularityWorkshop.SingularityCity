import assert from "node:assert/strict";
import { deriveTerrainSlope, CITY_TERRAIN_SLOPE_SCHEMA, CITY_TERRAIN_SLOPE_METHOD } from "../assets/js/terrain-interpretation.mjs";

const makeTerrain = (samples, cellWidthMetres = 1, cellHeightMetres = 1) => ({
  datasetId: "analytic-plane",
  provenance: { kind: "physics-produced", source: { revision: "fixture-revision" } },
  elevation: {
    unit: "metres",
    rowOrder: "y-ascending; x-fastest",
    columns: samples[0].length,
    rows: samples.length,
    cellWidthMetres,
    cellHeightMetres,
    samples
  }
});

const flat = deriveTerrainSlope(makeTerrain([[7, 7, 7], [7, 7, 7], [7, 7, 7]]));
assert.equal(flat.schema, CITY_TERRAIN_SLOPE_SCHEMA);
assert.equal(flat.method, CITY_TERRAIN_SLOPE_METHOD);
assert.equal(flat.sourceDatasetId, "analytic-plane");
assert.ok(flat.samples.flat().every(value => value === 0));

const plane = deriveTerrainSlope(makeTerrain([
  [0, 2, 4],
  [3, 5, 7],
  [6, 8, 10]
]));
const expected = Math.atan(Math.sqrt(2 ** 2 + 3 ** 2)) * 180 / Math.PI;
for (const value of plane.samples.flat()) assert.ok(Math.abs(value - expected) < 1e-10);

const anisotropic = deriveTerrainSlope(makeTerrain([
  [0, 4, 8],
  [3, 7, 11],
  [6, 10, 14]
], 2, 3));
const anisotropicExpected = Math.atan(Math.sqrt(2 ** 2 + 1 ** 2)) * 180 / Math.PI;
for (const value of anisotropic.samples.flat()) assert.ok(Math.abs(value - anisotropicExpected) < 1e-10);

assert.throws(() => deriveTerrainSlope(makeTerrain([[1, 2], [3, Infinity]])), /finite rectangular/);
assert.throws(() => deriveTerrainSlope(makeTerrain([[1, 2], [3, 4]], 0, 1)), /positive metre spacing/);
assert.throws(() => deriveTerrainSlope({ elevation: { ...makeTerrain([[1, 2], [3, 4]]).elevation, unit: "feet" } }), /metre elevations/);
console.log("Validated City terrain slope derivation: flat plane, analytical plane, anisotropic spacing, and invalid inputs.");
