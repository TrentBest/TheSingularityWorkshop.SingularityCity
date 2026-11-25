# Greenhollow Living Scene Manifest

The first SVG scene now has a companion manifest at [data/maps/greenhollow-living-scene.json](../data/maps/greenhollow-living-scene.json), governed by [living-scene.schema.json](../schemas/living-scene.schema.json).

The manifest distinguishes a **map actor** from a **City person**:

- Mara's peddler actor binds to the existing `mara-peddler` person in `data/commerce-route-fixture.json`. The same fixture identity can be resolved by other City projections.
- A market-stall keeper, customer, and itinerant visitor bind to deterministic generated candidate IDs in `data/npc-generation/greenhollow-candidates.json`. They are generated suggestions, not canonical person identities or simulated actors.
- The second customer remains an illustrative placeholder with no generated or person identity.
- The river, road, bridge, market, inn, and mill are likewise illustrative map features. The manifest does not falsely bind them to authoritative geometry or place records.
- Every actor references a declared layer and the matching SVG group carries the exact same stable presentation ID, so a renderer can target or replace that element without guessing its position in the SVG. Generated candidates and decorative actors are restricted to ambient-only motion; only a future simulation projection may claim domain-driven motion.

This is the first data-bound projection, not a live simulation. Mara's animated SVG position does not update her visit, route progress, schedule, or physical location. The manifest records the exact source asset and fixture so a future renderer can replace the illustration without changing the person identity.

The next expansion should bind existing City place and route records to spatial geometry, then add resident records for the keeper and customers through the NPC generation pipeline. Nested district, building, and room maps should be child map manifests with explicit parent transforms—not inferred from SVG groups.

The candidate generator and its boundaries are described in [Greenhollow NPC generation](GREENHOLLOW_NPC_GENERATION.md). The candidate IDs remain distinct from SURPS character identity until the canonical portable character contract is available.

The reusable [twenty-tile SVG atlas](MAP_TILE_CATALOG.md) provides the first shared visual vocabulary for map composition. The symbols remain presentation-only; map features and actor identities continue to come from manifests and City records.
