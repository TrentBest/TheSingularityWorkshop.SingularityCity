import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

async function read(path) {
  return readFile(new URL("../" + path, import.meta.url), "utf8");
}

const scenario = JSON.parse(await read("data/scenarios/greenhollow-civic-stress-test.json"));
const election = JSON.parse(await read("data/elections/greenhollow-reeve-election.json"));

assert.equal(scenario.status, "authored-cross-domain-fixture-not-live-simulation");
assert.equal(scenario.reality, "fictional-scenario");
assert.ok(scenario.linkedFixtures.includes(election.id));
assert.equal(scenario.setting.placeId, election.jurisdiction.id);

function uniqueIndex(records, label) {
  const ids = records.map(record => record.id);
  assert.equal(new Set(ids).size, ids.length, label + " IDs must be unique");
  return new Map(records.map(record => [record.id, record]));
}

const actors = uniqueIndex(scenario.actors, "actor");
const events = uniqueIndex(scenario.timeline, "event");
const claims = uniqueIndex(scenario.claims, "claim");
const evidence = uniqueIndex(scenario.evidence, "evidence");
const findings = uniqueIndex(scenario.findings, "finding");

for (const event of scenario.timeline) {
  assert.ok(actors.has(event.actorId), "event actor must be declared: " + event.id);
  for (const id of event.claimIds ?? []) assert.ok(claims.has(id), "event claim must exist: " + id);
  for (const id of event.evidenceIds ?? []) assert.ok(evidence.has(id), "event evidence must exist: " + id);
  if (event.findingId) assert.ok(findings.has(event.findingId), "event finding must exist: " + event.findingId);
}
assert.deepEqual(
  scenario.timeline.map(event => event.sequence),
  scenario.timeline.map((_, index) => index + 1),
  "timeline sequence must be contiguous and deterministic"
);

for (const claim of scenario.claims) {
  assert.ok(actors.has(claim.subjectId), "claim subject must be declared: " + claim.id);
  assert.ok(actors.has(claim.claimantId), "claimant must be declared: " + claim.id);
  assert.ok(events.has(claim.sourceEventId), "claim source event must exist: " + claim.id);
  for (const id of claim.evidenceIds) assert.ok(evidence.has(id), "claim evidence must exist: " + id);
  if (claim.findingId) assert.ok(findings.has(claim.findingId), "claim finding must exist: " + claim.id);
}

for (const item of scenario.evidence) {
  assert.ok(actors.has(item.sourceActorId), "evidence source actor must be declared: " + item.id);
  assert.ok(events.has(item.sourceEventId), "evidence source event must exist: " + item.id);
  assert.ok(item.provenance, "evidence provenance is required: " + item.id);
  assert.ok(Array.isArray(item.supports) && item.supports.length > 0, "evidence must state what it supports: " + item.id);
  assert.ok(Array.isArray(item.doesNotEstablish) && item.doesNotEstablish.length > 0, "evidence must state its limits: " + item.id);
}

for (const finding of scenario.findings) {
  assert.ok(actors.has(finding.authorityId), "finding authority must be declared: " + finding.id);
  assert.ok(actors.has(finding.subjectId), "finding subject must be declared: " + finding.id);
  for (const id of finding.claimIds) assert.ok(claims.has(id), "finding claim must exist: " + id);
  for (const id of finding.evidenceIds) assert.ok(evidence.has(id), "finding evidence must exist: " + id);
  assert.ok(finding.scope && finding.limitations.length > 0, "finding must state scope and limitations: " + finding.id);
}

const observation = events.get("event-01-storm-damage");
const rumor = events.get("event-02-rumor");
const vigilante = events.get("event-03-vigilante-claim");
const investigation = events.get("event-04-investigation");
const justice = events.get("event-05-court-review");
const correction = events.get("event-06-correction");

assert.equal(observation.claimStatus, "none");
assert.equal(observation.attribution, "storm-damage-observed; no person is attributed");
assert.deepEqual(observation.evidenceIds, ["evidence-crossing-condition"]);
assert.equal(rumor.claimStatus, "unverified-allegation");
assert.equal(rumor.evidenceStatus, "no-supporting-evidence-attached");
assert.deepEqual(rumor.evidenceIds, []);
assert.deepEqual(vigilante.evidenceIds, []);
assert.equal(vigilante.authority, "self-appointed; no public enforcement authority");
assert.equal(investigation.reviewerId, "independent-reviewer");
assert.equal(justice.findingStatus, "not-established-on-present-record");
assert.equal(justice.findingId, "finding-iven-responsibility");
assert.equal(correction.claimStatus, "corrected");
assert.equal(correction.evidenceStatus, "provenance-retained");

