/**
 * Trial lifecycle helpers shared by real runs, calibration and re-grading:
 * capture a trial's changes as one diff, grade a site, and rebuild a site from
 * a recorded diff.
 */
import fs from 'fs';
import path from 'path';
import { drush, freshSite, git, readState, writeContentSnapshot } from './base-app.ts';
import { run } from './exec.ts';
import { GradeContext, runGrader, type CheckResult } from '../../grading/drupal/context.ts';
import { loadGrader, type BenchTask } from './tasks.ts';

/** Max diff size kept in a results file. Larger diffs are truncated and flagged. */
export const MAX_DIFF_BYTES = 512 * 1024;

export interface CapturedDiff {
  diff: string;
  truncated: boolean;
  bytes: number;
}

/**
 * Exports active config to config/sync and the content manifest to
 * bench-state/content.json, then returns everything that changed since the
 * base app's baseline commit.
 */
export function captureDiff(site: string): CapturedDiff {
  const cex = drush(site, ['config:export', '-y']);
  if (cex.code !== 0) console.warn(`  config:export failed: ${cex.stderr.slice(-400)}`);
  try {
    writeContentSnapshot(site, readState(site));
  } catch (e: any) {
    console.warn(`  content snapshot failed: ${String(e.message).slice(0, 400)}`);
  }
  git(site, ['add', '-A']);
  const d = git(site, ['diff', '--cached', '--binary', 'HEAD']);
  const bytes = Buffer.byteLength(d.stdout);
  return bytes > MAX_DIFF_BYTES
    ? { diff: d.stdout.slice(0, MAX_DIFF_BYTES), truncated: true, bytes }
    : { diff: d.stdout, truncated: false, bytes };
}

export async function gradeSite(task: BenchTask, site: string, recorded?: CheckResult[]): Promise<CheckResult[]> {
  const grader = await loadGrader(task);
  drush(site, ['cache:rebuild']);
  return runGrader(grader, new GradeContext(site), recorded);
}

/** Applies a task's reference solution (reference/solution.sh) to a site. */
export function applyReference(task: BenchTask, site: string): void {
  const ref = path.join(task.dir, 'reference');
  const script = path.join(ref, 'solution.sh');
  if (!fs.existsSync(script)) throw new Error(`${task.id}: missing reference/solution.sh`);
  const r = run('bash', [script], { cwd: site, env: { ...process.env, REF: ref } });
  if (r.code !== 0) throw new Error(`${task.id}: reference solution failed\n${r.stdout.slice(-1500)}\n${r.stderr.slice(-2500)}`);
}

/**
 * Rebuilds a site from a recorded diff: a fresh base app, `git apply`, then
 * `drush config:import` so the active config matches the recorded export.
 */
export function siteFromDiff(name: string, diff: string): { site: string; ok: boolean; log: string } {
  const site = freshSite(name);
  const patch = path.join(site, '.bench-trial.patch');
  fs.writeFileSync(patch, diff);
  const a = git(site, ['apply', '--whitespace=nowarn', '.bench-trial.patch']);
  if (a.code !== 0) return { site, ok: false, log: `git apply failed: ${a.stderr}` };
  const c = drush(site, ['config:import', '-y']);
  drush(site, ['cache:rebuild']);
  return { site, ok: c.code === 0, log: c.code === 0 ? '' : `config:import failed: ${c.stderr.slice(-1500)}` };
}

export function summarize(results: CheckResult[]): { passed: number; total: number; allPassed: boolean } {
  const passed = results.filter((r) => r.pass).length;
  return { passed, total: results.length, allPassed: passed === results.length };
}
