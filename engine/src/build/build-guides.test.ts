import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import zlib from "node:zlib";
import { processGuides } from "./build-guides.ts";
import { scanAllGuides } from "../core/guide-validation.ts";
import { fixtureGuidesDir } from "../core/paths.ts";

function tmp(t: import("node:test").TestContext, prefix: string): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  return dir;
}

describe("processGuides", () => {
  it("builds the fixture corpus and reuses the cache on an unchanged rebuild", async (t) => {
    const out = tmp(t, "mdg-build-out-");
    const cache = tmp(t, "mdg-build-cache-");
    const guides = scanAllGuides(fixtureGuidesDir);

    const first = await processGuides({ outputDir: out, pipelineCacheDir: cache, guides });
    assert.equal(first.skipped, false);
    assert.equal(first.guideCount, 3);
    assert.ok(first.chunkCount >= 6);

    const useCases = JSON.parse(fs.readFileSync(path.join(out, "gen/guides.json"), "utf8"));
    assert.deepEqual(Object.keys(useCases[0]).sort(), ["category", "description", "drupalCore", "id", "title", "tokenCount"]);
    const chunks = JSON.parse(zlib.gunzipSync(fs.readFileSync(path.join(out, "gen/guide-chunks.json.gz"))).toString());
    assert.equal(chunks.length, first.chunkCount);
    assert.equal(fs.statSync(path.join(out, "gen/guide-chunks.i8")).size, first.chunkCount * 256);
    assert.ok(chunks[0].chunkContent.includes("Drupal core"), "chunk header carries the core range");
    assert.ok(fs.existsSync(path.join(out, "guides/module-development/fixture-oop-hooks.md")));

    const second = await processGuides({ outputDir: out, pipelineCacheDir: cache, guides });
    assert.equal(second.skipped, true);
  });

  it("skips drafts and invalid guides, or fails on invalid guides when strict", async (t) => {
    const root = tmp(t, "mdg-build-guides-");
    const write = (rel: string, body: string) => {
      fs.mkdirSync(path.join(root, rel), { recursive: true });
      fs.writeFileSync(path.join(root, rel, "guide.md"), body);
    };
    write("testing/ok", '---\nname: ok\ndescription: Fine.\ndrupal-core: ">=10.3"\n---\n\n# OK\n\nBody.\n');
    write("testing/wip", '---\nname: wip\ndescription: Later.\ndrupal-core: ">=10.3"\ndraft: wip\n---\n\n# WIP\n\nBody.\n');
    write("testing/bad", "---\nname: bad\ndescription: No core.\n---\n\n# Bad\n\nBody.\n");
    const guides = scanAllGuides(root).filter((g) => g.isPublished);
    assert.deepEqual(guides.map((g) => g.name).sort(), ["bad", "ok"]);

    const out = tmp(t, "mdg-build-out-");
    const res = await processGuides({ outputDir: out, pipelineCacheDir: tmp(t, "mdg-c-"), guides });
    assert.equal(res.guideCount, 1);
    assert.equal(res.invalidCount, 1);

    await assert.rejects(
      () => processGuides({ outputDir: out, pipelineCacheDir: tmp(t, "mdg-c-"), guides, strict: true }),
      /Missing "drupal-core"/
    );
  });

  it("builds an empty index when there are no guides", async (t) => {
    const out = tmp(t, "mdg-build-empty-");
    const res = await processGuides({ outputDir: out, pipelineCacheDir: tmp(t, "mdg-c-"), guides: [] });
    assert.equal(res.guideCount, 0);
    assert.deepEqual(JSON.parse(fs.readFileSync(path.join(out, "gen/guides.json"), "utf8")), []);
  });
});
