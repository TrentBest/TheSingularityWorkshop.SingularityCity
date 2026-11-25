# Map Composition and Nested Maps

## What is now composed

The first map-instance contract turns the existing twenty-symbol tile atlas into a reusable composition format. Greenhollow now has three explicit map instances:

- **Market District** — a 5 × 4 tile-grid study using terrain, ecology, civic, built-form, transport and hydrology symbols.
- **Market Stall Interior** — a 4 × 3 child presentation map.
- **The Green Inn Interior** — a 4 × 3 child presentation map.

The district declares each child by stable map ID and a parent-local translation, quarter-turn rotation and positive scale. Each interior points back to the district and to the exact parent scene feature that represents its building. A renderer can therefore open a child view without guessing which building it belongs to.

Files:
- [Map-instance schema](../schemas/map-instance.schema.json)
- [Market District map](../data/maps/greenhollow-market-district.map.json)
- [Market Stall interior](../data/maps/greenhollow-market-stall-interior.map.json)
- [Green Inn interior](../data/maps/greenhollow-inn-interior.map.json)
- [Composition tests](../tests/map-composition.test.mjs)
- [Tile catalog and atlas](MAP_TILE_CATALOG.md)

## Contract

A map instance declares stable identity, kind and status; a local coordinate space in tile-grid units; its tile catalog; stable placement IDs, tile IDs, layers, integer grid positions and quarter-turn rotations; optional bindings to scene feature identities; child map IDs and explicit local-to-parent transforms; and explicit limitations.

The map set is a graph of map instances. A child must resolve to an existing parent, and its parentFeatureId must be among that parent map’s declared feature bindings. The validator rejects missing children, duplicate IDs, invalid coordinates, unresolved tile/feature references, invalid transforms and hierarchy cycles.

## Coordinate and transform semantics

Grid x increases rightward and y increases downward from the top-left origin. Each placement occupies one tile cell in this presentation grid. Rotation is a clockwise quarter-turn in degrees. A child transform maps the child local origin into its parent local tile coordinate space, then applies the declared clockwise rotation and uniform positive scale.

These values are scene-composition coordinates only. They are not metres, feet, surveyed building dimensions, a geographic CRS, collision geometry or navigation topology. A future adapter must explicitly map these local coordinates to the City spatial frame; no silent unit conversion is permitted.

## Interactive preview

The [Map Studio page](../maps.html) reads the tile catalog, living-scene feature identities and the three map-instance JSON files directly. It composes external SVG symbols with `<use>`, offers per-layer visibility controls, opens the declared Market Stall and Green Inn child maps, displays the parent feature/transform metadata, and returns to the parent district.

This is a browser-side City composition preview. It does not invoke Renderer or Visualize, and it does not imply that SVG tiles are authoritative geometry or simulation inputs.

## Important separation

The tile atlas remains presentation-only. A road symbol does not prove a traversable road; a river symbol does not define water flow; a bridge symbol does not prove a crossing is structurally or physically valid; and adjacent symbols do not automatically connect.

The current Greenhollow building features are illustrative placeholders. The interior maps are visual studies, not committed building plans. They do not define doors, room inventories, occupancy, accessibility, collision, commerce, safety or physical simulation.

City owns stable spatial identity, feature meaning, geometry, topology and provenance. Physics owns physical terrain and physical consequences. Renderer chooses observer-relative representations and level of detail. Visualize manifests the selected frame. A host owns camera, input, authorization and persistence.

## Next gates

1. Add semantic edge/connection contracts only when they can be tied to City topology rather than guessed from SVG art.
2. Bind authored map features to committed City place/building identities, preserving placeholder status until then.
3. Add a map-set registry and authoring workflow for larger World → Region → Settlement → District → Site → Interior → Room hierarchies.
4. Inspect the current Renderer and Visualize contracts before building a renderer adapter; do not invent a competing frame protocol.
5. Add a Pages map-composition preview that reads these JSON files and opens nested maps using their transforms.