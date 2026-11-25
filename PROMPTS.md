# Session prompts

Each section is one top-level Claude session. The prompt text inside the fence is sent to the session verbatim. Project root: `/home/me/sites/modern-drupal-guidance-claude`.

---

## 1. Engine fork

Model: Opus · Effort: high · Owns: `engine/`

```text
Read README.md in the project root first. You own engine/ and may write only there.

Fork https://github.com/GoogleChrome/modern-web-guidance-src into engine/ (clone it, then remove its .git so engine/ is plain files in this project). Turn it into the engine for Modern Drupal Guidance:

1. Rebrand: package and CLI name modern-drupal-guidance, skill name modern-drupal-guidance, plugin manifests, README, SKILL.md template. Remove Google, Chrome and Modern Web Guidance branding. Keep LICENSE and add a NOTICE crediting the upstream project.
2. Remove Google-specific infrastructure: Clearcut telemetry, Google Cloud Storage uploads, Gemini release notes, CLA and ATL workflows, devsite target. Keep the eval harness code but leave it disabled; do not delete it.
3. Delete all web guides under engine/guides and the web features/ data. Point the build at the project-level guides/ directory (../guides) instead.
4. Replace the Baseline and web-features layer (web-feature-ids, BASELINE_STATUS, FEATURE, FEATURE_FALLBACKS, FEATURE_ISSUES macros, browser-compat-data, web-features and caniuse dependencies) with a Drupal version layer driven by the drupal-core frontmatter field described in README.md. Add a DRUPAL_STATUS macro that renders the supported core range. Leave a clear hook for a later dataset in data/drupal/.
5. Rewrite the SKILL.md template for Drupal: trigger on Drupal module, theme, Twig, YAML config, Drush, Composer and recipe work; replace the browser-support policy section with a target core version policy.
6. Add three small placeholder guides only for testing, in engine/test-fixtures/guides (not in guides/), and make the build, search and retrieve work end to end against them and against whatever exists in ../guides.
7. Retrain or regenerate the search word list so it works on the Drupal corpus, and document how to rerun that when guides change.

Done means: pnpm install, pnpm build, pnpm typecheck and pnpm test pass; the built CLI answers search and retrieve against the fixtures; the CLI interface (commands, flags, JSON output shape) is documented in engine/README.md for other workstreams. Do not publish to npm. Finish with a summary of what you kept, removed and changed, and anything left undone.
```

---

## 2. Authoring spec and seed guides

Model: Opus · Effort: high · Owns: `guides/`

```text
Read README.md in the project root first. You own guides/ and may write only there.

Write the authoring spec and the first Drupal guides for Modern Drupal Guidance. Use the upstream project as the model for format and tone: read https://github.com/GoogleChrome/modern-web-guidance-src, especially guides/CONTRIBUTING.md, .agents/skills/project-guides/SKILL.md, .agents/skills/project-discipline-guides/SKILL.md and a few guides such as guides/ui-components/navigation-drawer/guide.md. Clone it to your scratchpad to read it; do not copy it into the project.

1. guides/CONTRIBUTING.md: the full authoring spec. Frontmatter schema (must include the minimum fields in README.md; add fields such as deprecated-apis or replaces if they help), body structure, how to write for a coding agent, how to handle older supported core versions, file layout per guide (guide.md, a demo module or recipe in place of demo.html, expectations.md), and draft stages.
2. The category list, with one sentence per category. Cover at least module development, configuration and recipes, entities and fields, theming and components, front-end JavaScript, Form API, caching and performance, security, testing, Composer and tooling, migration, and headless and APIs.
3. A discipline guide for every category at guides/<category>/<category>/guide.md.
4. Complete, accurate use-case guides for the patterns agents most often get wrong, at least: OOP hooks with #[Hook], plugin attributes instead of annotations, dependency injection and autowiring in services, controllers and forms, cache tags, contexts and max-age, lazy builders, Single Directory Components, core/once and Drupal behaviors, and config actions in Recipes. Each one gets guide.md and expectations.md.
5. Stub guides (draft: stub, frontmatter only) for at least 20 more use cases across the remaining categories.

Check every API, attribute, service name and version number against api.drupal.org, drupal.org change records or Drupal core source. Do not guess versions. Done means every non-draft guide has valid frontmatter, compiles to correct PHP, Twig and YAML, and names the core version it needs. Finish with a list of the guides you wrote, the stubs, and any claims you could not verify.
```

