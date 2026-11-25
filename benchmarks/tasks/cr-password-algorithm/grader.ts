import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { noPattern, php, practice } from '../_cr/lib.ts';

const grader: Grader = {
  checks: [
    {
      id: 'hash', kind: 'must', text: 'The password service hashes a new password with a $2y$12$ bcrypt hash, and the hash verifies.',
      run: async (ctx) => {
        const v = php(ctx, String.raw`$p = \Drupal::service('password'); $h = $p->hash('correct horse'); print json_encode([substr($h, 0, 7), $p->check('correct horse', $h)]);`);
        return { pass: v[0] === '$2y$12$' && v[1] === true, detail: JSON.stringify(v) };
      },
    },
    {
      id: 'parameters', kind: 'must', text: 'The container parameter password.algorithm is "2y" (or PASSWORD_BCRYPT) and password.options has cost 12.',
      run: async (ctx) => {
        const v = php(ctx, String.raw`$c = \Drupal::getContainer(); print json_encode([$c->hasParameter('password.algorithm') ? $c->getParameter('password.algorithm') : NULL, $c->hasParameter('password.options') ? $c->getParameter('password.options') : NULL]);`);
        return { pass: v[0] === '2y' && v[1]?.cost === 12, detail: JSON.stringify(v) };
      },
    },
    noPattern('no-service-override', 'No custom module code was written, and core\'s password service is not redefined.', 'web/modules/custom', /[\s\S]+/, /\.(php|module|yml)$/),
    {
      id: 'no-password-service', kind: 'must_not', text: 'web/sites/default/services.yml redefines the password service.',
      run: async (ctx) => !/^\s{2}password:\s*$/m.test(ctx.read('web/sites/default/services.yml')),
    },
  ],
};

export default practice(grader, ['parameters', 'no-password-service']);
