const GIVEN_NAMES = ["Alda","Bram","Celia","Dain","Elowen","Fenn","Garrick","Hesta","Ivo","Junia","Kellan","Liora"];
const FAMILY_NAMES = ["Ashford","Brook","Copperfield","Dale","Ember","Fallow","Green","Hearth","Ironwood","Juniper","Kestrel","Lark"];

const ROLES = [
  { role: "market-stall-keeper", placeId: "greenhollow-green", capabilityPrompts: ["stall-stewardship", "customer-service", "goods-knowledge"] },
  { role: "market-customer", placeId: "greenhollow-bakery", capabilityPrompts: ["shopping-intent", "local-market-literacy"] },
  { role: "itinerant-visitor", placeId: "north-road-crossing", routeId: "north-track", capabilityPrompts: ["foot-travel", "local-route-awareness"] }
];

function hash32(value) {
  let hash = 0x811c9dc5;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193) >>> 0;
  }
  return hash >>> 0;
}

export function generateGreenhollowCandidates(seed, commerceFixture) {
  if (typeof seed !== "string" || seed.trim().length === 0) throw new TypeError("A non-empty generation seed is required.");
  const places = new Set(commerceFixture.places.map(place => place.id));
  const routes = new Set(commerceFixture.routes.map(route => route.id));
  const candidates = ROLES.map(definition => {
    if (!places.has(definition.placeId)) throw new Error("Missing required City place: " + definition.placeId);
    if (definition.routeId && !routes.has(definition.routeId)) throw new Error("Missing required City route: " + definition.routeId);
    const key = seed + "|" + definition.role;
    const identityHash = hash32(key);
    const given = GIVEN_NAMES[hash32(key + "|given") % GIVEN_NAMES.length];
    const family = FAMILY_NAMES[hash32(key + "|family") % FAMILY_NAMES.length];
    return {
      candidateId: "greenhollow-candidate-" + definition.role + "-" + identityHash.toString(16).padStart(8, "0"),
      displayNameSuggestion: given + " " + family,
      role: definition.role,
      cityContext: {
        placeId: definition.placeId,
        routeId: definition.routeId ?? null
      },
      capabilityPrompts: [...definition.capabilityPrompts],
      candidateStatus: "awaiting-surps-character-binding"
    };
  });
  return {
    schema: "singularity-city.npc-candidate-set.v1",
    status: "generated-candidates-not-character-records",
    generation: {
      algorithm: "fnv1a32-role-seed-v1",
      generatorVersion: "1.0.0",
      seed
    },
    candidates,
    limitations: [
      "Candidate IDs identify generated suggestions, not canonical person or SURPS character identities.",
      "Display names are suggestions and do not establish identity, ancestry, culture, or biography.",
      "Capability prompts are generation inputs, not asserted character capabilities or qualifications.",
      "No canonical SURPS character payload is emitted until the SURPS portable character contract is available.",
      "No schedules, behavior, pathfinding, physical movement, commerce, or persistent resident state are generated."
    ]
  };
}
