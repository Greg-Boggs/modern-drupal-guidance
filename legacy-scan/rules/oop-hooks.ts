import type { PhpNode, PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import { attributeNames, docComment, functionsIn, lineOf, nameText } from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

/**
 * Hooks that must stay procedural. Source: Drupal 11.4
 * HookCollectorPass::checkForProceduralOnlyHooks() ($staticDenyHooks plus
 * post_update_* and update_N).
 */
const PROCEDURAL_ONLY_HOOKS: ReadonlySet<string> = new Set([
  'hook_info',
  'install',
  'install_tasks',
  'install_tasks_alter',
  'module_implements_alter',
  'removed_post_updates',
  'requirements',
  'schema',
  'uninstall',
  'update_dependencies',
  'update_last_removed',
]);

function isProceduralOnly(hook: string): boolean {
  return PROCEDURAL_ONLY_HOOKS.has(hook) || /^(post_update_|update_\d+$)/.test(hook);
}

/**
 * Common hooks recognised by name even without an "Implements hook_X()"
 * docblock. Patterns, not a full catalogue: an unknown name with no docblock
 * is skipped, because `mymodule_some_helper()` is not a hook.
 */
const KNOWN_HOOK_PATTERNS: readonly RegExp[] = [
  /^(help|theme|cron|rebuild|toolbar|toolbar_alter|mail|mail_alter|token_info|token_info_alter|tokens|tokens_alter|page_top|page_bottom|page_attachments|page_attachments_alter|library_info_alter|library_info_build|js_alter|css_alter|js_settings_alter|js_settings_build|element_info_alter|menu_links_discovered_alter|menu_local_tasks_alter|menu_local_actions_alter|local_tasks_alter|contextual_links_alter|query_alter|query_[a-z0-9_]+_alter|file_download|file_url_alter|modules_installed|modules_uninstalled|cache_flush|entity_type_build|entity_type_alter|entity_base_field_info|entity_base_field_info_alter|entity_bundle_field_info|entity_bundle_field_info_alter|entity_bundle_info_alter|entity_extra_field_info|entity_extra_field_info_alter|entity_field_access|field_info_alter|field_formatter_info_alter|field_widget_info_alter|field_widget_single_element_form_alter|field_widget_complete_form_alter|views_data|views_data_alter|views_query_alter|views_pre_view|views_pre_build|views_post_build|views_pre_execute|views_post_execute|views_pre_render|views_post_render|user_login|user_logout|user_cancel|user_format_name_alter|node_access|node_access_records|node_grants|node_search_result|block_view_alter|block_build_alter|block_access|search_preprocess|validation_constraint_alter|config_schema_info_alter|language_switch_links_alter|ckeditor5_plugin_info_alter|editor_js_settings_alter|cron_alter|system_info_alter|form_alter|form_[a-z0-9_]+_alter|theme_suggestions_alter|theme_suggestions_[a-z0-9_]+_alter|theme_registry_alter|preprocess|preprocess_[a-z0-9_]+|entity_(presave|insert|update|delete|predelete|load|create|access|create_access|view|view_alter|build_defaults_alter|prepare_view|prepare_form|form_display_alter|view_display_alter|view_mode_alter|translation_insert|translation_delete|revision_delete|field_values_init|operation|operation_alter)|(node|user|comment|taxonomy_term|taxonomy_vocabulary|media|file|block_content|menu_link_content|path_alias|paragraph|contact_message|shortcut)_(presave|insert|update|delete|predelete|load|create|access|create_access|view|view_alter|prepare_form))$/,
];

function isKnownHookName(hook: string): boolean {
  return KNOWN_HOOK_PATTERNS.some((re) => re.test(hook));
}

/** Hook name from an "Implements hook_foo()." docblock line, if any. */
export function hookFromDocblock(doc: string): string | null {
  const m = /Implements\s+hook_([A-Za-z0-9_]+)\s*\(\)/.exec(doc);
  return m?.[1] ?? null;
}

/**
 * Procedural-only hooks that still have an OOP replacement, and are
 * deprecated without their Legacy* attribute (HookCollectorPass, 11.4).
 */
const REPLACEABLE_PROCEDURAL_HOOKS: ReadonlyMap<string, { readonly attribute: string; readonly message: string }> = new Map([
  ['requirements', {
    attribute: 'LegacyRequirementsHook',
    message: "hook_requirements() without #[LegacyRequirementsHook] is deprecated in drupal:11.3.0; move runtime and update checks to #[Hook('runtime_requirements')] / #[Hook('update_requirements')] methods and install-time checks to a class implementing InstallRequirementsInterface.",
  }],
  ['module_implements_alter', {
    attribute: 'LegacyModuleImplementsAlter',
    message: 'hook_module_implements_alter() without #[LegacyModuleImplementsAlter] is deprecated in drupal:11.2.0; order or remove implementations with #[Hook(order: ...)], #[ReorderHook] or #[RemoveHook] instead.',
  }],
]);

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: ['function '],
  matchFile(program, ctx): ScanMatch[] {
    // Hook implementations live in .module, .theme, .profile and *.inc
    // files; .install is read only for hook_requirements().
    if (!['module', 'theme', 'profile', 'inc', 'install'].includes(ctx.fileKind)) return [];
    const ext = ctx.extensionName;
    if (!ext) return [];
    const prefix = `${ext}_`;
    const matches: ScanMatch[] = [];

    for (const fn of functionsIn(program)) {
      const name = nameText(fn.name);
      if (!name || !name.startsWith(prefix)) continue;
      const doc = docComment(fn);
      const docText = doc ? String(doc.value) : '';
      const documentedHook = hookFromDocblock(docText);
      const nameHook = name.slice(prefix.length);
      // The docblock names the generic hook (hook_form_FORM_ID_alter); the
      // function name holds the concrete one.
      const attrs = attributeNames(fn);
      const replaceable = REPLACEABLE_PROCEDURAL_HOOKS.get(nameHook);
      if (replaceable) {
        if (!attrs.includes(replaceable.attribute)) {
          matches.push({ line: lineOf(fn.name as PhpNode), subPattern: nameHook.replace(/_/g, '-'), message: `${name}(): ${replaceable.message}` });
        }
        continue;
      }
      // .install files hold install-time hooks, which stay procedural.
      if (ctx.fileKind === 'install') continue;
      const isHook = documentedHook !== null || isKnownHookName(nameHook);
      if (!isHook) continue;
      if (isProceduralOnly(nameHook)) continue;
      if (documentedHook && isProceduralOnly(documentedHook)) continue;
      // #[LegacyHook] marks a BC shim that delegates to an OOP hook.
      if (attrs.includes('LegacyHook') || attrs.includes('LegacyModuleImplementsAlter') || attrs.includes('LegacyRequirementsHook')) continue;

      let subPattern = 'module-hook';
      if (/^preprocess(_|$)/.test(nameHook)) subPattern = 'preprocess';
      else if (ctx.fileKind === 'theme') subPattern = 'theme-hook';

      const where = ctx.fileKind === 'theme' ? 'theme' : 'module';
      matches.push({
        line: lineOf(fn.name as PhpNode),
        subPattern,
        message: `Procedural hook ${name}() implements hook_${documentedHook ?? nameHook}; move it to a method on a class in src/Hook/ with #[Hook('${nameHook}')] so the ${where} gets autowired services instead of \\Drupal:: calls.`,
      });
    }
    return matches;
  },
};

