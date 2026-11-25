/**
 * PHP scanner: parses PHP with php-parser (pure JS, no PHP runtime) and
 * offers the AST helpers the Drupal rules share.
 */
import { createRequire } from 'node:module';
import type { PhpMatcherContext, PhpNode, PhpRuleMatcher, ScanMatch } from '../schema.ts';
import { matchesFastTokens } from './fast-tokens.ts';

const require = createRequire(import.meta.url);
// php-parser ships CommonJS.
const PhpEngine = require('php-parser') as new (options: unknown) => {
  parseCode(code: string, filename: string): PhpNode;
};

/** Extensions the PHP engine reads. */
export const PHP_EXTENSIONS: readonly string[] = [
  '.php',
  '.module',
  '.inc',
  '.install',
  '.theme',
  '.profile',
  '.engine',
];

function createParser() {
  return new PhpEngine({
    parser: { extractDoc: true, php8: true, suppressErrors: true, version: '8.3' },
    ast: { withPositions: true },
    lexer: { short_tags: false },
  });
}

export class PhpParseError extends Error {}

export function parsePhp(code: string, filePath: string): PhpNode {
  try {
    return createParser().parseCode(code, filePath);
  } catch (error) {
    throw new PhpParseError(`Failed to parse PHP in ${filePath}: ${(error as Error).message}`);
  }
}

export function scanPhpSource(
  code: string,
  matchers: readonly PhpRuleMatcher[],
  ctx: PhpMatcherContext,
): ScanMatch[][] {
  const active = matchers.map((m) => matchesFastTokens(code, m.fastTokens));
  if (!active.some(Boolean)) return matchers.map(() => []);
  const program = parsePhp(code, ctx.filePath);
  return matchers.map((m, i) => (active[i] ? m.matchFile(program, ctx) : []));
}

// ---------------------------------------------------------------------------
// AST helpers
// ---------------------------------------------------------------------------

export function isNode(value: unknown): value is PhpNode {
  return typeof value === 'object' && value !== null && typeof (value as PhpNode).kind === 'string';
}

const SKIP_FIELDS = new Set(['loc', 'leadingComments', 'trailingComments', 'attrGroups']);

/** Child nodes in source order. */
export function children(node: PhpNode): PhpNode[] {
  const out: PhpNode[] = [];
  for (const [key, value] of Object.entries(node)) {
    if (SKIP_FIELDS.has(key)) continue;
    if (Array.isArray(value)) {
      for (const item of value) if (isNode(item)) out.push(item);
    } else if (isNode(value)) {
      out.push(value);
    }
  }
  return out;
}

/**
 * Depth-first walk. `visit` receives the node and its ancestors (nearest
 * last). Return `false` to skip the node's children.
 */
export function walk(
  root: PhpNode,
  visit: (node: PhpNode, ancestors: readonly PhpNode[]) => boolean | void,
): void {
  const ancestors: PhpNode[] = [];
  const recurse = (node: PhpNode): void => {
    if (visit(node, ancestors) === false) return;
    ancestors.push(node);
    for (const child of children(node)) recurse(child);
    ancestors.pop();
  };
  recurse(root);
}

export function findAll(root: PhpNode, kind: string | readonly string[]): PhpNode[] {
  const kinds = typeof kind === 'string' ? [kind] : kind;
  const out: PhpNode[] = [];
  walk(root, (node) => {
    if (kinds.includes(node.kind)) out.push(node);
  });
  return out;
}

export function lineOf(node: PhpNode | null | undefined): number {
  return node?.loc?.start.line ?? 1;
}

/** Text of an identifier or name node (`name`, `identifier`). */
export function nameText(node: unknown): string | null {
  if (typeof node === 'string') return node;
  if (!isNode(node)) return null;
  const name = node.name;
  if (typeof name === 'string') return name;
  if (isNode(name)) return nameText(name);
  return null;
}

/** Last segment of a possibly qualified name: `\Drupal\Core\Foo` -> `Foo`. */
export function shortName(name: string | null): string | null {
  if (!name) return null;
  const parts = name.split('\\');
  return parts[parts.length - 1] ?? null;
}

/** Doc comment attached to a declaration (php-parser puts it on the node or its first attribute group). */
export function docComment(node: PhpNode): PhpNode | null {
  const pick = (comments: readonly PhpNode[] | undefined): PhpNode | null => {
    if (!comments) return null;
    for (let i = comments.length - 1; i >= 0; i--) {
      const c = comments[i];
      if (c && c.kind === 'commentblock' && String(c.value).startsWith('/**')) return c;
    }
    return null;
  };
  const own = pick(node.leadingComments);
  if (own) return own;
  const groups = node.attrGroups as readonly PhpNode[] | undefined;
  if (groups && groups.length > 0) return pick(groups[0]?.leadingComments);
  return null;
}

