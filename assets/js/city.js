const places = {
  workshop:{icon:"⌘",type:"CREATE / WORKSHOP CAMPUS",title:"Workshop Campus",description:"The creator district: a place to build, compose and publish the capabilities that power connected experiences.",access:"Public campus",domain:"Workshop repositories",entry:"Explore the Workshop",detail:"Discover creation tools, the FSM Workbench, blueprint library, laboratory and creator services.",action:"Preview campus entry"},
  capitol:{icon:"⌂",type:"GOVERN / CIVIC QUARTER",title:"Civic Quarter",description:"The institutions that make a persistent city function: governance, public services, planning and the everyday work of keeping a city alive.",access:"Public civic grounds",domain:"Singularity City",entry:"Explore civic life",detail:"City Hall, civic roles, public services, zoning and the systems that govern shared space.",action:"Preview civic destination"},
  transit:{icon:"⟷",type:"CONNECT / TRANSIT NEXUS",title:"Transit Nexus",description:"A connected city needs more than roads. Transit is the navigation layer linking places, districts and entire experiences.",access:"Public station",domain:"Singularity Transit / host",entry:"Open destination network",detail:"A future host-mediated route to the Capitol, Mansion, Shipyard, Workshop and other connected worlds.",action:"Preview transit handoff"},
  underworks:{icon:"⌄",type:"DESCEND / EXPERIENCE ENTRANCE",title:"The Underworks",description:"Beneath the municipal core lies an older service network: stormwater channels, blocked gates, maintenance routes and spaces occupied for reasons of their own.",access:"Restricted / discoverable",domain:"TrentBest/FSM_Dungeon",entry:"Enter the Underworks",detail:"Proposed handoff to FSM_Dungeon using an opaque City site reference. City owns the entrance and access decision; FSM_Dungeon owns the underground world and its simulation.",action:"Preview FSM_Dungeon handoff"},
  shipyard:{icon:"⚓",type:"BUILD / OCEAN WATERFRONT",title:"Ocean Shipyard",description:"A working waterfront for construction, manufacturing, logistics and maritime experiences, connected to the City's wider economy.",access:"Public waterfront / controlled yards",domain:"Shipyard and logistics domains",entry:"Explore the shipyard",detail:"A future spatial manifestation for construction, production, transportation and resource-flow capabilities.",action:"Preview shipyard entry"}
};
const nodes=[...document.querySelectorAll("[data-place]")];
const dialog=document.querySelector("#entry-dialog");
let selected="underworks";
function selectPlace(id){
  const p=places[id]; if(!p)return; selected=id;
  document.querySelector("#place-icon").textContent=p.icon;
  document.querySelector("#place-type").textContent=p.type;
  document.querySelector("#place-title").textContent=p.title;
  document.querySelector("#place-description").textContent=p.description;
  document.querySelector("#place-access").textContent=p.access;
  document.querySelector("#place-domain").textContent=p.domain;
  document.querySelector("#entry-title").textContent=p.entry;
  document.querySelector("#entry-description").textContent=p.detail;
  document.querySelector("#entry-action").textContent=p.action+"  ↗";
  nodes.forEach(n=>n.classList.toggle("selected",n.dataset.place===id));
}
nodes.forEach(node=>{
  node.addEventListener("click",()=>selectPlace(node.dataset.place));
  if(node.tagName.toLowerCase()!=="button") node.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();selectPlace(node.dataset.place)}});
});
document.querySelector("#entry-action").addEventListener("click",()=>{
  const p=places[selected]; document.querySelector("#dialog-title").textContent=p.entry;
  document.querySelector("#dialog-copy").textContent=p.detail; dialog.showModal();
});
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
document.querySelector(".dialog-confirm").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close()});
selectPlace("underworks");
