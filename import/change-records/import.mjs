#!/usr/bin/env node
/**
 * Turns cached drupal/core change records (see fetch.mjs) that were introduced
 * in 11.x or 12.x into guides under guides/<category>/<slug>/guide.md.
 * Mechanical conversion only (HTML to Markdown): the record text is never reworded.
 * Makes no network requests. See README.md.
 *
 * Usage: node import/change-records/import.mjs [--dry-run]
 */
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(here, '../..');
const guidesRoot = path.join(projectRoot, 'guides');
const pagesDir = path.join(here, 'cache', 'pages');
const manifestFile = path.join(here, 'manifest.json');
const pin = JSON.parse(fs.readFileSync(path.join(here, 'pin.json'), 'utf8'));
const dryRun = process.argv.includes('--dry-run') || process.argv.includes('--list');
const listOnly = process.argv.includes('--list');

// linkedom is already installed for the engine; borrow it instead of adding a package.
const requireFromEngine = createRequire(path.join(projectRoot, 'engine', 'package.json'));
const { parseHTML } = requireFromEngine('linkedom');

const SITE = 'https://www.drupal.org';
const LICENSE_URL = 'https://creativecommons.org/licenses/by-sa/2.0/';
const MAJORS = new Set(['11', '12']);
const MIN_BODY_CHARS = 80;

