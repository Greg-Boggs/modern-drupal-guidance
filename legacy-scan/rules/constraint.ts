/**
 * Minimal Composer version-constraint evaluator, enough for
 * core_version_requirement values: `^9 || ^10`, `^10.3 || ^11`, `>=10`,
 * `~10.2`, `8.x`, `>=9.5 <11`, `10.*`, `^8.8 || ^9`. Composer semantics:
 * `||` (or `|`) is OR, spaces/commas are AND.
 */

type Version = readonly [number, number, number];
interface Range {
  readonly min: Version | null; // inclusive
  readonly max: Version | null; // exclusive
}

function cmp(a: Version, b: Version): number {
  return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
}

function parseVersion(text: string): { v: Version; parts: number } | null {
  const m = /^v?(\d+)(?:\.(\d+|x|\*))?(?:\.(\d+|x|\*))?(?:[-@].*)?$/i.exec(text.trim());
  if (!m) return null;
  const nums: number[] = [];
  for (const part of [m[1], m[2], m[3]]) {
    if (part === undefined || part === 'x' || part === 'X' || part === '*') break;
    nums.push(Number(part));
  }
  return { v: [nums[0] ?? 0, nums[1] ?? 0, nums[2] ?? 0], parts: nums.length };
}

function bump(v: Version, parts: number): Version {
  if (parts <= 1) return [v[0] + 1, 0, 0];
  if (parts === 2) return [v[0], v[1] + 1, 0];
  return [v[0], v[1], v[2] + 1];
}

function atomToRange(atom: string): Range | null {
  const m = /^(\^|~|>=|<=|>|<|==|=|!=)?\s*(.+)$/.exec(atom.trim());
  if (!m || !m[2]) return null;
  const op = m[1] ?? '';
  if (m[2] === '*') return { min: null, max: null };
  const parsed = parseVersion(m[2]);
  if (!parsed) return null;
  const { v, parts } = parsed;
  switch (op) {
    case '^':
      return { min: v, max: v[0] > 0 ? [v[0] + 1, 0, 0] : bump(v, Math.min(parts, 2)) };
    case '~':
      return { min: v, max: bump(v, Math.max(parts - 1, 1)) };
    case '>=':
      return { min: v, max: null };
    case '>':
      // Composer pads `>10` to `>10.0.0.0`, so 10.0.1 is allowed.
      return { min: bump(v, 3), max: null };
    case '<':
      return { min: null, max: v };
    case '<=':
      return { min: null, max: bump(v, 3) };
    case '!=':
      return { min: null, max: null };
    default:
      // Exact or wildcard (`8.x`, `10.*`, `10`).
      return parts === 3 ? { min: v, max: bump(v, 3) } : { min: v, max: bump(v, Math.max(parts, 1)) };
  }
}

function intersect(a: Range, b: Range): Range {
  const min = a.min && b.min ? (cmp(a.min, b.min) >= 0 ? a.min : b.min) : (a.min ?? b.min);
  const max = a.max && b.max ? (cmp(a.max, b.max) <= 0 ? a.max : b.max) : (a.max ?? b.max);
  return { min, max };
}

/** Parses a constraint into OR-ed ranges, or null if it cannot be parsed. */
export function parseConstraint(constraint: string): Range[] | null {
  const ranges: Range[] = [];
  for (const alternative of constraint.split(/\s*\|\|?\s*/)) {
    const trimmed = alternative.trim();
    if (!trimmed) return null;
    // Hyphen range: `9.5 - 10.2`.
    const hyphen = /^(\S+)\s+-\s+(\S+)$/.exec(trimmed);
    const atoms = hyphen ? [`>=${hyphen[1]}`, `<=${hyphen[2]}`] : trimmed.split(/\s*,\s*|\s+/).filter(Boolean);
    let range: Range = { min: null, max: null };
    for (const atom of atoms) {
      const r = atomToRange(atom);
      if (!r) return null;
      range = intersect(range, r);
    }
    ranges.push(range);
  }
  return ranges;
}

/** True when the constraint admits at least one release of the given major. */
export function allowsMajor(constraint: string, major: number): boolean | null {
  const ranges = parseConstraint(constraint);
  if (!ranges) return null;
  const lo: Version = [major, 0, 0];
  const hi: Version = [major + 1, 0, 0];
  return ranges.some((r) => (!r.min || cmp(r.min, hi) < 0) && (!r.max || cmp(r.max, lo) > 0) && (!r.min || !r.max || cmp(r.min, r.max) < 0));
}
