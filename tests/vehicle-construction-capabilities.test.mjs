import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function json(path) {
  return JSON.parse(await readFile(new URL(path, import.meta.url), "utf8"));
}
const vehicles = await json("../data/vehicles/vehicle-catalog.json");
const construction = await json("../data/construction/capability-profiles.json");
const commerce = await json("../data/commerce-route-fixture.json");
const district = await json("../data/districts/civic-quarter.json");

assert.equal(vehicles.schema, "singularity-city.vehicle-catalog.v1");
assert.equal(construction.schema, "singularity-city.construction-capability-profiles.v1");
const profileMap = new Map(vehicles.capabilityProfiles.map(profile => [profile.id, new Set(profile.capabilities)]));
const definitions = new Map(vehicles.definitions.map(definition => [definition.id, definition]));
assert.equal(definitions.size, vehicles.definitions.length, "vehicle definition IDs must be unique");
for (const instance of vehicles.instances) {
  assert.ok(definitions.has(instance.definitionId), "vehicle instance references an unknown definition: " + instance.id);
  assert.equal(instance.tripState, "not-simulated", "fixture must not claim a completed journey");
  const profile = profileMap.get(instance.capabilityProfileId);
  assert.ok(profile, "vehicle instance must identify its capability profile: " + instance.id);
  const definition = definitions.get(instance.definitionId);
  for (const capability of definition.requiredCapabilities) assert.ok(profile.has(capability), "vehicle instance profile is missing " + capability + ": " + instance.id);
}
const peddler = commerce.people.find(person => person.id === "mara-peddler");
assert.ok(peddler, "handcart owner must exist in commerce fixture");
assert.ok(vehicles.instances.some(instance => instance.id === "mara-handcart" && instance.ownerRef === peddler.id));
const transitStops = new Set(district.transit.stops.map(stop => stop.id));
assert.ok(transitStops.has("civic-stop-hall"), "shuttle fixture must reference a known transit stop");
assert.ok(vehicles.instances.some(instance => instance.id === "civic-shuttle-01" && transitStops.has(instance.currentPlaceRef)));
for (const definition of vehicles.definitions) {
  const compatible = [...profileMap.values()].some(capabilities => definition.requiredCapabilities.every(capability => capabilities.has(capability)));
  assert.ok(compatible, "no declared capability profile supports vehicle: " + definition.id);
}

const constructionProfiles = new Map(construction.profiles.map(profile => [profile.id, new Set(profile.availableCapabilities)]));
const prototypeMap = new Map(construction.buildingPrototypes.map(prototype => [prototype.id, prototype]));
assert.equal(prototypeMap.size, construction.buildingPrototypes.length, "building prototype IDs must be unique");
function missing(profileId, prototype) {
  const available = constructionProfiles.get(profileId);
  assert.ok(available, "unknown construction profile: " + profileId);
  return prototype.requiredCapabilities.filter(capability => !available.has(capability));
}
const timber = prototypeMap.get("prototype-timber-earth-dwelling");
const industrial = prototypeMap.get("prototype-steel-concrete-civic-building");
assert.deepEqual(missing("greenhollow-village-craft", timber), [], "village craft profile should support the timber/earth dwelling");
assert.ok(missing("greenhollow-village-craft", industrial).length > 0, "village profile must expose missing industrial capabilities");
assert.deepEqual(missing("civic-quarter-industrial", industrial), [], "industrial profile should support the steel/concrete prototype");
assert.ok(missing("civic-quarter-industrial", timber).length > 0, "industrial profile must not silently inherit every village capability");

console.log("Vehicle and construction capability fixtures validated: " + vehicles.definitions.length + " vehicle definitions, " + construction.buildingPrototypes.length + " building prototypes.");
