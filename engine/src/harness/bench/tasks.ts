import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import matter from '@11ty/gray-matter';
import type { Grader } from '../../grading/drupal/context.ts';
import { suitesDefDir, tasksDir, DRUPAL_VERSION } from './paths.ts';

export interface BenchTask {
  id: string;
  title: string;
  kind: 'site-building' | 'code';
  guides: string[];
  prompt: string;
  dir: string;
}

export function listTaskIds(): string[] {
  return fs.readdirSync(tasksDir, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(tasksDir, d.name, 'task.md')))
    .map((d) => d.name)
    .sort();
}

export function loadTask(id: string): BenchTask {
  const dir = path.join(tasksDir, id);
  const parsed = matter(fs.readFileSync(path.join(dir, 'task.md'), 'utf8'));
  const data = parsed.data as any;
  return {
    id: data.id || id,
    title: data.title || id,
    kind: data.kind,
    guides: data.guides || [],
    prompt: parsed.content.trim(),
    dir,
  };
}

/** Resolves a --tasks value: a suite name from benchmarks/suites/<name>.json, "all", or comma-separated task ids. */
export function resolveTasks(spec: string): BenchTask[] {
  let ids: string[];
  const suiteFile = path.join(suitesDefDir, `${spec}.json`);
  if (spec === 'all') ids = listTaskIds();
  else if (fs.existsSync(suiteFile)) ids = JSON.parse(fs.readFileSync(suiteFile, 'utf8')).tasks;
  else ids = spec.split(',').map((s) => s.trim()).filter(Boolean);
  const known = new Set(listTaskIds());
  const unknown = ids.filter((i) => !known.has(i));
  if (unknown.length) throw new Error(`Unknown task(s): ${unknown.join(', ')}. Known: ${[...known].join(', ')}`);
  return ids.map(loadTask);
}

export async function loadGrader(task: BenchTask): Promise<Grader> {
  const mod = await import(pathToFileURL(path.join(task.dir, 'grader.ts')).href);
  return (mod.default || mod.grader) as Grader;
}

/** The prompt an agent receives: the same environment preamble for every task and mode, then the task paragraph. */
export function buildPrompt(task: BenchTask): string {
  return [
    `You are working in a Drupal ${DRUPAL_VERSION} site in the current directory. It is a drupal/recommended-project Composer project with the docroot in web/, an installed SQLite database and Drush at vendor/bin/drush.`,
    'There is no web browser. Make site-building changes with Drush or PHP so they are saved in the site\'s database, not only as files. Use Drupal core only and do not add Composer packages.',
    'Work without asking questions and finish the whole task.',
    '',
    'Task:',
    task.prompt,
  ].join('\n');
}
