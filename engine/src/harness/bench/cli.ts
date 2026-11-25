/**
 * Modern Drupal Guidance benchmark: volunteers run it on their own machines
 * with their own agent subscriptions.
 *
 *   bench --dry-run [--agent claude-code] [--modes ...] [--tasks pilot]
 *   bench [--agent claude-code] [--trials 5 | --full] [--modes unguided,skill] [--tasks pilot] [--seed <n>] [--model <id>]
 *   bench setup [--force]
 *   bench calibrate [--tasks pilot]
 *   bench --rerun-failed <results.json> [--failed-mode unguided] [--runs 3] [--modes unguided]
 *   bench summary <results.json>
 *   bench regrade <results.json> [--out <file>]
 *   bench dashboard [--export-only] [--port 8081]
 */
import fs from 'fs';
import path from 'path';
import { ensureBaseApp, freshSite, readBaseAppInfo, removeSite } from './base-app.ts';
import { AGENTS, CONTEXT7_LIBRARY, CONTEXT7_URL, MODES, redactContext7Key, type Mode } from './agents.ts';
import { calibrateTask, type CalibrationResult } from './calibrate.ts';
import { checkPrereqs, type PrereqResult } from './prereqs.ts';
import { buildPrompt, resolveTasks } from './tasks.ts';
import { DEFAULT_MODES, DEFAULT_TRIALS, maxTrials, orderModes, randomSeed, runPlan, seededShuffle, type PlanState } from './plan.ts';
import { captureDiff, gradeSite, siteFromDiff } from './trial.ts';
import { benchResultsDir, DRUPAL_VERSION } from './paths.ts';
import {
  RESULTS_SCHEMA, failedTasks, formatTable, guidanceInfo, newResultId, osInfo, summarize, summaryTable, trialErrored, writeResults,
  type ResultsFile, type TrialRecord,
} from './results.ts';

interface Args {
  command: 'run' | 'setup' | 'calibrate' | 'regrade' | 'summary' | 'dashboard';
  positional: string[];
  agent: string;
  modes: Mode[];
  tasks: string;
  runs: number;
  trials: number;
  full: boolean;
  seed?: number;
  skipSolved: boolean;
  model?: string;
  timeoutMin: number;
  allowWeb: boolean;
  keepSites: boolean;
  dryRun: boolean;
  force: boolean;
  out?: string;
  exportOnly: boolean;
  port?: string;
  yes: boolean;
  /** Results file whose failed tasks this run repeats. */
  rerunFailed?: string;
  failedMode: Mode;
  /** Filled in from rerunFailed. */
  rerunOf?: NonNullable<ResultsFile['harness']['rerunOf']>;
  /** Options given on the command line, so a rerun can pick its own defaults for the rest. */
  given: Set<string>;
}

/**
 * Rough per-trial token use for Claude Code on these tasks, before any
 * measured runs exist. Most tokens are prompt-cache reads of the growing
 * conversation; output is a small share. Replace with measured medians once
 * submissions arrive.
 */
const ESTIMATE_PER_TRIAL = { low: 300_000, high: 1_500_000, outputLow: 5_000, outputHigh: 20_000 };

function usage(): never {
  console.log(`Usage:
  bench --dry-run [--agent claude-code] [--modes unguided,skill] [--tasks pilot] [--trials ${DEFAULT_TRIALS}]
  bench [--agent claude-code] [--trials ${DEFAULT_TRIALS} | --full] [--modes unguided,skill] [--tasks pilot] [--seed <n>]
        [--no-skip-solved] [--runs 1] [--model <id>] [--timeout-min 20] [--allow-web] [--yes]
  bench setup [--force]              Build the base Drupal app into the cache
  bench calibrate [--tasks pilot]    Check graders against reference solutions and the base app
  bench --rerun-failed <file> [--failed-mode unguided] [--runs 3] [--modes unguided]
                                     Run again the tasks that failed in a results file
  bench summary <file>               Print the summary of a results file (runs nothing)
  bench regrade <file> [--out f]     Re-grade a results file from its recorded diffs
  bench dashboard [--export-only]    Load every file in benchmarks/results/ into the dashboard

Run options:
  --trials <n>      Cap on agent trials (default ${DEFAULT_TRIALS}; no cap with --rerun-failed). --trials 30 is enough for the whole pilot set.
  --full            No cap: every task in the set, every run. Not with --trials.
  --runs <n>        Run every task n times. The cap counts every run.
  --rerun-failed <file>  Use the tasks that failed in this results file as the task set.
  --failed-mode <m> The mode whose failures --rerun-failed picks (default unguided). Also the default --modes.
  --modes <list>    ${MODES.join(', ')} (default ${DEFAULT_MODES.join(',')}). Add mcp to check the MCP server too.
                    context7 swaps our MCP server for Context7's ${CONTEXT7_LIBRARY} docs (claude-code only).
  --no-skip-solved  Run guided modes even when the agent passes every check unguided.
  --seed <n>        Repeat a random task order.`);
  process.exit(2);
}

