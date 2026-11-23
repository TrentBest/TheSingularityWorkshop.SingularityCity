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

These concepts should map to SURPS entities, attributes, capabilities, behaviors, interactions and environments without forcing a premature API shape. Reality membership and shared semantic identity are inherited from the Workshop reference ontology; this City rulebook must not invent a parallel reality taxonomy. The same real place can be explored through a measured present-day representation and evidence-based historical reconstructions, while intentionally altered or invented versions belong to their declared fictional reality. See [Reality Sets, Place Identity and Historical Reconstruction](../REALITY_AND_RECONSTRUCTION.md).

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


## The full City domain

"Villages to Cities" is the first rulebook name, not a boundary on the domain. Singularity City owns the inhabited-place and civic-civilization domain at every scale and in every genre. A village, a frontier settlement, a medieval market town, a contemporary metropolis, an orbital habitat and a planet-spanning arcology are all possible City instances. The same model should support a modest historically grounded settlement and an intentionally extravagant science-fiction city without treating either as the canonical form.

City describes the relationships and civic organization of places. It does not dictate that every world must contain modern streets, municipal governments, electricity, money, private property, cars or even permanent buildings.

### Place, scale and morphology

The domain includes:

- **Dwelling and household:** shelters, homes, compounds, shared living arrangements, household composition, occupancy, tenure and domestic provisioning.
- **Hamlet, village and town:** clusters, commons, wells, paths, meeting places, local crafts, markets, seasonal use and ties to surrounding farms or wilderness.
- **City and metropolis:** neighborhoods, districts, centralities, mixed-use areas, civic institutions, industrial areas, ports, airports, transit hubs and regional dependencies.
- **Megacity and arcology:** extreme density, vertical neighborhoods, stacked streets, skybridges, subterranean districts, enclosed ecologies, megastructures, autonomous service zones and multi-level circulation.
- **Settlement networks:** villages, towns and cities connected through trade, migration, shared services, infrastructure, political arrangements and cultural relationships.
- **Temporary and mobile places:** camps, caravanserais, encampments, fairs, seasonal settlements, shipboard communities, mobile bases, refugee settlements and temporary construction towns.
- **Frontier and remote places:** outposts, research stations, mines, forts, isolated islands, polar stations, desert settlements, underwater habitats and off-world colonies.

Scale is contextual and multi-dimensional. A tiny settlement can be culturally or strategically important; a huge settlement can have weak services or fragile dependencies. City must not reduce significance to population or footprint.

### People, roles and everyday life

City's civic model must make room for inhabitants as more than anonymous population counts. Depending on the active rulebooks and scenario, people may have households, occupations, skills, needs, schedules, affiliations, legal status, relationships, responsibilities and personal goals.

The domain includes residents, visitors, migrants, travelers, workers, public servants, elected or hereditary officials, guards, emergency responders, builders, maintainers, educators, healers, artisans, farmers, performers, clergy, couriers, merchants, traders, peddlers, street vendors, innkeepers, restaurateurs, scavengers, entertainers and many other roles.

Roles are not fixed species or classes. One person may be a resident, parent, baker, volunteer firefighter, market trader and elected council member. Roles can be seasonal, informal, temporary, overlapping or contested. The model should distinguish a person's identity from a role they currently perform.

Everyday life matters: meals, shopping, deliveries, commuting, school, worship, recreation, repairs, celebrations, gossip, public gatherings, street performance, disputes, care work and simple encounters are all legitimate civic activity. A city should be capable of telling stories at the scale of one doorstep as well as at the scale of a million inhabitants.

### Commerce, provisioning and the peddler

Commerce is not synonymous with modern retail. City must support direct exchange, barter, gifting, patronage, markets, itinerant peddlers, stalls, shops, workshops, warehouses, wholesalers, cooperatives, franchises, street food, restaurants, delivery services, digital marketplaces, automated vending and future forms not yet imagined.

A peddler is a first-class example of a mobile commercial actor. Their activity may involve:
- an inventory and carrying capacity;
- a cart, pack animal, boat, bicycle, scooter, vehicle or other conveyance;
- a route, destination list and travel constraints;
- customers, credit, haggling, reputation and local knowledge;
- supply sources, restocking, spoilage, storage and theft risk;
- permits, tolls, customs, local rules or informal arrangements where applicable;
- schedules, weather, hazards, escorts and changing demand.

A market is more than a collection of shop objects. It is a recurring relationship among sellers, buyers, goods, services, access, trust, regulation, logistics and public space. A peddler can connect an isolated hamlet to a distant town without requiring that the hamlet grow into a town itself.

