import { generateParcels } from "./city-generator.mjs";
const catalogUrl = new URL("../../data/places.json", import.meta.url);
const blueprintUrl = new URL("../../data/city-blueprint.json", import.meta.url);
const systemsUrl = new URL("../../data/city-systems.json", import.meta.url);
const districtUrl = new URL("../../data/districts/civic-quarter.json", import.meta.url);
const terrainUrl = new URL("../../data/terrain/city-terrain.json", import.meta.url);
const mapLayersUrl = new URL("../../data/map-layers.json", import.meta.url);
const svgNamespace = "http://www.w3.org/2000/svg";
const dialog = document.querySelector("#entry-dialog");
let places = new Map();
let selected = null;
let selectedDistrictId = null;
let districtBlueprint = null;
let connectedDistrictModel = null;

const byId = id => places.get(id);
const text = (selector, value) => { const node=document.querySelector(selector); if(node) node.textContent=value ?? ""; };
const svg = (name, attributes={}) => {
  const node=document.createElementNS(svgNamespace,name);
  for(const [key,value] of Object.entries(attributes)) node.setAttribute(key,String(value));
  return node;
};

function renderTerrain(terrain) {
  const elevationLayer=document.querySelector("#terrain-layer");
  const landCoverLayer=document.querySelector("#land-cover-layer");
  const hydrologyLayer=document.querySelector("#hydrology-layer");
  const hazardsLayer=document.querySelector("#hazards-layer");
  for(const layer of [elevationLayer,landCoverLayer,hydrologyLayer,hazardsLayer]) layer?.replaceChildren();
  const {width,height}=terrain.coordinateSpace;
  const grid=terrain.elevation.samples, rows=terrain.landCover.length, columns=terrain.landCover[0].length;
  const cellWidth=width/columns,cellHeight=height/rows;
  const colorFor=value=>value<120?"#315a57":value<130?"#416b60":value<140?"#567d68":value<150?"#718b6c":value<160?"#8b966d":value<170?"#a49b75":"#b5a37f";
  for(let row=0;row<rows;row++) for(let column=0;column<columns;column++) {
    const average=(grid[row][column]+grid[row][column+1]+grid[row+1][column]+grid[row+1][column+1])/4;
    elevationLayer?.append(svg("rect",{x:column*cellWidth,y:row*cellHeight,width:cellWidth+1,height:cellHeight+1,fill:colorFor(average),class:"terrain-tile","data-elevation":average.toFixed(1)}));
    const cover=terrain.landCover[row][column];
    landCoverLayer?.append(svg("rect",{x:column*cellWidth+2,y:row*cellHeight+2,width:cellWidth-4,height:cellHeight-4,rx:3,class:"land-cover-tile land-cover-"+cover}));
  }
  // Marching-squares contour segments derived from the same elevation samples as the tint.
  const contourLevels=[120,130,140,150,160,170];
  for(let row=0;row<terrain.elevation.rows-1;row++) for(let column=0;column<terrain.elevation.columns-1;column++) {
    const x=column*cellWidth,y=row*cellHeight;
    const corners=[grid[row][column],grid[row][column+1],grid[row+1][column+1],grid[row+1][column]];
    const edges=[
      [0,1,x,y,x+cellWidth,y],
      [1,2,x+cellWidth,y,x+cellWidth,y+cellHeight],
      [2,3,x+cellWidth,y+cellHeight,x,y+cellHeight],
      [3,0,x,y+cellHeight,x,y]
    ];
    for(const level of contourLevels) {
      const crossings=[];
      for(const [a,b,x1,y1,x2,y2] of edges) {
        const va=corners[a],vb=corners[b];
        if((va<level)===(vb<level)||va===vb)continue;
        const t=(level-va)/(vb-va);
        crossings.push([x1+(x2-x1)*t,y1+(y2-y1)*t]);
      }
      for(let i=0;i+1<crossings.length;i+=2) {
        const [a,b]=[crossings[i],crossings[i+1]];
        elevationLayer?.append(svg("line",{x1:a[0],y1:a[1],x2:b[0],y2:b[1],class:"terrain-contour","data-contour":level}));
      }
    }
  }
  for(const watershed of terrain.hydrology.watersheds) {
    hydrologyLayer?.append(svg("polygon",{points:watershed.boundary.map(p=>p.join(",")).join(" "),class:"watershed-boundary"}));
    const outlet=svg("circle",{cx:watershed.outlet[0],cy:watershed.outlet[1],r:7,class:"watershed-outlet"});
    hydrologyLayer?.append(outlet);
  }
  for(const stream of terrain.hydrology.watercourses) {
    hydrologyLayer?.append(svg("polyline",{points:stream.points.map(p=>p.join(",")).join(" "),class:"watercourse watercourse-"+stream.kind}));
    const label=svg("text",{x:stream.points[1][0],y:stream.points[1][1]-8,class:"terrain-feature-label"});
    label.textContent=stream.name.toUpperCase();hydrologyLayer?.append(label);
  }
  for(const hazard of terrain.hazards) hazardsLayer?.append(svg("polygon",{points:hazard.polygon.map(p=>p.join(",")).join(" "),class:"hazard-zone","data-hazard":hazard.id}));
  for(const feature of terrain.terrainFeatures) {
    const marker=svg("g",{class:"terrain-feature"});
    marker.append(svg("circle",{cx:feature.anchor[0],cy:feature.anchor[1],r:5}));
    const label=svg("text",{x:feature.anchor[0]+9,y:feature.anchor[1]-8,class:"terrain-feature-label"});
    label.textContent=feature.label.toUpperCase();marker.append(label);elevationLayer?.append(marker);
  }
  const values=grid.flat();
  text("#terrain-readout","Synthetic terrain · "+Math.min(...values)+"–"+Math.max(...values)+" m relative elevation");
}
function renderInfrastructure(model) {
  const transit=document.querySelector("#transit-layer"),utilities=document.querySelector("#utilities-layer");
  transit?.replaceChildren();utilities?.replaceChildren();
  const sx=900/640,sy=590/420;
  for(const route of model.transit.routes) {
    const stops=route.stopIds.map(id=>model.transit.stops.find(s=>s.id===id)).filter(Boolean);
    if(stops.length>1) transit?.append(svg("polyline",{points:stops.map(s=>(s.x*sx)+","+(s.y*sy)).join(" "),class:"map-transit-route"}));
  }
  for(const stop of model.transit.stops) {
    const x=stop.x*sx,y=stop.y*sy;
    transit?.append(svg("circle",{cx:x,cy:y,r:8,class:"map-transit-stop"}));
  }
  for(const network of [model.water,model.energy]) {
    const nodes=new Map(network.nodes.map(n=>[n.id,n]));
    for(const edge of network.edges) {
      const a=nodes.get(edge.from),b=nodes.get(edge.to);if(!a||!b)continue;
      utilities?.append(svg("line",{x1:a.x*sx,y1:a.y*sy,x2:b.x*sx,y2:b.y*sy,class:network===model.water?"map-water-link":"map-energy-link"}));
    }
  }
}
function renderMapLayerControls(catalog) {
  const root=document.querySelector("#map-layer-controls");if(!root)return;
  const targets={"terrain":["#terrain-layer"],"land-cover":["#land-cover-layer"],"watersheds":["#hydrology-layer"],"districts":["#district-layer","#district-labels"],"parcels":["#parcel-layer"],"mobility":["#route-layer"],"transit":["#transit-layer"],"utilities":["#utilities-layer"],"hazards":["#hazards-layer"]};
  root.replaceChildren();
  const title=document.createElement("span");title.textContent="MAP LAYERS";root.append(title);
  for(const layer of catalog.layers) {
    const button=document.createElement("button");button.type="button";button.textContent=layer.title;button.dataset.mapLayer=layer.id;
    let visible=layer.defaultVisible;
    for(const selector of targets[layer.id]||[]) {const node=document.querySelector(selector);if(node)node.classList.toggle("map-layer-hidden",!visible);}
    button.setAttribute("aria-pressed",String(visible));
    button.addEventListener("click",()=>{visible=!visible;button.setAttribute("aria-pressed",String(visible));for(const selector of targets[layer.id]||[])document.querySelector(selector)?.classList.toggle("map-layer-hidden",!visible);});
    root.append(button);
  }
}

