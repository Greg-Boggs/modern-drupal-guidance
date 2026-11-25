import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_tw';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('twig-call', 'An inline template "{{ badge.shout() }}" with new Badge(\'new\') renders "NEW!".', M, String.raw`$b = ['#type' => 'inline_template', '#template' => '{{ badge.shout() }}', '#context' => ['badge' => new \Drupal\bench_tw\Badge('new')]];
try { $html = (string) \Drupal::service('renderer')->renderInIsolation($b); } catch (\Throwable $e) { $html = 'error: ' . $e->getMessage(); }
print json_encode(['pass' => trim($html) === 'NEW!', 'detail' => $html]);`),
    noPattern('no-sandbox-change', 'The module changes twig.config, the sandbox policy or the allowed method settings.', mod(M), /twig_sandbox|TwigSandboxPolicy|allowed_methods|allowed_prefixes|twig\.config/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-deprecated-api']);
