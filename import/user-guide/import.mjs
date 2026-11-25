#!/usr/bin/env node
/**
 * Imports the English Drupal User Guide into guides/<chapter>/<id>/.
 * Mechanical transformation only: guide text is never reworded. See README.md.
 *
 * Usage: node import/user-guide/import.mjs [--update] [--commit <sha>] [--cache <dir>]
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_URL = 'https://git.drupalcode.org/project/user_guide.git';
const DOCS_BASE = 'https://www.drupal.org/docs/user_guide/en';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/2.0/';
const SOURCE_DIR = 'content/en';

/** Pages that are not guidance. The README lists them too. */
const SKIPPED = new Map([
  ['index', 'table of contents'],
  ['copyright', 'copyright notice (covered by LICENSE and ATTRIBUTION.md)'],
  ['attributions', 'guide-wide attributions (becomes ATTRIBUTION.md)'],
  ['preface-audience', 'preface'],
  ['preface-organization', 'preface'],
  ['preface-reporting', 'preface'],
  ['preface-conventions', 'preface'],
  ['preface-scenario', 'preface'],
]);

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '../..');
const outRoot = path.join(projectRoot, 'guides');
const pinFile = path.join(here, 'pin.json');
// Folders this script owns, as `<chapter>/<id>`. Reruns update or delete only these.
const manifestFile = path.join(here, 'manifest.json');

// ---- arguments ----------------------------------------------------------
const args = process.argv.slice(2);
const opt = (name) => {
  const i = args.indexOf(name);
  return i === -1 ? undefined : args[i + 1];
};
const cacheDir =
  opt('--cache') ??
  path.join(process.env.XDG_CACHE_HOME ?? path.join(os.homedir(), '.cache'), 'modern-drupal-guidance', 'user-guide');
const wantUpdate = args.includes('--update');
const explicitCommit = opt('--commit');

const git = (...a) => execFileSync('git', ['-C', cacheDir, ...a], { encoding: 'utf8', maxBuffer: 1 << 28 }).trim();

// ---- source checkout at the pinned commit -------------------------------
function ensureSource() {
  if (!fs.existsSync(path.join(cacheDir, '.git'))) {
    fs.mkdirSync(path.dirname(cacheDir), { recursive: true });
    execFileSync('git', ['clone', '--quiet', '--filter=blob:none', '--no-checkout', REPO_URL, cacheDir], { stdio: 'inherit' });
    git('sparse-checkout', 'set', SOURCE_DIR);
  }
  let pin = fs.existsSync(pinFile) ? JSON.parse(fs.readFileSync(pinFile, 'utf8')) : undefined;
  if (wantUpdate || !pin || explicitCommit) {
    git('fetch', '--quiet', 'origin');
    const branch = git('symbolic-ref', '--short', 'refs/remotes/origin/HEAD').replace(/^origin\//, '');
    const commit = explicitCommit ? git('rev-parse', explicitCommit + '^{commit}') : git('rev-parse', 'origin/HEAD');
    // Branch the commit belongs to: for an explicit older commit, use the branch the remote default points at.
    pin = { repository: REPO_URL, branch, commit };
    fs.writeFileSync(pinFile, JSON.stringify(pin, null, 2) + '\n');
  }
  git('checkout', '--quiet', '--force', '--detach', pin.commit);
  return pin;
}

// ---- helpers -------------------------------------------------------------
const slugify = (s) =>
  s.toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
const githubSlug = (t) =>
  t.replace(/`([^`]*)`/g, '$1').replace(/\*\*([^*]+)\*\*/g, '$1').replace(/\*([^*]+)\*/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1').toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]/g, '');
const yamlStr = (s) => JSON.stringify(s); // JSON strings are valid YAML double-quoted scalars

function parseDoc(raw, file) {
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`${file}: no frontmatter`);
  const fm = {};
  for (const line of m[1].split('\n')) {
    const kv = line.match(/^([\w-]+):\s*(.*)$/);
    if (!kv) continue;
    let v = kv[2].trim();
    if (v.startsWith('"')) v = JSON.parse(v);
    fm[kv[1]] = v;
  }
  return { fm, body: m[2] };
}

/** Chapter order and membership from the `nav` array of zensical.toml. */
function parseNav(toml) {
  const nav = toml.match(/^nav\s*=\s*\[([\s\S]*?)^\]/m);
  if (!nav) throw new Error('nav not found in zensical.toml');
  const pages = []; // { id, chapter|null, chapterTitle }
  let chapter = null;
  for (const line of nav[1].split('\n')) {
    const c = line.match(/^\s*\{\s*"([^"]+)"\s*=\s*\[/);
    if (c) { chapter = c[1]; continue; }
    const p = line.match(/^\s*"([^"]+)\.md"/);
    if (p) pages.push({ id: p[1], chapterTitle: chapter });
    if (/^\s*\]\},?\s*$/.test(line)) chapter = null;
  }
  return pages;
}

const chapterSlug = (title) => slugify(title.replace(/^Chapter\s+\d+:\s*/i, ''));

/** The core range the User Guide itself states: "covers the current major version of the core software". */
function coreRange(docsDir, pin) {
  const text = fs.readFileSync(path.join(docsDir, 'preface-conventions.md'), 'utf8');
  if (!/covers the current major version of the core software/.test(text)) {
    throw new Error('preface-conventions.md no longer states the covered core version; review coreRange().');
  }
  const major = pin.branch.match(/^(\d+)\.x$/);
  if (!major) throw new Error(`Cannot derive the current major version from the default branch "${pin.branch}".`);
  return `^${major[1]}`;
}

// ---- body transformation -------------------------------------------------
/** Applies fn to the parts of the text outside fenced code blocks and inline code spans. */
function outsideCode(text, fn) {
  return text
    .split(/(^```[\s\S]*?^```[^\n]*$)/m)
    .map((chunk, i) => (i % 2 ? chunk : chunk.split(/(`[^`\n]*`)/).map((s, j) => (j % 2 ? s : fn(s))).join('')))
    .join('');
}

