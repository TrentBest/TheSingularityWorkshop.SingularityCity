# Maps Are the City's Data

## The governing idea

A city is not built from one map. It is built from a collection of authoritative, versioned spatial datasets that share a coordinate reference, stable identities, provenance and explicit relationships. A map is a view over those datasets. It must never become a second source of truth.

The same parcel can appear on a cadastral map, zoning map, utility map, transit accessibility map, construction map and first-person world. Its identity does not change when the active map changes.

`Physics terrain → hydrology → land cover → districts → parcels → streets → transit → utilities → buildings → places → experiences`

Physics owns the physical terrain state and evolution. City layers consume that source and express city-specific relationships. This is a dependency order for reasoning, not a rigid one-way pipeline. City planning is iterative: a road changes parcel geometry, buildings change demand, drainage changes buildability, and a new transit line changes land value and development pressure.

## Map-layer contract

`data/map-layers.json` is the discoverable layer catalog. Every layer declares:
- stable layer ID and title;
- semantic category;
- source path or JSON Pointer;
- implementation/authority status;
- default visibility;
- human-readable purpose.

`data/terrain/city-terrain.json` is the first physical geography fixture. It defines a shared map coordinate space, sampled relative elevation, land-cover cells, watershed boundaries, streams, terrain features and a hazard-screening polygon. Its values are synthetic and deliberately labelled as such. It is a temporary presentation and renderer fixture—not the terrain-generation authority. The intended source authority is a versioned Physics terrain dataset imported through a declared coordinate and provenance contract. See [Physics Terrain and Worldbuilding](PHYSICS_TERRAIN_AND_WORLDBUILDING.md).

## The map families

| Family | Core entities | Questions it answers |
|---|---|---|
| Base geography | terrain, elevation, slope, geology, soils, water | What is the ground like? |
| Hydrology | watershed, catchment, stream, floodplain, drainage | Where does water come from and go? |
| Ecology | habitat, canopy, land cover, corridor, wetland | What living systems are here? |
| Planning | district, zone, parcel, easement, right-of-way | What may be built, where, and under what rules? |
| Mobility | street, intersection, sidewalk, cycleway, path | How can people and goods move? |
| Transit | route, stop, station, service, headway | Who can reach what, and how reliably? |
| Utilities | network, node, connection, capacity, service area | How does the city receive and distribute essential services? |
| Built form | building, floor, room, entrance, public realm | What physical places exist? |
| Civic | institution, service area, school, clinic, emergency facility | What can residents access? |
| Operations | work order, closure, incident, construction, maintenance | What is happening now? |
| Experience | spawn, portal, navigation mesh, interaction anchor | How does a person inhabit the city? |

## Coordinate reference and scale

The current blueprint uses a local 900 × 590 map-unit plane. That is a convenient authored coordinate system, not latitude/longitude and not a projected CRS. The terrain fixture shares that exact plane. Production geography must explicitly declare its horizontal CRS, vertical datum, units, axis order, origin, transform and source resolution. Never silently mix WGS84 degrees, projected metres, local scene units or building-local coordinates.

A future world transform maps local projected coordinates to simulation/world coordinates. Vertical elevation is a separate axis and datum. Tile pyramids, vector tiles and streamed terrain chunks should be selected by observer distance and fidelity; the authoritative source remains independent of the current visual resolution.

## Terrain-first city layout

A responsible city-layout workflow proceeds in this order:

1. Establish the region, boundary, coordinate reference and scale.
2. Generate or import physical terrain and supported material fields from Physics; retain the exact source model, run, seed, parameters, units and spatial frame.
3. Derive slope and interpret geology, soils and landforms from actual physical evidence; label unsupported fields as unavailable rather than fabricating them.
4. Couple water models to the terrain where supported; keep erosion, sediment exchange, infiltration and other future capabilities explicitly separate until validated.
5. Delineate watersheds, drainage paths, wetlands, shorelines and hazard constraints from supported data.
6. Establish ecological protections and connected green/blue infrastructure.
7. Place district boundaries around geography, access, existing settlements and civic purpose.
8. Lay out movement networks and transit before subdividing every block.
9. Generate candidate blocks and parcels from street geometry, frontage, easements and planning rules.
10. Reserve utility corridors and service sites; test capacity and redundancy.
11. Place public facilities by population, accessibility and service-area analysis.
12. Author buildings, entrances, public spaces and the walkable world.

