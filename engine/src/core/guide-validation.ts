/**
 * Guide inventory and validation for the Drupal guide corpus.
 *
 * Guides live at `<guidesDir>/<category>/<slug>/guide.md` (see ./paths.ts). The frontmatter
 * contract is defined in the project README.md and guides/CONTRIBUTING.md; the engine relies on:
 *
 *   name:        equals <slug>
 *   description: one-sentence summary (required except for discipline guides and stubs)
 *   drupal-core: Composer constraint for the core versions the guide applies to (required)
 *   draft:       optional; stub | wip | blocked (blocked needs draft-reason). Drafts are not distributed.
 *
 * Unknown extra fields are allowed and passed through.
 */
import fs from 'node:fs';
import path from 'node:path';
import matter from '@11ty/gray-matter';
import { marked } from 'marked';

import { validateMacros, stripComments, maskComments } from './macros.ts';
import { buildHeadingMap } from './headings.ts';
import { parseCoreConstraint, DrupalConstraintError } from './drupal-version.ts';
import { rootDir, guidesDir } from './paths.ts';

export const GUIDE_FILE = 'guide.md';
export const SKILL_FILE = 'SKILL.md';
export const EXPECTATIONS_FILE = 'expectations.md';

/**
 * Named orientation guides that are not category roots. Category root guides
 * (`<category>/<category>/guide.md`) are always discipline guides.
 */
export const DISCIPLINE_GUIDES = new Set<string>([]);

/** Returns true if a guide is a discipline-level orientation guide. */
export function isDisciplineGuide(name: string, category?: string): boolean {
  return (category !== undefined && name === category) || DISCIPLINE_GUIDES.has(name);
}

export interface GuideData {
  name?: string;
  description?: string;
  'drupal-core'?: string;
  /** Omit to publish. See DraftState. */
  draft?: unknown;
  'draft-reason'?: string;
  [key: string]: any;
}

/** Why a guide is withheld from distribution. `blocked` requires a `draft-reason`. */
export type DraftState = 'stub' | 'wip' | 'blocked';
const DRAFT_STATES: readonly DraftState[] = ['stub', 'wip', 'blocked'];

/** Parses `draft` / `draft-reason`, throwing on anything else so a bad value can't publish a guide. */
export function parseDraft(data: GuideData, where: string): { draft?: DraftState; draftReason?: string } {
  const { draft, 'draft-reason': draftReason } = data;
  if (draft === undefined) return {};
  const state = DRAFT_STATES.find(s => s === draft);
  if (!state) {
    throw new Error(`${where}: draft must be one of ${DRAFT_STATES.join(', ')} (got ${JSON.stringify(draft)}). Omit it to publish.`);
  }
  if (state === 'blocked' && !draftReason?.trim()) {
    throw new Error(`${where}: draft: blocked needs a draft-reason.`);
  }
  return { draft: state, draftReason };
}

export function isDraftStub(draft: unknown): boolean {
  return draft === 'stub';
}

/** Strips both {# ... #} macro comments and <!-- ... --> HTML comments. */
export function stripAllComments(content: string): string {
  return stripComments(content).replace(/<!--[\s\S]*?-->/g, '');
}

export function isGuidePublished(hasContent: boolean, draft: unknown): boolean {
  return Boolean(hasContent && !draft);
}

export function stripLeadingH1(markdown: string): string {
  return markdown.trim().replace(/^#\s+[^\n]*\n?/, "").trim();
}

export interface GuideMetadata {
  hasGuide: boolean;
  isStub: boolean;
  draft?: DraftState;
  draftReason?: string;
  drupalCore?: string;
  title?: string;
}

/** Evaluates a guide's state from raw `guide.md` content. */
export function parseGuideMetadata(guideContent: string | null | undefined, filePath: string = GUIDE_FILE): GuideMetadata {
  const { data = {}, content = '' } = guideContent ? matter(guideContent) : {};
  const hasFrontmatter = Object.keys(data).length > 0 || (guideContent || '').startsWith('---');
  const hasContent = stripAllComments(content).trim().length > 0;

  let draft: DraftState | undefined;
  let draftReason: string | undefined;
  try {
    ({ draft, draftReason } = parseDraft(data as GuideData, filePath));
  } catch {
    // An invalid draft value never publishes; validateGuide reports it.
    draft = 'wip';
  }

  const isStub = hasFrontmatter && (!hasContent || isDraftStub(draft));
  const hasGuide = hasContent && !isDraftStub(draft);
  const drupalCore = typeof data['drupal-core'] === 'string' ? data['drupal-core'] : undefined;
  const title = (typeof data.title === 'string' && data.title.trim()) || extractH1Heading(content);

  return { hasGuide, isStub, draft, draftReason, drupalCore, title };
}

export interface GuideInventory {
  dir: string;
  name: string;
  title?: string;
  category: string;
  hasGuide: boolean;
  isStub: boolean;
  hasExpectations: boolean;
  drupalCore?: string;
  isDisciplineGuide: boolean;
  draft?: DraftState;
  draftReason?: string;
  /** Whether the guide belongs in dist: has content and no `draft`. */
  isPublished: boolean;
}

/** Returns the path to the main markdown file for a guide. */
export function getGuideMarkdownPath(inv: Pick<GuideInventory, 'dir'>): string {
  return path.join(inv.dir, GUIDE_FILE);
}

function readFileSafe(filePath: string): string {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, 'utf-8') : '';
}

