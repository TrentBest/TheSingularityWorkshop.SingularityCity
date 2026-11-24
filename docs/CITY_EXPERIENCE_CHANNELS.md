# City Experience Channels

## One world, independent observers

Singularity City has one domain model and multiple independent ways to experience it. Presentation mode must never change city identity or authoritative state.

| Mode | Visualization | Renderer |
|---|---:|---:|
| Visualization only | On | Hidden |
| Renderer only | Hidden | On |
| Both together | On | On |

The controls in the browser preview switch these modes without reloading the City data. Visualization is the visible spatial projection. Renderer is a textual observer that describes the selected place and summarizes the connected Civic Quarter fixture. The two are deliberately separable. A separate Hyper-visualization proving ground below the district scene embeds Visualize's WebGPU Soldier Field lab.

## Current browser proof

- The Visualization channel uses the existing City map, district SVG, terrain layers, network overlays and place selection.
- The Renderer channel reads the same selected-place fields and district status from the City browser model and presents them as text.
- The audio control is opt-in and starts only after a user gesture. It currently produces a low procedural tone/noise ambience sketch through Web Audio.
- The current sound is **not** a recording, measured soundscape, or simulation of traffic, weather, crowds, machinery or individual events. It is a first audible output proving that audio can be independently enabled and muted.
- All current city and district content remains synthetic authored preview data.

## District map-to-scene exploration

The City map is also a district selector. Selecting a district footprint or its map label highlights that footprint and updates the scene directly below the map. Previous/next controls move through the blueprint districts while retaining the same district identity in the selected-scene heading and Renderer observer.

The first scene is an oblique aerial massing study. District parcel-grid dimensions and occupancy are sourced from `data/city-blueprint.json`; illustrative building heights are explicitly placeholders, not surveyed building facts. Civic Quarter additionally labels Civic Hall, Civic Library, Community Clinic and Founders Square using records from `data/districts/civic-quarter.json`. Other districts remain massing studies until they have richer domain models. This is a first visible spatial view, not photorealism or a first-person world.

## Hyper-visualization proving ground

The City page embeds the Visualize-owned Soldier Field WebGPU lab. Its `renderer-policy.json` is generated from the real .NET Renderer `ObserverRepresentationPolicy`; the browser runner queries its 8-distance × 5-minimum-representation decision matrix and, by default, refreshes and draws only the selected horizon. An explicit stress toggle runs all eight instance-buffer workloads.

This is a cross-repository policy-to-presentation proof, not yet a live City renderer:
- The policy is generated in .NET and delivered as a deterministic static manifest; Renderer does not execute inside the browser.
- The lab uses procedural soldier geometry, not City-owned building or street geometry.
- The current stress fixture renders the same selected population in every horizon; it does not yet perform per-entity occlusion, culling, or geometry promotion.
- The attention-floor example demonstrates a Renderer decision but is not yet connected to live camera focus or focal-beam detail.
- WebGPU executes on the visitor's supported browser/device GPU. GitHub Pages only serves the files; it does not provide a GPU server.
- Browser frame/JavaScript timing and upload counters are diagnostic telemetry, not GPU timestamp measurements.

This is the current capability showcase and a proving ground for the next City integration: stable City entity IDs and transforms should enter Renderer policy, selected frames should flow through Visualize, and actual submitted work should respond to observer movement and attention.

## Sound as a world observation

The intended soundscape should be derived from observable world state and spatial context, not attached as arbitrary decorative loops. A future audio observer should consume stable City identities and domain-owned event streams, then select sound sources according to listener position, distance, occlusion, time and observer budget.

Candidate sound domains include:

- environmental ambience: wind, rain, water, birds and seasonal conditions;
- mobility: pedestrians, bicycles, road traffic, transit arrivals and departures;
- civic and commercial life: markets, public spaces, workshops and service activity;
- construction and infrastructure: machinery, maintenance, utilities and alarms;
- authored events: announcements, performances, ceremonies and localized incidents.

Physics and domain owners remain authoritative for the events and physical conditions they produce. City supplies spatial context and discoverability. The audio observer renders an acoustic interpretation; it does not invent authoritative events.

## Separation contract

- City owns place identity, spatial relationships, domain facts and source provenance.
- Renderer owns textual/semantic representation policy for the observer.
- Visualize owns visual manifestation and rendering backends.
- Audio presentation is a separate observer/output channel; it must be usable with or without visual output.
- The host owns user input, audio permission, device lifecycle, accessibility settings and presentation orchestration.
- Domain repositories own the events and physical consequences that can become audible.

The current textual observer is a small browser proof, not yet the complete shared Renderer package integration. The procedural audio sketch is not yet a domain-event-driven soundscape. No first-person movement, spatial audio positioning, persistence, live simulation or multiplayer audio is claimed.

## Next vertical slice

1. Replace illustrative massing with richer district-owned building and street geometry, then add camera viewpoints (street, window and aerial) without inventing missing source data.
2. Replace DOM-derived text with a versioned observer input contract over stable City entity IDs.
3. Add a small event stream for a single district (for example, transit arrival, pedestrian activity and water flow), with explicit synthetic provenance.
4. Map those events to independently testable audio cues and a spatial mix.
5. Add listener position, distance attenuation, occlusion and mute/volume/accessibility controls.
6. Verify all three presentation modes against the same source revision and entity identities.
7. Integrate the shared Renderer and Visualize packages through their published contracts rather than copying their implementation into City.