City owns the places, access, civic context and spatial relationships for commerce. Economy owns economic models, currencies, valuation and exchange mechanics. Other rulebooks may define craft, goods, food, magic, technology or cultural practices. City consumes those capabilities through explicit contracts rather than reimplementing them.

### Goods, food, services and delivery

The domain includes production sites, farms, fisheries, hunting grounds, workshops, factories, kitchens, bakeries, restaurants, shops, depots, warehouses, cold storage, distribution centers, loading areas, parcel lockers, courier stations and last-mile delivery.

A delivery is a journey of a specific item or service from an origin to a destination under declared conditions. Its feasibility may depend on:
- whether the good or service exists in the active setting;
- production, inventory, availability and reservation;
- packaging, preservation, temperature, fragility and carrying capacity;
- distance, terrain, route access, travel mode and operating hours;
- worker availability, dispatch, workload and service radius;
- infrastructure, communications, energy and payment arrangements;
- hazards, legal restrictions, jurisdiction and customs;
- the scenario's technology, magic, social organization and temporal rules.

A pizza delivery in a contemporary city might use a scooter and a dispatch network. In a pre-industrial village, the analogous service might be a baker, runner, horse, handcart or no delivery service at all. In a science-fiction megacity it might use a drone, autonomous pod, pneumatic network or matter transporter if the setting allows it.

These are capability selections, not hard-coded historical assumptions. A creator may deliberately introduce an anachronistic or extraordinary capability. For example, a time-travelling pizza delivery rider on a New York scooter arriving in a pre-gunpowder era is a valid authored scenario. City should model the rider's arrival place, local access, destination, interactions, civic consequences and delivery context. The time-travel mechanism, temporal paradoxes, technology, narrative constraints and any historical or fantastical consequences belong to the rulebooks that define those capabilities—not to a City-specific prohibition or an invented City time machine.

The system must distinguish:
1. **Setting baseline:** what is ordinarily available in this world, place and era.
2. **Scenario exception:** a deliberately introduced capability or visitor that departs from the baseline.
3. **Operational consequence:** what the capability changes for access, supply, safety, demand, institutions and local life.
4. **Narrative permission:** what the creator or active rulebooks permit, even when it is unusual.

An absent capability is not automatically an error. A surprising capability is not automatically invalid. The model should expose the source and scope of the exception so that it can be understood and played.

### Technology, magic and capability profiles

City must not use a single global technology-level number as a universal gate. A scenario may use a declared technology profile, but actual capabilities should be explicit and composable. A society may have advanced medicine but primitive transport; sophisticated clockwork but no electricity; powerful magic but weak sanitation; or abundant automation with fragile supply chains.

A capability profile can describe availability and maturity across domains such as:
- materials, construction and manufacturing;
- agriculture, food preservation and cooking;
- water, sanitation and waste;
- energy, lighting and heating/cooling;
- communication, information and computation;
- transport, navigation and logistics;
- medicine, public health and accessibility;
- security, defense and emergency response;
- automation, robotics and artificial intelligence;
- magic, psionics, alchemy, portals or other setting-defined systems.

A profile should identify its scope (person, organization, district, settlement, region or world), availability, reliability, cost or access conditions where relevant, provenance and exceptions. Technology is unevenly distributed; a capability may exist but be restricted, scarce, unreliable, expensive or culturally rejected.

Magic and extraordinary capabilities are not treated as technology by default. They may be represented through their own rulebooks and capability contracts while still participating in City services and spatial relationships.

### Mobility, routes and arrival

City owns the civic network of movement and access: footpaths, roads, stairs, trails, waterways, canals, ports, rail, transit, elevators, tunnels, aerial routes, landing zones, gates, portals and other declared connectors.

A route is not merely a line between coordinates. It has access rules, capacity, direction, mode, operating conditions, ownership or stewardship, hazards, tolls, schedules and relationships to destinations. Movement may involve multiple modes and transfers. A route can be unavailable to a particular actor, vehicle, cargo or time window.

The model should distinguish physical distance from travel time, perceived effort, cost, risk, accessibility and jurisdictional friction. A route planner may consume Physics terrain and mobility capabilities, but it must not pretend that straight-line distance is a realistic journey.

### Buildings, infrastructure and civic services

City includes the lifecycle and relationships of buildings and built environments: site selection, design intent, construction, occupancy, maintenance, renovation, abandonment, demolition and reuse. A building may contain rooms, tenants, businesses, equipment, utilities, access controls and public or private spaces.

