/**
 * Agent runners for the Drupal benchmark.
 *
 * Volunteers run their own agent CLIs with their own subscriptions. Each trial
 * gets a throwaway agent config directory (CLAUDE_CONFIG_DIR / CODEX_HOME), so
 * the volunteer's personal skills, MCP servers, memory and instructions never
 * reach the agent. Only the credentials file is copied in, or the agent uses
 * an auth token from the environment.
 *
 * Command lines mirror upstream's runners (getClaudeCodeCommandAndArgs in
 * ../agents/claude-code-agent.ts, getCodexCliCommandAndArgs in
 * ../agents/codex-cli-agent.ts), including the effort flags from
 * ../lib/reasoning-effort.ts. Those runner modules are kept but not imported:
 * they depend on core modules this fork removed. The npx shim comes from
 * upstream's npx-intercept.template.ts, so the guidance CLI resolves to the
 * local build in skill mode and to a 404 in the other modes.
 */
import fs from 'fs';
import os from 'os';
import path from 'path';
import { mcpServerPath, skillCliPath, skillDistDir, engineDir } from './paths.ts';
import { run, runAsync, which } from './exec.ts';
import { sanitizeTextSecrets } from '../lib/secret-guard.ts';
import { resolveEffortCliArgs } from '../lib/reasoning-effort.ts';
import { Agents } from '../config.ts';

export type Mode = 'unguided' | 'skill' | 'mcp' | 'context7';
export const MODES: Mode[] = ['unguided', 'skill', 'mcp', 'context7'];

/**
 * context7 mode: the same wiring as mcp mode, with Context7's hosted MCP server
 * and its drupal.org documentation as the docs source.
 */
export const CONTEXT7_URL = 'https://mcp.context7.com/mcp';
export const CONTEXT7_LIBRARY = '/websites/drupal';

/**
 * mcp mode tells the agent to use the tools through our server's instructions
 * (SERVER_INSTRUCTIONS in mcp/src/server.ts: "call search_guides BEFORE writing
 * or changing ..."). Context7's instructions are not ours to edit, so the
 * matching sentence goes in the system prompt. Add no other hints here.
 */
export const CONTEXT7_SYSTEM_PROMPT = `Use the Context7 tools with library ID \`${CONTEXT7_LIBRARY}\` BEFORE writing or changing Drupal PHP, Twig, YAML or JS.`;

/**
 * The --mcp-config for context7 mode. Claude Code expands ${CONTEXT7_API_KEY}
 * from its environment when it reads the file, so the key is never written.
 */
export function context7McpConfig(hasKey: boolean) {
  return {
    mcpServers: {
      context7: { type: 'http', url: CONTEXT7_URL, ...(hasKey ? { headers: { Authorization: 'Bearer ${CONTEXT7_API_KEY}' } } : {}) },
    },
  };
}

/** Removes the Context7 key from text that is saved or printed: the agent's shell inherits it. */
export function redactContext7Key(text: string, key = process.env.CONTEXT7_API_KEY): string {
  return key ? text.split(key).join('[REDACTED]') : text;
}

/** Text of a failed Context7 call that is the service's or the network's fault, not a bad argument from the agent. */
const CONTEXT7_FAILURE = /rate.?limit|quota|too many requests|invalid api key|unauthorized|sign-in expired|error searching libraries|error fetching library context|request failed with status (401|403|429|5\d\d)|HTTP (401|403|429|5\d\d)|fetch failed|ECONN|ENOTFOUND|ETIMEDOUT|EAI_AGAIN|timed out|timeout|socket|not connected|connection (closed|error|refused|reset|failed)|MCP error -3200[01]/i;

/**
 * Looks in a Claude Code stream-json transcript for a Context7 connection or
 * rate-limit failure. Only the server's startup status and the results of
 * Context7 tool calls count. A successful result is documentation, which may
 * itself talk about rate limits, so it counts only when it is the quota message.
 */