const decodeEntities = (t) =>
  t.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&amp;/g, '&');

/** Raw HTML the engine's validator rejects -> equivalent Markdown. Nothing is reworded. */
function htmlToMarkdown(body, ctx) {
  // Video embeds -> a plain link titled like the iframe.
  body = body.replace(
    /<div class="embedded-video">\s*<iframe src="https:\/\/www\.youtube-nocookie\.com\/embed\/([\w-]+)"[^>]*?title="([^"]*)"[^>]*><\/iframe>\s*<\/div>/g,
    (_, v, title) => `[${decodeEntities(title)}](https://www.youtube.com/watch?v=${v})`,
  );
  // <img src alt width> -> ![alt](src)
  body = body.replace(/<img\s+src="([^"]+)"\s+alt="([^"]*)"[^>]*?\/?>/g, (_, src, alt) => `![${decodeEntities(alt)}](${src})`);
  // <table> -> Markdown table (keeps the indentation of the original, so tables inside list items stay inside them)
  body = body.replace(/^([ \t]*)<table>([\s\S]*?)<\/table>[ \t]*$/gm, (all, indent, inner) => {
    const rows = [...inner.matchAll(/<tr>([\s\S]*?)<\/tr>/g)].map((r) =>
      [...r[1].matchAll(/<t([hd])>([\s\S]*?)<\/t[hd]>/g)].map((c) => {
        const cell = c[2].replace(/\s+/g, ' ').trim();
        if (/<(?!br\s*\/?>)[a-z/]/i.test(cell)) throw new Error(`${ctx.id}: unsupported HTML in table cell: ${cell}`);
        return decodeEntities(cell).replace(/\|/g, '\\|');
      }),
    );
    if (!rows.length || rows.some((r) => r.length !== rows[0].length)) throw new Error(`${ctx.id}: irregular table`);
    const line = (cells) => `${indent}| ${cells.join(' | ')} |`;
    return ['', line(rows[0]), line(rows[0].map(() => '---')), ...rows.slice(1).map(line), ''].join('\n');
  });
  return body;
}

