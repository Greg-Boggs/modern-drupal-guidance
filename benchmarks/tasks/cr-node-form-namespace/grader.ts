import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_nodeform';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('handler', 'The node entity type\'s default form handler is Drupal\\bench_nodeform\\Form\\BenchNodeForm, a subclass of Drupal\\node\\Form\\NodeForm.', M, String.raw`$c = \Drupal::entityTypeManager()->getDefinition('node')->getFormClass('default');
print json_encode(['pass' => ltrim($c, '\\') === 'Drupal\bench_nodeform\Form\BenchNodeForm' && is_subclass_of($c, 'Drupal\node\Form\NodeForm'), 'detail' => $c]);`),
    phpCheck('reminder', 'Building the add form for an article as user 1 includes bench_reminder with "Remember to proofread." and core\'s title field.', M, String.raw`\Drupal::service('account_switcher')->switchTo(\Drupal\user\Entity\User::load(1));
$n = \Drupal\node\Entity\Node::create(['type' => 'article']);
$form = \Drupal::service('entity.form_builder')->getForm($n, 'default');
$html = (string) \Drupal::service('renderer')->renderInIsolation($form['bench_reminder']);
print json_encode(['pass' => str_contains($html, 'Remember to proofread.') && isset($form['title']), 'detail' => $html]);`),
    noPattern('no-old-namespace', 'The module does not reference the old Drupal\\node\\NodeForm class name.', mod(M), /Drupal\\node\\NodeForm\b/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-old-namespace', 'no-deprecated-api']);
