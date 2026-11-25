/**
 * Builds the benchmark base app once into the cache directory and hands out
 * clean copies of it for each trial.
 *
 * Base app: drupal/recommended-project at DRUPAL_VERSION, Drush DRUSH_VERSION,
 * the standard install profile on SQLite, CSS/JS aggregation off, config sync
 * directory at config/sync, and a git baseline commit so each trial's changes
 * can be recorded as one diff.
 */
import fs from 'fs';
import path from 'path';
import { DRUPAL_VERSION, DRUSH_VERSION, INSTALL_PROFILE, benchStateScript, templateDir, trialsRoot } from './paths.ts';
import { mustRun, run } from './exec.ts';

export const READY_MARKER = '.bench-ready.json';

/** Core recipes applied on top of the standard profile. Part of the base app definition. */
export const BASE_RECIPES = ['page_content_type', 'article_content_type', 'article_tags'];

const GITIGNORE = `# Benchmark base app: only the site's own code and config are tracked.
/vendor/
/web/core/
/web/modules/contrib/
/web/themes/contrib/
/web/profiles/contrib/
/web/libraries/
/web/sites/default/files/
/web/sites/simpletest/
/.bench-*
/bench-state/server.log
`;

const SETTINGS_APPEND = `
// Added by the Modern Drupal Guidance benchmark.
$settings['config_sync_directory'] = '../config/sync';
$settings['trusted_host_patterns'] = ['^127\\.0\\.0\\.1$', '^localhost$'];
$settings['skip_permissions_hardening'] = TRUE;
`;

export const GIT_ENV = {
  GIT_AUTHOR_NAME: 'bench', GIT_AUTHOR_EMAIL: 'bench@localhost',
  GIT_COMMITTER_NAME: 'bench', GIT_COMMITTER_EMAIL: 'bench@localhost',
  GIT_AUTHOR_DATE: '2026-01-01T00:00:00Z', GIT_COMMITTER_DATE: '2026-01-01T00:00:00Z',
};

export function drushPath(site: string): string {
  return path.join(site, 'vendor', 'bin', 'drush');
}

export function drush(site: string, args: string[], opts: { timeoutMs?: number } = {}) {
  return run(drushPath(site), [...args], { cwd: site, timeoutMs: opts.timeoutMs ?? 300_000 });
}

export function mustDrush(site: string, args: string[]): string {
  return mustRun(drushPath(site), args, { cwd: site });
}

export function git(site: string, args: string[]) {
  return run('git', ['-c', 'core.autocrlf=false', '-c', 'commit.gpgsign=false', ...args], { cwd: site, env: { ...process.env, ...GIT_ENV } });
}

export interface BaseAppInfo {
  drupal: string;
  drush: string;
  php: string;
  profile: string;
  recipes: string[];
  builtAt: string;
}

export function readBaseAppInfo(): BaseAppInfo | null {
  const marker = path.join(templateDir(), READY_MARKER);
  if (!fs.existsSync(marker)) return null;
  try {
    const info = JSON.parse(fs.readFileSync(marker, 'utf8')) as BaseAppInfo;
    return info.drupal === DRUPAL_VERSION && info.drush === DRUSH_VERSION
      && JSON.stringify(info.recipes) === JSON.stringify(BASE_RECIPES) ? info : null;
  } catch {
    return null;
  }
}