export function inventoryGuide(dir: string): GuideInventory {
  const name = path.basename(dir);
  const category = path.basename(path.dirname(dir));
  const guideFilePath = path.join(dir, GUIDE_FILE);
  const meta = parseGuideMetadata(readFileSafe(guideFilePath), guideFilePath);
  return {
    dir,
    name,
    title: meta.title,
    category,
    hasGuide: meta.hasGuide,
    isStub: meta.isStub,
    hasExpectations: fs.existsSync(path.join(dir, EXPECTATIONS_FILE)),
    drupalCore: meta.drupalCore,
    isDisciplineGuide: isDisciplineGuide(name, category),
    draft: meta.draft,
    draftReason: meta.draftReason,
    isPublished: meta.hasGuide && !meta.draft,
  };
}

/**
 * Lists every `<category>/<slug>/` directory that holds a guide.md under `scanDir`.
 * A missing `scanDir` yields an empty list, so builds work before any guides exist.
 */
export function scanAllGuides(scanDir = guidesDir): GuideInventory[] {
  const guides: GuideInventory[] = [];
  if (!fs.existsSync(scanDir)) return guides;

  const categories = fs.readdirSync(scanDir, { withFileTypes: true })
    .filter(d => d.isDirectory() && !d.name.startsWith('.') && !d.name.startsWith('_') && d.name !== 'node_modules')
    .map(d => d.name)
    .sort();

  for (const category of categories) {
    const categoryDir = path.join(scanDir, category);
    const entries = fs.readdirSync(categoryDir, { withFileTypes: true })
      .filter(e => e.isDirectory() && !e.name.startsWith('.') && !e.name.startsWith('_') && e.name !== 'node_modules')
      .map(e => e.name)
      .sort();
    for (const entry of entries) {
      const dir = path.join(categoryDir, entry);
      if (!fs.existsSync(path.join(dir, GUIDE_FILE))) continue;
      guides.push(inventoryGuide(dir));
    }
  }
  return guides;
}

let cachedGuidesMap: Map<string, GuideInventory> | null = null;
let guidesMapRoots: readonly string[] | null = null;

/** Guide id → inventory, used to resolve GUIDE_REF. Covers `guidesDir` unless `setGuidesMapRoots` changed it. */
export function getGuidesMap(): Map<string, GuideInventory> {
  if (!cachedGuidesMap) {
    const roots = guidesMapRoots ?? [guidesDir];
    cachedGuidesMap = new Map(roots.flatMap(r => scanAllGuides(r)).map(g => [g.name, g]));
  }
  return cachedGuidesMap;
}

/** Resolve GUIDE_REF across these guide roots instead of `guidesDir` (pass null to restore). */
export function setGuidesMapRoots(roots: readonly string[] | null) {
  guidesMapRoots = roots;
  cachedGuidesMap = null;
}

export function resetGuidesMap() {
  cachedGuidesMap = null;
}

export interface ValidationResult {
  errors: string[];
  data: GuideData;
  body: string;
  filePath: string;
}

/**
 * Validates the `drupal-core` frontmatter field: present, a string, and a Composer constraint
 * this engine can parse.
 *
 * WIRING POINT (wave 2): once `data/drupal/` exists, also check that the range includes at least
 * one released core version and flag APIs in the body that `deprecations.json` marks as removed
 * inside the range (see ./drupal-data.ts).
 */
