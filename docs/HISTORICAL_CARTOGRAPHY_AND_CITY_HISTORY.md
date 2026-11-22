# Historical Cartography and the City's Changing Story

## Governing principle

A map is a time-bound representation of a place, made for a particular audience and purpose with the knowledge, instruments, conventions and political priorities available to its maker.

**A historical map is not a failed modern map.** It may omit elevation, underground infrastructure, parcel precision or statistical layers because those things were unknown, unmeasured, irrelevant to the map's purpose, or deliberately left out. The omission does not prove that the underlying fact did not exist. Nor does it prove that the mapmaker knew it.

Singularity City should preserve both the underlying place-history and the historically situated map as separate, related things. A modern topographic map, a hand-drawn town plan, a cadastral sheet and a reconstructed historical view can describe the same location without pretending to contain the same information.

## One place, many cartographic moments

The same stable City feature identities should be addressable across time:
- a river before and after channelization;
- a trail that became a road, then a transit corridor;
- a settlement that grew into a district;
- a parcel that was subdivided, consolidated or redeveloped;
- a mill, mine, port, station or market that created prosperity and later declined;
- a neighborhood affected by fire, flood, epidemic, war, displacement, recession or infrastructure failure;
- a park, school, bridge or public service that changed daily life.

Historical maps are evidence and interpretation layers over this evolving place. They do not replace the current spatial model, and current geometry must not be silently projected backward as if it had always existed.

## Separate the map's content from the world's knowledge

For each historical map or map-like source, record at least:

- **Map identity:** stable ID, title, creator or institution, publication/creation date, edition and source reference.
- **Time represented:** survey date, depicted period, revision interval, and whether the map is retrospective.
- **Purpose and audience:** navigation, property, taxation, military, engineering, tourism, civic promotion, education or another stated purpose.
- **Coverage and scale:** geographic extent, nominal scale or an explicit unknown value, sheet boundaries and omissions.
- **Reference system:** original projection/grid/datum if known; control points and transformation method when georeferenced.
- **Content and legend:** symbols, labels, categories, units and conventions actually present on the source.
- **Source quality:** provenance, licence/rights, scan resolution, physical condition, known copying lineage and transcription status.
- **Interpretive status:** directly visible, transcribed, georeferenced, inferred, reconstructed or speculative.
- **Uncertainty:** positional error, date range, ambiguous names, disputed boundaries and confidence by feature where possible.

Unknown must remain unknown. A missing legend entry is not a negative observation. A blank area is not proof that nothing was there. A line whose meaning is uncertain should remain uncertain rather than being assigned a modern category.

## Two complementary layers of truth

Keep these concepts distinct:

1. **Historical source image:** the preserved map as published or drawn, including its original framing, symbology, labels, distortions and omissions.
2. **Georeferenced source:** an aligned view of that image with control points, transformation method, residual/error information and a link to the untouched source.
3. **Historical feature interpretation:** individually transcribed or interpreted features with source citations, date ranges and confidence.
4. **Temporal City model:** versioned entities and relationships describing what is known to have existed, changed or operated during an interval.
5. **Modern analytical view:** current or newly derived topography, parcels, infrastructure, hazards and statistics, clearly labelled with their own source dates and methods.

A georeferenced overlay is useful, but it is not the original map. A digitized road is an interpretation of marks on a source, not a fact that should lose its source link. A modern elevation model can help explain the terrain beneath an old settlement, but it must not be styled as information that the historical map itself contained.

## Time is part of every feature

Historical city data should support valid-time intervals and record-time provenance:

- **Valid time:** when the feature or relationship existed in the world, including approximate or uncertain start/end dates.
- **Record time:** when the information entered the City knowledge base, and which source or revision justified it.

Do not force uncertain dates into false precision. Use ranges, circa dates, competing claims and explicit unknown boundaries. Distinguish a feature's physical existence from its name, legal status, ownership, use and representation on a map; these can change at different times.

Events should connect to affected features and relationships rather than becoming detached timeline decorations. A flood can affect a river, bridge, homes, roads, businesses and public response. A railway opening can change travel time, land value, employment and settlement growth. A closure can leave a physical structure standing after its original function has ended.

## Tell the city's boons and hard times

The historical experience should explain cause, consequence and uncertainty—not just display a sequence of pretty old maps.

Possible story threads include:
- founding conditions: terrain, water, access, resources and earlier inhabitants;
- growth: trade, industry, agriculture, ports, railways, migration, institutions and public investment;
- civic achievements: bridges, sanitation, schools, parks, transit, housing and utilities;
- costs and conflicts: pollution, unsafe work, exclusion, displacement, land seizure, unequal services and environmental damage;
- shocks: fires, floods, landslides, epidemics, economic downturns, conflict and infrastructure failure;
- adaptation: rebuilding, policy changes, new industries, restoration and changing community priorities.

Avoid a single triumphalist or disaster-only narrative. Show who benefited, who bore the costs, what evidence supports the account, whose perspectives are missing and where historians disagree. The system should support multiple sourced narratives rather than declare one unqualified official story.

## A time-aware cartographic experience

A future City history view should let a visitor:

1. choose a date or date range, with the map's actual temporal coverage visible;
2. select a historical source map and inspect its provenance and original legend;
3. compare the untouched source image with its georeferenced overlay;
4. toggle interpreted historical features without hiding the original evidence;
5. compare historical layers with modern topography and current city layers;
6. scrub through documented changes and see affected places, people, networks and institutions;
7. open an event or feature to read its evidence, uncertainty and consequences;
8. switch to a present-day analytical view without losing the historical context.

The renderer should be able to reproduce period-appropriate cartographic conventions when the source supports them—hand lettering, hachures, engraved linework, restrained color, paper condition and symbol vocabulary. Such styling is a representation choice, not permission to invent historical content. A reconstruction must be labelled as a reconstruction.

## Architecture and ownership

- **City** owns stable spatial identities, temporal relationships, civic history records and links between places, events and sources.
- **Physics** owns physical terrain generation and evolution. Historical terrain observations or maps can inform a reconstruction only with source dates, uncertainty and an explicit modelling method; they do not replace Physics authority for a simulation.
- **Domain repositories** own their subject-matter models and interpretations, such as geology, hydrology, transport, economy or public health.
- **Renderer / Visualize** present source maps, overlays, temporal comparisons and period-specific styles without becoming data authorities.
- **Host** owns navigation, time selection, persistence, access control and approved changes to authoritative records.

Historical facts and reconstructions should be read-only evidence by default. New interpretations, corrected transcriptions or reconstructed features are proposals with author, method, source links and review status. They must not overwrite the original source or silently rewrite committed history.

## Implementation sequence

1. Define versioned schemas for map sources, temporal features, events, source citations and uncertainty.
2. Add a small curated sample containing an original map image, its metadata and a clearly labelled modern comparison layer.
3. Demonstrate one georeferenced overlay with documented control points and residual error.
4. Transcribe a limited set of features—such as a river, road, station and district—with source-linked confidence and date ranges.
5. Add a timeline that changes the selected temporal view while preserving stable feature identity.
6. Add one evidence-led story thread connecting a documented civic change to its benefits, costs and affected places.
7. Only then expand source coverage, automated digitization, temporal queries and richer period rendering.

## Evidence and implementation boundaries

This document defines the domain contract and implementation direction. It does not claim that historical map ingestion, georeferencing, temporal querying, historical reconstruction or a city-history timeline is already implemented.

The first proof should use real, rights-cleared source material and make every transformation inspectable. Synthetic examples may test schemas and rendering, but must be labelled synthetic. Never present generated period maps, guessed dates or unverified narratives as historical evidence.
