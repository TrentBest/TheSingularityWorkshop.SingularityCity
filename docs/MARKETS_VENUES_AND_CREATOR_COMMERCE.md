# Markets, Venues, and Creator Commerce

**Status: product architecture and first proof plan.** This document connects Singularity City's places and events to the existing Economy domain. It does not claim that hosted storefronts, ticketing, real-money checkout, concert operations, or a live marketplace are implemented.

## The city should be a place to participate

A useful digital city has reasons to visit:

- browse independent shops, maker stalls, galleries and pop-up booths;
- discover markets, conventions, concerts, performances, classes and community events;
- meet creators and businesses in their own spaces;
- attend a live event with other visitors rather than merely view an event listing;
- move from discovery to a shop, venue, workshop or shared experience without losing place identity.

Commerce and culture should be visible parts of the city, not disconnected web pages attached to a 3D map.

## The creator-first storefront

The opportunity is to remove the friction between having something to sell and having a place to sell it. A creator should be able to start with a simple shop and grow it into a booth, kiosk, studio, gallery, permanent storefront or multi-room business.

The intended onboarding path is deliberately short:

1. **Create a shop** — name, creator identity, short description and a starting presentation.
2. **Add products** — add one item at a time, import a catalog, or link an existing provider catalog where a connector is available.
3. **Choose a place** — start online, claim a market stall, rent a booth, or lease a permanent City property.
4. **Arrange the space** — choose a template, place product displays, set signage and preview the result.
5. **Publish** — make the shop discoverable in the City directory and through its shareable web presence.
6. **Grow** — add rooms, staff, events, promotions, additional locations and richer immersive presentation as needed.

The default should be a usable shop in minutes, not a 3D design project. Templates and sensible defaults make the first publication easy; deeper spatial customization remains optional. A seller should not have to understand BIM, 3D modeling, payment APIs or the Workshop package graph to open a stall.

A canonical creator shop and catalog should survive changes in presentation and placement. The same shop can appear as a compact web listing, a 2D shop page, a market stall, a desktop storefront or an immersive VR space without creating duplicate seller or product identities.

## Economy is the commerce vocabulary—not the whole marketplace

The existing `TheSingularityWorkshop.Economy` package already provides reusable concepts including `EconomyShop`, `CommerceItem`, `MarketplaceOffer`, `Money`, transfer intent, execution observations and a process-local fictional-currency simulation ledger. Its creator-shop composition proof demonstrates that one canonical shop and product identity can be referenced by two consumer-owned placements with different presentation skins.

Use those existing contracts rather than inventing a City-specific duplicate:

| Responsibility | Owner |
|---|---|
| Canonical shop, seller and product vocabulary; offer and price descriptions | Economy |
| Creator profile, authentication, ownership verification and staff identity | Host / optional Profiles integration |
| Catalog editing, media, layout templates and publishing workflow | Creator-facing application / WebPage |
| Shop placement, parcel/building/booth identity, discoverability and navigation | Singularity City |
| Lease, rent, property scope and civic land-use rules | City property domain, with Economy describing any exchange |
| Stock, availability, order acceptance, fulfillment, shipping, returns and customer support | Explicit shop/marketplace application capabilities; not implied by Economy primitives |
| Real payment, tax, payouts, refunds and reconciliation | Separate provider-backed capability with operational and professional review |
| In-world fictional currency and simulated trade | Experience policy using Economy simulation primitives |

Economy intentionally does not supply a production storefront, persistent catalog hosting, inventory, checkout, durable distributed ledger or payment processor. The first City market should therefore be an honest catalog-and-placement experience, with clear external purchase links or simulated in-world exchange where appropriate—not a pretend checkout.

Provider catalog connectors can be optional import paths. They should preserve stable Workshop identities and declared capabilities; a catalog read must never be treated as permission to purchase, reserve stock or mutate a provider account.

## Markets and venues are City places

City owns the spatial and civic side of commerce and events:

- market districts, public squares, indoor halls, streets and temporary event zones;
- permanent storefront parcels and leaseable commercial units;
- booths, stalls, kiosks, galleries and pop-up placements;
- venue identity, entrances, circulation, accessibility and wayfinding;
- event calendars, schedules, stage/room assignments and visitor discovery;
- visitor routes and the relationship between an event, its venue and its participating sellers.

A market is not just a list of sellers. It is a place with an arrangement, opening schedule, foot traffic, neighboring stalls, public services and a reason to explore.