export function validateDrupalCore(data: GuideData, relativePath: string): string[] {
  const value = data['drupal-core'];
  if (value === undefined || value === null || value === '') {
    return [`Missing "drupal-core" in frontmatter for ${relativePath}.`];
  }
  if (typeof value !== 'string') {
    return [`"drupal-core" must be a quoted string such as ">=11.1" in ${relativePath} (got ${JSON.stringify(value)}).`];
  }
  try {
    parseCoreConstraint(value);
  } catch (e) {
    if (e instanceof DrupalConstraintError) return [`${e.message} (${relativePath}).`];
    throw e;
  }
  return [];
}

/**
 * YAML treats ` #` as the start of a comment, so `description: Use the #[Hook] attribute`
 * silently becomes "Use the". Flags plain (unquoted) scalar values that contain ` #`.
 */
export function validateFrontmatterComments(rawContent: string, relativePath: string): string[] {
  const fm = rawContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!fm) return [];
  const errors: string[] = [];
  for (const line of fm[1].split(/\r?\n/)) {
    const m = line.match(/^([A-Za-z][\w-]*):[ \t]+(.*)$/);
    if (!m) continue;
    const value = m[2];
    if (/^["'|>]/.test(value)) continue;
    const hash = value.search(/\s#/);
    if (hash > 0) {
      errors.push(`Frontmatter "${m[1]}" in ${relativePath} has an unquoted " #", which YAML reads as a comment: the value is cut to "${value.slice(0, hash).trim()}". Quote the value.`);
    }
  }
  return errors;
}

/** Validates a guide file's frontmatter and content. Stubs are only checked for frontmatter. */
export function validateGuide(filePath: string): ValidationResult {
  const errors: string[] = [];
  const fromGuidesParent = path.relative(path.dirname(guidesDir), filePath);
  const relativePath = fromGuidesParent.startsWith('..') ? filePath : fromGuidesParent;

  let content: string;
  try {
    content = fs.readFileSync(filePath, 'utf8');
  } catch (e) {
    return { errors: [`Could not read file: ${e}`], data: {}, body: '', filePath };
  }

  const { data: rawData, content: body } = matter(content);
  const data = rawData as GuideData;
  errors.push(...validateFrontmatterComments(content, relativePath));
  const dirName = path.basename(path.dirname(filePath));
  const category = path.basename(path.dirname(path.dirname(filePath)));
  const hasContent = stripAllComments(body).trim().length > 0;

  if (!data.name) {
    errors.push(`Missing "name" in frontmatter for ${relativePath}.`);
  } else if (data.name !== dirName) {
    errors.push(`Guide name "${data.name}" in frontmatter does not match directory name "${dirName}" (${relativePath}).`);
  }

  try {
    parseDraft(data, relativePath);
  } catch (e) {
    errors.push((e as Error).message);
  }

  const isStub = !hasContent || isDraftStub(data.draft);
  if (!data.description && !isStub && !isDisciplineGuide(dirName, category)) {
    errors.push(`Missing "description" in frontmatter for ${relativePath}.`);
  }
  errors.push(...validateDrupalCore(data, relativePath));

  if (isStub) return { errors, data, body, filePath };

  const maskedBody = maskComments(body);
  errors.push(...validateMacros(maskedBody, relativePath, {
    drupalCore: typeof data['drupal-core'] === 'string' ? data['drupal-core'] : undefined,
  }));
  errors.push(...validateHtmlTags(maskedBody, relativePath));
  errors.push(...validateHeadingHtmlTags(maskedBody, relativePath));
  errors.push(...validateSecureSrc(maskedBody, relativePath));
  errors.push(...validateCodeFences(body, relativePath));
  errors.push(...validateCallouts(maskedBody, relativePath));
  errors.push(...validateAnchorLinks(maskedBody, relativePath));
  errors.push(...validatePendingGuideRefs(body, relativePath));
  errors.push(...validateGuideTitle(maskedBody, relativePath, data, { requireTitle: true }));

  return { errors, data, body, filePath };
}

/** Validates every guide under `scanDir` and checks that guide slugs are unique. */
export function validateAllGuides(scanDir = guidesDir): { errors: string[]; checked: number } {
  const guides = scanAllGuides(scanDir);
  const errors: string[] = [];
  const seen = new Map<string, string>();
  for (const inv of guides) {
    const prev = seen.get(inv.name);
    if (prev) errors.push(`Duplicate guide slug "${inv.name}" in ${prev} and ${inv.category}.`);
    seen.set(inv.name, inv.category);
    errors.push(...validateGuide(getGuideMarkdownPath(inv)).errors);
  }
  return { errors, checked: guides.length };
}

// Kept for callers that resolve paths relative to the engine.
export const ENGINE_ROOT = rootDir;

// Safe typographic inline tags that don't represent interactive elements or cause layout breakage.
const ALLOWED_HTML_TAGS = new Set(['kbd', 'br', 'wbr']);

interface HtmlValidationState {
  offset: number;
}

export function validateHtmlTags(body: string, relativePath: string): string[] {
  const errors: string[] = [];

  try {
    const tokens = marked.lexer(body);
    const state: HtmlValidationState = { offset: 0 };
    findInvalidHtmlTokens(tokens, errors, relativePath, body, state);
  } catch (e) {
    errors.push(`Failed to parse markdown with marked lexer for HTML validation in ${relativePath}: ${e}`);
  }

  return errors;
}

function findInvalidHtmlTokens(
  tokens: any[],
  errors: string[],
  relativePath: string,
  content: string,
  state: HtmlValidationState = { offset: 0 },
) {
  for (const token of tokens) {
    if (token.type === 'html') {
      const raw = token.raw.trim();

      // Allow HTML comments
      if (raw.startsWith('<!--') && raw.endsWith('-->')) {
        continue;
      }

      // Parse tag name
      const match = raw.match(/^<\/?([a-zA-Z0-9:-]+)(?:\s+[^>]*)?\/?>$/);
      if (match) {
        const tagName = match[1].toLowerCase();
        if (!ALLOWED_HTML_TAGS.has(tagName)) {
          // Find line number in content using running offset
          let offset = content.indexOf(token.raw, state.offset);
          if (offset === -1) {
            offset = content.indexOf(token.raw);
          }
          if (offset !== -1) {
            state.offset = offset + token.raw.length;
          }
          const line = offset !== -1 ? content.slice(0, offset).split('\n').length : -1;
          const lineSuffix = line !== -1 ? ` on line ${line}` : '';
          errors.push(`Unescaped HTML tag <${tagName}> found${lineSuffix} in ${relativePath}. Use backticks or escape angle brackets if it is a tag name reference.`);
        }
      } else {
        // If it does not match a standard tag, but is still parsed as HTML token, warn/fail
        let offset = content.indexOf(token.raw, state.offset);
        if (offset === -1) {
          offset = content.indexOf(token.raw);
        }
        if (offset !== -1) {
          state.offset = offset + token.raw.length;
        }
        const line = offset !== -1 ? content.slice(0, offset).split('\n').length : -1;
        const lineSuffix = line !== -1 ? ` on line ${line}` : '';
        errors.push(`Potentially invalid or unescaped HTML block/tag "${raw}" found${lineSuffix} in ${relativePath}.`);
      }
    }

    if (token.tokens) {
      findInvalidHtmlTokens(token.tokens, errors, relativePath, content, state);
    }
    if (token.items) {
      for (const item of token.items) {
        if (item.tokens) {
          findInvalidHtmlTokens(item.tokens, errors, relativePath, content, state);
        }
      }
    }
  }
}

/**
 * Extracts all top-level H1 heading texts from markdown content using AST parsing.
 * Headings inside code blocks are ignored.
 */
export function extractAllH1Headings(markdown: string): string[] {
  if (!markdown || !markdown.trim()) {
    return [];
  }
  try {
    const tokens = marked.lexer(markdown);
    const headings: string[] = [];
    for (const token of tokens) {
      if (token.type === 'heading' && token.depth === 1) {
        const text = token.text.trim();
        if (text.length > 0) {
          headings.push(text);
        }
      }
    }
    return headings;
  } catch {
    return [];
  }
}

/**
 * Extracts the first top-level H1 heading text from markdown content using AST parsing.
 * Headings inside code blocks are ignored.
 * Returns undefined if no top-level H1 heading is found.
 */
export function extractH1Heading(markdown: string): string | undefined {
  const headings = extractAllH1Headings(markdown);
  return headings.length > 0 ? headings[0] : undefined;
}

export const VAGUE_H1_TITLES = new Set(['overview', 'introduction', 'guide', 'title']);

export const REDUNDANT_GUIDE_SUFFIX_PATTERN = /\bguide\s*$/i;

/**
 * Validates headings in a guide body, flagging vague top-level H1 headings and redundant trailing "Guide".
 */
export function validateHeadings(body: string, relativePath: string, data?: GuideData): string[] {
  const errors: string[] = [];

  if (data?.title) {
    const titleStr = String(data.title).trim();
    if (VAGUE_H1_TITLES.has(titleStr.toLowerCase())) {
      errors.push(`Vague title "${data.title}" in frontmatter for ${relativePath}. Use a descriptive title instead.`);
    } else if (REDUNDANT_GUIDE_SUFFIX_PATTERN.test(titleStr)) {
      errors.push(`Redundant trailing "Guide" in frontmatter title "${data.title}" for ${relativePath}. Strip the trailing "Guide".`);
    }
  }

  const headings = extractAllH1Headings(body);
  for (const title of headings) {
    if (VAGUE_H1_TITLES.has(title.toLowerCase())) {
      errors.push(`Vague H1 heading "# ${title}" in ${relativePath}. Use a descriptive title instead.`);
    } else if (REDUNDANT_GUIDE_SUFFIX_PATTERN.test(title)) {
      errors.push(`Redundant trailing "Guide" in H1 heading "# ${title}" for ${relativePath}. Strip the trailing "Guide".`);
    }
  }

  return errors;
}

const PENDING_GUIDE_REF_PATTERN = /\{#\s*PENDING_GUIDE_REF:([\s\S]*?)#\}/g;
const GUIDE_REF_SLUG_PATTERN = /GUIDE_REF\(\s*["']([^"']+)["']\s*\)/g;

/**
 * A `{# PENDING_GUIDE_REF: … {{ GUIDE_REF("slug") }} … #}` comment parks a link to a guide
 * that isn't published yet. Once the target is published, the wrapper must be removed so
 * the link goes live; a typo'd or missing slug is also an error.
 */
export function validatePendingGuideRefs(body: string, relativePath: string): string[] {
  const errors: string[] = [];
  const guides = getGuidesMap();
  for (const [, inner] of body.matchAll(PENDING_GUIDE_REF_PATTERN)) {
    const slugs = [...inner.matchAll(GUIDE_REF_SLUG_PATTERN)].map(m => m[1]);
    if (slugs.length === 0) {
      errors.push(`PENDING_GUIDE_REF comment in ${relativePath} contains no {{ GUIDE_REF("…") }}.`);
    }
    for (const slug of slugs) {
      const target = guides.get(slug);
      if (!target) {
        errors.push(`PENDING_GUIDE_REF in ${relativePath} references unknown guide "${slug}".`);
      } else if (target.isPublished) {
        errors.push(`"${slug}" is now published. In ${relativePath}, remove the {# PENDING_GUIDE_REF: … #} wrapper to restore the link.`);
      }
    }
  }
  return errors;
}

export const GITHUB_ALERT_TYPES = ['NOTE', 'TIP', 'IMPORTANT', 'WARNING', 'CAUTION'] as const;
export type GithubAlertType = typeof GITHUB_ALERT_TYPES[number];

export function isGithubAlertType(type: string): type is GithubAlertType {
  return (GITHUB_ALERT_TYPES as readonly string[]).includes(type);
}

export const ALERT_MARKER_PATTERN = /^> ?\[!(\w+)\]/;
export const BOLD_CALLOUT_PATTERN = new RegExp(`^> ?\\*\\*(${GITHUB_ALERT_TYPES.join('|')})(?::\\*\\*|\\*\\*:)`, 'i');

/**
 * Callouts must use GitHub alert syntax (`> [!NOTE]`) with a known type, so the
 * site build can map them to its own notice styles.
 */
export function validateCallouts(body: string, relativePath: string): string[] {
  const errors: string[] = [];
  marked.walkTokens(marked.lexer(body), token => {
    if (token.type !== 'blockquote') return;
    const alertType = token.raw.match(ALERT_MARKER_PATTERN)?.[1];
    if (alertType && !isGithubAlertType(alertType.toUpperCase())) {
      errors.push(`Unsupported alert type "[!${alertType}]" in ${relativePath}. Use one of: ${GITHUB_ALERT_TYPES.join(', ')}.`);
    }
    const boldLabel = token.raw.match(BOLD_CALLOUT_PATTERN)?.[1];
    if (boldLabel) {
      errors.push(`Bold callout "> **${boldLabel}:**" in ${relativePath}. Use GitHub alert syntax instead: "> [!${boldLabel.toUpperCase()}]".`);
    }
  });
  return errors;
}

/**
 * Validates that a non-stub guide has either a frontmatter title or an explicit H1 heading,
 * and that any H1 heading is not vague.
 */
export function validateGuideTitle(body: string, relativePath: string, data?: GuideData, options?: { requireTitle?: boolean }): string[] {
  const errors = validateHeadings(body, relativePath, data);
  const isStub = stripAllComments(body).trim().length === 0 || isDraftStub(data?.draft);

  if (options?.requireTitle && !isStub) {
    const hasH1 = Boolean(extractH1Heading(body));
    const hasTitle = Boolean(data?.title?.toString().trim());
    if (!hasTitle && !hasH1) {
      errors.push(`Missing H1 heading or frontmatter "title" in non-stub guide ${relativePath}.`);
    }
  }

  return errors;
}

/**
 * Validates that headings do not contain unescaped HTML tags (e.g. `## Using <dialog>`).
 * Tags must be wrapped in backticks so they do not render as live HTML.
 */
export function validateHeadingHtmlTags(body: string, relativePath: string): string[] {
  const errors: string[] = [];
  const tokens = marked.lexer(body);
  marked.walkTokens(tokens, token => {
    if (token.type === 'heading') {
      const textWithoutCode = token.raw.replace(/`[^`]*`/g, '');
      const match = textWithoutCode.match(/<([a-zA-Z0-9:-]+)(?:\s+[^>]*)?\/?>/);
      if (match) {
        errors.push(`Unescaped HTML tag <${match[1]}> in heading "${token.text}" in ${relativePath}. Wrap tag names in backticks.`);
      }
    }
  });
  return errors;
}

/**
 * Validates that `src="..."` attributes do not use insecure HTTP URLs outside of code blocks.
 */
export function validateSecureSrc(body: string, relativePath: string): string[] {
  const errors: string[] = [];
  const textWithoutCode = body
    .replace(/```[\s\S]*?```/g, '')
    .replace(/~~~[\s\S]*?~~~/g, '')
    .replace(/`[^`]*`/g, '');
  const httpMatches = textWithoutCode.match(/src=["']http:\/\/[^"']+/g);
  if (httpMatches) {
    for (const m of httpMatches) {
      errors.push(`Insecure HTTP url in ${m} in ${relativePath}. Use HTTPS instead.`);
    }
  }
  return errors;
}

/**
 * Validates code fence indentation and ensures all code fences are properly closed.
 */
export function validateCodeFences(body: string, relativePath: string): string[] {
  const errors: string[] = [];
  const lines = body.split('\n');
  let openFence: { indent: string; char: string; length: number; line: number } | null = null;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^([ \t]*)(`{3,}|~{3,})/);
    if (!openFence) {
      if (match) {
        openFence = { indent: match[1], char: match[2][0], length: match[2].length, line: i + 1 };
      }
    } else {
      const closeMatch = line.match(/^([ \t]*)(`{3,}|~{3,})[ \t]*$/);
      if (closeMatch && closeMatch[2][0] === openFence.char && closeMatch[2].length >= openFence.length) {
        if (closeMatch[1] !== openFence.indent) {
          errors.push(`Closing code fence indentation (${closeMatch[1].length} spaces on line ${i + 1}) does not match opening fence (${openFence.indent.length} spaces on line ${openFence.line}) in ${relativePath}.`);
        }
        openFence = null;
      }
    }
  }
  if (openFence) {
    errors.push(`Unclosed code fence opened on line ${openFence.line} in ${relativePath}.`);
  }
  return errors;
}

/**
 * Validates that all internal page `#anchor` links resolve to headings present on the page.
 */
export function validateAnchorLinks(body: string, relativePath: string): string[] {
  const errors: string[] = [];
  const { headingMap } = buildHeadingMap(body);
  const anchorMatches = body.matchAll(/\[([^\]]+)\]\(#([^)]+)\)/g);
  for (const match of anchorMatches) {
    const fragment = match[2];
    const resolved = headingMap.get(fragment) ?? headingMap.get(fragment.replace(/-/g, '_'));
    if (!resolved) {
      errors.push(`Unresolved anchor "#${fragment}" in ${relativePath}. No matching heading found on this page.`);
    }
  }
  return errors;
}


