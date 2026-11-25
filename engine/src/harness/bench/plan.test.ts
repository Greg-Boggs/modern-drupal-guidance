import test from 'node:test';
import assert from 'node:assert';
import type { Mode } from './agents.ts';
import { DEFAULT_MODES, DEFAULT_TRIALS, maxTrials, orderModes, runPlan, seededShuffle, type PlanOptions } from './plan.ts';
import { summarize, summaryTable, type TrialRecord } from './results.ts';

const TASKS = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];

const record = (task: string, mode: Mode, run: number, passed: number, infraError?: 'auth'): TrialRecord => ({
  task, mode, run, startedAt: '',
  agent: { exitCode: 0, timedOut: false, durationSec: 1, guidanceCalls: { search: 0, retrieve: 0, mcp: 0, skill: 0 }, infraError },
  checks: [], passed, total: infraError ? 0 : 8, diff: '', diffTruncated: false, diffBytes: 0,
});

/** A fake agent: passes every check for `solved` tasks and for every guided trial; fails to sign in on `authFails`. */
async function plan(over: Partial<PlanOptions> & { solved?: string[]; authFails?: string } = {}) {
  const calls: string[] = [];
  const result = await runPlan({
    taskIds: TASKS, runs: 1, modes: DEFAULT_MODES, cap: DEFAULT_TRIALS, skipSolved: true,
    runTrial: async (task, mode, run) => {
      const call = `${task}/${mode}`;
      calls.push(call);
      if (call === over.authFails) return record(task, mode, run, 0, 'auth');
      return record(task, mode, run, mode !== 'unguided' || over.solved?.includes(task) ? 8 : 5);
    },
    ...over,
  });
  return { ...result, calls };
}

test('defaults are cheap: 5 trials and no MCP', () => {
  assert.strictEqual(DEFAULT_TRIALS, 5);
  assert.deepStrictEqual(DEFAULT_MODES, ['unguided', 'skill']);
});

test('orderModes runs unguided first and drops duplicates', () => {
  assert.deepStrictEqual(orderModes(['skill', 'mcp', 'unguided', 'skill']), ['unguided', 'skill', 'mcp']);
});

test('seededShuffle repeats for a seed and keeps every task', () => {
  assert.deepStrictEqual(seededShuffle(TASKS, 42), seededShuffle(TASKS, 42));
  assert.notDeepStrictEqual(seededShuffle(TASKS, 42), seededShuffle(TASKS, 43));
  assert.deepStrictEqual(seededShuffle(TASKS, 42).sort(), TASKS);
  assert.strictEqual(TASKS[0], 'a');
});

test('runPlan does not start a pair that cannot finish within the cap', async () => {
  const r = await plan();
  assert.deepStrictEqual(r.calls, ['a/unguided', 'a/skill', 'b/unguided', 'b/skill']);
  const three = await plan({ modes: ['unguided', 'skill', 'mcp'] });
  assert.deepStrictEqual(three.calls, ['a/unguided', 'a/skill', 'a/mcp']);
});

test('runPlan skips guided trials for solved tasks, and skipped trials are free', async () => {
  const r = await plan({ solved: ['a'] });
  assert.deepStrictEqual(r.calls, ['a/unguided', 'b/unguided', 'b/skill', 'c/unguided', 'c/skill']);
  assert.deepStrictEqual(r.solvedUnguided, [{ task: 'a', run: 1 }]);
  const all = await plan({ solved: TASKS });
  // After four solved tasks only one slot is left, and a pair might not fit in it.
  assert.deepStrictEqual([all.trials.length, all.solvedUnguided.length], [4, 4]);
});

test('runPlan with skipping off runs every mode', async () => {
  const r = await plan({ solved: ['a'], skipSolved: false });
  assert.deepStrictEqual(r.calls, ['a/unguided', 'a/skill', 'b/unguided', 'b/skill']);
  assert.deepStrictEqual(r.solvedUnguided, []);
});

