/**
 * File dispatch: routes each file to the PHP, Twig, YAML or JS engine and
 * turns matches into upstream-shaped `ScanFinding`s.
 */
import { createHash } from 'node:crypto';
import { posix } from 'node:path';
import type {
  DrupalExtensionFileKind,
  DrupalFileContext,
  JsRuleMatcher,
  PhpRuleMatcher,
  ScanFinding,
  ScanMatch,
  ScanRule,
  TwigRuleMatcher,
  YamlRuleMatcher,
} from '../schema.ts';
import { JS_EXTENSIONS, scanJsSource } from './js.ts';
import { PHP_EXTENSIONS, scanPhpSource } from './php.ts';
import { scanTwigSource, TWIG_EXTENSIONS } from './twig.ts';
import { scanYamlSource } from './yaml.ts';

export type Engine = 'php' | 'twig' | 'yaml' | 'js';

export const YAML_EXTENSIONS: readonly string[] = ['.yml', '.yaml'];

export function engineForPath(relPath: string): Engine | null {
  const lower = relPath.toLowerCase();
  if (lower.endsWith('.min.js')) return null;
  const ext = posix.extname(lower);
  if (PHP_EXTENSIONS.includes(ext)) return 'php';
  if (TWIG_EXTENSIONS.includes(ext)) return 'twig';
  if (YAML_EXTENSIONS.includes(ext)) return 'yaml';
  if (JS_EXTENSIONS.includes(ext)) return 'js';
  return null;
}

export function fileKindOf(relPath: string): DrupalExtensionFileKind {
  const ext = posix.extname(relPath.toLowerCase());
  switch (ext) {
    case '.module':
      return 'module';
    case '.theme':
      return 'theme';
    case '.profile':
      return 'profile';
    case '.install':
      return 'install';
    case '.inc':
      return 'inc';
    case '.php':
      return 'class';
    default:
      return 'other';
  }
}

/** `foo.module`, `foo.views.inc`, `foo.info.yml` -> `foo`. */
export function extensionNameOf(relPath: string): string | null {
  const kind = fileKindOf(relPath);
  const base = posix.basename(relPath);
  if (kind === 'class') return null;
  const dot = base.indexOf('.');
  if (dot <= 0) return null;
  const name = base.slice(0, dot);
  return /^[a-z][a-z0-9_]*$/.test(name) ? name : null;
}

export function drupalContextFor(relPath: string, content: string): DrupalFileContext {
  return {
    filePath: relPath,
    fileContent: content,
    extensionName: extensionNameOf(relPath),
    fileKind: fileKindOf(relPath),
  };
}

const CARD_ID_HEX_LENGTH = 12;
const CODE_SNIPPET_RADIUS = 15;

/** Same formula as upstream `computeCardId`. */
export function computeCardId(repo: string, commit: string, guideId: string, file: string, line: number): string {
  return createHash('sha256')
    .update(`${repo}:${commit}:${guideId}:${file}:${line}`)
    .digest('hex')
    .slice(0, CARD_ID_HEX_LENGTH);
}

function numberedSlice(lines: readonly string[], target: number, radius: number): string {
  const start = Math.max(1, target - radius);
  const end = Math.min(lines.length, target + radius);
  const out: string[] = [];
  for (let n = start; n <= end; n++) {
    out.push(`${n === target ? '> ' : '  '}${String(n).padStart(4, ' ')} | ${lines[n - 1] ?? ''}`);
  }
  return out.join('\n');
}

export interface ScanStats {
  scannedFileCount?: number;
  eligibleFileCount?: number;
  skippedDocsAndTestsCount?: number;
  truncatedByMaxFiles?: boolean;
  parseErrors?: { file: string; message: string }[];
}

export interface ScanFilesOptions {
  readonly repo?: string;
  readonly commit?: string;
  readonly stats?: ScanStats;
}

interface RuleBundle {
  readonly php: (ScanRule & { matcher: PhpRuleMatcher })[];
  readonly twig: (ScanRule & { matcher: TwigRuleMatcher })[];
  readonly yaml: (ScanRule & { matcher: YamlRuleMatcher })[];
  readonly js: (ScanRule & { matcher: JsRuleMatcher })[];
}

function bundle(rules: readonly ScanRule[]): RuleBundle {
  const b: RuleBundle = { php: [], twig: [], yaml: [], js: [] };
  for (const rule of rules) {
    (b[rule.matcher.kind] as ScanRule[]).push(rule);
  }
  return b;
}

/** Scans in-memory files (relative path -> content). */
export function scanFiles(
  files: ReadonlyMap<string, string>,
  rules: readonly ScanRule[],
  options: ScanFilesOptions = {},
): ScanFinding[] {
  const repo = options.repo ?? '';
  const commit = options.commit ?? '';
  const stats = options.stats;
  const rulesByEngine = bundle(rules);
  const findings: ScanFinding[] = [];

  for (const [relPath, content] of files) {
    const engine = engineForPath(relPath);
    if (!engine) continue;
    const engineRules = rulesByEngine[engine] as ScanRule[];
    if (engineRules.length === 0) continue;
    const ctx = drupalContextFor(relPath, content);
    let perRule: ScanMatch[][];
    try {
      switch (engine) {
        case 'php':
          perRule = scanPhpSource(content, rulesByEngine.php.map((r) => r.matcher), ctx);
          break;
        case 'twig':
          perRule = scanTwigSource(content, rulesByEngine.twig.map((r) => r.matcher), ctx);
          break;
        case 'yaml':
          perRule = scanYamlSource(content, rulesByEngine.yaml.map((r) => r.matcher), ctx);
          break;
        case 'js':
          perRule = scanJsSource(content, rulesByEngine.js.map((r) => r.matcher), ctx);
          break;
      }
    } catch (error) {
      if (stats) (stats.parseErrors ??= []).push({ file: relPath, message: (error as Error).message });
      continue;
    }

    const lines = content.split(/\r?\n/);
    perRule.forEach((matches, i) => {
      const rule = engineRules[i];
      if (!rule) return;
      const seen = new Set<number>();
      for (const match of matches) {
        if (seen.has(match.line)) continue;
        seen.add(match.line);
        const snippet = numberedSlice(lines, match.line, CODE_SNIPPET_RADIUS);
        findings.push({
          cardId: computeCardId(repo, commit, rule.guideId, relPath, match.line),
          ruleId: rule.id,
          guideId: rule.guideId,
          guideHash: rule.guideHash,
          repo,
          commit,
          file: relPath,
          line: match.line,
          message: match.message,
          codeSnippet: snippet,
          contextSlice: snippet,
          lineContent: (lines[match.line - 1] ?? '').trim(),
          ...(match.isVendoredLibrary ? { isVendoredLibrary: true } : {}),
          ...(match.subPattern ? { subPattern: match.subPattern } : {}),
        });
      }
    });
  }
  return findings;
}

/** Convenience for tests: scan one file with one or more rules. */
export function scanSource(relPath: string, content: string, rules: readonly ScanRule[]): ScanFinding[] {
  return scanFiles(new Map([[relPath, content]]), rules);
}
