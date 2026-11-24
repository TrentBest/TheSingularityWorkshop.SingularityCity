const $=s=>document.querySelector(s);
const svgNS="http://www.w3.org/2000/svg";
const [pavilion,economy]=await Promise.all([
 fetch("data/mall-pavilion.json").then(r=>{if(!r.ok)throw new Error("Pavilion data unavailable");return r.json()}),
 fetch("data/economy/civic-quarter-market.json").then(r=>{if(!r.ok)throw new Error("Economy fixture unavailable");return r.json()})
]);
const shops=new Map((economy.shops||[]).map(shop=>[shop.id,shop]));
const zones=new Map(pavilion.architecture.zones.map(zone=>[zone.id,zone]));
const zoneGrid=$("#zone-grid"),storeGrid=$("#storefronts"),floorPlan=$("#mall-floor-plan");
let selectedZone="grand-atrium",selectedShop=null;
const svg=(name,attrs={})=>{const node=document.createElementNS(svgNS,name);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));return node;};
function renderFloorPlan(){
 if(!floorPlan||!pavilion.architecture.levelDefinitions)return;
 floorPlan.replaceChildren();
 const title=svg("title",{id:"mall-floor-title"});title.textContent="Singularity Mall floor plans";
 const description=svg("desc",{id:"mall-floor-description"});description.textContent="Selectable rooms, public circulation routes, a public entrance, stairs and a conceptual accessible lift connection.";
 floorPlan.append(title,description);
 for(const level of pavilion.architecture.levelDefinitions){
  const group=svg("g",{transform:"translate(0 "+level.offsetY+")","data-level":level.id});
  const bg=svg("rect",{x:8,y:8,width:704,height:365,rx:14,class:"floor-background"});
  const heading=svg("text",{x:24,y:34,class:"floor-heading"});heading.textContent=level.name.toUpperCase()+" · CONCEPTUAL PLAN";
  group.append(bg,heading);
  for(const route of pavilion.architecture.circulation.routes.filter(item=>item.levelId===level.id)){
   const line=svg("polyline",{points:route.points.map(point=>point.join(",")).join(" "),class:"mall-route"+(route.accessibilityIntent==="intended-accessible"?" accessible":""),"data-route":route.id,"aria-label":route.mode+" "+(route.accessibilityIntent==="intended-accessible"?"intended accessible · not audited":"")});
   group.append(line);
  }
  for(const zone of pavilion.architecture.zones.filter(item=>item.plan?.levelId===level.id)){
   const p=zone.plan,room=svg("g",{class:"mall-room","data-zone":zone.id,role:"button",tabindex:"0","aria-label":"Inspect "+zone.name,"aria-pressed":"false"});
   room.append(svg("rect",{x:p.x,y:p.y,width:p.width,height:p.height,rx:8,class:"mall-room-shape","data-kind":zone.kind}));
   const label=svg("text",{x:p.x+p.width/2,y:p.y+p.height/2-2,class:"mall-room-label","text-anchor":"middle"});label.textContent=zone.name.toUpperCase();
   const kind=svg("text",{x:p.x+p.width/2,y:p.y+p.height/2+17,class:"mall-room-kind","text-anchor":"middle"});kind.textContent=zone.kind.toUpperCase()+" · "+zone.id;
   room.append(label,kind);
   room.addEventListener("click",()=>inspectZone(zone.id));
   room.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();inspectZone(zone.id);}});
   group.append(room);
  }
  for(const node of pavilion.architecture.circulation.nodes.filter(item=>item.levelId===level.id)){
   const core=node.kind==="entrance"?svg("circle",{cx:node.x,cy:node.y,r:9,class:"mall-entry-node"}):svg("rect",{x:node.x-10,y:node.y-10,width:20,height:20,rx:3,class:"mall-core-node "+node.kind});
   const label=svg("text",{x:node.x,y:node.y-16,class:"mall-core-label","text-anchor":"middle"});label.textContent=node.kind==="lift"?(node.levelId==="ground"?"LIFT ↑":"LIFT ↓"):node.kind==="stair"?(node.levelId==="ground"?"STAIR ↑":"STAIR ↓"):"ENTRY";
   group.append(core,label);
  }
  const levelNote=svg("text",{x:24,y:355,class:"floor-note"});levelNote.textContent=level.description.toUpperCase();group.append(levelNote);
  floorPlan.append(group);
 }
}
function inspectZone(id){
 const zone=zones.get(id);if(!zone)return;selectedZone=id;
 const related=pavilion.storefronts.filter(shop=>shop.zoneId===id);
 $("#zone-kind").textContent=zone.kind.toUpperCase()+" SPACE";
 $("#zone-name").textContent=zone.name;$("#zone-description").textContent=zone.description;
 $("#zone-id").textContent=zone.id;$("#zone-shops").textContent=related.length?related.map(s=>s.name).join(" · "):"No storefronts assigned";
 zoneGrid.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.zone===id)));
 floorPlan.querySelectorAll("[data-zone]").forEach(node=>node.setAttribute("aria-pressed",String(node.dataset.zone===id)));
}
renderFloorPlan();
for(const zone of pavilion.architecture.zones){
 const button=document.createElement("button");button.type="button";button.className="zone-card";button.dataset.zone=zone.id;button.dataset.kind=zone.kind;button.setAttribute("aria-pressed","false");
 const level=pavilion.architecture.levelDefinitions.find(item=>item.id===zone.plan?.levelId);
 const type=document.createElement("small");type.textContent=zone.kind.toUpperCase()+" · "+(level?.name||"LEVEL UNSPECIFIED").toUpperCase();
 const name=document.createElement("strong");name.textContent=zone.name;
 const desc=document.createElement("span");desc.textContent=zone.description;
 button.append(type,name,desc);button.addEventListener("click",()=>inspectZone(zone.id));zoneGrid.append(button);
}
$("#zone-count").textContent=pavilion.architecture.zones.length+" SPACES · "+pavilion.architecture.levels+" LEVELS";
function inspectShop(id){
 const shop=pavilion.storefronts.find(s=>s.id===id);if(!shop)return;selectedShop=id;
 const root=$("#merchant-inspector");root.replaceChildren();
 const eyebrow=document.createElement("span");eyebrow.className="eyebrow";eyebrow.textContent="STOREFRONT INSPECTOR";root.append(eyebrow);
 const title=document.createElement("h3");title.textContent=shop.name;root.append(title);
 const desc=document.createElement("p");desc.textContent=shop.description;root.append(desc);
 const meta=document.createElement("p");meta.className="store-status";meta.textContent=shop.status==="fixture-connected"?"ECONOMY FIXTURE CONNECTED · "+shop.economyShopId:"LEASING CONCEPT · NOT A REGISTERED MERCHANT";root.append(meta);
 if(shop.status==="fixture-connected"){
  const source=document.createElement("p");source.textContent="Catalog source: "+shop.economyFixture+" · shared Economy scenario "+economy.scenario.title;root.append(source);
  const productRoot=document.createElement("div");productRoot.className="merchant-products";
  const economyShop=shops.get(shop.economyShopId);
  for(const item of economyShop?.products||[]){
   const itemNode=document.createElement("div");itemNode.className="merchant-product";
   const name=document.createElement("span");name.textContent=item.name;
   const price=document.createElement("b");price.textContent=item.price.toFixed(2)+" "+item.currency;
   const stock=document.createElement("span");stock.textContent="Authored quantity: "+item.quantity;
   itemNode.append(name,price,stock);productRoot.append(itemNode);
  }
  root.append(productRoot);
 }else{
  const note=document.createElement("p");note.textContent="This storefront is part of the pavilion leasing vision only. No merchant account, catalog, inventory or Economy registration is asserted.";root.append(note);
 }
 storeGrid.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.shop===id)));
}
for(const shop of pavilion.storefronts){
 const card=document.createElement("button");card.type="button";card.className="store-card";card.dataset.shop=shop.id;card.setAttribute("aria-pressed","false");
 const icon=document.createElement("span");icon.className="store-icon";icon.textContent=shop.status==="fixture-connected"?"♨":shop.id==="maker-studio"?"✧":shop.id==="field-and-fable"?"▤":"❀";
 const title=document.createElement("strong");title.textContent=shop.name;
 const category=document.createElement("span");category.className="eyebrow";category.textContent=shop.category;
 const desc=document.createElement("p");desc.textContent=shop.description;
 const status=document.createElement("span");status.className="store-status"+(shop.status==="fixture-connected"?"":" concept");status.textContent=shop.status==="fixture-connected"?"ECONOMY FIXTURE CONNECTED":"LEASING CONCEPT";
 card.append(category,icon,title,desc,status);card.addEventListener("click",()=>inspectShop(shop.id));storeGrid.append(card);
}
$("#show-shops").addEventListener("click",()=>{document.querySelector(".storefront-section").scrollIntoView({behavior:"smooth"});const first=pavilion.storefronts.find(s=>s.zoneId===selectedZone);if(first)inspectShop(first.id)});
inspectZone(selectedZone);inspectShop("civic-bakery-shop");
