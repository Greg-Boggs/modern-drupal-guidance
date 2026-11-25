/**
 * Feeds benchmark results into the upstream eval dashboard (src/dashboard).
 *
 * The dashboard reads jobs from results/suites/<job>/evals.json, each job
 * comparing one guided condition with unguided. Every results file in
 * benchmarks/results/ becomes one job per guided mode (skill, mcp,
 * context7), and an aggregate job per mode pools every submission (bench-all-<mode>).
 * Only task runs scored both unguided and guided are exported, so a job's
 * pass rates cover the tasks that failed unguided when solved tasks were
 * skipped. Each job also records `benchmark.allTasks`: both modes over every
 * task run, with skipped solved tasks counted as guided passes (an upper
 * bound), the same figures `bench summary` prints.
 * Diffs are written next to each trial as agent.patch.
 */
import fs from 'fs';
import path from 'path';
import { outDir, suitesDir } from '../../core/paths.ts';
import { listTaskIds, loadTask } from './tasks.ts';
import { benchResultsDir } from './paths.ts';
import { RESULTS_SCHEMA, computeUplift, pairKey, pairedKeys, trialErrored, type ResultsFile, type TrialRecord } from './results.ts';
import type { Mode } from './agents.ts';

const JOB_PREFIX = 'bench-';

function loadResultFiles(): { name: string; data: ResultsFile }[] {
  if (!fs.existsSync(benchResultsDir)) return [];
  return fs.readdirSync(benchResultsDir)
    .filter((f) => f.endsWith('.json'))
    .sort()
    .flatMap((f) => {
      try {
        const data = JSON.parse(fs.readFileSync(path.join(benchResultsDir, f), 'utf8')) as ResultsFile;
        return data.schema === RESULTS_SCHEMA ? [{ name: f.replace(/\.json$/, ''), data }] : [];
      } catch {
        console.warn(`Skipping unreadable results file ${f}`);
        return [];
      }
    });
}

function trialEntry(t: TrialRecord, baseApp: string, runNumber: number, agent: string, model: string) {
  const cached = t.agent.tokens ? t.agent.tokens.cacheRead : 0;
  return {
    runNumber,
    baseApp,
    guideName: t.task,
    agent,
    model,
    results: t.checks.map((c) => ({ passed: c.pass, message: `${c.kind === 'must_not' ? 'MUST NOT: ' : ''}${c.text}` })),
    ...(t.agent.tokens ? { tokenUsage: { total: t.agent.tokens.total, cached } } : {}),
    runtimeMs: t.agent.durationSec * 1000,
    guidesUsed: [] as string[],
  };
}

interface Job {
  id: string;
  serving: 'skills' | 'mcp';
  sources: { name: string; data: ResultsFile }[];
}

