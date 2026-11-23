import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { evaluateCivicAuthorization } from "../assets/js/civic-authorization-gate.mjs";

const readJson = async path => JSON.parse(await readFile(new URL("../" + path, import.meta.url), "utf8"));
const schema = await readJson("schemas/civic-process-response.schema.json");
const hostContextSchema = await readJson("schemas/civic-authorization-host-context.schema.json");
const hostContractDoc = await readFile(new URL("../docs/CIVIC_AUTHORIZATION_HOST_CONTRACT.md", import.meta.url), "utf8");
const scenario = await readJson("data/scenarios/greenhollow-civic-stress-test.json");
const response = scenario.civicResponse;

assert.equal(schema.$schema, "https://json-schema.org/draft/2020-12/schema");
assert.equal(schema.properties.schema.const, "singularity-city.civic-process-response.v1");
assert.equal(schema.additionalProperties, false);
assert.equal(hostContextSchema.properties.schema.const, "singularity-city.civic-authorization-host-context.v1");
assert.ok(hostContractDoc.includes("Trust boundary"));
assert.ok(hostContractDoc.includes("The schema validates structure only."));
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
  if (Object.hasOwn(definition, "const")) assert.equal(value, definition.const, path + " must equal its schema constant");
  if (definition.type === "object") {
    assert.ok(value !== null && typeof value === "object" && !Array.isArray(value), path + " must be an object");
    for (const key of definition.required ?? []) assert.ok(Object.hasOwn(value, key), path + "." + key + " is required");
    if (definition.additionalProperties === false) {
      for (const key of Object.keys(value)) assert.ok(Object.hasOwn(definition.properties ?? {}, key), path + "." + key + " is not declared");
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
    if (definition.enum) assert.ok(definition.enum.includes(value), path + " must be an allowed value");
  } else if (definition.type === "boolean") {
    assert.equal(typeof value, "boolean", path + " must be a boolean");
  }
}
validateSchema(response, schema);
const hostContext = {
  schema: "singularity-city.civic-authorization-host-context.v1",
  requestId: "host-request-test-001",
  principal: { principalId: "civic-works-provider", authenticatedAt: "2026-11-23T11:59:00Z", authenticationMethod: "service-identity", identityEvidenceRef: "identity-evidence-001", issuerId: "test-identity-issuer" },
  authority: { authorityId: "village-assembly", jurisdiction: "Greenhollow north-road crossing civic works", sourceDecisionId: "hearing-decision-001", authorityEvidenceRef: "authority-evidence-001", verifiedBy: "host-authority-verifier", verifiedAt: "2026-11-23T11:59:30Z" },
  clock: { instant: "2026-11-23T12:00:00Z", sourceId: "host-trusted-clock", observedAt: "2026-11-23T12:00:00Z", clockEvidenceRef: "clock-evidence-001" },
  prerequisiteEvidence: [{ id: "safety-review-001", status: "verified", sourceId: "independent-reviewer", evidenceRef: "safety-review-record-001", verifiedBy: "host-evidence-verifier", verifiedAt: "2026-11-23T11:58:00Z" }],
  conditionEvaluations: [{ id: "maintain-approved-configuration", status: "satisfied", evaluatorId: "accessibility-inspector", evidenceRefs: ["configuration-inspection-001"], evaluatedAt: "2026-11-23T11:58:30Z" }],
  revocation: { status: "clear", checkedAt: "2026-11-23T12:00:00Z", sourceId: "authority-revocation-register", evidenceRef: "revocation-check-001" },
  audit: { eventId: "authorization-evaluation-001", correlationId: "host-request-test-001", recordedAt: "2026-11-23T12:00:00Z", sinkId: "host-audit-store" }
};
validateSchema(hostContext, hostContextSchema, "$hostContext");
for (const section of [hostContext.principal, hostContext.authority, hostContext.clock, hostContext.revocation, hostContext.audit]) {
  for (const value of Object.values(section)) assert.ok(typeof value === "string" && value.length > 0, "host context attestations must be explicit");
}
assert.equal(hostContext.revocation.status, "clear", "synthetic host context is clear only for schema conformance");
assert.ok(hostContext.prerequisiteEvidence.every(item => item.status === "verified"));
assert.ok(hostContext.conditionEvaluations.every(item => item.status === "satisfied"));
assert.equal(response.status, "authored-hearing-outcome-fixture-not-live-civic-process");
assert.ok(scenario.timeline.some(event => event.id === response.hearingEventId), "response must reference an existing hearing event");

