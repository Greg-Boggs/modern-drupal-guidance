import test from 'node:test';
import assert from 'node:assert';
import { context7Failure, context7McpConfig, countGuidanceCall, isAuthError, redactContext7Key } from './agents.ts';
import { consistency, failedTasks, guideUse, summarize, summaryTable, type TrialRecord } from './results.ts';

const trial = (mode: TrialRecord['mode'], passed: number, total: number, error?: string, infraError?: 'auth' | 'context7'): TrialRecord => ({
  task: 't', mode, run: 1, startedAt: '',
  agent: { exitCode: error ? 1 : 0, timedOut: false, durationSec: 1, guidanceCalls: { search: 0, retrieve: 0, mcp: 0, skill: 0 }, error, infraError },
  checks: [], passed, total, diff: '', diffTruncated: false, diffBytes: 0,
});

test('isAuthError recognizes Claude Code sign-in failures', () => {
  assert.ok(isAuthError('Failed to authenticate: OAuth token revoked. Please log in again or contact your administrator.'));
  assert.ok(isAuthError('Failed to authenticate: OAuth session expired and could not be refreshed'));
  assert.ok(isAuthError('Invalid API key · Please run /login'));
  assert.ok(!isAuthError('Tool call failed: drush cr exited 1'));
  assert.ok(!isAuthError(undefined));
});

test('summarize leaves errored trials out of rates and uplift', () => {
  const s = summarize([
    trial('unguided', 8, 8),
    trial('unguided', 1, 8, 'Failed to authenticate: OAuth token revoked.'),
    trial('skill', 1, 8, undefined, 'auth'),
  ], ['unguided', 'skill']);
  assert.deepStrictEqual([s.byMode.unguided?.trials, s.byMode.unguided?.errored, s.byMode.unguided?.taskPassRate], [1, 1, 100]);
  assert.deepStrictEqual([s.byMode.skill?.trials, s.byMode.skill?.errored], [0, 1]);
  assert.strictEqual(s.uplift.skill, undefined);
});

const at = (task: string, mode: TrialRecord['mode'], run: number, passed: number, total = 4): TrialRecord => ({ ...trial(mode, passed, total), task, run });

/** The shape of the first change-record run: 59 of 91 solved unguided and skipped, 20 of the other 32 fixed by the skill. */
function skippedRun() {
  const trials: TrialRecord[] = [];
  const solved: { task: string; run: number }[] = [];
  for (let i = 0; i < 91; i++) {
    const task = `t${i}`;
    if (i < 59) {
      trials.push(at(task, 'unguided', 1, 4));
      solved.push({ task, run: 1 });
    } else {
      trials.push(at(task, 'unguided', 1, 3));
      trials.push(at(task, 'skill', 1, i < 79 ? 4 : 3));
    }
  }
  return { trials, solved };
}

test('uplift compares both modes over every task run, not guided on the failed subset', () => {
  const { trials, solved } = skippedRun();
  const s = summarize(trials, ['unguided', 'skill'], solved);
  const up = s.uplift.skill!;
  assert.deepStrictEqual([up.taskRuns, up.pairs, up.assumedPasses, up.upperBound], [91, 32, 59, true]);
  assert.deepStrictEqual([up.unguided.tasksPassed, up.guided.tasksPassed], [59, 79]);
  assert.deepStrictEqual([up.unguided.taskPassRate, up.guided.taskPassRate, up.taskPassRatePts], [64.8, 86.8, 22]);
  assert.deepStrictEqual([up.fixed, up.failedUnguided, up.broke, up.solvedUnguided], [20, 32, 0, 0]);
  // byMode still describes the trials that ran: the skill passed 20 of its 32.
  assert.deepStrictEqual([s.byMode.skill?.trials, s.byMode.skill?.tasksFullyPassed], [32, 20]);
  const table = summaryTable(s);
  assert.match(table, /59\/91 \(64\.8%\)/);
  assert.match(table, /≤79\/91 \(≤86\.8%\)/);
  assert.match(table, /≤\+22 pts/);
  assert.match(table, /20 of 32/);
  assert.match(table, /upper bounds/);
  assert.doesNotMatch(table, /62\.5/);
});

test('without skipping, uplift is exact and counts tasks the guidance broke', () => {
  const s = summarize([
    at('a', 'unguided', 1, 4), at('a', 'skill', 1, 3),
    at('b', 'unguided', 1, 2), at('b', 'skill', 1, 4),
    at('c', 'unguided', 1, 2), at('c', 'skill', 1, 4),
    at('d', 'unguided', 1, 4), at('d', 'skill', 1, 4),
  ], ['unguided', 'skill']);
  const up = s.uplift.skill!;
  assert.deepStrictEqual([up.taskRuns, up.assumedPasses, up.upperBound], [4, 0, false]);
  assert.deepStrictEqual([up.unguided.tasksPassed, up.guided.tasksPassed, up.taskPassRatePts], [2, 3, 25]);
  assert.deepStrictEqual([up.fixed, up.failedUnguided, up.broke, up.solvedUnguided], [2, 2, 1, 2]);
  const table = summaryTable(s);
  assert.doesNotMatch(table, /≤/);
  assert.match(table, /broke 1 of 2 that passed unguided/);
});