export function context7Failure(transcript: string): string | undefined {
  const calls = new Set<string>();
  for (const line of transcript.split('\n')) {
    if (!line.startsWith('{')) continue;
    let ev: any;
    try { ev = JSON.parse(line); } catch { continue; }
    if (ev.type === 'system' && ev.subtype === 'init') {
      const server = (ev.mcp_servers || []).find((s: any) => s.name === 'context7');
      if (!server || server.status === 'failed' || server.status === 'needs-auth') {
        return `Context7 MCP server did not connect (status: ${server?.status || 'not listed'})`;
      }
    }
    const blocks = Array.isArray(ev.message?.content) ? ev.message.content : [];
    for (const block of blocks) {
      if (block.type === 'tool_use' && String(block.name).startsWith('mcp__context7__')) calls.add(block.id);
      if (block.type !== 'tool_result' || !calls.has(block.tool_use_id)) continue;
      const text = typeof block.content === 'string' ? block.content : (block.content || []).map((c: any) => c.text || '').join('\n');
      if (block.is_error ? CONTEXT7_FAILURE.test(text) : text.trimStart().startsWith('Rate limited or quota exceeded')) {
        return `Context7 call failed: ${text.slice(0, 300)}`;
      }
    }
  }
  return undefined;
}

export interface TokenUsage {
  input: number;
  output: number;
  cacheRead: number;
  cacheCreation: number;
  total: number;
}

export interface AgentRunResult {
  exitCode: number;
  timedOut: boolean;
  durationSec: number;
  model?: string;
  tokens?: TokenUsage;
  costUsd?: number;
  numTurns?: number;
  guidanceCalls: { search: number; retrieve: number; mcp: number; skill: number };
  error?: string;
  /** Set when infrastructure failed: the agent could not sign in, or Context7 was unreachable or rate limited. Such trials are not graded or scored. */
  infraError?: 'auth' | 'context7';
}

const AUTH_ERROR = /failed to authenticate|oauth (token|session) (revoked|expired|has expired)|invalid api key|authentication_error|please run \/login|not logged in|invalid bearer token|credit balance is too low/i;

/** True when an agent error message means the agent never got to work because it could not sign in. */
export function isAuthError(message: string | undefined): boolean {
  return !!message && AUTH_ERROR.test(message);
}

export interface AgentCheck {
  ok: boolean;
  version?: string;
  auth?: string;
  problems: string[];
}

export interface AgentRunner {
  id: string;
  required: boolean;
  check(): AgentCheck;
  run(opts: { site: string; prompt: string; mode: Mode; timeoutMs: number; logDir: string; allowWeb: boolean; model?: string }): Promise<AgentRunResult>;
}

const NPX_TEMPLATE = path.join(engineDir, 'src', 'harness', 'npx-intercept.template.ts');

/** Writes npx/pnpx shims that serve the local guidance CLI (skill mode) or a 404 (other modes). */
function writeNpxShims(home: string, mode: Mode): string {
  const shimDir = path.join(home, 'bin');
  fs.mkdirSync(shimDir, { recursive: true });
  const content = fs.readFileSync(NPX_TEMPLATE, 'utf8')
    .replace('/^modern-web-guidance(?:@.*)?$/', '/^modern-drupal-guidance(?:@.*)?$/')
    .replace('__LOCAL_CLI_PATH__', mode === 'skill' ? skillCliPath : '');
  for (const bin of ['npx', 'pnpx']) {
    fs.writeFileSync(path.join(shimDir, bin), content, { mode: 0o755 });
  }
  return shimDir;
}

function makeAgentHome(prefix: string): string {
  return fs.mkdtempSync(path.join(os.tmpdir(), `mdg-bench-${prefix}-`));
}

function emptyCalls() {
  return { search: 0, retrieve: 0, mcp: 0, skill: 0 };
}

/** MCP tools that find guides (search) and that return a guide's text (retrieve), ours and Context7's. */
const MCP_SEARCH = /^(search_guides|list_guides|resolve-library-id)$/;
const MCP_RETRIEVE = /^(retrieve_guides|query-docs|get-library-docs)$/;

/**
 * Counts one tool call toward the trial's guidance calls. `search` and
 * `retrieve` count both the skill's CLI commands and the MCP tools, so
 * `retrieve > 0` means the agent read guidance text in any mode.
 */
