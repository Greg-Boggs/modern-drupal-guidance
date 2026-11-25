import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { loadVectors, searchUseCases, type EmbedderLike } from "./search.ts";
import { resolveSkillsCliDataDir } from "./data-dir.ts";

// scripts/run-tests.ts builds the fixture guides and points MDG_DATA_DIR at the result.

describe("searchUseCases (fixture corpus)", () => {
  const cases: Array<[string, string]> = [
    ["hook attribute", "fixture-oop-hooks"],
    ["react when a node is saved", "fixture-oop-hooks"],
    ["cache tags render array", "fixture-cache-tags"],
    ["stale page after editing content", "fixture-cache-tags"],
    ["single directory component", "fixture-sdc-card"],
    ["twig component props", "fixture-sdc-card"],
  ];
  for (const [query, expected] of cases) {
    it(`ranks ${expected} first for "${query}"`, async () => {
      const results = await searchUseCases(query);
      assert.equal(results[0]?.id, expected, JSON.stringify(results.map((r) => r.id)));
      assert.ok(results[0].tokenCount > 0);
    });
  }

  it("returns [] for out-of-scope queries", async () => {
    for (const q of ["best pizza in new york", "kubernetes ingress controller"]) {
      assert.deepEqual(await searchUseCases(q), [], q);
    }
  });

  it("respects the limit", async () => {
    assert.ok((await searchUseCases("drupal", 1)).length <= 1);
  });

  it("stores unit-length chunk vectors", () => {
    const items = loadVectors(resolveSkillsCliDataDir());
    assert.ok(items.length > 0);
    for (const item of items) {
      if (item.vector.length === 0) continue;
      let sumSq = 0;
      for (let i = 0; i < item.vector.length; i++) sumSq += item.vector[i] ** 2;
      assert.ok(Math.abs(Math.sqrt(sumSq) - 1) < 0.001, item.id);
    }
  });

  it("works with a custom EmbedderLike and falls back to BM25 below the dense floor", async () => {
    const zero: EmbedderLike = { embed: async () => Array.from({ length: 256 }, () => 0) };
    const results = await searchUseCases("LegacyHook", 10, 0.3, zero);
    assert.equal(results[0]?.id, "fixture-oop-hooks");
    assert.deepEqual(await searchUseCases("zzzz qqqq", 10, 0.3, zero), []);
  });

  it("loadVectors reports missing or corrupt files", (t) => {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mdg-vectors-"));
    t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
    assert.throws(() => loadVectors(dir), /Run 'pnpm build' first/);
    const src = path.join(resolveSkillsCliDataDir(), "gen");
    for (const f of ["guide-chunks.json.gz", "guide-chunks.i8"]) fs.copyFileSync(path.join(src, f), path.join(dir, f));
    fs.writeFileSync(path.join(dir, "guide-chunks.scale.f32"), Buffer.alloc(3));
    assert.throws(() => loadVectors(dir), /Corrupt vector scale file/);
  });
});
