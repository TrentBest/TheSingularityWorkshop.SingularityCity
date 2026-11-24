import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const pavilion = JSON.parse(await readFile(new URL("../data/mall-pavilion.json", import.meta.url), "utf8"));
const economy = JSON.parse(await readFile(new URL("../data/economy/civic-quarter-market.json", import.meta.url), "utf8"));
const places = JSON.parse(await readFile(new URL("../data/places.json", import.meta.url), "utf8"));

assert.equal(pavilion.schema, "singularity-city.mall-pavilion.v1");
assert.equal(pavilion.status, "interactive-architectural-prototype");
assert.equal(pavilion.reality, "fictional-city-fixture");
assert.equal(pavilion.architecture.levels, 2);

const zones = new Map(pavilion.architecture.zones.map(zone => [zone.id, zone]));
assert.equal(zones.size, pavilion.architecture.zones.length, "pavilion zone IDs must be unique");
assert.ok(zones.has("grand-atrium"), "the pavilion needs a central atrium");
assert.ok(zones.has("maker-promenade"), "the pavilion needs a maker promenade");
assert.ok(zones.has("market-hall"), "the pavilion needs a market hall");
for (const zone of pavilion.architecture.zones) {
  assert.ok(zone.id && zone.name && zone.description, "every zone needs an inspectable identity and description");
}

const cityMall = places.places.find(place => place.id === "singularity-mall");
assert.ok(cityMall, "Singularity Mall must be discoverable from the City catalog");
assert.equal(cityMall.owner.path, "mall.html");
assert.equal(cityMall.district, "Civic Quarter");


const levels = new Map(pavilion.architecture.levelDefinitions.map(level => [level.id, level]));
assert.equal(levels.size, pavilion.architecture.levelDefinitions.length, "floor IDs must be unique");
assert.equal(levels.size, 2, "the pavilion floor plan must describe both levels");
for (const zone of pavilion.architecture.zones) {
  assert.ok(zone.plan, "every room must have a spatial footprint: " + zone.id);
  assert.ok(levels.has(zone.plan.levelId), "room must reference a known floor: " + zone.id);
  assert.ok(zone.plan.width > 0 && zone.plan.height > 0, "room footprint dimensions must be positive");
  assert.ok(zone.plan.x >= 0 && zone.plan.y >= 0 && zone.plan.x + zone.plan.width <= 720 && zone.plan.y + zone.plan.height <= 375,
    "room footprint must remain inside its floor plan: " + zone.id);
}
const circulation = pavilion.architecture.circulation;
const circulationNodes = new Map(circulation.nodes.map(node => [node.id, node]));
assert.equal(circulation.status, "conceptual-circulation-study");
assert.ok(circulationNodes.has("main-entry"), "the ground floor needs an explicit public entrance");
assert.ok(circulationNodes.has("atrium-lift") && circulationNodes.has("upper-lift"), "both levels need lift landing references");
assert.ok(circulationNodes.has("atrium-stair") && circulationNodes.has("upper-stair"), "both levels need stair landing references");
for (const route of circulation.routes) {
  assert.ok(circulationNodes.has(route.from) || zones.has(route.from), "route source must resolve: " + route.id);
  assert.ok(circulationNodes.has(route.to) || zones.has(route.to), "route target must resolve: " + route.id);
  assert.ok(levels.has(route.levelId), "route must reference a known level: " + route.id);
  assert.ok(route.points.length >= 2, "route needs at least two spatial points: " + route.id);
}
assert.ok(circulation.verticalLinks.some(link => link.mode === "lift" && link.accessible), "the concept must distinguish an accessible lift from stairs");

for (const node of circulation.nodes) {
  assert.ok(levels.has(node.levelId), "circulation node must reference a known level: " + node.id);
  assert.ok(node.x >= 0 && node.x <= 720 && node.y >= 0 && node.y <= 375, "circulation node must be inside its floor plan: " + node.id);
}
for (const link of circulation.verticalLinks) {
  assert.ok(circulationNodes.has(link.from) && circulationNodes.has(link.to), "vertical connector endpoints must resolve: " + link.id);
  assert.ok(link.mode === "lift" || link.mode === "stair", "vertical connector mode must be explicit: " + link.id);
}
assert.ok(pavilion.limitations.some(text => text.includes("accessibility audit")), "circulation must disclose that it is not an accessibility audit");

const economyShops = new Map(economy.shops.map(shop => [shop.id, shop]));
const storefrontIds = new Set();
for (const storefront of pavilion.storefronts) {
  assert.ok(!storefrontIds.has(storefront.id), "duplicate storefront identity: " + storefront.id);
  storefrontIds.add(storefront.id);
  assert.ok(zones.has(storefront.zoneId), "storefront references unknown pavilion zone: " + storefront.id);
  if (storefront.status === "fixture-connected") {
    const shop = economyShops.get(storefront.economyShopId);
    assert.ok(shop, "fixture-connected storefront must resolve to a shared Economy shop");
    assert.equal(storefront.economyFixture, "data/economy/civic-quarter-market.json");
    for (const productId of storefront.offerings) {
      assert.ok(shop.products.some(product => product.id === productId), "storefront offering must resolve to Economy catalog: " + productId);
    }
  } else {
    assert.equal(storefront.status, "leasing-concept", "unregistered storefronts must remain explicitly conceptual");
  }
}
assert.ok(pavilion.limitations.some(text => text.includes("No purchase")), "the prototype must not imply live checkout");
assert.ok(pavilion.limitations.some(text => text.includes("leasing concepts")), "the prototype must disclose conceptual tenants");

console.log("Mall pavilion validated: " + zones.size + " spaces, " + storefrontIds.size + " storefronts, " + economyShops.size + " Economy shop fixtures.");