function parseCount(name: string, value: string, min: number): number {
  const n = Number(value);
  if (!/^\d+$/.test(value) || !Number.isSafeInteger(n) || n < min) {
    console.error(`${name} needs a whole number of at least ${min}, not "${value}".`);
    process.exit(2);
  }
  return n;
}

function parseArgs(argv: string[]): Args {
  const a: Args = {
    command: 'run', positional: [], agent: 'claude-code', modes: [...DEFAULT_MODES], tasks: 'pilot', runs: 1,
    trials: DEFAULT_TRIALS, full: false, skipSolved: true,
    timeoutMin: 20, allowWeb: false, keepSites: false, dryRun: false, force: false, exportOnly: false, yes: false,
    failedMode: 'unguided', given: new Set(),
  };
  const rest = [...argv];
  if (rest[0] && !rest[0].startsWith('-')) {
    const c = rest.shift()!;
    if (!['run', 'setup', 'calibrate', 'regrade', 'summary', 'dashboard'].includes(c)) usage();
    a.command = c as Args['command'];
  }
  while (rest.length) {
    const k = rest.shift()!;
    const v = () => rest.shift() ?? usage();
    if (k.startsWith('--')) a.given.add(k);
    switch (k) {
      case '--agent': a.agent = v(); break;
      case '--modes': a.modes = v().split(',').map((s) => s.trim()) as Mode[]; break;
      case '--tasks': a.tasks = v(); break;
      case '--runs': a.runs = parseCount(k, v(), 1); break;
      case '--trials': a.trials = parseCount(k, v(), 1); break;
      case '--rerun-failed': a.rerunFailed = v(); break;
      case '--failed-mode': a.failedMode = v() as Mode; break;
      case '--full': a.full = true; break;
      case '--seed': a.seed = parseCount(k, v(), 0); break;
      case '--no-skip-solved': a.skipSolved = false; break;
      case '--model': a.model = v(); break;
      case '--timeout-min': a.timeoutMin = Math.max(1, parseInt(v(), 10) || 20); break;
      case '--allow-web': a.allowWeb = true; break;
      case '--keep-sites': a.keepSites = true; break;
      case '--dry-run': a.dryRun = true; break;
      case '--force': a.force = true; break;
      case '--out': a.out = v(); break;
      case '--export-only': a.exportOnly = true; break;
      case '--port': a.port = v(); break;
      case '--yes': case '-y': a.yes = true; break;
      case '-h': case '--help': usage();
      default:
        if (k.startsWith('-')) { console.error(`Unknown option ${k}`); usage(); }
        a.positional.push(k);
    }
  }
  if (a.given.has('--trials') && a.full) { console.error('Pass --trials <n> or --full, not both.'); process.exit(2); }
  if (a.given.has('--failed-mode') && !a.rerunFailed) { console.error('--failed-mode needs --rerun-failed <file>.'); process.exit(2); }
  if (!MODES.includes(a.failedMode)) { console.error(`Unknown --failed-mode ${a.failedMode}. Use ${MODES.join(', ')}.`); process.exit(2); }
  if (a.rerunFailed) applyRerun(a);
  const bad = a.modes.filter((m) => !MODES.includes(m));
  if (bad.length) { console.error(`Unknown mode(s): ${bad.join(', ')}. Use ${MODES.join(', ')}.`); process.exit(2); }
  if (!AGENTS[a.agent]) { console.error(`Unknown agent ${a.agent}. Available: ${Object.keys(AGENTS).join(', ')}.`); process.exit(2); }
  if (a.agent !== 'claude-code' && a.modes.includes('context7')) { console.error('context7 mode is only wired up for --agent claude-code.'); process.exit(2); }
  a.modes = orderModes(a.modes);
  if (a.command === 'run' && !a.full && a.trials < a.modes.length) {
    console.error(`--trials ${a.trials} is too small: one task in modes ${a.modes.join(',')} needs ${a.modes.length} trials.`);
    process.exit(2);
  }
  return a;
}

