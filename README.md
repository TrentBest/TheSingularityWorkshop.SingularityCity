# The Singularity Workshop — Singularity City

[![Pages](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/actions/workflows/pages.yml/badge.svg?branch=development)](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/actions/workflows/pages.yml)
[![Sith](https://img.shields.io/badge/Sith-2%20branches-6b7280)](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/branches)

**Singularity City is the persistent, navigable spatial front door to The Singularity Workshop.** It connects places, people, civic systems and independently owned experiences into one discoverable world.

> A city is more than a place on a map. It is a living index of what exists, what can happen here, and where you can go next.

![Singularity City living systems atlas](assets/images/living-city-atlas.svg)

The atlas is a conceptual systems illustration; the browser proof and Visualize's CPU/SVG city-massing proof are separate, explicitly labelled implementation paths.

## Live preview

The browser proof is validated on both active branches. GitHub Pages publishes `development` as the live working preview so current implementation and design notes are visible without promoting `master`; `master` remains the release-aligned branch:

- **Explore:** [Singularity City](https://trentbest.github.io/TheSingularityWorkshop.SingularityCity/)
- Select map markers or destination cards to inspect a place.\n- Read the [current field notes](https://trentbest.github.io/TheSingularityWorkshop.SingularityCity/thinking.html) for active decisions and cross-repository work.
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

**Physics owns terrain generation and physical evolution.** City consumes Physics-produced terrain datasets and builds civic geography around them; the current synthetic terrain file is only a labelled presentation fixture. See [Physics terrain and worldbuilding](docs/PHYSICS_TERRAIN_AND_WORLDBUILDING.md).

## Architecture

`Workshop → Singularity Transit → Singularity City → World`

`Ontology → MicroBundles → arbitration → Experience → spatial manifestation`

- [Architecture and responsibility boundaries](docs/ARCHITECTURE.md)
- [Physics terrain and worldbuilding](docs/PHYSICS_TERRAIN_AND_WORLDBUILDING.md) — Physics-owned terrain authority, existing APIs, adapter contract and worldbuilding sequence.
- [Maps as city data](docs/MAPS_AS_CITY_DATA.md) — terrain-first spatial layers, hydrology, planning maps and provenance.
- [Historical cartography and city history](docs/HISTORICAL_CARTOGRAPHY_AND_CITY_HISTORY.md) — period maps, source evidence, temporal features, uncertainty and the city's changing story.
- [City builder and first-person mayor experience](docs/CITY_BUILDER_AND_FIRST_PERSON_EXPERIENCE.md) — shared map/world contract and playable progression.
- [City spatial and civic model](docs/CITY_MODEL.md)
- [Declarative experience entry points](docs/EXPERIENCES.md)
- [Build your own city, step by step](docs/BUILD_YOUR_CITY.md)
- [Source-grounded world research and evidence ledger](docs/SOURCE_RESEARCH.md)
- [Living picture: visual architecture and proof ladder](docs/LIVING_PICTURE.md)
- [Civic Quarter connected district proof](docs/CIVIC_QUARTER_VERTICAL_SLICE.md)
- [Civil systems and city theory atlas](docs/CIVIL_SYSTEMS_AND_CITY_THEORY.md)
- [Wheel of Time city showcase plan](docs/WHEEL_OF_TIME_SHOWCASE.md)

## Development

- Active work: `development`
- Release-aligned branch: `master`
- GitHub Pages workflow: `.github/workflows/pages.yml`
- No NuGet package is published by this repository workflow.

The current implementation includes a terrain-first layered map stack with sampled elevation, marching-squares contours, land cover, watersheds, district and parcel maps, mobility, transit, utilities and hazard screening. It also includes a 13-domain systems catalog and a connected synthetic Civic Quarter proof spanning parcels, buildings, rooms, public space and civic services. The map stack and district workbench are generated from shared models with stable IDs and explicit provenance. The city-builder / first-person mayor experience is architected and documented, but is not yet a playable FPS. Terrain and district data remain synthetic fixtures, not surveyed geography or calibrated engineering simulations; the synthetic terrain fixture is not the future terrain authority.

## The Singularity Workshop

![The Singularity Workshop](assets/images/singularity-workshop-avatar.svg)
