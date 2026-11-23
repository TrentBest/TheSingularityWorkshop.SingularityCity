# Greenhollow — Civic Trust Under Pressure

![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

**Status:** authored cross-domain scenario fixture; not a live simulation.

The [machine-readable fixture](../data/scenarios/greenhollow-civic-stress-test.json) exercises the City civic sourcebooks together without pretending that their runtime systems already exist. It reuses the [Greenhollow reeve election fixture](../data/elections/greenhollow-reeve-election.json) rather than inventing a second election model.

## Scenario

A severe storm damages Greenhollow's north road crossing shortly before a reeve election. The observed damage is real within the fictional scenario; responsibility is not attributed to a person. Rumors then circulate, a self-appointed vigilante called Lantern publicly claims to know who is responsible, and an antagonist exploits the uncertainty to weaken trust and gain influence over rebuilding.

The scenario follows the distinction between:

1. **Observation** — the crossing is damaged after a storm.
2. **Allegation** — a rumor names a resident; the source and uncertainty remain attached.
3. **Public claim** — Lantern repeats the accusation without recognized authority or disclosed evidence.
4. **Investigation** — officials preserve observations and provenance without presuming guilt.
5. **Finding** — the available record does not establish the accused resident's responsibility.
6. **Correction** — the public record is corrected without erasing the history of the original rumor.
7. **Civic deliberation** — the assembly hears residents on repair priorities, communication and oversight.

A finding is scoped to the available record; it is not omniscient truth. The fixture does not silently convert rumor into evidence or evidence into a legal finding.

## Domain ownership

| Concern | Authority |
|---|---|
| Residents, identities, motives and relationships | City — Nonplayer Characters |
| Antagonist and vigilante roles | City — Villains & Antagonists; Vigilantes & Civic Justice |
| Official response and investigation | City — Law Enforcement & Public Safety |
| Findings, remedies and correction | City — Justice, Courts & Restitution |
| Public hearing and institutional response | City — Governance & Civic Administration |
| Election rules and campaign presentation | City — Elections & Player Participation |
| Campaign transactions | Economy |
| Physical storm and crossing damage models | Physics |

The scenario fixture is a City-owned integration artifact. It references Economy and Physics boundaries without implementing their systems or creating shadow ledgers, physical solvers or duplicate authority.

## Player participation

Players can provide aid, report observations, challenge unsupported accusations, request independent review, attend the public hearing, or participate in the election if eligible. Abstention remains valid and carries no penalty. Election advertising remains attributed to its sponsor; changing the presentation density changes what is displayed, not the underlying campaign history. Ballots remain secret.

The fixture contains no persistent player ballot, voter profile, external advertising network, real-world candidate, operational instruction for violence or coercion, or real account identity.

## Validation

The test at tests/greenhollow-civic-stress-test.test.mjs verifies deterministic event order, declared actor references, the observation/allegation/evidence/finding distinctions, correction provenance, election-fixture linkage, ballot privacy and domain boundaries.

The Pages build runs this test alongside the existing sourcebook, election and terrain checks. Passing the test proves the authored fixture is internally consistent; it does not prove a live investigation, court, election, civic simulation or player-facing experience exists.
