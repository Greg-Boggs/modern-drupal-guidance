/**
 * Grading context for Drupal benchmark tasks.
 *
 * Graders are lists of cheap, deterministic checks. Each check reads the
 * trial site through this context: active config (drush), the recorded content
 * manifest (bench-state/content.json), files on disk, the legacy-scan rules,
 * the core deprecation data, Drush commands and HTTP fetches of rendered pages
 * served by PHP's built-in server.
 */
import fs from 'fs';
import net from 'net';
import path from 'path';
import { spawn, type ChildProcess } from 'child_process';
import { drush, readState, type SiteState } from '../../harness/bench/base-app.ts';
import { run } from '../../harness/bench/exec.ts';
import { legacyScanBin, deprecationsFile, DRUPAL_VERSION } from '../../harness/bench/paths.ts';

export type CheckKind = 'must' | 'must_not';

export interface CheckOutcome {
  pass: boolean;
  detail?: string;
}

export interface Check {
  /** Stable id, also used as the heading in expectations.md. */
  id: string;
  kind: CheckKind;
  /** One plain sentence a Drupal developer can review. */
  text: string;
  /**
   * 'recorded' marks checks that depend on content entities a re-grade cannot
   * recreate from a diff (for example a block that renders a custom block
   * entity). A re-grade keeps the recorded result for them.
   */
  regrade?: 'rerun' | 'recorded';
  run(ctx: GradeContext): Promise<boolean | CheckOutcome>;
}

export interface Grader {
  checks: Check[];
}

export interface CheckResult {
  id: string;
  kind: CheckKind;
  text: string;
  pass: boolean;
  detail?: string;
  recorded?: boolean;
}

export interface LegacyFinding {
  guideId: string;
  ruleId: string;
  file: string;
  line?: number;
}

export interface DeprecatedUse {
  symbol: string;
  status: string;
  file: string;
}

let deprecationsCache: any[] | null = null;

export class GradeContext {
  readonly site: string;
  private stateCache: SiteState | null = null;
  private server: ChildProcess | null = null;
  private port = 0;

  constructor(site: string) {
    this.site = site;
  }

  // ---- state -------------------------------------------------------------

  state(): SiteState {
    if (!this.stateCache) this.stateCache = readState(this.site);
    return this.stateCache;
  }

  /** Forget cached state after a check changes the site. */
  invalidate(): void {
    this.stateCache = null;
  }

  config(name: string): any | undefined {
    return this.state().config[name];
  }

  configNames(prefix: string): string[] {
    return Object.keys(this.state().config).filter((n) => n.startsWith(prefix));
  }

  moduleEnabled(name: string): boolean {
    return this.state().modules.includes(name);
  }

  /** The content manifest saved with the trial (bench-state/content.json). */
  content(): Record<string, any[]> {
    const file = path.join(this.site, 'bench-state', 'content.json');
    if (fs.existsSync(file)) return JSON.parse(fs.readFileSync(file, 'utf8'));
    return this.state().content;
  }

  // ---- files -------------------------------------------------------------

  abs(rel: string): string {
    return path.join(this.site, rel);
  }

  exists(rel: string): boolean {
    return fs.existsSync(this.abs(rel));
  }

  read(rel: string): string {
    const p = this.abs(rel);
    return fs.existsSync(p) && fs.statSync(p).isFile() ? fs.readFileSync(p, 'utf8') : '';
  }

  /** Files under a directory matching a glob, relative to the site root. */
  files(dirRel: string, pattern = '**/*'): string[] {
    const dir = this.abs(dirRel);
    if (!fs.existsSync(dir)) return [];
    return (fs.globSync(pattern, { cwd: dir }) as string[])
      .filter((f) => fs.statSync(path.join(dir, f)).isFile())
      .map((f) => path.join(dirRel, f))
      .sort();
  }

  /** Parses a YAML file with the site's own Symfony YAML component. Returns undefined when missing or invalid. */
  yaml(rel: string): any {
    if (!this.exists(rel)) return undefined;
    const r = run('php', ['-r', 'require "vendor/autoload.php"; echo json_encode(Symfony\\Component\\Yaml\\Yaml::parseFile($argv[1]));', this.abs(rel)], { cwd: this.site });
    try {
      return r.code === 0 ? JSON.parse(r.stdout) : undefined;
    } catch {
      return undefined;
    }
  }

  /** Concatenated text of the files under a directory matching a glob. */
  readAll(dirRel: string, pattern = '**/*'): string {
    return this.files(dirRel, pattern).map((f) => `/* ${f} */\n${this.read(f)}`).join('\n');
  }

