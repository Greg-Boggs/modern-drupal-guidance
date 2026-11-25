# Milestones

Status of each workstream. The coordinating session updates this file; workstream sessions do not.

Status values: Not started · In progress · Ready for review · Done · Blocked

Last updated: 2026-11-24

## Wave 1: built, awaiting review

All six sessions have finished their turns. Nothing is committed.

| # | Workstream | Owns | Model / effort | Status | Notes |
|---|---|---|---|---|---|
| 1 | Engine fork | `engine/` | Opus / high | Ready for review | Install, build, typecheck and tests pass. CLI search and retrieve work against fixtures. Three guides in `guides/` are skipped until their frontmatter is fixed. |
| 2 | Authoring spec and seed guides | `guides/` | Opus / high | Partial | Hit the usage limit. Spec and 7 use-case guides written, with demo modules tested on Drupal 11.4 (and 10.6 where the range covers it). The guides are AI-written, so they stay `draft: wip` until a person reviews them. Not done: Recipes guide, discipline guides, stubs. |
| 3 | Drupal version and deprecation data | `data/drupal/` | Sonnet / medium | Ready for review | 20 releases, 1,823 deprecations, 28 features, each with a source URL. Validator passes. |
| 4 | Drupal legacy scan rules | `legacy-scan/` | Opus / high | Ready for review | 12 rules for 9 guides, 108 tests pass. Rules not yet qualified on held-out code. |
| 5 | MCP server | `mcp/` | Sonnet / medium | Ready for review | Build and 9 tests pass against a fake CLI. Not yet run against the real engine. |
| 6 | Website | `site/` | Sonnet / medium | Ready for review | Eleventy 3. Builds 6 pages from fixtures. Light theme and keyboard use only lightly checked. |

## Wave 2: next

| Workstream | Depends on | Model / effort | Status |
|---|---|---|---|
| Import the Drupal User Guide into `guides/` with a script (no rewording, attribution kept) | 1 | Sonnet / medium | Ready for review: 96 pages imported to `guides/<chapter>/<id>/`, 8 skipped, pinned at `8bd9dd86`, `drupal-core: ^11`. Reruns cleanly. The engine builds them, and search returns the right User Guide pages for the five test queries. |
| Community benchmarks: Drupal base app, 10 pilot tasks, calibrated graders, dry run, volunteer instructions. No trials are run by us. | 1, 4, 5 | Opus / medium | Ready for review: Drupal 11.4.13 on SQLite, 3 modes, 10 tasks with reference solutions, free dry run, `benchmarks/README.md`. No agent trials or model calls were made. |
| Import Drupal 11/12 change records into `guides/` by script (`import/change-records/`, verbatim, CC BY-SA) | 1 | Opus | Ready for review: 724 imported, 336 skipped. Categories reworked after review (203 moved). 827 guides validate. |
| Review change-record guides and add calibrated benchmark tasks (`change-records` suite) | Import | Opus | Ready for review: 91 `cr-*` tasks for 90 records, all calibrated. 463 records need no task, 171 need core newer than 11.4.13, 52 flagged as not useful. See `import/change-records/REVIEW.md`. No trials run. |
| Fix frontmatter on the three skipped guides so the engine builds them | 1, 2 | Sonnet / low | Done: descriptions quoted; all 103 guides validate. `engine/dist` not rebuilt yet, to avoid changing the guidance during a live benchmark run. |
| Human review of the 7 AI-written guides; publish only what passes. They ship in dev builds for benchmarking, listed in README "Content awaiting review". | 2 | You | Not started |
| Wire `data/drupal/` into the `DRUPAL_STATUS` macro and guide validation | 1, 3 | Sonnet / medium | Not started |
| Integrate `legacy-scan/` rules into `engine/src/legacy-scan` | 1, 4 | Sonnet / medium | Not started |
| Point MCP server and site at the real engine build and guides | 1, 5, 6 | Sonnet / low | Not started |
| Record the upstream commit `engine/` was taken from, and a script that diffs `engine/` against upstream | 1 | Sonnet / low | Not started |

## Wave 3: release

| Workstream | Depends on | Model / effort | Status |
|---|---|---|---|
| Open the benchmarks to community volunteers and publish the aggregated results | Wave 2 | You | Not started |
| Release: npm package, plugin marketplaces, site deploy | Wave 2 | Sonnet / medium, Opus review | Not started |