function readResults(file: string): ResultsFile {
  let data: ResultsFile;
  try {
    data = JSON.parse(fs.readFileSync(file, 'utf8')) as ResultsFile;
  } catch (e: any) {
    console.error(`Cannot read results file ${file}: ${e?.message || e}`);
    process.exit(2);
  }
  if (data.schema !== RESULTS_SCHEMA) console.warn(`Warning: schema ${data.schema}, expected ${RESULTS_SCHEMA}.`);
  return data;
}

/**
 * --rerun-failed: the task set becomes the tasks that failed in `failedMode` in
 * the given file. Unless given, modes default to that mode alone and the cap
 * is lifted, so the default cap of ${DEFAULT_TRIALS} does not cut the rerun short.
 */
function applyRerun(a: Args): void {
  if (a.given.has('--tasks')) { console.error('--rerun-failed picks the tasks itself; leave out --tasks.'); process.exit(2); }
  const data = readResults(a.rerunFailed!);
  const ids = failedTasks(data.trials, a.failedMode);
  if (!ids.length) {
    console.error(`No task failed in mode ${a.failedMode} in ${a.rerunFailed}. Nothing to rerun.`);
    process.exit(2);
  }
  a.tasks = ids.join(',');
  if (!a.given.has('--modes')) a.modes = [a.failedMode];
  if (!a.given.has('--trials')) a.full = true;
  a.rerunOf = { id: data.id, file: path.basename(a.rerunFailed!), failedMode: a.failedMode, tasks: ids.length };
}

function printPrereqs(results: PrereqResult[]): boolean {
  const rows = [['Prerequisite', 'OK', 'Detail']];
  for (const r of results) rows.push([r.name, r.ok ? 'yes' : 'NO', r.detail]);
  console.log(formatTable(rows));
  for (const r of results.filter((x) => !x.ok && x.fix)) console.log(`  fix ${r.name}: ${r.fix}`);
  return results.every((r) => r.ok);
}

function printCalibration(results: CalibrationResult[]): boolean {
  const rows = [['Task', 'Calibrated', 'Reference', 'Base app (MUST fail / MUST NOT pass)', 'Re-grade', 'Time']];
  for (const r of results) {
    const mustBase = r.base.filter((c) => c.kind === 'must');
    const notBase = r.base.filter((c) => c.kind === 'must_not');
    rows.push([
      r.task,
      r.ok ? 'yes' : 'NO',
      `${r.reference.filter((c) => c.pass).length}/${r.reference.length} pass`,
      `${mustBase.filter((c) => !c.pass).length}/${mustBase.length} fail, ${notBase.filter((c) => c.pass).length}/${notBase.length} pass`,
      r.regrade.length ? `${r.regrade.filter((c) => c.pass).length}/${r.regrade.length} pass` : '-',
      `${r.seconds}s`,
    ]);
  }
  console.log(formatTable(rows));
  for (const r of results) for (const p of r.problems) console.log(`  ${r.task}: ${p}`);
  return results.every((r) => r.ok);
}

/** The trial cap and the most trials this run can start. */
function planSize(a: Args, taskCount: number): { cap: number; max: number } {
  const pairs = taskCount * a.runs;
  const cap = a.full ? pairs * a.modes.length : a.trials;
  return { cap, max: maxTrials({ pairs, modes: a.modes, cap, skipSolved: a.skipSolved }) };
}

function printPlan(a: Args, taskCount: number): void {
  const { cap, max } = planSize(a, taskCount);
  const skipping = a.skipSolved && a.modes.length > 1 && a.modes.includes('unguided');
  if (a.rerunOf) {
    console.log(`\nRerun: the ${taskCount} task(s) that failed ${a.rerunOf.failedMode} in ${a.rerunOf.file}, ` +
      `${a.runs} time(s) each, in modes ${a.modes.join(', ')}.\nTasks: ${a.tasks.split(',').join(', ')}`);
  }
  console.log(`\nPlan: at most ${max} agent trial(s) (${a.full ? 'full set' : `cap ${cap}`}), modes ${a.modes.join(', ')}, ` +
    `${taskCount} task(s) in the set in random order.` +
    (a.runs > 1 ? ` Each task runs ${a.runs} times.` : '') +
    (skipping ? ' A task solved unguided skips its guided trials.' : ''));
  const whole = taskCount * a.runs * a.modes.length;
  if (!a.full && cap < whole) {
    console.log(`The cap of ${cap} trial(s) can stop this run before it covers every task and run: the whole plan needs up to ${whole}. ` +
      `Pass --full or --trials ${whole} to run all of it.`);
  }
  const m = (n: number) => `${(n / 1_000_000).toFixed(1)}M`;
  console.log(`Estimated agent usage for up to ${max} trial(s) (an estimate, not measured): ` +
    `${m(max * ESTIMATE_PER_TRIAL.low)}-${m(max * ESTIMATE_PER_TRIAL.high)} tokens in total, mostly prompt-cache reads, ` +
    `of which ${Math.round(max * ESTIMATE_PER_TRIAL.outputLow / 1000)}k-${Math.round(max * ESTIMATE_PER_TRIAL.outputHigh / 1000)}k output tokens.`);
}