/** Short names of the PHP 8 attributes on a declaration. */
export function attributeNames(node: PhpNode): string[] {
  const groups = (node.attrGroups as readonly PhpNode[] | undefined) ?? [];
  const names: string[] = [];
  for (const group of groups) {
    for (const attr of (group.attrs as readonly PhpNode[] | undefined) ?? []) {
      const n = shortName(nameText(attr));
      if (n) names.push(n);
    }
  }
  return names;
}

/** String value of a string literal node, else null. */
export function stringValue(node: unknown): string | null {
  if (!isNode(node)) return null;
  if (node.kind === 'string' || node.kind === 'nowdoc') return String(node.value);
  return null;
}

export interface ClassInfo {
  readonly node: PhpNode;
  readonly name: string;
  readonly namespace: string;
  readonly extendsName: string | null;
  readonly implementsNames: readonly string[];
  readonly methods: readonly PhpNode[];
}

/** Classes in the file with their namespace (traits, interfaces and enums are not included). */
export function classesIn(program: PhpNode): ClassInfo[] {
  const out: ClassInfo[] = [];
  walk(program, (node, ancestors) => {
    if (node.kind !== 'class' || node.isAnonymous) return;
    const ns = [...ancestors].reverse().find((a) => a.kind === 'namespace');
    const body = (node.body as readonly PhpNode[] | undefined) ?? [];
    out.push({
      node,
      name: nameText(node.name) ?? '',
      namespace: ns ? String(ns.name ?? '') : '',
      extendsName: shortName(nameText(node.extends)),
      implementsNames: ((node.implements as readonly PhpNode[] | null) ?? [])
        .map((i) => shortName(nameText(i)))
        .filter((n): n is string => Boolean(n)),
      methods: body.filter((m) => m.kind === 'method'),
    });
  });
  return out;
}

/** Top-level (non-class) function declarations. */
export function functionsIn(program: PhpNode): PhpNode[] {
  const out: PhpNode[] = [];
  walk(program, (node) => {
    if (node.kind === 'class' || node.kind === 'trait' || node.kind === 'interface' || node.kind === 'enum') return false;
    if (node.kind === 'function') out.push(node);
  });
  return out;
}

/** Name of a global function call (`foo()` or `\foo()`), else null. */
export function calledFunctionName(node: PhpNode): string | null {
  if (node.kind !== 'call') return null;
  const what = node.what as PhpNode | undefined;
  if (!what || what.kind !== 'name') return null;
  const name = String(what.name);
  return name.startsWith('\\') ? name.slice(1) : name;
}

/** For `\Drupal::foo()` returns `foo`, else null. */
export function drupalStaticMethod(node: PhpNode): string | null {
  if (node.kind !== 'call') return null;
  const what = node.what as PhpNode | undefined;
  if (!what || what.kind !== 'staticlookup') return null;
  const target = nameText(what.what);
  if (target !== '\\Drupal' && target !== 'Drupal') return null;
  return nameText(what.offset);
}

/** Method name for `$x->foo()` / `$x?->foo()` calls, else null. */
export function calledMethodName(node: PhpNode): string | null {
  if (node.kind !== 'call') return null;
  const what = node.what as PhpNode | undefined;
  if (!what || (what.kind !== 'propertylookup' && what.kind !== 'nullsafepropertylookup' && what.kind !== 'staticlookup')) return null;
  return nameText(what.offset);
}

/** Source text of a node. */
export function sourceOf(node: PhpNode, source: string): string {
  const loc = node.loc;
  if (!loc) return '';
  return source.slice(loc.start.offset, loc.end.offset);
}

/** Enclosing function or method of the innermost ancestor list. */
export function enclosingFunction(ancestors: readonly PhpNode[]): PhpNode | null {
  for (let i = ancestors.length - 1; i >= 0; i--) {
    const a = ancestors[i];
    if (a && (a.kind === 'method' || a.kind === 'function' || a.kind === 'closure' || a.kind === 'arrowfunc')) return a;
  }
  return null;
}

/**
 * True when the node sits inside an `if (function_exists('name'))` block, the
 * usual guard for code that still supports an old core version.
 */
export function isGuardedByFunctionExists(ancestors: readonly PhpNode[], fnName: string): boolean {
  for (const a of ancestors) {
    if (a.kind !== 'if') continue;
    let guarded = false;
    walk(a.test as PhpNode, (n) => {
      if (calledFunctionName(n) === 'function_exists') {
        const arg = ((n.arguments as readonly PhpNode[]) ?? [])[0];
        if (stringValue(arg)?.replace(/^\\/, '').toLowerCase() === fnName.toLowerCase()) guarded = true;
      }
    });
    if (guarded) return true;
  }
  return false;
}
