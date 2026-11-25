const catalog = await loadJson("data/maps/tile-catalog.json");
const scene = await loadJson("data/maps/greenhollow-living-scene.json");
const mapPaths = new Map([
  ["greenhollow-market-district", "data/maps/greenhollow-market-district.map.json"],
  ["greenhollow-market-stall-interior", "data/maps/greenhollow-market-stall-interior.map.json"],
  ["greenhollow-inn-interior", "data/maps/greenhollow-inn-interior.map.json"]
]);
const tileById = new Map(catalog.tiles.map(tile => [tile.id, tile]));
const featureById = new Map(scene.features.map(feature => [feature.id, feature]));
const svgNs = "http://www.w3.org/2000/svg";
const view = document.querySelector("#map-view");
const layerControls = document.querySelector("#layer-controls");
const childList = document.querySelector("#child-list");
let currentMap = null;
let currentParent = null;

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}: HTTP ${response.status}`);
  return response.json();
}

function element(name, attributes = {}) {
  const node = document.createElementNS(svgNs, name);
  for (const [key, value] of Object.entries(attributes)) node.setAttribute(key, String(value));
  return node;
}

async function loadMap(id) {
  const path = mapPaths.get(id);
  if (!path) throw new Error(`Map instance is not registered: ${id}`);
  return loadJson(path);
}

function renderLayers(map) {
  const layers = [...new Set(map.placements.map(item => item.layerId))];
  layerControls.replaceChildren();
  for (const layerId of layers) {
    const label = document.createElement("label");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox"; checkbox.checked = true;
    checkbox.addEventListener("change", () => {
      const group = [...view.children].find(node => node.getAttribute("data-layer-id") === layerId);
      if (group) group.setAttribute("display", checkbox.checked ? "inline" : "none");
    });
    label.append(checkbox, document.createTextNode(layerId));
    layerControls.append(label);
  }
}

function renderPlacements(map) {
  view.replaceChildren();
  view.setAttribute("viewBox", `0 0 ${map.coordinateSpace.columns} ${map.coordinateSpace.rows}`);
  view.setAttribute("aria-label", `${map.title}, ${map.kind} map composition`);
  view.append(element("rect", { x: 0, y: 0, width: map.coordinateSpace.columns, height: map.coordinateSpace.rows, fill: "#b5cf8d" }));
  const layers = new Map();
  for (const placement of map.placements) {
    if (!layers.has(placement.layerId)) {
      const group = element("g", { "data-layer-id": placement.layerId });
      layers.set(placement.layerId, group); view.append(group);
    }
    const tile = tileById.get(placement.tileId);
    if (!tile) continue;
    const use = element("use", {
      href: `assets/images/map-tile-atlas.svg#${tile.symbolId}`,
      x: placement.x, y: placement.y, width: 1, height: 1,
      "data-placement-id": placement.id, "data-tile-id": placement.tileId
    });
    if (placement.rotation) use.setAttribute("transform", `rotate(${placement.rotation} ${placement.x + .5} ${placement.y + .5})`);
    layers.get(placement.layerId).append(use);
  }
  for (let x = 0; x <= map.coordinateSpace.columns; x++) view.append(element("path", { d: `M${x} 0V${map.coordinateSpace.rows}`, stroke: "#304c3b", "stroke-opacity": ".18", "stroke-width": ".012", fill: "none" }));
  for (let y = 0; y <= map.coordinateSpace.rows; y++) view.append(element("path", { d: `M0 ${y}H${map.coordinateSpace.columns}`, stroke: "#304c3b", "stroke-opacity": ".18", "stroke-width": ".012", fill: "none" }));
}

async function renderChildren(map) {
  childList.replaceChildren();
  if (!map.childMaps.length) {
    const empty = document.createElement("p"); empty.textContent = "No child maps declared."; childList.append(empty); return;
  }
  for (const child of map.childMaps) {
    const childMap = await loadMap(child.mapId);
    const feature = featureById.get(childMap.parentFeatureId);
    const button = document.createElement("button"); button.type = "button"; button.className = "child-link";
    const title = document.createElement("span"); title.textContent = feature?.label ?? child.mapId;
    const detail = document.createElement("small"); detail.textContent = `${child.relation} · x ${child.transform.translation.x}, y ${child.transform.translation.y} · ${child.transform.rotation}° · scale ${child.transform.scale}`;
    button.append(title, detail); button.addEventListener("click", () => openMap(child.mapId)); childList.append(button);
  }
}

function renderFeatures(map) {
  const list = document.querySelector("#feature-list"); list.replaceChildren();
  if (!map.featureBindings.length) { const item = document.createElement("li"); item.textContent = "No semantic feature bindings declared for this interior study."; list.append(item); return; }
  for (const binding of map.featureBindings) {
    const feature = featureById.get(binding.featureId);
    const item = document.createElement("li"); item.textContent = `${feature?.label ?? binding.featureId} · ${binding.authority}`; list.append(item);
  }
}

async function openMap(id) {
  const map = await loadMap(id);
  currentMap = map;
  currentParent = map.parentMapId ? await loadMap(map.parentMapId) : null;
  document.querySelector("#map-kind").textContent = `${map.kind} · ${map.status}`;
  document.querySelector("#map-title").textContent = map.title;
  document.querySelector("#map-subtitle").textContent = `${map.id} · presentation-only tile composition`;
  document.querySelector("#map-size").textContent = `${map.coordinateSpace.columns} × ${map.coordinateSpace.rows} tiles`;
  document.querySelector("#instance-name").textContent = map.title;
  document.querySelector("#instance-id").textContent = map.id;
  document.querySelector("#placement-count").textContent = map.placements.length;
  document.querySelector("#child-count").textContent = map.childMaps.length;
  document.querySelector("#back-button").disabled = !currentParent;
  document.querySelector("#parent-transform").textContent = currentParent ? `Parent: ${currentParent.title} · feature: ${map.parentFeatureId}` : "This is the root map in this composition.";
  renderLayers(map); renderPlacements(map); await renderChildren(map); renderFeatures(map);
  document.querySelector("#map-status").textContent = `Loaded ${map.placements.length} placements from ${map.tileCatalog}. All layers are presentation-only.`;
}

document.querySelector("#back-button").addEventListener("click", () => { if (currentParent) openMap(currentParent.id); });
document.querySelector("#district-button").addEventListener("click", () => openMap("greenhollow-market-district"));
try { await openMap("greenhollow-market-district"); }
catch (error) { document.querySelector("#map-status").textContent = error.message; console.error(error); }