---

## 3. Drupal version and deprecation data

Model: Sonnet · Effort: medium · Owns: `data/drupal/`

```text
Read README.md in the project root first. You own data/drupal/ and may write only there.

Build a machine-readable dataset of Drupal core versions and API changes for the version layer and the legacy scanner.

1. data/drupal/releases.json: every Drupal core minor release from 9.0 through the current release, with release date, security support end date, minimum PHP version, and whether it is currently supported. Source: drupal.org release history and the drupal.org core release cycle pages.
2. data/drupal/deprecations.json: deprecated and removed APIs from 9.0 onward. For each: the symbol (function, class, method, service, hook, annotation, library or YAML key), deprecated-in version, removed-in version, the replacement, and the drupal.org change record URL. Prioritize APIs coding agents still use: procedural hooks that gained OOP equivalents, plugin annotations replaced by attributes, drupal_set_message, db_query and other db_* functions, entity_load and similar wrappers, jquery.once, file_* functions, user_* wrappers, and anything removed in 10.0 or 11.0. Use change records at drupal.org/list-changes/drupal and the deprecation messages in Drupal core source.
3. data/drupal/features.json: notable new APIs by version (for example #[Hook] in 11.1, Recipes, Single Directory Components, plugin attributes, htmx), each with the version it arrived and a change record URL.
4. A JSON Schema for each file, and data/drupal/README.md describing the files, sources and how to refresh them.
5. A small script in data/drupal/scripts/ that validates the JSON against the schemas.

Every entry needs a source URL. Leave an entry out rather than guess a version. Done means the validation script passes and the README explains the refresh process. Finish with entry counts per file and any gaps.
```

---

## 4. Drupal legacy scan rules

Model: Opus · Effort: high · Owns: `legacy-scan/`

```text
Read README.md in the project root first. You own legacy-scan/ and may write only there.

Design and build the Drupal rule set for legacy-scan. Upstream's scanner lives in https://github.com/GoogleChrome/modern-web-guidance-src under src/legacy-scan (read its README.md, LEXICON.md, schema.ts, scanners/ and rules/). Clone it to your scratchpad to read it. Match its rule schema, including the keepWhen and dropWhen rubric, so these rules can later be plugged into the engine's src/legacy-scan with minimal glue.

1. legacy-scan/DESIGN.md: which file types to scan (PHP, Twig, YAML, .info.yml, .libraries.yml, JS), how each scanner parses them, and whether to wrap existing tools (drupal-rector, phpstan-drupal, upgrade_status) or match patterns directly. Make a recommendation and justify it.
2. Rules, each with tests of true positives and look-alike false positives, for at least: procedural hook implementations that have #[Hook] equivalents, plugin annotations that have attribute equivalents, \Drupal:: static calls inside classes that support dependency injection, drupal_set_message and other removed functions, db_* functions, jQuery once and jquery.once library dependencies, missing or outdated core_version_requirement, render arrays without cache metadata where it is required, and #markup containing unsanitized variables.
3. Each rule names the guide id it points to. Use the slugs from guides/ if they exist; otherwise use a clear slug and list it in your final message.
4. A standalone runner so the rules can be tested now: legacy-scan <path> --json prints findings in the upstream JSON shape.
5. A fixtures directory with a small legacy Drupal module and a modern one; the legacy one triggers every rule and the modern one triggers none.

Done means all rule tests pass and the runner produces correct output on both fixtures. Finish with the rule list, known false-positive risks, and guide ids that do not exist yet.
```

---

## 5. MCP server

Model: Sonnet · Effort: medium · Owns: `mcp/`

