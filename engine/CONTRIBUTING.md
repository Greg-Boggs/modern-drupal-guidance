# Contributing to the engine

- Guides: see `../guides/CONTRIBUTING.md`. The engine only needs the frontmatter contract in
  `../README.md` (`name`, `description`, `drupal-core`, optional `draft`).
- Engine code: TypeScript run directly by Node through `tsx` (`node --import tsx`). Keep modules
  that ship in the CLI bundle (`src/cli`, `src/rag`, `src/core/drupal-version.ts`,
  `src/core/mdgrc.ts`, `src/legacy-scan`) free of heavy dependencies.
- Every change: `corepack pnpm build && corepack pnpm typecheck && corepack pnpm test`.
- Search changes: check the fixture queries in `src/rag/search.test.ts` still rank as expected,
  and rerun `corepack pnpm train:words` if tokenization changed.
