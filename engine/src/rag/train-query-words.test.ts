import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { retrainTable, quantizeAndExportStaticModel, loadStaticTable, readMeta, type StaticTable } from "./train-query-words.ts";
import { STATIC_DIMS } from "./quantize.ts";

const D = STATIC_DIMS;

function baseTable(words: string[]): StaticTable {
  const E = new Float32Array(words.length * D);
  words.forEach((_, i) => (E[i * D + i] = 1)); // orthogonal unit vectors
  return { words, E, W: new Float32Array(words.length).fill(1) };
}

describe("retrainTable", () => {
  it("derives vectors for new corpus words from their context and keeps base rows", () => {
    const base = baseTable(["cache", "tags", "render", "array", "hook", "attribute"]);
    const chunks = [
      ["drush", "cache", "tags"],
      ["hook", "attribute", "hook_form_alter"],
      ["render", "array"],
    ];
    const { table, derived } = retrainTable(base, 6, chunks);
    assert.deepEqual(derived, ["drush", "hook_form_alter"]);
    assert.deepEqual(table.words.slice(0, 6), base.words);
    const row = (w: string) => table.E.subarray(table.words.indexOf(w) * D, (table.words.indexOf(w) + 1) * D);
    // "drush" appears next to cache/tags only.
    assert.ok(row("drush")[0] > 0 && row("drush")[1] > 0);
    assert.equal(row("drush")[4], 0);
    // "hook_form_alter" blends its context and its known part "hook".
    assert.ok(row("hook_form_alter")[4] > row("hook_form_alter")[5]);
    // Weights are corpus IDF; words absent from the corpus get the median.
    assert.ok(table.W.every((w) => w > 0));
  });

  it("drops previously derived rows on rerun (baseVocabSize)", () => {
    const base = baseTable(["cache", "tags", "stale"]);
    const { table } = retrainTable(base, 2, [["cache", "tags"]]);
    assert.deepEqual(table.words, ["cache", "tags"]);
  });
});

describe("quantizeAndExportStaticModel / loadStaticTable", () => {
  it("round-trips a table with high fidelity", (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mdg-words-"));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    const table = baseTable(["alpha", "beta", "gamma", "delta"]);
    table.W.set([0.5, 1, 1.5, 2]);
    const res = quantizeAndExportStaticModel(table, dir);
    assert.equal(res.vocabSize, 4);
    assert.ok(res.minCosine > 0.999);
    const back = loadStaticTable(dir);
    assert.deepEqual(back.words, table.words);
    for (let i = 0; i < 4; i++) assert.ok(Math.abs(back.W[i] - table.W[i]) < 1e-5);
    assert.equal(readMeta(dir), null);
  });

  it("the committed table records its provenance", () => {
    const meta = readMeta();
    assert.ok(meta, "src/rag/gen/query-words.meta.json should exist (run pnpm train:words)");
    assert.equal(meta.baseVocabSize, 29165);
    assert.ok(loadStaticTable().words.length === meta.baseVocabSize + meta.derivedWords);
  });
});
