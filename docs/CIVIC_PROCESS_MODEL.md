# Civic process model

![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

**Status:** host-neutral domain contract and fixture-backed validation; not a live civic runtime.

Singularity City coordinates civic processes: who may deliberate, what proposals are considered, which authority makes a decision, what that decision permits, what remains prohibited, who must oversee the next steps, and what evidence closes the loop. This is a City domain contract, not a replacement for Physics, Economy, shared Ontology, or a setting's rule system.

The machine-readable response shape is [civic-process-response.schema.json](../schemas/civic-process-response.schema.json). Greenhollow is the first authored fixture using this contract: [scenario data](../data/scenarios/greenhollow-civic-stress-test.json) and [stress-test documentation](GREENHOLLOW_CIVIC_STRESS_TEST.md). The separate [authorization host contract](CIVIC_AUTHORIZATION_HOST_CONTRACT.md) defines the trusted evidence envelope required by a future production adapter.

## 1. Process records and relationships

A civic process is not a single mutable status field. Keep the following records distinct and linked by stable identifiers:

| Record | Purpose | Minimum accountability |
|---|---|---|
| Process / hearing | Defines the matter, jurisdiction, participants, source event and process status | Source, scope, timeline and record provenance |
| Proposal | Describes an option and its intended civic purpose | Author, status, dependencies, resource needs and limits |
| Deliberation | Records submissions, questions, dissent, conflicts and review | Attributed source, time, response and privacy boundary |
| Decision | Records the competent authority's reasoned outcome | Authority, jurisdiction, source record, selected proposals and reasons |
| Authorization | Separately grants a bounded action when the proper authority has approved it | Granting authority, jurisdiction, action, subject, scope, exclusions, prerequisites, conditions, validity, executor and review path |
| Oversight obligation | Requires a review or publication at a defined trigger | Responsible actor, trigger, obligation and expected evidence |
| Impact observation | Records how groups are affected without inventing measurements | Affected group, source, uncertainty, assessment and follow-up |
| Execution evidence | Records what an authorized executor actually did | Authorization, action, subject, executor, time, status, source evidence and limitations |
| Outcome review / appeal | Evaluates results or records challenge and reconsideration | Decision, authorization and execution references, reviewer, observed outcome, unresolved impacts and disposition |

A proposal is not a decision. A decision is not an authorization. An authorization is not proof of execution. An execution record is not proof that the outcome achieved its purpose. Each transition needs its own source and evidence.

## 2. Deliberation-to-execution gates

Use the following conceptual progression. A host may add setting-specific stages, but must not collapse the authority boundaries.

1. **Submitted** — a proposal or petition is received with its source and scope.
2. **Admissibility and jurisdiction review** — determine whether the body may consider the matter; refer or decline when outside its mandate.
3. **Deliberation** — gather affected-party submissions, alternatives, uncertainty, dissent and disclosed conflicts.
4. **Decision recorded** — the authorized body records reasons, selected options, conditions and explicit non-authorizations.
5. **Independent review** — required technical, legal, accessibility, safety, financial or other specialist findings are obtained from their owning domains.
6. **Execution authorization** — only the authority competent for the action grants a distinct, bounded authorization after its prerequisites are met.
7. **Execution evidence** — the responsible provider records what was actually done, by whom, when and under which authorization.
8. **Outcome review** — compare observed results with the stated purpose; record unresolved harms, obligations and limitations.
9. **Appeal or reconsideration** — preserve the original decision and provenance while recording the challenge, reviewing authority and disposition.

These are not automatic state transitions. In particular, a public vote, hearing outcome or planning decision must never silently authorize procurement, payment, construction, enforcement or physical access.

## 3. Authority and cross-domain ownership

City owns civic context and coordination: jurisdiction, institutions, public participation, proposals, deliberation, civic decisions, public records, oversight and consequences.

- **Physics** owns physical models and technical assessment: terrain, geometry, structural or environmental simulation, and physical safety evidence. City records the requirement and consumes the result with provenance; it does not create a substitute solver.
- **Economy** owns budgets, accounts, currencies, procurement transactions, contracts where modelled there, payments and financial-impact calculations. City must not maintain a shadow ledger.
- **Shared Ontology** owns shared semantic identities and relationship contracts. City must not invent competing reality membership, canonical identity or relationship predicates.
- **SURPS / setting rules** own the rulebook and setting-specific resolution contracts once those interfaces are defined and accepted. A City fixture is not permission to guess an adapter API.

A requirement may name a provider or owning domain, but naming it does not assert that the provider has accepted the work or that an integration exists.

## 4. Authorization is a separate record

Every executable authorization should identify:

- the granting authority and the basis for its jurisdiction;
- the exact action and subject or resource in scope;
- explicit exclusions and prohibited actions;
- prerequisites and required independent findings;
- conditions, limits, start and expiry where applicable;
- the person or service permitted to execute;
- the evidence required to prove execution;
- suspension, revocation, review and appeal paths.

If an authorization record is absent, expired, out of scope or missing a required prerequisite, the process remains non-executable. A civic decision may advance options to feasibility review without authorizing any physical or financial action.

## 5. Oversight, impact and institutional signals

Oversight obligations are first-class records, not prose footnotes. Each needs an owner, a trigger, an observable obligation and expected evidence. A missed trigger remains visible as an unresolved obligation; it is not silently marked complete.

Resident and community impacts should distinguish measured data, attributed reports, qualitative concerns and unknowns. Do not manufacture numerical impacts where no measurement exists. Do not create resident-level political-belief or trust profiles. Institutional performance can be discussed through observable procedural dimensions—such as transparency, responsiveness, fairness and reliability—without collapsing them into an unsupported aggregate score or automatic trust reward.

Participation records must respect privacy, ballot secrecy, legitimate anonymity and setting-specific rights. Abstention or non-participation must not be converted into a negative resident attribute.

## 6. Appeals, corrections and historical integrity

A later correction, appeal or overturned decision must append a linked record rather than erase the original. Preserve who made the original claim or decision, what evidence was available at the time, what changed, who reviewed it and what is now operative. Distinguish historical record from current validity.

## 7. Validation and implementation boundary

The JSON Schema defines the versioned response-record shape, including separate authorization, execution-evidence and outcome-review records. The pure `evaluateCivicAuthorization()` gate requires a granted authorization whose action, subject and executor match, whose validity window includes the attempted time, and whose prerequisite evidence is satisfied. Missing, suspended, revoked, expired, denied, out-of-scope or prerequisite-incomplete grants fail closed. Fixture tests add cross-record checks that JSON Schema alone cannot express: stable-ID uniqueness, actor/event/proposal references, decision authority, explicit prohibited actions, oversight ownership, and the qualitative/no-score trust constraints.

The Greenhollow fixture is the first conformance example, not a production process engine. The current contract does not implement workflow persistence, authorization issuance, identity management, a case-management service, trusted time, prerequisite evidence custody, revocation distribution, procurement, financial execution, construction or legal adjudication. The authorization gate is a deterministic policy check only; a production host must supply trusted identity, time, evidence and revocation state before treating its result as operational permission. A future runtime must be introduced behind an explicit host boundary and reconciled with the shared Ontology, Physics, Economy and SURPS contracts before claiming execution capability.
