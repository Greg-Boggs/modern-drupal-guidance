/** Reusable checks for code tasks that build a custom module. */
import type { Check } from './context.ts';

export const moduleDir = (name: string) => `web/modules/custom/${name}`;

export function moduleEnabled(name: string): Check {
  return {
    id: 'module-enabled', kind: 'must', text: `Module ${name} exists in ${moduleDir(name)} and is enabled.`,
    run: async (ctx) => ({
      pass: ctx.exists(`${moduleDir(name)}/${name}.info.yml`) && ctx.moduleEnabled(name),
      detail: `info=${ctx.exists(`${moduleDir(name)}/${name}.info.yml`)} enabled=${ctx.moduleEnabled(name)}`,
    }),
  };
}

/** MUST NOT: the legacy-scan rules for a guide find nothing in the module. */
export function noLegacyFindings(name: string, guideId: string, text: string, id = 'no-legacy-pattern'): Check {
  return {
    id, kind: 'must_not', text,
    run: async (ctx) => {
      const f = ctx.legacyScan(moduleDir(name), guideId);
      return { pass: f.length === 0, detail: f.map((x) => `${x.ruleId} ${x.file}:${x.line ?? ''}`).join('; ') || undefined };
    },
  };
}

/** MUST NOT: no API listed as deprecated or removed in data/drupal/deprecations.json. */
export function noDeprecatedApis(name: string): Check {
  return {
    id: 'no-deprecated-api', kind: 'must_not', text: 'The module uses no core API that data/drupal/deprecations.json lists as deprecated or removed.',
    run: async (ctx) => {
      const f = ctx.deprecatedApis(moduleDir(name));
      return { pass: f.length === 0, detail: f.map((x) => `${x.symbol} (${x.status}) in ${x.file}`).join('; ') || undefined };
    },
  };
}
