# Living Picture — City as an Observable World

![Singularity City systems atlas](../assets/images/living-city-atlas.svg)

**A living picture is not an animated poster.** It is a visible projection of a world model whose entities, relationships, rules, and changes can be inspected.

## One world, several views

The same city must be addressable as:
- **Regional / city plan:** coastline, terrain, districts, major routes, watersheds, transit and activity aggregates.
- **District / aerial:** blocks, parcels, building footprints, parks, stops, utilities and service coverage.
- **Street:** façades, entrances, sidewalks, crossings, trees, vehicles, Digitens and public life.
- **Building / interior:** floors, rooms, circulation, systems, furnishings, occupants and access.
- **Infrastructure:** network topology, capacity, condition, flows, dependencies and failures.
- **Analytical:** accessibility, density, land use, heat, water balance, travel demand, service equity and economic flows.
- **Historical / temporal:** construction, maintenance, policy changes, events, seasonal cycles and long-term transformation.

A view is an observer and a representation policy, not a separate world or a new set of entity identities.

## Rendering ownership

Singularity City owns authored domain facts and stable spatial identity. It does not duplicate rendering policy or image manifestation.

- **City / Experience:** what exists, where it exists, its domain state, source revision and spatial meaning.
- **Renderer:** which representation and computational work are justified for a given observer, intent, visibility and budget.
- **Visualize:** consumes the selected frame and manifests image output through a backend.
- **Host / WebPage:** camera, navigation, selection, interaction, persistence, authorization and presentation lifecycle.
- **Physics and domain capabilities:** authoritative physical consequences and domain-specific simulation.

The existing cross-repository coordination contract is [Singularity City Rendering Handoff](https://github.com/TrentBest/TheSingularityWorkshop.Visualize/blob/development/docs/integrations/SINGULARITY_CITY_RENDERING_HANDOFF.md). It explicitly stages plan view, district/aerial, street, building/interior and vehicle views while preserving identity.

## Existing proof and next integration

Visualize already has a deterministic City Massing proof. It generates a procedural street lattice, varied building heights, façade strips and landmarks, then follows:

**scene data → Renderer representation policy → Renderer frame adapter → VisualizerFrame → Visualize SVG backend → generated artifacts**

That is a CPU-side SVG proof, not a GPU renderer, calibrated urban model, persistent city or live street-level world. See the [City Massing sample](https://github.com/TrentBest/TheSingularityWorkshop.Visualize/tree/development/samples/CityMassing) and [Visualize gallery](https://github.com/TrentBest/TheSingularityWorkshop.Visualize/blob/development/docs/GALLERY.md).

The City browser currently has a separate declarative district/route/parcel preview. These two paths must converge through explicit world inputs and stable IDs—not by copying a second renderer into City.

## The visual proof contract

Every visual page or artifact should state:
1. **What is shown:** entities, fields, relationships and scope.
2. **Where the data comes from:** source file, repository, dataset, algorithm and revision.
3. **What is computed:** deterministic generation, analysis, simulation or rendering.
4. **What is illustrative:** artistic choices, synthetic values and placeholders.
5. **What is not implemented:** persistence, physical simulation, GPU execution, interaction or authority not actually present.
6. **How to reproduce it:** command, workflow, seed, inputs and expected artifact.

The current atlas illustration is intentionally a systems concept image. It helps visitors see the breadth of the domain, but does not pretend to be generated from authoritative city state.

## From image to instrument

The next substantive vertical slice should be one district with a connected, inspectable system:
- parcel → building → room identity hierarchy;
- street and pedestrian graph with traversability;
- transit route, stop, schedule and capacity;
- water supply, stormwater catchment and treatment path;
- electricity source, distribution and loads;
- public space, tree canopy and environmental observations;
- synthetic households, workplaces and civic services;
- a policy or infrastructure scenario with before/after results.

A visitor should be able to select a building, follow its service dependencies, inspect assumptions, change one scenario input, and see both the picture and the analytical outputs respond. Renderer then chooses the appropriate representation of those same identities; Visualize manifests the resulting frame.

## Theory must be visible

The city should teach its own domain. Pair the visual layers with causal diagrams, maps, time series, network views, section cuts, flow diagrams and scenario controls. Explain civil engineering and urban theory beside the picture, not in an isolated wall of prose.

Start with [Civil Systems and City Theory](CIVIL_SYSTEMS_AND_CITY_THEORY.md), then expand each discipline into source-grounded lessons and executable experiments.