Infrastructure includes water, wastewater, drainage, energy, heating and cooling, solid waste, communications, data, transport, food distribution and other networks. Services include administration, education, health, care, sanitation, safety, emergency response, justice, culture, recreation, worship, public space and social support.

A service must be described by its provider, intended population, access conditions, capacity, operating schedule, dependencies, quality measures and failure modes. A building is not automatically a service; a hospital building without staff, supplies, power or functioning systems may not provide hospital care.

### Governance, law, safety and stewardship

The civic domain includes governance at multiple scales: household, commons, village council, guild, estate, municipality, tribal or customary authority, corporation, federation, empire, planetary administration and other setting-defined forms.

It includes jurisdiction, boundaries, rights, duties, ownership, stewardship, permits, taxation, public finance, dispute resolution, policing, defense, emergency management, public health, labor conditions, accessibility, privacy, surveillance, security and accountability.

These are not assumed to follow one modern political model. The rulebook should represent who has authority, over what, under which rules, with what legitimacy or consent, and how decisions can be challenged. Safety and security must be explicit civic concerns, not decorative labels. The presence of guards or security technology does not by itself establish that a place is safe, fair or well-governed.

### Culture, identity and public life

Places acquire identity through language, memory, custom, architecture, food, craft, music, festivals, rituals, public art, institutions, stories, conflict, migration and shared experience. City should support named places, landmarks, sacred or culturally significant sites, public gathering spaces, local traditions and contested histories.

A settlement is not culturally homogeneous. Different groups may share, negotiate, contest or reinterpret the same places. Cultural identity must not be inferred from a building style or a single demographic attribute; it should be authored or sourced with provenance.

### Ecology, resources and environmental relationships

City consumes physical and ecological evidence to reason about settlement relationships with land, water, climate, habitats, resources and waste. It can represent parks, commons, farms, forests, wetlands, greenbelts, watersheds, resource sites, protected areas and ecological corridors.

Physics remains authoritative for physical simulation and terrain capabilities. Other owning domains may provide ecology, climate, agriculture or resource models. City records civic decisions, access, land use, dependencies and planning proposals while preserving the source and uncertainty of those inputs.

### Time, schedules and change

City must support multiple temporal scales: daily routines, opening hours, market days, seasons, construction phases, elections, festivals, migration cycles, disasters, long-term growth, abandonment and historical eras. Schedules and operating windows should be first-class data.

The passage of time and the rules for time travel are not assumed to be identical. A world may be historical, contemporary, far-future, alternate-history, fantasy, science fiction or a mixture authored by the creator. Temporal mechanics belong to the relevant setting and SURPS rulebooks. City records the local chronology and consequences presented to its civic systems without silently deciding which temporal theory is true.

### City as a composable simulation and story stage

A City instance should be usable in several modes without changing the underlying domain identity:
- **Atlas:** inspect places, districts, routes, resources and civic systems.
- **Planner:** author and compare proposals for land use, buildings, services and networks.
- **Simulation:** evaluate declared behaviors, capacities, demand, movement and change.
- **Story stage:** host encounters, journeys, deliveries, markets, festivals, mysteries, conflicts and personal sagas.
- **Tabletop setting:** provide locations, factions, services, travel context, NPC roles, hooks and consequences for SURPS play.
- **Living world:** allow persistent inhabitants, institutions and infrastructure to evolve over time.
- **First-person experience:** let a participant walk, ride, work, shop, deliver, govern or simply inhabit the same places represented in the atlas.

The same identities should be traceable across maps, textual Renderer output, Visualize scenes, simulation records and rulebook presentations. A story event should not require a second disconnected city model.

## Domain coverage map

The following is a coverage checklist for the City domain, not a claim that every subsystem is implemented.

| Domain family | Representative content | Primary ownership |
|---|---|---|
| Places and settlement forms | Homesteads, villages, towns, cities, megacities, mobile and off-world settlements | City |
| People and social organization | Residents, households, roles, visitors, migration, community relationships | City with SURPS |
| Commerce and livelihoods | Peddlers, markets, shops, vendors, workshops, trade locations | City places; Economy exchange |
| Goods and logistics | Inventory locations, warehouses, routes, dispatch, delivery and supply | City logistics context; owning goods/economy domains |
| Buildings and parcels | Sites, structures, rooms, occupancy, lifecycle and land use | City; Physics for physical behavior |
| Mobility and access | Paths, roads, transit, waterways, vertical and extraordinary connectors | City networks; Physics for physical constraints |
| Utilities and services | Water, energy, waste, communications, health, education, safety and care | City service organization; specialist domains provide models |
| Governance and security | Jurisdiction, authority, law, safety, emergency response, rights and accountability | City with SURPS and specialist rulebooks |
| Culture and public life | Identity, festivals, institutions, landmarks, shared memory | City with creator-authored setting content |
| Ecology and resources | Land use, habitats, resource dependencies, environmental planning | City consumes authoritative specialist outputs |
| Technology and extraordinary capabilities | Technology profiles, magic, portals, automation, time travel and scenario exceptions | Capability-owning rulebooks; City integrates consequences |
| Time and history | Schedules, eras, chronology, historical change and temporal exceptions | City records local civic history; temporal rules belong to setting rulebooks |
| Planning and simulation | Proposals, scenarios, capacity, resilience, service coverage and consequences | City, with explicit source-domain boundaries |
| Presentation and experience | Atlas, Renderer, Visualize, tabletop and first-person experiences | City presents; host/runtime executes |

