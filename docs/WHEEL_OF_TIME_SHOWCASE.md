# Wheel of Time City Showcase — Homage Plan

## Intent

Singularity City will demonstrate that the Workshop can describe, generate, populate and simulate many distinct cities—not just one hand-authored environment. As an homage to Robert Jordan's *The Wheel of Time*, we plan a curated showcase of major cities and settlements from that world.

This is an unofficial fan-inspired technical showcase, not an official adaptation or an assertion of affiliation with the author, publishers or rights holders. Use original code, original visual design, original explanatory writing and independently created assets. Do not reproduce published maps, passages, illustrations, audiobook material, or other protected expression. Any public/commercial release requires a separate rights review.

## Showcase portfolio

Treat each place below as a separate city blueprint or settlement profile, not a scene hard-coded into the engine. The exact scope and naming can be refined as the catalog grows.

### The great cities

| City | Distinctive design problem to explore |
|---|---|
| Caemlyn | Walled capital, royal precinct, layered streets and monumental civic architecture |
| Tar Valon | Island metropolis, bridges, river approaches and a dominant central landmark |
| Cairhien | Dense noble estates, formal avenues, political precincts and constrained urban blocks |
| Tear | River-and-port city, fortress precinct and dense waterfront districts |
| Illian | Coastal trade city, canals, harbors and civic/religious landmarks |
| Ebou Dar | Port city, waterways, bridges, markets and layered neighborhoods |
| Far Madding | Compact fortified city, controlled entrances and distinctive civic geography |
| Tanchico | Major port, palace precinct, markets and old-city layers |
| Amador | Walled political and military capital with strong institutional zoning |
| Bandar Eban | Coastal trade city with port logistics and urban pressure |
| Maradon | Northern regional capital shaped by frontier defense and trade |
| Fal Dara | Fortified border city with gates, walls and military logistics |
| Shadar Logoth | Abandoned urban fabric, sealed districts, environmental danger and historical provenance |
| Rhuidean | Remote desert city/ruin, monumental approach and exceptional site history |

### Other settlements and regional places

The same generator should also support villages, towns, keeps, ports, waystations, ruins and temporary camps. These are not lesser data types; they are different scale profiles using the same spatial and civic primitives.

## What the showcase proves

Each city profile should progressively demonstrate:

1. **Geography:** terrain, water, elevation, approaches, districts, parcels and routes.
2. **Urban form:** walls, gates, streets, blocks, landmarks, structures and architectural styles.
3. **Civic life:** residents, institutions, services, markets, schedules and public spaces.
4. **History:** formation, ownership, events, damage, repairs, abandonment and provenance.
5. **Experience composition:** discoverable entrances into independently owned capabilities and simulations.
6. **Observation:** SVG/map projection, detailed local view, aggregate distant view and observer-relative fidelity.
7. **Authorship:** editable source manifests, generation parameters, validation reports and reproducible seeds.

## Reusable generator, not a Wheel of Time engine

The generator should know generic concepts: terrain, settlement scale, density, district grammar, parcel rules, street networks, water systems, structures, civic institutions, population profiles, history and simulation fidelity.

A city blueprint supplies parameters and authored constraints. It must not require the generator to know what Caemlyn or Tar Valon is. A creator should be able to use the same package to generate:
- one authored city;
- several linked cities in one world;
- procedural cities from seeds and constraints;
- a city-builder that edits, validates, saves and exports city definitions;
- entirely original cities with no Wheel of Time content.

Keep the showcase content in its own data/content layer. Keep generic generation and simulation capabilities in reusable packages and MicroBundles. Keep each city's authoritative simulation separate from its map or SVG projection.

## Delivery sequence

1. **Catalog contract:** stable city, district, parcel, structure, route and place identities; versioned manifests and provenance.
2. **One city end-to-end:** Singularity City as the executable example with data-driven SVG and source inspection.
3. **Generator primitives:** terrain and region graph, street/route generation, district rules, parcel subdivision and structure placement.
4. **Civic primitives:** population profiles, institutions, service coverage, markets and deterministic schedules.
5. **Blueprint authoring:** parameters, constraints, seeds, validation, diffing and export.
6. **Showcase expansion:** implement the great cities one at a time, each with a documented recipe and reproducible output.
7. **City-builder:** expose the same definitions and generation pipeline through an editable creator experience.

## Required provenance

Every showcased feature must be traceable to:
- its city blueprint and version;
- generation parameters and seed, where applicable;
- the repository/package that owns its behavior;
- the MicroBundle or capability that supplies it;
- the source files and tests that demonstrate it;
- any manual edits applied after generation.

A beautiful image alone is not proof. The deliverable is the living city, the recipe that creates it, and the evidence that the recipe works.
