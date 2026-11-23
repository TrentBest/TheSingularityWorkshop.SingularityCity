import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const fixture = JSON.parse(await readFile(new URL("../data/elections/greenhollow-reeve-election.json", import.meta.url), "utf8"));
assert.equal(fixture.status, "authored-fixture-not-live-election");
assert.equal(fixture.reality, "fictional-scenario");
assert.equal(fixture.rules.ballot, "secret");
assert.equal(fixture.rules.method, "plurality");
assert.equal(fixture.candidates.length, 3);
assert.equal(fixture.campaignAdvertisements.length, 3);
for (const ad of fixture.campaignAdvertisements) {
  assert.ok(ad.sponsor, "campaign messages require sponsor attribution");
  assert.ok(fixture.candidates.some(candidate => candidate.id === ad.candidateId));
  assert.equal(ad.isVerifiedPolicyClaim, false, "advertising must not silently become verified fact");
}
assert.deepEqual(fixture.presentation.availableDensity, ["quiet", "ordinary", "saturated", "muted"]);
assert.equal(fixture.presentation.mutingHidesPresentationOnly, true);
assert.equal(fixture.presentation.mutingChangesCampaignHistory, false);
assert.equal(fixture.playerParticipation.mayAbstain, true);
assert.equal(fixture.playerParticipation.abstentionPenalty, false);
assert.equal(fixture.playerParticipation.ballotSelectionPublic, false);
assert.equal(fixture.playerParticipation.ballotChoiceStoredInThisFixture, false);
assert.equal(fixture.countFixture.validBallots, 36);
assert.equal(Object.values(fixture.countFixture.votesByCandidate).reduce((a, b) => a + b, 0), 36);
assert.equal(fixture.countFixture.resultStatus, "illustrative-preliminary-count-not-certified");
assert.equal(fixture.boundaries.noVoterProfiling, true);
assert.equal(fixture.boundaries.noBallotCustodyImplementation, true);
assert.equal(fixture.boundaries.noPersistentPlayerVote, true);
console.log("Greenhollow election fixture validated.");
