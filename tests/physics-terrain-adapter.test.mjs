import assert from "node:assert/strict";
import { importPhysicsTerrain, PHYSICS_TERRAIN_EXPORT_SCHEMA, CITY_PHYSICS_TERRAIN_SCHEMA } from "../assets/js/physics-terrain-adapter.mjs";

const source = {
  schema: PHYSICS_TERRAIN_EXPORT_SCHEMA,
  datasetId: "region-test-terrain",
  source: {
    repository: "TrentBest/TheSingularityWorkshop.Physics",
    revision: "test-revision",
    model: "TheSingularityWorkshop.Physics.Geology.VolcanicTerrain2D",
    modelVersion: "development",
    runId: "run-test-001"
  },
  coordinateFrame: {
    id: "test-local-frame",
    units: "metres",
    origin: [100, 200],
    xAxis: "east",
    yAxis: "north"
  },
  grid: {
    width: 3,
    height: 2,
    cellWidth: 5,
    cellHeight: 7,
    rowOrder: "y-increasing-row-major",
    sampleConvention: "cell-centred"
  },
  vertical: {
    unit: "metres",
    datum: "test-local-datum",
    positiveDirection: "up"
  },
  elevations: [1.25, 2.5, 3.75, -4, 5, 6]
};

const imported = importPhysicsTerrain(source);
assert.equal(imported.schema, CITY_PHYSICS_TERRAIN_SCHEMA);
assert.equal(imported.datasetId, source.datasetId);
assert.equal(imported.provenance.kind, "physics-produced");
assert.deepEqual(imported.elevation.samples, [[1.25, 2.5, 3.75], [-4, 5, 6]]);
assert.deepEqual(imported.elevation.samples.flat(), source.elevations);
assert.equal(imported.elevation.cellWidthMetres, source.grid.cellWidth);
assert.equal(imported.elevation.rowOrder, source.grid.rowOrder);
assert.deepEqual(imported.coordinateFrame.origin, source.coordinateFrame.origin);
assert.ok(Object.isFrozen(imported) && Object.isFrozen(imported.elevation.samples[0]));

assert.throws(() => importPhysicsTerrain({ ...source, schema: "unknown" }), /Unsupported Physics terrain export schema/);
assert.throws(() => importPhysicsTerrain({ ...source, elevations: [1, 2] }), /Expected 6 row-major/);
assert.throws(() => importPhysicsTerrain({ ...source, elevations: [1, 2, 3, 4, NaN, 6] }), /finite/);
assert.throws(() => importPhysicsTerrain({ ...source, grid: { ...source.grid, rowOrder: "" } }), /rowOrder/);
assert.throws(() => importPhysicsTerrain({ ...source, coordinateFrame: { ...source.coordinateFrame, origin: [0] } }), /origin/);
assert.throws(() => importPhysicsTerrain({ ...source, vertical: { ...source.vertical, datum: "" } }), /Vertical/);
console.log("Validated Physics terrain import contract: metadata, exact row-major samples, and rejection paths.");
