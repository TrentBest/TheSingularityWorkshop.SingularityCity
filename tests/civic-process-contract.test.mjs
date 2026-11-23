import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { evaluateCivicAuthorization } from "../assets/js/civic-authorization-gate.mjs";

const readJson = async path => JSON.parse(await readFile(new URL("../" + path, import.meta.url), "utf8"));
const schema = await readJson("schemas/civic-process-response.schema.json");
const scenario = await readJson("data/scenarios/greenhollow-civic-stress-test.json");
const response = scenario.civicResponse;

assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
assert.equal(schema.properties.schema.const, "singularity-city.civic-process-response.v1");
assert.equal(schema.additionalProperties, false);
assert.deepEqual(
  schema.required,
  ["schema", "id", "status", "hearingEventId", "proposals", "authorizations", "executionEvidence", "outcomeReviews", "hearingDecision", "oversightObligations", "residentImpacts", "institutionalTrust"]
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
assert.deepEqual(response.hearingDecision.authorizations, [], "the hearing decision must not mint executable authorizations");
assert.ok(response.hearingDecision.permittedActions.some(item => item.includes("before any construction or expenditure")));
assert.deepEqual(response.authorizations, [], "no separate grant exists in the Greenhollow fixture");
assert.deepEqual(response.executionEvidence, [], "no execution may be recorded without a grant");
assert.deepEqual(response.outcomeReviews, [], "no outcome review may imply unrecorded execution");
assert.ok(response.authorizations.every(item => item.status === "granted" || item.status === "suspended" || item.status === "revoked" || item.status === "expired" || item.status === "denied"));
assert.ok(response.executionEvidence.every(item => { const auth = response.authorizations.find(candidate => candidate.id === item.authorizationId); return auth && auth.action === item.action && auth.subjectId === item.subjectId && auth.executorId === item.executorId; }), "execution evidence must match its authorization scope and executor");
assert.ok(response.outcomeReviews.every(item => item.authorizationIds.every(id => response.authorizations.some(auth => auth.id === id)) && item.executionEvidenceIds.every(id => response.executionEvidence.some(evidence => evidence.id === id))), "outcome reviews must reference source authorization and execution records");
assert.ok(response.residentImpacts.every(item => item.assessment === "qualitative-unmeasured"));
assert.equal(response.institutionalTrust.noAggregateScore, true);
assert.equal(response.institutionalTrust.noAutomaticTrustGain, true);
assert.ok(response.institutionalTrust.limitations.length > 0);


const grant = {
  id: "authorization-test-001",
  sourceDecisionId: response.hearingDecision.id,
  grantingAuthorityId: "village-assembly",
  jurisdiction: "Greenhollow north-road crossing civic works",
  action: "open-temporary-route",
  subjectId: "north-road-temporary-route",
  scope: "Open only the inspected temporary route identified by this subject ID",
  exclusions: ["construction", "procurement", "payment"],
  prerequisiteEvidenceIds: ["safety-review-001"],
  conditions: [{ id: "maintain-approved-configuration", description: "Maintain the approved accessible route configuration" }],
  executorId: "civic-works-provider",
  validFrom: "2026-11-23T00:00:00Z",
  expiresAt: "2026-11-24T00:00:00Z",
  status: "granted",
  requiredExecutionEvidence: ["dated-opening-inspection"],
  reviewPath: "independent-reviewer"
};
validateSchema(grant, schema.$defs.authorization, "$authorization");
const executionRecord = {
  id: "execution-test-001",
  authorizationId: grant.id,
  proposalId: "repair-proposal-temporary-access",
  action: grant.action,
  subjectId: grant.subjectId,
  executorId: grant.executorId,
  occurredAt: "2026-11-23T13:00:00Z",
  status: "completed",
  evidence: [{ id: "opening-inspection-001", kind: "inspection", source: "independent-reviewer", provenance: "dated fictional fixture evidence" }],
  limitations: ["Synthetic schema-conformance record only"]
};
validateSchema(executionRecord, schema.$defs.executionEvidence, "$executionEvidence");
const outcomeReviewRecord = {
  id: "outcome-review-test-001",
  decisionId: response.hearingDecision.id,
  authorizationIds: [grant.id],
  executionEvidenceIds: [executionRecord.id],
  reviewerId: "independent-reviewer",
  reviewedAt: "2026-11-23T14:00:00Z",
  intendedOutcome: "Provide a safe accessible temporary route",
  observedOutcome: "The inspected route opened within the authorized scope",
  disposition: "achieved",
  unresolvedImpacts: ["Long-term crossing restoration remains unresolved"],
  followUp: "Return permanent rebuild options to the assembly"
};
validateSchema(outcomeReviewRecord, schema.$defs.outcomeReview, "$outcomeReview");
const gateInput = {
  authorization: grant,
  action: "open-temporary-route",
  subjectId: "north-road-temporary-route",
  executorId: "civic-works-provider",
  at: "2026-11-23T12:00:00Z",
  satisfiedPrerequisiteEvidenceIds: ["safety-review-001"],\n  satisfiedConditionIds: ["maintain-approved-configuration"]
};
assert.equal(evaluateCivicAuthorization(gateInput).executable, true, "a valid, scoped grant with prerequisites may pass the gate");
assert.ok(evaluateCivicAuthorization({ ...gateInput, authorization: null }).reasons.includes("authorization-missing"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, at: "2026-11-24T00:00:00Z" }).reasons.includes("authorization-expired"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, action: "construction" }).reasons.includes("action-out-of-scope"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, subjectId: "different-route" }).reasons.includes("subject-out-of-scope"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, satisfiedPrerequisiteEvidenceIds: [] }).reasons.includes("prerequisite-unsatisfied:safety-review-001"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, authorization: { ...grant, status: "revoked" } }).reasons.includes("authorization-not-granted"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, executorId: "unlisted-provider" }).reasons.includes("executor-not-authorized"));\nassert.ok(evaluateCivicAuthorization({ ...gateInput, jurisdiction: "outside-jurisdiction" }).reasons.includes("jurisdiction-out-of-scope"));\nassert.ok(evaluateCivicAuthorization({ ...gateInput, satisfiedConditionIds: [] }).reasons.includes("condition-unsatisfied:maintain-approved-configuration"));\nassert.ok(evaluateCivicAuthorization({ ...gateInput, at: "not-a-timestamp" }).reasons.includes("invalid-authorization-time"));

console.log("Civic process contract validated: versioned response shape, authority, proposal, oversight and impact references.");