test('a skipped task with a guided trial anyway is scored, not assumed', () => {
  const s = summarize([at('a', 'unguided', 1, 4), at('a', 'skill', 1, 2)], ['unguided', 'skill'], [{ task: 'a', run: 1 }]);
  assert.deepStrictEqual([s.uplift.skill?.assumedPasses, s.uplift.skill?.broke, s.uplift.skill?.taskPassRatePts], [0, 1, -100]);
});

test('failedTasks picks scored failures in one mode, once each, in run order', () => {
  const trials = [
    at('a', 'unguided', 1, 4), at('b', 'unguided', 1, 1), at('b', 'skill', 1, 4),
    at('c', 'unguided', 1, 0), trial('unguided', 0, 0, undefined, 'auth'),
    at('a', 'unguided', 2, 3), at('b', 'unguided', 2, 2),
  ];
  assert.deepStrictEqual(failedTasks(trials, 'unguided'), ['b', 'c', 'a']);
  assert.deepStrictEqual(failedTasks(trials, 'skill'), []);
  const { trials: big } = skippedRun();
  assert.strictEqual(failedTasks(big, 'unguided').length, 32);
  assert.deepStrictEqual(failedTasks(big, 'skill'), Array.from({ length: 12 }, (_, i) => `t${79 + i}`));
});

test('consistency labels repeated tasks and leaves errored trials out', () => {
  const trials = [
    ...[1, 2, 3].map((r) => at('fail', 'unguided', r, 1)),
    ...[1, 2, 3].map((r) => at('pass', 'unguided', r, 4)),
    at('flaky', 'unguided', 1, 4), at('flaky', 'unguided', 2, 1), at('flaky', 'unguided', 3, 4),
    at('once', 'unguided', 1, 1), { ...trial('unguided', 0, 0, undefined, 'auth'), task: 'once', run: 2 },
  ];
  const c = consistency(trials, ['unguided']);
  const by = Object.fromEntries(c.map((x) => [x.task, `${x.passed}/${x.scored} ${x.label}`]));
  assert.deepStrictEqual(by, { fail: '0/3 consistent fail', pass: '3/3 consistent pass', flaky: '2/3 flaky', once: '0/1 one run' });
  const s = summarize(trials, ['unguided']);
  assert.strictEqual(s.consistency?.length, 4);
  const table = summaryTable(s);
  assert.match(table, /flaky +\| unguided \| 2\/3 passed \| flaky/);
  assert.match(table, /unguided: 1 consistent fail, 1 flaky, 1 consistent pass, 1 with one scored run\./);
  // A single run has no consistency section.
  assert.strictEqual(summarize([at('a', 'unguided', 1, 1)], ['unguided']).consistency, undefined);
});

const transcript = (status: string, tool?: { name?: string; text: string; isError?: boolean }) => [
  { type: 'system', subtype: 'init', mcp_servers: [{ name: 'context7', status }] },
  ...(tool ? [
    { type: 'assistant', message: { content: [{ type: 'tool_use', id: 'x', name: tool.name ?? 'mcp__context7__query-docs', input: {} }] } },
    { type: 'user', message: { content: [{ type: 'tool_result', tool_use_id: 'x', is_error: tool.isError, content: [{ type: 'text', text: tool.text }] }] } },
  ] : []),
].map((e) => JSON.stringify(e)).join('\n');

test('context7Failure finds connection and rate-limit failures, and nothing else', () => {
  assert.match(context7Failure(transcript('failed'))!, /did not connect/);
  for (const text of [
    'Rate limited or quota exceeded. Create a free API key at https://context7.com/dashboard for higher limits.',
    'Error fetching library context. Please try again later. TypeError: fetch failed',
    'Error searching libraries: TimeoutError: The operation was aborted due to timeout',
    'Request failed with status 503. Please try again later.',
    'MCP error -32001: Request timed out',
  ]) assert.ok(context7Failure(transcript('connected', { text, isError: true })), text);
  assert.ok(context7Failure(transcript('connected', { text: 'Rate limited or quota exceeded.' })));
  // Documentation about rate limits, a bad library ID and other tools' errors are not infrastructure failures.
  assert.strictEqual(context7Failure(transcript('connected', { text: 'Flood control: how to rate limit logins in Drupal.' })), undefined);
  assert.strictEqual(context7Failure(transcript('connected', { text: 'The library you are trying to access does not exist.', isError: true })), undefined);
  assert.strictEqual(context7Failure(transcript('connected', { name: 'Bash', text: 'curl: connection refused', isError: true })), undefined);
  assert.strictEqual(context7Failure(transcript('connected')), undefined);
});

