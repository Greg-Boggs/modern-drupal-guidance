import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import type { CheckResult } from '../../grading/drupal/context.ts';
import { isAuthError, type AgentRunResult, type Mode, type TokenUsage } from './agents.ts';
import { benchResultsDir, projectRoot, skillDistDir } from './paths.ts';
import { run } from './exec.ts';

export const RESULTS_SCHEMA = 'modern-drupal-guidance-bench/1';

export interface TrialRecord {
  task: string;
  mode: Mode;
  run: number;
  startedAt: string;
  agent: Omit<AgentRunResult, 'guidanceCalls'> & { guidanceCalls: AgentRunResult['guidanceCalls'] };
  checks: CheckResult[];
  passed: number;
  total: number;
  diff: string;
  diffTruncated: boolean;
  diffBytes: number;
}

/** A task run the agent fully solved unguided, so its guided trials were skipped. */
export interface SolvedUnguided {
  task: string;
  run: number;
}

export interface ModeSummary {
  /** Scored trials: trials where the agent actually ran. */
  trials: number;
  /** Trials where the agent could not run (for example, sign-in failed). Excluded from every rate. */
  errored: number;
  tasksFullyPassed: number;
  taskPassRate: number;
  checksPassed: number;
  checksTotal: number;
  checkPassRate: number;
  tokens?: TokenUsage;
  costUsd?: number;
  /** Guided modes: scored trials by how far the agent got into the guidance, and how many of them fully passed. */
  guideUse?: Record<GuideUse, { trials: number; passed: number }>;
}

/**
 * How far a trial got into the guidance: `read` retrieved guidance text,
 * `looked` loaded the skill or searched but read nothing, `none` never looked.
 * `unrecorded` is an MCP trial from before MCP calls were split into search
 * and retrieve, so it used the tools but the file cannot say whether it read.
 */
export type GuideUse = 'read' | 'looked' | 'none' | 'unrecorded';
export const GUIDE_USES: GuideUse[] = ['read', 'looked', 'none', 'unrecorded'];

export function guideUse(t: TrialRecord): GuideUse {
  const g = t.agent.guidanceCalls;
  if (g.retrieve > 0) return 'read';
  if (g.mcp > 0 && g.search === 0) return 'unrecorded';
  if (g.search > 0 || g.skill > 0 || g.mcp > 0) return 'looked';
  return 'none';
}

export interface Rates {
  tasksPassed: number;
  taskPassRate: number;
  checksPassed: number;
  checksTotal: number;
  checkPassRate: number;
}

/**
 * One guided mode against unguided, over the same task runs. A task run counts
 * when its unguided trial was scored and its guided trial was scored or skipped
 * because the agent solved the task unguided. Skipped task runs are counted as
 * guided passes, with the unguided checks, so the guided figures are then an
 * upper bound (`upperBound`).
 */
export interface Uplift {
  /** Task runs compared. */
  taskRuns: number;
  /** Task runs with both trials scored. */
  pairs: number;
  /** Task runs solved unguided whose guided trial was skipped: assumed to pass guided. */
  assumedPasses: number;
  upperBound: boolean;
  unguided: Rates;
  guided: Rates;
  /** Guided minus unguided, in percentage points, over the same `taskRuns`. */
  taskPassRatePts: number;
  checkPassRatePts: number;
  /** Scored pairs that failed unguided, and how many of them passed guided. */
  failedUnguided: number;
  fixed: number;
  /** Scored pairs solved unguided, and how many of them failed guided. Only without skipping. */
  solvedUnguided: number;
  broke: number;
  /** Task runs with a scored unguided trial but no guided result that were not skipped (cap reached or errored). Left out. */
  missing: number;
}

/** A task's results in one mode across every run of it. */
export interface TaskConsistency {
  task: string;
  mode: Mode;
  passed: number;
  scored: number;
  label: 'consistent pass' | 'consistent fail' | 'flaky' | 'one run';
}

export interface Summary {
  /** Per mode, over the trials that ran in that mode. Guided modes skip solved tasks, so compare modes with `uplift`, not with these. */
  byMode: Partial<Record<Mode, ModeSummary>>;
  uplift: Partial<Record<Mode, Uplift>>;
  solvedUnguided: number;
  /** Present when some task was scored more than once in a mode. */
  consistency?: TaskConsistency[];
}

