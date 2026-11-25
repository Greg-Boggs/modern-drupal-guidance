import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_cfgmig';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'no-migrate-drupal', kind: 'must_not', text: 'The migrate_drupal module is enabled.',
      run: async (ctx) => !ctx.moduleEnabled('migrate_drupal'),
    },
    phpCheck('source', 'Migration bench_cfgmig_types loads and its source plugin is core\'s config_entity plugin (Drupal\\migrate\\Plugin\\migrate\\source\\ConfigEntity).', M, String.raw`$m = \Drupal::service('plugin.manager.migration')->createInstance('bench_cfgmig_types');
$src = $m ? $m->getSourcePlugin() : NULL;
print json_encode(['pass' => $src instanceof \Drupal\migrate\Plugin\migrate\source\ConfigEntity, 'detail' => $src ? get_class($src) : NULL]);`),
    phpCheck('rows', 'The migration yields exactly two rows, and its process pipeline maps them to the labels Article and Basic page.', M, String.raw`$m = \Drupal::service('plugin.manager.migration')->createInstance('bench_cfgmig_types');
$exec = new \Drupal\migrate\MigrateExecutable($m);
$labels = []; foreach ($m->getSourcePlugin() as $row) { $exec->processRow($row); $labels[] = (string) $row->getDestinationProperty('label'); }
sort($labels);
print json_encode(['pass' => $labels === ['Article', 'Basic page'], 'detail' => $labels]);`),
    noPattern('no-d8-config', 'The module does not use the deprecated d8_config source plugin.', mod(M), /\bd8_config\b/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['source', 'no-d8-config', 'no-deprecated-api']);
