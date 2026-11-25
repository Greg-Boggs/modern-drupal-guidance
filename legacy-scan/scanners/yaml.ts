/**
 * YAML scanner: parses Drupal YAML (info, libraries, services, routing,
 * config) with the `yaml` package and keeps line numbers for every node.
 */
import { isMap, isPair, isScalar, isSeq, LineCounter, parseDocument, type Node as YamlNode } from 'yaml';
import type { ScanMatch, YamlDocumentView, YamlMatcherContext, YamlPath, YamlRuleMatcher } from '../schema.ts';
import { matchesFastTokens } from './fast-tokens.ts';

export class YamlParseError extends Error {}

export function parseYamlDocument(text: string, filePath: string): YamlDocumentView {
  const lineCounter = new LineCounter();
  const doc = parseDocument(text, { lineCounter, uniqueKeys: false, prettyErrors: false });
  if (doc.errors.length > 0) {
    throw new YamlParseError(`Failed to parse YAML in ${filePath}: ${doc.errors[0]?.message ?? 'unknown error'}`);
  }
  const lineAt = (offset: number | undefined): number | null =>
    offset === undefined ? null : lineCounter.linePos(offset).line;

  const resolve = (path: YamlPath): { key: YamlNode | null; value: YamlNode | null } | null => {
    let current: unknown = doc.contents;
    let keyNode: YamlNode | null = null;
    for (const segment of path) {
      if (isMap(current)) {
        const pair = current.items.find((p) => isScalar(p.key) && String(p.key.value) === String(segment));
        if (!pair) return null;
        keyNode = pair.key as YamlNode;
        current = pair.value;
      } else if (isSeq(current) && typeof segment === 'number') {
        current = current.items[segment];
        keyNode = null;
        if (current === undefined) return null;
      } else {
        return null;
      }
    }
    return { key: keyNode, value: (current as YamlNode | null) ?? null };
  };

  return {
    data: doc.contents ? doc.toJS() : null,
    lineOf(path) {
      const hit = resolve(path);
      if (!hit) return null;
      return lineAt(hit.value?.range?.[0]) ?? lineAt(hit.key?.range?.[0]);
    },
    keyLineOf(path) {
      const hit = resolve(path);
      if (!hit) return null;
      return lineAt(hit.key?.range?.[0]) ?? lineAt(hit.value?.range?.[0]);
    },
    scalars() {
      const out: { path: YamlPath; value: unknown; line: number }[] = [];
      const visit = (node: unknown, path: (string | number)[]): void => {
        if (isScalar(node)) {
          out.push({ path, value: node.value, line: lineAt(node.range?.[0]) ?? 1 });
        } else if (isMap(node)) {
          for (const pair of node.items) {
            if (!isPair(pair)) continue;
            const key = isScalar(pair.key) ? String(pair.key.value) : String(pair.key);
            visit(pair.value, [...path, key]);
          }
        } else if (isSeq(node)) {
          node.items.forEach((item, i) => visit(item, [...path, i]));
        }
      };
      visit(doc.contents, []);
      return out;
    },
  };
}

export function yamlMatcherApplies(matcher: YamlRuleMatcher, filePath: string): boolean {
  const lower = filePath.toLowerCase();
  return matcher.fileSuffixes.some((suffix) => lower.endsWith(suffix));
}

export function scanYamlSource(
  text: string,
  matchers: readonly YamlRuleMatcher[],
  ctx: YamlMatcherContext,
): ScanMatch[][] {
  const active = matchers.map(
    (m) => yamlMatcherApplies(m, ctx.filePath) && matchesFastTokens(text, m.fastTokens),
  );
  if (!active.some(Boolean)) return matchers.map(() => []);
  const doc = parseYamlDocument(text, ctx.filePath);
  return matchers.map((m, i) => (active[i] ? m.matchDocument(doc, ctx) : []));
}
