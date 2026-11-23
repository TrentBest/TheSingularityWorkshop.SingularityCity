# Vehicles, Mobility and Transport Systems

**Status: domain sourcebook and implementation guide.** This defines City-facing vehicle concepts and boundaries. It does not claim that vehicle dynamics, autonomous traffic, manufacturing or a live fleet service are implemented.

## Purpose

Vehicles connect people, goods, services and places. City must represent everything from a handcart in a village to electric buses, sailing vessels, aircraft, orbital craft and speculative transport—without assuming one era, propulsion system or technology level.

A vehicle definition describes a design and its capabilities. A vehicle instance has identity, ownership or custody, condition, configuration, location, availability and history. A journey is a separate intent and lifecycle. A rendered model is a projection, not proof that a trip or physical simulation occurred.

## Ownership boundaries

| Concern | Owner |
|---|---|
| Vehicle identity, fleet membership, registration, assignment, availability, parking, depots, stops, route permissions and civic transport service | Singularity City |
| Mass, forces, traction, collision, stability, energy transfer, fluid/air interaction and physical motion | Physics |
| Vehicle/component prices, ownership transfer, leases, fares, freight charges, wages, energy purchase and maintenance invoices | Economy |
| Vehicle design, manufacturing, propulsion engineering, navigation, control systems and specialist equipment | Specialist domains |
| Setting rules, extraordinary capabilities, temporal effects, magic and roleplaying adjudication | SURPS and selected setting rulebooks |
| Spatial/pixel presentation and textual inspection | Visualize and Renderer |

City consumes Physics results and preserves provenance. It does not build a second vehicle-dynamics engine.

## Definitions and instances

A reusable vehicle definition may declare:
- stable identity and ontology-supported classification;
- role: passenger, freight, emergency, service, personal, industrial, agricultural or exploration;
- propulsion and energy source;
- operating environment: road, path, rail, water, air, space, subsurface or mixed;
- passenger/cargo capacity with declared units;
- access envelope: width, height, clearance, turning needs, gradients, surface and infrastructure compatibility;
- required capabilities, skills, facilities, consumables and maintenance;
- operating limits and evidence references.

An instance adds its design/version, owner/operator/custodian, current location and state, condition, fitted components, available capacity, carried cargo/passengers and provenance for acquisition, construction, modification and retirement.

Do not infer capabilities from appearance or name.

## Capability profiles, not a single technology score

A setting's transport possibilities emerge from capabilities that can vary independently:
- materials and fabrication;
- propulsion, stored energy, power generation and distribution;
- roads, tracks, bridges, ports, airfields, launch facilities and tunnels;
- navigation, signaling and communication;
- measurement, maintenance and repair;
- trained operators and specialist labor;
- logistics, spare parts and supply chains;
- environmental compatibility and access policy.

A handcart may be available where an engine is not. An advanced aircraft may exist while a district lacks an airport or trained crew. A magical carriage may satisfy a transport capability through a different rulebook. Avoid one global technology-level number that hides these constraints.

## Journeys and route compatibility

A journey is a distinct record with actor/cargo, origin, destination, purpose, planned departure, selected mode, route reference, lifecycle and outcome evidence. A route can exist without being traversable by every vehicle.

Evaluation should consider permitted modes, access restrictions, width/height/mass/clearance limits where known, surface and grade, loading facilities, energy availability, operator qualifications and scenario-specific capabilities. Unknown limits remain unknown, not unlimited.

City owns route and service policy. Physics owns physical movement and contact. An animation cannot declare a completed journey.

## Fleets and civic services

City can organize personal holdings, commercial fleets, public transit, emergency response, municipal maintenance, freight operators, construction fleets and temporary event services. Fleet records connect accountable operators, vehicle instances, depots, stops, service areas, schedules, capacity, staffing, maintenance and procurement. Fares and operating costs compose with Economy.

The first useful proof is a small inspectable fleet with a few vehicle definitions, route compatibility, assigned service and explicit status. Do not claim dispatch optimization or autonomous driving before implementation and tests.

## Economy connection

Vehicles participate as assets and services, not as an independent money system. Economy supplies shared money, item, shop, offer, transfer-intent and simulated-ledger concepts. City/Experience policy defines prices, lease terms, fares, freight charges, wages, energy costs and maintenance schedules.

An offer is not a completed transfer. A trip is not proof of fare settlement. An invoice is not proof that work occurred. Keep offer, intent, execution and outcome distinct.

## Validation scenarios

- Handcart in a footpath-only agrarian village.
- Animal-drawn freight on compatible roads and bridges.
- Market-town carts sharing space with pedestrians.
- Scheduled electric shuttle serving a civic district.
- Emergency vehicle with restricted access and priority rules.
- Waterborne freight between ports.
- Aircraft requiring compatible landing facilities and trained crews.
- Futuristic or magical transport whose extraordinary capabilities come from its setting rules.

Each scenario states capability assumptions, route constraints, owner domains and what is actually simulated.

## Implementation sequence

1. Establish stable vehicle-definition and instance identities using shared ontology contracts where available.
2. Add capability profiles and route compatibility without duplicating Physics.
3. Connect vehicles to City-owned fleets, depots, services and journey records.
4. Compose Economy for acquisition, leasing, fares, freight and operating flows.
5. Add Physics-backed motion only through an accepted, versioned contract.
6. Add visualization and deterministic tests after relationships are sound.

**Current status:** domain model and implementation plan. The existing peddler handcart is an authored fixture, not a vehicle simulator or fleet implementation.
