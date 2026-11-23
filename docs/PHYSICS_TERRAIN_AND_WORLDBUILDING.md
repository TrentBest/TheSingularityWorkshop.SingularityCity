# Physics-Owned Terrain and Worldbuilding

## Decision

**Physics owns the generation and physical evolution of terrain. Singularity City consumes terrain as authoritative spatial data and builds civic geography on top of it.** City must not grow a competing elevation generator, erosion approximation, geology solver, or terrain-editing physics engine. Its current `data/terrain/city-terrain.json` is a synthetic presentation fixture only. It exists to exercise map layers and contour rendering until a real Physics-produced terrain dataset is connected.

The dependency direction is:

`Physics model + seed + parameters` → `physical terrain state and observations` → `domain interpretation / feature classification` → `City spatial dataset and map layers` → `districts, parcels, roads, utilities and buildings` → `Renderer / Visualize manifestation`

## Existing Physics foundations verified on development

| Capability | Existing source | What it actually provides |
|---|---|---|
| Volcanic deposition | `Physics/Geology/VolcanicTerrain2D.cs` | Row-major metre-based 2D elevation field and deterministic cone deposition with discrete volume accounting |
| Terrain-aware water | `Physics/Hydrodynamics/BathymetricShallowWaterBasin2D.cs` | Fixed-bed, cell-centred shallow-water model with wet/dry behavior, rainfall input and conservative flow updates |
| Water foundation | `Physics/Hydrodynamics/ShallowWaterBasin2D.cs` | Renderer-independent 2D shallow-water simulation |
| Spatial frame identity | `Physics/Spatial/CoordinateFrame2d.cs` | Stable identity for a caller-defined 2D coordinate frame; units and transforms remain caller-defined |
| Deterministic region addressing | `Physics/Universe/UniverseGrid.cs` | Finite 3D grid addressing with stable X-fastest linear indexing |
| Deterministic cell seed | `Physics/Universe/DeterministicCellGenerator.cs` | Stateless seed/value derivation from universe seed and cell address |
| Sparse 3D occupancy | `Spatial/SparseVoxelVolume3d.cs` | Chunked binary solid occupancy; not a terrain surface or elevation field |
| Procedural geometry | `Physics/Spatial/SeededPointSet2d.cs` and spatial primitives | Bounded renderer-independent geometry samples and predicates |

These are useful foundations, not a complete world-building product. Volcanic deposition does not yet simulate tectonics, magma dynamics, eruption prediction, cooling or erosion. Bathymetric shallow water has fixed bed elevation and no sediment/bed exchange. Universe addressing and deterministic cell generation are not persistent evolving planetary generation. Sparse voxels represent occupancy, not a heightmap, geological material volume, mesh or collision-ready terrain surface.

See the Physics repository's `docs/GEOLOGY_VOLCANIC_TERRAIN.md`, `docs/HYDRODYNAMICS_SHALLOW_WATER_2D.md`, `docs/TERRAIN_INTERACTIONS_AND_MICROBUNDLES.md`, `docs/PROCEDURAL_GEOMETRY_AND_FRACTAL_DATA.md`, and `docs/UNIVERSE_AND_OBSERVER_RESOLUTION.md` for detailed scope and evidence.

## Ownership boundaries

| Concern | Owner |
|---|---|
| Elevation, material state, deposition, erosion, water flow, physical budgets and solver validation | Physics |
| Geological / geomorphological interpretation and uncertainty | Relevant expert-domain capability |
| City coordinate reference, region identity, feature IDs, provenance and spatial relationships | Singularity City |
| Watershed/planning overlays and civic constraints derived from source data | City |
| Districts, parcels, right-of-way, zoning, buildings, services and civic decisions | Singularity City |
| Terrain meshing, level of detail, frame representation and pixels | Renderer / Visualize |
| Camera, player movement, collision integration, streaming, persistence and multiplayer | Host / world runtime |

A feature classifier may identify a cliff candidate from slope, relief, extent and material evidence. It must not manufacture a cliff to make the map look convincing. Classification retains source revision, method/version, thresholds, confidence and uncertainty.

## Shared spatial contract

Before importing a Physics field, the adapter must declare stable world/region and terrain dataset IDs; source model/version, algorithm version, seed and generation parameters; horizontal frame, origin, axis orientation, units and transform; vertical datum, units and sign convention; grid dimensions, row/column order, spacing and sample convention; source revision/run identity and provenance; supported fields and omissions; bounds, resolution and resampling policy.

A coordinate-frame identifier alone is not a coordinate transform. Do not equate City map units, metres, longitude/latitude, local world units or building-local coordinates without a declared conversion. Preserve Physics samples and metadata exactly. Projection, tiling, resampling, contouring or meshing is a derived representation with a traceable link to source; it must not overwrite source values.

## Worldbuilding sequence

