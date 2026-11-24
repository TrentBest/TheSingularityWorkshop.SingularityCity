const $=s=>document.querySelector(s);
const [pavilion,economy]=await Promise.all([
 fetch("data/mall-pavilion.json").then(r=>{if(!r.ok)throw new Error("Pavilion data unavailable");return r.json()}),
 fetch("data/economy/civic-quarter-market.json").then(r=>{if(!r.ok)throw new Error("Economy fixture unavailable");return r.json()})
]);
const shops=new Map((economy.shops||[]).map(shop=>[shop.id,shop]));
const zones=new Map(pavilion.architecture.zones.map(zone=>[zone.id,zone]));
const zoneGrid=$("#zone-grid"),storeGrid=$("#storefronts");
let selectedZone="grand-atrium",selectedShop=null;
function inspectZone(id){
 const zone=zones.get(id);if(!zone)return;selectedZone=id;
 const related=pavilion.storefronts.filter(shop=>shop.zoneId===id);
 $("#zone-kind").textContent=zone.kind.toUpperCase()+" SPACE";
 $("#zone-name").textContent=zone.name;$("#zone-description").textContent=zone.description;
 $("#zone-id").textContent=zone.id;$("#zone-shops").textContent=related.length?related.map(s=>s.name).join(" · "):"No storefronts assigned";
 zoneGrid.querySelectorAll("button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.zone===id)));
}
for(const zone of pavilion.architecture.zones){
 const button=document.createElement("button");button.type="button";button.className="zone-card";button.dataset.zone=zone.id;button.dataset.kind=zone.kind;button.setAttribute("aria-pressed","false");
 const type=document.createElement("small");type.textContent=zone.kind.toUpperCase()+" · "+(zone.id==="upper-gallery"||zone.id==="event-terrace"?"LEVEL 02":"LEVEL 01");
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