async function dryRun(a: Args): Promise<number> {
  const tasks = resolveTasks(a.tasks);
  const agent = AGENTS[a.agent];
  console.log(`Dry run: no model is called.`);
  printPlan(a, tasks.length);
  console.log('');
  const prereqOk = printPrereqs(await checkPrereqs(agent, a.modes));
  console.log('\nBase app');
  const info = ensureBaseApp((s) => console.log(`  ${s}`), a.force);
  console.log(`  Drupal ${info.drupal}, Drush ${info.drush}, PHP ${info.php}, profile ${info.profile} + recipes ${info.recipes.join(', ')}`);
  console.log(`\nGrader calibration (${tasks.length} tasks; about 30 s each)`);
  const cal: CalibrationResult[] = [];
  for (const t of tasks) {
    process.stdout.write(`  ${t.id} ... `);
    const r = await calibrateTask(t);
    console.log(r.ok ? 'ok' : 'PROBLEM');
    cal.push(r);
  }
  const calOk = printCalibration(cal);
  console.log(prereqOk && calOk ? '\nDry run passed. Your setup is ready for a full run.' : '\nDry run found problems; see above.');
  return prereqOk && calOk ? 0 : 1;
}

async function fullRun(a: Args): Promise<number> {
  const tasks = resolveTasks(a.tasks);
  const agent = AGENTS[a.agent];
  const prereqs = await checkPrereqs(agent, a.modes);
  if (!printPrereqs(prereqs)) {
    console.error('\nFix the prerequisites above first (bench --dry-run checks them for free).');
    return 1;
  }
  const info = ensureBaseApp((s) => console.log(s));
  const { cap, max } = planSize(a, tasks.length);
  const seed = a.seed ?? randomSeed();
  const order = seededShuffle(tasks.map((t) => t.id), seed);
  const byId = new Map(tasks.map((t) => [t.id, t]));
  printPlan(a, tasks.length);
  console.log(`Task order (seed ${seed}): ${order.join(', ')}`);
  if (!a.yes) {
    console.log(`\nThis runs at most ${max} agent trial(s) with ${agent.id} on your account. Starting in 10 seconds; press Ctrl+C to cancel (or pass --yes).`);
    await new Promise((r) => setTimeout(r, 10_000));
  }

  const id = newResultId();
  const logRoot = path.join(benchResultsDir, '.logs', id);
  let state: PlanState = { trials: [], solvedUnguided: [] };
  let file = '';
  const agentVersion = agent.check().version;
  let model = a.model;

  async function runTrial(taskId: string, mode: Mode, runNo: number): Promise<TrialRecord> {
    const task = byId.get(taskId)!;
    console.log(`\n▶ ${task.id} / ${mode} / run ${runNo}`);
    const site = freshSite(`${id}-${task.id}-${mode}-${runNo}`);
    const startedAt = new Date().toISOString();
    const res = await agent.run({
      site, prompt: buildPrompt(task), mode, timeoutMs: a.timeoutMin * 60_000,
      logDir: path.join(logRoot, `${task.id}-${mode}-${runNo}`), allowWeb: a.allowWeb, model: a.model,
    });
    model = model || res.model;
    if (res.infraError) {
      // The agent never ran, or ran without its docs, so grading the site would score it as a failed attempt.
      console.error(`  ${res.infraError === 'auth' ? 'agent could not sign in' : 'Context7 failed'}: ${(res.error || '').slice(0, 200)}`);
      if (!a.keepSites) removeSite(site);
      return { task: task.id, mode, run: runNo, startedAt, agent: res, checks: [], passed: 0, total: 0,
        diff: '', diffTruncated: false, diffBytes: 0 };
    }
    const captured = captureDiff(site);
    const checks = await gradeSite(task, site);
    const passed = checks.filter((c) => c.pass).length;
    console.log(`  ${passed}/${checks.length} checks, ${res.durationSec}s, ${res.tokens ? res.tokens.total.toLocaleString('en-US') + ' tokens' : 'tokens n/a'}` +
      `${res.error ? `, agent error: ${res.error.slice(0, 160)}` : ''}`);
    for (const c of checks.filter((x) => !x.pass)) console.log(`    ✗ ${c.id}: ${c.text}${c.detail ? ` [${c.detail.slice(0, 160)}]` : ''}`);
    if (!a.keepSites) removeSite(site);
    return { task: task.id, mode, run: runNo, startedAt, agent: res, checks, passed, total: checks.length,
      diff: redactContext7Key(captured.diff), diffTruncated: captured.truncated, diffBytes: captured.bytes };
  }

  function build(): ResultsFile {
    return {
      schema: RESULTS_SCHEMA,
      id,
      createdAt: new Date().toISOString(),
      agent: { id: agent.id, version: agentVersion, model: model || 'default', ...(process.env.CLAUDE_EFFORT ? { effort: process.env.CLAUDE_EFFORT } : {}) },
      guidance: guidanceInfo(),
      drupal: { core: info.drupal, drush: info.drush, php: info.php, profile: info.profile, recipes: info.recipes },
      os: osInfo(),
      harness: {
        tasks: a.tasks, modes: a.modes, runs: a.runs, allowWeb: a.allowWeb, timeoutMin: a.timeoutMin, trialCap: cap, seed, skipSolved: a.skipSolved,
        ...(a.rerunOf ? { rerunOf: a.rerunOf } : {}),
        ...(a.modes.includes('context7') ? { context7: { url: CONTEXT7_URL, libraryId: CONTEXT7_LIBRARY, apiKey: !!process.env.CONTEXT7_API_KEY } } : {}),
      },
      solvedUnguided: state.solvedUnguided,
      summary: summarize(state.trials, a.modes, state.solvedUnguided),
      trials: state.trials,
    };
  }
  function writeOut() {
    if (file) fs.rmSync(file, { force: true });
    file = writeResults(build(), a.out ? path.resolve(a.out) : benchResultsDir);
  }

  const outcome = await runPlan({
    taskIds: order, runs: a.runs, modes: a.modes, cap, skipSolved: a.skipSolved, runTrial,
    onTrial: (s) => {
      state = s;
      const last = s.trials.at(-1)!;
      if (last.mode === 'unguided' && s.solvedUnguided.some((x) => x.task === last.task && x.run === last.run)) {
        console.log('  Solved unguided: skipping the guided trials for this task.');
      }
      // Write partial results after every trial so an interrupted run keeps its data.
      writeOut();
    },
  });
  if (outcome.aborted && state.trials.at(-1)?.agent.infraError === 'context7') {
    const done = new Set(state.trials.filter((t) => !t.agent.infraError).map((t) => t.task));
    console.error('\nStopping the run: Context7 was unreachable or rate limited, so later trials could fail the same way.');
    console.error('Wait for the limit to reset (or export CONTEXT7_API_KEY), then run the rest with --full and:');
    console.error(`  --tasks ${order.filter((t) => !done.has(t)).join(',')}`);
    console.error(`Partial results (do not submit): ${file}`);
    return 3;
  }
  if (outcome.aborted) {
    console.error('\nStopping the run: the agent failed to sign in, so later trials would fail the same way.');
    console.error('Sign in again, or use a long-lived token (`claude setup-token`, then export CLAUDE_CODE_OAUTH_TOKEN). See benchmarks/README.md.');
    console.error(`Partial results (do not submit): ${file}`);
    return 3;
  }

  const final = build();
  console.log(`\n${summaryTable(final.summary)}`);
  if (a.rerunOf) console.log(`Every task here failed ${a.rerunOf.failedMode} in ${a.rerunOf.file}; the runs above are new trials only.`);
  console.log(`\n${state.trials.length} agent trial(s) run, seed ${seed}.`);
  console.log(`Results: ${file}\nTranscripts (local only, not for submission): ${logRoot}`);
  console.log('Submit by opening a pull request that adds the results file. See benchmarks/README.md.');
  return 0;
}

