# SurpsRulebookVillagesToCities

> A City-owned domain rulebook intended to be presented through the shared SURPS rulebook contract once that contract is established.

**Status:** authored domain specification; SURPS interface binding pending. This document is not yet an implementation of `ISurpsRulebook`, and it does not claim that settlement simulation is implemented.

## Identity

- **Rulebook ID:** `singularity-city.villages-to-cities`
- **Display name:** Villages to Cities
- **Intended SURPS presentation:** `SurpsRulebookVillagesToCities`
- **Owning domain:** Singularity City
- **Subject:** settlement formation, growth, transformation and civic organization
- **Authority:** City owns civic geography and planning facts; SURPS owns the common ontology and rulebook composition contract.

## Purpose

Describe how human settlements emerge from relationships between people, place, resources, movement, institutions and shared services. The rulebook should make settlement growth inspectable as a set of capabilities and constraints rather than a simplistic population counter or a collection of arbitrary upgrade levels.

A settlement is not merely a polygon with a label. It is a changing network of inhabitants, dwellings, livelihoods, public spaces, routes, water, energy, food, waste, governance, culture and relationships to its surrounding region.

## Settlement progression

The following are descriptive patterns, not mandatory linear levels. A settlement may skip a stage, remain small by choice, specialize, decline, merge, disperse or grow into a polycentric region.

| Pattern | Characteristic organization | Questions the rulebook asks |
|---|---|---|
| Homestead / outpost | One household or small group occupies a site and depends heavily on external access or local self-provision | Is the site habitable, reachable and supplied? |
| Hamlet | Several households form a durable local cluster with shared paths and recurring exchange | What makes the cluster a community rather than nearby isolated dwellings? |
| Village | A stable local community has shared places, recurring services and a relationship to a productive hinterland | Which common needs are met locally, and which require travel? |
| Town | A settlement serves a wider catchment with specialized services, exchange, institutions and stronger network connections | What regional role does it play, and how are its systems coordinated? |
| City | Multiple districts and specialized systems form a complex civic network with differentiated institutions, infrastructure and metropolitan influence | How are access, governance, capacity, resilience and externalities managed? |
| Metropolitan / polycentric region | Multiple settlements and centers are connected through regional mobility, economies, infrastructure and governance arrangements | Which systems are shared, federated or independently governed? |

Population, density, service coverage, economic diversity and network centrality may be useful observations, but none alone defines a settlement stage. Thresholds must be declared by a scenario or jurisdiction and must carry provenance; this rulebook does not invent universal cutoffs.

## Core concepts

- **Settlement:** a persistent spatial and social organization of inhabitants, places and shared systems.
- **Hinterland / catchment:** the surrounding region that supplies, depends on or is served by a settlement.
- **District / neighborhood:** a subarea with spatial identity and a recognizable civic or functional role.
- **Civic service:** a service or institution that supports collective needs, such as education, health, safety, administration or gathering.
- **Infrastructure network:** connected physical or organizational facilities that move people, goods, energy, water, information or waste.
- **Capacity:** a declared ability to serve demand under stated operating conditions.
- **Accessibility:** the effort or opportunity required to reach a place or service under a specified mobility model.
- **Resilience:** the ability to maintain or recover valued functions under disturbance, with the disturbance and measure explicitly named.
- **Governance arrangement:** the institutions, responsibilities, rights and decision processes through which shared resources and services are managed.

These concepts should map to SURPS entities, attributes, capabilities, behaviors, interactions and environments without forcing a premature API shape.

## Growth and transformation rules

A settlement transition is a reasoned change in organization, not an automatic level-up. A future executable rule may evaluate:

1. **Site and land constraints:** terrain, water, hazards, ecology, access and available developable space, sourced from authoritative domain providers.
2. **Inhabitants and needs:** population composition, household needs, work, care, culture and voluntary movement, using explicit synthetic or observed data.
3. **Provisioning:** food, water, energy, materials, waste handling and external dependencies.
4. **Mobility and exchange:** paths, roads, transit, waterways, trade and access to neighboring settlements.
5. **Shared institutions:** places and capabilities for education, health, administration, safety, gathering and dispute resolution.
6. **Capacity and externalities:** service limits, congestion, pollution, land pressure, displacement risk and impacts beyond the settlement boundary.
7. **Collective choice:** policy, ownership, consent, investment and trade-offs. A technical model must not silently substitute its own values for community decisions.

Every rule must state its inputs, assumptions, applicable scale, constraints, expected outputs, provenance and whether it is descriptive, advisory or executable.

## Invariants

- Growth is not inherently improvement; decline, stabilization and deliberate limits are valid outcomes.
- No single scalar (especially population) is sufficient to classify settlement complexity.
- Civic systems are interdependent: land use, mobility, housing, services, ecology and economy must retain explicit relationships.
- A plan is a proposal until the owning authority accepts it.
- Uncertainty and missing evidence remain visible; no fabricated survey, demographic, environmental or engineering facts.
- Physical consequences come from Physics; this rulebook may consume physical evidence but must not reimplement physical simulation.
- SURPS provides shared ontology and rulebook composition; it does not take ownership of City planning data.
- Multiple rulebooks may coexist in one world. A settlement may simultaneously use physical, laboratory, economic, ecological, cultural and civic rulebooks.

## Ownership and composition

- **SURPS:** shared rulebook identity, ontology mapping, versioning, compatibility and composition conventions.
- **Singularity City:** settlement identities, districts, parcels, civic networks, service organization, planning proposals and settlement-history records.
- **Physics:** terrain, water and physical consequences within implemented and validated capabilities.
- **Economy:** economic models and exchange rules.
- **Laboratories:** experimental methods and apparatus.
- **FSM_COS / FSM_Foundry:** microbundle composition and runtime execution.

The intended composition is a SURPS-enabled City microbundle exposing this content as `SurpsRulebookVillagesToCities`. The concrete wrapper, interface members and dependency declaration must follow the accepted SURPS contract; they are deliberately not guessed here.

## Validation examples to develop

1. A remote outpost with one access route and explicit external supply dependencies.
2. A village with shared water provision, a gathering place, local paths and a declared service catchment.
3. A town serving multiple villages through regional mobility and specialized services.
4. A polycentric city-region in which several centers share transit and infrastructure but retain distinct local governance.
5. A settlement under stress where growth is constrained by water, access, ecology or service capacity, and where stabilization or retreat is a valid decision.

Each example should distinguish authored fixture data from observations and simulated outputs. Tests should verify relationship integrity, declared assumptions, rulebook coexistence and deterministic evaluation where rules are executable.

## Implementation sequence

1. Stabilize the shared SURPS `ISurpsRulebook` contract and its version/provenance requirements.
2. Map this domain specification to the contract without adding City concepts to the common SURPS interface.
3. Package the City-owned content as `SurpsRulebookVillagesToCities` in a SURPS-enabled container.
4. Add small sourcebook examples and living diagrams showing settlement evolution and system dependencies.
5. Add executable rules only where a concrete use case, inputs and validation oracle exist.

Until those steps are complete, this document is the domain specification and the wrapper is pending.
