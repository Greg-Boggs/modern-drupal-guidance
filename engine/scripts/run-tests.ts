/**
 * Runs the engine's test suite: every `*.test.ts` under src/, except the disabled eval
 * harness (see DISABLED below and engine/README.md). It first builds the fixture package
 * (test-fixtures/guides → dist/fixtures-cli), so tests do not depend on the state of the
 * project guides/ directory.
 *
 * Usage: node --import tsx scripts/run-tests.ts [extra node --test args]
 * Set TEST_REPORTER (default: dot) to change the reporter.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { globSync } from "glob";

const root = path.resolve(import.meta.dirname, "..");

/** Directories and files that belong to the disabled eval harness. */
export const DISABLED = [
  "src/harness/",
  "src/grading/",
  "src/dashboard/",
  "src/authoring/",
  "src/core/eval-inventory",
  "src/core/grader-",
  "src/core/patch-utils",
  "src/build/collect-eval-results",
  "src/legacy-scan/eval/",
  "src/legacy-scan/llm-verifier",
];

const files = globSync("src/**/*.test.ts", { cwd: root, ignore: ["**/node_modules/**"] })
  .filter((f) => !DISABLED.some((d) => f.startsWith(d)))
  .sort();

// Build the fixture package once; dist tests read it and the other tests use its data dir.
const fixturesDist = path.join(root, "dist/fixtures-cli");
const build = spawnSync(
  process.execPath,
  ["--import", "tsx", "src/build/build-dist.ts", "--guides", "test-fixtures/guides", "--out", fixturesDist, "--strict"],
  { cwd: root, stdio: "inherit", env: { ...process.env, MDG_DRUPAL_DATA_DIR: path.join(root, "test-fixtures/no-drupal-data") } }
);
if (build.status !== 0) process.exit(build.status ?? 1);

const reporter = process.env.TEST_REPORTER || "dot";
const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", `--test-reporter=${reporter}`, ...process.argv.slice(2), ...files],
  {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      MDG_GUIDES_DIR: path.join(root, "test-fixtures/guides"),
      MDG_DATA_DIR: path.join(fixturesDist, "skills/modern-drupal-guidance"),
      MDG_FIXTURES_DIST: fixturesDist,
      // Keep DRUPAL_STATUS output independent of the data/drupal/ dataset; tests that cover the
      // dataset hook pass a directory explicitly.
      MDG_DRUPAL_DATA_DIR: path.join(root, "test-fixtures/no-drupal-data"),
    },
  }
);
process.exit(result.status ?? 1);
