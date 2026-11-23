# Buildings, Materials and Construction

**Status: domain sourcebook and rulebook foundation.** This is a technology- and genre-agnostic model. It is not a structural engineering code, building simulator or claim that a construction system is implemented.

## Purpose

A building is an organized physical construction with a purpose, location, materials, components, spaces, access, services, condition and history. Its feasible form depends on what a society can obtain, make, transport, measure, assemble and maintain—and on local environment and rules.

The domain must represent a timber longhouse, stone tower, adobe courtyard, steel-and-glass high-rise, modular habitat, underwater station or fantastical structure. Do not hard-code one historical sequence or assume modern industrial materials and utilities are universal.

## Ownership boundaries

| Concern | Owner |
|---|---|
| Building identity, site, parcel, permitted use, civic review, construction status, occupancy, address, access, ownership/tenure and history | Singularity City |
| Terrain, material physical properties, structural response, loads, heat, fluid behavior, fire/impact physics and physical simulation | Physics |
| Material/component production, recipes, labor inputs, construction costs, contracts, rent, sale and maintenance transactions | Economy plus specialist production domains |
| Material science, extraction, refining, fabrication, craft methods, tools and specialist building systems | Specialist domains |
| Era/setting constraints, magic, extraordinary materials and narrative adjudication | SURPS and selected setting rulebooks |
| Visual/spatial presentation and textual inspection | Visualize and Renderer |

City records what is built, where, by whom, under which permissions and with what evidence. It does not certify structural safety or reproduce Physics.

## A building is more than a footprint

A building record should connect stable identity and classification; site and parcel; intended use and occupancy; footprint, levels, spaces and circulation; structural system and component assemblies; material quantities and provenance; construction method, tools and required skills; utility and transport dependencies; access, safety, environment and maintenance; owner, builder, designer, permit and inspection records; and lifecycle events.

Rooms and functional spaces remain separately identifiable. A building may contain homes, workshops, shops, civic rooms, storage, production or mixed uses. A rendered room is not proof of occupancy or legal availability.

## Material and construction capability profiles

Do not choose a building form from an era label alone. A capability profile describes resources and processes actually available in a place and scenario.

### Materials

Examples include earth, mud brick, fired brick, stone, timber, bamboo, thatch, lime, mortar, concrete, steel, glass, polymers, composites, ceramics, textiles, ice, biological materials and setting-specific substances.

For each material preserve source and availability region; composition or grade when established; usable dimensions and quality; processing and fabrication requirements; transport, storage and weather constraints; durability, repair and reuse; provenance, measurement basis and uncertainty.

A material name alone does not prove strength, fire rating, lifespan or environmental impact. Those values require evidence and the appropriate Physics/specialist model.

### Processes, tools and skills

Construction may require quarrying, felling, drying, shaping, firing, smelting, casting, sawing, milling, joining, lifting, scaffolding, surveying, excavation, earthmoving, additive fabrication, prefabrication or magical work.

Represent the capability chain:
1. material can be sourced or produced;
2. it can be processed to the required specification;
3. tools, energy and facilities exist;
4. trained labor can perform the operation;
5. components can reach the site;
6. foundations and supporting infrastructure are feasible;
7. assembly and quality checks can be completed;
8. the result can be operated and maintained.

A capability may be unavailable, limited, conditional, imported or scenario-provided. Scenario exceptions are explicit; they do not silently rewrite the baseline.

## Construction sequence and dependencies

A construction plan is a dependency graph, not a single duration estimate. Stages may include site investigation, access preparation, design, approvals, procurement, ground works, foundations, structural assembly, enclosure, services, fit-out, inspection and handover. A building may omit, reorder or add stages.

Each stage declares prerequisites, materials/components and quantities, facilities/tools/energy/skills, responsible actor, evidence and inspection requirements, completion state and recorded outcome.

Do not invent construction time, workforce productivity or cost without a model and assumptions. Historical sequences distinguish excavated or documentary evidence from modern interpretation.

## Building rules and feasibility

A rulebook evaluates a proposed design against a declared setting profile. It is composable, versioned and explains why a design is permitted, blocked, conditional or unknown.

Rule families include material/component availability; manufacturing and craft capabilities; transport and lifting access; terrain and foundation conditions; structural/environmental constraints supplied by Physics; water, sanitation, energy and communication; occupancy, circulation, accessibility and safety; ownership, zoning, permits and institutional authority; maintenance and end-of-life.

Findings need evidence, not an unexplained yes/no. Suggested explanatory outcomes are satisfied, not satisfied, conditional, unknown and not applicable. These are descriptive terms, not claims about canonical ontology members; bind to the shared ontology and SURPS rulebook contract when finalized.

A fictional or magical building may satisfy a requirement through an extraordinary capability. Name its source rather than pretending an unavailable material or process is ordinary.

## Economy connection

Buildings are assets, workplaces, homes, shops, infrastructure and public goods. Economy supplies shared economic vocabulary and a process-local simulated ledger; City/Experience policy defines local rules.

Potential flows include land acquisition and lease; design, labor, materials, tools and equipment procurement; construction contracts and staged payments; rent and scenario-defined taxes/fees; utility charges; maintenance, repair, retrofit and demolition; sale, inheritance, gifting and institutional transfer.

An estimate is not an invoice. An invoice is not payment. A transfer intent is not a ledger receipt. A modeled building value is not a real appraisal or redeemable balance.

## Historical and fictional settings

For a real historical building, record period, source evidence, competing interpretations, reconstruction choices and unknowns. For a fictional building, distinguish canon, creator additions and interpretation. Link real-world inspiration only through semantic relationships supported by the shared ontology.

## Example capability profiles

| Profile | Illustrative capabilities | Constraints to express |
|---|---|---|
| Village craft | local timber/earth/stone, hand tools, skilled joinery, animal transport | limited lifting, processing throughput and imported components |
| Masonry town | quarried stone, lime mortar, scaffolding, lifting teams where evidenced | quarry access, transport, craft capacity and foundations |
| Industrial city | rolled steel, reinforced concrete, powered cranes, standardized components | energy, factories, logistics, inspection and maintenance |
| Advanced habitat | engineered composites, robotics, closed-loop services, modular fabrication | life support, radiation, pressure, energy and specialist supply |
| Fantasy setting | setting-specific stone, enchanted joinery or magical lifting | explicit capability source, costs, limits and rulebook authority |

These are scenario templates, not claims that all places in an era share the same capabilities.

## Implementation sequence

1. Connect City building/room identities to stable building definitions and instances.
2. Add material, component and process references with provenance and units.
3. Introduce scenario capability profiles and construction dependency plans.
4. Define City planning, permit, ownership and lifecycle events.
5. Consume Physics evidence through accepted contracts.
6. Compose Economy for procurement, labor, contracts, rent and maintenance.
7. Add rule evaluation after the shared SURPS rulebook interface is agreed.

**Current status:** the Civic Quarter already contains synthetic building and room records. This book defines the next domain layer; those fixtures do not yet include material bills, construction simulation, structural validation or economic lifecycle.
