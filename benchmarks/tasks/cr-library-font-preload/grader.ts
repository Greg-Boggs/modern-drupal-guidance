import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noLegacyFindings, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_fonts';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('library', 'The library bench_fonts/typography declares fonts/inter.woff2 with preload enabled.', M, String.raw`\Drupal::service('library.discovery')->clear();
$l = \Drupal::service('library.discovery')->getLibraryByName('bench_fonts', 'typography');
$f = array_filter($l['fonts'] ?? [], fn ($x) => str_ends_with($x['data'] ?? '', 'fonts/inter.woff2'));
print json_encode(['pass' => (bool) $f, 'detail' => $l['fonts'] ?? NULL]);`),
    {
      id: 'preload-link', kind: 'must', text: 'The front page head has <link rel="preload" ... as="font"> for inter.woff2.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/user/login');
        const head = r.body.split('</head>')[0];
        const link = (head.match(/<link[^>]*inter\.woff2[^>]*>/) || [''])[0];
        return { pass: /rel="preload"/.test(link) && /as="font"/.test(link), detail: link || 'no link' };
      },
    },
    noPattern('no-manual-head', 'The module does not add the preload link by hand (html_head attachments or a rel="preload" string in code or templates).', mod(M), /html_head|rel=["']preload/),
    noLegacyFindings(M, 'oop-hooks', 'No procedural hook implementations (legacy-scan oop-hooks rules).'),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['library', 'no-manual-head', 'no-legacy-pattern', 'no-deprecated-api']);
