/**
 * Project configuration (`.mdgrc`) and target Drupal core detection.
 *
 * The target core version decides which fallbacks a guide's reader needs. It is resolved, in order:
 *   1. `.mdgrc` → `{ "drupalCore": "10.3" }` (set with `modern-drupal-guidance set-core 10.3`)
 *   2. `composer.lock` → installed version of `drupal/core` (or `drupal/core-recommended`)
 *   3. `composer.json` → lowest version allowed by the `drupal/core*` requirement
 * Each lookup walks up from the working directory to the nearest project root (`.git`).
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { parseVersion, minimumCoreVersion, formatVersion, type Version } from './drupal-version.ts';

export interface MdgConfig {
  /** Target Drupal core version, e.g. "10.3" or "11.1". */
  drupalCore?: string;
  [key: string]: unknown;
}

export const CONFIG_FILENAME = '.mdgrc';

const CORE_PACKAGES = ['drupal/core', 'drupal/core-recommended'];

/** Normalizes "10", "10.3", "v10.3.2", "11.x" to "10.0", "10.3", "10.3.2", "11.0"; undefined if invalid. */
export function normalizeCoreTarget(raw: string | undefined): string | undefined {
  if (typeof raw !== 'string' || !raw.trim()) return undefined;
  try {
    const v = parseVersion(raw.trim());
    if (v[0] < 8) return undefined;
    return formatVersion(v);
  } catch {
    return undefined;
  }
}

/**
 * Finds `filename` walking up from `startDir`, stopping at the first directory with `.git`.
 */
function findUp(filename: string, startDir: string): string | null {
  let dir = path.resolve(startDir);
  while (true) {
    const candidate = path.join(dir, filename);
    if (fs.existsSync(candidate)) return candidate;
    if (fs.existsSync(path.join(dir, '.git'))) return null;
    const parent = path.dirname(dir);
    if (parent === dir) return null;
    dir = parent;
  }
}

/** Path `.mdgrc` is read from / written to: nearest existing file, else the project root, else `startDir`. */
export function resolveMdgrcPath(startDir = process.cwd()): string {
  let dir = path.resolve(startDir);
  while (true) {
    if (fs.existsSync(path.join(dir, CONFIG_FILENAME)) || fs.existsSync(path.join(dir, '.git'))) {
      return path.join(dir, CONFIG_FILENAME);
    }
    const parent = path.dirname(dir);
    if (parent === dir) {
      const homeConfig = path.join(os.homedir(), CONFIG_FILENAME);
      if (fs.existsSync(homeConfig)) return homeConfig;
      return path.join(path.resolve(startDir), CONFIG_FILENAME);
    }
    dir = parent;
  }
}

function readJsonObject(filePath: string): Record<string, unknown> | null {
  let parsed: unknown;
  try {
    parsed = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (e: unknown) {
    if ((e as NodeJS.ErrnoException)?.code === 'ENOENT') return null;
    throw new Error(`Invalid JSON at ${filePath}: ${(e as Error).message}`);
  }
  if (typeof parsed !== 'object' || parsed === null || Array.isArray(parsed)) {
    throw new Error(`Invalid ${path.basename(filePath)} at ${filePath}: expected a JSON object`);
  }
  return parsed as Record<string, unknown>;
}

export function readMdgrc(startDir = process.cwd()): MdgConfig {
  return (readJsonObject(resolveMdgrcPath(startDir)) ?? {}) as MdgConfig;
}

export function writeMdgrc(patch: Partial<MdgConfig>, startDir = process.cwd()): string {
  const targetPath = resolveMdgrcPath(startDir);
  const existing = readJsonObject(targetPath) ?? {};
  fs.writeFileSync(targetPath, JSON.stringify({ ...existing, ...patch }, null, 2) + '\n', 'utf8');
  return targetPath;
}

export interface CoreTarget {
  version: Version;
  /** Display form, e.g. "10.3". */
  display: string;
  source: '.mdgrc' | 'composer.lock' | 'composer.json';
  file: string;
}

/** Resolves the project's target Drupal core version, or `null` if none can be determined. */
export function resolveCoreTarget(startDir = process.cwd()): CoreTarget | null {
  const rcPath = resolveMdgrcPath(startDir);
  const rc = readJsonObject(rcPath);
  const fromRc = normalizeCoreTarget(typeof rc?.drupalCore === 'string' ? rc.drupalCore : undefined);
  if (fromRc) return { version: parseVersion(fromRc), display: fromRc, source: '.mdgrc', file: rcPath };

  const lockPath = findUp('composer.lock', startDir);
  if (lockPath) {
    try {
      const lock = readJsonObject(lockPath);
      const pkgs = (lock?.packages ?? []) as Array<{ name?: string; version?: string }>;
      const core = pkgs.find((p) => p?.name && CORE_PACKAGES.includes(p.name));
      if (core?.version) {
        const v = parseVersion(core.version);
        return { version: v, display: formatVersion(v), source: 'composer.lock', file: lockPath };
      }
    } catch {
      // Fall through to composer.json.
    }
  }

  const jsonPath = findUp('composer.json', startDir);
  if (jsonPath) {
    try {
      const json = readJsonObject(jsonPath);
      const req = (json?.require ?? {}) as Record<string, string>;
      const pkg = CORE_PACKAGES.find((p) => typeof req[p] === 'string');
      if (pkg) {
        const v = minimumCoreVersion(req[pkg]);
        return { version: v, display: formatVersion(v), source: 'composer.json', file: jsonPath };
      }
    } catch {
      // Unparseable constraint: no target.
    }
  }
  return null;
}