function writeJob(job: Job, guided: Mode): void {
  const dir = path.join(suitesDir, job.id);
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(dir, { recursive: true });
  const results: Record<string, any[]> = {};
  const counters: Record<string, number> = {};
  let passed = { guided: 0, unguided: 0 };
  let totals = { guided: 0, unguided: 0 };
  const first = job.sources[0].data;
  for (const { data } of job.sources) {
    const baseApp = `drupal-${data.drupal.core}`;
    // Compare like with like: leave out task runs without both sides, such as tasks solved unguided.
    const paired = pairedKeys(data.trials, guided);
    for (const t of data.trials) {
      if (t.mode !== guided && t.mode !== 'unguided') continue;
      if (!paired.has(pairKey(t))) continue;
      if (trialErrored(t)) continue; // the agent never ran; not a scored attempt
      const condition = t.mode === 'unguided' ? 'unguided' : 'guided';
      const key = `${baseApp} - ${t.task} - ${condition}`;
      counters[key] = (counters[key] || 0) + 1;
      (results[key] ||= []).push(trialEntry(t, baseApp, counters[key], data.agent.id, data.agent.model));
      passed[condition] += t.passed === t.total && t.total > 0 ? 1 : 0;
      totals[condition] += 1;
      const trialDir = path.join(dir, String(counters[key]), t.task, t.task, condition);
      fs.mkdirSync(trialDir, { recursive: true });
      fs.writeFileSync(path.join(trialDir, 'agent.patch'), t.diff);
    }
  }
  const rate = (p: number, n: number) => (n ? Math.round((p / n) * 100) : 0);
  // Pool the per-file comparisons over every task run (see computeUplift).
  const all = { taskRuns: 0, unguidedPassed: 0, guidedPassed: 0, assumedPasses: 0, failedUnguided: 0, fixed: 0, solvedUnguided: 0, broke: 0 };
  for (const { data } of job.sources) {
    const up = computeUplift(data.trials, guided, data.solvedUnguided);
    if (!up) continue;
    all.taskRuns += up.taskRuns;
    all.unguidedPassed += up.unguided.tasksPassed;
    all.guidedPassed += up.guided.tasksPassed;
    all.assumedPasses += up.assumedPasses;
    all.failedUnguided += up.failedUnguided;
    all.fixed += up.fixed;
    all.solvedUnguided += up.solvedUnguided;
    all.broke += up.broke;
  }
  const pts = all.taskRuns ? Math.round((all.guidedPassed - all.unguidedPassed) / all.taskRuns * 1000) / 10 : 0;
  const allTasks = { ...all, upperBound: all.assumedPasses > 0, unguidedPassRate: rate(all.unguidedPassed, all.taskRuns), guidedPassRate: rate(all.guidedPassed, all.taskRuns), taskPassRatePts: pts };
  const le = allTasks.upperBound ? '≤' : '';
  const evals = {
    agent: job.sources.length === 1 ? first.agent.id : 'mixed',
    model: job.sources.length === 1 ? first.agent.model : 'mixed',
    serving: job.serving,
    benchmark: {
      sources: job.sources.map((s) => s.name),
      guidedMode: guided,
      /** What `summary` and `results` cover. */
      scope: 'task runs scored in both modes; tasks solved unguided and skipped are not in this job',
      allTasks,
    },
    summary: {
      unguidedPassRate: rate(passed.unguided, totals.unguided),
      guidedPassRate: rate(passed.guided, totals.guided),
      unguidedPassed: passed.unguided,
      unguidedTotal: totals.unguided,
      guidedPassed: passed.guided,
      guidedTotal: totals.guided,
      runsPerTest: Math.max(1, ...Object.values(counters)),
    },
    results,
  };
  fs.writeFileSync(path.join(dir, 'evals.json'), JSON.stringify(evals, null, 2));
  fs.writeFileSync(path.join(dir, 'evals.md'), [
    `# ${job.id}`, '',
    `Sources: ${job.sources.map((s) => s.name).join(', ')}`, '',
    `All ${allTasks.taskRuns} task run(s). ` +
      (allTasks.upperBound ? `The ${allTasks.assumedPasses} solved unguided were skipped and count as ${guided} passes, so the ${guided} figures are upper bounds:` : 'Every task run was scored in both modes:'), '',
    '| Group | Tasks fully passed |', '|---|---|',
    `| Unguided | ${allTasks.unguidedPassRate}% (${allTasks.unguidedPassed}/${allTasks.taskRuns}) |`,
    `| ${guided} | ${le}${allTasks.guidedPassRate}% (${le}${allTasks.guidedPassed}/${allTasks.taskRuns}) |`,
    `| Uplift | ${le}${pts >= 0 ? '+' : ''}${pts} pts |`, '',
    `${guided} fixed ${allTasks.fixed} of ${allTasks.failedUnguided} task run(s) that failed unguided` +
      (allTasks.solvedUnguided ? ` and broke ${allTasks.broke} of ${allTasks.solvedUnguided} that passed unguided.` : '.'), '',
    'This job holds only the task runs scored in both modes:', '',
    '| Group | Tasks fully passed |', '|---|---|',
    `| Unguided | ${rate(passed.unguided, totals.unguided)}% (${passed.unguided}/${totals.unguided}) |`,
    `| ${guided} | ${rate(passed.guided, totals.guided)}% (${passed.guided}/${totals.guided}) |`, '',
  ].join('\n'));
}

/** Rewrites every bench-* job from the files in benchmarks/results/. Returns the job ids. */
export function exportToDashboard(): string[] {
  fs.mkdirSync(suitesDir, { recursive: true });
  for (const d of fs.readdirSync(suitesDir)) {
    if (d.startsWith(JOB_PREFIX)) fs.rmSync(path.join(suitesDir, d), { recursive: true, force: true });
  }
  const files = loadResultFiles();
  const jobs: string[] = [];
  for (const guided of ['skill', 'mcp', 'context7'] as Mode[]) {
    const serving = guided === 'skill' ? 'skills' : 'mcp'; // context7 is served over MCP too
    const withMode = files.filter((f) => pairedKeys(f.data.trials, guided).size > 0);
    for (const f of withMode) {
      const id = `${JOB_PREFIX}${f.name}-${guided}`;
      writeJob({ id, serving, sources: [f] }, guided);
      jobs.push(id);
    }
    if (withMode.length) {
      const id = `${JOB_PREFIX}all-${guided}`;
      writeJob({ id, serving, sources: withMode }, guided);
      jobs.push(id);
    }
  }
  return jobs;
}

/**
 * Writes the dashboard manifests, then starts the upstream dashboard server.
 * The grouped-tasks manifest is built from the benchmark's own task list,
 * because upstream builds it from guide eval folders this fork does not have.
 */
export async function startDashboard(port?: string): Promise<void> {
  if (port) process.env.PORT = port;
  const out = path.join(outDir, 'dashboard');
  fs.mkdirSync(out, { recursive: true });
  // @ts-ignore untyped upstream JavaScript
  const m = await import('../../dashboard/generate-manifests.js');
  m.generateMapping(out);
  m.generateDemosManifest(out);
  const grouped: Record<string, Record<string, string[]>> = {};
  for (const id of listTaskIds()) {
    const t = loadTask(id);
    const category = t.kind === 'code' ? 'benchmark: code' : 'benchmark: site building';
    (grouped[category] ||= {})[t.id] = [t.id];
  }
  fs.writeFileSync(path.join(out, 'grouped-tasks.gen.json'), JSON.stringify({ guides: grouped, disciplineGuides: [] }, null, 2));
  await m.generateJobsManifest(out, suitesDir);
  // @ts-ignore untyped upstream JavaScript
  await import('../../dashboard/server.js');
}
