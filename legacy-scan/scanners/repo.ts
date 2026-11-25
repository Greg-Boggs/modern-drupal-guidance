/**
 * Walks a Drupal project or extension directory and scans eligible files.
 *
 * Skipped by default: dependencies and code the project does not own
 * (vendor, node_modules, Drupal core, contrib, libraries), build output,
 * and docs/tests (opt in with includeDocsAndTests).
 */
import { readdir, readFile, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import type { ScanFinding, ScanRule } from '../schema.ts';
import { engineForPath, scanFiles, type ScanStats } from './index.ts';

export const DEFAULT_MAX_FILES = 5000;
export const MAX_SOURCE_FILE_BYTES = 1_000_000;

/** Directories never scanned: dependencies, Drupal core and contrib, VCS, build output. */
export const NON_PROJECT_DIR_SEGMENTS: ReadonlySet<string> = new Set([
  '.git',
  '.hg',
  '.svn',
  '.ddev',
  '.idea',
  '.vscode',
  'node_modules',
  'vendor',
  'bower_components',
  'core',
  'contrib',
  'libraries',
  'dist',
  'build',
  'files',
  'private',
]);

/** Docs and tests: skipped unless includeDocsAndTests. */
export const DOCS_AND_TESTS_DIR_SEGMENTS: ReadonlySet<string> = new Set([
  'tests',
  'test',
  '__tests__',
  'fixtures',
  'docs',
  'doc',
  'examples',
  'example',
]);

export interface RepoScanOptions {
  readonly maxFiles?: number;
  readonly includeDocsAndTests?: boolean;
  readonly stats?: ScanStats;
}

export function isDocsOrTestsPath(relPath: string): boolean {
  const segments = relPath.split('/');
  segments.pop();
  return segments.some((s) => DOCS_AND_TESTS_DIR_SEGMENTS.has(s.toLowerCase()));
}

async function collect(root: string, dir: string, out: string[]): Promise<void> {
  const entries = await readdir(dir, { withFileTypes: true });
  entries.sort((a, b) => a.name.localeCompare(b.name));
  for (const entry of entries) {
    const abs = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Case-sensitive on purpose: `core/` is Drupal core, `src/Core/` is a namespace.
      if (NON_PROJECT_DIR_SEGMENTS.has(entry.name)) continue;
      await collect(root, abs, out);
    } else if (entry.isFile()) {
      const rel = relative(root, abs).split('\\').join('/');
      if (engineForPath(rel)) out.push(rel);
    }
  }
}

export async function scanRepoFiles(
  root: string,
  rules: readonly ScanRule[],
  options: RepoScanOptions = {},
): Promise<ScanFinding[]> {
  const stats = options.stats ?? {};
  const candidates: string[] = [];
  await collect(root, root, candidates);

  let eligible = candidates;
  if (!options.includeDocsAndTests) {
    eligible = candidates.filter((p) => !isDocsOrTestsPath(p));
    stats.skippedDocsAndTestsCount = candidates.length - eligible.length;
  }
  stats.eligibleFileCount = eligible.length;
  const maxFiles = options.maxFiles ?? DEFAULT_MAX_FILES;
  if (maxFiles > 0 && eligible.length > maxFiles) {
    eligible = eligible.slice(0, maxFiles);
    stats.truncatedByMaxFiles = true;
  }

  const files = new Map<string, string>();
  for (const rel of eligible) {
    const abs = join(root, rel);
    const info = await stat(abs);
    if (info.size > MAX_SOURCE_FILE_BYTES) continue;
    files.set(rel, await readFile(abs, 'utf8'));
  }
  stats.scannedFileCount = files.size;
  return scanFiles(files, rules, { stats });
}
