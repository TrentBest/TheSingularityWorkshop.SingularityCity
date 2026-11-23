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

const actorIds = new Set(scenario.actors.map(actor => actor.id));
assert.equal(actorIds.size, scenario.actors.length, "actor IDs must be unique");
for (const event of scenario.timeline) {
  assert.ok(actorIds.has(event.actorId), "event actor must be declared: " + event.id);
}
assert.deepEqual(
  scenario.timeline.map(event => event.sequence),
  scenario.timeline.map((_, index) => index + 1),
  "timeline sequence must be contiguous and deterministic"
);
assert.equal(new Set(scenario.timeline.map(event => event.id)).size, scenario.timeline.length);

const observation = scenario.timeline.find(event => event.id === "event-01-storm-damage");
const rumor = scenario.timeline.find(event => event.id === "event-02-rumor");
const vigilante = scenario.timeline.find(event => event.id === "event-03-vigilante-claim");
const justice = scenario.timeline.find(event => event.id === "event-05-court-review");
const correction = scenario.timeline.find(event => event.id === "event-06-correction");
assert.equal(observation.claimStatus, "none");
assert.equal(observation.attribution, "storm-damage-observed; no person is attributed");
assert.equal(rumor.claimStatus, "unverified-allegation");
assert.equal(rumor.evidenceStatus, "no-supporting-evidence-attached");
assert.equal(vigilante.authority, "self-appointed; no public enforcement authority");
assert.equal(justice.findingStatus, "not-established-on-present-record");
assert.equal(correction.claimStatus, "corrected");
assert.equal(correction.evidenceStatus, "provenance-retained");

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
console.log("Greenhollow civic stress-test validated: " + scenario.timeline.length + " ordered events.");