/** Builds the base app if it is missing or was built for other pinned versions. */
export function ensureBaseApp(log: (s: string) => void = console.log, force = false): BaseAppInfo {
  const existing = readBaseAppInfo();
  if (existing && !force) return existing;

  const dest = templateDir();
  const tmp = `${dest}.building`;
  fs.rmSync(tmp, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const composerEnv = { ...process.env, COMPOSER_NO_INTERACTION: '1', COMPOSER_MEMORY_LIMIT: '-1' };

  log(`Building base app: drupal/recommended-project ${DRUPAL_VERSION} in ${tmp}`);
  mustRun('composer', ['create-project', `drupal/recommended-project:${DRUPAL_VERSION}`, tmp, '--no-interaction', '--no-progress'], { env: composerEnv, timeoutMs: 1_200_000 });
  log(`Adding drush/drush ${DRUSH_VERSION}`);
  mustRun('composer', ['require', `drush/drush:${DRUSH_VERSION}`, '--no-interaction', '--no-progress', '-W'], { cwd: tmp, env: composerEnv, timeoutMs: 1_200_000 });

  log('Installing Drupal (standard profile, SQLite)');
  mustDrush(tmp, ['site:install', INSTALL_PROFILE, '--db-url=sqlite://sites/default/files/.ht.sqlite',
    '--site-name=Drupal benchmark', '--account-name=admin', '--account-pass=admin', '--site-mail=admin@example.com', '-y']);

  const settings = path.join(tmp, 'web', 'sites', 'default', 'settings.php');
  fs.chmodSync(path.dirname(settings), 0o755);
  fs.chmodSync(settings, 0o644);
  // Drush 13 drops the first path segment of a relative SQLite URL, so put the
  // database where the URL said and point settings.php at it explicitly.
  const wanted = 'sites/default/files/.ht.sqlite';
  let settingsText = fs.readFileSync(settings, 'utf8');
  const m = settingsText.match(/'database' => '([^']+\.sqlite)'/);
  if (m && m[1] !== wanted) {
    const actual = path.isAbsolute(m[1]) ? m[1] : path.join(tmp, 'web', m[1]);
    fs.mkdirSync(path.join(tmp, 'web', 'sites', 'default', 'files'), { recursive: true });
    fs.renameSync(actual, path.join(tmp, 'web', wanted));
    if (!path.isAbsolute(m[1])) fs.rmSync(path.join(tmp, 'web', m[1].split('/')[0]), { recursive: true, force: true });
    settingsText = settingsText.replace(m[0], `'database' => '${wanted}'`);
    fs.writeFileSync(settings, settingsText);
  }
  // Drush writes its own config_sync_directory line; ours comes later and wins.
  fs.appendFileSync(settings, SETTINGS_APPEND);
  fs.mkdirSync(path.join(tmp, 'config', 'sync'), { recursive: true });

  // Since Drupal 11.3 the standard profile no longer creates the Article and
  // Basic page content types; they are core recipes. Apply them so tasks can
  // rely on article, page and tags as on most real sites.
  for (const recipe of BASE_RECIPES) {
    log(`Applying core recipe ${recipe}`);
    mustDrush(tmp, ['recipe', path.join(tmp, 'web', 'core', 'recipes', recipe), '-y']);
  }
  mustDrush(tmp, ['config:set', 'system.performance', 'css.preprocess', '0', '-y']);
  mustDrush(tmp, ['config:set', 'system.performance', 'js.preprocess', '0', '-y']);
  mustDrush(tmp, ['cache:rebuild']);
  mustDrush(tmp, ['config:export', '-y']);
  fs.mkdirSync(path.join(tmp, 'bench-state'), { recursive: true });
  writeContentSnapshot(tmp, readState(tmp));

  fs.writeFileSync(path.join(tmp, '.gitignore'), GITIGNORE);
  fs.mkdirSync(path.join(tmp, 'bench-state'), { recursive: true });
  fs.writeFileSync(path.join(tmp, 'bench-state', '.gitkeep'), '');
  for (const args of [['init', '-q', '-b', 'main'], ['add', '-A'], ['commit', '-q', '-m', 'Benchmark base app']]) {
    const r = git(tmp, args);
    if (r.code !== 0) throw new Error(`git ${args.join(' ')} failed: ${r.stderr}`);
  }

  const php = run('php', ['-r', 'echo PHP_VERSION;']).stdout.trim();
  const info: BaseAppInfo = { drupal: DRUPAL_VERSION, drush: DRUSH_VERSION, php, profile: INSTALL_PROFILE, recipes: BASE_RECIPES, builtAt: new Date().toISOString() };
  fs.writeFileSync(path.join(tmp, READY_MARKER), JSON.stringify(info, null, 2));

  fs.rmSync(dest, { recursive: true, force: true });
  fs.renameSync(tmp, dest);
  log(`Base app ready at ${dest}`);
  return info;
}

/**
 * Returns a fresh copy of the base app for one trial. The template is never
 * modified, so every trial starts from the same files and the same database.
 */
export function freshSite(name: string): string {
  const src = templateDir();
  if (!readBaseAppInfo()) throw new Error('Base app is not built. Run the bench setup first.');
  const dest = path.join(trialsRoot(), name);
  fs.rmSync(dest, { recursive: true, force: true });
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const args = process.platform === 'linux' ? ['-a', '--reflink=auto', src, dest] : ['-a', src, dest];
  mustRun('cp', args, { timeoutMs: 600_000 });
  fs.rmSync(path.join(dest, READY_MARKER), { force: true });
  return dest;
}

export interface SiteState {
  config: Record<string, any>;
  content: Record<string, any[]>;
  modules: string[];
}

/** Reads active config, a content manifest and the installed module list. */
export function readState(site: string): SiteState {
  const out = mustRun(drushPath(site), ['php:script', benchStateScript], { cwd: site });
  const start = out.indexOf('{');
  return JSON.parse(out.slice(start)) as SiteState;
}

export function writeContentSnapshot(site: string, state: SiteState): void {
  fs.writeFileSync(path.join(site, 'bench-state', 'content.json'), JSON.stringify(state.content, null, 2) + '\n');
}

export function removeSite(site: string): void {
  fs.rmSync(site, { recursive: true, force: true });
}