const finding = findings.get("finding-iven-responsibility");
assert.equal(finding.outcome, "not-established-on-present-record");
assert.ok(finding.limitations.some(value => value.includes("does not identify who caused")));
assert.ok(finding.limitations.some(value => value.includes("no further evidence could ever be found")));

const observationEvidence = evidence.get("evidence-crossing-condition");
assert.ok(observationEvidence.supports.includes("crossing-damage-exists"));
assert.ok(observationEvidence.doesNotEstablish.some(value => value.includes("who caused")));
assert.ok(!observationEvidence.supports.includes("resident-iven-caused-damage"));


const response = scenario.civicResponse;
assert.equal(response.status, "authored-hearing-outcome-fixture-not-live-civic-process");
assert.equal(response.hearingEventId, "event-07-civic-hearing");
const proposalIds = new Set(response.proposals.map(item => item.id));
assert.equal(proposalIds.size, response.proposals.length, "repair proposal IDs must be unique");
for (const proposal of response.proposals) {
  assert.ok(proposal.resourceRequirements.length > 0, "each proposal must expose resource requirements");
  assert.ok(proposal.resourceRequirements.every(item => item.authority && item.description), "requirements must identify scope and authority");
  assert.ok(proposal.authorization, "proposal must state its authorization boundary");
}
const decision = response.hearingDecision;
assert.ok(actors.has(decision.authorityId), "hearing decision authority must be declared");
assert.ok(events.has(decision.sourceEventId), "hearing decision source event must exist");
for (const id of decision.selectedProposalIds) assert.ok(proposalIds.has(id), "decision proposal must exist: " + id);
assert.ok(decision.notAuthorized.includes("construction"));
assert.ok(decision.notAuthorized.includes("payment"));
assert.ok(decision.permittedActions.some(value => value.includes("before any construction or expenditure")));
for (const obligation of response.oversightObligations) {
  assert.ok(actors.has(obligation.responsibleActorId), "oversight owner must be declared: " + obligation.id);
  assert.ok(obligation.trigger && obligation.obligation && obligation.evidenceExpected, "oversight obligation must be actionable and auditable");
}
for (const impact of response.residentImpacts) {
  assert.equal(impact.assessment, "qualitative-unmeasured", "resident impact must not imply unsupported measurement");
  assert.ok(impact.affectedGroup && impact.concern && impact.followUp);
}
assert.equal(response.institutionalTrust.noAggregateScore, true);
assert.equal(response.institutionalTrust.noAutomaticTrustGain, true);
assert.ok(response.institutionalTrust.dimensions.length >= 3);
assert.ok(response.institutionalTrust.limitations.length > 0);

assert.equal(scenario.electionPresentation.fixtureId, election.id);
assert.equal(scenario.electionPresentation.advertisementsRemainAttributed, true);
assert.equal(scenario.electionPresentation.advertisementClaimsAreAutomaticallyVerified, false);
assert.deepEqual(scenario.electionPresentation.presentationDensityOptions, election.presentation.availableDensity);
assert.equal(scenario.electionPresentation.mutingChangesPresentationOnly, true);

for (const [key, expected] of Object.entries({
  allegationIsNotEvidence: true,
  evidenceIsNotFinding: true,
  findingIsScopedNotOmniscientTruth: true,
  rumorRetainsSourceAndUncertainty: true,
  vigilanteRoleCreatesNoPublicAuthority: true,
  privateIdentityIsNotAutomaticallyDisclosed: true,
  noVoterProfiling: true,
  noPersistentPlayerBallotInFixture: true,
  ballotPrivacyRemainsSecret: true,
  noExternalAdvertisingNetwork: true,
  noOperationalInstructionForViolenceOrCoercion: true,
  economyRemainsAuthorityForCampaignTransactions: true,
  cityDoesNotReimplementPhysicsOrEconomy: true
})) {
  assert.equal(scenario.invariants[key], expected, "scenario invariant failed: " + key);
}

assert.equal(election.playerParticipation.ballotChoiceStoredInThisFixture, false);
assert.equal(election.rules.ballot, "secret");
console.log("Greenhollow civic stress-test validated: " + scenario.timeline.length + " events, " + scenario.claims.length + " claims, " + scenario.evidence.length + " evidence records, " + scenario.findings.length + " scoped findings.");
