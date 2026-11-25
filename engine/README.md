# Modern Drupal Guidance engine

The engine builds the guides in `../guides` into a searchable index, ships the `modern-drupal-guidance` CLI and agent skill, and hosts `legacy-scan`. It is a fork of [Modern Web Guidance](https://github.com/GoogleChrome/modern-web-guidance-src) (Apache-2.0; see `NOTICE`), with the web content and Google infrastructure removed and a Drupal version layer added.

## Quick start

Requires Node.js 22.18 or later and pnpm (through `corepack`). Scripts run TypeScript with `node --import tsx`, so they also work on Node builds without type stripping.

```sh
corepack pnpm install
corepack pnpm build            # ../guides → dist/skills-cli
corepack pnpm build:fixtures   # test-fixtures/guides → dist/fixtures-cli
corepack pnpm typecheck
corepack pnpm test             # builds the fixtures first, then runs the suite
```

Try the built CLI:

```sh
node dist/fixtures-cli/skills/modern-drupal-guidance/modern-drupal-guidance.mjs search "cache tags render array"
node dist/fixtures-cli/skills/modern-drupal-guidance/modern-drupal-guidance.mjs retrieve fixture-cache-tags
```

Nothing here publishes to npm or to plugin marketplaces.

## Scripts

| Script | What it does |
|---|---|
| `build` | Builds the package in `dist/skills-cli` from `../guides`. Flags: `--guides <dir>`, `--out <dir>`, `--version <x.y.z>`, `--strict`. |
| `build:fixtures` | Same, from `test-fixtures/guides` into `dist/fixtures-cli`. |
| `build:guides` | Builds only the index and guide files (no bundles) into `out/build/skills-cli`. Flags: `--guides`, `--output`, `--strict`, `--force`, `--no-chunking`, and an optional guide directory to build alone. |
| `validate` | Validates every guide without building. Exits 1 on any error. Flag: `--guides <dir>`. |
| `train:words` | Retrains the search word table on the corpus. See [`src/rag/README.md`](src/rag/README.md). |
| `cli` | Runs the CLI from source: `corepack pnpm cli search "…"`. Reads `out/build/skills-cli` (run `build:guides` first) or `MDG_DATA_DIR`. |
| `typecheck`, `test`, `lint` | `tsc`; the test suite (`scripts/run-tests.ts`); oxlint. |

**Invalid guides.** By default a build skips guides that fail validation and prints every error, so one in-progress guide does not break other workstreams. Pass `--strict` (release, CI) to fail instead. Drafts (`draft: stub | wip | blocked`) are never built.

## Layout

```
skill/SKILL.md          Agent skill template (SKILL_VERSION is stamped at build time)
src/cli/                CLI entry (modern-drupal-guidance.ts), skill install/update, runner detection
src/cli/template/       Package files copied into dist: package.json, README, plugin manifests
src/core/               Paths, guide validation, macros, Drupal version layer, .mdgrc
src/build/              build-guides.ts (index), build-dist.ts (package), validate-guides.ts
src/rag/                BM25 + static-vector search, retrieve, word table in gen/
src/legacy-scan/        Scanner host and rule registry (no rules yet)
test-fixtures/guides/   Three placeholder guides for tests; not distributed
scripts/run-tests.ts    Test runner
```

Built package (`dist/skills-cli/`):

```
package.json  LICENSE  NOTICE  README.md  THIRD_PARTY_NOTICES
.claude-plugin/  .codex-plugin/  .cursor-plugin/  .github/plugin/  .grok-plugin/  .agents/plugins/
gemini-extension.json  kimi.plugin.json  plugin.json  policies/
skills/modern-drupal-guidance/
  SKILL.md  skill-version.txt
  modern-drupal-guidance.mjs        bin entry
  search.mjs  legacy-scan.mjs       lazily loaded bundles
  gen/guides.json                   guide metadata
  gen/guide-chunks.{json.gz,i8,scale.f32}  search index
  gen/query-words.{json,i8,scale.f32}      word table
  guides/<category>/<id>.md         built guides served by retrieve
```

## CLI contract

For the MCP server, the site and anything else that calls the CLI. Invoke as `npx -y modern-drupal-guidance@latest <command>` once published, or `node <dist>/skills/modern-drupal-guidance/modern-drupal-guidance.mjs <command>` against a local build. Output is UTF-8. Errors go to stderr.

| Command | Output (stdout) | Exit |
|---|---|---|
| `search <query…>` | JSON array, at most 10: `[{"id": string, "description": string}]`, best first. One object per line. `[]` when nothing matches. All words after `search` form the query. | 0; 1 if no query or the index is missing |
| `list` | JSON array of every published guide, same shape as `search`, one object per line, ordered by category then id. | 0 |
| `retrieve <ids…>` | For each ID, `\n--- Guide for <id> ---\n` then the guide's Markdown. IDs can be separated by commas, semicolons or spaces; stray quotes are stripped; duplicates are dropped; order is kept. | 0; 1 if any ID is unknown (found guides are still printed, the error goes to stderr) |
| `legacy-scan [path] [--json]` | Findings for legacy Drupal patterns. With `--json`, the object below. | 0; 1 on bad arguments or path |
| `set-core <version>` | `Set target Drupal core to <v> in <path>.` Writes `{ "drupalCore": "<v>" }` to `.mdgrc` at the project root. | 0; 1 if the version is invalid |
| `target [--json]` | The target core version `retrieve` will use. `--json`: `{"drupalCore": "10.3", "source": ".mdgrc" \| "composer.lock" \| "composer.json", "file": string}` or `null`. | 0 |
| `install [--choose] [skills add flags]` | Runs `skills add <source> --skill modern-drupal-guidance` through `npx -y`, `pnpx` or `yarn dlx`, matching the calling package manager. `<source>` is `MDG_SKILL_SOURCE` or a placeholder until the publish repository exists. | the runner's exit code |
| `update`, `uninstall` | Runs `skills update` / `skills remove` for the skills next to the CLI. | the runner's exit code |
| `--version`, `-v` | Package version. | 0 |
| `--help`, `-h` | Usage. | 0 |

**Global flag.** `--skill-version <v>` is passed by `SKILL.md`. If it is more than 5 days older than the bundled `skill-version.txt`, the CLI prints an update warning to stderr (and a stronger one after 60 days). It never changes stdout.

**Large retrieve output.** When the combined `retrieve` output is over 9,500 bytes and stdout is not a file, the guides are written to `<tmpdir>/mdg-guide-<pid>-<time>.md` and stdout is two lines: `Output (<size> KB, <n> lines) saved to <path> to prevent CLI stdout truncation.` and an instruction to read it. Redirect stdout to a file (`> out.md`) to always get the Markdown directly. MCP wrappers should redirect, or read the file named on the first line.

**Retrieved guide format.** Each guide starts with its H1, then a `**Drupal core:** <range> (\`<constraint>\`).` line (plus `Currently supported releases in range: …` when `data/drupal/releases.json` exists). When the project has a target core version, a GitHub alert comes before the H1:

- `> [!NOTE]` … `use its main approach` when the target is in range;
- `> [!IMPORTANT]` … `Use the guide's fallback for older core versions` when the target is below the range;
- `> [!IMPORTANT]` … `is outside this guide's range` when it is above a bounded range.

The target comes from `.mdgrc` (`drupalCore`), then `composer.lock` (installed `drupal/core` or `drupal/core-recommended`), then `composer.json` (lowest version the `drupal/core*` constraint allows), searching up from the working directory to the nearest `.git`.

**`legacy-scan --json` shape.**

```json
{
  "targetDir": "web/modules/custom",
  "totalFindings": 1,
  "guides": [
    {
      "guideId": "oop-hooks",
      "retrieveCommand": "npx modern-drupal-guidance retrieve oop-hooks",
      "count": 1,
      "rules": [
        {
          "ruleId": "procedural-hook",
          "summary": "…",
          "verifierRubric": { "keepWhen": ["…"], "dropWhen": ["…"] },
          "count": 1,
          "findings": [{ "file": "mymodule.module", "line": 12, "message": "…", "lineContent": "function mymodule_node_presave(…)" }]
        }
      ]
    }
  ],
  "activeRuleCount": 1,
  "activeGuideCount": 1,
  "scannedFileCount": 40,
  "eligibleFileCount": 40,
  "truncatedByMaxFiles": false,
  "skippedDocsAndTestsCount": 0,
  "note": "…"
}
```

Other flags: `--guide <id>`, `--include-docs-and-tests`, `--max-files <n>` (default 5000, 0 = unlimited). The rule registry is empty today, so every scan reports 0 findings; see `src/legacy-scan/README.md`.

### Data files (for the site and MCP server)

`gen/guides.json` is `Array<{ id, description, category, title, drupalCore, tokenCount }>`. `guides/<category>/<id>.md` is the Markdown `retrieve` prints, without the target banner. Read these directly rather than shelling out when you only need metadata.

### Environment variables

| Variable | Effect |
|---|---|
| `MDG_GUIDES_DIR` | Guides root for builds and validation (same as `--guides`). |
| `MDG_DATA_DIR` | Data directory the CLI reads (`gen/` and `guides/`); defaults to the bundle's own directory, or `out/build/skills-cli` in source mode. |
| `MDG_DRUPAL_DATA_DIR` | Drupal dataset directory; defaults to `../data/drupal`. |
| `MDG_SKILL_SOURCE` | `skills add` source used by `install`. |
| `ENABLE_FILE_LOGGING=true`, `MDG_LOG_DIR` | Append tool calls to `modern-drupal-guidance.log` (used by evals). |

## Guides and the Drupal version layer

The engine reads `<guides>/<category>/<slug>/guide.md`. Directories starting with `.` or `_` are ignored. Required frontmatter (see the project README and `guides/CONTRIBUTING.md`):

```yaml
---
name: oop-hooks                  # must equal the directory name
description: "Implement hooks as class methods with the #[Hook] attribute."  # quote values that contain " #"
drupal-core: ">=11.1"            # Composer constraint, quoted
draft: stub                      # optional: stub | wip | blocked (blocked needs draft-reason)
---
```

`description` may be omitted on discipline guides (`<category>/<category>/guide.md`) and stubs. Extra fields are allowed. Validation also checks headings, code fences, callouts, anchor links, HTML outside code, and unquoted ` #` in frontmatter values (YAML would silently cut the value there).

`drupal-core` accepts Composer syntax: `>=11.1`, `^10.3 || ^11`, `~10.2.0`, `>=10.3 <12`, `11.x`, `10.3 - 11.1`. `src/core/drupal-version.ts` parses it into version intervals and renders it ("Drupal core 10.3 to 11.x").

Macros in guide bodies:

| Macro | Renders |
|---|---|
| `{{ DRUPAL_STATUS() }}` | `**Drupal core:** <guide's range> (\`<constraint>\`).` If a guide does not use it, the build inserts that line after the H1. |
| `{{ DRUPAL_STATUS(">=11.1") }}` | The same for an explicit range, for a section that needs a newer core than the rest of the guide. |
| `{{ GUIDE_REF("slug") }}` | `` `slug` (via `npx -y modern-drupal-guidance@latest retrieve "slug"`) ``; fails the build if the guide does not exist. |
| `{{ INCLUDE("./file.md#section") }}` | Transcludes a file or one section of it. `./` paths are relative to the guide; bare paths to the guides root. |
| `{# … #}` | Author comment, stripped from output. Twig comments inside code fences are kept. |

**Dataset hook.** `src/core/drupal-data.ts` reads `../data/drupal/releases.json` when it exists and `DRUPAL_STATUS` lists the supported releases in a guide's range. Wiring `deprecations.json` into validation (flag removed APIs inside a guide's range) is marked `WIRING POINT` in `src/core/drupal-data.ts` and `validateDrupalCore` in `src/core/guide-validation.ts`.

