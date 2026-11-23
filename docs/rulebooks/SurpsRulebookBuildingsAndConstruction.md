# SurpsRulebookBuildingsAndConstruction

> City-owned domain rulebook content intended for presentation through the shared SURPS rulebook contract.

**Status:** authored rulebook specification; SURPS interface binding pending. This is not an implementation of ISurpsRulebook and does not claim an executable construction simulator.

## Identity

- **Rulebook ID:** singularity-city.buildings-and-construction
- **Display name:** Buildings, Materials and Construction
- **Intended SURPS presentation:** SurpsRulebookBuildingsAndConstruction
- **Owning domain:** Singularity City
- **Sourcebook:** [Buildings, Materials and Construction](../books/buildings-and-construction.md)

## Purpose

Evaluate whether a proposed building and its construction plan are compatible with the capabilities and constraints of a declared place, time, setting and scenario. The rulebook must support ordinary historical construction, contemporary buildings, advanced habitats and fictional/extraordinary methods without assuming one universal technology ladder.

## Inputs

A future evaluation needs:
- building proposal and intended use;
- site, parcel and access references;
- material and component requirements, quantities and units;
- required processes, tools, energy, facilities and skills;
- construction-stage dependency graph;
- available material, fabrication, labor and logistics capabilities;
- environmental and terrain evidence from owning providers;
- applicable civic authority, ownership, zoning, safety and occupancy policies;
- scenario exceptions and their provenance.

Missing data is not a pass. Unknown constraints remain explicitly unknown.

## Capability evaluation

The rulebook evaluates a chain, not a label:
1. Can the required material be sourced or produced?
2. Can it be processed to the required specification?
3. Are tools, facilities and energy available?
4. Are qualified people or agents available?
5. Can components be transported and lifted to the site?
6. Are site and foundation requirements supported by evidence?
7. Can the assembly sequence and quality checks be completed?
8. Can the completed building be operated and maintained?

A scenario may supply an exceptional capability—such as imported prefabricated modules, an advanced composite, or magic—but the exception must be explicit, scoped and attributed to its owning rulebook or provider.

## Findings

Each finding should eventually identify the rule, subject, result, evidence, assumptions, missing inputs and owner. The descriptive outcomes proposed in the sourcebook are not canonical SURPS enum values. Final representation must follow the shared contract.

A rulebook result is advisory unless an authorized City institution or host policy accepts it. A green feasibility result is not a permit, engineering certification or construction completion record.

## Ownership

- SURPS owns common ontology, rulebook identity, versioning and composition contract.
- City owns building/place records, civic planning, permits, tenure, construction lifecycle and occupancy state.
- Physics owns terrain, material physical properties and validated structural/thermal/fluid simulations.
- Economy owns shared economic vocabulary and simulated ledger operations; City policy chooses prices, contracts and local rules.
- Specialist domains own material production, fabrication, craft recipes, tools and specialist systems.

## Validation scenarios

- Earth-and-timber dwelling with local hand tools and limited transport.
- Stone civic hall with quarry, skilled masonry and lifting constraints.
- Industrial building using steel, concrete, powered cranes and utility connections.
- Modular habitat using advanced composites and closed-loop services.
- Fantasy structure whose unusual material or assembly method is explicitly provided by a setting capability.

Tests must verify missing-capability reporting, provenance, unit consistency, dependency ordering, scenario exception scope and deterministic results where evaluation is executable.

## Implementation boundary

Do not implement the shared SURPS interface by guessing its members. Once the contract is accepted, map this content to it and package the City-owned rulebook through the agreed MicroBundle composition. Until then this file is a content specification, not a runtime rulebook.
