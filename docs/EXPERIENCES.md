# City Experience Entry Points

## Principle

Experiences are discovered spatially but remain owned by their domain repositories. City provides location, discovery, access and transition. It does not absorb the dungeon, laboratory, game or workshop implementation.

## Manifest shape

The following is an illustrative contract, not yet a bound runtime schema:

```json
{
  "schema": "singularity-city.experience-entry.v1",
  "experienceId": "fsm-dungeon.underworks",
  "title": "The Underworks",
  "owner": {
    "repository": "TrentBest/FSM_Dungeon"
  },
  "entryPointId": "underworks.main-entrance",
  "place": {
    "cityId": "singularity-city",
    "districtId": "municipal-core",
    "placeId": "underworks.access-gate"
  },
  "target": {
    "domain": "FSM_Dungeon",
    "siteReference": {
      "kind": "city-district",
      "anchor": "municipal-core"
    }
  },
  "capabilities": [
    "world.topology",
    "world.inhabitants",
    "world.environment",
    "world.exploration"
  ],
  "access": {
    "policy": "host-authorized"
  }
}
```

The exact schema should be versioned and validated before production use. IDs are stable machine identity; titles and descriptions are presentation.

## First destination portfolio

| City location | Experience / capability | Owning domain |
|---|---|---|
| Municipal Underworks gate | Sewer network, underground exploration and simulation | FSM_Dungeon |
| Transit Station | Destination discovery and travel | Singularity Transit / host |
| Workshop campus | Creation tools, workbench and blueprint library | Workshop repositories |
| Laboratory complex | Scientific and educational experiences | Laboratory domain |
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