  // ---- drush -------------------------------------------------------------

  drush(args: string[]) {
    return drush(this.site, args);
  }

  /** Runs PHP inside the bootstrapped site and returns trimmed stdout. */
  phpEval(code: string): { ok: boolean; out: string } {
    const r = drush(this.site, ['php:eval', code]);
    return { ok: r.code === 0, out: (r.stdout || '').trim() + (r.code === 0 ? '' : `\n${r.stderr.slice(-1500)}`) };
  }

  cacheRebuild(): boolean {
    return drush(this.site, ['cache:rebuild']).code === 0;
  }

  /** Enables a module. Returns true when Drush reports success. */
  installModule(name: string): CheckOutcome {
    if (this.moduleEnabled(name)) return { pass: true, detail: 'already enabled' };
    const r = drush(this.site, ['pm:install', name, '-y']);
    this.invalidate();
    return { pass: r.code === 0 && this.moduleEnabled(name), detail: r.code === 0 ? undefined : r.stderr.slice(-800) };
  }

  /** Creates a node and returns its id. */
  createNode(type: string, title: string, extra = ''): number {
    const code = `if (!\\Drupal\\node\\Entity\\NodeType::load(${JSON.stringify(type)})) { throw new \\RuntimeException('No content type ${type}'); } $n = \\Drupal::entityTypeManager()->getStorage('node')->create(['type' => ${JSON.stringify(type)}, 'title' => ${JSON.stringify(title)}, 'status' => 1, 'uid' => 1${extra ? ', ' + extra : ''}]); $n->save(); print $n->id();`;
    const r = this.phpEval(code);
    const id = parseInt(r.out.split('\n').pop() || '', 10);
    if (!r.ok || !Number.isFinite(id)) throw new Error(`createNode failed: ${r.out}`);
    return id;
  }

  // ---- http --------------------------------------------------------------

  private async freePort(): Promise<number> {
    return new Promise((resolve, reject) => {
      const srv = net.createServer();
      srv.listen(0, '127.0.0.1', () => {
        const addr = srv.address();
        const p = typeof addr === 'object' && addr ? addr.port : 0;
        srv.close(() => resolve(p));
      });
      srv.on('error', reject);
    });
  }

  private async ensureServer(): Promise<void> {
    if (this.server) return;
    this.port = await this.freePort();
    const logFile = fs.openSync(path.join(this.site, 'bench-state', 'server.log'), 'a');
    // Run from web/: settings.php uses a SQLite path relative to the docroot.
    this.server = spawn('php', ['-S', `127.0.0.1:${this.port}`, '.ht.router.php'], {
      cwd: path.join(this.site, 'web'), stdio: ['ignore', logFile, logFile],
    });
    for (let i = 0; i < 50; i++) {
      try {
        await fetch(`http://127.0.0.1:${this.port}/robots.txt`);
        return;
      } catch {
        await new Promise((r) => setTimeout(r, 100));
      }
    }
    throw new Error('PHP built-in server did not start');
  }

  /** Fetches a path as an anonymous visitor. */
  async http(urlPath: string): Promise<{ status: number; body: string; headers: Headers }> {
    await this.ensureServer();
    const res = await fetch(`http://127.0.0.1:${this.port}${urlPath}`, { redirect: 'follow' });
    return { status: res.status, body: await res.text(), headers: res.headers };
  }

  baseUrl(): string {
    return `http://127.0.0.1:${this.port}`;
  }

  // ---- static analysis ----------------------------------------------------

  /** Runs the legacy-scan rules over a directory (relative to the site root). */
  legacyScan(dirRel: string, guideId?: string): LegacyFinding[] {
    const dir = this.abs(dirRel);
    if (!fs.existsSync(dir)) return [];
    const args = [legacyScanBin, dir, '--json', ...(guideId ? ['--guide', guideId] : [])];
    const r = run(process.execPath, args, { timeoutMs: 120_000 });
    if (r.code !== 0 && r.code !== 2) throw new Error(`legacy-scan failed: ${r.stderr.slice(-800)}`);
    const json = JSON.parse(r.stdout);
    const out: LegacyFinding[] = [];
    for (const g of json.guides || []) {
      for (const rule of g.rules || []) {
        for (const f of rule.findings || rule.matches || []) {
          out.push({ guideId: g.guideId, ruleId: rule.ruleId, file: f.file || f.path || '', line: f.line });
        }
        if (!(rule.findings || rule.matches)) out.push({ guideId: g.guideId, ruleId: rule.ruleId, file: '' });
      }
    }
    return out;
  }