test('runPlan with only unguided skips nothing', async () => {
  const r = await plan({ modes: ['unguided'], solved: TASKS });
  assert.strictEqual(r.trials.length, 5);
  assert.deepStrictEqual(r.solvedUnguided, []);
});

test('a cap of 30 runs the whole pilot set, with or without MCP', async () => {
  assert.strictEqual((await plan({ cap: 30 })).trials.length, 20);
  assert.strictEqual((await plan({ cap: 30, modes: ['unguided', 'skill', 'mcp'] })).trials.length, 30);
});

test('runPlan stops at a sign-in failure', async () => {
  const r = await plan({ authFails: 'a/skill' });
  assert.strictEqual(r.aborted, true);
  assert.deepStrictEqual(r.calls, ['a/unguided', 'a/skill']);
  const first = await plan({ authFails: 'a/unguided' });
  assert.deepStrictEqual([first.aborted, first.calls, first.solvedUnguided], [true, ['a/unguided'], []]);
});

test('runPlan reports after every trial, with the skip already recorded', async () => {
  const seen: string[] = [];
  await plan({ solved: ['a'], cap: 3, onTrial: (s) => seen.push(`${s.trials.length}:${s.solvedUnguided.length}`) });
  assert.deepStrictEqual(seen, ['1:1', '2:1', '3:1']);
});

test('maxTrials bounds what runPlan can start', async () => {
  for (const modes of [['unguided'], ['unguided', 'skill'], ['unguided', 'skill', 'mcp']] as Mode[][]) {
    for (const cap of [3, 4, 5, 30]) {
      for (const taskIds of [['a'], ['a', 'b'], TASKS]) {
        for (const skipSolved of [true, false]) {
          const max = maxTrials({ pairs: taskIds.length, modes, cap, skipSolved });
          assert.ok(max <= cap);
          // Try every combination of solved tasks among the first five.
          for (let mask = 0; mask < 32; mask++) {
            const solved = TASKS.filter((_, i) => i < 5 && mask & (1 << i));
            assert.ok((await plan({ modes, cap, taskIds, skipSolved, solved })).trials.length <= max);
          }
        }
      }
    }
  }
  assert.strictEqual(maxTrials({ pairs: 10, modes: DEFAULT_MODES, cap: 5, skipSolved: true }), 5);
  assert.strictEqual(maxTrials({ pairs: 10, modes: DEFAULT_MODES, cap: 5, skipSolved: false }), 4);
});

test('solved tasks count as guided passes in uplift, marked as an upper bound', async () => {
  const r = await plan({ solved: ['a'] });
  const s = summarize(r.trials, DEFAULT_MODES, r.solvedUnguided);
  assert.strictEqual(s.solvedUnguided, 1);
  assert.strictEqual(s.byMode.unguided?.tasksFullyPassed, 1);
  // a is solved unguided and skipped; b and c fail unguided and pass with the skill.
  const up = s.uplift.skill!;
  assert.deepStrictEqual([up.taskRuns, up.pairs, up.assumedPasses, up.upperBound], [3, 2, 1, true]);
  assert.deepStrictEqual([up.unguided.tasksPassed, up.guided.tasksPassed, up.taskPassRatePts], [1, 3, 66.7]);
  assert.deepStrictEqual([up.fixed, up.failedUnguided], [2, 2]);
  assert.strictEqual(up.checkPassRatePts, 25);
  const table = summaryTable(s);
  assert.match(table, /≤3\/3/);
  assert.match(table, /≤\+66\.7 pts/);
  assert.match(table, /Fixed 2 of 2 task run\(s\) that failed unguided/);
  assert.match(table, /1 task run\(s\) were solved unguided and skipped/);
});

test('uplift leaves out an unguided trial whose guided trial never ran', () => {
  const s = summarize([record('a', 'unguided', 1, 4), record('a', 'skill', 1, 4), record('b', 'unguided', 1, 8)], DEFAULT_MODES);
  const up = s.uplift.skill!;
  assert.deepStrictEqual([up.taskRuns, up.pairs, up.missing, up.upperBound, up.taskPassRatePts, up.checkPassRatePts], [1, 1, 1, false, 0, 0]);
});
