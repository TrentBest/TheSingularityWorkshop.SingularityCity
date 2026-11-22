# The Singularity Workshop — Singularity City

[![Pages](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/actions/workflows/pages.yml/badge.svg?branch=development)](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/actions/workflows/pages.yml)
[![Sith](https://img.shields.io/badge/Sith-2%20branches-6b7280)](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/branches)

**Singularity City is the persistent, navigable spatial front door to The Singularity Workshop.** It connects places, people, civic systems and independently owned experiences into one discoverable world.

> A city is more than a place on a map. It is a living index of what exists, what can happen here, and where you can go next.

![Singularity City living systems atlas](assets/images/living-city-atlas.svg)

The atlas is a conceptual systems illustration; the browser proof and Visualize's CPU/SVG city-massing proof are separate, explicitly labelled implementation paths.

## Live preview

The browser proof is validated on `development` and `master`; the Pages deployment is deliberately gated to `master`, matching the Workshop release-aligned branch policy:

- **Explore:** [Singularity City](https://trentbest.github.io/TheSingularityWorkshop.SingularityCity/)
- Select map markers or destination cards to inspect a place.
- Preview the proposed handoff to an experience such as [FSM_Dungeon](https://github.com/TrentBest/FSM_Dungeon).

The current proof is a static, interactive navigation fixture. It does not claim live persistence, multiplayer, authoritative simulation or a connected dungeon runtime.

## What City owns

- Persistent geography, districts, parcels, places and routes.
- Ownership, zoning, construction and civic institutions.
- Residents (Digitens), their activities and city-level relationships.
- City economy, services, discoverability and access decisions.
- Spatial entry points into independently owned experiences.

## What City does not own

City does not absorb the simulation of every destination. The Underworks entrance can resolve to `TrentBest/FSM_Dungeon`; the dungeon repository owns its topology, inhabitants and underground simulation. Workshop tools, laboratories, games and shipyards remain reusable domain capabilities composed through MicroBundles.

## Architecture

`Workshop → Singularity Transit → Singularity City → World`

`Ontology → MicroBundles → arbitration → Experience → spatial manifestation`

- [Architecture and responsibility boundaries](docs/ARCHITECTURE.md)
- [City spatial and civic model](docs/CITY_MODEL.md)
- [Declarative experience entry points](docs/EXPERIENCES.md)
- [Build your own city, step by step](docs/BUILD_YOUR_CITY.md)
- [Source-grounded world research and evidence ledger](docs/SOURCE_RESEARCH.md)
- [Living picture: visual architecture and proof ladder](docs/LIVING_PICTURE.md)
- [Civil systems and city theory atlas](docs/CIVIL_SYSTEMS_AND_CITY_THEORY.md)
- [Wheel of Time city showcase plan](docs/WHEEL_OF_TIME_SHOWCASE.md)

## Development

- Active work: `development`
- Release-aligned branch: `master`
- GitHub Pages workflow: `.github/workflows/pages.yml`
- No NuGet package is published by this repository workflow.

The first implementation slice establishes an inspectable City map, destination discovery, an experience handoff preview and the domain contracts needed to connect real host data later.

## The Singularity Workshop

![The Singularity Workshop](https://raw.githubusercontent.com/TrentBest/FSM_API/master/Documentation/Branding/TheSingularityWorkshop.png)
