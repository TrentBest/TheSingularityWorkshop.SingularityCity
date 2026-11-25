# City Experience Entry Points

## Principle

Experiences are discovered spatially but remain owned by their domain repositories. City provides location, discovery, access and transition. It does not absorb the dungeon, laboratory, game or workshop implementation.

## Versioned contract

The illustrative entry shape is now an explicit JSON Schema contract:

- [Experience-entry schema](../schemas/experience-entry.schema.json)
- [Underworks contract fixture](../tests/fixtures/underworks.experience-entry.json)
- [Place-catalog schema](../schemas/place-catalog.schema.json)

The fixture demonstrates identity and reference consistency only. It is not a registered production destination, a live runtime handoff, or proof that FSM_Dungeon is currently loadable through City.

A City place is a discoverable geographic destination. An experience entry is a separate declaration that connects a stable place identity to an independently owned experience. One place may expose multiple entry points, and an experience may have multiple entries. Titles and descriptions are presentation; IDs are machine identity.

The place catalog retains its existing map coordinates as City presentation/map coordinates. They are not Physics world coordinates and do not declare an origin, axis convention, unit scale, or transform. Any future conversion must use an explicit Physics-owned spatial contract rather than inference from the map.

## Manifest shape

The schema requires:
- a versioned \`schema\` identifier;
- stable experience and entry-point IDs;
- the owning repository;
- City, district and place identities;
- target domain and opaque site reference;
- declared capabilities;
- an access policy evaluated by a trusted host.

Optional host requirements and presentation metadata do not grant permissions. City describes the requested handoff; a trusted host remains responsible for authentication, authorization, capability availability, context creation and audit.

## First destination portfolio

| City location | Experience / capability | Owning domain |
|---|---|---|
| Municipal Underworks gate | Sewer network, underground exploration and simulation | FSM_Dungeon |
| Transit Station | Destination discovery and travel | Singularity Transit / host |
| Workshop campus | Creation tools, workbench and blueprint library | Workshop repositories |
| Laboratory complex | Scientific and educational experiences | Singularity Laboratories |
| Game Arcade / tactical shop | Reusable combat, tactics, RTS, 4X and RPG capability families | Game experience repositories |
| Capitol | Civic roles, governance and public services | City |
| Mansion / estate district | Architecture, property and household experiences | City and relevant domain packages |
| Ocean Shipyard | Construction, logistics and maritime experiences | Shipyard / relevant domains |

This portfolio is a discovery map, not a promise that every destination is already implemented.

## Capability families

Game shops should expose reusable capability families rather than sell isolated hard-coded scenes:

- combat and warfare;
- tactical command;
- real-time strategy;
- 4X exploration, expansion, economy and diplomacy;
- RPG attributes, skills, progression, equipment and quests;
- logistics and transportation;
- production and manufacturing;
- economy and markets;
- simulation time and ticks;
- exploration and discovery.

The same capability can be composed into different experiences through MicroBundles.

## Handoff contract

A host-mediated transition should:

1. Resolve the selected place and entry-point identity.
2. Confirm the destination is discoverable and currently available.
3. Evaluate user, resident or group access policy.
4. Resolve required capabilities and host support.
5. Create or resume the target experience context.
6. Pass only the declared site reference and approved context.
7. Record the transition and its provenance.

The browser prototype currently previews this intent locally. A real transition requires a host adapter and an available target experience.
