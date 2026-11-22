const catalogUrl = new URL("../../data/places.json", import.meta.url);
const nodes = [...document.querySelectorAll("[data-place]")];
const dialog = document.querySelector("#entry-dialog");
let places = new Map();
let selected = null;

const byId = id => places.get(id);
const text = (selector, value) => { const node=document.querySelector(selector); if(node) node.textContent=value ?? ""; };

function renderMarkers(items) {
  const layer=document.querySelector("#place-markers");
  if(!layer) return;
  layer.replaceChildren();
  for(const p of items) {
    const g=document.createElementNS("http://www.w3.org/2000/svg","g");
    g.setAttribute("class","map-point");
    g.setAttribute("data-place",p.id);
    g.setAttribute("tabindex","0");
    g.setAttribute("role","button");
    g.setAttribute("aria-label",p.title);
    if(p.id==="underworks") g.classList.add("featured");
    const circle=document.createElementNS(g.namespaceURI,"circle");
    circle.setAttribute("cx",p.coordinates.x); circle.setAttribute("cy",p.coordinates.y);
    circle.setAttribute("r",p.id==="underworks"?"25":"23");
    const label=document.createElementNS(g.namespaceURI,"text");
    label.setAttribute("x",p.coordinates.x); label.setAttribute("y",p.coordinates.y+5);
    label.textContent=p.code;
    g.append(circle,label);
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
    const spans=[["card-number",p.code+" / "+p.type.split(" / ")[0]],["card-symbol",p.icon]];
    for(const [cls,value] of spans){const s=document.createElement("span");s.className=cls;s.textContent=value;button.append(s);}
    const title=document.createElement("strong");title.textContent=p.title;button.append(title);
    const description=document.createElement("span");description.textContent=p.description;button.append(description);
    const action=document.createElement("b");action.textContent="Inspect place ↗";button.append(action);
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
  const response=await fetch(catalogUrl);
  if(!response.ok) throw new Error("City catalog unavailable: "+response.status);
  const catalog=await response.json();
  if(catalog.schema!=="singularity-city.catalog.v1"||!Array.isArray(catalog.places)) throw new Error("Unsupported City catalog schema");
  places=new Map(catalog.places.map(p=>[p.id,p]));
  renderMarkers(catalog.places); renderCards(catalog.places);
  selectPlace("underworks");
}
document.querySelector("#entry-action").addEventListener("click",()=>{
  const p=byId(selected); if(!p)return;
  text("#dialog-title",p.entry); text("#dialog-copy",p.detail); dialog.showModal();
});
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
document.querySelector(".dialog-confirm").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
start().catch(error=>{console.error(error);text("#place-title","City catalog unavailable");text("#place-description",error.message);});
