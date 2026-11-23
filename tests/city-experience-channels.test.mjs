import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = path => readFile(new URL("../" + path, import.meta.url), "utf8");
const [html, script, css, contract] = await Promise.all([
  read("index.html"),
  read("assets/js/city-experience.mjs"),
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

console.log("City experience channels validated: independent visualization, Renderer, combined mode and opt-in audio boundary.");
