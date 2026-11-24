# Singularity City — SURPS Sourcebook Catalogue

![The Singularity Workshop animated moniker](https://raw.githubusercontent.com/TrentBest/TheSingularityWorkshop.Visualize/development/docs/assets/moniker.svg)

This is Singularity City's canonical local SURPS catalogue. The cross-repository [SURPS Master Rulebook Map](https://github.com/TrentBest/TheSingularityWorkshop.SingularityUniversalRoleplayingSystem/blob/development/docs/rulebook-backlog/index.md) remains the authority for global book identity, ownership sign-in, and repository participation.

Singularity City owns city-specific domain knowledge and implementation. SURPS owns shared roleplaying ontology, CORE rules, book composition, and LOD selection. These books are human-readable domain sourcebooks; their presence does not claim a completed `ISurpsRulebook` runtime adapter or machine-executable rule resolver.

## SURPS living rulebook and behavior-adapter standard

This repository adopts the shared SURPS [Living Rulebook and Experience Standard](https://github.com/TrentBest/TheSingularityWorkshop.SingularityUniversalRoleplayingSystem/blob/development/docs/living-rulebook-standard.md) and [Behavior Model and Adapters](https://github.com/TrentBest/TheSingularityWorkshop.SingularityUniversalRoleplayingSystem/blob/development/docs/behavior-and-adapters.md). SingularityCity owns civic geography, districts, parcels, residents, institutions, services, and destination discovery. Visitor experiences should reuse the central SURPS character identity and keep City-owned progress separate.

The standard requires a big-picture-first guide, concise Player path, deep Game Master/Workshop path, living pictures for major concepts, worked demonstrations for mechanics, and honest status labels. The tabletop adapter is derived from underlying behavior during workshop calibration; the digital adapter uses compiled behavior with live state. Neither is a separate source of truth. Adoption work: [repository issue](https://github.com/TrentBest/TheSingularityWorkshop.SingularityCity/issues/5).

## Declared for SURPS review — not yet enrolled

All ten entries below have a local Markdown source, canonical descriptor, and distinct cover. Their current publication status is **draft**. The repository is `integrated-not-enrolled`; global ownership claims and admission evidence remain subject to independent SURPS review.

| Sourcebook | LOD | Descriptor | Cover | Scope |
|---|---:|---|---|
| [Nonplayer Characters](nonplayer-characters.md) | 1 | [Descriptor](nonplayer-characters.book.json) | [Cover](covers/nonplayer-characters.svg) | Shared City-owned person, resident, visitor, and agency domain |
| [Thieves & Shadow Work](thieves-and-shadow-work.md) | 2 | [Descriptor](thieves-and-shadow-work.book.json) | [Cover](covers/thieves-and-shadow-work.svg) | Thief roles, motives, agency, incidents, victims, consequences, and reform |
| [The Urban Underworld](urban-underworld.md) | 2 | [Descriptor](urban-underworld.book.json) | [Cover](covers/urban-underworld.svg) | Crews, guilds, fences, disputed property, informal networks, corruption, and rumor |
| [Law Enforcement & Public Safety](law-enforcement-and-public-safety.md) | 2 | [Descriptor](law-enforcement-and-public-safety.book.json) | [Cover](covers/law-enforcement-and-public-safety.svg) | Public-safety institutions, jurisdiction, evidence, response, rights, and oversight |
| [Justice, Courts & Restitution](justice-courts-and-restitution.md) | 2 | [Descriptor](justice-courts-and-restitution.book.json) | [Cover](covers/justice-courts-and-restitution.svg) | Due process, findings, remedies, sentencing, appeals, and restorative justice |
| [Governance & Civic Administration](governance-and-civic-administration.md) | 2 | [Descriptor](governance-and-civic-administration.book.json) | [Cover](covers/governance-and-civic-administration.svg) | Institutions, offices, jurisdictions, services, budgets, records, and accountability |
| [Politics, Power & Public Will](politics-power-and-public-will.md) | 2 | [Descriptor](politics-power-and-public-will.book.json) | [Cover](covers/politics-power-and-public-will.svg) | Political actors, factions, elections, representation, dissent, and legitimacy |
| [Elections & Player Participation](elections-and-player-participation.md) | 2 | [Descriptor](elections-and-player-participation.book.json) | [Cover](covers/elections-and-player-participation.svg) | Player voting, campaign advertising, ballot privacy, counts, disputes, and appeals |
| [Vigilantes & Civic Justice](vigilantes-and-civic-justice.md) | 2 | [Descriptor](vigilantes-and-civic-justice.book.json) | [Cover](covers/vigilantes-and-civic-justice.svg) | Self-appointed protectors, community response, allegations, harms, and accountability |
| [Villains & Antagonists](villains-and-antagonists.md) | 2 | [Descriptor](villains-and-antagonists.book.json) | [Cover](covers/villains-and-antagonists.svg) | Antagonist motives, capabilities, organizations, narratives, choices, and consequences |

## Additional City domain specifications

These content-first specifications are maintained here but are not yet included in the SURPS participation manifest because they do not yet have the complete descriptor-and-cover set required by the participation standard:

- [Vehicles, Mobility and Transport](vehicles.md)
- [Buildings, Materials and Construction](buildings-and-construction.md)
- [Place-specific sourcebook program](../CITY_SOURCEBOOKS.md), including the [Göbekli Tepe research pilot](places/gobekli-tepe/README.md)

They remain City-owned domain work. They will be added to the registered sourcebook list when their formal SURPS book metadata is complete.

## Validation

The canonical local declaration is `.surps/participation.json`. Each book entry binds one stable ID to its Markdown source, `.book.json` descriptor, and distinct cover. Descriptors use the shared SURPS LOD badge for their declared level.

Run the local integrity gate before changing this catalogue:

```bash
python scripts/validate_surps_participation.py
```

The [SURPS Sourcebook Validation workflow](../../.github/workflows/surps-sourcebook-validation.yml) runs this check for relevant changes on `development`. A passing check validates local identity and asset consistency; it does not accept ownership claims or enroll the repository.

## Ownership boundaries

- City: inhabited places, civic institutions, residents, infrastructure, public services, city-specific procedures, and civic relationships.
- SURPS: shared ontology, CORE tabletop rules, rulebook identity, LOD semantics, and composition.
- Physics: physical laws, terrain generation, and physical simulation.
- Economy: authoritative currency, accounts, ledgers, trade, and economic transactions.
- Other domain owners retain their implementations; City and SURPS link to them rather than duplicate them.

The sourcebook set distinguishes proposed/design content from implemented behavior and does not imply that a documentation registration is a software release.
