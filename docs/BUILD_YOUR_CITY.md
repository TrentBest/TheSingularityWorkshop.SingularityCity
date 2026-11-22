# Build Your Own City

This repository is a working example and teaching kit. The generic spatial engine loads authored city data; it is not a hard-coded scene.

## Two separate contracts

- [`data/places.json`](../data/places.json) is the discovery catalog: stable place IDs, presentation, owners, capabilities and status.
- [`data/city-blueprint.json`](../data/city-blueprint.json) is the spatial blueprint: coordinate space, districts, routes and parcel-generation rules.
- [`schemas/city-blueprint.schema.json`](../schemas/city-blueprint.schema.json) describes the versioned blueprint contract.

Discovery metadata and spatial construction evolve at different rates, so they remain separate.

## Districts, routes and parcels

Each district declares a stable ID, display name, presentation class and polygon in map coordinates. Routes are ordered coordinate points with a semantic kind: arterial, transit or local. They describe connectivity, not permission to traverse.

A district's `parcelGrid` defines origin, rows, columns, dimensions, spacing and occupancy. The blueprint supplies a seed and versioned algorithm identifier. The renderer derives parcel IDs from district, row and column. The same seed and parameters reproduce the same candidate layout.

Generated parcels are currently a deterministic visualization proof—not persisted land ownership, zoning, permits or authoritative city state. A production editor must persist accepted parcels as explicit records before they become authoritative.

## Provenance and authoring

Every generated feature should retain blueprint identity/version, generator algorithm and seed, parameters, source record, manual edits and owning repository. The browser currently exposes place provenance; the same inspection contract should expand to districts, routes and parcels.

To create another city, copy both data contracts, assign a new stable `city.id` and matching blueprint `cityId`, then author its districts, routes and places. Never encode identity in array order or display names.

Keep authored definitions separate from evolving runtime state. The host will own accepted parcels, ownership, zoning, construction, residents, services, events and persistence. The renderer is an observation, never the authority.

`Ontology → MicroBundles → arbitration → Experience → spatial manifestation`

## Reproduce and validate

1. Clone the repository and serve `index.html` through a local HTTP server.
2. Edit the catalog or blueprint and refresh.
3. Run `node tests/validate-catalog.mjs`.
4. Follow the provenance panel to inspect the selected place's owner.

The Pages workflow builds from `development`; it does not publish NuGet packages or claim live persistence, multiplayer or authoritative simulation.
