/**
 * Grader calibration: the reference solution must pass every check, and the
 * untouched base app must fail every MUST check and pass every MUST NOT check.
 * Re-grading the reference diff on a rebuilt site must agree with the live
 * grade, which proves a submission's diff is enough for maintainers.
 */
import { freshSite, removeSite } from './base-app.ts';
import type { CheckResult } from '../../grading/drupal/context.ts';
import { applyReference, captureDiff, gradeSite, siteFromDiff } from './trial.ts';
import type { BenchTask } from './tasks.ts';

export interface CalibrationResult {
  task: string;
  ok: boolean;
  reference: CheckResult[];
  base: CheckResult[];
  regrade: CheckResult[];
  problems: string[];
  seconds: number;
}

export async function calibrateTask(task: BenchTask, opts: { keep?: boolean; regrade?: boolean } = {}): Promise<CalibrationResult> {
  const t0 = Date.now();
  const problems: string[] = [];

  const baseSite = freshSite(`calibrate-${task.id}-base`);
  captureDiff(baseSite);
  const base = await gradeSite(task, baseSite);
  for (const r of base) {
    if (r.kind === 'must' && r.pass) problems.push(`base app passes MUST check ${r.id}`);
    if (r.kind === 'must_not' && !r.pass) problems.push(`base app fails MUST NOT check ${r.id}${r.detail ? ` (${r.detail})` : ''}`);
  }

  const refSite = freshSite(`calibrate-${task.id}-reference`);
  let reference: CheckResult[] = [];
  let regrade: CheckResult[] = [];
  try {
    applyReference(task, refSite);
    const { diff } = captureDiff(refSite);
    reference = await gradeSite(task, refSite);
    for (const r of reference) if (!r.pass) problems.push(`reference fails ${r.id}${r.detail ? ` (${r.detail})` : ''}`);

    if (opts.regrade !== false) {
      const rebuilt = siteFromDiff(`calibrate-${task.id}-regrade`, diff);
      if (!rebuilt.ok) problems.push(`re-grade rebuild failed: ${rebuilt.log}`);
      regrade = await gradeSite(task, rebuilt.site, reference);
      for (const r of regrade) if (!r.pass) problems.push(`re-grade of reference diff fails ${r.id}${r.detail ? ` (${r.detail})` : ''}`);
      if (!opts.keep) removeSite(rebuilt.site);
    }
  } catch (e: any) {
    problems.push(String(e.message || e).slice(0, 2000));
  }

  if (!opts.keep) {
    removeSite(baseSite);
    removeSite(refSite);
  }
  return { task: task.id, ok: problems.length === 0, reference, base, regrade, problems, seconds: Math.round((Date.now() - t0) / 1000) };
}