function scenePolygon(points,fill,stroke="#d5e6e8",width=1) {
  return svg("polygon",{points:points.map(p=>p.join(",")).join(" "),fill,stroke,"stroke-width":width});
}
function renderDistrictScene(district,index,total) {
  const root=document.querySelector("#district-scene-art");
  const title=document.querySelector("#district-scene-title");
  const count=document.querySelector("#district-scene-index");
  const summary=document.querySelector("#district-scene-summary");
  const provenance=document.querySelector("#district-scene-provenance");
  const description=document.querySelector("#district-scene-description");
  if(!root||!district)return;
  root.replaceChildren();
  const grid=district.parcelGrid;
  // Block count and occupancy follow the authored parcel-grid parameters;
  // illustrative heights are placeholders, not claims about existing buildings.
  root.append(svg("path",{d:"M125 225 L450 355 L775 225 L450 95 Z",fill:"#173b43",stroke:"#5e8983","stroke-width":2,opacity:.8}));
  const road=svg("path",{d:"M160 300 L450 185 L740 300",fill:"none",stroke:"#a8b9b1","stroke-width":15,"stroke-linecap":"round",opacity:.48});
  root.append(road);
  if(district.id==="civic"&&connectedDistrictModel) {
    const project=(x,y,z=0)=>[450+(x-320)*.72-(y-210)*.72,220+(x-320)*.24+(y-210)*.24-z];
    const parcelsById=new Map(connectedDistrictModel.parcels.map(parcel=>[parcel.id,parcel]));
    for(const building of connectedDistrictModel.buildings) {
      const parcel=parcelsById.get(building.parcelId);
      if(!parcel)continue;
      const g=parcel.geometry;
      const height=building.floors*18;
      const p1=project(g.x,g.y),p2=project(g.x+g.width,g.y),p3=project(g.x+g.width,g.y+g.height),p4=project(g.x,g.y+g.height);
      const t1=project(g.x,g.y,height),t2=project(g.x+g.width,g.y,height),t3=project(g.x+g.width,g.y+g.height,height),t4=project(g.x,g.y+g.height,height);
      root.append(scenePolygon([p1,p4,t4,t1],"#31566a","#6e91a0",1));
      root.append(scenePolygon([p2,p3,t3,t2],"#1b394e","#527487",1));
      root.append(scenePolygon([t1,t2,t3,t4],"#91b7bd","#c3dadd",1));
      const [lx,ly]=project(g.x+g.width/2,g.y+g.height/2,height+12);
      const label=svg("text",{x:lx,y:ly,class:"scene-landmark-label","text-anchor":"middle"});
      label.textContent=building.name.toUpperCase();
      root.append(label);
    }
    const square=connectedDistrictModel.publicRealm.spaces[0];
    const squareParcel=square&&parcelsById.get(square.parcelId);
    if(squareParcel) {
      const g=squareParcel.geometry;
      const corners=[project(g.x,g.y),project(g.x+g.width,g.y),project(g.x+g.width,g.y+g.height),project(g.x,g.y+g.height)];
      root.append(scenePolygon(corners,"#376b50","#83b88b",2));
      const [x,y]=project(g.x+g.width/2,g.y+g.height/2,8);
      const label=svg("text",{x,y,class:"scene-landmark-label","text-anchor":"middle"});
      label.textContent=square.name.toUpperCase();
      root.append(label);
    }
  } else {
    for(let row=grid.rows-1;row>=0;row--) {
      for(let col=0;col<grid.columns;col++) {
        const seed=(index+2)*17+(row+1)*11+(col+1)*7;
        if(((seed*13)%100)/100>grid.occupancy)continue;
        const gx=(col-(grid.columns-1)/2)*(grid.width+grid.gap+24);
        const gy=(row-(grid.rows-1)/2)*(grid.height+grid.gap+24);
        const x=450+gx-gy*.72;
        const y=210+(gx+gy)*.25;
        const h=28+(seed*19)%66;
        const w=Math.max(24,grid.width*.72);
        const top=[[x,y-h],[x+w,y-h+12],[x,y-h+24],[x-w,y-h+12]];
        const left=[[x-w,y-h+12],[x,y-h+24],[x,y+24],[x-w,y+12]];
        const right=[[x,y-h+24],[x+w,y-h+12],[x+w,y+12],[x,y+24]];
        root.append(scenePolygon(left,"#31566a","#6e91a0",1));
        root.append(scenePolygon(right,"#1b394e","#527487",1));
        root.append(scenePolygon(top,"#91b7bd","#c3dadd",1));
      }
    }
  }
  const trees=[[190,285],[220,310],[700,285],[670,310],[445,365],[485,365]];
  for(const [x,y] of trees) {
    root.append(svg("circle",{cx:x,cy:y,r:8,fill:"#4f9b77",stroke:"#9ac89d","stroke-width":2}));
    root.append(svg("path",{d:`M${x} ${y+7} v10`,stroke:"#8d7658","stroke-width":3}));
  }
  title.textContent=district.name;
  count.textContent="DISTRICT "+(index+1)+" / "+total;
  summary.textContent=district.name+" · "+grid.columns+" × "+grid.rows+" parcel-grid study";
  provenance.textContent=district.id==="civic"&&connectedDistrictModel?"CONNECTED CIVIC FIXTURE + BLUEPRINT":"BLUEPRINT-DRIVEN · SYNTHETIC MASSING";
  description.textContent="Oblique aerial massing study for "+district.name+". District footprint and parcel-grid parameters come from the City blueprint. This is not surveyed building geometry.";
}
function selectDistrict(id) {
  if(!districtBlueprint)return;
  const index=districtBlueprint.districts.findIndex(d=>d.id===id);
  if(index<0)return;
  selectedDistrictId=id;
  const district=districtBlueprint.districts[index];
  document.querySelectorAll("[data-district]").forEach(node=>node.classList.toggle("district-selected",node.dataset.district===id));
  document.querySelectorAll("[data-district-label]").forEach(node=>node.classList.toggle("district-label-selected",node.dataset.districtLabel===id));
  renderDistrictScene(district,index,districtBlueprint.districts.length);
  text("#experience-status","District selected · "+district.name+" · same city identity across presentation channels");
  const scene=document.querySelector("#district-experience");
  if(scene)scene.dataset.selectedDistrict=id;
  const relatedPlace=[...places.values()].find(place=>place.district===district.name);
  if(relatedPlace&&selected!==relatedPlace.id)selectPlace(relatedPlace.id);
}
function stepDistrict(delta) {
  if(!districtBlueprint?.districts.length)return;
  const current=Math.max(0,districtBlueprint.districts.findIndex(d=>d.id===selectedDistrictId));
  const next=(current+delta+districtBlueprint.districts.length)%districtBlueprint.districts.length;
  selectDistrict(districtBlueprint.districts[next].id);
}

