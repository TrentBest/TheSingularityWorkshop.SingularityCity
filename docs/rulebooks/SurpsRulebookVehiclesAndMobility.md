# SurpsRulebookVehiclesAndMobility

> City-owned domain rulebook content intended for presentation through the shared SURPS rulebook contract.

**Status:** authored rulebook specification; SURPS interface binding pending. This is not an implementation of ISurpsRulebook or a vehicle physics engine.

## Identity

- **Rulebook ID:** singularity-city.vehicles-and-mobility
- **Display name:** Vehicles, Mobility and Transport Systems
- **Intended SURPS presentation:** SurpsRulebookVehiclesAndMobility
- **Owning domain:** Singularity City
- **Sourcebook:** [Vehicles, Mobility and Transport Systems](../books/vehicles.md)

## Purpose

Determine whether an actor, vehicle, cargo and purpose can use a proposed transport service or route under a declared capability profile. The model must support handcarts, animal transport, rail, road vehicles, ships, aircraft, spacecraft and extraordinary setting-specific transport.

## Inputs

A future evaluation may consume:
- vehicle definition and instance state;
- actor/operator capabilities and qualifications;
- origin, destination, route and service references;
- operating environment and permitted travel modes;
- capacity, dimensions, clearance and supported limits with units;
- propulsion/energy and replenishment requirements;
- infrastructure availability and operational state;
- access rules, schedule, cargo/passenger restrictions and scenario exceptions;
- Physics-produced terrain or movement evidence, with source provenance.

Unknown dimensions, capacities or route limits must not be interpreted as unlimited.

## Evaluation sequence

1. Confirm that the vehicle instance exists and is available.
2. Confirm that its design supports the requested operating environment and mode.
3. Check actor/operator qualifications and any institutional permissions.
4. Check route access and known dimensional, capacity and environmental constraints.
5. Check infrastructure, energy, loading and service availability.
6. Return findings with the constraints and evidence used.

This evaluation is about capability and access. Physics remains authoritative for motion, collision, traction, stability and other physical outcomes. A route-compatible result does not guarantee arrival.

## Findings and lifecycle

A journey is separate from a vehicle and a route. It records actor/cargo, purpose, origin/destination, planned route, departure/arrival lifecycle and outcome evidence. Dispatch, cancellation, interruption and completion must be explicit events.

A rulebook result does not itself dispatch a vehicle, reserve capacity, move cargo or settle a fare. Economy handles the shared value-transfer ledger; City/Experience policy defines fares, freight terms and service eligibility.

## Ownership

- SURPS owns shared ontology, rulebook identity, versioning and composition.
- City owns vehicle/place identities, fleet/service organization, route access, depots, stops, journey context and civic transport policy.
- Physics owns physical vehicle behavior and movement simulation.
- Economy owns economic vocabulary and simulated value ledger.
- Specialist domains own vehicle engineering, manufacturing, navigation and control systems.

## Validation scenarios

- Handcart on a footpath and prohibited on a narrow stair.
- Animal-drawn cart on a route with an explicit bridge/load limit.
- Electric shuttle serving two accessible transit stops.
- Emergency vehicle with authorized priority access.
- Vessel route between compatible ports.
- Aircraft route with an unavailable destination airfield.
- A setting-specific vehicle whose extraordinary capability is supplied by an explicit rulebook.

Tests should cover route-mode mismatch, unknown limits, unavailable infrastructure, operator restrictions, capacity and stable provenance.

## Implementation boundary

Do not guess the SURPS interface or shared ontology predicates. Bind this authored content only after the shared contract is accepted. Until then this document is a rulebook specification, not an executable mobility service.
