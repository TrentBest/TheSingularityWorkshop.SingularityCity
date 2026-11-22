# Build Your Own City

This repository is both a working example and a teaching kit. Singularity City is one authored city catalog; the same data contract can describe a different city, several cities, or a city-builder that edits and exports catalogs.

## 1. Start with the data, not the scene

The current browser proof reads [`data/places.json`](../data/places.json). The catalog declares a schema version, city identity and place records. Each place has:
- a stable `id` used by code and references;
- display fields used by the interface;
- coordinates used to position its SVG marker;
- an owning repository and source path;
- capabilities and an explicit implementation status.

Add a place by adding a record. Give it a unique ID, owner, source path, coordinates and capability list. The browser builds its map markers and destination cards from these records.

## 2. Make the SVG reflect the catalog

The SVG district shapes are authored in `index.html`; place markers are created by `assets/js/city.js` from catalog coordinates. This is intentionally inspectable: the map is a projection of data, not an image file with invisible hotspots.

To change a marker's position, edit its `coordinates` in the catalog. To change district geometry, edit the SVG path in the HTML. Keep geographic identity in data and visual projection in SVG.

## 3. Trace a visible feature to its owner

Select a place in the preview. The provenance panel shows its owner repository, source path, catalog record, capabilities and status. The source link opens the referenced file in GitHub.

Use the owner repository for domain behavior. For example, the Underworks entrance is cataloged by City, while its underground topology and simulation belong to [FSM_Dungeon](https://github.com/TrentBest/FSM_Dungeon). City owns discoverability and the entrance decision; the destination owns its internal world.

Statuses are deliberately explicit:
- `concept`: planned content, not an implemented simulation;
- `planned`: intended destination or capability;
- `reference-integration`: a documented cross-repository boundary, not proof of a live runtime handoff.

## 4. Create another city

Copy the catalog structure and give the new city a distinct `city.id`. Add districts, places, owner references and coordinates appropriate to its own map. A future multi-city host can load multiple catalogs and select one by stable city ID; do not encode city identity in display names or array positions.

A city-builder can expose these same records through editors for parcels, structures, routes, residents, services and entry points, then validate and export the catalog. Keep authored definitions separate from evolving simulation state.

## 5. Extend the package responsibly

Before treating this illustrative JSON as a production contract, add formal schema validation, migration rules, stable package/API types, host authorization and persistence. Keep these boundaries:

`Ontology → MicroBundles → arbitration → Experience → spatial manifestation`

The catalog describes spatial manifestation and discovery. It does not become the owner of every capability it points to. NuGet can distribute code; MicroBundles compose optional capabilities; hosts validate access and execute the selected experience.

## Reproduce the preview

1. Fork or clone this repository.
2. Open `index.html` through a local static HTTP server (ES modules and `fetch` require HTTP; opening the file directly may be blocked by the browser).
3. Edit `data/places.json` and refresh.
4. Follow the provenance panel to inspect the implementation or domain contract that owns the selected place.

The GitHub Pages workflow publishes the same repository files from `development`. It does not publish NuGet packages or claim a live multi-user simulation.
