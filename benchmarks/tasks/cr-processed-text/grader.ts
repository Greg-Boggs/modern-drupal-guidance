import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_text';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('filters', 'Rendering format() of "<p><strong>Hi</strong><script>x()</script></p>" keeps <strong>, drops <script>, and carries the config:filter.format.basic_html cache tag.', M, String.raw`$b = \Drupal::service('bench_text.formatter')->format('<p><strong>Hi</strong><script>x()</script></p>');
$html = (string) \Drupal::service('renderer')->renderInIsolation($b);
$tags = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($b)->getCacheTags();
print json_encode(['pass' => is_array($b) && str_contains($html, '<strong>Hi</strong>') && !str_contains($html, '<script') && in_array('config:filter.format.basic_html', $tags), 'detail' => [$html, $tags]]);`),
    noPattern('no-legacy-api', 'The module does not call check_markup().', mod(M), /\bcheck_markup\s*\(/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-legacy-api', 'no-deprecated-api']);
