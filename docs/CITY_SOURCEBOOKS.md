# City Sourcebooks — Places, Cities and Their Histories

![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

## Purpose

Singularity City should publish books about both the systems that make settlements work and the particular places those systems produce.

A **domain sourcebook** explains a reusable subject: residents, commerce, transport, utilities, governance, buildings or settlement formation. A **place sourcebook** studies one identifiable place: a village, town, city, metropolitan region, historical settlement, planned community, orbital habitat or fictional city.

These are complementary views, not competing taxonomies. A New York book can use the general mobility, commerce, resident and civic models while documenting the city's own geography, history, neighborhoods, institutions and distinctive systems.

Place sourcebooks are intended to serve as:
- research-led introductions and deeper reference works;
- visual atlases and historical comparisons;
- educational material for geography, history, architecture and civic systems;
- worldbuilding references for SURPS and other experiences;
- authored, provenance-bearing inputs that may later inform City fixtures and simulations.

A book is not itself a live city model. Narrative, diagrams, maps, researched claims, authored fixtures, derived analyses and runtime state must remain distinguishable.

## Two axes: subject and place

| Axis | Question | Examples |
|---|---|---|
| Domain | What kind of system or subject are we studying? | Nonplayer Characters, Villages to Cities, mobility, markets, water, governance |
| Place | Which particular settlement or region are we studying? | Tacoma, New York City, Tokyo, Venice, London, ancient Rome |

A place book may link to many domain books. A domain book may be demonstrated by many places. Neither should copy the other's authority.

## What a place sourcebook contains

A city is not a single skyline photograph or a boundary polygon. Its book should build a layered account, choosing the detail appropriate to the place and available evidence.

1. **Identity and scope** — names, aliases, jurisdiction, geographic extent, neighboring settlements, and what the book means by the city's name.
2. **Geographic setting** — landforms, water, climate, ecology, hazards and regional position, with physical facts sourced from the relevant authoritative domain.
3. **Origins and historical periods** — settlement formation, major transformations, continuity, rupture, contested accounts and dated snapshots.
4. **Urban form** — centers, districts, streets, blocks, parcels, public spaces, building patterns, density and vertical structure.
5. **People and communities** — residents, migration, languages, communities, occupations, daily life and demographic evidence, with uncertainty and historical context made explicit.
6. **Civic institutions and governance** — jurisdictions, public services, institutions, law, decision-making, public finance and civic participation.
7. **Movement and connection** — walking, roads, transit, rail, ports, airports, waterways, freight, accessibility and regional networks.
8. **Provisioning and infrastructure** — water, sanitation, energy, food, waste, communications, housing, health, education and resilience.
9. **Work, commerce and culture** — markets, industries, crafts, institutions, food, art, architecture, festivals, memory and public life.
10. **Landmarks and destinations** — why a place matters, how it relates to its surroundings, and what is known or not known about access.
11. **Challenges and change** — growth, decline, displacement, environmental pressure, disasters, investment, adaptation and competing futures.
12. **Source ledger and interpretation** — references, dates, coverage, confidence, conflicts, derived measures and authored scenarios.

Not every city has the same story or the same available data. The outline is a coverage guide, not a demand to force every place into one template.

## Time is part of place identity

A city changes. A place sourcebook must state which period a claim describes.

Useful forms include:
- **Contemporary profile:** a dated snapshot with an explicit research cutoff.
- **Historical volume:** a particular period, with boundaries and names appropriate to that time.
- **Transformation series:** comparable snapshots showing how a city changed.
- **Future scenario:** a clearly labelled projection or authored possibility, never presented as observed fact.
- **Cross-era atlas:** several periods connected through stable place identities where that continuity is justified.

Historical boundaries, names, populations, street networks and institutions must not be silently projected backward or forward. A present-day administrative boundary is not automatically the right frame for an ancient settlement. Where boundaries or dates are uncertain, preserve that uncertainty.

## Evidence and provenance standard

Every substantive claim should be classifiable as one of:

- **Sourced fact:** supported by a cited source with publication/record date and relevant period.
- **Source interpretation:** a historian's, institution's or other author's interpretation, attributed as such.
- **Derived analysis:** a calculation or comparison with named inputs and method.
- **Authored reconstruction:** a reasoned but not directly evidenced reconstruction, explicitly labelled.
- **Scenario:** an intentional fictional, alternate-history or future construction.
- **Unknown / disputed:** evidence is absent, incomplete or conflicting.

Maps and images need their own provenance: creator, source, date, license or usage basis, geographic and temporal coverage, coordinate reference where relevant, and any transformations. Do not imply that a decorative illustration is a surveyed map or that a generalized boundary is an authoritative legal boundary.

Prefer primary and authoritative sources where suitable: municipal and regional open-data portals, census and statistical agencies, archives, libraries, historical maps, planning documents, transport agencies, academic research, heritage organizations and documented field observations. Secondary sources remain useful, especially when they explain contested history or synthesize evidence. Record disagreements rather than hiding them.

## Folder and artifact convention

Place-specific books live under `docs/books/places/`, separate from reusable domain books.

Suggested structure for a place:

```text
docs/books/places/
  README.md
  tacoma/
    README.md
    tacoma.book.json
    chapters/
    maps/
    images/
    data/
    sources/
    scenarios/
```

A city may use a different chapter structure when its history, geography or scale warrants it. The stable place ID and sourcebook descriptor should not depend on folder name or display title.

A descriptor should identify at least:
- schema version and stable book ID;
- category (place), title, version and status;
- place identity and geographic scope;
- temporal coverage / research cutoff;
- cover and LOD artwork when available;
- publisher and moniker;
- source ledger location and license notes.

Do not add empty placeholder chapters or pretend a sourcebook is complete merely because its directory exists. Start with a scoped, useful first edition and grow it as evidence and review become available.

## Relationship to LOD

LOD is a statement about the detail of representation, not a substitute for evidence quality or geographic scope. A city-wide overview may be low detail but well sourced; a single building study may be high detail but have important unknowns.

Use LOD to explain how much detail a reader or runtime should expect:
- broad regional/city orientation;
- districts and neighborhoods;
- streets, blocks and public spaces;
- individual sites, buildings and interiors.

The book must state what each level actually contains. Do not assign a higher LOD badge simply because a subject is famous or the book is longer.

## Relationship to City implementation

The sourcebook is a research and authoring layer. City runtime data remains separately versioned and typed.

- **Physics** owns terrain and physical simulation; place books may cite and visualize authoritative outputs without recreating them.
- **Singularity City** owns civic geography, districts, parcels, places, routes, institutions and place relationships.
- **Economy** owns economic models, exchange, prices and valuation.
- **SURPS** owns shared ontology and composable rulebook conventions once its common contract is accepted.
- **Specialist repositories** own their domain models and operational evidence.
- **Renderer / Visualize** present the same identities at different representational levels; illustrations do not become authoritative state.

A sourcebook may propose a City fixture, but imported research, authored interpretation and simulated output must remain separately labelled. A researched historical map does not automatically become the current city blueprint.

## Initial place-book catalogue candidates

These are proposed editorial candidates, not completed or researched books:

| Place | Why it is a useful study |
|---|---|
| Tacoma, Washington | A local case for port, rail, industry, waterfront, neighborhoods, regional connections and urban change |
| New York City | Dense multi-center metropolis, boroughs, transit, immigration, verticality, infrastructure and global networks |
| Tokyo | Metropolitan scale, rail-oriented urban form, neighborhood identity, disaster preparedness and layered history |
| Venice | Water-based urban morphology, maritime history, access, tourism, heritage and environmental pressure |
| London | Long urban continuity, layered governance, transport networks, river relationships and historic districts |
| Rome | Multiple historical city layers, ancient and modern infrastructure, monuments, archaeology and changing political centers |
| Singapore | Port city, planned development, land constraints, housing, infrastructure and regional/global connections |

The catalogue should grow through deliberate editorial selection, not a race to list famous cities. Include small towns, villages, Indigenous and historically marginalized places, industrial communities, planned settlements, declining cities and places outside familiar North American/European examples. Respect community authority, cultural context, privacy and sensitive-site restrictions.

Fictional cities can also have place sourcebooks, but they need a separate evidence convention: canon/source references, creator-authored additions, interpretation and fan speculation must not be conflated. Respect copyright and avoid reproducing protected text or artwork.

## First implementation sequence

1. Establish this place-book convention and keep it distinct from domain sourcebooks.
2. Create a reusable descriptor and chapter starter only when the first real book is ready to author.
3. Select one pilot place with a clear scope and accessible source base; Tacoma is a strong candidate, but not an assumption that every chapter is already researched.
4. Build a small, source-cited first edition: identity, geography, historical outline, districts, mobility, civic systems and source ledger.
5. Add dated maps and visual comparisons with clear licenses, coordinate references and provenance.
6. Only then derive selected, explicitly labelled City fixtures from the researched material.
7. Expand to other cities and historical periods using the same evidence discipline while allowing each place to retain its own structure and voice.

**Current status:** editorial architecture and candidate catalogue. No city-specific place sourcebook is claimed complete by this document.