A concert venue is not just a ticket product. It is a spatial destination with a program, performers, capacity, access rules, stage and audience zones, sound/visual production and event lifecycle. Economy may describe offers and exchange associated with the event; City and the event experience own venue and attendance semantics. A ticket must eventually be a verifiable admission entitlement, not merely a `CommerceItem` or a successful payment observation.

## A venue can be both a digital destination and a working model

The Seattle Convention Center electrical construction model is a strong example of why venue representation matters. A convention center can be represented as a coordinated building with systems and spaces that people can inspect, navigate and work within—not only as an exterior landmark.

The same spatial foundation can support two distinct fidelity modes:

- **Visitor mode:** find an entrance, browse exhibitors, navigate halls, visit booths, attend sessions and concerts, and meet people.
- **Project mode:** inspect building systems, electrical layouts, equipment, routes, penetrations, clearances and coordination issues against stable model elements and revisions.

These modes can share the building's place identity while keeping their authorities distinct. The authoritative BIM/project system owns design and construction data; City owns the venue's spatial presence and visitor-facing organization; Visualize manifests geometry; Renderer selects observer-appropriate representation; Physics owns physical constraints and simulation where needed. Preserve coordinate systems, units, datum, element identity, revision, source provenance and permissions. A visually convincing venue must not imply surveyed accuracy, code compliance or as-built verification.

This is a natural bridge between commerce, culture and AEC: the same venue can host a convention today and remain a coordinated project space for the teams maintaining or renovating it.

## Events and commerce should compose, not collapse

A concert or convention can compose several independent capabilities:

- event program and schedule;
- venue and room allocation;
- performer, exhibitor and organizer identities;
- attendance entitlement and check-in;
- optional merchandise shops and creator booths;
- accessible routes and visitor services;
- shared social spaces and permitted presence;
- optional paid services or provider-backed transactions.

Do not hardwire every event into Economy, and do not make City a payment processor. A free public lecture should work without payment capability. A fictional festival can use simulated currency. A real ticketed concert requires a separately defined admission and payment workflow, including refunds, capacity reservation, fraud handling and reconciliation.

## First vertical slice

Prove the seller workflow before building a full marketplace:

1. One creator creates a shop with a stable identity.
2. The creator adds three catalog items through a simple form.
3. The shop is placed in one City market as a booth.
4. The same canonical shop is presented in a web listing and a spatial booth without duplicating its identity.
5. A visitor discovers the market, opens the booth and inspects an item.
6. The visitor can follow an explicitly external purchase link or, in a separate deterministic fixture, complete a fictional-currency simulated exchange.
7. Tests verify identity preservation, placement independence, and that catalog publication does not imply inventory reservation or payment.

Then add a venue/event slice: one venue, one scheduled event, one stage or hall, a discoverable program, and a clear distinction between free attendance, invitation, and any future ticket entitlement.

## Adoption principles

- **Start small:** a shop must be publishable without building a 3D environment.
- **Bring your catalog:** manual entry first; optional imports and provider connectors later.
- **Own your identity:** stable seller and product identities; export and portability should be design requirements.
- **One shop, many surfaces:** web, desktop, City booth, venue kiosk and VR should be presentations of the same canonical shop.
- **No forced payment provider:** discovery and simulated commerce should work independently.
- **Transparent economics:** make fees, rent, promotion and any platform share visible before commitment.
- **Creator control:** creators manage their catalog, brand, placements and staff permissions.
- **Trust before scale:** ownership verification, moderation, fraud prevention, dispute handling, consumer protection and privacy must be designed before production transactions.

## Evidence and existing foundations

- [Economy repository](https://github.com/TrentBest/TheSingularityWorkshop.Economy)
- [Simulated economies and creator commerce](https://github.com/TrentBest/TheSingularityWorkshop.Economy/blob/development/docs/SIMULATED_ECONOMIES_AND_CREATOR_COMMERCE.md)
- [Economy architecture](https://github.com/TrentBest/TheSingularityWorkshop.Economy/blob/development/docs/ARCHITECTURE.md)
- [Creator shop composition gallery](https://github.com/TrentBest/TheSingularityWorkshop.Economy/blob/development/docs/GALLERY.md)
- [Shop connectors](https://github.com/TrentBest/TheSingularityWorkshop.Economy/blob/development/docs/SHOP_CONNECTORS.md)
- [Singularity City economy integration](ECONOMY_IN_SINGULARITY_CITY.md)
- [City architecture](ARCHITECTURE.md)

The Economy composition proof is source-backed. The end-user editor, hosted marketplace, venue booking, ticketing and payment flows remain proposed work and need executable evidence before being presented as available.