function renderBlueprint(blueprint) {
  const districts=document.querySelector("#district-layer");
  const parcels=document.querySelector("#parcel-layer");
  const routes=document.querySelector("#route-layer");
  const labels=document.querySelector("#district-labels");
  for(const layer of [districts,parcels,routes,labels]) layer?.replaceChildren();
  const allParcels=[];
  districtBlueprint=blueprint;
  for(const district of blueprint.districts) {
    const polygon=svg("polygon",{points:district.polygon.map(point=>point.join(",")).join(" "),class:"district-shape "+district.className,"data-district":district.id,tabindex:"0",role:"button","aria-label":"Select "+district.name});
    polygon.addEventListener("click",()=>selectDistrict(district.id));
    polygon.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();selectDistrict(district.id);}});
    districts?.append(polygon);
    const center=district.polygon.reduce((sum,point)=>[sum[0]+point[0]/district.polygon.length,sum[1]+point[1]/district.polygon.length],[0,0]);
    const label=svg("text",{x:center[0],y:center[1],class:"map-label","text-anchor":"middle"});
    label.textContent=district.name.toUpperCase();
    label.setAttribute("data-district-label",district.id);
    label.addEventListener("click",()=>selectDistrict(district.id));
    labels?.append(label);
    for(const parcel of generateParcels(district,blueprint.generation.seed)) {
      allParcels.push(parcel);
      const rect=svg("rect",{x:parcel.x,y:parcel.y,width:parcel.width,height:parcel.height,rx:2,class:"generated-parcel","data-parcel":parcel.id,tabindex:"0",role:"button","aria-label":"Inspect generated parcel "+parcel.id});
      rect.addEventListener("click",()=>inspectParcel(parcel,district,blueprint));
      rect.addEventListener("keydown",event=>{if(event.key==="Enter"||event.key===" "){event.preventDefault();inspectParcel(parcel,district,blueprint);}});
      parcels?.append(rect);
    }
  }
  for(const route of blueprint.routes) {
    const path=svg("polyline",{points:route.points.map(point=>point.join(",")).join(" "),class:"generated-route route-"+route.kind,"data-route":route.id});
    routes?.append(path);
  }
  text("#map-generation","BLUEPRINT "+blueprint.schema.toUpperCase()+" · SEED "+blueprint.generation.seed+" · "+allParcels.length+" GENERATED PARCELS");
}
function renderSystems(catalog) {
  const grid=document.querySelector("#city-systems");
  if(!grid) return;
  grid.replaceChildren();
  for(const system of catalog.systems) {
    const link=document.createElement("a");
    link.href="docs/CIVIL_SYSTEMS_AND_CITY_THEORY.md#"+system.theoryAnchor;
    link.className="system-card";
    const code=document.createElement("b"); code.textContent=system.domain.toUpperCase(); link.append(code);
    const title=document.createElement("strong"); title.textContent=system.title; link.append(title);
    const summary=document.createElement("span"); summary.textContent=system.summary; link.append(summary);
    const meta=document.createElement("small"); meta.textContent=system.status.toUpperCase()+" · "+system.components.length+" COMPONENTS"; link.append(meta);
    grid.append(link);
  }
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
  text("#source-manifest",(p.manifest ?? "data/places.json")+" · "+p.id);
}
function inspectParcel(parcel,district,blueprint) {
  selectDistrict(district.id);
  selected=null;
  text("#place-icon","▦");
  text("#place-type","GENERATED PARCEL / "+district.name.toUpperCase());
  text("#place-title",parcel.id);
  text("#place-description","A deterministic parcel candidate generated from the "+district.name+" district grid. This geometry is a preview, not persisted land ownership or an authoritative parcel.");
  text("#place-access","Preview only");
  text("#place-domain","City blueprint");
  text("#entry-title","Candidate geometry");
  text("#entry-description","Generated by "+blueprint.generation.algorithm+" using seed "+blueprint.generation.seed+". Accepting or editing this parcel will require a future authoritative city-builder workflow.");
  text("#entry-action","Preview only");
  renderProvenance({
    id:parcel.id,
    owner:{repository:"TrentBest/TheSingularityWorkshop.SingularityCity",path:"data/city-blueprint.json"},
    status:"generated-preview",
    capabilities:[district.id,"seed:"+blueprint.generation.seed,blueprint.generation.algorithm],
    manifest:"data/city-blueprint.json"
  });
  document.querySelectorAll("[data-place]").forEach(node=>node.classList.remove("selected"));
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

function renderConnectedDistrict(model) {
  connectedDistrictModel=model;
  const root=document.querySelector("#connected-district");
  if(!root) return;
  const layerIds=["district-streets","district-parcels","district-buildings","district-networks","district-stops"];
  const layers=Object.fromEntries(layerIds.map(id=>[id,document.getElementById(id)]));
  for(const layer of Object.values(layers)) layer?.replaceChildren();
  const make=(name,attrs)=>svg(name,attrs);
  for(const street of model.streets) {
    const path=make("polyline",{points:street.points.map(p=>p.join(",")).join(" "),class:"district-street district-street-"+street.mode});
    layers["district-streets"]?.append(path);
  }
  for(const parcel of model.parcels) {
    const g=parcel.geometry;
    layers["district-parcels"]?.append(make("rect",{x:g.x,y:g.y,width:g.width,height:g.height,rx:4,class:"district-parcel","data-entity":parcel.id}));
  }
  const parcelsById=new Map(model.parcels.map(p=>[p.id,p]));
  for(const building of model.buildings) {
    const p=parcelsById.get(building.parcelId); if(!p) continue;
    const g=p.geometry;
    const rect=make("rect",{x:g.x+8,y:g.y+8,width:g.width-16,height:g.height-16,rx:3,class:"district-building","data-entity":building.id,tabindex:"0",role:"button"});
    rect.addEventListener("click",()=>inspectDistrictEntity(model,building.id));
    rect.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();inspectDistrictEntity(model,building.id);}});
    layers["district-buildings"]?.append(rect);
    const label=make("text",{x:g.x+g.width/2,y:g.y+g.height/2+4,class:"district-building-label","text-anchor":"middle"});
    label.textContent=building.name.replace("Civic ","");
    layers["district-buildings"]?.append(label);
  }
  const drawEdges=(network,className,source,target,layerName)=>{
    const nodes=new Map(network.nodes.map(n=>[n.id,n]));
    for(const edge of network.edges){
      const a=nodes.get(edge.from),b=nodes.get(edge.to); if(!a||!b) continue;
      layers["district-networks"]?.append(make("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:className,"data-network":layerName}));
    }
  };
  drawEdges(model.mobility,"district-network-mobility", "from","to","mobility");
  const drawUtility=(network,className,name)=>{
    const nodes=new Map(network.nodes.map(n=>[n.id,n]));
    for(const edge of network.edges){
      const a=nodes.get(edge.from),b=nodes.get(edge.to); if(!a||!b) continue;
      layers["district-networks"]?.append(make("line",{x1:a.x,y1:a.y,x2:b.x,y2:b.y,class:className,"data-network":name}));
    }
  };
  drawUtility(model.water,"district-network-water","water");
  drawUtility(model.energy,"district-network-energy","energy");
  for(const stop of model.transit.stops){
    layers["district-stops"]?.append(make("circle",{cx:stop.x,cy:stop.y,r:7,class:"district-stop"}));
  }
  const metrics=[
    ["PARCELS",model.parcels.length],
    ["BUILDINGS / ROOMS",model.buildings.length+" / "+model.buildings.reduce((n,b)=>n+b.rooms.length,0)],
    ["MOBILITY NODES / LINKS",model.mobility.nodes.length+" / "+model.mobility.edges.length],
    ["UTILITY NODES",model.water.nodes.length+model.energy.nodes.length],
    ["SYNTHETIC RESIDENTS",model.population.residents.toLocaleString()]
  ];
  const metricRoot=document.querySelector("#district-metrics");
  if(metricRoot){metricRoot.replaceChildren();for(const [label,value] of metrics){const card=document.createElement("div");card.className="district-metric";const strong=document.createElement("strong");strong.textContent=value;const small=document.createElement("small");small.textContent=label;card.append(strong,small);metricRoot.append(card);}}
  const cards=document.querySelector("#district-entities");
  if(cards){cards.replaceChildren();for(const b of model.buildings){const button=document.createElement("button");button.type="button";button.className="district-entity";button.textContent=b.name+" · "+b.rooms.length+" rooms";button.addEventListener("click",()=>inspectDistrictEntity(model,b.id));cards.append(button);}for(const service of model.services){const button=document.createElement("button");button.type="button";button.className="district-entity service";button.textContent=service.name;button.addEventListener("click",()=>inspectDistrictEntity(model,service.id));cards.append(button);}}
  const layerButtons=document.querySelectorAll("[data-district-layer]");
  layerButtons.forEach(button=>button.addEventListener("click",()=>{const key=button.dataset.districtLayer;const visible=button.getAttribute("aria-pressed")!=="true";button.setAttribute("aria-pressed",String(visible));document.querySelectorAll('[data-network="'+key+'"]').forEach(line=>line.classList.toggle("network-hidden",!visible));}));
  inspectDistrictEntity(model,model.buildings[0]?.id);
  text("#district-model-status",model.provenance.kind.toUpperCase()+" · "+model.provenance.revision+" · "+model.district.modelStatus.toUpperCase());
  text("#scenario-canopy",model.scenario.baseline.treeCanopyPercent+"% → "+model.scenario.proposal.treeCanopyPercent+"%");
  text("#scenario-temperature",model.scenario.baseline.summerSurfaceTemperatureC+"°C → "+model.scenario.proposal.summerSurfaceTemperatureC+"°C");
  text("#scenario-runoff",model.scenario.baseline.stormwaterRunoffIndex+" → "+model.scenario.proposal.stormwaterRunoffIndex);
}
function inspectDistrictEntity(model,id) {
  const entities=[...model.parcels,...model.buildings,...model.buildings.flatMap(b=>b.rooms),...model.mobility.nodes,...model.transit.stops,...model.water.nodes,...model.energy.nodes,...model.publicRealm.spaces,...model.institutions,...model.services];
  const entity=entities.find(item=>item.id===id); if(!entity)return;
  text("#district-inspector-title",entity.name||entity.id);
  text("#district-inspector-id",entity.id);
  let relationships=[];
  if(entity.parcelId) relationships.push("parcel: "+entity.parcelId);
  if(entity.buildingIds) relationships.push("buildings: "+entity.buildingIds.join(", "));
  if(entity.serviceIds) relationships.push("services: "+entity.serviceIds.join(", "));
  if(entity.institutionId) relationships.push("institution: "+entity.institutionId);
  if(entity.placeId) relationships.push("place: "+entity.placeId);
  const building=model.buildings.find(b=>b.id===id);
  if(building) relationships.push("parcel: "+building.parcelId,"rooms: "+building.rooms.map(r=>r.id).join(", "));
  const room=model.buildings.flatMap(b=>b.rooms.map(r=>({...r,buildingId:b.id}))).find(r=>r.id===id);
  if(room) relationships.push("building: "+room.buildingId,"floor: "+room.floor,"capacity: "+room.capacity);
  const stop=model.transit.stops.find(s=>s.id===id);
  if(stop) relationships.push("mobility node: "+stop.nodeId);
  text("#district-inspector-links",relationships.join(" · ")||"Connected district entity");
}

async function start() {
  const [catalogResponse,blueprintResponse,systemsResponse,districtResponse,terrainResponse,mapLayersResponse]=await Promise.all([fetch(catalogUrl),fetch(blueprintUrl),fetch(systemsUrl),fetch(districtUrl),fetch(terrainUrl),fetch(mapLayersUrl)]);
  if(!catalogResponse.ok) throw new Error("City catalog unavailable: "+catalogResponse.status);
  if(!blueprintResponse.ok) throw new Error("City blueprint unavailable: "+blueprintResponse.status);
  if(!systemsResponse.ok) throw new Error("City systems catalog unavailable: "+systemsResponse.status);
  if(!districtResponse.ok) throw new Error("Connected district model unavailable: "+districtResponse.status);
  if(!terrainResponse.ok) throw new Error("Terrain model unavailable: "+terrainResponse.status);
  if(!mapLayersResponse.ok) throw new Error("Map layer catalog unavailable: "+mapLayersResponse.status);
  const [catalog,blueprint,systems,district,terrain,mapLayers]=await Promise.all([catalogResponse.json(),blueprintResponse.json(),systemsResponse.json(),districtResponse.json(),terrainResponse.json(),mapLayersResponse.json()]);
  if(catalog.schema!=="singularity-city.catalog.v1"||!Array.isArray(catalog.places)) throw new Error("Unsupported City catalog schema");
  if(blueprint.schema!=="singularity-city.blueprint.v1"||blueprint.cityId!==catalog.city.id) throw new Error("Unsupported or mismatched City blueprint");
  if(systems.schema!=="singularity-city.systems.v1"||systems.cityId!==catalog.city.id||!Array.isArray(systems.systems)) throw new Error("Unsupported or mismatched City systems catalog");
  if(district.schema!=="singularity-city.district-model.v1"||district.cityId!==catalog.city.id||district.district.id!=="civic") throw new Error("Unsupported or mismatched connected district model");
  if(terrain.schema!=="singularity-city.terrain-model.v1"||terrain.cityId!==catalog.city.id) throw new Error("Unsupported or mismatched terrain model");
  if(mapLayers.schema!=="singularity-city.map-layer-catalog.v1"||mapLayers.cityId!==catalog.city.id) throw new Error("Unsupported or mismatched map layer catalog");
  places=new Map(catalog.places.map(p=>[p.id,p]));
  renderTerrain(terrain); renderBlueprint(blueprint); renderInfrastructure(district); renderMapLayerControls(mapLayers); renderSystems(systems); renderConnectedDistrict(district); renderMarkers(catalog.places); renderCards(catalog.places);
  selectPlace("capitol");
  selectDistrict("civic");
}
document.querySelector("#district-previous")?.addEventListener("click",()=>stepDistrict(-1));
document.querySelector("#district-next")?.addEventListener("click",()=>stepDistrict(1));
document.querySelector("#entry-action").addEventListener("click",()=>{
  const p=byId(selected); if(!p)return;
  if(p.id==="singularity-mall"){window.location.href="mall.html";return;}
  text("#dialog-title",p.entry); text("#dialog-copy",p.detail); dialog.showModal();
});
document.querySelector(".dialog-close").addEventListener("click",()=>dialog.close());
document.querySelector(".dialog-confirm").addEventListener("click",()=>dialog.close());
dialog.addEventListener("click",e=>{if(e.target===dialog)dialog.close();});
start().catch(error=>{console.error(error);text("#place-title","City data unavailable");text("#place-description",error.message);});
