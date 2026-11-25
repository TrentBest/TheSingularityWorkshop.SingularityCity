# Greenhollow Living Scene Manifest

The first SVG scene now has a companion manifest at [data/maps/greenhollow-living-scene.json](../data/maps/greenhollow-living-scene.json), governed by [living-scene.schema.json](../schemas/living-scene.schema.json).

The manifest distinguishes a **map actor** from a **City person**:

- Mara's peddler actor binds to the existing `mara-peddler` person in `data/commerce-route-fixture.json`. The same fixture identity can be resolved by other City projections.
- The market keeper, customers, and second traveler remain explicitly illustrative placeholders. They have presentation IDs, not invented City person identities.
- The river, road, bridge, market, inn, and mill are likewise illustrative map features. The manifest does not falsely bind them to authoritative geometry or place records.
- Every actor references a declared layer. Decorative actors are restricted to ambient-only motion.

This is the first data-bound projection, not a live simulation. Mara's animated SVG position does not update her visit, route progress, schedule, or physical location. The manifest records the exact source asset and fixture so a future renderer can replace the illustration without changing the person identity.

The next expansion should bind existing City place and route records to spatial geometry, then add resident records for the keeper and customers through the NPC generation pipeline. Nested district, building, and room maps should be child map manifests with explicit parent transforms—not inferred from SVG groups.
