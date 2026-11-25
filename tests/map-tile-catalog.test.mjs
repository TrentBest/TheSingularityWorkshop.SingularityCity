import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const catalog = JSON.parse(await readFile(new URL("data/maps/tile-catalog.json", root), "utf8"));
const schema = JSON.parse(await readFile(new URL("schemas/map-tile-catalog.schema.json", root), "utf8"));
const atlas = await readFile(new URL(catalog.atlas, root), "utf8");

assert.equal(catalog.schema, "singularity-city.map-tile-catalog.v1");
assert.equal(schema.$id.endsWith("/schemas/map-tile-catalog.schema.json"), true);
assert.equal(catalog.authority, "presentation-only");
assert.equal(catalog.tileSize.width, 128);
assert.equal(catalog.tileSize.height, 128);
const ids = catalog.tiles.map(tile => tile.id);
const symbols = catalog.tiles.map(tile => tile.symbolId);
assert.equal(new Set(ids).size, ids.length, "Tile IDs must be unique");
assert.equal(new Set(symbols).size, symbols.length, "Tile symbol IDs must be unique");
for (const tile of catalog.tiles) {
  assert.equal(tile.authority, "presentation-only");
  assert.match(atlas, new RegExp('<symbol\\s+id="' + tile.symbolId + '"'));
}
assert.equal(catalog.tiles.length, 20, "Starter atlas should contain twenty semantic tiles");
assert.ok(catalog.tiles.some(tile => tile.id === "river"));
assert.ok(catalog.tiles.some(tile => tile.id === "bridge"));
assert.ok(catalog.tiles.some(tile => tile.id === "shop"));
assert.ok(catalog.tiles.some(tile => tile.id === "market-square"));

console.log("Map tile catalog and SVG symbol atlas validated.");
