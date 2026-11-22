import { generateParcels } from "./city-generator.mjs";
const catalogUrl = new URL("../../data/places.json", import.meta.url);
const blueprintUrl = new URL("../../data/city-blueprint.json", import.meta.url);
const svgNamespace = "http://www.w3.org/2000/svg";
const dialog = document.querySelector("#entry-dialog");
let places = new Map();
let selected = null;

const byId = id => places.get(id);
const text = (selector, value) => { const node=document.querySelector(selector); if(node) node.textContent=value ?? ""; };
const svg = (name, attributes={}) => {
  const node=document.createElementNS(svgNamespace,name);
  for(const [key,value] of Object.entries(attributes)) node.setAttribute(key,String(value));
  return node;
};
function renderBlueprint(blueprint) {
  const districts=document.querySelector("#district-layer");
  const parcels=document.querySelector("#parcel-layer");
  const routes=document.querySelector("#route-layer");
  const labels=document.querySelector("#district-labels");
  for(const layer of [districts,parcels,routes,labels]) layer?.replaceChildren();
  const allParcels=[];
  for(const district of blueprint.districts) {
    const polygon=svg("polygon",{points:district.polygon.map(point=>point.join(",")).join(" "),class:"district-shape "+district.className,"data-district":district.id});
    districts?.append(polygon);
    const center=district.polygon.reduce((sum,point)=>[sum[0]+point[0]/district.polygon.length,sum[1]+point[1]/district.polygon.length],[0,0]);
    const label=svg("text",{x:center[0],y:center[1],class:"map-label","text-anchor":"middle"});
    label.textContent=district.name.toUpperCase();
    labels?.append(label);
    for(const parcel of generateParcels(district,blueprint.generation.seed)) {
      allParcels.push(parcel);
      parcels?.append(svg("rect",{x:parcel.x,y:parcel.y,width:parcel.width,height:parcel.height,rx:2,class:"generated-parcel","data-parcel":parcel.id}));
    }
  }
  for(const route of blueprint.routes) {
    const path=svg("polyline",{points:route.points.map(point=>point.join(",")).join(" "),class:"generated-route route-"+route.kind,"data-route":route.id});
    routes?.append(path);
  }
  text("#map-generation","BLUEPRINT "+blueprint.schema.toUpperCase()+" · SEED "+blueprint.generation.seed+" · "+allParcels.length+" GENERATED PARCELS");
}
function renderMarkers(items) {
  const layer=document.querySelector("#place-markers");
  if(!layer) return;
  layer.replaceChildren();
  for(const p of items) {
    const g=svg("g",{class:"map-point","data-place":p.id,tabindex:"0",role:"button","aria-label":p.title});
    if(p.id==="underworks") g.classList.add("featured");
    g.append(svg("circle",{cx:p.coordinates.x,cy:p.coordinates.y,r:p.id==="underworks"?25:23}));
    const label=svg("text",{x:p.coordinates.x,y:p.coordinates.y+5});
    label.textContent=p.code;
    g.append(label);
    g.addEventListener("click",()=>selectPlace(p.id));
    g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectPlace(p.id);}});
    layer.append(g);
  }
}
function renderCards(items) {
  const grid=document.querySelector("#destinations");
  if(!grid) return;
  grid.replaceChildren();
  for(const p of items) {
    const button=document.createElement("button");
    button.type="button"; button.className="destination-card"+(p.id==="underworks"?" featured-card":"");
    button.dataset.place=p.id;
    for(const [cls,value] of [["card-number",p.code+" / "+p.type.split(" / ")[0]],["card-symbol",p.icon]]) {
      const span=document.createElement("span"); span.className=cls; span.textContent=value; button.append(span);
    }
    const title=document.createElement("strong"); title.textContent=p.title; button.append(title);
    const description=document.createElement("span"); description.textContent=p.description; button.append(description);
    const action=document.createElement("b"); action.textContent="Inspect place ↗"; button.append(action);
    button.addEventListener("click",()=>selectPlace(p.id)); grid.append(button);
  }
}
function renderProvenance(p) {
  text("#source-repository",p.owner.repository);
  text("#source-path",p.owner.path);
  text("#source-status",p.status);
  text("#source-capabilities",p.capabilities.join(" · "));
  const link=document.querySelector("#source-link");
  if(link) link.href="https://github.com/"+p.owner.repository+"/blob/development/"+p.owner.path;
  text("#source-manifest","data/places.json · "+p.id);
}
function selectPlace(id) {
  const p=byId(id); if(!p)return; selected=id;
  text("#place-icon",p.icon); text("#place-type",p.type); text("#place-title",p.title);
  text("#place-description",p.description); text("#place-access",p.access);
  text("#place-domain",p.domain); text("#entry-title",p.entry);
  text("#entry-description",p.detail); text("#entry-action",p.action+"  ↗");
  renderProvenance(p);
  document.querySelectorAll("[data-place]").forEach(n=>n.classList.toggle("selected",n.dataset.place===id));
}
async function start() {
  const [catalogResponse,blueprintResponse]=await Promise.all([fetch(catalogUrl),fetch(blueprintUrl)]);
  if(!catalogResponse.ok) throw new Error("City catalog unavailable: "+catalogResponse.status);
  if(!blueprintResponse.ok) throw new Error("City blueprint unavailable: "+blueprintResponse.status);
  const [catalog,blueprint]=await Promise.all([catalogResponse.json(),blueprintResponse.json()]);
  if(catalog.schema!=="singularity-city.catalog.v1"||!Array.isArray(catalog.places)) throw new Error("Unsupported City catalog schema");
  if(blueprint.schema!=="singularity-city.blueprint.v1"||blueprint.cityId!==catalog.city.id) throw new Error("Unsupported or mismatched City blueprint");
  places=new Map(catalog.places.map(p=>[p.id,p]));
  renderBlueprint(blueprint); renderMarkers(catalog.places); renderCards(catalog.places);
  selectPlace("underworks");
}
document.querySelector("#entry-action").addEventListener("click",()=>{
  const p=byId(selected); if(!p)return;
  text("#dialog-title",p.entry); text("#dialog-copy",p.detail); dialog.showModal();
});
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
document.querySelector(".dialog-confirm").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
start().catch(error=>{console.error(error);text("#place-title","City data unavailable");text("#place-description",error.message);});
