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