test('a Context7 failure is left out of rates and reruns, like a sign-in failure', () => {
  const trials = [at('a', 'context7', 1, 4), { ...trial('context7', 0, 0, 'Context7 call failed: Rate limited', 'context7'), task: 'b' }, at('c', 'context7', 1, 1)];
  const s = summarize(trials, ['context7']);
  assert.deepStrictEqual([s.byMode.context7?.trials, s.byMode.context7?.errored, s.byMode.context7?.taskPassRate], [2, 1, 50]);
  assert.deepStrictEqual(failedTasks(trials, 'context7'), ['c']);
});

test('the context7 config never holds the key', () => {
  const server = context7McpConfig(true).mcpServers.context7;
  assert.strictEqual(server.headers?.Authorization, 'Bearer ${CONTEXT7_API_KEY}');
  assert.strictEqual(context7McpConfig(false).mcpServers.context7.headers, undefined);
  assert.strictEqual(redactContext7Key('key=abc123 abc123', 'abc123'), 'key=[REDACTED] [REDACTED]');
});

const calls = () => ({ search: 0, retrieve: 0, mcp: 0, skill: 0 });

test('countGuidanceCall splits MCP calls into search and retrieve', () => {
  const c = calls();
  countGuidanceCall(c, 'mcp__modern-drupal-guidance__search_guides', { query: 'oop hooks' });
  countGuidanceCall(c, 'mcp__modern-drupal-guidance__retrieve_guides', { ids: ['a'] });
  countGuidanceCall(c, 'mcp__modern_drupal_guidance__list_guides', {});
  countGuidanceCall(c, 'mcp__context7__resolve-library-id', {});
  countGuidanceCall(c, 'mcp__context7__query-docs', {});
  countGuidanceCall(c, 'mcp__other__search_guides', {});
  assert.deepStrictEqual(c, { search: 3, retrieve: 2, mcp: 5, skill: 0 });
});

test('countGuidanceCall counts the skill and its CLI commands', () => {
  const c = calls();
  countGuidanceCall(c, 'Skill', { skill: 'modern-drupal-guidance' });
  countGuidanceCall(c, 'Bash', { command: 'npx modern-drupal-guidance@latest search "oop hooks"' });
  countGuidanceCall(c, 'Bash', { command: 'npx modern-drupal-guidance retrieve oop-hooks' });
  countGuidanceCall(c, 'Bash', { command: 'drush cr' });
  assert.deepStrictEqual(c, { search: 1, retrieve: 1, mcp: 0, skill: 1 });
});

const used = (mode: TrialRecord['mode'], g: Partial<ReturnType<typeof calls>>, passed: number): TrialRecord => {
  const t = trial(mode, passed, 4);
  return { ...t, agent: { ...t.agent, guidanceCalls: { ...calls(), ...g } } };
};

test('guideUse classifies how far a trial got into the guidance', () => {
  assert.strictEqual(guideUse(used('skill', { skill: 1, search: 1, retrieve: 2 }, 4)), 'read');
  assert.strictEqual(guideUse(used('skill', { skill: 1 }, 4)), 'looked');
  assert.strictEqual(guideUse(used('mcp', { mcp: 1, search: 1 }, 4)), 'looked');
  assert.strictEqual(guideUse(used('mcp', { mcp: 3 }, 4)), 'unrecorded');
  assert.strictEqual(guideUse(used('skill', {}, 4)), 'none');
});

test('summarize counts guide use and passes for guided modes only', () => {
  const s = summarize([
    used('unguided', {}, 4),
    used('skill', { skill: 1, retrieve: 1 }, 4),
    used('skill', { skill: 1, retrieve: 1 }, 2),
    used('skill', { skill: 1 }, 1),
    used('skill', {}, 4),
    { ...used('skill', { retrieve: 1 }, 0), agent: { ...used('skill', { retrieve: 1 }, 0).agent, infraError: 'auth' } },
  ], ['unguided', 'skill']);
  assert.strictEqual(s.byMode.unguided?.guideUse, undefined);
  assert.deepStrictEqual(s.byMode.skill?.guideUse, {
    read: { trials: 2, passed: 1 }, looked: { trials: 1, passed: 0 }, none: { trials: 1, passed: 1 }, unrecorded: { trials: 0, passed: 0 },
  });
  const table = summaryTable(s);
  assert.match(table, /Read guidance/);
  assert.match(table, /2 \(1 passed, 50%\)/);
  assert.doesNotMatch(table, /Not recorded/);
});
