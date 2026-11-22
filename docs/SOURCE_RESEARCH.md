# Source-grounded world research

Singularity City must be able to distinguish what a source explicitly establishes from what a researcher infers and what the generator invents. This research contract is generic: it can support original worlds, historical references and a future licensed adaptation without embedding any one world's vocabulary in the city engine.

## Research unit: one observation

Create one observation for one useful claim about one subject. Anchor it to the exact work and edition, then record the chapter and page reference. Page numbers vary by edition, so the edition is not optional.

The schema is [`source-observation.schema.json`](../schemas/source-observation.schema.json). Each record contains:

- **Source locator** — work, edition, volume, chapter and page range.
- **Subject** — city, district, landmark, building, street, route or institution.
- **Evidence kind** — explicit description, narrative observation, dialogue, map reference, cross-reference or inference.
- **Summary** — the researcher's concise paraphrase of the relevant information.
- **Interpretation** — what the observation means for the spatial or civic model.
- **Confidence and uncertainty** — how firmly the source supports the interpretation, including conflicts.
- **Blueprint mapping** — which district, route, landmark or generated feature the observation informs.

## Evidence discipline

Keep three layers separate:

1. **Source fact** — what the text or other authorized source actually establishes.
2. **Research interpretation** — a reasoned synthesis across passages, viewpoints or books.
3. **Implementation choice** — how the blueprint represents that evidence, including any deliberate approximation.

A narrator's description, a character's impression, a map reference and a researcher's inference are not interchangeable. Record contradictions and uncertainty rather than silently resolving them. Revisit earlier observations when later volumes add context.

Use short, researcher-authored summaries and precise bibliographic locators. Do not turn the public repository into a bulk transcription of source books. Private working notes can retain whatever additional detail is appropriate for the research workflow; public artifacts should contain only material cleared for publication.

## From research to a living city

The intended trace is:

`Work / edition / chapter / page → observation → subject model → blueprint feature → generated projection`

A blueprint feature should be explainable in both directions: from the visible feature back to the evidence that informed it, and from a source observation forward to the city feature it changed.

For a Wheel of Time showcase, use the same research contract across every city. Start with one city and complete its evidence-to-blueprint trace before scaling the portfolio. The generic city engine remains independent of franchise-specific content; the showcase is a separate content layer and any commercial adaptation remains subject to an appropriate rights agreement.
