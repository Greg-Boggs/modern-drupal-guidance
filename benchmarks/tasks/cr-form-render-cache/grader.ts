import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { moduleEnabled, noDeprecatedApis, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_signup';
const FORM = String.raw`$route = \Drupal::service('router.route_provider')->getRouteByName(array_key_first(iterator_to_array(\Drupal::service('router.route_provider')->getRoutesByPattern('/signup'))));
$class = $route->getDefault('_form');
$form = \Drupal::formBuilder()->getForm($class);`;

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    phpCheck('form', 'The /signup route builds form bench_signup_form with an email element and a submit button.', M, FORM + String.raw`
print json_encode(['pass' => ($form['#form_id'] ?? '') === 'bench_signup_form' && ($form['email']['#type'] ?? '') === 'email', 'detail' => [$class, $form['#form_id'] ?? NULL]]);`),
    phpCheck('max-age', 'The built form carries a top-level #cache max-age of 3600 seconds.', M, FORM + String.raw`
print json_encode(['pass' => ($form['#cache']['max-age'] ?? NULL) === 3600, 'detail' => $form['#cache'] ?? NULL]);`),
    phpCheck('token-cacheable', 'For an authenticated user the CSRF token element is not forced to max-age 0.', M, String.raw`\Drupal::service('account_switcher')->switchTo(\Drupal\user\Entity\User::load(1));
` + FORM + String.raw`
print json_encode(['pass' => isset($form['form_token']) && ($form['form_token']['#cache']['max-age'] ?? NULL) !== 0, 'detail' => $form['form_token']['#cache'] ?? 'no token']);`),
    {
      id: 'page', kind: 'must', text: 'GET /signup as an anonymous visitor returns 200 with the Email field and the Sign up button.',
      run: async (ctx) => {
        if (!ctx.moduleEnabled(M)) return false;
        const r = await ctx.http('/signup');
        return { pass: r.status === 200 && r.body.includes('Email') && /value="Sign up"/.test(r.body), detail: `status ${r.status}` };
      },
    },
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['no-deprecated-api']);