/** Recomputes and prints the summary of a results file from its trials. Calls no agent and builds nothing. */
function summary(a: Args): number {
  const file = a.positional[0];
  if (!file) usage();
  const data = readResults(file);
  const s = summarize(data.trials, data.harness.modes, data.solvedUnguided);
  const h = data.harness;
  console.log(`${path.basename(file)}: ${data.agent.id} ${data.agent.model}, tasks ${h.rerunOf ? `rerun of ${h.rerunOf.failedMode} failures in ${h.rerunOf.file}` : h.tasks}, ` +
    `modes ${h.modes.join(', ')}, runs ${h.runs}, ${data.trials.length} trial(s), skip solved ${h.skipSolved === undefined ? 'not recorded' : h.skipSolved ? 'on' : 'off'}.\n`);
  console.log(summaryTable(s));
  return 0;
}

async function regrade(a: Args): Promise<number> {
  const file = a.positional[0];
  if (!file) usage();
  const data = readResults(file);
  if (data.drupal.core !== DRUPAL_VERSION) console.warn(`Warning: recorded on Drupal ${data.drupal.core}; this checkout pins ${DRUPAL_VERSION}.`);
  ensureBaseApp((s) => console.log(s));
  const rows = [['Task', 'Mode', 'Run', 'Recorded', 'Re-graded', 'Changed checks']];
  const regraded: TrialRecord[] = [];
  for (const t of data.trials) {
    if (trialErrored(t)) {
      rows.push([t.task, t.mode, String(t.run), 'errored', 'skipped', '-']);
      regraded.push(t);
      continue;
    }
    const task = resolveTasks(t.task)[0];
    if (t.diffTruncated) console.warn(`  ${t.task}/${t.mode}: diff was truncated; re-grade may differ.`);
    const rebuilt = siteFromDiff(`regrade-${data.id}-${t.task}-${t.mode}-${t.run}`, t.diff);
    if (!rebuilt.ok) console.warn(`  ${t.task}/${t.mode}: ${rebuilt.log.slice(0, 300)}`);
    const checks = await gradeSite(task, rebuilt.site, t.checks);
    removeSite(rebuilt.site);
    const passed = checks.filter((c) => c.pass).length;
    const changed = checks.filter((c) => t.checks.find((o) => o.id === c.id)?.pass !== c.pass).map((c) => `${c.id}:${c.pass ? 'now pass' : 'now fail'}`);
    rows.push([t.task, t.mode, String(t.run), `${t.passed}/${t.total}`, `${passed}/${checks.length}`, changed.join(', ') || '-']);
    regraded.push({ ...t, checks, passed, total: checks.length });
  }
  console.log(formatTable(rows));
  const summary = summarize(regraded, data.harness.modes, data.solvedUnguided);
  console.log(`\nRe-graded summary\n${summaryTable(summary)}`);
  if (a.out) {
    fs.writeFileSync(a.out, JSON.stringify({ ...data, summary, trials: regraded, regradedAt: new Date().toISOString() }, null, 2) + '\n');
    console.log(`Wrote ${a.out}`);
  }
  return 0;
}

