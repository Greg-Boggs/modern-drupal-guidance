/**
 * Prerequisite checks for volunteers. None of them calls a model.
 */
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { run, which } from './exec.ts';
import { deprecationsFile, legacyScanBin, mcpServerPath, projectRoot, skillCliPath } from './paths.ts';
import { CONTEXT7_URL, redactContext7Key, type AgentRunner, type Mode } from './agents.ts';

export interface PrereqResult {
  name: string;
  ok: boolean;
  detail: string;
  fix?: string;
}

function versionAtLeast(v: string, min: number[]): boolean {
  const p = v.split('.').map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < min.length; i++) {
    if ((p[i] ?? 0) !== min[i]) return (p[i] ?? 0) > min[i];
  }
  return true;
}

/** Starts the MCP server and runs initialize + tools/list over stdio. */
export function mcpHandshake(timeoutMs = 20_000): Promise<{ ok: boolean; tools: string[]; error?: string }> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [mcpServerPath], {
      env: { ...process.env, MODERN_DRUPAL_GUIDANCE_CLI: skillCliPath },
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    let buf = '';
    let stderr = '';
    const done = (r: { ok: boolean; tools: string[]; error?: string }) => {
      clearTimeout(timer);
      child.kill();
      resolve(r);
    };
    const timer = setTimeout(() => done({ ok: false, tools: [], error: `timeout. ${stderr.slice(-300)}` }), timeoutMs);
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('error', (e) => done({ ok: false, tools: [], error: String(e) }));
    child.stdout.on('data', (d) => {
      buf += d;
      let i;
      while ((i = buf.indexOf('\n')) >= 0) {
        const line = buf.slice(0, i).trim();
        buf = buf.slice(i + 1);
        if (!line) continue;
        let msg: any;
        try { msg = JSON.parse(line); } catch { continue; }
        if (msg.id === 1) {
          child.stdin.write(JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' }) + '\n');
          child.stdin.write(JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/list', params: {} }) + '\n');
        } else if (msg.id === 2) {
          const tools = (msg.result?.tools || []).map((t: any) => t.name);
          done({ ok: tools.length > 0, tools, error: msg.error ? JSON.stringify(msg.error) : undefined });
        }
      }
    });
    child.stdin.write(JSON.stringify({
      jsonrpc: '2.0', id: 1, method: 'initialize',
      params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mdg-bench', version: '1' } },
    }) + '\n');
  });
}

/** Runs initialize + tools/list against Context7's hosted MCP server. Fetches no docs and calls no model. */
export async function context7Handshake(timeoutMs = 20_000): Promise<{ ok: boolean; tools: string[]; error?: string }> {
  const key = process.env.CONTEXT7_API_KEY;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json', Accept: 'application/json, text/event-stream',
    ...(key ? { Authorization: `Bearer ${key}` } : {}),
  };
  const signal = AbortSignal.timeout(timeoutMs);
  const post = async (body: object): Promise<any> => {
    const res = await fetch(CONTEXT7_URL, { method: 'POST', headers, body: JSON.stringify({ jsonrpc: '2.0', ...body }), signal });
    const text = await res.text();
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    const session = res.headers.get('mcp-session-id');
    if (session) headers['mcp-session-id'] = session;
    if (!text) return undefined;
    // The reply is plain JSON or one server-sent event.
    const msg = JSON.parse(text.startsWith('{') ? text : text.split('\n').find((l) => l.startsWith('data:'))!.slice(5));
    if (msg.error) throw new Error(JSON.stringify(msg.error).slice(0, 200));
    return msg.result;
  };
  try {
    await post({ id: 1, method: 'initialize', params: { protocolVersion: '2025-06-18', capabilities: {}, clientInfo: { name: 'mdg-bench', version: '1' } } });
    await post({ method: 'notifications/initialized' });
    const tools: string[] = ((await post({ id: 2, method: 'tools/list', params: {} }))?.tools || []).map((t: any) => t.name);
    return { ok: tools.length > 0, tools };
  } catch (e: any) {
    return { ok: false, tools: [], error: redactContext7Key(String(e?.message || e)) };
  }
}

