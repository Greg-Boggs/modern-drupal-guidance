/**
 * Hook for the project-level Drupal dataset in `data/drupal/` (see `drupalDataDir` in
 * ./paths.ts). The dataset is built by a separate workstream; until it exists every loader
 * here returns `null` and the version layer works from the `drupal-core` constraint alone.
 *
 * WIRING POINT (wave 2): `data/drupal/releases.json` lists core minor releases with their
 * support status. `loadDrupalReleases()` reads it tolerantly (array, or `{ releases: [] }`;
 * `version`/`minor` and `supported`/`currentlySupported`/`currently_supported` keys). Once the
 * schema in `data/drupal/` is final, tighten `normalizeRelease()` to that schema, and use
 * `deprecations.json` in guide validation (see `validateDrupalCore` in ./guide-validation.ts).
 */
import fs from 'node:fs';
import path from 'node:path';
import { drupalDataDir } from './paths.ts';
import { parseVersion, satisfies, compareVersions, formatVersion, type Version, type VersionInterval } from './drupal-version.ts';

export interface DrupalRelease {
  /** Minor release, e.g. "11.1". */
  version: string;
  parsed: Version;
  supported?: boolean;
  releaseDate?: string;
  securitySupportEnd?: string;
}

let cache: { dir: string; releases: DrupalRelease[] | null } | null = null;

function normalizeRelease(raw: unknown): DrupalRelease | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  const version = String(r.version ?? r.minor ?? r.release ?? '').trim();
  if (!version) return null;
  let parsed: Version;
  try {
    parsed = parseVersion(version);
  } catch {
    return null;
  }
  const supportedRaw = r.supported ?? r.currentlySupported ?? r.currently_supported;
  const str = (v: unknown) => (typeof v === 'string' ? v : undefined);
  return {
    version,
    parsed,
    supported: typeof supportedRaw === 'boolean' ? supportedRaw : undefined,
    releaseDate: str(r.releaseDate ?? r.release_date ?? r.released),
    securitySupportEnd: str(r.securitySupportEnd ?? r.security_support_end ?? r.securityEnd),
  };
}

/** Reads `releases.json` from the Drupal dataset, or returns `null` if it is absent or unreadable. */
export function loadDrupalReleases(dir = drupalDataDir): DrupalRelease[] | null {
  if (cache && cache.dir === dir) return cache.releases;
  let releases: DrupalRelease[] | null = null;
  const file = path.join(dir, 'releases.json');
  if (fs.existsSync(file)) {
    try {
      const json: unknown = JSON.parse(fs.readFileSync(file, 'utf8'));
      const list = Array.isArray(json) ? json : (json as { releases?: unknown[] })?.releases;
      if (Array.isArray(list)) {
        releases = list
          .map(normalizeRelease)
          .filter((r): r is DrupalRelease => r !== null)
          .sort((a, b) => compareVersions(a.parsed, b.parsed));
      }
    } catch {
      releases = null;
    }
  }
  cache = { dir, releases };
  return releases;
}

export function resetDrupalDataCache(): void {
  cache = null;
}

/**
 * Currently supported core minors covered by `intervals`, e.g. `["10.5", "11.2", "11.3"]`,
 * or `null` when the dataset does not exist or carries no support flags.
 */
export function supportedReleasesIn(intervals: readonly VersionInterval[], dir = drupalDataDir): string[] | null {
  const releases = loadDrupalReleases(dir);
  if (!releases || !releases.some((r) => r.supported !== undefined)) return null;
  return releases
    .filter((r) => r.supported === true && satisfies(r.parsed, intervals))
    .map((r) => formatVersion(r.parsed));
}