export function countGuidanceCall(calls: ReturnType<typeof emptyCalls>, toolName: string, input: any): void {
  if (toolName === 'Skill' && String(input?.skill || input?.command || '').includes('modern-drupal-guidance')) calls.skill++;
  const mcp = /^mcp__(?:modern[-_]drupal[-_]guidance|context7)__(.+)$/.exec(toolName);
  if (mcp) {
    calls.mcp++;
    if (MCP_SEARCH.test(mcp[1])) calls.search++;
    if (MCP_RETRIEVE.test(mcp[1])) calls.retrieve++;
  }
  const cmd = String(input?.command || input?.cmd || '');
  if (/modern-drupal-guidance(@\S+)?\s+search\b/.test(cmd)) calls.search++;
  if (/modern-drupal-guidance(@\S+)?\s+retrieve\b/.test(cmd)) calls.retrieve++;
}

// ---------------------------------------------------------------------------
// Claude Code (required)
// ---------------------------------------------------------------------------

function claudeBin(): string | null {
  return process.env.CLAUDE_CODE_CLI_BIN || which('claude');
}

function userClaudeDir(): string {
  return process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
}

function claudeAuth(): { source?: string; credentialsFile?: string } {
  if (process.env.CLAUDE_CODE_OAUTH_TOKEN) return { source: 'CLAUDE_CODE_OAUTH_TOKEN' };
  if (process.env.ANTHROPIC_API_KEY) return { source: 'ANTHROPIC_API_KEY' };
  const file = path.join(userClaudeDir(), '.credentials.json');
  if (fs.existsSync(file)) return { source: `${file} (Claude subscription login)`, credentialsFile: file };
  return {};
}

