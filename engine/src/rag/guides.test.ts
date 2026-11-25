import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { getGuide, getUseCase, getUseCases, getUseCasesByCategory } from "./guides.ts";

describe("guides.json (fixture build)", () => {
  it("lists every published fixture with its metadata", () => {
    const ids = getUseCases().map((u) => u.id).sort();
    assert.deepEqual(ids, ["fixture-cache-tags", "fixture-oop-hooks", "fixture-sdc-card"]);
    const hooks = getUseCase("fixture-oop-hooks")!;
    assert.equal(hooks.category, "module-development");
    assert.equal(hooks.drupalCore, ">=11.1");
    assert.equal(hooks.title, "Implement hooks with the Hook attribute");
    assert.ok(hooks.description.includes("#[Hook]"));
    assert.ok(hooks.tokenCount > 0);
    assert.deepEqual(getUseCasesByCategory("theming-and-components").map((u) => u.id), ["fixture-sdc-card"]);
  });

  it("serves built markdown with macros expanded and the core line present", async () => {
    const guide = await getGuide("fixture-cache-tags");
    assert.ok(guide);
    assert.ok(guide.startsWith("# Add cache metadata to render arrays"));
    assert.ok(guide.includes("**Drupal core:** 10.3 to 11.x (`^10.3 || ^11`)."), "inserted after the H1");
    assert.ok(guide.includes('`fixture-oop-hooks` (via `npx -y modern-drupal-guidance@latest retrieve "fixture-oop-hooks"`)'));
    assert.ok(!guide.includes("{{"));
  });

  it("returns null for an unknown guide", async () => {
    assert.equal(await getGuide("non-existent-id"), null);
  });
});