## Search

Local BM25 fused with static word vectors; no network. The word table is retrained offline on the Drupal corpus with `corepack pnpm train:words`. Rerun it, then `build`, when guides are added or rewritten. Details, limits and the `--check` mode for CI are in [`src/rag/README.md`](src/rag/README.md).

## What changed from upstream

**Kept:** the build pipeline (chunking, macros, comment stripping, validation of Markdown structure), BM25 + static-vector search and reciprocal rank fusion, the `search` / `list` / `retrieve` contract and large-output spilling, skill install/update/uninstall through the `skills` CLI with runner detection, skill-version update warnings, the multi-agent plugin manifests, the esbuild bundling and third-party notices, the legacy-scan framework, and the eval harness code (disabled). `LICENSE` is unchanged; `NOTICE` credits upstream.

**Removed:** all web guides and `features/` data; the Baseline / web-features layer (`BASELINE_STATUS`, `FEATURE`, `FEATURE_FALLBACKS`, `FEATURE_ISSUES`, `web-feature-ids`, origin-trial and volatile-feature gates, `baselinestatus`, `set-baseline`, `set-allow-*`) and its dependencies (`web-features`, `@mdn/browser-compat-data`, `caniuse-lite`, `@webref/*`, `mdn-data`); Clearcut telemetry and its watchdog; Google Cloud Storage upload and download; Gemini release notes and Gemini embedding of chunks; the devsite build target; CLA, ATL, guide-sync, publish and Pages workflows (`.github/`), CODEOWNERS and governance docs; the Chrome Extensions skill; the web legacy-scan rules; upstream agent skills (`.agents/`); the web retrieval benchmarks; the publish script.

