# Singularity City Architecture

## Purpose

Singularity City is the persistent, navigable spatial front door to The Singularity Workshop's experiences. It is not a static city scene and it is not a launcher menu. It is a shared spatial index in which places expose capabilities, experiences have discoverable entrances, and civic life gives the world continuity.

The City answers four questions:

1. **Where am I?** Geography, districts, parcels, landmarks, routes and orientation.
2. **What exists here?** Buildings, services, residents, institutions and experience entrances.
3. **What can I do here?** Discoverable capabilities and the experiences that provide them.
4. **What changed while I was away?** Persistent civic, economic, environmental and construction state.

## Spatial hierarchy

`Workshop → Singularity Transit → Singularity City → World`

- **Workshop** is where creators build and compose.
- **Transit** connects destinations and contexts.
- **City** owns geography, districts, parcels, ownership, residents, civic institutions and the city economy.
- **World** is the larger collection of environments and experiences that may be reached through City.

City is a place and a spatial index—not the owner of every simulation it hosts.

## Responsibility boundaries

| Concern | Owner |
|---|---|
| Ontology and domain identity | Ontology / domain repositories |
| Reusable capability composition | MicroBundles |
| Arbitration, authorization and composition boundary | FSM_COS and host policy |
| State substrate | FSM_API |
| City geography, parcels, districts and civic state | Singularity City |
| Dungeon topology, inhabitants and underground simulation | FSM_Dungeon |
| Rendering representation and fidelity | Renderer |
| Visual output | Visualize |
| Input, persistence, networking and host integration | Host adapters |

A City location may reference an external domain through an opaque host identity and anchor. For example, a City district can expose an entrance into an FSM_Dungeon sewer network. City controls discoverability and access; FSM_Dungeon owns its internal topology and simulation.

## Composition model

The intended composition sequence is:

`Ontology → MicroBundles → arbitration → Experience → spatial manifestation`

NuGet distributes executable code. MicroBundles compose optional capabilities into an experience. A building is one possible spatial manifestation of those capabilities; it is not the capability itself.

An experience manifest should declare stable identity, version, capability requirements, entry points and host requirements. City resolves an entry point to a place and delegates execution to the owning experience and host.

## Authority and AI

ProtocolAi, GrammarAi and CommandAi can interpret intent and propose actions. They do not directly mutate authoritative City state.

The host validates:
- entity and location references;
- permissions and ownership;
- structural and domain constraints;
- resource cost and economic consequences;
- preview and approval requirements.

Human approval remains in the host adapter. AI authorship is advisory until the authoritative host accepts a proposal.

## Simulation and observation

City state must not depend on a viewer being present. Residents, institutions, services, construction and markets continue according to the host's chosen simulation policy. Rendering is observer-relative: distant districts can be represented with lower detail and update fidelity than nearby interactions without changing domain truth.

Keep these separate:
- authoritative state;
- simulation scheduling and fidelity;
- perception and visibility;
- rendered representation.

## First implementation slice

The first vertical slice is deliberately small:

1. A navigable City overview with a clear **YOU ARE HERE** marker.
2. District and destination discovery.
3. Declarative experience entry points.
4. A visible Underworks entrance that hands off to FSM_Dungeon.
5. A static-hostable proof that can later be replaced by live host data without changing the domain boundaries.

The current browser proof is a presentation and navigation fixture. It does not pretend to provide persistence, multiplayer, authoritative simulation or a live FSM_Dungeon connection.

## Declarative spatial blueprint

The discovery catalog (`data/places.json`) identifies places and their owners. The spatial blueprint (`data/city-blueprint.json`) defines coordinate space, district boundaries, route geometry and parcel-generation parameters. A versioned JSON Schema describes the blueprint contract.

The browser projects district polygons and route polylines into SVG and generates parcel candidates using a deterministic algorithm and seed. This is a reproducible authoring preview, not authoritative land state. Accepted parcels, ownership, zoning, permits and construction must be validated and persisted by the host.

Every generated feature must be traceable to its blueprint, algorithm version, seed, parameters and source record. Renderer output is an observation of the model, never the owner of city truth.
