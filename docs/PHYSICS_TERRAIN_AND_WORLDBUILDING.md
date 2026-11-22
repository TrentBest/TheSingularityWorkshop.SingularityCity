# Physics-Owned Terrain and Worldbuilding

## Decision

**Physics owns the generation and physical evolution of terrain. Singularity City consumes terrain as authoritative spatial data and builds civic geography on top of it.**

City must not grow a competing elevation generator, erosion approximation, geology solver, or terrain-editing physics engine. Its current `data/terrain/city-terrain.json` is a synthetic presentation fixture only. It exists to exercise map layers and contour rendering until a real Physics-produced terrain dataset is connected.

The dependency direction is:

`Physics model + seed + parameters`
→ `physical terrain state and observations`
→ `domain interpretation / feature classification`
→ `City spatial dataset and map layers`
→ `districts, parcels, roads, utilities and buildings`
→ `Renderer / Visualize manifestation`

## Existing Physics foundations verified on development

The following implementations exist in `TrentBest/TheSingularityWorkshop.Physics`:

| Capability | Existing source | What it actually provides |
|---|---|---|
| Volcanic deposition | `Physics/Geology/VolcanicTerrain2D.cs` | A row-major metre-based 2D elevation field and deterministic cone deposition for a prescribed volume, with discrete volume accounting |
| Terrain-aware water | `Physics/Hydrodynamics/BathymetricShallowWaterBasin2D.cs` | A fixed-bed, cell-centred shallow-water model with wet/dry behavior, rainfall source input and conservative flow updates |
| Water foundation | `Physics/Hydrodynamics/ShallowWaterBasin2D.cs` | Renderer-independent 2D shallow-water simulation |
| Spatial frame identity | `Physics/Spatial/CoordinateFrame2d.cs` | Stable identity for a caller-defined 2D coordinate frame; units and transforms remain caller-defined |
| Deterministic region addressing | `Physics/Universe/UniverseGrid.cs` | Finite 3D grid addressing with stable X-fastest linear indexing |
| Deterministic cell seed | `Physics/Universe/DeterministicCellGenerator.cs` | Stateless seed/value derivation from universe seed and cell address |
| Sparse 3D occupancy | `Spatial/SparseVoxelVolume3d.cs` | Chunked binary solid occupancy; not a terrain surface or elevation field |
| Procedural geometry foundation | `Physics/Spatial/SeededPointSet2d.cs` and spatial geometry primitives | Bounded renderer-independent geometry samples and predicates |

These are useful building blocks, not a complete world-building product. In particular:

- Volcanic deposition does not yet simulate tectonic plates, magma dynamics, eruption prediction, cooling or erosion.
- Bathymetric shallow water has fixed bed elevation; it does not yet exchange sediment with or deform the terrain.
- The universe grid and deterministic cell generator provide address/seed foundations, not persistent evolving planetary generation.
- Sparse voxels represent occupancy, not a heightmap, geological material volume, mesh or collision-ready terrain surface.
- The procedural geometry contract explicitly distinguishes seeded geometry from physical material behavior.

See the Physics repository's `docs/GEOLOGY_VOLCANIC_TERRAIN.md`, `docs/HYDRODYNAMICS_SHALLOW_WATER_2D.md`, `docs/TERRAIN_INTERACTIONS_AND_MICROBUNDLES.md`, `docs/PROCEDURAL_GEOMETRY_AND_FRACTAL_DATA.md`, and `docs/UNIVERSE_AND_OBSERVER_RESOLUTION.md` for the detailed scope and evidence boundaries.

## Ownership boundaries

| Concern | Owner |
|---|---|
| Elevation, material state, deposition, erosion, water flow, physical budgets and solver validation | Physics |
| Geological / geomorphological interpretation of physical evidence and uncertainty | Relevant expert-domain capability, with evidence and thresholds |
| City coordinate reference, region identity, feature IDs, provenance links and spatial relationships | Singularity City |
| Watershed/planning overlays and civic constraints derived from source data | City domain model, preserving source authority |
| Districts, parcels, right-of-way, zoning, buildings, services and civic decisions | Singularity City |
| Terrain meshing, level of detail, frame representation and pixels | Renderer / Visualize |
| Camera, player movement, collision integration, streaming, persistence and multiplayer | Host / world runtime |

A feature classifier may identify a cliff candidate from slope, relief, extent and material evidence. It must not manufacture a cliff in order to make the map look convincing. Classification retains the physical source revision, method/version, thresholds, confidence and uncertainty.

## Shared spatial contract

Before importing a Physics field, the adapter must declare:

- stable world/region ID and terrain dataset ID;
- source model ID/version, algorithm version, seed and complete generation parameters;
- horizontal coordinate-frame ID, origin, axis orientation, units and transform;
- vertical datum, elevation units and sign convention;
- grid width/height, row/column order, cell spacing and sample location convention (cell-centred or vertex-based);
- source revision, generation/run identity, provenance and validation status;
- supported physical fields and explicit omissions;
- bounds, resolution and any resampling/interpolation policy.

A coordinate-frame identifier alone is not a coordinate transform. Do not equate City map units, metres, longitude/latitude, local world units or building-local coordinates without a declared conversion.

The first integration should preserve Physics samples and metadata exactly. Any projection, tiling, resampling, contouring or mesh generation is a derived representation with a traceable link to the source field. It must not overwrite the source values.

## Worldbuilding sequence

1. **Generate the region in Physics.** Establish bounded inputs, seed, model versions, spatial frame and numerical limits. Begin with the existing 2D elevation/deposition foundation; expand physical capabilities only with their own conservation and validation tests.
2. **Establish water and land behavior.** Couple terrain to the existing bathymetric shallow-water model. Treat erosion, sediment transport, soil moisture, infiltration, tectonics and thermal behavior as separate capabilities until implemented and validated.
3. **Interpret physical evidence.** Derive slope, drainage, watershed, shoreline, landform and hazard candidates from actual source fields. Preserve uncertainty and model limitations.
4. **Import into City.** Register a terrain dataset and stable spatial feature identities. City layers reference the dataset and its derived products; City does not recalculate the physical terrain.
5. **Build the city around the land.** Use terrain, drainage, ecological constraints and access to propose districts, street alignments, blocks, parcels, utility corridors, public space and building sites.
6. **Validate proposals.** Check grade, drainage, access, service reach, environmental constraints and domain-specific rules. Preview consequences before a host-authorized commit.
7. **Manifest the same world.** Renderer / Visualize produce the map and world representations from shared data. First-person terrain, map contours, collision and selected world anchors must agree on identity and coordinate transforms.

## Immediate City integration milestone

Replace the current synthetic terrain fixture as the *source of truth* with an imported, versioned Physics terrain dataset. Keep the synthetic fixture only as a clearly labelled fallback/demo fixture until that import path is proven.

The first adapter should be read-only and lossless for the source fields it supports. It should not invent missing geological or hydrological fields. Its acceptance tests should prove:

- stable dataset and feature identities across repeated imports;
- exact preservation of source dimensions, ordering, elevations and units;
- explicit and tested coordinate transforms;
- provenance from every City terrain layer back to a Physics model/run;
- derived slope/contour/watershed products can be regenerated from the same source revision;
- no City-owned terrain mutation bypasses a Physics capability;
- synthetic fixtures remain visibly distinguished from Physics-generated output.

## Explicit status

This document records the integration decision and current source inventory. It does **not** claim that a City-to-Physics adapter, general procedural terrain generator, erosion solver, full world builder, terrain collision mesh, or playable first-person city exists yet. The next implementation should start from the existing Physics APIs and tests, not from a guessed API or a duplicate solver.
