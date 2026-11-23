# Entangled Realities and Digital Real Estate

**Status: architecture proposal grounded in existing Workshop contracts. This is not a claim that persistent multi-user office spaces, leasing, presence, or BIM co-presence are implemented.**

## The product idea

SingularityCorporation is the proposed commercial tenancy and workplace offering inside Singularity City. A company leases a digital property—an office, floor, campus, studio, laboratory, or project space. The lease grants a governed right to configure and use that property; it does not transfer ownership of the City's underlying geography or physical simulation.

The company's digital workplace is an **entangled reality**: a persistent Experience with stable identity, shared state, spatial anchors, and multiple coordinated manifestations. Employees can enter from desktop, browser, or VR, find colleagues in the same rooms, walk to another team's office when permitted, and have spontaneous conversations without scheduling a formal meeting.

"Entangled" here means coordinated shared identity and state, not literal quantum entanglement. MyVR already uses *co-entangled* for simultaneous manifestations of one Experience. This proposal applies that established term to a City-scale network of workplaces.

## What is entangled

A useful first model separates five things:

1. **Place identity** — the City-owned parcel, building, floor, room, circulation route, and world anchors.
2. **Tenant identity** — the company, its lease, delegated administrators, membership, guests, and policies.
3. **Experience identity** — the versioned workplace Experience and its capabilities, independent of a particular device or server.
4. **Session identity** — a live participant's authenticated session, presence, device manifestation, and temporary interaction state.
5. **Shared work identity** — the BIM model, issue, drawing, asset, meeting, or other collaborative artifact being discussed.

These identities must not be collapsed into one user, building, or session record. A person may have several device sessions; a company may lease several properties; a building may host several tenants; and one project may span several companies.

## Proposed composition and runtime flow

```text
Singularity City
  parcel → building → floor → room → world anchor
                  |
                  v
SingularityCorporation tenancy
  lease → tenant policy → membership / guest grants
                  |
                  v
Workplace Experience manifest
  stable BundleId + Version + ContentHash
                  |
                  v
MicroBundleRepository / artifact source
                  |
                  v
FSM_COS composition
  dependency resolution → validation → RuntimeAssembly
                  |
                  v
Host execution and session coordination
  ServerApp roles + host-owned lifecycle
          /             |             \
       AnyApp          WebApp          MyVR
       desktop         browser         immersive
          \             |             /
             same Experience identity
             shared authoritative state
```

FSM_COS composes capabilities and returns a RuntimeAssembly; it does not run the application loop, own network sessions, or render the world. The host and execution layer must own activation, scheduling, lifecycle, transport, persistence, and failure recovery. ServerApp's documented fleet direction provides the appropriate place to evolve independently provisioned identity, client-I/O, private-business, Experience-compute, and rendering roles. ServerApp itself is still in architecture/bootstrap stages; it is not yet a production multiplayer platform.

## What each existing technology contributes

| Existing technology | Reuse in this design | Boundary |
|---|---|---|
| Singularity City | Persistent geography, property identity, parcels, buildings, rooms, routes, city discoverability and leaseable location references | Does not own every tenant's private workplace data |
| MicroBundleDomain + FSM_COS | Declare, resolve, validate and compose workplace capabilities into a RuntimeAssembly | Composition is not execution or session hosting |
| FSM_API | State/context and process-group primitives where the runtime requires them | Do not introduce a second heartbeat or tick |
| FSM_Execution | Host-owned execution workflow and lifecycle handoff | Keep separate from FSM_COS composition |
| ServerApp | Future identity/session gateways, private-business services, persistence-facing roles, Experience compute and capacity placement | Current product is not a production distributed service |
| AnyApp / WebApp / MyVR | Desktop, browser and immersive manifestations of the same Experience | Device clients do not become separate authoritative worlds |
| Renderer | Observer-relative representation, visibility and computational-detail policy | Semantic state must remain available even when visual detail is reduced |
| Visualize | Consume scene snapshots and manifest spatial output, including deterministic SVG inspection | Current MyCity proof is a domain-neutral CPU/SVG fixture, not a live City adapter or GPU renderer |
| Physics | Authoritative physical geometry, collision, spatial constraints and simulation | City and BIM must consume Physics contracts rather than duplicate solvers |
| GUI | Semantic controls, panels, collaboration tools and accessible interaction surfaces | Host owns panel placement, device lifecycle and input routing |
| DataWarehouse | Future high-performance persistence and spatial/temporal data layout where its contracts fit | Do not make it an implicit authority for tenancy or authorization |

Visualize's MyCity block proof is a useful starting point: it uses `VisualizerSceneSnapshot`, `VisualizerFrame`, a resource catalog and `SvgVisualizerBackend`, preserving semantic entity IDs across near/distant representations. It explicitly remains a deterministic CPU/static-SVG proof. Renderer separately documents the observer → policy → frame → Visualize/adapter handoff and is candid that the complete path is not yet one production pipeline. We should leverage these public contracts when building the next vertical slice, not copy their implementations into City.

## Company tenancy and digital real estate

The lease should be a first-class, versioned City/Economy domain record. A conceptual lease needs:

- tenant/company identity and the legal or organizational authority that accepted it;
- property identity and the exact spatial scope (campus, building, floor, rooms, storage, shared areas);
- term, renewal, suspension and termination rules;
- included capabilities and resource/service allowances;
- tenant administrators and delegated authority;
- employee membership, role, guest invitation and revocation policy;
- public, tenant-only, project-shared and private zones;
- data retention, export, deletion and dispute rules;
- audit history and billing/usage evidence.

