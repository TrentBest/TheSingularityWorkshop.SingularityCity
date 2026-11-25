# Map Tile Catalog and SVG Atlas

The first reusable visual tile library is available as [tile-catalog.json](../data/maps/tile-catalog.json) and [map-tile-atlas.svg](../assets/images/map-tile-atlas.svg). The catalog defines twenty stable tile IDs across terrain, ecology, hydrology, transport, land use, built form, and civic space. Each record points to an SVG `<symbol>` ID in the atlas, allowing a future map composer to reuse the same artwork in multiple maps without copying SVG markup.

The catalog is deliberately presentation-only. A `river` tile is not a hydrology model; a `road` tile is not a traversable route; a `shop` tile is not a merchant or inventory. Authoritative feature records, topology, coordinates, access, and simulation remain separate City/domain data. Tile placement should eventually reference semantic feature IDs and source revisions, while renderer-selected detail may swap symbols or richer geometry without changing map identity.

The initial set is intentionally broad rather than exhaustive. Add tiles by domain and function—not by creating a new one-off image for every map. Variants should be metadata or composition rules where possible. The next composition contract should add adjacency/edge compatibility, rotation policy, parent-map transforms, and nested child-map references, then validate a small Greenhollow district with building and room map levels.

Validation runs in the Pages build through `tests/map-tile-catalog.test.mjs`.