export interface ResultsFile {
  schema: string;
  id: string;
  createdAt: string;
  agent: { id: string; version?: string; model: string; effort?: string };
  guidance: { skillVersion?: string; repoCommit?: string; guideCount?: number };
  drupal: { core: string; drush: string; php: string; profile: string; recipes: string[] };
  os: { platform: string; release: string; arch: string };
  /** trialCap, seed and skipSolved are missing in files from before trials were capped. */
  harness: {
    tasks: string; modes: Mode[]; runs: number; allowWeb: boolean; timeoutMin: number; trialCap?: number; seed?: number; skipSolved?: boolean;
    /** Set when the run repeated the tasks that failed in another results file. */
    rerunOf?: { id: string; file: string; failedMode: Mode; tasks: number };
    /** Set when context7 mode ran: where its docs came from, and whether a key was set (never the key). */
    context7?: { url: string; libraryId: string; apiKey: boolean };
  };
  solvedUnguided?: SolvedUnguided[];
  summary: Summary;
  trials: TrialRecord[];
}

export function newResultId(): string {
  return crypto.randomBytes(3).toString('hex');
}

export function guidanceInfo(): ResultsFile['guidance'] {
  const versionFile = path.join(skillDistDir, 'skill-version.txt');
  const commit = run('git', ['-C', projectRoot, 'rev-parse', '--short', 'HEAD']);
  const guidesDir = path.join(skillDistDir, 'guides');
  let guideCount: number | undefined;
  try {
    guideCount = (fs.globSync('**/*.md', { cwd: guidesDir }) as string[]).length;
  } catch { /* not built */ }
  return {
    skillVersion: fs.existsSync(versionFile) ? fs.readFileSync(versionFile, 'utf8').trim() : undefined,
    repoCommit: commit.code === 0 ? commit.stdout.trim() : 'uncommitted',
    guideCount,
  };
}

export function osInfo(): ResultsFile['os'] {
  return { platform: process.platform, release: os.release(), arch: process.arch };
}

function addTokens(a: TokenUsage | undefined, b: TokenUsage | undefined): TokenUsage | undefined {
  if (!b) return a;
  if (!a) return { ...b };
  return { input: a.input + b.input, output: a.output + b.output, cacheRead: a.cacheRead + b.cacheRead, cacheCreation: a.cacheCreation + b.cacheCreation, total: a.total + b.total };
}

/** True when infrastructure failed the trial: the agent never ran, or Context7 failed (older files lack infraError, so the message is checked too). */
export function trialErrored(t: TrialRecord): boolean {
  return !!t.agent.infraError || isAuthError(t.agent.error);
}

/** True when the agent ran and passed every check. */
export function isSolved(t: TrialRecord): boolean {
  return !trialErrored(t) && t.total > 0 && t.passed === t.total;
}

export function pairKey(t: { task: string; run: number }): string {
  return `${t.task}#${t.run}`;
}

/** Keys of the task runs with a scored trial both unguided and in `mode`: the only ones uplift compares. */
export function pairedKeys(trials: TrialRecord[], mode: Mode): Set<string> {
  const scored = (m: Mode) => trials.filter((t) => t.mode === m && !trialErrored(t)).map(pairKey);
  const unguided = new Set(scored('unguided'));
  return new Set(scored(mode).filter((k) => unguided.has(k)));
}

function passRates(ts: TrialRecord[]): Rates {
  return rates(ts.map((t) => ({ passed: t.passed, total: t.total, solved: isSolved(t) })));
}

function rates(xs: { passed: number; total: number; solved: boolean }[]): Rates {
  const checksPassed = xs.reduce((n, x) => n + x.passed, 0);
  const checksTotal = xs.reduce((n, x) => n + x.total, 0);
  const full = xs.filter((x) => x.solved).length;
  return {
    tasksPassed: full,
    taskPassRate: pct(full, xs.length),
    checksPassed,
    checksTotal,
    checkPassRate: pct(checksPassed, checksTotal),
  };
}

function pct(n: number, d: number): number {
  return d ? round(n / d * 100) : 0;
}

