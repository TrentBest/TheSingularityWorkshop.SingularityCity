import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { generateParcels } from "../assets/js/city-generator.mjs";
const json=p=>JSON.parse(readFileSync(p,"utf8"));
const catalog=json("data/places.json"), blueprint=json("data/city-blueprint.json"), schema=json("schemas/city-blueprint.schema.json"), researchSchema=json("schemas/source-observation.schema.json"), systems=json("data/city-systems.json"), systemsSchema=json("schemas/city-systems.schema.json"), district=json("data/districts/civic-quarter.json"), districtSchema=json("schemas/civic-district.schema.json");
assert.equal(catalog.schema,"singularity-city.catalog.v1");
assert.ok(catalog.city?.id && Array.isArray(catalog.places) && catalog.places.length);
assert.equal(blueprint.schema,"singularity-city.blueprint.v1");
assert.equal(blueprint.cityId,catalog.city.id);
assert.equal(schema.properties.schema.const,blueprint.schema);
assert.equal(researchSchema.properties.schema.const,"singularity-city.source-observation.v1");
assert.equal(systems.schema,"singularity-city.systems.v1");
assert.equal(systems.cityId,catalog.city.id);
assert.equal(systemsSchema.properties.schema.const,systems.schema);
assert.ok(systems.systems.length>=10,"city systems catalog must cover a broad domain");
const systemIds=new Set();
for(const system of systems.systems){
 assert.ok(system.id&&!systemIds.has(system.id),`duplicate city system: ${system.id}`);systemIds.add(system.id);
 assert.ok(system.title&&system.domain&&system.summary&&system.components.length&&system.measures.length&&system.theoryAnchor);
 assert.ok(["concept","preview","contract","implemented"].includes(system.status));
}
assert.ok(researchSchema.required.includes("source")&&researchSchema.required.includes("evidence")&&researchSchema.required.includes("blueprintMappings"));
assert.equal(blueprint.coordinateSpace.width,900); assert.equal(blueprint.coordinateSpace.height,590);
assert.equal(blueprint.generation.algorithm,"grid-parcels.v1");
const placeIds=new Set();
for(const p of catalog.places){
 assert.ok(p.id&&!placeIds.has(p.id),`duplicate place: ${p.id}`);placeIds.add(p.id);
 assert.ok(p.title&&p.description&&p.owner?.repository&&p.owner?.path);
 assert.ok(Number.isFinite(p.coordinates?.x)&&Number.isFinite(p.coordinates?.y));
 assert.ok(p.coordinates.x>=0&&p.coordinates.x<=900&&p.coordinates.y>=0&&p.coordinates.y<=590);
 assert.ok(Array.isArray(p.capabilities));
 if(p.owner.repository==="TrentBest/TheSingularityWorkshop.SingularityCity")assert.ok(existsSync(p.owner.path),p.owner.path);
}
const districtIds=new Set();let parcelCount=0;
for(const d of blueprint.districts){
 assert.ok(d.id&&!districtIds.has(d.id),`duplicate district: ${d.id}`);districtIds.add(d.id);
 assert.ok(d.polygon.length>=3&&d.parcelGrid.columns>0&&d.parcelGrid.rows>0);
 assert.ok(d.parcelGrid.occupancy>=0&&d.parcelGrid.occupancy<=1);
 const a=generateParcels(d,blueprint.generation.seed),b=generateParcels(d,blueprint.generation.seed);
 assert.deepEqual(a,b,`${d.id} parcel generation is not deterministic`);
 assert.ok(a.every(p=>p.width>0&&p.height>0));parcelCount+=a.length;
}
assert.ok(parcelCount>=20,`expected at least 20 parcels, got ${parcelCount}`);
const routeIds=new Set();for(const r of blueprint.routes){assert.ok(r.id&&!routeIds.has(r.id));routeIds.add(r.id);assert.ok(r.points.length>=2);}
const html=readFileSync("index.html","utf8"),js=readFileSync("assets/js/city.js","utf8"),generator=readFileSync("assets/js/city-generator.mjs","utf8");
assert.match(html,/id="city-systems"/);assert.ok(js.includes("city-systems.json"));assert.ok(js.includes("function renderSystems"));
assert.ok(existsSync("assets/images/living-city-atlas.svg"),"living city atlas image missing");
assert.ok(existsSync("docs/LIVING_PICTURE.md"),"living picture guide missing");
assert.ok(existsSync("docs/CIVIL_SYSTEMS_AND_CITY_THEORY.md"),"civil systems theory atlas missing");
const atlas=readFileSync("assets/images/living-city-atlas.svg","utf8");
assert.ok(atlas.startsWith("<svg")&&atlas.includes("<title")&&atlas.includes("<desc"),"atlas SVG must have accessible title and description");
const theory=readFileSync("docs/CIVIL_SYSTEMS_AND_CITY_THEORY.md","utf8");
for(const domain of ["Geography","Architecture","Civil and municipal infrastructure","Urban planning","Transportation","Water, energy","Ecology","People, households","Institutions","Economy","Culture","Risk, resilience","Commons theory","Environmental justice"])assert.ok(theory.includes(domain),`missing city domain/theory: ${domain}`);

