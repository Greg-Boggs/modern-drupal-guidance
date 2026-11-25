/**
 * Guide ids the rules point to, in one place so they can be renamed when
 * guides/ lands. Each id must equal a guide's `name` (its slug).
 *
 * `guideHash` is upstream's 12-hex SHA-256 of the guide.md content. Guides do
 * not exist yet, so every rule carries PENDING_GUIDE_HASH until integration
 * computes real hashes (engine `computeGuideHash`).
 */
export const GUIDE_IDS = {
  oopHooks: 'oop-hooks',
  pluginAttributes: 'plugin-attributes',
  dependencyInjection: 'dependency-injection',
  removedApis: 'removed-procedural-apis',
  databaseApi: 'database-api',
  once: 'core-once-behaviors',
  coreVersionRequirement: 'core-version-requirement',
  cacheMetadata: 'cache-metadata',
  renderArrayXss: 'render-array-xss',
} as const;

export const PENDING_GUIDE_HASH = '000000000000';

/**
 * Newest Drupal core major that an info.yml constraint is expected to allow.
 * Wave 2: derive from data/drupal/releases.json instead of hard-coding.
 * Override with LEGACY_SCAN_CURRENT_CORE_MAJOR for testing.
 */
export const CURRENT_CORE_MAJOR = Number(process.env.LEGACY_SCAN_CURRENT_CORE_MAJOR ?? 11);
