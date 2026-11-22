# City Builder and First-Person Mayor Experience

## One world, two complementary interfaces

The map is the planning instrument. First-person is the lived consequence. Both must resolve the same stable City entities and revisions.

A mayor should be able to switch from regional terrain to district, parcel, street, transit, utility and building maps, then enter that same place at human scale. A street selected on the mobility map is the street under the player's feet. A building selected on a parcel map is the building whose entrance the player approaches.

## Experience boundary

City owns spatial identity, geography, parcels, districts, civic entities and the relationship graph. Renderer owns observer-relative representation and frame fidelity. Visualize manifests the frame. The game/host adapter owns camera, input, collision, avatar movement, streaming, audio, multiplayer, persistence and interaction dispatch. Domain systems own their simulations (for example, FSM_Dungeon owns underground topology and simulation).

The city data must not depend on a particular camera, graphics API, first-person controller or game engine.

## First-person world contract

A walkable world needs explicit, versioned spatial anchors:
- world transform and horizontal/vertical coordinate reference;
- terrain surface and collision source;
- building shell, floor elevations, room volumes and walkable surfaces;
- entrances, exits, doors, stairs, lifts and accessibility routes;
- street/sidewalk/cycleway surfaces and crossing nodes;
- transit platforms, stop anchors and boarding volumes;
- utility access points and restricted/service-only areas;
- spawn points, portals and experience entry anchors;
- navigation/streaming bounds and level-of-detail regions.

A building polygon on a map is not a building interior. Interior geometry, collision and room connectivity must be authored or generated under their own validated contracts. Underground infrastructure is referenced through opaque domain anchors, not copied into City.

## Mayor interaction loop

`Walk → Observe → Inspect → Plan → Preview → Decide → Commit → Witness`

The player can:
1. walk or ride through districts and discover places;
2. inspect parcels, buildings, public facilities and infrastructure;
3. open a map from the world and see the player's current position;
4. select a map feature and navigate to its real-world anchor;
5. propose a park, road, transit line, zoning change, building or utility upgrade;
6. preview cost, capacity, access, environmental and resident impacts;
7. submit the proposal for host validation and approval;
8. watch construction, service changes and city simulation update the same map.

The player is mayor, not an omnipotent editor. Land ownership, budgets, planning rules, public consultation, service capacity and emergency constraints create meaningful decisions. Authority and approval remain host-controlled.

## Controls and accessibility contract

The initial desktop target may use mouse-look and WASD movement, with configurable interaction, sprint, crouch, jump, map and pause bindings. These are host-level defaults, not hard-coded City domain rules. Support keyboard remapping, controller/gamepad, sensitivity settings, subtitles, readable map symbols, colour-independent layer distinctions and non-FPS map navigation.

## Simulation consequences

City-builder actions should produce explicit state transitions and observable deltas:
- land-use and zoning affect permitted development;
- road geometry affects connectivity, travel time and parcel frontage;
- transit service affects accessibility and demand;
- buildings add population, jobs, floor area and utility demand;
- water/energy networks constrain development and resilience;
- parks and green infrastructure affect shade, runoff and habitat;
- civic services affect service coverage and equity;
- construction and maintenance consume budget and time.

Use bounded, explainable models with declared assumptions. Never present synthetic simulation output as measured fact.

## Vertical-slice acceptance criteria

A first playable proof is not a full city simulation. It should demonstrate:
- one shared coordinate reference for map and world;
- one stable parcel/building/street identity visible in both views;
- terrain surface and a walkable route;
- one building exterior with a real entrance anchor and one inspectable interior room;
- player position reflected on the map;
- a map selection that resolves to a world destination;
- a mayor proposal preview with validation feedback;
- explicit synthetic-data and simulation limitations.

## Delivery stages

1. **Spatial data**: terrain, hydrology, districts, parcels and network maps.
2. **World anchors**: world transform, terrain collision, street surfaces, building shells and entrances.
3. **First-person host**: avatar, camera, collision, input, interaction and map synchronization.
4. **Civic gameplay**: proposal workflow, budgets, permits, construction and service consequences.
5. **Living city**: time, residents, transit, economy, ecology, incidents and multiplayer authority.

This is a reusable city-builder architecture. The first city is only the first authored world.