```text
Read README.md in the project root first. You own mcp/ and may write only there.

Build an MCP server that exposes Modern Drupal Guidance to MCP clients. It wraps the modern-drupal-guidance CLI, whose interface matches upstream's (https://github.com/GoogleChrome/modern-web-guidance: search "<query>" returns JSON [{ "id", "description" }], retrieve "<id>[,<id>...]" returns guide Markdown, list returns all guides). If engine/README.md documents the interface, follow it; otherwise follow upstream.

1. A TypeScript MCP server using the official @modelcontextprotocol/sdk over stdio, with tools search_guides, retrieve_guides and list_guides, and each guide exposed as an MCP resource.
2. Tool descriptions that tell the agent when to call them, adapted from the upstream SKILL.md for Drupal work.
3. Configuration for the CLI path, defaulting to npx modern-drupal-guidance@latest and allowing a local build path.
4. Tests using a fake CLI that returns fixture output, so the tests do not depend on the engine.
5. mcp/README.md with install snippets for Claude Code, Claude Desktop, Cursor and VS Code.

Done means the build and tests pass and the MCP Inspector or an equivalent smoke test lists the tools and runs a search against the fake CLI. Do not publish. Finish with the tool list and anything that waits on the engine.
```

---

## 6. Website

Model: Sonnet · Effort: medium · Owns: `site/`

```text
Read README.md in the project root first. You own site/ and may write only there.

Build the public website for Modern Drupal Guidance as a static site in site/ that reads guides from ../guides at build time, using the guide contract in README.md.

1. Use Eleventy or Astro; pick one and say why in site/README.md.
2. Pages: a landing page (what it is, why, quickstart for the CLI, agent plugins and MCP), a guide index grouped by category with search over names and descriptions, one page per non-draft guide showing its supported core range, and an about page crediting the upstream Modern Web Guidance project.
3. Skip drafts. Render code blocks with syntax highlighting for PHP, Twig, YAML and JS.
4. Accessible and responsive: semantic HTML, keyboard navigation, light and dark themes, works at phone width.
5. Seed site/fixtures/guides with three sample guides that follow the contract so the site builds before real guides exist, and fall back to them when ../guides is empty.
6. Prepare it for Cloudflare Pages: build command, output directory, and deploy instructions in site/README.md. Use the cf CLI in those instructions unless you add a Wrangler configuration file. Do not deploy.

Done means the site builds without errors, a local preview renders the fixture guides and any real guides in ../guides, and the README explains build and deploy. Finish with screenshots or the preview URL and what remains.
```

---

## 7. Drupal User Guide import

Model: Sonnet · Effort: medium · Owns: `import/user-guide/` and `guides/user-guide/`

```text
Read README.md in the project root first, especially "Content sources" and "Guide contract". You own import/user-guide/ and guides/user-guide/ and may write only there.

Write a repeatable import script that turns the English Drupal User Guide into guides for this project. The guide text must not be reworded, summarized or added to by you; the script transforms it mechanically.

Source: https://git.drupalcode.org/project/user_guide (Markdown in content/en/docs/, navigation in content/en/zensical.toml, CC BY-SA 2.0). The script clones or updates it into a cache directory outside the project, at a pinned commit that it records.

1. Put the script and its README in import/user-guide/. Any language already used in the project is fine; Node with TypeScript matches engine/.
2. Output one guide per page at guides/user-guide/<chapter>/<id>/guide.md, where <chapter> comes from the chapter the page sits in in zensical.toml (slugified) and <id> is the page's id frontmatter.
3. Frontmatter: name = id, description = the page's description, drupal-core = the range the User Guide itself states it covers (find it in the repo; do not guess), plus source-url (the page on drupal.org/docs/user_guide/en/), source-commit, and license: CC-BY-SA-2.0.
4. Body: the page's Markdown unchanged except for mechanical fixes: rewrite links between User Guide pages into the format engine/ uses for links between guides, make image links absolute URLs on drupal.org (or drop them with their alt text if no stable URL exists, and say which you chose), and strip Zensical-only syntax such as { #anchor } attributes. Add one attribution line at the end linking the source page and the license.
5. Skip pages that are not guidance: index, copyright, attributions, and the preface. Keep the glossary as one guide. List every skipped page in the README.
6. Write guides/user-guide/ATTRIBUTION.md from the User Guide's attributions page, and add a LICENSE file there with the CC BY-SA 2.0 notice.
7. Running the script twice in a row produces no changes. Running it after the User Guide changes updates only the affected guides and removes pages that were deleted upstream.

Done means: the script runs cleanly; every imported guide passes the engine's guide validation; pnpm build in engine/ includes them; and the built CLI's search returns relevant User Guide guides for at least five site-building queries such as "create a content type", "add a view", "place a block", "install a module" and "configure user roles". Show the commands and their output. Do not commit. Finish with the count of imported and skipped pages, the pinned commit, and anything the engine could not build.
```

