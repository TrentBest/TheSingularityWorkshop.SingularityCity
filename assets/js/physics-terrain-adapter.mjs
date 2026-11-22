/**
 * Read-only adapter for an explicit Physics height-field export envelope.
 *
 * Physics remains the producer and authority. This module validates metadata and
 * reshapes the row-major sample buffer for City consumers; it does not resample,
 * infer coordinates, classify land cover, or synthesize hydrology/hazards.
 */
export const PHYSICS_TERRAIN_EXPORT_SCHEMA = "singularity-physics.terrain-heightfield.v1";
export const CITY_PHYSICS_TERRAIN_SCHEMA = "singularity-city.physics-terrain.v1";

const nonEmpty = value => typeof value === "string" && value.trim().length > 0;
const finitePositive = value => Number.isFinite(value) && value > 0;

/**
 * Imports a Physics height-field export without changing its physical samples.
 *
 * Required export fields:
 * - datasetId
 * - source: repository, revision, model, modelVersion, runId
 * - coordinateFrame: id, units, origin [x,y], xAxis, yAxis
 * - grid: width, height, cellWidth, cellHeight, rowOrder, sampleConvention
 * - vertical: unit ("metres"), datum, positiveDirection
 * - elevations: flat row-major array (same order as SnapshotElevation())
 *
 * Coordinate and vertical conventions must be supplied by the producer/caller;
 * they cannot be inferred from CoordinateFrame2d's identifier.
 */
export function importPhysicsTerrain(exported) {
  if (!exported || typeof exported !== "object" || Array.isArray(exported))
    throw new TypeError("Physics terrain export must be an object.");
  if (exported.schema !== PHYSICS_TERRAIN_EXPORT_SCHEMA)
    throw new Error(`Unsupported Physics terrain export schema: ${exported.schema}`);

  const { source, coordinateFrame, grid, vertical, elevations } = exported;
  if (!nonEmpty(exported.datasetId)) throw new Error("datasetId is required.");
  for (const key of ["repository", "revision", "model", "modelVersion", "runId"])
    if (!nonEmpty(source?.[key])) throw new Error(`source.${key} is required.`);

  for (const key of ["id", "units", "xAxis", "yAxis"])
    if (!nonEmpty(coordinateFrame?.[key])) throw new Error(`coordinateFrame.${key} is required.`);
  if (!Array.isArray(coordinateFrame.origin) || coordinateFrame.origin.length !== 2 ||
      !coordinateFrame.origin.every(Number.isFinite))
    throw new Error("coordinateFrame.origin must contain two finite coordinates.");

  if (!Number.isInteger(grid?.width) || grid.width < 2 ||
      !Number.isInteger(grid?.height) || grid.height < 2)
    throw new Error("grid.width and grid.height must be integers >= 2.");
  if (!finitePositive(grid.cellWidth) || !finitePositive(grid.cellHeight))
    throw new Error("Grid cell dimensions must be finite and positive.");
  if (!nonEmpty(grid.rowOrder) || !nonEmpty(grid.sampleConvention))
    throw new Error("Grid rowOrder and sampleConvention must be explicit.");
  if (vertical?.unit !== "metres" || !nonEmpty(vertical.datum) ||
      !nonEmpty(vertical.positiveDirection))
    throw new Error("Vertical unit, datum, and positiveDirection must be explicit.");

  const expectedCount = grid.width * grid.height;
  if (!Array.isArray(elevations) || elevations.length !== expectedCount)
    throw new Error(`Expected ${expectedCount} row-major elevation samples.`);
  if (!elevations.every(Number.isFinite))
    throw new Error("Every Physics elevation sample must be finite.");

  const samples = [];
  for (let row = 0; row < grid.height; row++) {
    const start = row * grid.width;
    samples.push(elevations.slice(start, start + grid.width));
  }

  return Object.freeze({
    schema: CITY_PHYSICS_TERRAIN_SCHEMA,
    datasetId: exported.datasetId,
    provenance: Object.freeze({
      kind: "physics-produced",
      source: Object.freeze({ ...source }),
      exportSchema: exported.schema
    }),
    coordinateFrame: Object.freeze({
      ...coordinateFrame,
      origin: Object.freeze([...coordinateFrame.origin])
    }),
    elevation: Object.freeze({
      unit: vertical.unit,
      datum: vertical.datum,
      positiveDirection: vertical.positiveDirection,
      columns: grid.width,
      rows: grid.height,
      cellWidthMetres: grid.cellWidth,
      cellHeightMetres: grid.cellHeight,
      rowOrder: grid.rowOrder,
      sampleConvention: grid.sampleConvention,
      samples: Object.freeze(samples.map(row => Object.freeze(row)))
    })
  });
}