This is not a substitute for engineering, planning law, surveying or environmental review. Those systems need their own validated data, uncertainty, permissions and approval workflows.

## The city-builder loop

A mayor/player action is a proposal against the same model used by the map:

`Observe → Select → Propose → Validate → Preview → Approve → Commit → Simulate → Re-observe`

For example, drawing a new street should produce a proposal with geometry, right-of-way, intersections, affected parcels, utility conflicts, environmental impacts, estimated cost and affected residents/services. The player previews the consequences before the host commits an authoritative change. A zoning change, transit route, park, building permit or utility upgrade follows the same pattern with domain-specific validators.

The renderer does not own the map data. The map is not authoritative merely because it is visible. A rendered layer carries the identity, source, revision and status of the facts it depicts.

## Data authority and provenance

Every feature should distinguish:
- **observed**: derived from an external source with date, licence and accuracy;
- **authored**: explicitly designed by a creator;
- **generated**: derived from a named algorithm, version, seed and parameters;
- **simulated**: produced by a model with assumptions and run identity;
- **proposed**: awaiting validation or approval;
- **committed**: accepted into authoritative city state.

Uncertainty is data. A hazard screening polygon is not a flood determination. A generated parcel is not a legal parcel. A route line is not a transit service. A building footprint is not a safe walkable interior.

## Living map stack

The browser map currently renders elevation tint and marching-squares contour segments from the same sampled terrain grid, with independently toggleable land-cover, hydrology and infrastructure overlays. It remains a local proof projection. The next terrain adapter must feed the same Physics dataset into both the map and world representations. Renderer should own observer-relative representation, level of detail, culling and frame composition. Visualize should manifest those frames. City owns feature identity, geometry, semantics, source lineage and map-layer selection. A host owns input, camera, persistence, multiplayer and authority.

The long-term map stack should support:
- synchronized layer visibility and opacity;
- selectable feature inspection and relationship traversal;
- scale-aware labels and generalization;
- time-aware layers and before/after comparison;
- query and spatial filtering;
- route/network analysis and service-area analysis;
- terrain profiles and cross-sections;
- editing tools with undoable proposals;
- provenance, confidence and data freshness indicators.

## Historical and temporal cartography

A map is also a record of what its maker chose and was able to represent at a particular time. Historical maps are not deficient modern maps: they preserve period-specific knowledge, purpose, conventions and omissions. The same City identities should be traceable across hand-drawn plans, historical surveys, modern topographic maps and analytical layers without implying that every source contained the same information.

Keep the untouched source image, any georeferenced overlay, interpreted features and the temporal City model distinct. Record source date and purpose, represented time, scale/coverage, legend, coordinate reference, transformation, provenance, rights, uncertainty and interpretation status. Unknown information stays unknown; absence from a map is not proof of absence from the place.

Time-aware features need valid-time intervals (when something existed) and record-time provenance (when and why City learned it). Events should connect to affected places and systems so the history can explain growth, civic achievements, hardship, conflict, shocks and recovery—with evidence, competing accounts and impacts, not a single decorative timeline.

See [Historical Cartography and the City's Changing Story](HISTORICAL_CARTOGRAPHY_AND_CITY_HISTORY.md) for the source contract, temporal model, narrative principles and implementation sequence.

## Synthetic fixture disclaimer

The terrain/elevation, land-cover, stream and hazard data currently in this repository are synthetic. They exist to prove the schema, map stack and rendering workflow. They must not be used for real construction, navigation safety, flood decisions, emergency planning or property claims.