---

## 8. Community benchmarks

Model: Opus · Effort: medium · Owns: `engine/src/harness/`, `engine/src/grading/`, `benchmarks/`

```text
Read README.md in the project root first. You own engine/src/harness/, engine/src/grading/ and benchmarks/ and may write only there. Another session may be importing guides and running pnpm build in engine/ at the same time; do not edit guides/, and if build output changes under you, rebuild and continue.

Turn the eval harness inherited from upstream (engine/src/harness and engine/src/grading, currently disabled; see engine/src/harness/README.md and docs/EVALS.md for how upstream uses it) into a Drupal benchmark that community volunteers run on their own machines with their own agent subscriptions, like SETI@home. There are no nightly runs and no central infrastructure.

1. Base app: a reproducible stock Drupal site (drupal/recommended-project, SQLite, Drush, no DDEV required), built by one script into a cache directory and reset to the same clean state before every trial. Pin the Drupal version.
2. Modes: unguided (no guidance), skill (the built modern-drupal-guidance skill and CLI) and mcp (the server in mcp/, wired through the agent's MCP config). Keep upstream's agent runners; Claude Code is required, the others are optional.
3. Pilot task set in benchmarks/tasks/: 10 tasks. Five site-building tasks matching guides in guides/user-guide/ (for example create a content type with fields, build a view, place a block, configure roles and permissions, set up a menu), and five code tasks matching the code guides in guides/ (OOP hooks, plugin attributes, dependency injection, cache metadata, behaviors with once). Each task is a one-paragraph developer prompt plus an expectations.md of observable checks, written plainly so a Drupal developer can review them.
4. Graders: prefer cheap, deterministic checks. Use drush config:get or config export for site-building results, the rules in legacy-scan/ and the deprecations in data/drupal/ for code, and drush cr, module install and an HTTP fetch of the rendered page for behavior. Use Playwright only where nothing else can check it. Calibrate each grader: a hand-written reference solution passes every check and the untouched base app fails every check except MUST NOT checks.
5. One command for volunteers, for example pnpm bench --agent claude-code --modes unguided,skill,mcp --tasks pilot, that prints a summary table (pass rate per mode and uplift) and writes one results file to benchmarks/results/<date>-<agent>-<model>-<id>.json. The file records agent, model, agent version, guidance version, Drupal version, OS, mode, per-check results, token counts if available, and each trial's diff so maintainers can re-grade it.
6. A dry-run mode that checks prerequisites and grader calibration without calling any model, so volunteers can verify their setup for free.
7. Point the upstream dashboard (engine/src/dashboard) at benchmarks/results/ so it aggregates every submitted file.
8. benchmarks/README.md: prerequisites, setup, the dry run, a full run, the expected token cost per run, how to submit results (a pull request adding the JSON file), and how maintainers re-grade a submission.

Do not run the benchmarks: no agent trials and no model calls of any kind. Verify only with the dry run and grader calibration for all 10 tasks. Do not commit. Finish with the calibration results, the commands you ran and their output, an estimate of the token cost per full run, and anything a volunteer could trip on.
```
