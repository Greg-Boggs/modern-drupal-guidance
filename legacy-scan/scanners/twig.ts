/**
 * Twig scanner: splits a template into `{{ }}`, `{% %}` and `{# #}` tags,
 * keeping offsets and lines. It does not build a Twig AST; rules match
 * inside tag bodies, so text outside tags (HTML, prose) never matches.
 * Quoted strings inside tags may contain closing delimiters; the tokenizer
 * skips over them. `{% verbatim %}` blocks are treated as plain text.
 */
import type { ScanMatch, TwigMatcherContext, TwigRuleMatcher, TwigTag, TwigTemplateView } from '../schema.ts';
import { matchesFastTokens } from './fast-tokens.ts';

export const TWIG_EXTENSIONS: readonly string[] = ['.twig'];

function lineStarts(text: string): number[] {
  const starts = [0];
  for (let i = 0; i < text.length; i++) if (text[i] === '\n') starts.push(i + 1);
  return starts;
}

export function parseTwig(text: string): TwigTemplateView {
  const starts = lineStarts(text);
  const lineAt = (offset: number): number => {
    let lo = 0;
    let hi = starts.length - 1;
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1;
      if ((starts[mid] ?? 0) <= offset) lo = mid;
      else hi = mid - 1;
    }
    return lo + 1;
  };

  const tags: TwigTag[] = [];
  const closers: Record<string, string> = { '{{': '}}', '{%': '%}', '{#': '#}' };
  const types: Record<string, TwigTag['type']> = { '{{': 'output', '{%': 'block', '{#': 'comment' };
  let i = 0;
  let inVerbatim = false;
  while (i < text.length) {
    const open = text.indexOf('{', i);
    if (open === -1 || open + 1 >= text.length) break;
    const opener = text.slice(open, open + 2);
    const closer = closers[opener];
    if (!closer) {
      i = open + 1;
      continue;
    }
    // Find the closer, skipping quoted strings (not inside comments).
    let j = open + 2;
    let quote: string | null = null;
    let end = -1;
    while (j < text.length) {
      const ch = text[j];
      if (opener !== '{#' && quote) {
        if (ch === '\\') j++;
        else if (ch === quote) quote = null;
      } else if (opener !== '{#' && (ch === '"' || ch === "'")) {
        quote = ch;
      } else if (text.startsWith(closer, j)) {
        end = j;
        break;
      }
      j++;
    }
    if (end === -1) break;
    const inner = text.slice(open + 2, end).replace(/^-|-$/g, '').replace(/^~|~$/g, '').trim();
    const type = types[opener] ?? 'output';
    if (type === 'block' && /^endverbatim\b/.test(inner)) inVerbatim = false;
    else if (!inVerbatim) {
      tags.push({ type, inner, line: lineAt(open), offset: open });
      if (type === 'block' && /^verbatim\b/.test(inner)) inVerbatim = true;
    }
    i = end + closer.length;
  }
  return { text, tags, lineAt };
}

export function scanTwigSource(
  text: string,
  matchers: readonly TwigRuleMatcher[],
  ctx: TwigMatcherContext,
): ScanMatch[][] {
  const active = matchers.map((m) => matchesFastTokens(text, m.fastTokens));
  if (!active.some(Boolean)) return matchers.map(() => []);
  const view = parseTwig(text);
  return matchers.map((m, i) => (active[i] ? m.matchFile(view, ctx) : []));
}