1. Generate the region in Physics with bounded inputs, seed, model versions, spatial frame and numerical limits.
2. Establish water and land behavior using existing physical capabilities. Treat erosion, sediment transport, soil moisture, infiltration, tectonics and thermal behavior as separate capabilities until implemented and validated.
3. Interpret physical evidence: slope, drainage, watershed, shoreline, landform and hazard candidates, preserving uncertainty and model limits.
4. Import into City with stable spatial identities and provenance.
5. Build civic geography around terrain, drainage, ecological constraints and access: districts, streets, blocks, parcels, utility corridors, public space and building sites.
6. Validate proposals for grade, drainage, access, service reach and environmental constraints; preview before a host-authorized commit.
7. Manifest the same world through Renderer / Visualize. Map contours, first-person terrain, collision and world anchors must agree on identity and coordinate transforms.

## Explicit status before the first import

The initial City adapter must be read-only and lossless for supported source fields. It must not invent missing geological or hydrological fields. Acceptance includes stable identities, exact sample/dimension/order/unit preservation, tested transforms, provenance for every derived layer, reproducible derived products, no City-owned physical mutation, and clear separation of synthetic fixtures.

This document does not claim a general procedural terrain generator, erosion solver, full world builder, terrain collision mesh, or playable first-person city.

## City-side import adapter (implemented)

City's `assets/js/physics-terrain-adapter.mjs` accepts `singularity-physics.terrain-heightfield.v1` and returns a read-only `singularity-city.physics-terrain.v1` dataset. The envelope carries dataset identity, source repository/revision/model/version/run, coordinate frame/origin/axes/units, grid dimensions/spacing/order/sample convention, vertical unit/datum/direction, and finite row-major elevations.

The adapter validates required metadata and sample count, rejects non-finite samples, and reshapes the flat buffer without changing sample order or values. It does not infer transforms, resample elevations, classify land cover, or invent watersheds, streams, hazards or geological features. Tests cover exact sample preservation and invalid-input rejection.

**Producer export and visible overlay:** Physics has a reproducible `samples/VolcanicTerrain2DExport` generator and `Physics Volcanic Terrain Export` workflow. It runs the actual `VolcanicTerrain2D` model, applies a 250,000 m³ deposition event, supplies source revision and workflow run ID, validates 432 finite samples and uploads interchange JSON.

City pins the snapshot at `data/terrain/physics-volcanic-terrain.json`. Provenance identifies Physics revision `3b40a7ede4b3752e99adbdb488e39c1e66c57c42` and run `45053864606`. It is a 24×18 local east/north metre grid with model-relative vertical datum; it is **not georeferenced** and is not aligned to real-world Tacoma or surveyed City coordinates.

The map has a separate, initially hidden Physics elevation layer and toggle. It renders only imported samples. Synthetic terrain, land-cover, hydrology and hazard layers remain separate. Snapshot tests verify provenance, dimensions and exact sample preservation.

## Physics volumetric producer contract (available; City importer not yet implemented)

Physics now provides a versioned sparse material-volume envelope for genuinely three-dimensional regions: [producer contract and interchange notes](https://github.com/TrentBest/TheSingularityWorkshop.Physics/blob/development/docs/SPARSE_MATERIAL_VOXEL_VOLUME_3D.md), [JSON Schema v1](https://github.com/TrentBest/TheSingularityWorkshop.Physics/blob/development/docs/schemas/sparse-material-voxel-volume.v1.schema.json), and [synthetic interchange fixture](https://github.com/TrentBest/TheSingularityWorkshop.Physics/blob/development/docs/records/sparse-material-voxel-volume-example.json).

Schema identity: `singularity-physics.sparse-material-voxel-volume.v1`.

The payload carries stable region/dataset/revision IDs; coordinate-frame ID; linear unit; explicit X/Y/Z axis mapping; vertical datum and positive direction; material-catalog identity; source repository/revision; model and algorithm IDs/versions; generation parameters; source run ID and optional seed; grid origin, cubic voxel size, chunk size, and occupied voxel/material samples. Physics validates the schema, finite grid geometry, positive material IDs, duplicate coordinates, and a configurable sample-count limit.

**This is a producer contract, not a completed City capability.** City does not yet import or render this volumetric payload. A future City adapter must remain read-only, preserve voxel samples and all provenance exactly, and refuse to infer coordinate transforms, units, georeferencing, vertical datum, or material properties. It should expose the volume as a distinct 3D source layer; it must not flatten caves, tunnels, overhangs, or underground infrastructure into the 2D height-field importer. Any surface mesh, slope field, contour, or resampled grid must be a separately identified derived product.

The included 2×2×2 sample is a synthetic contract fixture only, not generated geology or a Tacoma-aligned dataset.

## City-derived slope interpretation (first analytical layer)

City's pure, renderer-independent `assets/js/terrain-interpretation.mjs` computes a slope angle at each imported elevation sample. It requires explicit metre spacing and the declared row order; it uses central differences internally and one-sided differences at grid boundaries.

The output is a separate `singularity-city.terrain-slope.v1` dataset retaining source dataset identity and provenance, method/version and degree units. It never mutates Physics elevations.

This is descriptive geometry—not geological classification, drainage prediction, buildability verdict, road-grade certification or engineering analysis. No suitability thresholds are invented. Analytical tests cover flat terrain, a plane with known X/Y gradients, anisotropic spacing and invalid-input rejection. Next: expose the derived field as a labelled optional map layer, then add richer interpretations only when their inputs and assumptions are declared.