const unique = (items, label) => {
  const ids = items.map(item => item.id);
  assert.equal(new Set(ids).size, ids.length, label + " IDs must be unique");
};
unique(response.proposals, "proposal");
unique(response.authorizations, "authorization");
unique(response.executionEvidence, "execution evidence");
unique(response.outcomeReviews, "outcome review");
unique(response.oversightObligations, "oversight");
unique(response.residentImpacts, "resident impact");
unique(response.institutionalTrust.dimensions, "trust dimension");

const actors = new Set(scenario.actors.map(actor => actor.id));
const events = new Set(scenario.timeline.map(event => event.id));
const proposals = new Set(response.proposals.map(proposal => proposal.id));
const authorizationIds = new Set(response.authorizations.map(item => item.id));
const executionIds = new Set(response.executionEvidence.map(item => item.id));
const decision = response.hearingDecision;
assert.ok(actors.has(decision.authorityId), "decision authority must exist");
assert.ok(actors.has(response.institutionalTrust.institutionId), "trust institution must exist");
assert.ok(events.has(decision.sourceEventId), "decision source event must exist");
assert.deepEqual([...decision.selectedProposalIds].sort(), [...proposals].sort(), "every proposal must be accounted for");
assert.ok(decision.authorizations.every(id => authorizationIds.has(id)), "decision authorization IDs must resolve");
for (const authorization of response.authorizations) {
  assert.equal(authorization.sourceDecisionId, decision.id, "authorization must cite the decision that grants its basis");
  assert.ok(actors.has(authorization.grantingAuthorityId), "granting authority must exist");
  assert.ok(actors.has(authorization.executorId), "authorized executor must exist");
}
for (const execution of response.executionEvidence) {
  const authorization = response.authorizations.find(item => item.id === execution.authorizationId);
  assert.ok(authorization, "execution evidence must cite an existing authorization");
  assert.ok(proposals.has(execution.proposalId), "execution evidence must cite an existing proposal");
  assert.equal(execution.action, authorization.action, "executed action must match authorization");
  assert.equal(execution.subjectId, authorization.subjectId, "executed subject must match authorization");
  assert.equal(execution.executorId, authorization.executorId, "executor must match authorization");
  assert.ok(Date.parse(execution.occurredAt) >= Date.parse(authorization.validFrom), "execution must not precede authorization");
  assert.ok(Date.parse(execution.occurredAt) < Date.parse(authorization.expiresAt), "execution must occur before authorization expiry");
}
for (const review of response.outcomeReviews) {
  assert.equal(review.decisionId, decision.id, "outcome review must cite the decision under review");
  assert.ok(review.authorizationIds.length > 0, "outcome review must identify its authorizations");
  assert.ok(review.executionEvidenceIds.length > 0, "outcome review must identify the execution being reviewed");
  assert.ok(review.authorizationIds.every(id => authorizationIds.has(id)), "outcome review authorization IDs must resolve");
  assert.ok(review.executionEvidenceIds.every(id => executionIds.has(id)), "outcome review execution IDs must resolve");
  assert.ok(response.executionEvidence.filter(item => review.executionEvidenceIds.includes(item.id)).every(item => review.authorizationIds.includes(item.authorizationId)), "reviewed execution must belong to a listed authorization");
  assert.ok(actors.has(review.reviewerId), "outcome reviewer must exist");
}
for (const obligation of response.oversightObligations) {
  assert.ok(actors.has(obligation.responsibleActorId), "oversight owner must exist: " + obligation.id);
  assert.ok(obligation.trigger && obligation.obligation && obligation.evidenceExpected);
}
for (const proposal of response.proposals) {
  assert.ok(proposal.resourceRequirements.length > 0);
  assert.ok(proposal.resourceRequirements.every(item => item.kind && item.description && item.authority));
  assert.ok(proposal.authorization, "proposal must state its execution boundary");
}
assert.ok(decision.notAuthorized.includes("construction"));
assert.ok(decision.notAuthorized.includes("procurement"));
assert.ok(decision.notAuthorized.includes("payment"));
assert.deepEqual(decision.authorizations, [], "the hearing decision must not mint executable authorizations");
assert.ok(decision.permittedActions.some(item => item.includes("before any construction or expenditure")));
assert.deepEqual(response.authorizations, [], "no separate grant exists in the Greenhollow fixture");
assert.deepEqual(response.executionEvidence, [], "no execution may be recorded without a grant");
assert.deepEqual(response.outcomeReviews, [], "no outcome review may imply unrecorded execution");
assert.ok(response.residentImpacts.every(item => item.assessment === "qualitative-unmeasured"));
assert.equal(response.institutionalTrust.noAggregateScore, true);
assert.equal(response.institutionalTrust.noAutomaticTrustGain, true);
assert.ok(response.institutionalTrust.limitations.length > 0);

