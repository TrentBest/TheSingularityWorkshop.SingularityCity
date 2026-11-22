# City Spatial and Civic Model

## City is persistent geography

A City is a continuous place, not a sequence of screens. Its primary identities should remain stable while its presentation evolves.

Core spatial concepts:

- **City** — the persistent geographic and civic container.
- **District** — a named, governed and addressable region.
- **Parcel** — an owned, leasable or otherwise controlled piece of land.
- **Place** — a discoverable location with identity and optional capabilities.
- **Structure** — a physical or conceptual construction occupying one or more parcels.
- **Entrance** — a traversable boundary between contexts or experiences.
- **Route** — a navigable connection between places.
- **Service** — a civic or commercial function available at a place.
- **Resident (Digiten)** — a persistent inhabitant with identity, needs, goals and activity.
- **Institution** — an organization such as City Hall, transit, emergency services or maintenance.
- **Event** — a recorded change with cause, actor, time and affected entities.

These are domain concepts, not a closed list of hard-coded scene types. New structures and places should be introduced through data and manifests.

## Spatial relationships

Do not collapse all spatial relationships into a single adjacency graph.

- **Geographic adjacency** — two regions physically border one another.
- **Traversal** — a route can be used by a particular actor or vehicle.
- **Visibility** — one place can be seen from another under current conditions.
- **Perception** — an observer can detect and interpret something.
- **Experience transition** — crossing an entrance transfers context to another domain or host.

A wall may block traversal while leaving geographic adjacency intact. A hidden entrance may exist but remain undiscovered. A distant landmark may be visible without being reachable.

## Place and experience separation

A place can expose one or more experience entry points. The entry point is a contract, not an embedded implementation.

An entry point should identify:
- stable experience and entry-point IDs;
- the owning repository or package identity;
- the target capability or MicroBundle;
- the City place and optional anchor;
- access requirements;
- host requirements;
- presentation metadata.

City resolves the place and access policy. The target experience owns its domain state and simulation.

## Ownership and civic state

Ownership, zoning, permits, construction status, service coverage and civic authority are City concerns. They should be represented as explicit state and event history rather than inferred from the current scene.

A parcel can have a footprint before a structure exists. A structure can be planned, permitted, under construction, occupied, maintained, abandoned or demolished. The visible scene is a projection of that state.

## Residents and services

Digitens are residents, not decorative crowd instances. A resident may have:
- stable identity;
- home and workplace references;
- needs and capabilities;
- schedule and current activity;
- relationships and affiliations;
- route and destination intentions;
- inventory or resources;
- civic role and permissions.

Start with deterministic schedules and a small population. Add richer agency only after identity, activity, location and provenance are observable and testable.

Civic services—police, fire, paramedic, transit, utilities, education, building maintenance and construction—should be modeled as reusable capabilities and institutions. They should not be implemented as unrelated bespoke scenes.

## Provenance

Every meaningful state change should be explainable. Record what changed, why it changed, which actor or system caused it, and which constraints were evaluated. Provenance makes the City inspectable and gives AI-assisted authoring a safe audit surface.

## Persistence and scale

Persistence belongs to the authoritative host, not the browser demo. Simulation fidelity can vary by distance and relevance:

- **Immediate** — full interaction and high-frequency updates.
- **Local** — nearby activities and service interactions.
- **Regional** — district-level schedules, traffic and resource flows.
- **Distant** — aggregate outcomes and coarse population/economic updates.

Changing fidelity must not silently rewrite domain identity or erase causal history.


## City systems catalog

The domain inventory is data, not a hard-coded page list: [data/city-systems.json](../data/city-systems.json) is described by [city-systems.schema.json](../schemas/city-systems.schema.json). Each system declares its discipline, summary, component families, evidence status, intended visualization, candidate measures, and theory anchor. The landing page renders these records dynamically. A status of concept or preview is not a claim of an implemented simulation.