export async function checkPrereqs(agent: AgentRunner, modes: Mode[]): Promise<PrereqResult[]> {
  const out: PrereqResult[] = [];
  const add = (name: string, ok: boolean, detail: string, fix?: string) => out.push({ name, ok, detail, ...(ok ? {} : { fix }) });

  add('Node.js', versionAtLeast(process.versions.node, [22, 18]), process.versions.node, 'Install Node.js 22.18 or newer.');

  const php = run('php', ['-r', 'echo PHP_VERSION, "\\n", implode(",", get_loaded_extensions());']);
  if (php.code !== 0) {
    add('PHP', false, 'not found', 'Install PHP 8.3 or newer (CLI) with pdo_sqlite, gd, mbstring, xml, dom, curl, zip.');
  } else {
    const [ver, exts] = php.stdout.trim().split('\n');
    const have = new Set((exts || '').toLowerCase().split(','));
    const need = ['pdo_sqlite', 'gd', 'mbstring', 'xml', 'dom', 'simplexml', 'curl', 'json', 'zip'];
    const missing = need.filter((e) => !have.has(e));
    add('PHP', versionAtLeast(ver, [8, 3]) && missing.length === 0, `${ver}${missing.length ? `, missing: ${missing.join(', ')}` : ''}`,
      'Drupal 11 needs PHP 8.3+ with pdo_sqlite, gd, mbstring, xml, dom, simplexml, curl, json and zip.');
    const sqlite = run('php', ['-r', 'echo (new PDO("sqlite::memory:"))->query("select sqlite_version()")->fetchColumn();']);
    add('SQLite (PHP)', sqlite.code === 0 && versionAtLeast(sqlite.stdout.trim(), [3, 45]), sqlite.stdout.trim() || sqlite.stderr.slice(0, 200),
      'Drupal 11 needs SQLite 3.45 or newer in PHP\'s pdo_sqlite.');
  }

  const composer = run('composer', ['--version', '--no-ansi']);
  add('Composer', composer.code === 0, composer.stdout.trim().split('\n')[0] || 'not found', 'Install Composer 2 (https://getcomposer.org).');
  add('git', !!which('git'), which('git') || 'not found', 'Install git.');
  add('bash', !!which('bash'), which('bash') || 'not found', 'Install bash.');

  const legacyBuilt = fs.existsSync(path.join(projectRoot, 'legacy-scan', 'dist', 'cli.js'));
  const scan = legacyBuilt ? run(process.execPath, [legacyScanBin, path.join(projectRoot, 'legacy-scan', 'fixtures', 'legacy_example'), '--json']) : null;
  add('legacy-scan', !!scan && scan.code === 0 && JSON.parse(scan.stdout).totalFindings > 0,
    scan ? `${scan.code === 0 ? JSON.parse(scan.stdout).totalFindings + ' findings on its legacy fixture' : scan.stderr.slice(0, 200)}` : 'not built',
    'cd legacy-scan && npm ci && npm run build');
  add('Deprecation data', fs.existsSync(deprecationsFile), path.relative(projectRoot, deprecationsFile), 'data/drupal/deprecations.json is missing; update your checkout.');

  if (modes.includes('skill') || modes.includes('mcp')) {
    const search = fs.existsSync(skillCliPath) ? run(process.execPath, [skillCliPath, 'search', 'oop hooks']) : null;
    let hits = 0;
    try { hits = search && search.code === 0 ? JSON.parse(search.stdout).length : 0; } catch { /* not JSON */ }
    add('Guidance skill and CLI', hits > 0, search ? `search "oop hooks" returned ${hits} guides` : 'engine/dist/skills-cli not built',
      'cd engine && pnpm install && pnpm build');
  }
  if (modes.includes('mcp')) {
    const hs = fs.existsSync(mcpServerPath) ? await mcpHandshake() : { ok: false, tools: [], error: 'mcp/dist not built' };
    add('MCP server', hs.ok, hs.ok ? `tools: ${hs.tools.join(', ')}` : hs.error || 'no tools', 'cd mcp && npm ci && npm run build');
  }

  if (modes.includes('context7')) {
    const hs = await context7Handshake();
    add('Context7 MCP server', hs.ok, hs.ok ? `tools: ${hs.tools.join(', ')} (${process.env.CONTEXT7_API_KEY ? 'with CONTEXT7_API_KEY' : 'no API key'})` : hs.error || 'no tools',
      `Check your network and CONTEXT7_API_KEY; the server is ${CONTEXT7_URL}.`);
  }

  const a = agent.check();
  add(`Agent: ${agent.id}`, a.ok, [a.version && `version ${a.version}`, a.auth && `auth: ${a.auth}`].filter(Boolean).join(', ') || a.problems.join(' '), a.problems.join(' '));
  return out;
}
