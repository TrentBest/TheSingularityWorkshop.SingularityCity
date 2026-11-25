# WebPage Host Integration

## Purpose

Singularity City is the authoritative owner of persistent City geography, spatial identity, places, entrances, routes, residents and civic state. WebPage is a browser host and proving ground that should consume those contracts rather than maintain a parallel City domain model.

This document coordinates the extraction and integration work tracked in [City issue #6](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/issues/6) and [WebPage issue #137](https://github.com/TrentBest/WebPage/issues/137).

## Ownership boundary

| Concern | Owner |
|---|---|
| City, district, parcel, place, structure, entrance and route identity | Singularity City |
| Ownership, zoning, permits, construction and civic state | Singularity City |
| City resident/Digiten identity, residency and city-level relationships | Singularity City |
| Physical terrain generation/evolution and physical models | Physics |
| Domain capability and experiment semantics | Owning domain repository (for example, Singularity Laboratories) |
| Capability composition and dependency arbitration | MicroBundleDomain / FSM_COS |
| Workflow lifecycle and cancellation | FSM_Execution |
| Geometry representation and visual output | Renderer / Visualize |
| Browser camera, input, routes, navigation presentation and host adapters | WebPage |
| Authentication, authorization enforcement, persistence and network authority | Trusted host services |

A City place may point to an independently owned experience. City resolves the place and entry point; it does not absorb the target experience's internal simulation.

## Existing City-owned material to expose

The current City repository already contains substantial domain and authored-data foundations:

- City spatial/civic vocabulary and stable-identity guidance in [City Model](CITY_MODEL.md).
- Responsibility boundaries, experience-entry model, terrain ownership and spatial data stack in [Architecture](ARCHITECTURE.md).
- Declarative place catalog in `data/places.json`.
- Spatial blueprint and coordinate-space definition in `data/city-blueprint.json` and its schema.
- Layered map data, district/parcel generation and provenance rules.
- Civic Quarter connected-district model and its synthetic fixture boundaries.
- City systems catalog and its schema.
- City experience channels and the Renderer/Visualize presentation boundary.

These are the initial canonical inputs for WebPage. Their existence does not imply a live persistent City service or multiplayer runtime.

## WebPage extraction inventory

The following WebPage areas are candidates for review, not automatic deletion or wholesale transfer:

- `TheSingularityWorkshop/Pages/Explore.razor`: browser navigation, screen-to-world interaction and visitor movement. Keep camera/input/animation in WebPage; migrate only City-owned semantics.
- `TheSingularityWorkshop/Workshop/Spatial/SpatialAECPlanExperience.cs` and `SpatialAECPlanExperienceGuiBuilder.cs`: authored AEC plan semantics and their GUI projection. Decide which stable building/floor/place data belongs in City and which visitor/presentation behavior remains host-side.
- `SpatialGeometryEngine.cs`: inspect ownership of generic geometry/pathfinding separately from City route semantics and Physics coordinate math.
- `SpatialSingularityLabModel.cs`: laboratory entrance/facility journey. City owns the geographic place/entrance; Singularity Laboratories owns laboratory identity, facilities and scientific capabilities.
- City-related pages, manifests, fixtures, diagrams and documentation: classify as canonical City data, browser presentation, adapter, transitional duplicate, fixture, illustration or unowned capability.

Before moving any behavior: capture its current contract, preserve it with tests, implement the canonical owner-side equivalent, prove WebPage consumption, then remove only the proven duplicate.

## Spatial contract requirements

Every integration must keep these concepts explicit:

- Stable City/place/structure/entrance identity and schema version.
- Coordinate reference identity, axis orientation, units, origin and transform.
- Template-local, placed-instance and world coordinate frames as distinct frames.
- Provenance for generated or imported geography and derived features.
- Geographic adjacency, traversal, visibility, perception and experience transition as distinct relationships.
- Route constraints and actor/vehicle traversal capabilities.
- Explicit synthetic/illustrative/source-backed evidence status.

Never infer feet/meters, transforms, survey accuracy, authorization, resident identity mappings or persistence semantics from presentation data.

## First integration slice

1. Publish/validate a versioned City place and experience-entry contract based on existing City data.
2. Represent a Laboratory facility as an independently owned experience target referenced by a City place/entrance.
3. Keep the City place and spatial anchor in City; keep laboratory/facility/experiment semantics in Singularity Laboratories.
4. Have WebPage consume the same City and Laboratory identities and provide the browser visitor journey.
5. Add contract tests and a browser smoke test for City place → Laboratory entry. Label synthetic map and facility data honestly.

## Proof gates

- Schema validation and deterministic identity tests.
- Coordinate-frame isolation and explicit unit/axis/transform tests.
- Invalid/missing destination and incompatible schema-version tests.
- Traversal/entrance tests that do not conflate adjacency with reachability.
- WebPage integration tests proving it consumes City-owned records.
- Browser smoke journey using City records and a Laboratory entry point.
- Evidence labels that distinguish implemented, fixture, illustrated, proposed and unverified behavior.

## Non-goals

- Do not move browser camera or input handling into City.
- Do not make City own Physics solvers, Laboratory science, dungeon topology, rendering or workflow execution.
- Do not claim live persistence, multiplayer, authoritative simulation or live experience handoff until the host path is implemented and tested.
- Do not delete existing WebPage behavior before its replacement is proven.
- Do not publish NuGet packages or modify `master` without explicit authorization.
