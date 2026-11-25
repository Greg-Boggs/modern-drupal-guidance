import os from 'os';
import path from 'path';
import { rootDir, projectRoot } from '../../core/paths.ts';

/** Pinned versions of the base app. Change these together and rebuild. */
export const DRUPAL_VERSION = '11.4.13';
export const DRUSH_VERSION = '13.8.1';
export const INSTALL_PROFILE = 'standard';

export const engineDir = rootDir;
export { projectRoot };
export const benchmarksDir = path.join(projectRoot, 'benchmarks');
export const tasksDir = path.join(benchmarksDir, 'tasks');
export const benchResultsDir = path.join(benchmarksDir, 'results');
export const suitesDefDir = path.join(benchmarksDir, 'suites');
export const legacyScanBin = path.join(projectRoot, 'legacy-scan', 'bin', 'legacy-scan.js');
export const deprecationsFile = path.join(projectRoot, 'data', 'drupal', 'deprecations.json');
export const skillDistDir = path.join(rootDir, 'dist', 'skills-cli', 'skills', 'modern-drupal-guidance');
export const skillCliPath = path.join(skillDistDir, 'modern-drupal-guidance.mjs');
export const mcpServerPath = path.join(projectRoot, 'mcp', 'dist', 'src', 'index.js');
export const benchStateScript = path.join(import.meta.dirname, 'bench-state.php');

/** Cache directory for the base app and trial sites. Override with MDG_BENCH_CACHE. */
export function cacheDir(): string {
  return process.env.MDG_BENCH_CACHE
    || path.join(process.env.XDG_CACHE_HOME || path.join(os.homedir(), '.cache'), 'modern-drupal-guidance-bench');
}

export function templateDir(): string {
  return path.join(cacheDir(), `drupal-${DRUPAL_VERSION}`);
}

/**
 * Where trial sites live while an agent works on them. Defaults to the system
 * temp directory, outside the home directory, so agents do not pick up a
 * CLAUDE.md or AGENTS.md from a parent directory. Override with MDG_BENCH_TRIALS.
 */
export function trialsRoot(): string {
  return process.env.MDG_BENCH_TRIALS || path.join(os.tmpdir(), 'mdg-bench-trials');
}
