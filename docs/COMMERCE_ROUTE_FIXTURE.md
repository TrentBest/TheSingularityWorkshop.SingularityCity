# Commerce Route Fixture: Itinerant Peddler

## Purpose

This is the first authored data fixture for the broad City commerce-and-mobility domain. It exercises a small, agrarian settlement rather than assuming a contemporary city. The same identity and relationship model should scale to a market town, megacity courier network or extraordinary cross-setting delivery.

## Scenario

Greenhollow receives Mara, an itinerant peddler carrying household goods and craft supplies by handcart. The fixture identifies:

- Places: a public green, mill, bakery and route node.
- People and roles: Mara as a peddler; Tomas as baker and shopkeeper.
- Inventory: items, quantities, storage descriptions and abstract capacity.
- Conveyance: a handcart with compatible route modes and declared capability needs.
- Routes: explicit origin, destination, access, mode and distance.
- Visits: actor, destination, purpose and route references.
- Setting profile: available baseline capabilities and explicitly unavailable capabilities.

The fixture intentionally avoids inventing prices, currency, exchange outcomes, travel-time estimates or simulated actor behavior.

## Ownership boundaries

| Concern | Owner |
|---|---|
| Place identity, public-space context, route access and visits | Singularity City |
| Currency, prices, valuation, credit and exchange settlement | Economy |
| Terrain, physical route conditions, vehicle motion and travel simulation | Physics |
| Goods, recipes, manufacture and food production | Specialist domains |

City may consume outputs from those owners, but this fixture does not duplicate their systems.

## Validation

Run:

```sh
node tests/commerce-route-fixture.test.mjs
```

The test checks unique identities, resolvable references, role presence, inventory capacity, route endpoints, visit links, and explicit non-simulation status for travel time.

The Pages build invokes this test as a validation gate.

## Status and next steps

**Status: authored fixture + structural relationship test.** This is not a live market, economy, route solver, peddler AI, resident simulation or delivery engine.

Next slices should add a customer/order/delivery lifecycle without taking over Economy's exchange model, then introduce scenario capability exceptions. The time-travelling scooter delivery remains a valid scenario: City should model the arrival place, access, visit and civic consequences while the setting/time-travel rulebooks own the temporal mechanism and its constraints.
