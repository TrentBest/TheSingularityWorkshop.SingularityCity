# Reality Sets, Place Identity and Historical Reconstruction

![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

## Purpose

A place sourcebook must not decide for itself whether a place is real or fictional. That classification belongs to the Workshop's shared reference ontology and its reality model. City consumes that classification; it does not create a competing City-only taxonomy.

The distinction is fundamental:

- A place that exists in the real world belongs to the real-world reality set.
- A deliberately changed, alternate, invented or otherwise fictional reality belongs to a fictional reality set.
- A fictional place may be **based on** a real place, culture, landscape, historical period or combination of sources. That relationship records inspiration; it does not make the fictional place a real-world location.
- A real archaeological site can have several representations of its actual history without those representations becoming separate fictional realities. A reconstruction is a model or interpretation of a real past, not a direct observation. An alternate-history version that changes what happened is fiction.

The shared [Ontology package](https://github.com/TrentBest/TheSingularityWorkshop.Ontology) provides optional, versioned semantic definitions, addresses, indexes and relationships. Its package is the semantic mechanism, not the complete master/reference ontology content. The authoritative reality classification and any canonical relationship vocabulary must come from the shared ontology content and accepted contracts. Do not invent a City-local `RealitySet` enum, duplicate a master taxonomy, or assume an unapproved API/member name.

SURPS supplies the roleplaying-world ontology and composes world entities, environments, capabilities, behavior, interactions and narrative state. City owns place-domain content and civic/spatial models. These layers cooperate; they do not replace one another.

## One place, several truthful views

Consider Göbekli Tepe:

1. **The site as it exists today** — a real-world place represented through current geographic context, archaeological records, photographs, survey products, point clouds, photogrammetry, laser scans and other permitted observations.
2. **An earlier archaeological phase** — an evidence-based reconstruction of the same real place at a stated period. It belongs to the real-world subject, but every reconstructed element must retain its evidence and uncertainty. It is not a scan of the past.
3. **A construction or founding explanation** — a sourced account of what is known, an attributed interpretation of how work may have proceeded, and clearly separated alternatives where evidence does not settle the question.
4. **An alternate version** — if the site, its builders, chronology or outcome is intentionally changed beyond an evidence-based account, that version belongs to a fictional reality. A relationship such as **based on** may connect it to the real site.

This lets a learner visit the surviving place digitally, then move into a carefully labelled interpretation of an earlier state without confusing measured remains with reconstructed architecture.

The same approach applies to Troy / Hisarlık, Tenochtitlan, Göbekli Tepe, Pompeii, living cities, and fictional places such as Oz, Tear or Camlyn. The shared ontology decides reality membership; City describes the place and its civic/spatial content within that membership.

## Reality membership and evidence are independent

Do not collapse these two questions:

- **Reality membership:** in which reality does this subject exist?
- **Evidence status:** what supports this particular claim, geometry, event, interpretation or reconstruction?

A real-world site can have incomplete evidence. A fictional setting can have authoritative internal canon. A scan can be measured accurately while its historical interpretation remains uncertain. A highly detailed model can still be speculative.

For each claim or represented feature, retain the applicable source and provenance, time period, method, author or institution, date, license/usage basis, geographic coverage, transformations, limitations and review history. Distinguish at least:

- directly observed or measured material;
- archaeological or historical records;
- a named source's interpretation;
- City/editorial synthesis;
- an authored reconstruction;
- a fictional or counterfactual scenario;
- unknown, disputed or not yet investigated.

These are evidence and editorial states, not substitutes for the ontology's reality classification. Keep confidence local to the claim or feature; do not assign one confidence score to an entire place when different parts have different support.

## A scan-first digital visit

For a real site, the first digital experience should preserve what can actually be observed today.

Possible source materials include terrestrial or airborne laser scanning, structured-light scanning, photogrammetry, surveyed control points, orthophotography, elevation models, archaeological plans and published excavation records. Availability is not assumed: each dataset must be located, reviewed for rights and suitability, and cited before use.

A scan or survey asset should retain, where supplied:

- originating organization, creator and source URL or archive identifier;
- capture or publication date and the period represented;
- license, permission or other lawful basis for use and redistribution;
- coordinate reference system, datum, units, axes and registration method;
- spatial extent, coverage gaps, resolution or point spacing;
- accuracy/precision statements and known limitations;
- processing, filtering, decimation, alignment and conversion history;
- immutable source identity or checksum where practical.

Do not silently merge datasets with incompatible coordinate frames, datums, units or registration quality. Do not imply that a scan covers areas it does not cover. Preserve source-resolution data where rights and practical storage permit; derive optimized display meshes or tiles as separate, traceable products.

The experience should allow a visitor to orient themselves, move through the extant site, inspect structures and landscape, and open the source/provenance behind an observation. This is a digital visit to the evidence that survives today—not a claim that every surface is captured or that the scan explains the site's original purpose.

## From observed remains to a best-supported reconstruction

A historical view is a separate, time-bounded representation linked to the real place and to its evidence. It should be assembled from the best available records, not by simply making the modern scan look older.

For each period or reconstruction:

1. State the period, chronology and dating basis. Explain what was dated and the uncertainty in the date range.
2. Identify the surviving physical evidence and the parts of the modern site that remain relevant.
3. Collect excavation records, plans, photographs, artifacts, environmental evidence, publications and other authoritative sources.
4. Attribute competing interpretations and explain which evidence each interpretation uses.
5. Separate high-support geometry from uncertain form, materials, color, use, population, social organization and ritual meaning.
6. Label the authored synthesis and visual reconstruction, including the revision date and unresolved questions.
7. Preserve alternative reconstructions when credible evidence supports more than one.
8. Record expert review as an attributed contribution with scope, date and cited basis. A historian or archaeologist can improve the work without being represented as having certified every aspect of the model.

A reconstruction may combine a highly reliable terrain surface with uncertain building height, roof form, timber arrangement or social interpretation. Those differences must remain visible at the level where they occur. LOD describes representational detail; it does not certify accuracy.

## Construction, founding and lived experience

The digital place should explain not only what a site may have looked like, but how it came to be and how people may have used it.

Where evidence permits, explore:

- landscape selection, access to water, food, materials and routes;
- construction sequence, tools, material sourcing and movement;
- labor organization and plausible construction logistics;
- successive building or occupation phases;
- daily movement, gathering, exchange, provisioning and maintenance;
- environmental change, reuse, abandonment and later rediscovery.

Keep observed traces, published explanations, authored synthesis and interactive scenarios distinct. If a construction sequence is a teaching hypothesis rather than an established fact, say so. The player may test a scenario, but the simulation result does not retroactively become archaeological evidence.

## Fiction, canon and inspiration

Fictional cities receive the same care of identity and internal consistency, but not a false real-world evidence claim.

A fictional placebook should identify its fictional reality and distinguish:
- creator-established canon;
- authorized adaptations or licensed source material;
- editorial interpretation of canon;
- original additions made by this project;
- speculation or player-created scenarios.

A **based on** relationship may connect a fictional place to one or more real places, periods, architectural traditions, cultures or landscapes when the shared ontology supports that relationship. Preserve the direction and provenance of the relationship. Do not copy protected text, artwork, maps or scans without permission, and do not present a creator's fictional geography as a real archaeological record.

For example, a fictional city may draw inspiration from several historical cities while remaining a wholly fictional place in its own reality. A sourcebook can explain those inspirations without relocating the fictional city into the real-world reality set.

## Ownership and presentation

- **Shared reference ontology / Ontology:** authoritative reality membership and shared semantic identity/relationship vocabulary; the generic Ontology package supplies optional addressing and relationship mechanisms.
- **SURPS:** roleplaying-world ontology, entities, environments, capabilities, behavior, interactions, narrative state and rulebook composition.
- **Singularity City:** place identity as consumed from the shared ontology, civic geography, settlement form, districts, routes, buildings, institutions, place histories and place-specific sourcebooks.
- **Physics:** terrain, physical properties and physical simulation; City consumes validated outputs rather than recreating them.
- **Specialist domains:** their own authoritative evidence and models, such as archaeology datasets, materials, construction methods or environmental studies.
- **Renderer / Visualize:** textual explanation, maps, diagrams, scans, reconstructions and walkable spatial presentations.

The same stable place and feature identities should connect the book, map, scan, reconstructed scene, citations and interactive experience. Renderer can explain what is known and why; Visualize can make the place explorable. Neither presentation layer turns an illustration into evidence.

## Expert participation and correction

The project should make correction possible rather than treating an initial edition as final. Each placebook should expose its sources, assumptions, disputed claims, unresolved questions and contribution path. A qualified historian, archaeologist, Indigenous knowledge holder, surveyor or other domain expert should be able to identify the exact claim or feature being reviewed and provide an attributed correction or alternative.

Expert review is scoped: a specialist may review chronology but not certify scan registration, or review a building interpretation without endorsing every social reconstruction. Record what was reviewed, by whom, when, against which sources and at which revision. Keep prior versions and explain material changes.

The invitation is practical: here is the evidence, here is our current best-supported interpretation, here are the uncertain parts, and here are the tools and provenance needed to improve it.

## Implementation boundary

This document establishes City's editorial and integration policy. It does not define new shared ontology types, relationship predicates, schema fields, scan formats or runtime APIs. Those must be taken from the authoritative shared ontology and domain contracts when available.

Until then:
- do not create a City-local reality taxonomy;
- do not invent a `RealitySet` property or a `based-on` API name;
- keep sourcebook descriptors and fixtures from claiming an unapproved machine contract;
- preserve evidence and source provenance in the existing City research conventions;
- keep scan acquisition, historical reconstruction and interactive delivery as separate work items with explicit rights, source and validation gates.

**Current status:** editorial architecture and integration direction. No Göbekli Tepe scan, point cloud, laser-scan dataset or historical reconstruction is claimed to have been acquired or implemented by this repository.
