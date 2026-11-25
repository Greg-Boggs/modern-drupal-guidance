import type { PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import { calledFunctionName, isGuardedByFunctionExists, lineOf, walk } from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

/**
 * Procedural database wrappers, deprecated in 8.0 and removed in 9.0 (from
 * data/drupal/deprecations.json). db_installer_object() was removed in 11.0.
 * Replacement: the `database` service (Drupal\Core\Database\Connection) and,
 * for schema changes, $connection->schema().
 */
const SCHEMA_FUNCTIONS = [
  'db_add_field', 'db_add_index', 'db_add_primary_key', 'db_add_unique_key', 'db_change_field',
  'db_create_table', 'db_drop_field', 'db_drop_index', 'db_drop_primary_key', 'db_drop_table',
  'db_drop_unique_key', 'db_field_exists', 'db_field_names', 'db_field_set_default',
  'db_field_set_no_default', 'db_find_tables', 'db_index_exists', 'db_rename_table', 'db_table_exists',
];
const QUERY_FUNCTIONS = [
  'db_query', 'db_query_range', 'db_query_temporary', 'db_select', 'db_insert', 'db_update',
  'db_delete', 'db_merge', 'db_truncate', 'db_transaction', 'db_like', 'db_escape_field',
  'db_escape_table', 'db_next_id', 'db_and', 'db_or', 'db_xor', 'db_condition', 'db_driver',
  'db_close', 'db_set_active', 'db_ignore_replica', 'db_installer_object',
];

export const DB_FUNCTIONS: ReadonlyMap<string, 'schema' | 'query'> = new Map([
  ...SCHEMA_FUNCTIONS.map((f) => [f, 'schema'] as const),
  ...QUERY_FUNCTIONS.map((f) => [f, 'query'] as const),
]);

function replacementFor(fn: string, kind: 'schema' | 'query'): string {
  if (kind === 'schema') return `$connection->schema()->${toCamel(fn.replace(/^db_/, ''))}()`;
  switch (fn) {
    case 'db_query_range':
      return '$connection->queryRange()';
    case 'db_like':
      return '$connection->escapeLike()';
    case 'db_and':
    case 'db_or':
    case 'db_xor':
    case 'db_condition':
      return '$query->andConditionGroup() / orConditionGroup()';
    case 'db_set_active':
    case 'db_ignore_replica':
    case 'db_close':
    case 'db_installer_object':
      return 'Drupal\\Core\\Database\\Database static methods or a connection injected for the target';
    default:
      return `$connection->${toCamel(fn.replace(/^db_/, ''))}()`;
  }
}

function toCamel(s: string): string {
  return s.replace(/_([a-z])/g, (_, c: string) => c.toUpperCase());
}

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: ['db_'],
  matchFile(program): ScanMatch[] {
    const matches: ScanMatch[] = [];
    walk(program, (node, ancestors) => {
      const fn = calledFunctionName(node)?.toLowerCase();
      if (!fn) return;
      const kind = DB_FUNCTIONS.get(fn);
      if (!kind || isGuardedByFunctionExists(ancestors, fn)) return;
      matches.push({
        line: lineOf(node),
        subPattern: kind,
        message: `${fn}() was removed in Drupal ${fn === 'db_installer_object' ? '11.0' : '9.0'}; inject the database service (Drupal\\Core\\Database\\Connection) and call ${replacementFor(fn, kind)}.`,
      });
    });
    return matches;
  },
};

export const dbFunctionRule: ScanRule = {
  id: 'db-procedural-function',
  guideId: GUIDE_IDS.databaseApi,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    'Procedural db_*() database wrappers (db_query, db_select, db_insert, db_add_field, …) were removed in Drupal 9; use an injected Connection service and its schema() object.',
  matcher,
  verifierRubric: {
    keepWhen: [
      'The code calls a global db_*() function from the Drupal 7/8 database API (db_query, db_select, db_insert, db_update, db_delete, db_merge, db_transaction, db_like, db_add_field, db_table_exists, …).',
      'The code is meant to run on Drupal 9 or later.',
    ],
    dropWhen: [
      'The function is a custom helper in this codebase that happens to start with db_ and is declared in the same project.',
      'The call is guarded by function_exists() for code that must still run on Drupal 8.',
      'The file is a Drupal 7 module, a migration source fixture or documentation, not code that runs on modern core.',
    ],
  },
};

export default [dbFunctionRule];