/** Guided against unguided over the same task runs; see `Uplift`. Undefined when nothing can be compared. */
export function computeUplift(trials: TrialRecord[], mode: Mode, solvedUnguided: SolvedUnguided[] = []): Uplift | undefined {
  const scored = (m: Mode) => new Map(trials.filter((t) => t.mode === m && !trialErrored(t)).map((t) => [pairKey(t), t]));
  const base = scored('unguided');
  const guided = scored(mode);
  const skipped = new Set(solvedUnguided.map(pairKey));
  const attempted = new Set(trials.filter((t) => t.mode === mode).map(pairKey));
  type Row = { passed: number; total: number; solved: boolean };
  const u: Row[] = [];
  const g: Row[] = [];
  let pairs = 0, assumedPasses = 0, missing = 0, failedUnguided = 0, fixed = 0, solvedU = 0, broke = 0;
  for (const [key, ut] of base) {
    const gt = guided.get(key);
    const uRow = { passed: ut.passed, total: ut.total, solved: isSolved(ut) };
    if (gt) {
      pairs++;
      u.push(uRow);
      g.push({ passed: gt.passed, total: gt.total, solved: isSolved(gt) });
      if (uRow.solved) { solvedU++; if (!isSolved(gt)) broke++; }
      else { failedUnguided++; if (isSolved(gt)) fixed++; }
    } else if (skipped.has(key) && uRow.solved && !attempted.has(key)) {
      assumedPasses++;
      u.push(uRow);
      g.push(uRow);
    } else {
      missing++;
    }
  }
  if (!u.length) return undefined;
  const ur = rates(u);
  const gr = rates(g);
  return {
    taskRuns: u.length,
    pairs,
    assumedPasses,
    upperBound: assumedPasses > 0,
    unguided: ur,
    guided: gr,
    // From the counts, not the rounded rates.
    taskPassRatePts: round((gr.tasksPassed - ur.tasksPassed) / u.length * 100),
    checkPassRatePts: ur.checksTotal && gr.checksTotal ? round((gr.checksPassed / gr.checksTotal - ur.checksPassed / ur.checksTotal) * 100) : 0,
    failedUnguided,
    fixed,
    solvedUnguided: solvedU,
    broke,
    missing,
  };
}

/** Each task's passes per mode across runs. A label needs two or more scored trials; one trial is 'one run'. */
export function consistency(trials: TrialRecord[], modes: Mode[]): TaskConsistency[] {
  const out: TaskConsistency[] = [];
  for (const mode of modes) {
    const byTask = new Map<string, { passed: number; scored: number }>();
    for (const t of trials) {
      if (t.mode !== mode || trialErrored(t)) continue;
      const e = byTask.get(t.task) ?? { passed: 0, scored: 0 };
      e.scored++;
      if (isSolved(t)) e.passed++;
      byTask.set(t.task, e);
    }
    for (const [task, e] of byTask) {
      const label = e.scored < 2 ? 'one run' : e.passed === e.scored ? 'consistent pass' : e.passed === 0 ? 'consistent fail' : 'flaky';
      out.push({ task, mode, ...e, label });
    }
  }
  return out;
}

/**
 * Tasks with at least one scored trial in `mode` that did not pass every check,
 * in the order they first ran. Errored trials are not failures and are left out.
 */
export function failedTasks(trials: TrialRecord[], mode: Mode): string[] {
  const out = new Set<string>();
  for (const t of trials) if (t.mode === mode && !trialErrored(t) && !isSolved(t)) out.add(t.task);
  return [...out];
}

export function summarize(trials: TrialRecord[], modes: Mode[], solvedUnguided: SolvedUnguided[] = []): Summary {
  const byMode: Summary['byMode'] = {};
  for (const mode of modes) {
    const all = trials.filter((t) => t.mode === mode);
    if (!all.length) continue;
    const ts = all.filter((t) => !trialErrored(t));
    const errored = all.length - ts.length;
    let tokens: TokenUsage | undefined;
    let cost: number | undefined;
    for (const t of all) {
      tokens = addTokens(tokens, t.agent.tokens);
      if (typeof t.agent.costUsd === 'number') cost = (cost ?? 0) + t.agent.costUsd;
    }
    const r = passRates(ts);
    let use: ModeSummary['guideUse'];
    if (mode !== 'unguided') {
      use = Object.fromEntries(GUIDE_USES.map((u) => [u, { trials: 0, passed: 0 }])) as NonNullable<ModeSummary['guideUse']>;
      for (const t of ts) {
        const g = use[guideUse(t)];
        g.trials++;
        if (isSolved(t)) g.passed++;
      }
    }
    byMode[mode] = {
      trials: ts.length,
      errored,
      tasksFullyPassed: r.tasksPassed,
      taskPassRate: r.taskPassRate,
      checksPassed: r.checksPassed,
      checksTotal: r.checksTotal,
      checkPassRate: r.checkPassRate,
      ...(tokens ? { tokens } : {}),
      ...(cost !== undefined ? { costUsd: Math.round(cost * 100) / 100 } : {}),
      ...(use ? { guideUse: use } : {}),
    };
  }
  const uplift: Summary['uplift'] = {};
  for (const mode of modes) {
    if (mode === 'unguided') continue;
    const up = computeUplift(trials, mode, solvedUnguided);
    if (up) uplift[mode] = up;
  }
  const cons = consistency(trials, modes);
  return {
    byMode, uplift, solvedUnguided: solvedUnguided.length,
    ...(cons.some((c) => c.scored > 1) ? { consistency: cons } : {}),
  };
}