export const proceduralHookRule: ScanRule = {
  id: 'procedural-hook-implementation',
  guideId: GUIDE_IDS.oopHooks,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    'Procedural hook implementations in .module, .theme and .inc files can be class methods with the #[Hook] attribute (Drupal 11.1+ for module hooks).',
  matcher,
  verifierRubric: {
    keepWhen: [
      'The function is a hook implementation named <extension>_<hook>() in a .module, .theme, .profile or *.inc file, usually with an "Implements hook_X()." docblock.',
      "The extension's core_version_requirement allows only Drupal versions that support #[Hook] for this kind of hook (11.1+ for module hooks; preprocess hooks and theme hooks gained OOP support in later 11.x minors, see the guide).",
      'The hook is not in the procedural-only list (hook_install, hook_uninstall, hook_schema, hook_update_N, hook_post_update_NAME, hook_hook_info, install_tasks and the other install-time hooks).',
      'Or the function is hook_requirements() without #[LegacyRequirementsHook] (deprecated in 11.3; split into runtime_requirements / update_requirements hooks and InstallRequirementsInterface) or hook_module_implements_alter() without #[LegacyModuleImplementsAlter] (deprecated in 11.2; use Hook ordering attributes).',
    ],
    dropWhen: [
      'The function carries #[LegacyHook] (or #[LegacyModuleImplementsAlter] / #[LegacyRequirementsHook]): it is a deliberate backward-compatibility shim alongside an OOP implementation.',
      'The extension still supports a core version older than the one that added OOP support for this hook (for example core_version_requirement: ^10.3 || ^11 for a module hook); a BC shim with #[LegacyHook] is the right change there, not a removal.',
      'The function is not a hook: a callback (batch, #submit, #validate, #process, form builder, theme function, template_preprocess_*) whose name happens to start with the extension name.',
      'The hook is install-time or otherwise procedural-only (see keepWhen), or the function is an .install file hook other than hook_requirements().',
      'For hook_requirements() / hook_module_implements_alter(): the extension still supports core older than 11.3 / 11.2, so the function stays and only needs the Legacy* attribute next to the OOP replacement.',
    ],
  },
};

export default [proceduralHookRule];