  /**
   * Finds uses of core APIs that data/drupal/deprecations.json lists as
   * deprecated or removed at or before the pinned core version: functions,
   * classes, interfaces, traits, hooks and asset libraries.
   */
  deprecatedApis(dirRel: string): DeprecatedUse[] {
    const files = this.files(dirRel).filter((f) => /\.(php|module|inc|install|theme|yml|twig|js)$/.test(f));
    if (!files.length) return [];
    if (!deprecationsCache) deprecationsCache = JSON.parse(fs.readFileSync(deprecationsFile, 'utf8')).deprecations;
    const relevant = deprecationsCache!.filter((d) => ['removed', 'deprecated'].includes(d.status)
      && (!d.deprecated_in || versionLte(d.deprecated_in, DRUPAL_VERSION)));
    const found: DeprecatedUse[] = [];
    for (const f of files) {
      const text = stripComments(this.read(f), f);
      const isPhp = /\.(php|module|inc|install|theme)$/.test(f);
      const moduleName = f.split('/').length > 3 ? f.split('/')[3] : '';
      for (const d of relevant) {
        const sym: string = d.symbol;
        let hit = false;
        if (isPhp && d.type === 'function') {
          const name = sym.replace(/\(\)$/, '');
          if (/^[A-Za-z_]\w*$/.test(name)) hit = new RegExp(`(?<![\\w>:$\\\\])${escapeRe(name)}\\s*\\(`).test(text)
            && !new RegExp(`function\\s+${escapeRe(name)}\\s*\\(`).test(text);
        } else if (isPhp && ['class', 'interface', 'trait'].includes(d.type)) {
          const fq = sym.replace(/^\\/, '');
          hit = fq.includes('\\') && new RegExp(`(?<![\\w\\\\])\\\\?${escapeRe(fq)}(?![\\w\\\\])`).test(text);
        } else if (isPhp && d.type === 'hook') {
          const hook = sym.replace(/^hook_/, '').replace(/\(\)$/, '');
          hit = new RegExp(`#\\[Hook\\(\\s*['"]${escapeRe(hook)}['"]`).test(text)
            || (!!moduleName && new RegExp(`function\\s+${escapeRe(moduleName)}_${escapeRe(hook)}\\s*\\(`).test(text));
        } else if (d.type === 'library' && /\.(yml|php|module|twig)$/.test(f)) {
          hit = new RegExp(`(^|['"\\s-])${escapeRe(sym)}(['"\\s]|$)`, 'm').test(text);
        }
        if (hit) found.push({ symbol: sym, status: d.status, file: f });
      }
    }
    return found;
  }

  async close(): Promise<void> {
    if (this.server) {
      this.server.kill('SIGTERM');
      this.server = null;
    }
  }
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

function stripComments(text: string, file: string): string {
  if (/\.(php|module|inc|install|theme|js)$/.test(file)) {
    return text.replace(/\/\*[\s\S]*?\*\//g, '').replace(/(^|[^:'"])\/\/.*$/gm, '$1');
  }
  if (file.endsWith('.yml')) return text.replace(/^\s*#.*$/gm, '');
  return text;
}

function versionLte(a: string, b: string): boolean {
  const pa = a.split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  const pb = b.split(/[.-]/).map((x) => parseInt(x, 10) || 0);
  for (let i = 0; i < 3; i++) {
    if ((pa[i] ?? 0) !== (pb[i] ?? 0)) return (pa[i] ?? 0) < (pb[i] ?? 0);
  }
  return true;
}

/** Runs a grader's checks in order and closes the context. */
export async function runGrader(grader: Grader, ctx: GradeContext, recorded?: CheckResult[]): Promise<CheckResult[]> {
  const results: CheckResult[] = [];
  try {
    for (const check of grader.checks) {
      if (recorded && check.regrade === 'recorded') {
        const prev = recorded.find((r) => r.id === check.id);
        if (prev) {
          results.push({ ...prev, recorded: true });
          continue;
        }
      }
      let outcome: CheckOutcome;
      try {
        const r = await check.run(ctx);
        outcome = typeof r === 'boolean' ? { pass: r } : r;
      } catch (e: any) {
        outcome = { pass: false, detail: `error: ${String(e?.message || e).slice(0, 800)}` };
      }
      results.push({ id: check.id, kind: check.kind, text: check.text, pass: outcome.pass, ...(outcome.detail ? { detail: outcome.detail } : {}) });
    }
  } finally {
    await ctx.close();
  }
  return results;
}
