import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { generateParcels } from "../assets/js/city-generator.mjs";
const json=p=>JSON.parse(readFileSync(p,"utf8"));
const catalog=json("data/places.json"), blueprint=json("data/city-blueprint.json"), schema=json("schemas/city-blueprint.schema.json"), researchSchema=json("schemas/source-observation.schema.json"), systems=json("data/city-systems.json"), systemsSchema=json("schemas/city-systems.schema.json");
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
