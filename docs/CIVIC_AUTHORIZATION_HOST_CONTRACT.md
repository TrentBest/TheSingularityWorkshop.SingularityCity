# Civic authorization host contract

![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

**Status:** host-integration contract and input schema; no production identity, authority, clock, evidence, revocation or audit provider is implemented.

The [host-context schema](../schemas/civic-authorization-host-context.schema.json) describes the evidence envelope a production adapter must assemble before calling the pure [authorization policy gate](../assets/js/civic-authorization-gate.mjs). It is deliberately separate from the civic-process response schema: a recorded decision or authorization is domain data; the host context is the adapter's current evidence about whether a particular execution request may proceed.

## Trust boundary

The schema validates structure only. It does not authenticate a principal, prove that an institution has legal authority, establish jurisdiction, certify a clock, verify an evidence document, establish a condition, query a revocation registry, or make an audit log immutable. The host must authenticate each issuer and evidence reference against its own trust roots. Never treat a schema-valid envelope as proof that its claims are true.

## Required host assertions

| Envelope section | Host responsibility | Fail-closed rule |
|---|---|---|
| `principal` | Authenticate the person or service; retain issuer, method, authentication time and identity evidence reference | Missing, expired or unverifiable identity means no execution |
| `authority` | Verify the granting authority, exact jurisdiction and source decision against the authoritative civic record | Authority, jurisdiction or decision mismatch means no execution |
| `clock` | Supply a trusted, offset-aware instant and evidence of the clock source | Untrusted, malformed or stale time means no execution |
| `prerequisiteEvidence` | Resolve every authorization prerequisite from its authoritative source and record provenance | Any missing, unsatisfied or unknown prerequisite means no execution |
| `conditionEvaluations` | Evaluate each structured authorization condition using the competent provider and retain supporting evidence references | Any missing, unsatisfied or unknown condition means no execution |
| `revocation` | Check the authoritative revocation/suspension source immediately before execution | Revoked, unknown or stale revocation state means no execution |
| `audit` | Persist a correlation-linked evaluation attempt and its evidence references in the host's audit sink | If the required audit record cannot be persisted, do not execute |

## Mapping to the policy gate

The adapter must derive—not accept from the untrusted request body—the following values:

1. `executorId` from the authenticated `principal.principalId`; it must equal the authorization's `executorId`.
2. `jurisdiction` from verified `authority.jurisdiction`; it must equal the authorization's jurisdiction.
3. `action` and `subjectId` from the canonical request being authorized, then compare them exactly with the authorization.
4. `at` from the trusted `clock.instant`, not the caller's machine or request timestamp.
5. `satisfiedPrerequisiteEvidenceIds` from prerequisite records whose status is exactly `verified`.
6. `satisfiedConditionIds` from condition evaluations whose status is exactly `satisfied`.

Before invoking the policy gate, the adapter must also verify that the authority's `sourceDecisionId` equals the authorization's source decision, that the authority record and principal are current, and that revocation status is `clear`. Unknown values are not truthy. The adapter must reject duplicate or conflicting evidence IDs rather than choosing one silently.

## Execution protocol

1. Resolve the authorization and canonical proposal/subject from the authoritative civic store.
2. Authenticate the principal and verify the authority/jurisdiction chain.
3. Gather prerequisite evidence and evaluate every condition.
4. Obtain trusted time and current revocation state.
5. Persist an audit event containing the request correlation ID, authorization ID, policy version, evidence references and evaluation result.
6. Call `evaluateCivicAuthorization()` with only host-derived values. A negative result stops the request.
7. Re-check revocation and time immediately before dispatch if there is a meaningful delay between evaluation and execution.
8. Dispatch only the exact authorized action and subject to the authorized executor.
9. Record execution evidence against the authorization and proposal; later record a separate outcome review.

An authorization decision is not a reservation of resources and does not itself perform work. If the executor reports partial, failed or aborted work, preserve that status and its evidence. Do not rewrite it as completed. If the action is retried, issue a distinct execution record linked to the same authorization only if its scope and validity still permit the retry.

## Ownership and non-goals

- City owns the civic-process record relationships and the policy gate's exact proposal/action/subject/jurisdiction/executor comparison.
- The host owns authentication, authority verification, trusted time, evidence custody, condition evaluation, revocation distribution, audit persistence and execution dispatch.
- Physics remains authoritative for physical and safety assessments; Economy remains authoritative for budgets, procurement and transactions; shared Ontology and SURPS retain their respective contracts.
- This contract does not implement a host, identity provider, legal authority registry, evidence vault, trusted clock, revocation service, immutable audit store, workflow engine or executor.

A production adapter must be separately implemented and tested against its real providers. Until then, the gate remains a deterministic policy function and the Greenhollow scenario remains an authored fixture with no grants or execution records.
