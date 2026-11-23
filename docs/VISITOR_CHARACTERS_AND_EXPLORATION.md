# Visitor characters and the first explorable world

## Product intent

A visitor should be able to create a character, preserve that character as portable data, and enter an explorable experience that can receive the character. The destination should feel like a place to inhabit—not a static launcher, character-sheet form, or guided tour.

The first proof should be small enough to finish, but alive enough to invite wandering: a memorable arrival, a few distinct spaces, inhabitants or agents with visible routines, discoverable activities, and at least one meaningful interaction whose consequence can be observed.

## Ownership

- **SURPS** owns the shared character/entity ontology and roleplaying meaning. The visitor character is a SURPS entity, not a City-specific schema.
- **City** owns city geography, place identity, destination discovery, and City-owned resident/place relationships. City can host the character and provide a spatial doorway; it must not redefine the character.
- **Experience owner** owns its environment, activities, local rules, and experience-specific state.
- **FSM_COS / FSM_Execution and the host** compose and execute the experience, enforce access, manage sessions, and provide persistence boundaries.
- **Renderer / Visualize** present the same underlying world through textual and visual observation.
- **Physics** owns authoritative physical constraints and consequences where applicable.

## Separate three kinds of data

Do not collapse a character, a save game, and a session into one serialized blob.

1. **Character definition** — portable identity and authored character facts: stable character ID, schema/version metadata, identity/presentation, attributes, capabilities, anatomy or form where relevant, background, goals, and declared starting equipment. The final field vocabulary and semantics must be agreed with SURPS before becoming canonical.
2. **Experience progress** — destination-specific history: visited places, completed activities, earned items, relationships, discoveries, and other consequences. Each experience owns its progress model and may expose portable facts through explicit contracts.
3. **Session state** — transient runtime facts: current location, active interaction, temporary effects, pending choices, and host execution context. Session state is not the character export.

A character export should not silently include private account data, host credentials, unrelated world state, or another player's information.

## Portable character document

The initial design target is a versioned, self-describing JSON document with:

- a stable schema identifier and schema version;
- stable character identity independent of display name;
- an explicit character-definition payload;
- provenance for the authoring source and any selected SURPS profile/rulebooks;
- optional extension namespaces for domain-specific additions;
- validation diagnostics and migration policy.

This is a proposed envelope, not a finalized SURPS character schema. Unknown extension data should be preserved where safe; unknown required semantics must fail validation rather than be silently discarded. Import must validate before a character is admitted to an experience. Export/import should round-trip without changing stable identity or silently changing meaning.

## Visitor journey

1. **Arrive** at a welcoming threshold with a clear invitation to create or import a character.
2. **Create or import** a character through a guided editor that explains each field and distinguishes identity, capability, equipment, and background.
3. **Review** a readable character summary and validation feedback.
4. **Save / export** a portable character document. A local browser proof may use an explicit download and local file import; it must not imply account-backed cloud persistence.
5. **Choose a destination** from experiences that declare supported character schema versions, required capabilities, optional extensions, and entry conditions.
6. **Enter** through a host-mediated handoff. The host supplies the validated character definition and approved context, not arbitrary account or session internals.
7. **Explore** a living place: move, observe, inspect, meet inhabitants, discover activities, and make at least one consequential choice.
8. **Save progress** separately from the character definition, with clear ownership and export semantics.

## First world: make the doorway memorable

The first destination should not be constrained to another conventional city district. A candidate is an exotic threshold-world: an arrival sanctuary at the edge of a larger unknown, with unusual architecture, layered environments, visible inhabitants, a central gathering space, and several discoverable paths into distinct activities or future worlds.

This is a vertical-slice setting proposal, not an assertion that the environment or its simulation exists. City can list and spatially connect the destination; the destination's owning experience repository should own its world model.

## Experience compatibility declaration

Each experience entry should eventually declare:

- accepted character schema IDs and version ranges;
- required character capabilities and anatomy/form constraints;
- optional extension namespaces;
- whether new characters, imported characters, or both are accepted;
- required starting context and access policy;
- which progress data can be imported/exported;
- explicit migration or incompatibility behavior.

Compatibility is a contract, not a guess based on character name, genre, or display fields.

## First vertical-slice acceptance criteria

- [ ] A visitor can create a character using a guided, understandable editor.
- [ ] The character receives a stable identity and can be exported as versioned JSON.
- [ ] The exported document can be imported in a fresh browser session and validated.
- [ ] A round-trip test preserves identity and all supported character facts.
- [ ] The destination declares its accepted character contract and rejects incompatible required data clearly.
- [ ] The visitor can enter one small authored environment with the imported or newly created character.
- [ ] The visitor can move through at least three connected spaces and inspect discoverable points of interest.
- [ ] At least one inhabitant or agent and one activity can be encountered.
- [ ] At least one interaction produces an observable, persistent experience-progress change.
- [ ] Character definition, experience progress, and transient session state remain separate.
- [ ] All simulated, synthetic, local-only, and not-yet-connected behavior is labelled honestly.

## Implementation sequence

1. Agree the character ontology and portable envelope with SURPS; do not create a competing City character schema.
2. Add JSON schema, fixtures, validation, and round-trip tests.
3. Build the browser character creation/import/export surface.
4. Author one exotic, tightly scoped destination and its experience compatibility declaration.
5. Connect host-mediated entry and persistence only when the real host contracts are available.
6. Use Gauntlet to challenge malformed documents, unknown extensions, version mismatches, identity collisions, incomplete saves, and cross-experience compatibility.

## Explicit non-goals for the first proof

No multiplayer promise, account system, cloud save, commerce, unrestricted character scripting, universal character migration, or production-grade simulation is implied. The first proof should demonstrate the complete visitor loop honestly before expanding its world or feature count.