export const claudeCode: AgentRunner = {
  id: 'claude-code',
  required: true,
  check() {
    const problems: string[] = [];
    const bin = claudeBin();
    if (!bin) return { ok: false, problems: ['Claude Code CLI not found. Install it (https://claude.com/claude-code) or set CLAUDE_CODE_CLI_BIN.'] };
    const v = run(bin, ['--version']);
    const version = v.stdout.trim().split(/\s+/)[0];
    if (v.code !== 0) problems.push(`claude --version failed: ${v.stderr.slice(0, 200)}`);
    const auth = claudeAuth();
    if (!auth.source) {
      problems.push(process.platform === 'darwin'
        ? 'No Claude credentials the benchmark can pass to an isolated agent. On macOS the login lives in the keychain: run `claude setup-token` and export CLAUDE_CODE_OAUTH_TOKEN, or export ANTHROPIC_API_KEY.'
        : 'No Claude credentials found. Run `claude` once and log in, or run `claude setup-token` and export CLAUDE_CODE_OAUTH_TOKEN, or export ANTHROPIC_API_KEY.');
    }
    return { ok: problems.length === 0, version, auth: auth.source, problems };
  },
  async run({ site, prompt, mode, timeoutMs, logDir, allowWeb, model }) {
    const home = makeAgentHome('claude');
    const configDir = path.join(home, 'claude-config');
    fs.mkdirSync(configDir, { recursive: true });
    const auth = claudeAuth();
    if (auth.credentialsFile) fs.copyFileSync(auth.credentialsFile, path.join(configDir, '.credentials.json'));
    const shimDir = writeNpxShims(home, mode);

    const extra: string[] = ['--output-format', 'stream-json', '--verbose', '--strict-mcp-config'];
    if (mode === 'skill') {
      fs.cpSync(skillDistDir, path.join(configDir, 'skills', 'modern-drupal-guidance'), { recursive: true });
    }
    if (mode === 'mcp') {
      const mcpConfig = path.join(home, 'mcp.json');
      fs.writeFileSync(mcpConfig, JSON.stringify({
        mcpServers: {
          'modern-drupal-guidance': { command: process.execPath, args: [mcpServerPath], env: { MODERN_DRUPAL_GUIDANCE_CLI: skillCliPath } },
        },
      }, null, 2));
      extra.push('--mcp-config', mcpConfig);
    }
    if (mode === 'context7') {
      const mcpConfig = path.join(home, 'mcp.json');
      fs.writeFileSync(mcpConfig, JSON.stringify(context7McpConfig(!!process.env.CONTEXT7_API_KEY), null, 2));
      extra.push('--mcp-config', mcpConfig, '--append-system-prompt', CONTEXT7_SYSTEM_PROMPT);
    }
    if (!allowWeb) extra.push('--disallowedTools', 'WebFetch', 'WebSearch');

    // Same arguments as upstream getClaudeCodeCommandAndArgs().
    const useModel = model || process.env.ANTHROPIC_MODEL;
    const command = claudeBin() || 'claude';
    const commandArgs = ['-p', prompt, '--dangerously-skip-permissions', ...extra,
      ...(useModel ? ['--model', useModel] : []), ...resolveEffortCliArgs(Agents.CLAUDE_CODE, useModel)];

    const env: NodeJS.ProcessEnv = {
      ...process.env,
      CLAUDE_CONFIG_DIR: configDir,
      PATH: `${shimDir}${path.delimiter}${process.env.PATH}`,
      DISABLE_TELEMETRY: '1',
      DISABLE_AUTOUPDATER: '1',
      CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC: '1',
    };
    delete env.CLAUDECODE;
    delete env.CLAUDE_CODE_ENTRYPOINT;
    if (mode !== 'context7') delete env.CONTEXT7_API_KEY;

    fs.mkdirSync(logDir, { recursive: true });
    const t0 = Date.now();
    const raw = await runAsync(command, commandArgs, { cwd: site, env, timeoutMs });
    const r = { ...raw, stdout: redactContext7Key(raw.stdout), stderr: redactContext7Key(raw.stderr) };
    const durationSec = Math.round((Date.now() - t0) / 1000);
    fs.writeFileSync(path.join(logDir, 'transcript.jsonl'), sanitizeTextSecrets(r.stdout));
    if (r.stderr) fs.writeFileSync(path.join(logDir, 'stderr.txt'), sanitizeTextSecrets(r.stderr));
    fs.rmSync(home, { recursive: true, force: true });

    const result: AgentRunResult = { exitCode: r.code, timedOut: durationSec * 1000 >= timeoutMs, durationSec, guidanceCalls: emptyCalls() };
    for (const line of r.stdout.split('\n')) {
      if (!line.startsWith('{')) continue;
      let ev: any;
      try { ev = JSON.parse(line); } catch { continue; }
      if (ev.type === 'system' && ev.subtype === 'init' && ev.model) result.model = ev.model;
      if (ev.type === 'assistant') {
        for (const block of ev.message?.content || []) {
          if (block.type === 'tool_use') countGuidanceCall(result.guidanceCalls, block.name, block.input);
        }
      }
      if (ev.type === 'result') {
        const u = ev.usage || {};
        const tokens = {
          input: u.input_tokens || 0,
          output: u.output_tokens || 0,
          cacheRead: u.cache_read_input_tokens || 0,
          cacheCreation: u.cache_creation_input_tokens || 0,
          total: 0,
        };
        tokens.total = tokens.input + tokens.output + tokens.cacheRead + tokens.cacheCreation;
        result.tokens = tokens;
        result.costUsd = ev.total_cost_usd;
        result.numTurns = ev.num_turns;
        const models = Object.keys(ev.modelUsage || {});
        if (models.length) result.model = result.model || models[0];
        if (ev.is_error) result.error = String(ev.result || ev.subtype).slice(0, 500);
      }
    }
    if (r.code !== 0 && !result.error) result.error = (r.stderr || r.stdout).slice(-500);
    if (isAuthError(result.error)) result.infraError = 'auth';
    const docsFailure = mode === 'context7' && !result.infraError ? context7Failure(r.stdout) : undefined;
    if (docsFailure) {
      result.infraError = 'context7';
      result.error = result.error || docsFailure;
    }
    return result;
  },
};

// ---------------------------------------------------------------------------
// Codex CLI (optional, experimental)
// ---------------------------------------------------------------------------

function codexBin(): string | null {
  return process.env.CODEX_CLI_BIN || which('codex');
}

