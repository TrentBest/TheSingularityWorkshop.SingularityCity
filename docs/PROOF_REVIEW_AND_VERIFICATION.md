# Proof Review and Verification

## Purpose

SingularityCity pages are demonstrations of a living domain, not merely marketing pages. Each proof of concept therefore has an explicit claim, a reproducible review method and a visible human-review checkbox. The default state is unchecked.

This is the first City-local proof-review experience and a proposal for a Workshop-wide contract that SURPS can lead.

## The proof lifecycle

![Proof review lifecycle](../assets/images/proof-review-lifecycle.svg)

1. **Specified** — state the exact behavior the proof claims to demonstrate.
2. **Implemented** — identify the page, domain data and code that manifest it.
3. **Automated** — link tests or source-level checks that can be repeated by a machine.
4. **Human review** — a person exercises the visible experience and checks the box only after it behaves as claimed.
5. **Shared record** — preserve accepted review evidence in a trusted, repository-linked record.

A stage is not evidence of the next stage. Code existing does not prove it runs; a test passing does not prove a browser journey works; a local checkbox does not certify the feature for everyone.

## Current checkbox behavior

- Every proof card starts unchecked for a browser with no saved review record.
- Checking a box stores the review timestamp and optional reviewer label in browser localStorage.
- Unchecking removes that local review record.
- The page shows a count of reviews stored in the current browser.
- A JSON export preserves the page, proof IDs, claims, review state, timestamps and reviewer labels.
- No network request, GitHub write, identity assertion or shared certification occurs.

The storage key is versioned: `singularity-city:proof-review:v1`. Clearing site data or using another browser/profile removes or isolates local review state. This is intentional for the first static-page slice: no credentials or backend are embedded in a public Pages site.

## Evidence vocabulary

| State | Meaning |
|---|---|
| Proposed | An idea or future capability; no implementation claim |
| Specified | A stable behavior and acceptance method are written |
| Implemented | Code/data exists; execution may still be unverified |
| Automated | A named automated check exercises the stated contract |
| Human reviewed | A person reports exercising the proof in the browser |
| Shared verified | A trusted shared record links reviewer, proof revision, evidence and review time |

The current checkboxes record **Human reviewed (local)** only. They do not set **Shared verified**.

## Shared Workshop direction

SURPS should lead the shared vocabulary and book/document structure for proof records. City owns the spatial and civic domain proofs themselves. The shared contract should define:

- stable proof ID and owning repository/domain;
- claim, scope, prerequisites and reproducible steps;
- expected result and known limitations;
- implementation references and exact tested revision;
- automated test references and result provenance;
- human reviewer, review time, environment and observed result;
- invalidation rules when implementation or dependencies change;
- status transitions and audit history.

The durable shared record should be written through an authenticated host or an explicit reviewed repository change. Do not put a GitHub token in browser JavaScript, and do not pretend that local browser storage is shared state.

## City proof inventory

The City and Mall pages load proof cards from `data/proof-review.json`. Each card describes one bounded claim and a practical review procedure. The list is intentionally not a claim that every City domain feature is complete.

Automated contract test:

`node --test tests/proof-review-contract.test.mjs tests/mall-pavilion.test.mjs`

The test validates proof metadata and the local-review contract. It does not launch a browser or prove visual behavior.

## Future integration

The next shared implementation should replace the local-only persistence adapter with a host-owned verification service while preserving the same proof IDs and review semantics. A shared service must authenticate the reviewer, bind a review to an immutable repository revision, retain append-only history and make stale reviews visibly invalid when the proof changes.
