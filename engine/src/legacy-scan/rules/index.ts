import type { ScanRule } from '../schema.ts';

/**
 * Rule registry for `legacy-scan`.
 *
 * The upstream web-platform rules were removed with the web guides they pointed to.
 * Drupal rules (PHP, Twig, YAML, JS) are built in the project-level `legacy-scan/`
 * directory and are registered here when they are integrated into the engine.
 *
 * To register a rule module, import its default export (a `ScanRule[]`) and add it to
 * `RULE_MODULES`. Each rule's `guideId` must name a guide in the project `guides/` tree.
 */
export const RULE_MODULES: readonly (readonly ScanRule[])[] = [];

/**
 * Rules that ship in default `legacy-scan` output.
 */
export const QUALIFIED_RULES: readonly ScanRule[] = RULE_MODULES.flat();

/**
 * Alias for callers in `src/legacy-scan/eval/` that iterate over all public rules.
 */
export const ALL_RULES: readonly ScanRule[] = QUALIFIED_RULES;

/**
 * Sorted list of guide IDs that have at least one qualified rule.
 */
export const QUALIFIED_GUIDE_IDS: readonly string[] = Array.from(
  new Set(QUALIFIED_RULES.map((r) => r.guideId)),
).sort();
