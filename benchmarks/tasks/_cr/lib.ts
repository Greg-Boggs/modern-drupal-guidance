/**
 * Shared helpers for the change-record tasks (cr-*). This folder has no
 * task.md, so the harness does not list it as a task.
 */
import type { Check, GradeContext, Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleDir } from '../../../engine/src/grading/drupal/code-checks.ts';

export { moduleDir, moduleEnabled, noDeprecatedApis, noLegacyFindings } from '../../../engine/src/grading/drupal/code-checks.ts';

/** Runs PHP in the site and returns the JSON value printed on the last line, or throws. */
export function php(ctx: GradeContext, code: string): any {
  const r = ctx.phpEval(code);
  if (!r.ok) throw new Error(r.out.slice(-800));
  const last = r.out.split('\n').pop() || 'null';
  try {
    return JSON.parse(last);
  } catch {
    throw new Error(`not JSON: ${r.out.slice(-400)}`);
  }
}

/** A MUST check that runs PHP which prints json_encode(TRUE|FALSE|{pass, detail}). Fails when the module is not enabled. */
export function phpCheck(id: string, text: string, module: string | null, code: string, regrade?: 'recorded'): Check {
  return {
    id, kind: 'must', text, ...(regrade ? { regrade } : {}),
    run: async (ctx) => {
      if (module && !ctx.moduleEnabled(module)) return { pass: false, detail: `${module} not enabled` };
      const v = php(ctx, code);
      if (typeof v === 'boolean') return v;
      if (v && typeof v === 'object' && 'pass' in v) return { pass: !!v.pass, detail: JSON.stringify(v.detail ?? null).slice(0, 400) };
      return { pass: false, detail: JSON.stringify(v).slice(0, 400) };
    },
  };
}

function stripComments(text: string, file: string): string {
  if (/\.(php|module|inc|install|theme|js)$/.test(file)) return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"])\/\/.*$/gm, '$1');
  if (/\.ya?ml$/.test(file)) return text.replace(/^\s*#.*$/gm, '');
  return text;
}

/** Code files under a directory, comments stripped, concatenated. */
export function code(ctx: GradeContext, dirRel: string, exts = /\.(php|module|inc|install|theme|yml|twig|js)$/): string {
  return ctx.files(dirRel).filter((f) => exts.test(f)).map((f) => stripComments(ctx.read(f), f)).join('\n');
}

/** MUST NOT: a legacy pattern appears in the code under dirRel (default: the module). */
export function noPattern(id: string, text: string, dirRel: string, re: RegExp, exts?: RegExp): Check {
  return {
    id, kind: 'must_not', text,
    run: async (ctx) => {
      const m = code(ctx, dirRel, exts).match(re);
      return { pass: !m, detail: m ? m[0].slice(0, 200) : undefined };
    },
  };
}

/** MUST: a pattern appears in the code under dirRel. Use only where no runtime check is possible. */
export function hasPattern(id: string, text: string, dirRel: string, re: RegExp, exts?: RegExp): Check {
  return {
    id, kind: 'must', text,
    run: async (ctx) => re.test(code(ctx, dirRel, exts)),
  };
}

export const mod = moduleDir;

/**
 * Marks the checks that measure Drupal practice (the modern API or pattern a
 * guide teaches) rather than the outcome the prompt asks for. Their text gets
 * a "Practice:" prefix, so results and expectations.md tell the two apart.
 * Throws when an id is not a check of the grader.
 */
export function practice(grader: Grader, ids: string[]): Grader {
  const known = new Set(grader.checks.map((c) => c.id));
  const unknown = ids.filter((id) => !known.has(id));
  if (unknown.length) throw new Error(`practice(): unknown check ids ${unknown.join(', ')}`);
  return {
    ...grader,
    checks: grader.checks.map((c) => (ids.includes(c.id) && !c.text.startsWith('Practice: ') ? { ...c, text: `Practice: ${c.text}` } : c)),
  };
}
