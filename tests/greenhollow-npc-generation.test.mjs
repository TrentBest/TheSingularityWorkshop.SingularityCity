import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { generateGreenhollowCandidates } from "../scripts/generate-greenhollow-npc-candidates.mjs";

const root = new URL("../", import.meta.url);
const commerce = JSON.parse(await readFile(new URL("data/commerce-route-fixture.json", root), "utf8"));
const fixture = JSON.parse(await readFile(new URL("data/npc-generation/greenhollow-candidates.json", root), "utf8"));
const generated = generateGreenhollowCandidates(fixture.generation.seed, commerce);

assert.deepEqual(generated, fixture, "Committed candidate fixture must reproduce byte-for-byte as parsed JSON");
assert.deepEqual(generateGreenhollowCandidates(fixture.generation.seed, commerce), generated, "Same seed must reproduce the same candidates");
const alternate = generateGreenhollowCandidates(fixture.generation.seed + "-alternate", commerce);
assert.notDeepEqual(alternate.candidates.map(item => item.candidateId), generated.candidates.map(item => item.candidateId),
  "Different seeds must produce different candidate IDs");

const candidateIds = new Set();
const places = new Set(commerce.places.map(place => place.id));
const routes = new Set(commerce.routes.map(route => route.id));
for (const candidate of generated.candidates) {
  assert.ok(!candidateIds.has(candidate.candidateId), "Candidate IDs must be unique");
  candidateIds.add(candidate.candidateId);
  assert.ok(places.has(candidate.cityContext.placeId), candidate.candidateId + " place must resolve");
  if (candidate.cityContext.routeId) assert.ok(routes.has(candidate.cityContext.routeId), candidate.candidateId + " route must resolve");
  assert.equal(candidate.candidateStatus, "awaiting-surps-character-binding");
  assert.equal("character" in candidate, false, "City must not invent a competing character payload");
  assert.ok(candidate.capabilityPrompts.length > 0);
}
assert.deepEqual(new Set(generated.candidates.map(item => item.role)), new Set([
  "market-stall-keeper", "market-customer", "itinerant-visitor"
]));
assert.ok(generated.limitations.some(item => item.includes("SURPS portable character contract")));

console.log("Greenhollow deterministic NPC candidate generation validated.");
