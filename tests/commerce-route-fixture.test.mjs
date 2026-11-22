import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const fixture = JSON.parse(await readFile(new URL("../data/commerce-route-fixture.json", import.meta.url), "utf8"));
assert.equal(fixture.schema, "singularity-city.commerce-route-fixture.v1");
assert.equal(fixture.status, "authored-fixture");

const ids = (items, label) => {
  const values = items.map(item => item.id);
  assert.equal(new Set(values).size, values.length, `${label} IDs must be unique`);
  return new Set(values);
};
const placeIds = ids(fixture.places, "Place");
const peopleIds = ids(fixture.people, "Person");
const routeIds = ids(fixture.routes, "Route");
const visitIds = ids(fixture.visits, "Visit");
assert.equal(visitIds.size, fixture.visits.length);

for (const person of fixture.people) {
  assert.ok(Array.isArray(person.roles) && person.roles.length > 0, `${person.id} needs at least one role`);
  if (person.homeBasePlaceId) assert.ok(placeIds.has(person.homeBasePlaceId), `${person.id} home base must resolve`);
  if (person.workplacePlaceId) assert.ok(placeIds.has(person.workplacePlaceId), `${person.id} workplace must resolve`);
}
assert.ok(peopleIds.has(fixture.inventory.ownerPersonId), "Inventory owner must resolve");
assert.ok(peopleIds.has(fixture.conveyance.ownerPersonId), "Conveyance owner must resolve");
assert.ok(fixture.inventory.capacityUnits > 0);
assert.ok(fixture.conveyance.capacityUnits > 0);
assert.ok(fixture.inventory.items.reduce((sum, item) => sum + item.quantity, 0) <= fixture.inventory.capacityUnits,
  "Fixture inventory quantities must fit the declared abstract capacity");

for (const route of fixture.routes) {
  assert.ok(placeIds.has(route.fromPlaceId), `${route.id} origin must resolve`);
  assert.ok(placeIds.has(route.toPlaceId), `${route.id} destination must resolve`);
  assert.ok(route.distanceMetres >= 0);
  assert.equal(route.travelTimeMinutes, null, "Travel time must not be invented without a route simulation");
  assert.equal(route.travelTimeStatus, "not-simulated");
}
for (const visit of fixture.visits) {
  assert.ok(peopleIds.has(visit.actorPersonId), `${visit.id} actor must resolve`);
  assert.ok(placeIds.has(visit.destinationPlaceId), `${visit.id} destination must resolve`);
  assert.ok(routeIds.has(visit.routeId), `${visit.id} route must resolve`);
}

assert.ok(fixture.scenario.settingProfile.baselineCapabilities.includes("animal-drawn-transport"));
assert.ok(fixture.scenario.scenarioExceptions.length === 0);
assert.ok(fixture.ownershipBoundaries.economy.includes("currency"));
assert.ok(fixture.ownershipBoundaries.physics.includes("vehicle-motion"));
assert.ok(fixture.evidence.limitations.includes("not an economic simulation"));

console.log("Commerce route fixture relationships validated.");