A lease is not an access-control list by itself. Authentication establishes who is connecting; authorization evaluates tenant membership, property scope, role, purpose, current policy and any cross-company grant. The City may show a discoverable office entrance without exposing private rooms or their contents.

Cross-company collaboration should be explicit and scoped. A project can grant another company's team access to a specific project room, model, issue set or time window without granting access to the rest of the tenant's office. Guests should see only the spatial and semantic content permitted by that grant.

## The impromptu interaction

The defining experience is not a video call pinned to a 3D room. It is a shared place with lightweight social affordances:

- Presence indicates who is available, busy, in a meeting, or intentionally invisible.
- Spatial proximity can make a nearby colleague discoverable, subject to tenant policy and user privacy.
- A person can knock, wave, request entry, or join a public/shared collaboration area.
- Voice and other communication are explicit, permissioned host capabilities; presence must not silently activate a microphone or camera.
- A conversation can become a persistent collaboration artifact: notes, an issue, a model annotation, a task, or a meeting record.
- A user can leave one manifestation and continue in another without creating a second identity or duplicating authoritative work state.

The system must distinguish being physically represented in a room, being online, being available for interruption, and being authorized to enter. Presence is not consent; visibility is not access; access is not permission to record.

## BIM: make the building the collaboration surface

For BIM and AEC, the same entangled reality can present the building in several ways:

- **Model/desktop view:** inspect drawings, schedules, properties, clashes and selected elements.
- **Immersive building view:** place the team inside a navigable representation of the building.
- **Interior walkthrough:** move through rooms, shafts, plant spaces and circulation paths.
- **Exterior/site view:** inspect site context, access, staging, envelope and surrounding infrastructure.
- **Coordination view:** bring multiple disciplines into the same spatial context, with issues and ownership attached to stable model elements.

These are observer-specific views of one coordinated project reality, not independent copies of the BIM model. A selected BIM element should retain a stable semantic identity as it moves between drawing, model, room-scale visualization and issue list.

The authoritative BIM source remains the project/domain system that owns it. City provides the surrounding geography, property, access and spatial entry point. Visualize manifests geometry; Renderer selects an appropriate representation for each observer and workload; Physics provides physical constraints and simulation where required. Coordinate reference systems, units, datum, model revisions, source provenance, permissions and discipline ownership must survive every adapter.

A model can be placed around the user only when its coordinate transform and scale are known. A visually plausible room is not proof of survey accuracy, constructability, code compliance, clash resolution or as-built truth. Keep design intent, coordination state, construction state and verified as-built evidence distinguishable.

## The first proof worth building

Do not start with a city full of avatars or a distributed simulation. Prove one tenant, one leased property, two employees, and one shared room.

1. Create a tenant and a lease against one existing City building/floor/room anchor.
2. Resolve two authorized employee identities into two independent sessions.
3. Join both sessions to the same Experience identity and room.
4. Publish presence and one shared spatial anchor with clear ownership and revision.
5. Let one user change a harmless shared artifact (for example, a pinned note or selected BIM element) and verify the other manifestation observes the same revision.
6. Move one user from desktop to MyVR while preserving Experience identity and shared state.
7. Deny an uninvited user and verify no private room content leaks through map, presence, Renderer semantics or Visualize output.

The first proof can use a deterministic local host and test identities. It must not pretend to prove internet-scale networking, production authentication, durable tenancy billing, voice, or production VR tracking.

## Open contracts before production

- Canonical organization, employee, guest and service identity; authentication issuer and token audience.
- Tenant, lease, property, room and project authorization model.
- Session lifecycle, presence expiry, reconnect, device handoff and concurrent-session semantics.
- Authoritative state ownership, revisions, conflict handling and persistence.
- Spatial coordinate frames, units, transforms, streaming boundaries and cross-host handoff.
- Voice/video consent, recording policy, accessibility and moderation.
- BIM connector contracts, model revision identity, issue/element identity and source permissions.
- ServerApp deployment, isolation, observability, backup, recovery and measured capacity.
- Data retention, tenant export, deletion, audit and billing.

No guessed interfaces should be added to FSM_COS, Renderer, Visualize, MyVR or ServerApp to bridge these gaps. Establish the owning contract, then build a narrow adapter and executable evidence.

## Evidence and references

- [Singularity City architecture](ARCHITECTURE.md)
- [Reality sets and reconstruction provenance](REALITY_AND_RECONSTRUCTION.md)
- [MyVR Experience Manifestation](https://github.com/TrentBest/TheSingularityWorkshop.MyVR/blob/development/docs/EXPERIENCE_MANIFESTATION.md) — same Experience identity across WebApp, AnyApp and MyVR; defines co-entanglement as coordinated manifestations, not literal quantum entanglement.
- [ServerApp architecture](https://github.com/TrentBest/TheSingularityWorkshop.ServerApp/blob/development/docs/ARCHITECTURE.md) — intended server fleet and role boundaries; explicitly still bootstrap-stage.
- [FSM_COS](https://github.com/TrentBest/TheSingularityWorkshop.FSM_COS) — composition and RuntimeAssembly boundary.
- [Visualize MyCity block proof](https://github.com/TrentBest/TheSingularityWorkshop.Visualize/tree/development/samples/MyCityBlockProof) — deterministic scene snapshot and CPU/SVG presentation proof.
- [Renderer presentation handoff](https://github.com/TrentBest/TheSingularityWorkshop.Renderer/blob/development/docs/PRESENTATION_HANDOFF.md) — observer, representation and frame boundary.