## Rulebook composition and scenario freedom

The settlement rulebook must be composable with other rulebooks rather than attempting to absorb their subject matter. A City scenario may combine:
- City settlement, district, commerce-place and civic-service rules;
- Physics terrain, movement constraints and physical consequences;
- Economy exchange, currency, prices, scarcity and business rules;
- Laboratories research, experimentation and unusual devices;
- SURPS core people, actions, interactions, time and shared ontology;
- setting-specific technology, magic, history, temporal mechanics, factions, species or narrative conventions.

A medieval village with a visiting peddler and a time-travelling pizza courier can therefore be represented as a City settlement with ordinary local commerce plus a scenario-specific visitor and extraordinary capability supplied by other rulebooks. The village does not need to become modern, and the visitor does not need to be forbidden. Their coexistence is the point of composition.

Creators must be able to choose strict historical or technological constraints when desired, and deliberately break those constraints when creating alternate history, comedy, science fiction, fantasy, crossover stories or experimental tabletop campaigns. City should expose consequences and dependencies, not police genre.

## Expanded validation scenarios

1. **Emond's Field-like village:** a small agrarian community with a green, an inn, a mill, surrounding farms, local crafts, seasonal visitors, a peddler and dependence on a distant market town. The example should focus on lived relationships and local services, not copied fictional canon.
2. **Itinerant peddler route:** a merchant travels between hamlets and villages with limited inventory, a pack animal or cart, changing demand, weather constraints, local customs and restocking needs.
3. **Contemporary pizza delivery:** an order is accepted, prepared, dispatched and delivered using a scooter, roads, a worker schedule, inventory, customer address and declared service conditions.
4. **Pre-gunpowder time-travelling pizza rider:** a modern scooter and courier arrive in a pre-gunpowder village. The scenario identifies the baseline/exception, route and arrival, local reactions, service incompatibilities and story consequences while temporal mechanics remain owned by the relevant rulebook.
5. **Science-fiction megacity:** multiple vertical layers, high-density neighborhoods, autonomous transit, automated provisioning, restricted zones, public commons, service networks and unequal access to advanced capabilities.
6. **Uneven technology region:** a wealthy district has advanced medicine and automation while nearby settlements rely on local craft, traditional transport and fragile supply routes.
7. **Mobile settlement:** a caravan, flotilla or migratory community changes location while retaining identities, governance, inventories, routes and social relationships.
8. **Civic stress test:** a flood, supply interruption, infrastructure failure or conflict tests service capacity and governance; uncertainty, affected populations and recovery decisions remain visible.
9. **Mixed-rulebook tabletop campaign:** a village, market road and distant city host a sequence of investigations, deliveries, faction encounters and travel events without requiring a separate story-only geography model.

## Implementation and evidence discipline

This expanded coverage is a domain definition and validation roadmap. It does not claim that City currently simulates inhabitants, markets, deliveries, governance, time travel, megacity infrastructure or all listed services.

Implementation should proceed in thin, inspectable vertical slices:
1. stable identities and relationships for places, people/roles, routes, buildings and service locations;
2. authored settlement fixtures from outpost through village and town;
3. commerce-place and itinerant-peddler fixture with route, inventory and customer relationships;
4. capability profiles and scenario exceptions that can be consumed without hard-coding a technology era;
5. delivery lifecycle fixture, first conventional and then deliberately extraordinary;
6. richer civic networks, governance, safety, culture and infrastructure;
7. scalable megacity and multi-settlement region fixtures;
8. SURPS binding once its shared contract is stable.

Every slice must distinguish authored fixture, imported evidence, derived interpretation, simulation output and future intent. The roadmap is intentionally broad; the first implementation slice should remain small enough to test rigorously.