for(const id of ["place-markers","district-layer","parcel-layer","route-layer"])assert.ok(html.includes(`id="${id}"`),`missing SVG layer ${id}`);
assert.match(html,/id="source-repository"/);assert.match(html,/docs\/BUILD_YOUR_CITY\.md/);
assert.match(js,/data\/places\.json/);assert.match(js,/data\/city-blueprint\.json/);assert.match(js,/city-generator\.mjs/);assert.match(generator,/export function generateParcels/);assert.match(js,/renderBlueprint/);assert.match(js,/inspectParcel/);
console.log(`Validated ${catalog.places.length} places, ${blueprint.districts.length} districts, ${systems.systems.length} city systems, ${parcelCount} deterministic parcels and ${blueprint.routes.length} routes.`);

assert.equal(district.schema,"singularity-city.district-model.v1");
assert.equal(district.cityId,catalog.city.id);
assert.equal(districtSchema.properties.schema.const,district.schema);
assert.equal(district.district.id,"civic");
assert.equal(district.provenance.kind,"synthetic-authored-fixture");
const unique=(items,label)=>{const ids=new Set();for(const item of items){assert.ok(item.id&&!ids.has(item.id),`duplicate ${label} id: ${item.id}`);ids.add(item.id);}return ids;};
const parcelIds=unique(district.parcels,"parcel"),buildingIds=unique(district.buildings,"building"),roomIds=unique(district.buildings.flatMap(b=>b.rooms),"room");
const institutionIds=unique(district.institutions,"institution"),serviceIds=unique(district.services,"service");
for(const parcel of district.parcels)for(const id of parcel.buildingIds)assert.ok(buildingIds.has(id),`parcel ${parcel.id} references missing building ${id}`);
for(const building of district.buildings){assert.ok(parcelIds.has(building.parcelId),`building ${building.id} references missing parcel`);assert.ok(district.parcels.find(p=>p.id===building.parcelId).buildingIds.includes(building.id));for(const room of building.rooms)assert.ok(room.floor>=1&&room.floor<=building.floors);}
const checkNetwork=(network,label)=>{const nodes=unique(network.nodes,label+" node");for(const edge of network.edges){assert.ok(nodes.has(edge.from),`${label} edge ${edge.id} missing from node`);assert.ok(nodes.has(edge.to),`${label} edge ${edge.id} missing to node`);assert.notEqual(edge.from,edge.to);}};
checkNetwork(district.mobility,"mobility");checkNetwork(district.water,"water");checkNetwork(district.energy,"energy");
const adjacency=new Map(district.mobility.nodes.map(n=>[n.id,[]]));
for(const edge of district.mobility.edges){adjacency.get(edge.from).push(edge.to);adjacency.get(edge.to).push(edge.from);}
const visited=new Set(),queue=[district.mobility.nodes[0].id];while(queue.length){const id=queue.shift();if(visited.has(id))continue;visited.add(id);queue.push(...adjacency.get(id).filter(next=>!visited.has(next)));}
assert.equal(visited.size,district.mobility.nodes.length,"mobility graph must be connected");
const mobilityNodeIds=new Set(district.mobility.nodes.map(n=>n.id));
for(const stop of district.transit.stops)assert.ok(mobilityNodeIds.has(stop.nodeId),`transit stop ${stop.id} references missing mobility node`);
for(const route of district.transit.routes)for(const stopId of route.stopIds)assert.ok(district.transit.stops.some(s=>s.id===stopId),`transit route references missing stop ${stopId}`);
for(const institution of district.institutions)for(const serviceId of institution.serviceIds)assert.ok(serviceIds.has(serviceId));
for(const service of district.services){assert.ok(institutionIds.has(service.institutionId));assert.ok(buildingIds.has(service.placeId));assert.ok(district.institutions.find(i=>i.id===service.institutionId).serviceIds.includes(service.id));}
for(const space of district.publicRealm.spaces)assert.ok(parcelIds.has(space.parcelId));
assert.equal(district.scenario.proposal.treeCanopyPercent-district.scenario.baseline.treeCanopyPercent,district.scenario.outputs.canopyChangePercentagePoints);
assert.ok(Math.abs((district.scenario.proposal.summerSurfaceTemperatureC-district.scenario.baseline.summerSurfaceTemperatureC)-district.scenario.outputs.surfaceTemperatureChangeC)<1e-9,"scenario temperature delta must reconcile");
assert.equal(Math.round((district.scenario.proposal.stormwaterRunoffIndex/district.scenario.baseline.stormwaterRunoffIndex-1)*100),district.scenario.outputs.runoffIndexChangePercent);
assert.ok(district.provenance.limitations.length>=3);
assert.ok(district.population.kind==="synthetic-aggregate");
const districtHtml=readFileSync("index.html","utf8");
for(const id of ["connected-district","district-metrics","district-streets","district-parcels","district-buildings","district-networks","district-stops","district-inspector-title","district-entities"])assert.ok(districtHtml.includes(`id="${id}"`),`missing district projection target ${id}`);
assert.ok(js.includes("districts/civic-quarter.json"));
assert.ok(js.includes("renderConnectedDistrict")&&js.includes("inspectDistrictEntity"));
assert.ok(existsSync("docs/CIVIC_QUARTER_VERTICAL_SLICE.md"));
console.log(`Validated connected Civic Quarter: ${district.parcels.length} parcels, ${district.buildings.length} buildings, ${roomIds.size} rooms, ${district.mobility.nodes.length} connected mobility nodes, ${district.water.edges.length} water links, ${district.energy.edges.length} energy links, ${district.services.length} civic services.`);
