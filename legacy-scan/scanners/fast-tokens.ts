import type { FastTokenSpec } from '../schema.ts';

/** Same semantics as upstream `matchesFastTokens` in scanners/js-scanner.ts. */
export function normalizeFastTokenGroups(fastTokens?: FastTokenSpec): (readonly string[])[] {
  if (!fastTokens || fastTokens.length === 0) return [];
  if (typeof fastTokens[0] === 'string') return [fastTokens as readonly string[]];
  return (fastTokens as readonly (readonly string[])[]).filter((group) => group.length > 0);
}

export function matchesFastTokens(content: string, fastTokens?: FastTokenSpec): boolean {
  return normalizeFastTokenGroups(fastTokens).every((group) =>
    group.some((token) => content.includes(token)),
  );
}
