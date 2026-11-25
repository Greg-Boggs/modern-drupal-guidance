import type { ScanRule } from '../schema.ts';
import cacheMetadata from './cache-metadata.ts';
import coreVersionRequirement from './core-version-requirement.ts';
import databaseApi from './database-api.ts';
import dependencyInjection from './dependency-injection.ts';
import once from './once.ts';
import oopHooks from './oop-hooks.ts';
import pluginAttributes from './plugin-attributes.ts';
import removedApis from './removed-apis.ts';
import renderArrayXss from './render-array-xss.ts';

/** One module per guide, as in upstream rules/index.ts. */
export const RULE_MODULES: readonly (readonly ScanRule[])[] = [
  cacheMetadata,
  coreVersionRequirement,
  databaseApi,
  dependencyInjection,
  once,
  oopHooks,
  pluginAttributes,
  removedApis,
  renderArrayXss,
];

/**
 * Every Drupal rule. None has been through held-out qualification yet, so
 * on integration these belong in the engine's experimental tier, not
 * QUALIFIED_RULES (see DESIGN.md).
 */
export const DRUPAL_RULES: readonly ScanRule[] = RULE_MODULES.flat();

export const DRUPAL_GUIDE_IDS: readonly string[] = [...new Set(DRUPAL_RULES.map((r) => r.guideId))].sort();