async function main(): Promise<number> {
  const a = parseArgs(process.argv.slice(2));
  switch (a.command) {
    case 'setup': {
      const info = ensureBaseApp((s) => console.log(s), a.force);
      console.log(`Base app ready: Drupal ${info.drupal}, Drush ${info.drush}, PHP ${info.php}`);
      return 0;
    }
    case 'calibrate': {
      ensureBaseApp((s) => console.log(s));
      const res: CalibrationResult[] = [];
      for (const t of resolveTasks(a.tasks)) res.push(await calibrateTask(t, { keep: a.keepSites }));
      return printCalibration(res) ? 0 : 1;
    }
    case 'regrade':
      return regrade(a);
    case 'summary':
      return summary(a);
    case 'dashboard': {
      const { exportToDashboard, startDashboard } = await import('./dashboard.ts');
      const jobs = exportToDashboard();
      console.log(`Exported ${jobs.length} dashboard job(s) from ${benchResultsDir}`);
      if (a.exportOnly) return 0;
      await startDashboard(a.port);
      return new Promise<number>(() => {}); // keep serving until Ctrl+C
    }
    default:
      if (!readBaseAppInfo() && !a.dryRun) console.log('Base app not built yet; building it first (one time).');
      return a.dryRun ? dryRun(a) : fullRun(a);
  }
}

main().then((code) => process.exit(code), (e) => {
  console.error(e?.stack || e);
  process.exit(1);
});