function validateLinkedRecords(candidate, candidateScenario) {
  const candidateActors = new Set(candidateScenario.actors.map(actor => actor.id));
  const candidateProposals = new Set(candidate.proposals.map(item => item.id));
  const candidateAuthorizations = new Map(candidate.authorizations.map(item => [item.id, item]));
  const candidateExecutions = new Map(candidate.executionEvidence.map(item => [item.id, item]));
  const candidateDecision = candidate.hearingDecision;

  assert.ok(candidateDecision.authorizations.every(id => candidateAuthorizations.has(id)), "decision authorization references must resolve");
  assert.deepEqual([...candidateDecision.authorizations].sort(), [...candidateAuthorizations.keys()].sort(), "decision must enumerate every authorization issued from it");
  for (const authorization of candidate.authorizations) {
    assert.equal(authorization.sourceDecisionId, candidateDecision.id, "authorization must be based on this decision");
    assert.ok(candidateProposals.has(authorization.proposalId), "authorization proposal reference must resolve");
    assert.ok(candidateActors.has(authorization.grantingAuthorityId), "authorization granting authority must exist");
    assert.ok(candidateActors.has(authorization.executorId), "authorization executor must exist");
    assert.ok(Date.parse(authorization.validFrom) < Date.parse(authorization.expiresAt), "authorization validity window must be ordered");
  }
  for (const execution of candidate.executionEvidence) {
    const authorization = candidateAuthorizations.get(execution.authorizationId);
    assert.ok(authorization, "execution authorization reference must resolve");
    assert.ok(candidateProposals.has(execution.proposalId), "execution proposal reference must resolve");
    assert.equal(execution.proposalId, authorization.proposalId, "execution proposal must match authorization");
    assert.equal(execution.action, authorization.action, "execution action must match authorization");
    assert.equal(execution.subjectId, authorization.subjectId, "execution subject must match authorization");
    assert.equal(execution.executorId, authorization.executorId, "execution executor must match authorization");
    assert.ok(Date.parse(execution.occurredAt) >= Date.parse(authorization.validFrom), "execution must not precede authorization");
    assert.ok(Date.parse(execution.occurredAt) < Date.parse(authorization.expiresAt), "execution must precede authorization expiry");
    const evidenceIds = new Set(execution.evidence.map(item => item.id));
    assert.ok(authorization.requiredExecutionEvidence.every(id => evidenceIds.has(id)), "execution must include all required evidence");
  }
  for (const review of candidate.outcomeReviews) {
    assert.equal(review.decisionId, candidateDecision.id, "outcome review must cite the decision under review");
    assert.ok(candidateActors.has(review.reviewerId), "outcome reviewer must exist");
    assert.ok(review.authorizationIds.length > 0 && review.executionEvidenceIds.length > 0, "outcome review must cite authorizations and execution");
    assert.ok(review.authorizationIds.every(id => candidateAuthorizations.has(id)), "outcome authorization references must resolve");
    assert.ok(review.executionEvidenceIds.every(id => candidateExecutions.has(id)), "outcome execution references must resolve");
    const reviewedExecutions = review.executionEvidenceIds.map(id => candidateExecutions.get(id));
    assert.ok(reviewedExecutions.every(item => review.authorizationIds.includes(item.authorizationId)), "reviewed execution must belong to a listed authorization");
    assert.ok(reviewedExecutions.every(item => Date.parse(review.reviewedAt) >= Date.parse(item.occurredAt)), "outcome review cannot precede execution");
  }
}
validateLinkedRecords(response, scenario);

