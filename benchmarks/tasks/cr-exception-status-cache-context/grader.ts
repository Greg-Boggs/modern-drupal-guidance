import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_errhint';
const P = String.raw`$p = \Drupal::service('plugin.manager.block')->createInstance('bench_errhint', []);
$build = $p->build();
$ctx = \Drupal\Core\Cache\CacheableMetadata::createFromRenderArray($build)->merge(\Drupal\Core\Cache\CacheableMetadata::createFromObject($p))->getCacheContexts();`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('context', 'The block varies by the exception_status_code cache context.', M, P + String.raw`
print json_encode(['pass' => in_array('exception_status_code', $ctx, TRUE), 'detail' => $ctx]);`),
    phpCheck('no-url-context', 'The block does not vary by url, url.path or route.', M, P + String.raw`
print json_encode(['pass' => !array_intersect(['url', 'url.path', 'route', 'url.query_args'], $ctx), 'detail' => $ctx]);`),
    phpCheck('placed', 'The block is placed and enabled in Olivero\'s content region.', M, String.raw`$ids = \Drupal::entityQuery('block')->accessCheck(FALSE)->condition('plugin', 'bench_errhint')->condition('theme', 'olivero')->condition('region', 'content')->condition('status', TRUE)->execute();
print json_encode((bool) $ids);`),
    {
      id: 'http', kind: 'must', text: 'An anonymous GET of a missing URL (404) shows "Try the search page." and the front page does not.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const missing = await ctx.http('/bench-no-such-page-' + Date.now());
        const front = await ctx.http('/user/login');
        return { pass: missing.status === 404 && missing.body.includes('Try the search page.') && !front.body.includes('Try the search page.'), detail: `404=${missing.status} login=${front.status}` };
      },
    },
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['context', 'no-deprecated-api']);
