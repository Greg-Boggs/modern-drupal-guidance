/**
 * Drupal core version layer.
 *
 * Every guide declares the core versions it applies to in its `drupal-core` frontmatter
 * field, written as a Composer version constraint (for example `">=11.1"`,
 * `"^10.3 || ^11"`, `"~10.2.0"`, `">=10.3 <12"`). This module parses those constraints
 * into half-open version intervals, renders them for agents (`DRUPAL_STATUS` macro), and
 * checks a project's target core version against them.
 *
 * Dependency-free on purpose: it is bundled into the shipped CLI.
 *
 * Supported Composer syntax: exact (`11.1.0`, `=11.1`), comparison (`>=`, `>`, `<=`, `<`, `!=`
 * is rejected), caret (`^10.3`), tilde (`~10.2`, `~10.2.1`), wildcards (`11.x`, `11.*`, `*`),
 * hyphen ranges (`10.3 - 11.1`), AND by space or comma, OR by `||` (or `|`).
 * Stability suffixes (`@dev`, `-beta1`) are stripped; Drupal core guides target stable releases.
 */

/** A version as `[major, minor, patch]`. */
export type Version = readonly [number, number, number];

/** Half-open interval `[min, max)`. `max === null` means unbounded. */
export interface VersionInterval {
  readonly min: Version;
  readonly max: Version | null;
}

export class DrupalConstraintError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DrupalConstraintError';
  }
}

const ZERO: Version = [0, 0, 0];

export function compareVersions(a: Version, b: Version): number {
  for (let i = 0; i < 3; i++) {
    if (a[i] !== b[i]) return a[i] - b[i];
  }
  return 0;
}

interface PartialVersion {
  parts: number[]; // 1..3 numeric parts actually written
  wildcard: boolean; // ends in .x / .* or is a bare *
}

function parsePartial(raw: string, constraint: string): PartialVersion {
  const cleaned = raw.trim().replace(/^v/i, '').replace(/@[\w.-]+$/, '').replace(/-[a-z][\w.]*$/i, '');
  if (cleaned === '*' || cleaned.toLowerCase() === 'x') return { parts: [], wildcard: true };
  const segs = cleaned.split('.');
  const parts: number[] = [];
  let wildcard = false;
  for (const seg of segs) {
    if (seg === 'x' || seg === 'X' || seg === '*') {
      wildcard = true;
      break;
    }
    if (!/^\d+$/.test(seg)) {
      throw new DrupalConstraintError(`Invalid version "${raw}" in drupal-core constraint "${constraint}".`);
    }
    parts.push(Number(seg));
  }
  if (parts.length > 3) {
    throw new DrupalConstraintError(`Version "${raw}" has more than three parts in "${constraint}".`);
  }
  if (parts.length === 0 && !wildcard) {
    throw new DrupalConstraintError(`Empty version in drupal-core constraint "${constraint}".`);
  }
  return { parts, wildcard };
}

function fill(parts: number[]): Version {
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0];
}

/** The smallest version strictly above every version matching `parts` as a prefix. */
function bumpPrefix(parts: number[]): Version | null {
  if (parts.length === 0) return null;
  const p = [...parts];
  p[p.length - 1] += 1;
  return fill(p);
}

function intersect(a: VersionInterval, b: VersionInterval): VersionInterval | null {
  const min = compareVersions(a.min, b.min) >= 0 ? a.min : b.min;
  let max: Version | null;
  if (a.max === null) max = b.max;
  else if (b.max === null) max = a.max;
  else max = compareVersions(a.max, b.max) <= 0 ? a.max : b.max;
  if (max !== null && compareVersions(min, max) >= 0) return null;
  return { min, max };
}

function nextPatch(v: Version): Version {
  return [v[0], v[1], v[2] + 1];
}

/** Converts a single Composer constraint term (no spaces) to an interval. */
function termToInterval(term: string, constraint: string): VersionInterval {
  const m = term.match(/^(>=|<=|>|<|==|=|\^|~|!=)?\s*(.+)$/);
  if (!m) throw new DrupalConstraintError(`Cannot parse "${term}" in drupal-core constraint "${constraint}".`);
  const op = m[1] ?? '';
  const pv = parsePartial(m[2], constraint);
  const v = fill(pv.parts);

  switch (op) {
    case '!=':
      throw new DrupalConstraintError(`"!=" is not supported in drupal-core constraints ("${constraint}").`);
    case '>=':
      return { min: v, max: null };
    case '>':
      // `>11` means above every 11.x.y when written with fewer parts.
      return { min: pv.parts.length < 3 ? (bumpPrefix(pv.parts) ?? ZERO) : nextPatch(v), max: null };
    case '<':
      return { min: ZERO, max: v };
    case '<=':
      return { min: ZERO, max: pv.parts.length < 3 ? bumpPrefix(pv.parts) : nextPatch(v) };
    case '^': {
      // ^10.3 → >=10.3.0 <11.0.0; ^0.3 → >=0.3.0 <0.4.0 (Composer semantics).
      const firstNonZero = pv.parts.findIndex((n) => n !== 0);
      const idx = firstNonZero === -1 ? Math.max(pv.parts.length - 1, 0) : firstNonZero;
      return { min: v, max: bumpPrefix(pv.parts.slice(0, idx + 1)) };
    }
    case '~': {
      // ~10.2 → >=10.2 <11.0; ~10.2.1 → >=10.2.1 <10.3.0; ~10 → >=10 <11.
      const keep = pv.parts.length <= 1 ? 1 : pv.parts.length - 1;
      return { min: v, max: bumpPrefix(pv.parts.slice(0, keep)) };
    }
    default: {
      // Exact or wildcard. A partial exact version like `11.1` matches 11.1.0 only in Composer,
      // but guides that write `11.1` mean "the 11.1 minor", so treat partials as prefixes.
      if (pv.parts.length === 0) return { min: ZERO, max: null };
      if (pv.wildcard || pv.parts.length < 3) return { min: v, max: bumpPrefix(pv.parts) };
      return { min: v, max: nextPatch(v) };
    }
  }
}

