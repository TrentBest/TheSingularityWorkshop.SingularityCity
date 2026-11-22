import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
const json=p=>JSON.parse(readFileSync(p,"utf8"));
const catalog=json("data/places.json"), blueprint=json("data/city-blueprint.json"), schema=json("schemas/city-blueprint.schema.json");
assert.equal(catalog.schema,"singularity-city.catalog.v1");
assert.ok(catalog.city?.id && Array.isArray(catalog.places) && catalog.places.length);
assert.equal(blueprint.schema,"singularity-city.blueprint.v1");
assert.equal(blueprint.cityId,catalog.city.id);
assert.equal(schema.properties.schema.const,blueprint.schema);
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
function parcelsFor(d,seed){
 const g=d.parcelGrid;let h=2166136261;
 for(const c of d.id)h=Math.imul(h^c.charCodeAt(0),16777619)>>>0;
 let state=(seed^h)>>>0;
 const rand=()=>{state=(state+0x6D2B79F5)>>>0;let t=state;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296;};
 const a=[];for(let y=0;y<g.rows;y++)for(let x=0;x<g.columns;x++){if(rand()>g.occupancy)continue;const inset=2+rand()*3;a.push({id:`${d.id}-${y}-${x}`,x:g.origin[0]+x*(g.width+g.gap)+inset,y:g.origin[1]+y*(g.height+g.gap)+inset,width:g.width-inset*2,height:g.height-inset*2});}return a;
}
const districtIds=new Set();let parcelCount=0;
for(const d of blueprint.districts){
 assert.ok(d.id&&!districtIds.has(d.id),`duplicate district: ${d.id}`);districtIds.add(d.id);
 assert.ok(d.polygon.length>=3&&d.parcelGrid.columns>0&&d.parcelGrid.rows>0);
 assert.ok(d.parcelGrid.occupancy>=0&&d.parcelGrid.occupancy<=1);
 const a=parcelsFor(d,blueprint.generation.seed),b=parcelsFor(d,blueprint.generation.seed);
 assert.deepEqual(a,b,`${d.id} parcel generation is not deterministic`);
 assert.ok(a.every(p=>p.width>0&&p.height>0));parcelCount+=a.length;
}
assert.ok(parcelCount>=20,`expected at least 20 parcels, got ${parcelCount}`);
const routeIds=new Set();for(const r of blueprint.routes){assert.ok(r.id&&!routeIds.has(r.id));routeIds.add(r.id);assert.ok(r.points.length>=2);}
const html=readFileSync("index.html","utf8"),js=readFileSync("assets/js/city.js","utf8");
for(const id of ["place-markers","district-layer","parcel-layer","route-layer"])assert.ok(html.includes(`id="${id}"`),`missing SVG layer ${id}`);
assert.match(html,/id="source-repository"/);assert.match(html,/docs\/BUILD_YOUR_CITY\.md/);
assert.match(js,/data\/places\.json/);assert.match(js,/data\/city-blueprint\.json/);assert.match(js,/generateParcels/);assert.match(js,/renderBlueprint/);
console.log(`Validated ${catalog.places.length} places, ${blueprint.districts.length} districts, ${parcelCount} deterministic parcels and ${blueprint.routes.length} routes.`);
