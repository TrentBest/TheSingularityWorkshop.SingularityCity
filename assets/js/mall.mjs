const $=s=>document.querySelector(s);
const svgNS="http://www.w3.org/2000/svg";
const [pavilion,economy,leasing]=await Promise.all([
 fetch("data/mall-pavilion.json").then(r=>{if(!r.ok)throw new Error("Pavilion data unavailable");return r.json()}),
 fetch("data/economy/civic-quarter-market.json").then(r=>{if(!r.ok)throw new Error("Economy fixture unavailable");return r.json()}),
 fetch("data/mall-leasing.json").then(r=>{if(!r.ok)throw new Error("Leasing fixture unavailable");return r.json()})
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

const unitSelect=$("#leasing-unit"), managerResponse=$("#manager-response");
const facadePreview=$("#tenant-facade-preview"), interiorPreview=$("#tenant-interior-preview");
const paletteMap={teal:{main:"#65e4dc",deep:"#164653",light:"#c6fff7"},amber:{main:"#e7c27c",deep:"#59452a",light:"#fff0c9"},forest:{main:"#8fc99c",deep:"#244b38",light:"#d9f5df"},violet:{main:"#b8a1e6",deep:"#40345f",light:"#eee5ff"}};
const draftKey="singularity-city:mall-tenant-design:v1";
let savedDrafts={};try{savedDrafts=JSON.parse(localStorage.getItem(draftKey)||"{}");}catch{savedDrafts={};}
const managerAnswers={
 vacancies:"We currently have three authored demonstration vacancies: a maker-facing unit on the promenade, a larger market-hall shell, and an upper-gallery studio. These are prototype fixtures, not a live availability feed.",
 customize:"Absolutely. The facade preview lets you choose a name, sign and palette. Inside, choose a shell-constrained fit-out or a freeform concept. The leased exterior and safety obligations remain governed by the building.",
 rules:"You can explore signage, facade finishes and interior concepts. You cannot use a design draft to move the unit, alter shared circulation, remove exits, change the building structure or claim accessibility approval.",
 lease:"Start by selecting a unit and preparing a design brief. A real application will require authenticated identity, tenant authority, lease terms, approvals and a persistent host. This prototype deliberately does not grant a lease."
};
for(const unit of leasing.units){const option=document.createElement("option");option.value=unit.id;option.textContent=unit.name;unitSelect.append(option);}
$("#manager-prompts")?.addEventListener("click",event=>{const button=event.target.closest("button[data-manager-question]");if(!button)return;managerResponse.textContent=managerAnswers[button.dataset.managerQuestion]||"Please speak with the leasing desk.";if(button.dataset.managerQuestion==="vacancies")unitSelect.focus();});
function activeUnit(){return leasing.units.find(unit=>unit.id===unitSelect.value)||leasing.units[0];}
function svgNode(name,attrs={},content){const node=document.createElementNS(svgNS,name);for(const [key,value] of Object.entries(attrs))node.setAttribute(key,String(value));if(content!==undefined)node.textContent=content;return node;}
function renderTenantStudio(){
 const unit=activeUnit();if(!unit)return;
 const storeName=$("#tenant-store-name").value.trim()||"Your Store",signText=$("#tenant-sign-text").value.trim()||"OPEN";
 const palette=paletteMap[$("#tenant-palette").value]||paletteMap.teal,free=$("#tenant-fitout").value==="freeform-interior";
 $("#leasing-unit-facts").textContent=unit.category+" · "+unit.areaM2+" m² concept area · "+unit.frontageM+" m frontage · "+unit.clearHeightM+" m clear height";
 $("#tenant-fitout-note").textContent=free?"Freeform concept: explore an interior beyond the authored shell dimensions. The external lease boundary remains unchanged.":"Shell-constrained concept: preview respects "+unit.clearWidthM+" m × "+unit.clearDepthM+" m × "+unit.clearHeightM+" m authored clear dimensions.";
 facadePreview.replaceChildren();
 facadePreview.append(svgNode("rect",{x:18,y:18,width:564,height:204,rx:8,fill:"#0a1926",stroke:"#456579","stroke-width":2}));
 facadePreview.append(svgNode("rect",{x:65,y:62,width:470,height:160,fill:palette.deep,stroke:palette.main,"stroke-width":4}));
 facadePreview.append(svgNode("rect",{x:85,y:77,width:430,height:42,fill:palette.main}));
 facadePreview.append(svgNode("text",{x:300,y:105,"text-anchor":"middle",fill:"#07111f","font-size":20,"font-weight":700},storeName.toUpperCase()));
 facadePreview.append(svgNode("rect",{x:95,y:135,width:175,height:87,fill:"#16394a",stroke:palette.light,"stroke-width":3}));
 facadePreview.append(svgNode("rect",{x:330,y:135,width:175,height:87,fill:"#16394a",stroke:palette.light,"stroke-width":3}));
 facadePreview.append(svgNode("path",{d:"M300 135v87",stroke:palette.main,"stroke-width":5}));
 facadePreview.append(svgNode("text",{x:300,y:53,"text-anchor":"middle",fill:palette.light,"font-size":13,"letter-spacing":2},signText.toUpperCase()));
 facadePreview.append(svgNode("path",{d:"M40 222h520",stroke:"#9bb0bf","stroke-width":2}));
 interiorPreview.replaceChildren();
 interiorPreview.append(svgNode("rect",{x:18,y:18,width:564,height:204,rx:8,fill:"#0a1926",stroke:"#456579","stroke-width":2}));
 const scale=Math.min(420/(unit.clearWidthM*(free?1.65:1)),130/(unit.clearDepthM*(free?1.65:1)));
 const w=unit.clearWidthM*scale*(free?1.65:1),d=unit.clearDepthM*scale*(free?1.65:1),x=(600-w)/2,y=(240-d)/2;
 interiorPreview.append(svgNode("rect",{x,y,width:w,height:d,fill:"#102c3e",stroke:palette.main,"stroke-width":3}));
 interiorPreview.append(svgNode("rect",{x:x+w*.08,y:y+d*.12,width:w*.34,height:d*.26,fill:palette.deep,stroke:palette.light,"stroke-width":2}));
 interiorPreview.append(svgNode("rect",{x:x+w*.54,y:y+d*.12,width:w*.36,height:d*.26,fill:"#284457",stroke:palette.main,"stroke-width":2}));
 interiorPreview.append(svgNode("rect",{x:x+w*.2,y:y+d*.56,width:w*.6,height:d*.25,rx:5,fill:palette.deep,stroke:palette.light,"stroke-width":2}));
 interiorPreview.append(svgNode("text",{x:300,y:225,"text-anchor":"middle",fill:"#9bb0bf","font-size":10},free?"FREEFORM CONCEPT · 1.65× DISPLAY FOOTPRINT":"LEASED SHELL · "+unit.clearWidthM+" m × "+unit.clearDepthM+" m"));
}
function tenantDraft(){const unit=activeUnit();return {schema:"singularity-city.mall-tenant-design-draft.v1",scope:"local-browser-design-only",unitId:unit.id,storeName:$("#tenant-store-name").value.trim(),signText:$("#tenant-sign-text").value.trim(),palette:$("#tenant-palette").value,interiorPolicy:$("#tenant-fitout").value,createdAt:new Date().toISOString(),unitDimensions:{areaM2:unit.areaM2,frontageM:unit.frontageM,clearWidthM:unit.clearWidthM,clearDepthM:unit.clearDepthM,clearHeightM:unit.clearHeightM},limitations:["Not a lease application or lease grant.","Not shared with other visitors.","Not a tenant account or Economy merchant registration.","Conceptual dimensions; no architectural or safety approval."]};}
function saveTenantDraft(){const draft=tenantDraft();savedDrafts[draft.unitId]=draft;try{localStorage.setItem(draftKey,JSON.stringify(savedDrafts));$("#tenant-draft-status").textContent="Local draft saved for "+draft.unitId+" · "+new Date().toLocaleTimeString();}catch{$("#tenant-draft-status").textContent="Browser storage unavailable; export the draft instead.";}}
unitSelect?.addEventListener("change",()=>{const draft=savedDrafts[unitSelect.value];if(draft){$("#tenant-store-name").value=draft.storeName||"My New Store";$("#tenant-sign-text").value=draft.signText||"OPEN";$("#tenant-palette").value=draft.palette||"teal";$("#tenant-fitout").value=draft.interiorPolicy||"shell-constrained";$("#tenant-draft-status").textContent="Loaded local draft for "+unitSelect.value;}else $("#tenant-draft-status").textContent="No local draft saved for this unit.";renderTenantStudio();});
["tenant-store-name","tenant-sign-text","tenant-palette","tenant-fitout"].forEach(id=>$("#"+id)?.addEventListener("input",renderTenantStudio));
$("#save-tenant-draft")?.addEventListener("click",saveTenantDraft);
$("#export-tenant-draft")?.addEventListener("click",()=>{const blob=new Blob([JSON.stringify(tenantDraft(),null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=activeUnit().id+"-design-draft.json";a.click();URL.revokeObjectURL(url);});
renderTenantStudio();
