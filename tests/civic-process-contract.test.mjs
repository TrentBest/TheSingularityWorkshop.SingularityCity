import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const readJson = async path => JSON.parse(await readFile(new URL("../" + path, import.meta.url), "utf8"));
const schema = await readJson("schemas/civic-process-response.schema.json");
const scenario = await readJson("data/scenarios/greenhollow-civic-stress-test.json");
const response = scenario.civicResponse;

assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
assert.equal(schema.properties.schema.const, "singularity-city.civic-process-response.v1");
assert.equal(schema.additionalProperties, false);
assert.deepEqual(
  schema.required,
  ["schema", "id", "status", "hearingEventId", "proposals", "hearingDecision", "oversightObligations", "residentImpacts", "institutionalTrust"]
);
assert.equal(response.schema, schema.properties.schema.const, "fixture must declare the schema version it conforms to");

function validateSchema(value, definition, path = "$") {
  if (definition.$ref) {
    const target = definition.$ref.slice(2).split("/").reduce((node, key) => node[key], schema);
    validateSchema(value, target, path);
    return;
  }
  if (Object.hasOwn(definition, "const")) {
    assert.equal(value, definition.const, path + " must equal its schema constant");
  }
  if (definition.type === "object") {
    assert.ok(value !== null && typeof value === "object" && !Array.isArray(value), path + " must be an object");
    for (const key of definition.required ?? []) {
      assert.ok(Object.hasOwn(value, key), path + "." + key + " is required");
    }
    if (definition.additionalProperties === false) {
      for (const key of Object.keys(value)) {
        assert.ok(Object.hasOwn(definition.properties ?? {}, key), path + "." + key + " is not declared");
      }
    }
    for (const [key, child] of Object.entries(definition.properties ?? {})) {
      if (Object.hasOwn(value, key)) validateSchema(value[key], child, path + "." + key);
    }
  } else if (definition.type === "array") {
    assert.ok(Array.isArray(value), path + " must be an array");
    assert.ok(value.length >= (definition.minItems ?? 0), path + " has too few items");
    if (definition.items) value.forEach((item, index) => validateSchema(item, definition.items, path + "[" + index + "]"));
  } else if (definition.type === "string") {
    assert.equal(typeof value, "string", path + " must be a string");
    assert.ok(value.length >= (definition.minLength ?? 0), path + " is too short");
  }
}
validateSchema(response, schema);
assert.equal(response.status, "authored-hearing-outcome-fixture-not-live-civic-process");
assert.ok(scenario.timeline.some(event => event.id === response.hearingEventId), "response must reference an existing hearing event");

const unique = (items, label) => {
  const ids = items.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, label + " IDs must be unique");
};
unique(response.proposals, "proposal");
unique(response.oversightObligations, "oversight");
unique(response.residentImpacts, "resident impact");
unique(response.institutionalTrust.dimensions, "trust dimension");

const actors = new Set(scenario.actors.map(actor => actor.id));
const events = new Set(scenario.timeline.map(event => event.id));
const proposals = new Set(response.proposals.map(proposal => proposal.id));
assert.ok(actors.has(response.hearingDecision.authorityId), "decision authority must exist");
assert.ok(actors.has(response.institutionalTrust.institutionId), "trust institution must exist");
assert.ok(events.has(response.hearingDecision.sourceEventId), "decision source event must exist");
assert.deepEqual(
  [...response.hearingDecision.selectedProposalIds].sort(),
  [...proposals].sort(),
  "every selected proposal must exist and every declared proposal must be accounted for"
);
for (const obligation of response.oversightObligations) {
  assert.ok(actors.has(obligation.responsibleActorId), "oversight owner must exist: " + obligation.id);
  assert.ok(obligation.trigger && obligation.obligation && obligation.evidenceExpected);
}
for (const proposal of response.proposals) {
  assert.ok(proposal.resourceRequirements.length > 0);
  assert.ok(proposal.resourceRequirements.every(item => item.kind && item.description && item.authority));
  assert.ok(proposal.authorization, "proposal must state its execution boundary");
}
assert.ok(response.hearingDecision.notAuthorized.includes("construction"));
assert.ok(response.hearingDecision.notAuthorized.includes("procurement"));
assert.ok(response.hearingDecision.notAuthorized.includes("payment"));
assert.ok(response.hearingDecision.authorizations.some(item => item.includes("before any construction or expenditure")));
assert.ok(response.residentImpacts.every(item => item.assessment === "qualitative-unmeasured"));
assert.equal(response.institutionalTrust.noAggregateScore, true);
assert.equal(response.institutionalTrust.noAutomaticTrustGain, true);
assert.ok(response.institutionalTrust.limitations.length > 0);

console.log("Civic process contract validated: versioned response shape, authority, proposal, oversight and impact references.");