function round(n: number): number {
  return Math.round(n * 10) / 10;
}

export function resultsFileName(r: ResultsFile): string {
  const date = r.createdAt.slice(0, 10);
  const safe = (s: string) => s.toLowerCase().replace(/[^a-z0-9.]+/g, '-').replace(/^-|-$/g, '') || 'unknown';
  return `${date}-${safe(r.agent.id)}-${safe(r.agent.model)}-${r.id}.json`;
}

export function writeResults(r: ResultsFile, dir = benchResultsDir): string {
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, resultsFileName(r));
  fs.writeFileSync(file, JSON.stringify(r, null, 2) + '\n');
  return file;
}

export function formatTable(rows: string[][]): string {
  const widths = rows[0].map((_, i) => Math.max(...rows.map((r) => (r[i] ?? '').length)));
  const line = (r: string[]) => '| ' + r.map((c, i) => (c ?? '').padEnd(widths[i])).join(' | ') + ' |';
  return [line(rows[0]), '|' + widths.map((w) => '-'.repeat(w + 2)).join('|') + '|', ...rows.slice(1).map(line)].join('\n');
}

const signed = (n: number) => `${n >= 0 ? '+' : ''}${n}`;

/**
 * The summary as a table and notes. Guided rows show the guided mode over every
 * compared task run, with skipped solved tasks counted as passes; "≤" marks an
 * upper bound. The "Trials" column is how many trials actually ran.
 */
export function summaryTable(summary: Summary): string {
  const rows = [['Mode', 'Trials', 'Tasks fully passed', 'Checks passed', 'Uplift (tasks)', 'Uplift (checks)', 'Fixed unguided failures', 'Errored', 'Tokens', 'Cost (USD, API only)']];
  const ups = Object.entries(summary.uplift) as [Mode, Uplift][];
  // Every uplift is over the same task runs unless some guided mode is missing results.
  const sameBase = ups.length > 0 && ups.every(([, u]) => u.taskRuns === ups[0][1].taskRuns);
  const frac = (n: number, d: number, rate: number, le: string) => `${le}${n}/${d} (${le}${rate}%)`;
  // A guided mode with every task skipped has an uplift but no trials.
  const modes = [...new Set([...Object.keys(summary.byMode), ...Object.keys(summary.uplift)])] as Mode[];
  const none: ModeSummary = { trials: 0, errored: 0, tasksFullyPassed: 0, taskPassRate: 0, checksPassed: 0, checksTotal: 0, checkPassRate: 0 };
  for (const mode of modes) {
    const m = summary.byMode[mode] ?? none;
    const up = summary.uplift[mode];
    const tail = [String(m.errored ?? 0), m.tokens ? m.tokens.total.toLocaleString('en-US') : 'n/a', m.costUsd !== undefined ? m.costUsd.toFixed(2) : 'n/a'];
    if (mode === 'unguided' && sameBase) {
      const u = ups[0][1].unguided;
      const n = ups[0][1].taskRuns;
      rows.push([mode, String(m.trials), frac(u.tasksPassed, n, u.taskPassRate, ''), frac(u.checksPassed, u.checksTotal, u.checkPassRate, ''), '-', '-', '-', ...tail]);
    } else if (up) {
      const le = up.upperBound ? '≤' : '';
      rows.push([
        mode, String(m.trials),
        frac(up.guided.tasksPassed, up.taskRuns, up.guided.taskPassRate, le),
        frac(up.guided.checksPassed, up.guided.checksTotal, up.guided.checkPassRate, le),
        `${le}${signed(up.taskPassRatePts)} pts`, `${le}${signed(up.checkPassRatePts)} pts`,
        `${up.fixed} of ${up.failedUnguided}`, ...tail,
      ]);
    } else {
      rows.push([mode, String(m.trials), frac(m.tasksFullyPassed, m.trials, m.taskPassRate, ''), frac(m.checksPassed, m.checksTotal, m.checkPassRate, ''), '-', '-', '-', ...tail]);
    }
  }
  const notes: string[] = [];
  for (const [mode, u] of ups) {
    notes.push(`${mode}: compares ${u.taskRuns} task run(s) in both modes. Fixed ${u.fixed} of ${u.failedUnguided} task run(s) that failed unguided` +
      (u.solvedUnguided ? `; broke ${u.broke} of ${u.solvedUnguided} that passed unguided.` : '.'));
    if (u.upperBound) {
      notes.push(`${mode}: ${u.assumedPasses} task run(s) were solved unguided and skipped in ${mode}. They count as ${mode} passes, ` +
        `so the ${mode} figures and uplift are upper bounds (≤): ${mode} might have failed some of them. Pass --no-skip-solved to measure them.`);
    }
    if (u.missing) notes.push(`${mode}: ${u.missing} task run(s) have an unguided result but no ${mode} result (cap reached or errored) and are left out.`);
  }
  if (!sameBase && ups.length) notes.push('Guided modes cover different task runs here; the unguided row counts every unguided trial.');
  const table = [formatTable(rows), ...notes];
  const use = guideUseTable(summary);
  if (use) table.push('', use);
  if (summary.consistency) table.push('', consistencyTable(summary.consistency));
  return table.join('\n');
}

