import { describe, it } from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { retrieveUseCase, formatCoreTargetBanner } from "./retrieve.ts";
import { parseVersion } from "../core/drupal-version.ts";
import type { CoreTarget } from "../core/mdgrc.ts";

const target = (v: string, source: CoreTarget["source"] = ".mdgrc"): CoreTarget => ({
  version: parseVersion(v),
  display: v,
  source,
  file: "/x",
});

function projectWith(t: import("node:test").TestContext, files: Record<string, unknown>): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "mdg-retrieve-"));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  fs.mkdirSync(path.join(dir, ".git"));
  for (const [name, content] of Object.entries(files)) fs.writeFileSync(path.join(dir, name), JSON.stringify(content));
  return dir;
}

describe("formatCoreTargetBanner", () => {
  const hooks = { id: "fixture-oop-hooks", drupalCore: ">=11.1" };

  it("is empty without a target", () => {
    assert.equal(formatCoreTargetBanner(hooks, null), "");
  });

  it("says to use the main approach when the target is in range", () => {
    const b = formatCoreTargetBanner(hooks, target("11.2"));
    assert.match(b, /\[!NOTE\]/);
    assert.match(b, /Project target: Drupal core 11\.2\*\* \(from `\.mdgrc`\)/);
    assert.match(b, /use its main approach/);
  });

  it("says to use the fallback when the target is older", () => {
    const b = formatCoreTargetBanner(hooks, target("10.3", "composer.lock"));
    assert.match(b, /\[!IMPORTANT\]/);
    assert.match(b, /older than this guide's range, Drupal core 11\.1 and later/);
    assert.match(b, /fallback/);
  });

  it("warns when the target is newer than a bounded range", () => {
    const b = formatCoreTargetBanner({ id: "x", drupalCore: "^10.3" }, target("11.1"));
    assert.match(b, /outside this guide's range/);
  });
});

describe("retrieveUseCase", () => {
  it("returns the guide with a banner from the project's composer.lock", async (t) => {
    const cwd = projectWith(t, { "composer.lock": { packages: [{ name: "drupal/core", version: "10.4.2" }] } });
    const out = await retrieveUseCase("fixture-oop-hooks", { cwd });
    assert.match(out, /^> \[!IMPORTANT\]\n> \*\*Project target: Drupal core 10\.4\.2\*\* \(from `composer\.lock`\)/);
    assert.ok(out.includes("# Implement hooks with the Hook attribute"));
  });

  it("returns the guide unchanged when no target is found", async (t) => {
    const cwd = projectWith(t, {});
    const out = await retrieveUseCase("fixture-sdc-card", { cwd });
    assert.ok(out.startsWith("# Build a card as a Single Directory Component"));
  });

  it("throws for an unknown id", async () => {
    await assert.rejects(() => retrieveUseCase("nope"), /No guide found for use case: nope/);
  });
});
