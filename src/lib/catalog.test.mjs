// node src/lib/catalog.test.mjs
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const products = JSON.parse(readFileSync(new URL("../data/catalog.json", import.meta.url)));
const policy = products.find((p) => p.delivery.freeOver)?.delivery;
const FREE_OVER = policy?.freeOver ?? 100000;
const BASE_FEE = policy?.baseFee ?? 3500;
const shippingFor = (g) => (g === 0 || g >= FREE_OVER ? 0 : BASE_FEE);

assert.equal(shippingFor(0), 0, "empty cart ships free");
assert.equal(shippingFor(1), BASE_FEE, "a cheap cart pays the base fee");
assert.equal(shippingFor(FREE_OVER - 1), BASE_FEE, "one won short still pays");
assert.equal(shippingFor(FREE_OVER), 0, "exactly at the threshold is free");
assert.equal(shippingFor(FREE_OVER + 1), 0, "over the threshold is free");

// the catalogue itself must stay usable
assert.ok(products.length > 300, "catalogue is populated");
assert.ok(products.every((p) => p.id && p.name && p.price >= 0), "every product has an id, name and price");
assert.ok(products.every((p) => p.off === 0 || p.price < p.listPrice), "a discount always undercuts the list price");
assert.ok(products.every((p) => p.saleRank >= 1), "every product carries its sales-sort position");
const board = products.filter((p) => p.bestRank != null).sort((a, b) => a.bestRank - b.bestRank);
assert.equal(board.length, 20, "the 베스트 board holds the store's top 20");
assert.deepEqual(board.map((p) => p.bestRank), [...Array(20)].map((_, i) => i + 1), "board positions run 1..20 with no gaps");

console.log(`ok — ${products.length} products, free over ${FREE_OVER.toLocaleString("ko-KR")}원, base fee ${BASE_FEE}원`);
