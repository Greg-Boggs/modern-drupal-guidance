import type { PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import { attributeNames, classesIn, docComment, lineOf } from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

/**
 * Core plugin annotations that have an attribute class in Drupal 11.4 core,
 * mapped annotation name -> attribute name. Built by listing
 * `@Annotation` classes in Annotation directories and attribute classes in
 * Attribute directories under core/lib and core/modules. Annotations without an
 * attribute (Translation, PluralTranslation, ContextDefinition) are
 * nested values, not plugin definitions, and are not listed.
 */
export const ANNOTATION_TO_ATTRIBUTE: ReadonlyMap<string, string> = new Map([
  ['Action', 'Action'],
  ['Archiver', 'Archiver'],
  ['Block', 'Block'],
  ['CKEditor5Plugin', 'CKEditor5Plugin'],
  ['Condition', 'Condition'],
  ['ConfigEntityType', 'ConfigEntityType'],
  ['Constraint', 'Constraint'],
  ['ContentEntityType', 'ContentEntityType'],
  ['DataType', 'DataType'],
  ['DisplayVariant', 'DisplayVariant'],
  ['Editor', 'Editor'],
  ['EntityReferenceSelection', 'EntityReferenceSelection'],
  ['EntityType', 'EntityType'],
  ['FieldFormatter', 'FieldFormatter'],
  ['FieldType', 'FieldType'],
  ['FieldWidget', 'FieldWidget'],
  ['Filter', 'Filter'],
  ['FormElement', 'FormElement'],
  ['HelpSection', 'HelpSection'],
  ['ImageEffect', 'ImageEffect'],
  ['ImageToolkit', 'ImageToolkit'],
  ['ImageToolkitOperation', 'ImageToolkitOperation'],
  ['LanguageNegotiation', 'LanguageNegotiation'],
  ['Layout', 'Layout'],
  ['Mail', 'Mail'],
  ['MediaSource', 'MediaSource'],
  ['MigrateDestination', 'MigrateDestination'],
  ['MigrateField', 'MigrateField'],
  ['MigrateProcessPlugin', 'MigrateProcess'],
  ['MigrateSource', 'MigrateSource'],
  ['PageDisplayVariant', 'PageDisplayVariant'],
  ['RenderElement', 'RenderElement'],
  ['RestResource', 'RestResource'],
  ['SearchPlugin', 'Search'],
  ['SectionStorage', 'SectionStorage'],
  ['ViewsAccess', 'ViewsAccess'],
  ['ViewsArea', 'ViewsArea'],
  ['ViewsArgument', 'ViewsArgument'],
  ['ViewsArgumentDefault', 'ViewsArgumentDefault'],
  ['ViewsArgumentValidator', 'ViewsArgumentValidator'],
  ['ViewsCache', 'ViewsCache'],
  ['ViewsDisplay', 'ViewsDisplay'],
  ['ViewsDisplayExtender', 'ViewsDisplayExtender'],
  ['ViewsExposedForm', 'ViewsExposedForm'],
  ['ViewsField', 'ViewsField'],
  ['ViewsFilter', 'ViewsFilter'],
  ['ViewsJoin', 'ViewsJoin'],
  ['ViewsPager', 'ViewsPager'],
  ['ViewsQuery', 'ViewsQuery'],
  ['ViewsRelationship', 'ViewsRelationship'],
  ['ViewsRow', 'ViewsRow'],
  ['ViewsSort', 'ViewsSort'],
  ['ViewsStyle', 'ViewsStyle'],
  ['ViewsWizard', 'ViewsWizard'],
  ['WorkflowType', 'WorkflowType'],
  ['QueueWorker', 'QueueWorker'],
]);

const ANNOTATION_LINE = /^\s*\*?\s*@([A-Z][A-Za-z0-9]*)\s*\(/;

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: [[...ANNOTATION_TO_ATTRIBUTE.keys()].map((name) => `@${name}(`)],
  matchFile(program): ScanMatch[] {
    const matches: ScanMatch[] = [];
    for (const cls of classesIn(program)) {
      const doc = docComment(cls.node);
      if (!doc) continue;
      const attrs = new Set(attributeNames(cls.node));
      const docLines = String(doc.value).split('\n');
      for (let i = 0; i < docLines.length; i++) {
        const m = ANNOTATION_LINE.exec(docLines[i] ?? '');
        if (!m || !m[1]) continue;
        const attribute = ANNOTATION_TO_ATTRIBUTE.get(m[1]);
        if (!attribute) continue;
        // Both present: deliberate dual definition for older core.
        if (attrs.has(attribute)) break;
        matches.push({
          line: lineOf(doc) + i,
          subPattern: m[1],
          message: `@${m[1]} annotation on ${cls.name}; use the #[${attribute}(...)] PHP attribute (Drupal\\…\\Attribute\\${attribute}) instead of a Doctrine annotation in the docblock.`,
        });
        break;
      }
    }
    return matches;
  },
};

export const pluginAnnotationRule: ScanRule = {
  id: 'plugin-annotation',
  guideId: GUIDE_IDS.pluginAttributes,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    'Plugin and entity type definitions in Doctrine docblock annotations (@Block, @FieldFormatter, @ContentEntityType, …) have PHP attribute equivalents in core.',
  matcher,
  verifierRubric: {
    keepWhen: [
      'A class docblock defines a core plugin type with a Doctrine annotation such as @Block(...), @FieldFormatter(...), @QueueWorker(...) or @ContentEntityType(...).',
      'The core plugin type has an attribute class (Drupal\\Core\\Block\\Attribute\\Block and similar) in every core version the extension supports. Attribute discovery arrived in 10.2; several plugin types gained attributes in later minors.',
    ],
    dropWhen: [
      'The class already declares the matching PHP attribute, so the annotation is kept only for older core versions.',
      'The extension supports a core version where this plugin type has no attribute class yet.',
      'The annotation belongs to a contrib or custom plugin type whose manager does not yet support attribute discovery, even if it shares a short name with a core annotation.',
      'The annotation sits in a test fixture or in documentation that shows the old syntax on purpose.',
    ],
  },
};

export default [pluginAnnotationRule];
