import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const [html, script, city, css, contract] = await Promise.all([
  read("index.html"),
  read("assets/js/city-experience.mjs"),
  read("assets/js/city.js"),
  read("assets/css/city.css"),
  read("docs/CITY_EXPERIENCE_CHANNELS.md")
]);

for (const mode of ["visualize", "renderer", "both"]) {
  assert.ok(html.includes('data-experience-mode="' + mode + '"'), "UI must expose " + mode + " mode");
  assert.ok(script.includes('"' + mode + '"'), "controller must support " + mode + " mode");
}
assert.ok(html.includes('id="renderer-output"'), "Renderer output must exist independently");
assert.ok(html.includes('id="city-audio-toggle"'), "Audio must have an explicit user control");
assert.ok(html.includes('src="assets/js/city-experience.mjs"'), "Experience controller must be loaded");
assert.ok(css.includes("body.mode-renderer .map-canvas"), "Renderer-only mode must suppress visual map output");
assert.ok(css.includes("body.mode-visualize .renderer-output"), "Visualization-only mode must suppress Renderer output");
assert.ok(script.includes("new MutationObserver(updateRenderer)"), "Renderer must follow selected City model state");
assert.ok(script.includes("audioButton?.addEventListener"), "Audio must start only from explicit user interaction");
assert.ok(script.includes("new AudioContextType()"), "The first audio proof must use browser audio output");
assert.ok(contract.includes("not yet a domain-event-driven soundscape"), "Audio implementation limits must be explicit");


assert.ok(html.includes('id="hyper-visualization"'), "The City page must expose the hyper-visualization proving ground");
assert.ok(html.includes("TheSingularityWorkshop.Visualize/samples/SoldierField/WebGpuRunner/"), "The City page must embed the Visualize WebGPU runner");
assert.ok(html.includes("visitor's own browser/device GPU"), "The City page must state that WebGPU runs on the visitor device");
assert.ok(contract.includes("ObserverRepresentationPolicy"), "The experience contract must document the Renderer policy bridge");
assert.ok(html.includes('id="district-scene-art"'), "A district-specific scene surface must exist beneath the city map");
assert.ok(html.includes('id="district-next"') && html.includes('id="district-previous"'), "District navigation must be available");
assert.ok(city.includes('polygon.addEventListener("click",()=>selectDistrict(district.id))'), "Map district footprints must select their matching scene");
assert.ok(city.includes("renderDistrictScene(district,index,districtBlueprint.districts.length)"), "The scene must be regenerated for the selected district");
assert.ok(city.includes("connectedDistrictModel.buildings"), "Known Civic Quarter landmarks must come from the connected district fixture");
assert.ok(script.includes('const rendererDistrict = $("#renderer-district")'), "Renderer district output must be bound");
assert.ok(script.includes('"#district-scene-title"'), "Renderer must observe district selection");
assert.ok(css.includes(".district-shape.district-selected"), "Selected district must be visually emphasized");

console.log("City experience channels validated: independent observers, district map selection, linked aerial scenes and opt-in audio boundary.");
