import test from "node:test";
import assert from "node:assert/strict";
import { buildPhysicsTerrainCells } from "../assets/js/physics-terrain-overlay.mjs";

test("Physics overlay maps every imported elevation to one display cell", () => {
  const terrain = {
    elevation: {
      columns: 2,
      rows: 2,
      samples: [[-2, 0], [2, 4]]
    }
  };
  const cells = buildPhysicsTerrainCells(terrain, { x: 10, y: 20, width: 100, height: 80 });
  assert.equal(cells.length, 4);
  assert.deepEqual(cells.map(cell => cell.elevation), [-2, 0, 2, 4]);
  assert.deepEqual(cells.map(cell => [cell.x, cell.y]), [
    [10, 20], [60, 20], [10, 60], [60, 60]
  ]);
  assert.deepEqual(cells.map(cell => cell.normalized), [0, 1 / 3, 2 / 3, 1]);
});

test("Physics overlay preserves negative elevations and flat fields", () => {
  const terrain = {
    elevation: {
      columns: 2,
      rows: 1,
      samples: [[-5, -5]]
    }
  };
  const cells = buildPhysicsTerrainCells(terrain, { x: 0, y: 0, width: 20, height: 10 });
  assert.deepEqual(cells.map(cell => cell.elevation), [-5, -5]);
  assert.deepEqual(cells.map(cell => cell.normalized), [0, 0]);
});
