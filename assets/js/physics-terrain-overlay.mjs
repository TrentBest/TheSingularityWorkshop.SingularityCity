import { importPhysicsTerrain } from "./physics-terrain-adapter.mjs";
import { deriveTerrainSlope } from "./terrain-interpretation.mjs";

const SVG_NS = "http://www.w3.org/2000/svg";
const DATA_URL = new URL("../../data/terrain/physics-volcanic-terrain.json", import.meta.url);
const bounds = Object.freeze({ x: 150, y: 105, width: 600, height: 360 });

export function buildPhysicsTerrainCells(terrain, viewport = bounds) {
  const { columns, rows, samples } = terrain.elevation;
  const values = samples.flat();
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const span = maximum - minimum || 1;
  const cellWidth = viewport.width / columns;
  const cellHeight = viewport.height / rows;
  return samples.flatMap((row, y) => row.map((elevation, x) => ({
    x: viewport.x + x * cellWidth,
    y: viewport.y + y * cellHeight,
    width: cellWidth + 0.25,
    height: cellHeight + 0.25,
    elevation,
    normalized: (elevation - minimum) / span
  })));
}

/** Creates display cells from City-derived slope degrees; never alters Physics samples. */
export function buildPhysicsSlopeCells(terrain, viewport = bounds) {
  const slope = deriveTerrainSlope(terrain);
  const values = slope.samples.flat();
  const minimum = Math.min(...values);
  const maximum = Math.max(...values);
  const span = maximum - minimum || 1;
  const cellWidth = viewport.width / slope.columns;
  const cellHeight = viewport.height / slope.rows;
  return slope.samples.flatMap((row, y) => row.map((degrees, x) => {
    const normalized = degrees / 90;
    return {
      x: viewport.x + x * cellWidth,
      y: viewport.y + y * cellHeight,
      width: cellWidth + 0.25,
      height: cellHeight + 0.25,
      slopeDegrees: degrees,
      normalized,
      color: `hsl(${190 - normalized * 170} 78% 54%)`
    };
  }));
}

function appendCells(layer, cells, valueName, fillFor) {
  const fragment = document.createDocumentFragment();
  for (const cell of cells) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", cell.x.toFixed(3));
    rect.setAttribute("y", cell.y.toFixed(3));
    rect.setAttribute("width", cell.width.toFixed(3));
    rect.setAttribute("height", cell.height.toFixed(3));
    rect.setAttribute("fill", fillFor(cell));
    rect.setAttribute("fill-opacity", "0.76");
    rect.setAttribute(`data-${valueName}`, String(cell[valueName]));
    fragment.append(rect);
  }
  layer.replaceChildren(fragment);
}

function render(terrain) {
  const layer = document.querySelector("#physics-terrain-layer");
  const slopeLayer = document.querySelector("#physics-slope-layer");
  const toggle = document.querySelector("#physics-terrain-toggle");
  const slopeToggle = document.querySelector("#physics-slope-toggle");
  const status = document.querySelector("#physics-terrain-status");
  const slopeStatus = document.querySelector("#physics-slope-status");
  if (!layer || !slopeLayer || !toggle || !slopeToggle || !status || !slopeStatus) return;

  appendCells(layer, buildPhysicsTerrainCells(terrain), "elevation-metres",
    cell => `hsl(${215 - cell.normalized * 190} 72% ${35 + cell.normalized * 20}%)`);
  appendCells(slopeLayer, buildPhysicsSlopeCells(terrain), "slope-degrees", cell => cell.color);
  layer.setAttribute("visibility", "hidden");
  slopeLayer.setAttribute("visibility", "hidden");

  toggle.disabled = false;
  toggle.setAttribute("aria-pressed", "false");
  toggle.addEventListener("click", () => {
    const visible = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(visible));
    layer.setAttribute("visibility", visible ? "visible" : "hidden");
  });

  slopeToggle.disabled = false;
  slopeToggle.setAttribute("aria-pressed", "false");
  slopeToggle.addEventListener("click", () => {
    const visible = slopeToggle.getAttribute("aria-pressed") !== "true";
    slopeToggle.setAttribute("aria-pressed", String(visible));
    slopeLayer.setAttribute("visibility", visible ? "visible" : "hidden");
  });

  const source = terrain.provenance.source;
  status.textContent = `Physics elevation · ${terrain.elevation.columns}×${terrain.elevation.rows} · ${source.revision.slice(0, 12)} · local frame, not georeferenced`;
  const slopeValues = terrain.elevation.samples.length;
  const slopes = buildPhysicsSlopeCells(terrain);
  const minSlope = Math.min(...slopes.map(cell => cell.slopeDegrees));
  const maxSlope = Math.max(...slopes.map(cell => cell.slopeDegrees));
  slopeStatus.textContent = `City-derived slope · ${minSlope.toFixed(1)}°–${maxSlope.toFixed(1)}° · finite differences · ${slopeValues} rows`;
}

async function start() {
  const status = document.querySelector("#physics-terrain-status");
  const slopeStatus = document.querySelector("#physics-slope-status");
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Physics terrain unavailable: ${response.status}`);
    const exported = await response.json();
    const terrain = importPhysicsTerrain(exported);
    render(terrain);
  } catch (error) {
    if (status) status.textContent = `Physics terrain unavailable · ${error.message}`;
    if (slopeStatus) slopeStatus.textContent = "Slope layer unavailable · source terrain could not be imported";
    console.error(error);
  }
}

if (typeof document !== "undefined") start();
