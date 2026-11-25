# Deterministic Greenhollow NPC Candidate Generation

This is the first executable City-owned generation slice. `scripts/generate-greenhollow-npc-candidates.mjs` deterministically produces three role-specific candidate suggestions from a declared seed and the existing commerce fixture: a market-stall keeper, a customer, and an itinerant visitor. Each candidate is attached to a resolvable City place; the visitor also references the existing north-track route.

The contract is defined by [npc-candidate-set.schema.json](../schemas/npc-candidate-set.schema.json), and the committed output is [greenhollow-candidates.json](../data/npc-generation/greenhollow-candidates.json). The test regenerates the committed fixture, checks same-seed repeatability and different-seed identity separation, and validates place/route references.

**Important boundary:** these are generated candidate suggestions, not completed Digiten/NPC records. Candidate IDs are generation artifact IDs, not person identities. Names are suggestions. Capability prompts are not character capabilities. The canonical SURPS character contract remains open in [SURPS issue #7](https://github.com/TrentBest/TheSingularityWorkshop.SingularityUniversalRoleplayingSystem/issues/7); City deliberately emits no competing character payload and marks every candidate as awaiting SURPS binding. No schedules, AI behavior, pathfinding, commerce, or physical movement are implied.

Once SURPS publishes its portable character contract, the next adapter should bind these candidate suggestions to validated SURPS character documents, then promote accepted identities into City resident/visitor records. Map actors and character sheets must resolve that same identity rather than minting their own IDs.