const grant = {
  id: "authorization-test-001",
  sourceDecisionId: decision.id,
  proposalId: "repair-proposal-temporary-access",
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
  proposalId: grant.proposalId,
  action: grant.action,
  proposalId: grant.proposalId,
  subjectId: grant.subjectId,
  executorId: grant.executorId,
  occurredAt: "2026-11-23T13:00:00Z",
  status: "completed",
  evidence: [{ id: "dated-opening-inspection", kind: "inspection", source: "independent-reviewer", provenance: "dated fictional fixture evidence" }],
  limitations: ["Synthetic schema-conformance record only"]
};
validateSchema(executionRecord, schema.$defs.executionEvidence, "$executionEvidence");
const outcomeReviewRecord = {
  id: "outcome-review-test-001",
  decisionId: decision.id,
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
const syntheticActors = new Set([...actors, grant.executorId]);
const syntheticResponse = {
  ...response,
  authorizations: [grant],
  executionEvidence: [executionRecord],
  outcomeReviews: [outcomeReviewRecord],
  hearingDecision: { ...decision, authorizations: [grant.id] }
};
const syntheticScenario = { ...scenario, actors: [...scenario.actors, { id: grant.executorId }] };
assert.ok(syntheticActors.has(grant.grantingAuthorityId));
assert.ok(syntheticActors.has(grant.executorId));
assert.ok(proposals.has(executionRecord.proposalId));
assert.ok(authorizationIds.size === 0 && executionIds.size === 0, "base fixture remains empty before synthetic records are added");
assert.equal(syntheticResponse.authorizations[0].id, syntheticResponse.hearingDecision.authorizations[0]);
assert.equal(syntheticResponse.executionEvidence[0].authorizationId, syntheticResponse.authorizations[0].id);
assert.equal(syntheticResponse.outcomeReviews[0].executionEvidenceIds[0], syntheticResponse.executionEvidence[0].id);
assert.ok(syntheticScenario.actors.some(actor => actor.id === outcomeReviewRecord.reviewerId));
validateLinkedRecords(syntheticResponse, syntheticScenario);
assert.throws(
  () => validateLinkedRecords({ ...syntheticResponse, executionEvidence: [{ ...executionRecord, executorId: "unlisted-provider" }] }, syntheticScenario),
  /execution executor must match authorization/,
  "cross-record validation must reject an executor mismatch"
);
assert.throws(
  () => validateLinkedRecords({ ...syntheticResponse, executionEvidence: [{ ...executionRecord, proposalId: "missing-proposal" }] }, syntheticScenario),
  /execution proposal reference must resolve/,
  "cross-record validation must reject an unknown proposal"
);
assert.throws(
  () => validateLinkedRecords({ ...syntheticResponse, outcomeReviews: [{ ...outcomeReviewRecord, executionEvidenceIds: ["missing-execution"] }] }, syntheticScenario),
  /outcome execution references must resolve/,
  "cross-record validation must reject an unknown execution record"
);

const gateInput = {
  authorization: grant,
  proposalId: grant.proposalId,
  jurisdiction: grant.jurisdiction,
  action: grant.action,
  subjectId: grant.subjectId,
  executorId: grant.executorId,
  at: "2026-11-23T12:00:00Z",
  satisfiedPrerequisiteEvidenceIds: ["safety-review-001"],
  satisfiedConditionIds: ["maintain-approved-configuration"]
};
assert.equal(hostContext.principal.principalId, grant.executorId, "host-authenticated principal must supply executor identity");
assert.equal(hostContext.authority.authorityId, grant.grantingAuthorityId, "host must verify the granting authority");
assert.equal(hostContext.authority.jurisdiction, grant.jurisdiction, "host jurisdiction must match the grant");
assert.equal(hostContext.authority.sourceDecisionId, grant.sourceDecisionId, "host must verify the source decision");
assert.equal(hostContext.clock.instant, "2026-11-23T12:00:00Z", "policy time comes from the host clock");
assert.deepEqual(hostContext.prerequisiteEvidence.filter(item => item.status === "verified").map(item => item.id), gateInput.satisfiedPrerequisiteEvidenceIds);
assert.deepEqual(hostContext.conditionEvaluations.filter(item => item.status === "satisfied").map(item => item.id), gateInput.satisfiedConditionIds);
assert.equal(hostContext.revocation.status, "clear", "unknown or revoked host state must not be mapped to a passing gate");
assert.equal(evaluateCivicAuthorization(gateInput).executable, true, "a valid, scoped grant with prerequisites may pass the gate");
assert.ok(evaluateCivicAuthorization({ ...gateInput, authorization: null }).reasons.includes("authorization-missing"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, at: "2026-11-24T00:00:00Z" }).reasons.includes("authorization-expired"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, at: "2026-11-22T23:59:59Z" }).reasons.includes("authorization-not-yet-valid"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, action: "construction" }).reasons.includes("action-out-of-scope"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, proposalId: "different-proposal" }).reasons.includes("proposal-out-of-scope"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, subjectId: "different-route" }).reasons.includes("subject-out-of-scope"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, satisfiedPrerequisiteEvidenceIds: [] }).reasons.includes("prerequisite-unsatisfied:safety-review-001"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, authorization: { ...grant, status: "revoked" } }).reasons.includes("authorization-not-granted"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, authorization: { ...grant, status: "suspended" } }).reasons.includes("authorization-not-granted"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, executorId: "unlisted-provider" }).reasons.includes("executor-not-authorized"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, jurisdiction: "outside-jurisdiction" }).reasons.includes("jurisdiction-out-of-scope"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, satisfiedConditionIds: [] }).reasons.includes("condition-unsatisfied:maintain-approved-configuration"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, at: "not-a-timestamp" }).reasons.includes("invalid-authorization-time"));
assert.ok(evaluateCivicAuthorization({ ...gateInput, authorization: { ...grant, exclusions: [...grant.exclusions, grant.action] } }).reasons.includes("action-explicitly-excluded"));

console.log("Civic process contract validated: schema shape, authorization lifecycle, cross-record integrity, authority and evidence boundaries.");
