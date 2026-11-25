# AGENTS.md (engine/)

This directory is the engine for Modern Drupal Guidance: guide build, local search, the
`modern-drupal-guidance` CLI, the agent skill template, plugin manifests and the legacy-scan host.
Read `README.md` here for the layout, commands and CLI contract, and the project-level
`../README.md` for the overall project and its rules.

- Guide content lives in `../guides/`, not here. `test-fixtures/guides/` holds placeholder guides
  for tests only.
- The skill template is `skill/SKILL.md`. Plugin manifests are in `src/cli/template/`.
- Before reporting work done, run `corepack pnpm build`, `corepack pnpm typecheck` and
  `corepack pnpm test` from this directory.
- After guide changes that add new vocabulary, run `corepack pnpm train:words` and commit the
  updated `src/rag/gen/query-words.*` (see `src/rag/README.md`).
- The eval harness (`src/harness`, `src/grading`, `src/authoring`, `src/dashboard`, `bin/gd.ts`)
  is disabled. Do not wire it into scripts, typecheck or tests without a plan to port it to Drupal.
- Do not publish to npm or push plugin marketplaces from here.