export const codexCli: AgentRunner = {
  id: 'codex',
  required: false,
  check() {
    const bin = codexBin();
    if (!bin) return { ok: false, problems: ['Codex CLI not found (optional). Install @openai/codex or set CODEX_CLI_BIN.'] };
    const version = run(bin, ['--version']).stdout.trim();
    const authFile = path.join(process.env.CODEX_HOME || path.join(os.homedir(), '.codex'), 'auth.json');
    const auth = process.env.OPENAI_API_KEY ? 'OPENAI_API_KEY' : fs.existsSync(authFile) ? authFile : undefined;
    return { ok: !!auth, version, auth, problems: auth ? [] : ['No Codex login found. Run `codex login` or export OPENAI_API_KEY.'] };
  },
  async run({ site, prompt, mode, timeoutMs, logDir, allowWeb, model }) {
    const home = makeAgentHome('codex');
    const codexHome = path.join(home, 'codex-home');
    fs.mkdirSync(codexHome, { recursive: true });
    const authFile = path.join(process.env.CODEX_HOME || path.join(os.homedir(), '.codex'), 'auth.json');
    if (fs.existsSync(authFile)) fs.copyFileSync(authFile, path.join(codexHome, 'auth.json'));
    const shimDir = writeNpxShims(home, mode);
    if (mode === 'skill') fs.cpSync(skillDistDir, path.join(codexHome, 'skills', 'modern-drupal-guidance'), { recursive: true });

    // Same arguments as upstream getCodexCliCommandAndArgs(), plus JSON events.
    const useModel = model || process.env.CODEX_MODEL;
    const command = codexBin() || 'codex';
    const commandArgs = ['exec', prompt, '--yolo', ...(useModel ? ['--model', useModel] : []), ...resolveEffortCliArgs(Agents.CODEX_CLI, useModel)];
    commandArgs.push('--json', '--skip-git-repo-check');
    if (!allowWeb) commandArgs.push('-c', 'tools.web_search=false');
    if (mode === 'mcp') {
      commandArgs.push('-c', `mcp_servers.modern_drupal_guidance.command=${JSON.stringify(process.execPath)}`,
        '-c', `mcp_servers.modern_drupal_guidance.args=${JSON.stringify([mcpServerPath])}`,
        '-c', `mcp_servers.modern_drupal_guidance.env={ MODERN_DRUPAL_GUIDANCE_CLI = ${JSON.stringify(skillCliPath)} }`);
    }

    const env = { ...process.env, CODEX_HOME: codexHome, PATH: `${shimDir}${path.delimiter}${process.env.PATH}` };
    fs.mkdirSync(logDir, { recursive: true });
    const t0 = Date.now();
    const r = await runAsync(command, commandArgs, { cwd: site, env, timeoutMs });
    const durationSec = Math.round((Date.now() - t0) / 1000);
    fs.writeFileSync(path.join(logDir, 'transcript.jsonl'), sanitizeTextSecrets(r.stdout));
    if (r.stderr) fs.writeFileSync(path.join(logDir, 'stderr.txt'), sanitizeTextSecrets(r.stderr));
    fs.rmSync(home, { recursive: true, force: true });

    const result: AgentRunResult = { exitCode: r.code, timedOut: durationSec * 1000 >= timeoutMs, durationSec, guidanceCalls: emptyCalls(), model };
    const tokens: TokenUsage = { input: 0, output: 0, cacheRead: 0, cacheCreation: 0, total: 0 };
    let sawUsage = false;
    for (const line of r.stdout.split('\n')) {
      if (!line.startsWith('{')) continue;
      let ev: any;
      try { ev = JSON.parse(line); } catch { continue; }
      if (ev.type === 'turn.completed' && ev.usage) {
        sawUsage = true;
        tokens.input += (ev.usage.input_tokens || 0) - (ev.usage.cached_input_tokens || 0);
        tokens.cacheRead += ev.usage.cached_input_tokens || 0;
        tokens.output += ev.usage.output_tokens || 0;
      }
      // Codex reports each item when it starts and again when it completes: count it once.
      const item = ev.type === 'item.started' || ev.type === 'item.updated' ? undefined : ev.item;
      if (item?.type === 'command_execution') countGuidanceCall(result.guidanceCalls, 'shell', { command: item.command });
      if (item?.type === 'mcp_tool_call' && /drupal/.test(String(item.server))) {
        countGuidanceCall(result.guidanceCalls, `mcp__modern_drupal_guidance__${item.tool ?? ''}`, item.arguments);
      }
    }
    if (sawUsage) {
      tokens.total = tokens.input + tokens.output + tokens.cacheRead;
      result.tokens = tokens;
    }
    if (r.code !== 0) result.error = (r.stderr || '').slice(-500);
    if (isAuthError(result.error)) result.infraError = 'auth';
    return result;
  },
};

export const AGENTS: Record<string, AgentRunner> = { 'claude-code': claudeCode, codex: codexCli };
