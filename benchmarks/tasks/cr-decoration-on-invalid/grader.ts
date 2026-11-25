import type { Grader } from '../../../engine/src/grading/drupal/context.ts';
import { mod, moduleEnabled, noDeprecatedApis, noPattern, phpCheck, practice } from '../_cr/lib.ts';

const M = 'bench_decor';

const grader: Grader = {
  checks: [
    moduleEnabled(M),
    {
      id: 'definition', kind: 'must', text: 'bench_decor.services.yml defines bench_decor.ban_logger decorating ban.ip_manager with decoration_on_invalid: ignore.',
      run: async (ctx) => {
        const s = ctx.yaml(`${mod(M)}/${M}.services.yml`)?.services?.['bench_decor.ban_logger'] || {};
        return { pass: s.decorates === 'ban.ip_manager' && s.decoration_on_invalid === 'ignore', detail: JSON.stringify(s) };
      },
    },
    phpCheck('dropped', 'Without Ban installed, the container has no bench_decor.ban_logger and no ban.ip_manager service, and the site bootstraps.', M, String.raw`$c = \Drupal::getContainer();
print json_encode(['pass' => !$c->has('bench_decor.ban_logger') && !$c->has('ban.ip_manager') && !\Drupal::moduleHandler()->moduleExists('ban')]);`),
    noPattern('no-provider', 'The module adds a service provider or compiler pass.', mod(M), /ServiceProviderBase|ServiceModifierInterface|CompilerPassInterface/),
    noDeprecatedApis(M),
  ],
};

export default practice(grader, ['definition', 'no-provider', 'no-deprecated-api']);
