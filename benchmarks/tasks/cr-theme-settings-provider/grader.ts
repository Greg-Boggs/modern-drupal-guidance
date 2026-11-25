import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_themeset';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('settings', 'setting() matches core\'s ThemeSettingsProvider for olivero and claro, including a value changed in olivero.settings.', M, String.raw`\Drupal::configFactory()->getEditable('olivero.settings')->set('features.favicon', FALSE)->save();
$p = \Drupal::service('Drupal\Core\Extension\ThemeSettingsProvider');
$r = \Drupal::service('bench_themeset.reader');
$ok = $r->setting('features.favicon', 'olivero') === FALSE && $r->setting('features.favicon', 'claro') === $p->getSetting('features.favicon', 'claro') && $r->setting('logo.use_default', 'olivero') === $p->getSetting('logo.use_default', 'olivero');
print json_encode(['pass' => $ok, 'detail' => [$r->setting('features.favicon', 'olivero'), $r->setting('features.favicon', 'claro')]]);`),
    noPattern('no-legacy-api', 'The module does not call theme_get_setting().', mod(M), /\btheme_get_setting\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
