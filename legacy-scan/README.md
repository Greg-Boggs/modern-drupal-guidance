# legacy-scan: Drupal rules

Static rules that find legacy Drupal patterns in PHP, Twig, YAML and JavaScript and point each finding to the guide that replaces it. They follow the upstream `legacy-scan` rule schema, including the `keepWhen` / `dropWhen` verifier rubric, and will be merged into `engine/src/legacy-scan` in wave 2. [DESIGN.md](DESIGN.md) covers the parsers, the decision not to wrap drupal-rector and phpstan-drupal, the rule list, false-positive risks and the integration steps.

## Run it

```bash
npm install
```

```bash
npm run build
```

```bash
node bin/legacy-scan.js path/to/module --json
```

| Flag | Description |
|---|---|
| `[path]` | Directory or file to scan (default: current directory). |
| `--json` | Upstream `ScanJsonOutput` JSON for coding agents. |
| `--guide <guideId>` | Only run the rules for one guide. |
| `--include-docs-and-tests` | Also scan `tests/`, `docs/`, `examples/` and `fixtures/`. |
| `--max-files <count>` | Maximum files to scan (default 5000, `0` for unlimited). |

Exit code 0 means the scan ran, whether or not it found anything. 1 means bad arguments or a missing path. 2 means at least one file failed to parse; those files are listed in `parseErrors`.

## Test it

```bash
npm test
```

This compiles with `tsc`, typechecking as it goes, and runs every `*.test.ts` with `node --test`. `fixtures/legacy_example` must trigger every rule and `fixtures/modern_example` none.

## Layout

```
schema.ts            Upstream rule types (part A) plus the php, twig and yaml matcher kinds (part B)
scanners/            PHP (php-parser), Twig (tag tokenizer), YAML (yaml), JS (ts-morph) engines; dispatch; repo walker
rules/               One module per guide, each with a .test.ts; guide-ids.ts holds every guide id
cli.ts, bin/         Standalone runner with upstream-shaped output
fixtures/            legacy_example (triggers every rule) and modern_example (triggers none)
test/                Fixture and CLI tests
```