**Changed:** package, CLI and skill renamed to `modern-drupal-guidance`; build reads `../guides`; `drupal-core` frontmatter and `DRUPAL_STATUS`; `.mdgrc` with `drupalCore` and composer detection replaces the Baseline target; new `set-core` and `target` commands; `SKILL.md` rewritten for Drupal with a target core version policy; chunk vectors built offline from the word table; the word table retrained on the Drupal corpus; the tokenizer keeps snake_case identifiers; invalid guides are skipped unless `--strict`; categories are taken from the guides tree.

## Disabled: eval harness

`src/harness`, `src/grading`, `src/authoring`, `src/dashboard`, `bin/gd.ts`, `src/core/eval-inventory.ts`, `src/core/grader-*`, `src/core/patch-utils.ts`, `src/build/collect-eval-results.ts`, `src/legacy-scan/eval` and `src/legacy-scan/llm-verifier.ts` are kept as upstream wrote them but are not part of `typecheck`, `test` or any script. They still target web base apps and upstream agent runners, and some imports point at modules this fork removed (`baseline.ts`, `feature-gates.ts`, `mwgrc.ts`, `cli/telemetry/`). Their dev dependencies (Playwright, agent CLIs, `diff`, `gh-pages`, `statikk`) were dropped from `package.json`. `docs/EVALS.md` describes the upstream harness. Porting it to Drupal (DDEV base sites, PHPUnit and Playwright graders) is a later workstream.