function transformBody(body, ctx) {
  body = htmlToMarkdown(body, ctx);
  // Explicit heading anchors -> heading text, for in-page links inside the same page.
  const anchors = new Map();
  for (const m of body.matchAll(/^#{1,6}\s+(.*?)\s*\{\s*#([\w-]+)[^}]*\}\s*$/gm)) anchors.set(m[2], githubSlug(m[1]));

  return outsideCode(body, (s) => {
    s = s.replace(/^\[\]\(\)\{\s*#[\w-]+\s*\}[ \t]*\n?/gm, ''); // [](){ #anchor }
    s = s.replace(/^(#{1,6}\s+.*?)\s*\{[:\s]*[#.][^}]*\}[ \t]*$/gm, '$1'); // heading { #anchor }
    // Images first, so their /images/ paths are not mistaken for page links.
    s = s.replace(/!\[([^\]]*)\]\((\/images\/[^)\s]+)\)/g, (_, alt, p) => `![${alt}](${DOCS_BASE}${p.replace(/^\/images\//, '/images/')})`);
    // Links between User Guide pages.
    s = s.replace(/(?<!!)\[([^\]]*)\]\((?:\.\/)?([\w-]+)\.md(#[\w-]+)?\)/g, (_, text, id, frag) => {
      if (id === ctx.id) {
        const slug = frag && anchors.get(frag.slice(1));
        return slug ? `[${text}](#${slug})` : text;
      }
      if (ctx.imported.has(id)) {
        ctx.refs.add(id);
        const ref = `{{ GUIDE_REF("${id}") }}`;
        return text === id ? ref : `${text} (${ref})`;
      }
      return `[${text}](${DOCS_BASE}/${id}.html)`;
    });
    return s;
  });
}

// ---- main ---------------------------------------------------------------
const pin = ensureSource();
const docsDir = path.join(cacheDir, SOURCE_DIR, 'docs');
const nav = parseNav(fs.readFileSync(path.join(cacheDir, SOURCE_DIR, 'zensical.toml'), 'utf8'));
const range = coreRange(docsDir, pin);

const importedPages = nav.filter((p) => !SKIPPED.has(p.id));
const imported = new Set(importedPages.map((p) => p.id));
const onDisk = new Set(fs.readdirSync(docsDir).filter((f) => f.endsWith('.md')).map((f) => f.slice(0, -3)));
for (const id of onDisk) if (!nav.some((p) => p.id === id)) console.warn(`warning: ${id}.md is not in the navigation; not imported`);
for (const p of nav) if (!onDisk.has(p.id)) throw new Error(`${p.id}.md is in the navigation but missing`);

const expected = new Map(); // relative path -> content
const report = { imported: [], skipped: [...SKIPPED.keys()] };

for (const page of importedPages) {
  const file = path.join(docsDir, `${page.id}.md`);
  const { fm, body } = parseDoc(fs.readFileSync(file, 'utf8'), file);
  if (fm.id !== page.id) throw new Error(`${page.id}.md: id frontmatter is "${fm.id}"`);
  const chapter = page.chapterTitle ? chapterSlug(page.chapterTitle) : page.id; // glossary has no chapter
  const sourceCommit = git('log', '-1', '--format=%H', pin.commit, '--', `${SOURCE_DIR}/docs/${page.id}.md`);
  const ctx = { id: page.id, imported, refs: new Set() };
  const text = transformBody(body, ctx).replace(/^\s+/, '').replace(/\s+$/, '');
  const url = `${DOCS_BASE}/${page.id}.html`;
  const front = [
    '---',
    `name: ${page.id}`,
    `title: ${yamlStr(fm.title)}`,
    `description: ${yamlStr(fm.description)}`,
    `drupal-core: ${yamlStr(range)}`,
    `source-url: ${url}`,
    `source-commit: ${sourceCommit}`,
    'license: CC-BY-SA-2.0',
    '---',
  ].join('\n');
  const attribution = `*Source: [${fm.title}](${url}), Drupal User Guide, licensed under [CC BY-SA 2.0](${LICENSE_URL}).*`;
  expected.set(`${chapter}/${page.id}/guide.md`, `${front}\n\n${text}\n\n${attribution}\n`);
  report.imported.push(`${chapter}/${page.id}`);
}

// ATTRIBUTION.md from the User Guide's attributions page (same mechanical link rewrite).
{
  const file = path.join(docsDir, 'attributions.md');
  const { fm, body } = parseDoc(fs.readFileSync(file, 'utf8'), file);
  const ctx = { id: 'attributions', imported, refs: new Set() };
  const text = transformBody(body, ctx).trim();
  expected.set(
    'ATTRIBUTION-user-guide.md',
    `# Attribution\n\nThe guides in this directory are imported without rewording from the [Drupal User Guide](${DOCS_BASE}/index.html) ` +
      `(source: ${REPO_URL}, commit \`${pin.commit}\`). The text below is the User Guide's own attributions page` +
      ` ([${fm.title}](${DOCS_BASE}/attributions.html)). Each guide ends with a link to its source page, and the contributors of that page are ` +
      `named in the text of the guide.\n\n${text}\n`,
  );
}

expected.set(
  'LICENSE-user-guide.md',
  `The guides in this directory are imported from the Drupal User Guide
(https://www.drupal.org/docs/user_guide/en/index.html).

Copyright 2015-2026 by the individual contributors to the Drupal User Guide.

They are licensed under the Creative Commons Attribution-ShareAlike 2.0 Generic
license (CC BY-SA 2.0): https://creativecommons.org/licenses/by-sa/2.0/

You are free to share and adapt this material for any purpose, even commercially,
under these terms:

  Attribution: you must give appropriate credit (see ATTRIBUTION-user-guide.md and the link
  at the end of each guide), provide a link to the license, and indicate if
  changes were made.

  ShareAlike: if you remix, transform or build upon the material, you must
  distribute your contributions under the same license as the original.

Changes made here are mechanical only: guide frontmatter was added, links between
User Guide pages were rewritten as guide references, image links were made
absolute, and Zensical-only anchor syntax was removed. The text was not reworded.

This file is a summary notice, not the license. The full legal code is at
https://creativecommons.org/licenses/by-sa/2.0/legalcode
`,
);

// ---- collisions, then write changed files and remove deleted pages -------
const previous = new Set(fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')).guides : []);
const owned = [...expected.keys()].filter((r) => r.endsWith('/guide.md')).map((r) => r.slice(0, -'/guide.md'.length)).sort();

// Names of every other guide in guides/, to keep slugs unique across categories.
const otherNames = new Map();
const previousChapters = new Set([...previous].map((r) => r.split('/')[0]));
for (const cat of fs.existsSync(outRoot) ? fs.readdirSync(outRoot, { withFileTypes: true }).filter((d) => d.isDirectory()) : []) {
  for (const g of fs.readdirSync(path.join(outRoot, cat.name), { withFileTypes: true }).filter((d) => d.isDirectory())) {
    if (!previous.has(`${cat.name}/${g.name}`)) otherNames.set(g.name, `${cat.name}/${g.name}`);
  }
}
const collisions = [];
for (const rel of owned) {
  const [chapter, id] = rel.split('/');
  if (fs.existsSync(path.join(outRoot, chapter)) && !previousChapters.has(chapter) && !previous.has(rel))
    collisions.push(`chapter folder guides/${chapter}/ already exists and is not owned by this import`);
  else if (fs.existsSync(path.join(outRoot, rel)) && !previous.has(rel)) collisions.push(`guides/${rel} already exists and is not owned by this import`);
  if (otherNames.has(id)) collisions.push(`guide name "${id}" is already used by guides/${otherNames.get(id)}`);
}
if (collisions.length) {
  console.error('Collision, nothing written:\n  ' + [...new Set(collisions)].join('\n  '));
  process.exit(1);
}

let written = 0, unchanged = 0, removed = 0;
for (const [rel, content] of expected) {
  const target = path.join(outRoot, rel);
  if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') === content) { unchanged++; continue; }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  written++;
  console.log(`wrote guides/${rel}`);
}
for (const rel of [...previous].filter((r) => !owned.includes(r)).sort()) {
  fs.rmSync(path.join(outRoot, rel), { recursive: true, force: true });
  const chapterDir = path.join(outRoot, rel.split('/')[0]);
  if (fs.existsSync(chapterDir) && fs.readdirSync(chapterDir).length === 0) fs.rmdirSync(chapterDir);
  console.log(`removed guides/${rel}`);
  removed++;
}
const manifest = JSON.stringify({ comment: 'Folders under guides/ owned by import.mjs. Do not edit.', guides: owned }, null, 2) + '\n';
if (!fs.existsSync(manifestFile) || fs.readFileSync(manifestFile, 'utf8') !== manifest) fs.writeFileSync(manifestFile, manifest);

console.log(`\nPinned commit: ${pin.commit} (${pin.branch}); drupal-core ${range}`);
console.log(`Imported ${report.imported.length} pages, skipped ${report.skipped.length}. Files written ${written}, unchanged ${unchanged}, removed ${removed}.`);
