const root = document.querySelector("[data-proof-review]");
if (root) {
  const page = root.dataset.proofReview;
  const storageKey = "singularity-city:proof-review:v1";
  const [catalog, state] = await Promise.all([
    fetch(new URL("../../data/proof-review.json", import.meta.url)).then(r => { if (!r.ok) throw new Error("Proof register unavailable"); return r.json(); }),
    Promise.resolve(readSaved(storageKey))
  ]);
  const proofs = catalog.pages[page] || [];
  const pageState = state.pages[page] || (state.pages[page] = {});
  const heading = document.createElement("div");
  heading.className = "proof-review-heading";
  const intro = document.createElement("div");
  const eyebrow = document.createElement("span"); eyebrow.className = "eyebrow"; eyebrow.textContent = "HUMAN-IN-THE-LOOP EVIDENCE";
  const h2 = document.createElement("h2"); h2.textContent = "Did you verify it?";
  const p = document.createElement("p"); p.textContent = "Every proof starts unchecked. Exercise the feature yourself before recording a review. Your record is stored in this browser only.";
  intro.append(eyebrow,h2,p); heading.append(intro);
  const art = document.createElement("img"); art.src = "assets/images/proof-review-lifecycle.svg"; art.alt = "Specified, implemented, automated, human review, shared record"; art.className = "proof-review-art"; heading.append(art); root.append(heading);
  const toolbar = document.createElement("div"); toolbar.className = "proof-review-toolbar";
  const reviewerLabel = document.createElement("label"); reviewerLabel.textContent = "Reviewer (optional)";
  const reviewer = document.createElement("input"); reviewer.type = "text"; reviewer.maxLength = 80; reviewer.placeholder = "Initials or review handle"; reviewer.value = state.reviewer || "";
  reviewer.addEventListener("input", () => { state.reviewer = reviewer.value.trim(); saveSaved(storageKey,state); }); reviewerLabel.append(reviewer);
  const summary = document.createElement("strong"); summary.className = "proof-review-summary";
  const exportButton = document.createElement("button"); exportButton.type = "button"; exportButton.textContent = "Export review record ↓";
  exportButton.addEventListener("click", () => {
    const payload = {schema:"workshop.proof-review-record.v1",scope:"local-browser-review",repository:"TrentBest/TheSingularityWorkshop.SingularityCity",page,exportedAt:new Date().toISOString(),reviewer:state.reviewer||null,proofs:proofs.map(proof=>({id:proof.id,reviewed:Boolean(pageState[proof.id]?.reviewed),reviewedAt:pageState[proof.id]?.reviewedAt||null,reviewer:pageState[proof.id]?.reviewer||state.reviewer||null,claim:proof.claim,method:proof.method}))};
    const blob = new Blob([JSON.stringify(payload,null,2)],{type:"application/json"}); const url=URL.createObjectURL(blob); const link=document.createElement("a"); link.href=url; link.download=page+"-proof-review.json"; link.click(); URL.revokeObjectURL(url);
  });
  toolbar.append(reviewerLabel,summary,exportButton); root.append(toolbar);
  const list=document.createElement("div"); list.className="proof-review-list";
  for(const proof of proofs){
    const card=document.createElement("article"); card.className="proof-review-card";
    const top=document.createElement("div"); top.className="proof-review-card-top";
    const title=document.createElement("h3"); title.textContent=proof.title;
    const label=document.createElement("label"); label.className="proof-review-check";
    const checkbox=document.createElement("input"); checkbox.type="checkbox"; checkbox.checked=Boolean(pageState[proof.id]?.reviewed); checkbox.setAttribute("aria-label","Human reviewed: "+proof.title);
    const checkText=document.createElement("span"); checkText.textContent="Human reviewed"; label.append(checkbox,checkText); top.append(title,label);
    const claim=document.createElement("p"); claim.className="proof-review-claim"; claim.textContent=proof.claim;
    const method=document.createElement("p"); method.className="proof-review-method"; method.textContent="HOW TO CHECK · "+proof.method;
    const evidence=document.createElement("div"); evidence.className="proof-review-evidence";
    const kind=document.createElement("span"); kind.textContent=proof.evidence;
    const automated=document.createElement("span"); automated.textContent="AUTOMATED / SOURCE · "+proof.automated; evidence.append(kind,automated);
    const record=document.createElement("p"); record.className="proof-review-record";
    function renderRecord(){const item=pageState[proof.id];record.textContent=item?.reviewed?"REVIEW RECORDED · "+new Date(item.reviewedAt).toLocaleString()+(item.reviewer?" · "+item.reviewer:""):"NOT YET REVIEWED · unchecked by default";card.classList.toggle("is-reviewed",Boolean(item?.reviewed));}
    checkbox.addEventListener("change",()=>{if(checkbox.checked)pageState[proof.id]={reviewed:true,reviewedAt:new Date().toISOString(),reviewer:state.reviewer||null};else delete pageState[proof.id];saveSaved(storageKey,state);renderRecord();updateSummary();});
    card.append(top,claim,method,evidence,record); list.append(card); renderRecord();
  }
  root.append(list);
  function updateSummary(){summary.textContent=proofs.filter(proof=>pageState[proof.id]?.reviewed).length+" / "+proofs.length+" reviewed in this browser";}
  updateSummary();
  const note=document.createElement("p"); note.className="proof-review-boundary"; note.textContent="A local checkbox is a reviewer note, not a shared certification. Export the record to preserve or share it. A future Workshop host can promote accepted evidence into an authenticated, repository-linked verification record."; root.append(note);
}
function readSaved(key){try{const value=JSON.parse(localStorage.getItem(key)||"{}");if(!value.pages||typeof value.pages!=="object")value.pages={};return value;}catch{return {pages:{}};}}
function saveSaved(key,value){try{localStorage.setItem(key,JSON.stringify(value));}catch{/* Page remains usable when storage is unavailable. */}}
