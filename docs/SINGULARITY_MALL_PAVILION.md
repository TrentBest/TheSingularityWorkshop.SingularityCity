# Singularity Mall Pavilion

## Purpose

Singularity Mall is a City-owned public destination in the Civic Quarter: a covered pavilion that brings independent makers, neighborhood merchants, visitors, food, events and public gathering into one walkable place.

The first browser experience is an architectural and discovery prototype. It is deliberately useful now without claiming to be a persistent 3D simulation.

## Current implementation

- `mall.html` is the dedicated pavilion experience.
- `data/mall-pavilion.json` defines the pavilion identity, six inspectable spaces, room footprints on two levels, circulation routes, vertical connectors and four storefront records.
- `assets/js/mall.mjs` renders both selectable floor plans, the zone directory and merchant inspector from the authored data.
- `assets/css/mall.css` styles the pavilion cutaway, spatial workbench and storefront directory.
- `data/places.json` registers the Mall as a stable City destination in the Civic Quarter.
- The City map opens the dedicated Mall page when the Mall entrance is selected.
- `tests/mall-pavilion.test.mjs` protects the destination, zone, storefront and Economy-reference invariants.

## Ownership boundaries

| Concern | Authority |
|---|---|
| Mall identity, location, pavilion spaces, access and destination discovery | Singularity City |
| Merchant presence and City place relationships | Singularity City |
| Currency, prices, accounts, inventory settlement, receipts and journal | The shared Economy domain |
| Shared visitor identity and roleplaying character contract | SURPS |
| Runtime composition, authentication, sessions and persistence | FSM_COS / trusted host |
| Physical movement, collision and environmental consequences | Physics / host experience |

The Mall must not create a City-owned wallet or transaction ledger. It consumes merchant and offer information through the shared Economy contract as that contract becomes executable.

## Storefront truth

The Civic Quarter Bakery is connected to the existing authored fixture at `data/economy/civic-quarter-market.json`. Its two products are read from the Economy shop record rather than copied into the pavilion manifest.

Maker Studio, Field & Fable and The Greenhouse Table are leasing concepts. They are not registered merchants and do not claim live catalogs or inventory.

The browser displays authored fixture prices and quantities for inspection only. It does not reserve stock, accept payment, mutate inventory, issue receipts or settle transactions. The existing market fixture itself is not yet a production Economy execution.

## Spatial plan and circulation\n\nThe current plan is an explicit City-owned spatial fixture rather than a purely decorative cutaway. Each room has a stable ID, level assignment and rectangular plan footprint. Ground and upper levels expose named rooms, public circulation routes, a public entrance, stair landings and lift landings. The browser renders those records into a selectable SVG plan; selecting a room updates the same inspector used by the room directory.\n\nThe circulation study distinguishes accessible public routes and a conceptual lift from stairs. It is not a measured building plan, a code-compliant means-of-egress design, a fire/life-safety review or an accessibility audit. Dimensions, travel distances, capacities, door widths and service access remain unverified.\n\n## Pavilion spaces

1. Arrival Court — public threshold.
2. Grand Atrium — central orientation and gathering.
3. Maker Promenade — independent creator storefronts.
4. Market Hall — neighborhood food and provisions.
5. Upper Gallery — second-level overlook.
6. Event Terrace — demonstrations, launches and workshops.

## Next implementation gates

1. Promote the current room footprints and conceptual circulation into versioned City building, floor, room, entrance and circulation entities with dimensional units and explicit validation.
2. Connect each registered tenant to the canonical Economy merchant/shop/offer contract; do not infer completion from a display fixture.
3. Add SURPS-compatible visitor presence only after the shared character contract is confirmed.
4. Move navigation and interactions behind the host adapter for real sessions, persistence and multiplayer.
5. Add accessibility, opening schedules, delivery/service access, fire egress, utilities and capacity constraints as authoritative data rather than decorative labels.
6. Extend the visitor journey from the Mall threshold into the first-person city experience while preserving stable City place IDs.

## Evidence and limitations

This is a fictional City fixture and an interactive browser prototype. The pavilion cutaway is conceptual massing, not surveyed architecture or a construction design. The storefront directory is not a live marketplace. The prototype must continue to label authored, conceptual, specified and host-executed capabilities separately.