/** Merges overlapping or touching intervals into a sorted, disjoint list. */
export function normalizeIntervals(intervals: VersionInterval[]): VersionInterval[] {
  const sorted = [...intervals].sort((a, b) => compareVersions(a.min, b.min));
  const out: VersionInterval[] = [];
  for (const cur of sorted) {
    const last = out[out.length - 1];
    if (last && (last.max === null || compareVersions(cur.min, last.max) <= 0)) {
      if (last.max !== null && (cur.max === null || compareVersions(cur.max, last.max) > 0)) {
        out[out.length - 1] = { min: last.min, max: cur.max };
      }
      continue;
    }
    out.push(cur);
  }
  return out;
}

/**
 * Parses a Composer version constraint into a sorted list of disjoint intervals.
 * Throws `DrupalConstraintError` when the constraint is malformed or matches nothing.
 */
export function parseCoreConstraint(constraint: string): VersionInterval[] {
  if (typeof constraint !== 'string' || !constraint.trim()) {
    throw new DrupalConstraintError('drupal-core constraint is empty.');
  }
  const intervals: VersionInterval[] = [];
  for (const orPart of constraint.split(/\s*\|\|?\s*/)) {
    const trimmed = orPart.trim();
    if (!trimmed) throw new DrupalConstraintError(`Empty alternative in drupal-core constraint "${constraint}".`);

    // Hyphen range: "10.3 - 11.1" → >=10.3 <=11.1 (partial upper bound includes the prefix).
    const hyphen = trimmed.match(/^(\S+)\s+-\s+(\S+)$/);
    let terms: string[];
    if (hyphen) {
      terms = [`>=${hyphen[1]}`, `<=${hyphen[2]}`];
    } else {
      // Join operators separated from their version by whitespace (">= 11.1").
      terms = trimmed.replace(/(>=|<=|>|<|=|\^|~)\s+/g, '$1').split(/[\s,]+/).filter(Boolean);
    }

    let acc: VersionInterval | null = { min: ZERO, max: null };
    for (const term of terms) {
      if (!acc) break;
      acc = intersect(acc, termToInterval(term, constraint));
    }
    if (acc) intervals.push(acc);
  }
  if (intervals.length === 0) {
    throw new DrupalConstraintError(`drupal-core constraint "${constraint}" matches no version.`);
  }
  return normalizeIntervals(intervals);
}

/** Parses "11", "11.1", "11.1.3", "v10.3.0", "11.1.x-dev" into a Version. */
export function parseVersion(raw: string): Version {
  const pv = parsePartial(String(raw), String(raw));
  if (pv.parts.length === 0) throw new DrupalConstraintError(`"${raw}" is not a version.`);
  return fill(pv.parts);
}

export function satisfies(version: Version, intervals: readonly VersionInterval[]): boolean {
  return intervals.some(
    (i) => compareVersions(version, i.min) >= 0 && (i.max === null || compareVersions(version, i.max) < 0)
  );
}

export function formatVersion(v: Version, minParts = 2): string {
  const parts = [...v];
  while (parts.length > minParts && parts[parts.length - 1] === 0) parts.pop();
  return parts.join('.');
}

/** Renders the highest version still inside an interval whose exclusive max is `max`. */
function formatUpperInclusive(max: Version): string {
  const [maj, min, patch] = max;
  if (patch === 0 && min === 0) return `${maj - 1}.x`;
  if (patch === 0) return `${maj}.${min - 1}`;
  return `${maj}.${min}.${patch - 1}`;
}

/** Human-readable description of one interval, e.g. "11.1 and later", "10.3 to 11.x". */
export function describeInterval(i: VersionInterval): string {
  const lo = formatVersion(i.min);
  if (i.max === null) return compareVersions(i.min, ZERO) === 0 ? 'all versions' : `${lo} and later`;
  const hi = formatUpperInclusive(i.max);
  if (compareVersions(i.min, ZERO) === 0) return `up to ${hi}`;
  const [maj, min, patch] = i.min;
  if (patch === 0 && min === 0 && hi === `${maj}.x`) return `${maj}.x`;
  if (hi === lo || hi === `${lo}.x`) return lo;
  return `${lo} to ${hi}`;
}

/** "Drupal core 10.3 to 11.x", "Drupal core 11.1 and later", "Drupal core 10.x or 11.2 and later". */
export function describeConstraint(constraint: string): string {
  const parts = parseCoreConstraint(constraint).map(describeInterval);
  return `Drupal core ${parts.join(' or ')}`;
}

/** The lowest core version a constraint allows. */
export function minimumCoreVersion(constraint: string): Version {
  return parseCoreConstraint(constraint)[0].min;
}