// ---- categories ---------------------------------------------------------
// Rules match the record title only; the first match wins. Matching the body as
// well misfiled many records (a "node" or "theme" in passing decided the folder),
// so a title with no match goes to DEFAULT_CATEGORY or to CATEGORY_OVERRIDES.
// Mechanical sorting only. Reviewers may move a guide: change a rule or an
// override and rerun. Order matters: specific rules come before broad ones.
const CATEGORY_RULES = [
  ['migration', /\bmigrat(e|es|ion|ions)\b|\bmigrate_|MigrateExecutable|\bI18nQueryTrait\b/i],
  ['testing', /phpunit|\b(kernel|functional|browser|performance|rule) ?tests?\b|\btests?\b|\btesting\b|test ?traits?|testbase|nightwatch|run-tests|\bexpectDeprecation|\bStubPDO\b|SYMFONY_DEPRECATIONS_HELPER|\bTestRequirementsTrait|\bEntityDefinitionTestTrait|FunctionalTestSetupTrait|WebDriverCurlService|DrupalKernelInterface|simpletest/i],
  ['composer-and-tooling', /composer|\bdrush\b|phpstan|coding standard|\bphp ?8\.\d|requires? (php|the \w+ extension|node\.js)|node\.js|corepack|yarn|core-recommended|core-dev|scaffold|polyfill|package manager|dev-dependency|`dr`|'dr'|\bdr - |database requirements|branching scheme|must update to drupal|return types are required|void return types|weak algorithms|constructor property promotion|doctrine\/annotations|json-schema moved|currentErrorHandler|prettier|vendor hardening|symfony\/runtime|autoload global/i],
  ['headless-and-apis', /json:?api|\brest\b|serializ|normaliz|json schema/i],
  ['security', /permission|\baccess\b|password|csrf|xss|htaccess|\bsession|security|sanitiz|dangerous characters|filter_xss|\broles?\b|AccessResult|TrustedCallback|#file_value_callbacks/i],
  ['theming-and-components', /preprocess|hooks in themes|theme suggestions?|\btwig\b|\btheme|template|single.directory|\bsdcs?\b|\bcomponents?\b|olivero|claro|stable ?9|starterkit|\bcss\b|stylesheet|librar(y|ies)\b|\bicons?\b|design tokens|\baria\b|\.engine extension|loading\.gif|image_filter_keyword|date formats|responsive_image|wai-aria|hide\(\) and show\(\)|tabledrag|page_top/i],
  ['front-end-javascript', /javascript|\bjs\b|jquery|behaviors|\bonce\(|ckeditor|\bajax\b|htmx|drupalsettings|debounce|backbone|resetForm|dialogButtonsChange|autocomplete\.js|filter tips|compact mode/i],
  ['caching-and-performance', /\bcach(e|es|ing|eable|eability)\b|performance|\blazy\b|placeholder|big ?pipe|prewarm|garbage|preload|cachetags|drupal_static|aggregat|brotli|CacheOptionalInterface|memory management/i],
  ['module-development', /\bhooks?\b|hook_|#\[\w*Hook|\.module file|\.profile file|\.info\.yml|\b(tour|forum|statistics|book|ban|contact|history|telephone|toolbar|search|shortcut|field layout|actions ui|activity tracker|settings tray|migrate drupal ui) module\b|^(toolbar|settings tray|stable9|search module) is (deprecated|removed)|module (has been )?removed|module is (deprecated|removed)/i],
  ['form-api', /\bforms?\b|#states|form element|render element|#value_callback|\bbatch\b|BatchBuilder|form_select_options|widget|validation will be disabled|email addresses/i],
  ['configuration-and-recipes', /\bconfig(uration)?\b|recipes?\b|schema data type|install profiles?|standard profile|\bprofiles?\b|\bconstraints?\b|\.htaccess files|\bsettings?\b|yaml|web\.config|block weights|content:export|default content/i],
  ['entities-and-fields', /\bentit(y|ies)\b|\bfields?\b|\bbundles?\b|\bnodes?\b|\bnode_|taxonomy|revision|typed ?data|workspace|\bmedia\b|\bcomments?\b|\bcomment_|user_load|\blink\b|\buuids?\b|text_summary|\bfile_get|editor_load|image ?style|promoted|NodeTypeInterface|SqlContentEntityStorage|ContentEntityStorageBase/i],
  ['module-development', /\b(database|query|queries|statement|transaction|upsert|truncate|merge query|pdo|mysql|postgresql|sqlite)\b|schema definition|\broutes?\b|\bevents?\b|service closure|services\.yml|\bplugins?\b|autowir|classloader|param convertor|\bcron\b|queue runner/i],
];
// Records whose title fits no rule well, or that a rule misfiles. nid → category.
const CATEGORY_OVERRIDES = {
  3038909: 'security',
  3295826: 'entities-and-fields',
  3367114: 'entities-and-fields',
  3395991: 'module-development',
  3424376: 'module-development',
  3443018: 'caching-and-performance',
  3465079: 'composer-and-tooling',
  3484001: 'module-development',
  3489030: 'configuration-and-recipes',
  3495417: 'module-development',
  3498345: 'testing',
  3511861: 'module-development',
  3519491: 'configuration-and-recipes',
  3523753: 'module-development',
  3525560: 'configuration-and-recipes',
  3526344: 'caching-and-performance',
  3529500: 'module-development',
  3534610: 'security',
  3547277: 'module-development',
  3554746: 'module-development',
  3558881: 'entities-and-fields',
  3565717: 'module-development',
  3566225: 'theming-and-components',
  3578055: 'security',
  3580268: 'testing',
  3585330: 'entities-and-fields',
  3585342: 'module-development',
  3586712: 'module-development',
  3589343: 'theming-and-components',
  3589759: 'module-development',
  3603991: 'entities-and-fields',
  3614882: 'theming-and-components',
  3615418: 'module-development',
  3625908: 'module-development',
};
const DEFAULT_CATEGORY = 'module-development';

// ---- possible overlaps with the hand-written guides ---------------------
const OVERLAP_RULES = [
  ['module-development/oop-hooks', /#\[(Legacy)?Hook|\bhook (attribute|class)|\boop hooks?\b|\bHook\\|\bLegacyHook\b|hooks? (as|in) (classes|class methods)/i],
  ['module-development/plugin-attributes', /plugin.{0,40}attribute|attribute.{0,40}plugin|annotations? to attributes/i],
  ['module-development/dependency-injection', /autowir|dependency injection|AutowireTrait/i],
  ['caching-and-performance/cache-metadata', /cache (tags?|contexts?)|max-age|CacheableMetadata|cacheability/i],
  ['caching-and-performance/lazy-builders', /lazy.?builder|placeholder/i],
  ['front-end-javascript/behaviors-and-once', /\bonce\(|core\/once|Drupal\.behaviors/i],
  ['theming-and-components/single-directory-components', /single.directory component|\bsdc\b/i],
];

// ---- HTML to Markdown ---------------------------------------------------
const absUrl = (href) => {
  if (!href) return '';
  if (href.startsWith('//')) return `https:${href}`;
  if (href.startsWith('/')) return SITE + href;
  return href.replace(/^http:\/\/(www\.)?drupal\.org/, 'https://www.drupal.org');
};

/** Escape text so Markdown, macros and the HTML validator read it literally. */
function escapeText(s) {
  return s
    .replace(/\\(?=[!-\/:-@[-`{-~])/g, '\\\\')
    .replace(/([*`\[\]])/g, '\\$1')
    .replace(/(^|[^\w])_|_(?=[^\w]|$)/g, (m) => m.replace('_', '\\_'))
    .replace(/</g, '&lt;')
    .replace(/\{([#{%])/g, '{\\$1');
}

const BLOCK = new Set(['p', 'div', 'pre', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'table', 'dl', 'dt', 'dd', 'hr', 'section', 'article', 'figure', 'details', 'summary']);

function inline(node) {
  let out = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      out += escapeText(child.textContent.replace(/\s+/g, ' '));
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.tagName.toLowerCase();
    if (tag === 'code' || tag === 'kbd' || tag === 'tt' || tag === 'var' || tag === 'samp') {
      const t = child.textContent.replace(/\s+/g, ' ');
      if (!t.trim()) continue;
      const ticks = '`'.repeat((t.match(/`+/g) ?? ['']).reduce((a, b) => Math.max(a, b.length), 0) + 1);
      const pad = t.startsWith('`') || t.endsWith('`') ? ' ' : '';
      out += `${ticks}${pad}${t}${pad}${ticks}`;
    } else if (tag === 'a') {
      const text = inline(child).trim();
      const href = absUrl(child.getAttribute('href'));
      if (!href || href.startsWith('#') || href.startsWith('mailto:')) out += text;
      else out += text ? `[${text}](<${href}>)`.replace(/\(<([^ <>]+)>\)$/, '($1)') : href;
    } else if (tag === 'strong' || tag === 'b') {
      const t = inline(child);
      out += t.trim() ? `**${t.trim()}**${/\s$/.test(t) ? ' ' : ''}` : t;
    } else if (tag === 'em' || tag === 'i' || tag === 'cite') {
      const t = inline(child);
      out += t.trim() ? `*${t.trim()}*${/\s$/.test(t) ? ' ' : ''}` : t;
    } else if (tag === 'del' || tag === 's' || tag === 'strike') {
      const t = inline(child).trim();
      out += t ? `~~${t}~~` : '';
    } else if (tag === 'br') {
      out += '\\\n';
    } else if (tag === 'img') {
      const src = absUrl(child.getAttribute('src'));
      if (src) out += `![${escapeText(child.getAttribute('alt') ?? '')}](${src})`;
    } else if (BLOCK.has(tag)) {
      out += ' ' + inline(child) + ' ';
    } else {
      out += inline(child);
    }
  }
  return out;
}

const cleanInline = (s) => s.replace(/[ \t]+/g, ' ').replace(/ ?\\\n ?/g, '\\\n').trim().replace(/\\$/, '');

/** Protect line starts that Markdown would read as a heading, list or quote. */
const guardLineStart = (s) =>
  s.replace(/^(#{1,6} |>|[-+] |\d+[.)] )/gm, (m) => '\\' + m);

function codeLanguage(pre) {
  const el = pre.querySelector('code') ?? pre;
  const cls = `${el.getAttribute('class') ?? ''} ${pre.getAttribute('class') ?? ''}`;
  const m = cls.match(/language-([\w-]+)/) ?? cls.match(/brush:\s*([\w-]+)/);
  return m ? m[1].toLowerCase() : '';
}

function fence(code, lang) {
  const text = code.replace(/\r\n?/g, '\n').replace(/^\n+|\s+$/g, '');
  const longest = (text.match(/^\s*`{3,}/gm) ?? []).reduce((a, b) => Math.max(a, b.trim().length), 2);
  const f = '`'.repeat(longest + 1);
  return `${f}${lang}\n${text}\n${f}`;
}

function blocks(node, depth = 0) {
  const parts = [];
  let buffer = null; // inline content between blocks
  const flush = () => {
    if (buffer !== null) {
      const t = cleanInline(inline(buffer));
      if (t) parts.push(guardLineStart(t));
      buffer = null;
    }
  };
  for (const child of node.childNodes) {
    const tag = child.nodeType === 1 ? child.tagName.toLowerCase() : null;
    if (!tag || !BLOCK.has(tag)) {
      if (child.nodeType === 3 && !child.textContent.trim() && buffer === null) continue;
      if (child.nodeType !== 1 && child.nodeType !== 3) continue;
      buffer ??= node.ownerDocument.createElement('span');
      buffer.appendChild(child.cloneNode(true));
      continue;
    }
    flush();
    if (tag === 'p' || tag === 'summary' || tag === 'dt') {
      let t = cleanInline(inline(child));
      if (tag === 'dt' && t) t = `**${t}**`;
      if (t) parts.push(guardLineStart(t));
    } else if (/^h[1-6]$/.test(tag)) {
      const level = Math.min(6, Math.max(2, Number(tag[1])));
      const t = cleanInline(inline(child)).replace(/\\\n/g, ' ');
      if (t) parts.push(`${'#'.repeat(level)} ${t}`);
    } else if (tag === 'pre') {
      parts.push(fence(child.textContent, codeLanguage(child)));
    } else if (tag === 'ul' || tag === 'ol') {
      const start = Number(child.getAttribute('start') ?? 1) || 1;
      let i = 0;
      const items = [];
      for (const li of child.children) {
        const marker = tag === 'ol' ? `${start + i++}. ` : '- ';
        const body = blocks(li, depth + 1) || '';
        const pad = ' '.repeat(marker.length);
        items.push(marker + body.split('\n').map((l, j) => (j === 0 || !l ? l : pad + l)).join('\n'));
      }
      const loose = items.some((it) => it.includes('\n\n'));
      if (items.length) parts.push(items.join(loose ? '\n\n' : '\n'));
    } else if (tag === 'blockquote') {
      const inner = blocks(child, depth + 1);
      if (inner) parts.push(inner.split('\n').map((l) => (l ? `> ${l}` : '>')).join('\n'));
    } else if (tag === 'table') {
      parts.push(table(child));
    } else if (tag === 'hr') {
      parts.push('---');
    } else {
      const inner = blocks(child, depth + 1);
      if (inner) parts.push(inner);
    }
  }
  flush();
  return parts.join('\n\n');
}

function table(el) {
  const rows = [...el.querySelectorAll('tr')].map((tr) =>
    [...tr.children].map((td) => cleanInline(inline(td)).replace(/\\\n/g, ' ').replace(/\|/g, '\\|') || ' '),
  );
  if (!rows.length) return '';
  const width = Math.max(...rows.map((r) => r.length));
  const pad = (r) => [...r, ...Array(width - r.length).fill(' ')];
  const lines = [`| ${pad(rows[0]).join(' | ')} |`, `|${' --- |'.repeat(width)}`];
  for (const r of rows.slice(1)) lines.push(`| ${pad(r).join(' | ')} |`);
  return lines.join('\n');
}

function htmlToMarkdown(html) {
  const { document } = parseHTML(`<!DOCTYPE html><html><body><div id="root">${html}</div></body></html>`);
  return blocks(document.getElementById('root')).replace(/\n{3,}/g, '\n\n').trim();
}

const plainText = (html) => {
  const { document } = parseHTML(`<!DOCTYPE html><html><body>${html}</body></html>`);
  return document.body.textContent.replace(/\s+/g, ' ').trim();
};

// ---- records ------------------------------------------------------------
function loadRecords() {
  const byNid = new Map();
  for (const f of fs.readdirSync(pagesDir).sort()) {
    for (const n of JSON.parse(fs.readFileSync(path.join(pagesDir, f), 'utf8')).list ?? []) byNid.set(n.nid, n);
  }
  return [...byNid.values()].sort((a, b) => Number(a.nid) - Number(b.nid));
}

/** "11.2.0" → {major: '11', minor: '2', version}. Branch fills a missing version ("11.x"). */
function introducedIn(n) {
  const v = (n.field_change_to ?? '').trim();
  const b = (n.field_change_to_branch ?? '').trim();
  const m = v.match(/^(\d+)\.(\d+|x)/) ?? v.match(/^(\d+)(?:$|[^\d.])/);
  if (m) return { major: m[1], minor: m[2] && m[2] !== 'x' ? m[2] : '0', version: v, branch: b };
  const bm = b.match(/^(\d+)\.(\d+|x)/);
  if (bm) return { major: bm[1], minor: bm[2] !== 'x' ? bm[2] : '0', version: v, branch: b };
  return { major: null, minor: null, version: v, branch: b };
}

/**
 * Composer constraint for "Introduced in version". A patch release (11.2.5) keeps
 * its patch, so the guide does not claim 11.2.0 to 11.2.4. Comma-separated
 * backports to an earlier 11.x/12.x minor ("11.4.0, 11.3.17, 10.6.15") become
 * "^11.3.17 || >=11.4". Other majors in the list are ignored.
 */
function coreConstraint(v) {
  const versions = v.version.split(',').map((x) => x.trim().match(/^(\d+)\.(\d+)\.(\d+)/)).filter((m) => m && MAJORS.has(m[1]));
  const main = versions[0];
  const lower = (m) => (m[3] === '0' ? `${m[1]}.${m[2]}` : `${m[1]}.${m[2]}.${m[3]}`);
  if (!main) return `>=${v.major}.${v.minor}`;
  const backports = versions.slice(1).filter((m) => m[1] === main[1] && Number(m[2]) < Number(main[2]));
  return [...backports.map((m) => `^${m[1]}.${m[2]}.${m[3]}`), `>=${lower(main)}`].join(' || ');
}

const slugify = (title) => {
  let s = title
    .toLowerCase()
    .replace(/&[a-z]+;/g, ' ')
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  if (s.length > 60) s = s.slice(0, 60).replace(/-[^-]*$/, '');
  return s || 'change-record';
};

function categorize(nid, title) {
  if (CATEGORY_OVERRIDES[nid]) return CATEGORY_OVERRIDES[nid];
  for (const [cat, re] of CATEGORY_RULES) if (re.test(title)) return cat;
  return DEFAULT_CATEGORY;
}

const decodeTitle = (t) => plainText(t);

// ---- existing guides ----------------------------------------------------
const previous = fs.existsSync(manifestFile) ? JSON.parse(fs.readFileSync(manifestFile, 'utf8')) : { guides: [] };
const owned = new Set(previous.guides.map((g) => g.path));
const foreignNames = new Set();
for (const cat of fs.readdirSync(guidesRoot, { withFileTypes: true })) {
  if (!cat.isDirectory()) continue;
  for (const g of fs.readdirSync(path.join(guidesRoot, cat.name), { withFileTypes: true })) {
    if (g.isDirectory() && !owned.has(`guides/${cat.name}/${g.name}`)) foreignNames.add(g.name);
  }
}

// ---- build --------------------------------------------------------------
const imported = [];
const skipped = [];
const usedSlugs = new Set();
const records = loadRecords();
let inScope = 0;

for (const n of records) {
  const v = introducedIn(n);
  if (n.field_project?.id !== '3060' || !MAJORS.has(v.major)) continue;
  inScope++;
  const title = decodeTitle(n.title);
  const url = `${SITE}/node/${n.nid}`;
  const base = { nid: n.nid, title, url, version: v.version || v.branch };
  if (n.status !== '1') {
    skipped.push({ ...base, reason: 'node unpublished' });
    continue;
  }
  if (n.field_change_record_status !== true) {
    skipped.push({ ...base, reason: 'change record still a draft (not yet published on drupal.org)' });
    continue;
  }
  const html = [n.field_description?.value, n.body?.value].filter(Boolean).join('\n');
  const text = plainText(html);
  if (text.length < MIN_BODY_CHARS) {
    skipped.push({ ...base, reason: text ? `body too short to guide (${text.length} characters)` : 'empty body' });
    continue;
  }

  let slug = slugify(title);
  if (usedSlugs.has(slug) || foreignNames.has(slug)) slug = `${slug}-${n.nid}`;
  usedSlugs.add(slug);
  const category = categorize(n.nid, title);
  const overlaps = OVERLAP_RULES.filter(([, re]) => re.test(`${title} ${text}`)).map(([g]) => g);
  const constraint = coreConstraint(v);

  const issues = (n.field_issue_links ?? []).map((l) => absUrl(l.url)).filter(Boolean);
  const issueText = issues.map((u) => `[#${u.split('/').pop()}](${u})`).join(', ');
  const author = n.author?.name ? `[${escapeText(n.author.name)}](${SITE}/user/${n.author.id})` : null;

  const fm = [
    '---',
    `name: ${slug}`,
    `title: ${JSON.stringify(title)}`,
    `description: ${JSON.stringify(title)}`,
    `drupal-core: "${constraint}"`,
    `source-url: ${url}`,
    `change-record-nid: ${n.nid}`,
    `introduced-in-version: ${JSON.stringify(v.version)}`,
    `introduced-in-branch: ${JSON.stringify(v.branch)}`,
    `license: CC-BY-SA-2.0`,
    '---',
  ].join('\n');
  const meta = [
    v.branch ? `Introduced in branch: ${escapeText(v.branch)}` : null,
    v.version ? `Introduced in version: ${escapeText(v.version)}` : null,
    issueText ? `Issue links: ${issueText}` : null,
  ].filter(Boolean).join('\\\n');
  const attribution = `*Source: [${escapeText(title)}](${url}), a Drupal core change record${author ? ` by ${author}` : ''} on drupal.org, licensed under [CC BY-SA 2.0](${LICENSE_URL}).*`;
  const body = [meta, htmlToMarkdown(html), attribution].filter(Boolean).join('\n\n');
  const content = `${fm}\n\n${body}\n`;

  const rel = `guides/${category}/${slug}`;
  imported.push({ nid: n.nid, title, path: `${rel}/guide.md`, category, slug, version: v.version, drupalCore: constraint, url, overlaps, content });
}

// ---- write --------------------------------------------------------------
const newPaths = new Set(imported.map((g) => path.dirname(g.path)));
for (const g of imported) {
  const dir = path.join(projectRoot, path.dirname(g.path));
  if (fs.existsSync(dir) && !owned.has(path.dirname(g.path))) {
    console.error(`Refusing to write ${g.path}: folder exists and is not in the manifest.`);
    process.exit(1);
  }
}
if (!dryRun) {
  for (const old of owned) {
    if (!newPaths.has(old)) {
      fs.rmSync(path.join(projectRoot, old), { recursive: true, force: true });
      const catDir = path.dirname(path.join(projectRoot, old));
      if (fs.existsSync(catDir) && fs.readdirSync(catDir).length === 0) fs.rmdirSync(catDir);
    }
  }
  for (const g of imported) {
    const file = path.join(projectRoot, g.path);
    fs.mkdirSync(path.dirname(file), { recursive: true });
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== g.content) fs.writeFileSync(file, g.content);
  }
  const manifest = {
    comment: 'Generated by import.mjs. Folders under guides/ owned by the change record import. Do not edit.',
    source: 'https://www.drupal.org/list-changes/drupal',
    fetched: pin.fetched,
    counts: { fetched: records.length, introducedIn11or12: inScope, imported: imported.length, skipped: skipped.length },
    guides: imported.map(({ content, slug, ...g }) => ({ ...g, path: path.dirname(g.path), file: g.path })),
    skipped,
    // Prose escapes "{#", so a match here is a Twig comment in a code block, which the engine strips at build.
    twigCommentsInCode: imported.filter((g) => /\{#[\s\S]*?#\}/.test(g.content)).map((g) => path.dirname(g.path)),
  };
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2) + '\n');
}

if (listOnly) for (const g of imported) console.log(`${g.nid}\t${g.category}\t${g.drupalCore}\t${g.title}`);
const byCat = {};
for (const g of imported) byCat[g.category] = (byCat[g.category] ?? 0) + 1;
console.log(`Records fetched: ${records.length}; introduced in 11.x/12.x: ${inScope}; imported: ${imported.length}; skipped: ${skipped.length}`);
console.log(byCat);
