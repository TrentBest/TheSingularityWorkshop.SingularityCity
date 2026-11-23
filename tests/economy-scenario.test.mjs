import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const model = JSON.parse(await readFile(new URL("../data/economy/civic-quarter-market.json", import.meta.url), "utf8"));
assert.equal(model.schema, "singularity-city.economy-scenario.v1");
assert.equal(model.status, "authored-simulation-fixture");
assert.equal(model.scenario.currency.type, "SimulatedCurrency");
assert.equal(model.scenario.currency.redeemable, false);
assert.equal(model.scenario.currency.decimalPlaces, 2);

const actors = new Map(model.actors.map(actor => [actor.id, actor]));
const accounts = new Map(model.accounts.map(account => [account.id, account]));
assert.equal(actors.size, model.actors.length, "actor IDs must be unique");
assert.equal(accounts.size, model.accounts.length, "account IDs must be unique");
for (const account of model.accounts) assert.ok(actors.has(account.actorId), "unknown account actor: " + account.actorId);
for (const actor of model.actors) assert.ok(actor.economyEntityId, "missing Economy owner identity: " + actor.id);

const balances = new Map(model.accounts.map(account => [account.id, 0]));
const operationIds = new Set();
const issuance = model.scenario.initialIssuance;
assert.ok(accounts.has(issuance.accountId), "initial issuance account must exist");
assert.ok(issuance.amount > 0);
balances.set(issuance.accountId, issuance.amount);
operationIds.add(issuance.operationId);

for (const operation of model.operations) {
  assert.ok(!operationIds.has(operation.id), "duplicate operation identity: " + operation.id);
  operationIds.add(operation.id);
  assert.ok(Number.isFinite(operation.amount) && operation.amount > 0, "ledger amounts must be positive");
  assert.equal(Number(operation.amount.toFixed(model.scenario.currency.decimalPlaces)), operation.amount, "amount exceeds currency precision");
  if (operation.kind === "issue") {
    assert.ok(accounts.has(operation.toAccountId), "issuance destination must exist");
    balances.set(operation.toAccountId, balances.get(operation.toAccountId) + operation.amount);
  } else if (operation.kind === "transfer") {
    assert.ok(accounts.has(operation.fromAccountId) && accounts.has(operation.toAccountId), "transfer accounts must exist");
    assert.notEqual(operation.fromAccountId, operation.toAccountId, "transfer endpoints must differ");
    const nextSource = balances.get(operation.fromAccountId) - operation.amount;
    assert.ok(nextSource >= 0, "insufficient simulated funds for " + operation.id);
    balances.set(operation.fromAccountId, nextSource);
    balances.set(operation.toAccountId, balances.get(operation.toAccountId) + operation.amount);
  } else if (operation.kind === "retire") {
    assert.ok(accounts.has(operation.fromAccountId), "retirement source must exist");
    const nextSource = balances.get(operation.fromAccountId) - operation.amount;
    assert.ok(nextSource >= 0, "insufficient simulated funds for " + operation.id);
    balances.set(operation.fromAccountId, nextSource);
  } else {
    assert.fail("unsupported ledger operation kind: " + operation.kind);
  }
}

const derived = [...balances].map(([accountId, amount]) => ({ accountId, amount })).sort((a, b) => a.accountId.localeCompare(b.accountId));
const expected = [...model.expectedBalances].sort((a, b) => a.accountId.localeCompare(b.accountId));
assert.deepEqual(derived, expected, "expected balances must derive from the ordered journal");
const total = derived.reduce((sum, entry) => sum + entry.amount, 0);
const issued = issuance.amount + model.operations.filter(op => op.kind === "issue").reduce((sum, op) => sum + op.amount, 0);
const retired = model.operations.filter(op => op.kind === "retire").reduce((sum, op) => sum + op.amount, 0);
assert.equal(total, model.expectedTotalSupply, "total supply must equal explicit issuance less retirement");
assert.equal(total, issued - retired);

for (const shop of model.shops) {
  assert.ok(actors.has(shop.ownerActorId), "unknown shop owner: " + shop.ownerActorId);
  assert.equal(shop.economyConcept, "EconomyShop");
  for (const product of shop.products) {
    assert.ok(product.id && product.name);
    assert.ok(product.price >= 0);
    assert.equal(product.economyConcept, "CommerceItem");
    assert.equal(product.currency, model.scenario.currency.name);
    assert.ok(Number.isInteger(product.quantity) && product.quantity >= 0);
  }
  for (const offer of shop.offers) {
    assert.ok(shop.products.some(product => product.id === offer.itemId), "offer references missing product: " + offer.id);
    assert.equal(offer.economyConcept, "MarketplaceOffer");
  }
}

console.log("Economy scenario validated: " + actors.size + " actors, " + accounts.size + " accounts, " + operationIds.size + " operations, " + total.toFixed(2) + " " + model.scenario.currency.symbol + " total supply.");
