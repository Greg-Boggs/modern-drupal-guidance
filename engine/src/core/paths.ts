import fs from 'fs';
import os from 'os';
import path from 'path';

/**
 * Returns the repository root directory.
 * 
 * NOTE: We used to use `git rev-parse --show-toplevel` here to support git worktrees.
 * However, that failed when processes were spawned from directories resolved outside 
 * the project (e.g. via symlinks into another git repository), causing it to incorrectly 
 * resolve to that external repository's root instead of this project's root.
 * 
 * Using `import.meta.dirname` is robust and works correctly regardless of the current
 * working directory or surrounding git repositories.
 */
export const rootDir = path.resolve(import.meta.dirname, '../..');

/** The Modern Drupal Guidance project root (the directory that contains engine/). */
export const projectRoot = path.resolve(rootDir, '..');

/**
 * Directory holding guide content: `<guidesDir>/<category>/<slug>/guide.md`.
 * Defaults to the project-level `guides/` (`../guides` from engine/). Override with the
 * `MDG_GUIDES_DIR` environment variable (absolute, or relative to the current working
 * directory), for example `MDG_GUIDES_DIR=test-fixtures/guides`.
 */
export const defaultGuidesDir = path.join(projectRoot, 'guides');
export const guidesDir = process.env.MDG_GUIDES_DIR
  ? path.resolve(process.env.MDG_GUIDES_DIR)
  : defaultGuidesDir;

/** Test-only guides used by the engine's own tests and `pnpm build:fixtures`. */
export const fixtureGuidesDir = path.join(rootDir, 'test-fixtures', 'guides');

/** Project-level Drupal dataset (releases, deprecations, features). May not exist yet. */
export const drupalDataDir = process.env.MDG_DRUPAL_DATA_DIR
  ? path.resolve(process.env.MDG_DRUPAL_DATA_DIR)
  : path.join(projectRoot, 'data', 'drupal');

/** Source of the published agent skill (SKILL.md template). */
export const skillSourceDir = path.join(rootDir, 'skill');
export const baseAppsDir = path.join(rootDir, 'src/harness/base-apps');
export const outDir = path.join(rootDir, 'out');
export const resultsDir = path.join(rootDir, 'results');
export const suitesDir = path.join(resultsDir, 'suites');
export const dashboardDir = path.join(rootDir, 'src/dashboard');

export interface GuideResultsInventory {
  category: string;
  name: string;
}

/**
 * Returns the path to the results directory for a specific guide:
 * results/guides/<category>/<name>/
 */
export function getGuideResultsDir(inv: GuideResultsInventory): string {
  if (!inv.name) {
    throw new Error(`getGuideResultsDir: missing name in inventory for category "${inv.category}"`);
  }
  return path.join(resultsDir, 'guides', inv.category, inv.name);
}

/**
 * Resolves the results directory for a guide from its directory path or optional guide info.
 */
export function resolveGuideResultsDir(targetDir: string, guideInfo?: Partial<GuideResultsInventory>): string {
  if (guideInfo?.category && guideInfo?.name) {
    return getGuideResultsDir({ category: guideInfo.category, name: guideInfo.name });
  }
  const resolvedTarget = path.resolve(targetDir);
  const rel = path.relative(guidesDir, resolvedTarget);
  if (!rel.startsWith('..') && !path.isAbsolute(rel)) {
    const parts = rel.split(path.sep);
    if (parts.length >= 2) {
      return getGuideResultsDir({ category: parts[0], name: parts[1] });
    }
    if (parts.length === 1) {
      return getGuideResultsDir({ category: parts[0], name: parts[0] });
    }
  }
  const parts = resolvedTarget.split(path.sep);
  const name = parts[parts.length - 1];
  const category = parts[parts.length - 2] || 'cat';
  return getGuideResultsDir({ category, name });
}

function isTmpPath(p: string): boolean {
  const normalized = path.resolve(p);
  return (
    normalized === '/tmp' ||
    normalized.startsWith('/tmp/') ||
    normalized === '/private/tmp' ||
    normalized.startsWith('/private/tmp/')
  );
}

/**
 * Resolves a persistent disk directory for `NODE_COMPILE_CACHE` outside `/tmp`.
 * Uses separate subdirectories for `'harness'` and `'agents'` so agent sandboxes
 * do not share bytecode caches with harness/grader processes.
 */
export function getDiskNodeCompileCacheDir(
  scope: 'harness' | 'agents' = 'harness',
  env: NodeJS.ProcessEnv = process.env,
): string {
  const existing = env.NODE_COMPILE_CACHE;
  if (existing && !isTmpPath(existing)) {
    return existing;
  }
  let homedir = '';
  try {
    homedir = os.userInfo().homedir;
  } catch {
    homedir = env.HOME || os.homedir();
  }
  if (!homedir) {
    homedir = env.HOME || os.homedir();
  }
  return path.join(homedir, '.cache', 'mdg-node-compile-cache', scope);
}

/**
 * Ensures `env.NODE_COMPILE_CACHE` points to an existing disk directory outside `/tmp`.
 */
export function ensureDiskNodeCompileCache(
  env: NodeJS.ProcessEnv = process.env,
  scope: 'harness' | 'agents' = 'harness',
): string {
  const dir = getDiskNodeCompileCacheDir(scope, env);
  try {
    fs.mkdirSync(dir, { recursive: true });
  } catch {
    // Ignore if filesystem is read-only
  }
  env.NODE_COMPILE_CACHE = dir;
  return dir;
}

