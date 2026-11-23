# Economy in Singularity City

**Status: architecture plus deterministic authored scenario fixture.** The browser currently displays authored City data; it does not execute the .NET ledger or simulate Digiten decisions.

## The goal: a city whose inhabitants make its economy

Singularity City should not display a decorative population counter beside static shops. Its economy should eventually emerge from Digitens earning, producing, purchasing, selling, renting, building, maintaining, traveling and participating in civic institutions.

Economy is the shared economic vocabulary and simulated-value ledger. City owns the place graph, residents, businesses as civic actors, work/home relationships, route and service context, and world-specific schedules. Specialist domains own production, crafting, transport physics and other specialized behavior.

## Package boundary and verified capabilities

The integration is designed around the current TheSingularityWorkshop.Economy API:
- EconomyEntityId identifies economic owners.
- SimulatedCurrency and SimulatedAmount identify typed, non-redeemable in-world currency independently of Money's three-letter code.
- SimulationAccount registers an owner-controlled account for one simulated currency.
- SimulationLedger records explicit Issue, Transfer, Post and Retire operations, derives balances from signed journal entries, and supports idempotent replay for an identical operation identity/request.
- CommerceItem, EconomyShop and MarketplaceOffer describe products, shop composition and offers.
- EconomyTransfer describes intent; it is not evidence of execution.
- EconomicExecutionResult is an observation contract, not a settlement engine.

The ledger is process-local and in-memory. It is not durable, distributed or real-money custody. City must not add a shadow balance counter or imply that a displayed number came from Economy unless an actual ledger run supplied receipt and journal evidence.

## Ownership

| Concern | Owner |
|---|---|
| Digiten identity, residence, workplace, needs, schedule and place relationships | City |
| Business location, civic context, opening/access state and service area | City |
| Currency identity, accounts, journal semantics, explicit simulated issuance/transfer/retirement | Economy |
| Shop/product/offer/transfer vocabulary | Economy |
| Local pricing policy, inventory quantities, production, wages, rent, taxes, demand and consumption rules | City Experience policy plus specialist domains |
| Material/food/component production | Specialist domains |
| Routes and access | City; physical travel/motion belongs to Physics |
| Storefront presentation | City/Experience |

A City business is not automatically a bank account. A Digiten is not automatically a wallet. Create explicit Economy owners and accounts only where the scenario requires them.

## The first closed-books scenario

The deterministic fictional starter scenario is [Civic Quarter market day](../data/economy/civic-quarter-market.json). It declares stable actor/account IDs, City Marks (CM), a small shop and an ordered set of explicit ledger operations. It is intentionally small enough to audit.

The scenario issues 10,000 CM to the civic treasury and explicitly issues startup capital/grants to a bakery, household, construction contractor and market customer. It then records a wage, household purchases, rent, utilities and a municipal construction payment. Every transfer balances. Expected balances are checked against the ordered operation journal by tests, not trusted as source data.

This is a structural reference fixture, not a claim that the .NET SimulationLedger has run in the Pages workflow. The validator mirrors relevant ledger invariants until a .NET City host composes the package.

## The first economic loop to implement

1. A Digiten has a workplace and declared wage policy.
2. The City simulation records a work event.
3. The host requests a wage transfer through Economy with a stable operation ID.
4. The ledger receipt is recorded; repeated delivery of the same operation is idempotent.
5. The household creates a purchase intent against an available shop offer.
6. City policy checks opening state, stock and access; Economy records simulated value movement.
7. Host updates inventory and ownership only after the economic operation succeeds.
8. Buyer/seller journal entries and inventory event share a correlation identity.
9. Failed, unavailable or duplicate attempts create no goods or money.

The first useful end-to-end test closes both sides of the books: balances derive from journal postings, inventory changes once, and each successful purchase has one receipt. Animation is never the authority.

## More than retail

Build capability slices in an observable order:
- households, wages, budgets and necessities;
- shops, services, prices, inventory and market days;
- production, inputs, recipes, labor and business costs;
- land, property, rent, construction and maintenance;
- utilities, transit, freight and public services;
- civic finance, taxation, public goods and procurement;
- credit, banking, investment and financial markets only when their separate models are explicit.

Goods, labor, land, services, energy, access rights and currencies are distinct concepts.

## Construction and transport

Buildings and vehicles participate as assets, workplaces, infrastructure and services. Economy can represent products, shops, prices and simulated flows for materials, components, vehicle purchases, leases, fares, freight, wages and maintenance. City owns where these assets operate and how they relate to parcels, places, routes, residents and institutions. Physics owns physical material properties and vehicle motion.

See [Buildings, Materials and Construction](books/buildings-and-construction.md) and [Vehicles, Mobility and Transport Systems](books/vehicles.md).

## Reality and provenance

A fictional city economy is not a real-world financial system. The scenario identifies its fictional status and non-redeemable currency. A real city's sourcebook may describe historical prices or documented trade, but those are sourced historical observations, not current runtime balances.

All starter values are authored assumptions. They are not estimates of Tacoma prices, wages, costs or demographic behavior.

## Scale and measurement

Increase population only with reproducible tests. Report represented residents vs actively updating residents; households, employers, shops and active offers; ledger operations and journal entries per step; purchase success/failure and stockout rates; wage, spending and operating-flow totals; simulation time, allocations and memory by population tier; deterministic replay and conservation checks.

Economy does not provide the Digiten scheduler, production system, inventory or durable world persistence. Those are explicit integration tasks.

## Next implementation boundary

The next .NET host should reference the Economy package according to the ecosystem's development-branch/package policy, create a typed currency and accounts for selected actors, execute the fixture's operation sequence through SimulationLedger, and export receipts plus journal entries for validation. Do not add a second City-owned ledger. No release or package publication is implied.
