import { importPhysicsTerrain } from "./physics-terrain-adapter.mjs";

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

function render(terrain) {
  const layer = document.querySelector("#physics-terrain-layer");
  const toggle = document.querySelector("#physics-terrain-toggle");
  const status = document.querySelector("#physics-terrain-status");
  if (!layer || !toggle || !status) return;

  const cells = buildPhysicsTerrainCells(terrain);
  const fragment = document.createDocumentFragment();
  for (const cell of cells) {
    const rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttribute("x", cell.x.toFixed(3));
    rect.setAttribute("y", cell.y.toFixed(3));
    rect.setAttribute("width", cell.width.toFixed(3));
    rect.setAttribute("height", cell.height.toFixed(3));
    rect.setAttribute("fill", `hsl(${215 - cell.normalized * 190} 72% ${35 + cell.normalized * 20}%)`);
    rect.setAttribute("fill-opacity", "0.76");
    rect.setAttribute("data-elevation-metres", String(cell.elevation));
    fragment.append(rect);
  }
  layer.replaceChildren(fragment);
  layer.setAttribute("visibility", "hidden");
  toggle.disabled = false;
  toggle.setAttribute("aria-pressed", "false");
  toggle.addEventListener("click", () => {
    const visible = toggle.getAttribute("aria-pressed") !== "true";
    toggle.setAttribute("aria-pressed", String(visible));
    layer.setAttribute("visibility", visible ? "visible" : "hidden");
  });
  const source = terrain.provenance.source;
  status.textContent = `Physics ${terrain.elevation.columns}×${terrain.elevation.rows} · ${source.revision.slice(0, 12)} · run ${source.runId} · local frame, not georeferenced`;
}

async function start() {
  const status = document.querySelector("#physics-terrain-status");
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) throw new Error(`Physics terrain unavailable: ${response.status}`);
    const exported = await response.json();
    const terrain = importPhysicsTerrain(exported);
    render(terrain);
  } catch (error) {
    if (status) status.textContent = `Physics terrain unavailable · ${error.message}`;
    console.error(error);
  }
}

if (typeof document !== "undefined") start();
