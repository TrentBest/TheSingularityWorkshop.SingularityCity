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
