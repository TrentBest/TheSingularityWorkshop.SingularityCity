/**
 * City-owned interpretation of imported Physics elevation samples.
 *
 * This computes a descriptive grid-slope field only. It is not a terrain solver,
 * geomorphology classifier, drainage model, or engineering suitability decision.
 */
export const CITY_TERRAIN_SLOPE_SCHEMA = "singularity-city.terrain-slope.v1";
export const CITY_TERRAIN_SLOPE_METHOD = "city.finite-difference-slope.v1";

const positiveFinite = value => Number.isFinite(value) && value > 0;

export function deriveTerrainSlope(terrain) {
  const elevation = terrain?.elevation;
  const { columns, rows, samples, cellWidthMetres, cellHeightMetres } = elevation ?? {};

  if (!Number.isInteger(columns) || columns < 2 ||
      !Number.isInteger(rows) || rows < 2 ||
      !Array.isArray(samples) || samples.length !== rows ||
      !positiveFinite(cellWidthMetres) || !positiveFinite(cellHeightMetres)) {
    throw new TypeError("Terrain must provide a rectangular grid and positive metre spacing.");
  }
  if (!samples.every(row => Array.isArray(row) && row.length === columns &&
      row.every(Number.isFinite))) {
    throw new TypeError("Terrain elevation samples must be a finite rectangular grid.");
  }
  if (elevation.unit !== "metres" || elevation.rowOrder !== "y-ascending; x-fastest") {
    throw new Error("Slope derivation requires metre elevations and the declared y-ascending row order.");
  }

  const derivative = (row, column, axis) => {
    if (axis === "x") {
      if (column === 0) return (samples[row][1] - samples[row][0]) / cellWidthMetres;
      if (column === columns - 1) return (samples[row][column] - samples[row][column - 1]) / cellWidthMetres;
      return (samples[row][column + 1] - samples[row][column - 1]) / (2 * cellWidthMetres);
    }
    if (row === 0) return (samples[1][column] - samples[0][column]) / cellHeightMetres;
    if (row === rows - 1) return (samples[row][column] - samples[row - 1][column]) / cellHeightMetres;
    return (samples[row + 1][column] - samples[row - 1][column]) / (2 * cellHeightMetres);
  };

  const slopeRadians = samples.map((row, y) => row.map((_, x) =>
    Math.atan(Math.hypot(derivative(y, x, "x"), derivative(y, x, "y")))
  ));
  const slopeDegrees = slopeRadians.map(row =>
    Object.freeze(row.map(value => value * 180 / Math.PI))
  );

  return Object.freeze({
    schema: CITY_TERRAIN_SLOPE_SCHEMA,
    method: CITY_TERRAIN_SLOPE_METHOD,
    sourceDatasetId: terrain.datasetId,
    sourceProvenance: terrain.provenance,
    units: "degrees",
    derivative: "central-difference; one-sided at grid boundary",
    samples: Object.freeze(slopeDegrees),
    rows,
    columns
  });
}