/**
 * Guided trials by how far the agent got into the guidance, with the share of
 * each group that fully passed. Undefined when no guided mode has trials.
 */
export function guideUseTable(summary: Summary): string | undefined {
  const modes = (Object.entries(summary.byMode) as [Mode, ModeSummary][]).filter(([, m]) => m.guideUse && m.trials > 0);
  if (!modes.length) return undefined;
  const labels: Record<GuideUse, string> = { read: 'Read guidance', looked: 'Looked, read none', none: 'Did not look', unrecorded: 'Not recorded' };
  const shown = GUIDE_USES.filter((u) => u !== 'unrecorded' || modes.some(([, m]) => m.guideUse!.unrecorded.trials > 0));
  const cell = (g: { trials: number; passed: number }) => (g.trials ? `${g.trials} (${g.passed} passed, ${Math.round((g.passed / g.trials) * 100)}%)` : '0');
  const rows = [['Mode', ...shown.map((u) => labels[u])], ...modes.map(([mode, m]) => [mode, ...shown.map((u) => cell(m.guideUse![u]))])];
  const notes = [
    'Guide use counts scored trials that ran: tasks skipped as solved unguided are not in it. "Read guidance" retrieved guide or docs text; "Looked, read none" loaded the skill or searched but retrieved nothing.',
    'Pass rates by guide use are not the effect of reading: the agent chooses when to look, and harder tasks may make it look more. Use them to spot trials that never consulted the guidance.',
  ];
  if (shown.includes('unrecorded')) notes.push('"Not recorded": MCP trials from before search and retrieve calls were counted apart; they used the tools, but the file cannot say whether they read.');
  return [formatTable(rows), ...notes].join('\n');
}

/** Per-task results across runs, then a count per label. */
export function consistencyTable(rows: TaskConsistency[]): string {
  const order = { 'consistent fail': 0, flaky: 1, 'consistent pass': 2, 'one run': 3 };
  const sorted = [...rows].sort((a, b) => order[a.label] - order[b.label] || a.mode.localeCompare(b.mode) || a.task.localeCompare(b.task));
  const table = formatTable([['Task', 'Mode', 'Passed', 'Result'], ...sorted.map((r) => [r.task, r.mode, `${r.passed}/${r.scored} passed`, r.label])]);
  const counts = [...new Set(rows.map((r) => r.mode))].map((mode) => {
    const n = (l: TaskConsistency['label']) => rows.filter((r) => r.mode === mode && r.label === l).length;
    return `${mode}: ${n('consistent fail')} consistent fail, ${n('flaky')} flaky, ${n('consistent pass')} consistent pass` +
      (n('one run') ? `, ${n('one run')} with one scored run` : '') + '.';
  });
  return [table, ...counts].join('\n');
}
