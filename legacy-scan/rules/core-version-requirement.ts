import type { ScanMatch, ScanRule, YamlRuleMatcher } from '../schema.ts';
import { allowsMajor } from './constraint.ts';
import { CURRENT_CORE_MAJOR, GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

const EXTENSION_TYPES = new Set(['module', 'theme', 'profile']);

const matcher: YamlRuleMatcher = {
  kind: 'yaml',
  fileSuffixes: ['.info.yml'],
  matchDocument(doc, ctx): ScanMatch[] {
    const data = doc.data as Record<string, unknown> | null;
    if (!data || typeof data !== 'object' || Array.isArray(data)) return [];
    if (!EXTENSION_TYPES.has(String(data.type))) return [];
    // Core extensions (`version: VERSION`) and `package: Testing` modules are
    // exempt from core_version_requirement (InfoParserDynamic::parse()).
    if (data.version === 'VERSION' || data.package === 'Testing') return [];

    const name = ctx.extensionName ?? 'extension';
    const requirement = data.core_version_requirement;
    if (requirement === undefined || requirement === null || String(requirement).trim() === '') {
      const coreLine = doc.keyLineOf(['core']);
      const legacy = data.core !== undefined ? ` (the legacy \`core: ${String(data.core)}\` key is ignored by modern core)` : '';
      return [
        {
          line: coreLine ?? doc.keyLineOf(['type']) ?? 1,
          subPattern: data.core !== undefined ? 'core-key-only' : 'missing',
          message: `${name}.info.yml has no core_version_requirement${legacy}; Drupal 9+ refuses to install it. Add core_version_requirement: ^${CURRENT_CORE_MAJOR - 1} || ^${CURRENT_CORE_MAJOR} (or the range the code really supports).`,
        },
      ];
    }

    const constraint = String(requirement);
    const allowsCurrent = allowsMajor(constraint, CURRENT_CORE_MAJOR);
    const line = doc.keyLineOf(['core_version_requirement']) ?? 1;
    if (allowsCurrent === null) {
      return [
        {
          line,
          subPattern: 'unparseable',
          message: `core_version_requirement "${constraint}" is not a Composer constraint this scanner understands; check that it is valid and allows Drupal ${CURRENT_CORE_MAJOR}.`,
        },
      ];
    }
    if (!allowsCurrent) {
      return [
        {
          line,
          subPattern: 'outdated',
          message: `core_version_requirement "${constraint}" does not allow Drupal ${CURRENT_CORE_MAJOR}, the current major release; update the code and widen the constraint (for example ^${CURRENT_CORE_MAJOR - 1}.3 || ^${CURRENT_CORE_MAJOR}).`,
        },
      ];
    }
    return [];
  },
};

export const coreVersionRequirementRule: ScanRule = {
  id: 'core-version-requirement',
  guideId: GUIDE_IDS.coreVersionRequirement,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    'Module, theme and profile .info.yml files must declare a core_version_requirement that allows the current Drupal major.',
  matcher,
  verifierRubric: {
    keepWhen: [
      'A custom or contrib module, theme or profile .info.yml has no core_version_requirement key, or only the legacy `core: 8.x` key.',
      `The core_version_requirement constraint excludes the current core major (Drupal ${CURRENT_CORE_MAJOR}), for example ^8 || ^9 or ^9.5 || ^10.`,
    ],
    dropWhen: [
      'The file belongs to Drupal core (version: VERSION) or to a test module with package: Testing, which are exempt.',
      'The extension is deliberately pinned to an older major (a Drupal 9/10 maintenance branch, or a site that is not upgrading), and the constraint matches the code.',
      'The info file is a test fixture that exercises incompatible-extension handling.',
    ],
  },
};

export default [coreVersionRequirementRule];
