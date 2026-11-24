import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
const register=JSON.parse(await readFile(new URL("../data/proof-review.json",import.meta.url),"utf8"));
assert.equal(register.schema,"workshop.proof-review.v1");
assert.equal(register.policy.initialState,"unchecked");
assert.equal(register.policy.browserPersistence,"localStorage");
assert.match(register.policy.authority,/not a repository-wide certification/i);
let count=0;
for(const [page,proofs] of Object.entries(register.pages)){
 assert.ok(["city","mall"].includes(page));
 assert.ok(proofs.length>0);
 const ids=new Set();
 for(const proof of proofs){assert.ok(proof.id&&proof.title&&proof.claim&&proof.method&&proof.evidence&&proof.automated);assert.ok(!ids.has(proof.id),"duplicate proof ID: "+proof.id);ids.add(proof.id);count++;}
}
const script=await readFile(new URL("../assets/js/proof-review.mjs",import.meta.url),"utf8");
assert.match(script,/checkbox\\.type\\s*=\\s*"checkbox"/);assert.match(script,/localStorage/);assert.match(script,/workshop\.proof-review-record\.v1/);assert.match(script,/local-browser-review/);
console.log("Proof review contract validated: "+count+" proofs across "+Object.keys(register.pages).length+" pages.");
