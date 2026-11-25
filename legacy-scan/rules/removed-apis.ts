import type { PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import {
  calledFunctionName,
  drupalStaticMethod,
  isGuardedByFunctionExists,
  lineOf,
  walk,
} from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

export interface RemovedApi {
  /** Replacement to name in the finding message. */
  readonly replacement: string;
  /** Core major that removed it, when known. */
  readonly removedIn: string;
}

/**
 * Global functions that no longer exist in Drupal 11.4 core (checked against
 * core source: no `function name(` declaration remains). `removedIn` comes
 * from data/drupal/deprecations.json; entries marked 8.0 are Drupal 7 APIs
 * that never existed in Drupal 8+ but still appear in generated code.
 * Wave 2: generate this table from data/drupal/deprecations.json.
 */
export const REMOVED_FUNCTIONS: ReadonlyMap<string, RemovedApi> = new Map([
  ['drupal_set_message', { replacement: "the messenger service: $this->messenger()->addStatus() / addError() / addWarning()", removedIn: '9.0' }],
  ['drupal_get_messages', { replacement: 'the messenger service: all() / messagesByType() / deleteAll()', removedIn: '9.0' }],
  ['entity_load', { replacement: "the entity type manager: $entityTypeManager->getStorage('TYPE')->load($id)", removedIn: '9.0' }],
  ['entity_load_multiple', { replacement: "$entityTypeManager->getStorage('TYPE')->loadMultiple($ids)", removedIn: '9.0' }],
  ['entity_load_unchanged', { replacement: "$entityTypeManager->getStorage('TYPE')->loadUnchanged($id)", removedIn: '9.0' }],
  ['entity_create', { replacement: "$entityTypeManager->getStorage('TYPE')->create($values)", removedIn: '9.0' }],
  ['entity_delete_multiple', { replacement: "$storage->delete($storage->loadMultiple($ids))", removedIn: '9.0' }],
  ['entity_revision_load', { replacement: "$storage->loadRevision($revision_id)", removedIn: '9.0' }],
  ['entity_view', { replacement: "$entityTypeManager->getViewBuilder('TYPE')->view($entity, $view_mode)", removedIn: '9.0' }],
  ['entity_view_multiple', { replacement: "$entityTypeManager->getViewBuilder('TYPE')->viewMultiple($entities, $view_mode)", removedIn: '9.0' }],
  ['entity_page_label', { replacement: '$entity->label()', removedIn: '9.0' }],
  ['entity_get_display', { replacement: "the entity_display.repository service: getViewDisplay()", removedIn: '9.0' }],
  ['entity_get_form_display', { replacement: "the entity_display.repository service: getFormDisplay()", removedIn: '9.0' }],
  ['node_load', { replacement: "Node::load() or $entityTypeManager->getStorage('node')->load()", removedIn: '9.0' }],
  ['node_load_multiple', { replacement: "$entityTypeManager->getStorage('node')->loadMultiple()", removedIn: '9.0' }],
  ['user_load', { replacement: "User::load() or $entityTypeManager->getStorage('user')->load()", removedIn: '9.0' }],
  ['user_load_multiple', { replacement: "$entityTypeManager->getStorage('user')->loadMultiple()", removedIn: '9.0' }],
  ['file_load', { replacement: "File::load() or $entityTypeManager->getStorage('file')->load()", removedIn: '9.0' }],
  ['file_load_multiple', { replacement: "$entityTypeManager->getStorage('file')->loadMultiple()", removedIn: '9.0' }],
  ['taxonomy_term_load', { replacement: "$entityTypeManager->getStorage('taxonomy_term')->load()", removedIn: '9.0' }],
  ['comment_view', { replacement: "$entityTypeManager->getViewBuilder('comment')->view()", removedIn: '9.0' }],
  ['drupal_render', { replacement: 'the renderer service: $renderer->render()', removedIn: '9.0' }],
  ['drupal_render_root', { replacement: 'the renderer service: $renderer->renderRoot()', removedIn: '9.0' }],
  ['render', { replacement: 'the renderer service: $renderer->render(), or return the render array and let the theme layer render it', removedIn: '10.0' }],
  ['format_date', { replacement: 'the date.formatter service: $dateFormatter->format()', removedIn: '9.0' }],
  ['format_size', { replacement: 'Drupal\\Core\\StringTranslation\\ByteSizeMarkup::create()', removedIn: '11.0' }],
  ['drupal_get_path', { replacement: "the extension.list.module / extension.list.theme services: getPath('NAME')", removedIn: '10.0' }],
  ['drupal_get_filename', { replacement: "the extension.list.* services: getPathname('NAME')", removedIn: '10.0' }],
  ['file_create_url', { replacement: 'the file_url_generator service: generateAbsoluteString() / generateString()', removedIn: '10.0' }],
  ['file_url_transform_relative', { replacement: 'the file_url_generator service: transformRelative()', removedIn: '10.0' }],
  ['file_save_data', { replacement: 'the file.repository service: writeData()', removedIn: '10.0' }],
  ['file_copy', { replacement: 'the file.repository service: copy()', removedIn: '10.0' }],
  ['file_move', { replacement: 'the file.repository service: move()', removedIn: '10.0' }],
  ['file_unmanaged_copy', { replacement: 'the file_system service: copy()', removedIn: '9.0' }],
  ['file_scan_directory', { replacement: 'the file_system service: scanDirectory()', removedIn: '9.0' }],
  ['file_prepare_directory', { replacement: 'the file_system service: prepareDirectory()', removedIn: '9.0' }],
  ['file_directory_temp', { replacement: 'the file_system service: getTempDirectory()', removedIn: '9.0' }],
  ['file_uri_scheme', { replacement: 'the stream_wrapper_manager service: getScheme()', removedIn: '9.0' }],
  ['file_build_uri', { replacement: "the stream wrapper default scheme from config('system.file') plus the path", removedIn: '10.0' }],
  ['file_validate_extensions', { replacement: "the file.validator service with the 'FileExtension' constraint", removedIn: '11.0' }],
  ['file_validate', { replacement: 'the file.validator service: validate()', removedIn: '11.0' }],
  ['drupal_realpath', { replacement: 'the file_system service: realpath()', removedIn: '9.0' }],
  ['drupal_basename', { replacement: 'the file_system service: basename()', removedIn: '9.0' }],
  ['drupal_dirname', { replacement: 'the file_system service: dirname()', removedIn: '9.0' }],
  ['drupal_mkdir', { replacement: 'the file_system service: mkdir()', removedIn: '9.0' }],
  ['drupal_unlink', { replacement: 'the file_system service: unlink()', removedIn: '9.0' }],
  ['drupal_rmdir', { replacement: 'the file_system service: rmdir()', removedIn: '9.0' }],
  ['user_password', { replacement: 'the password_generator service: generate()', removedIn: '10.0' }],
  ['module_load_include', { replacement: "the module_handler service: loadInclude('MODULE', 'inc', 'NAME')", removedIn: '11.0' }],
  ['watchdog_exception', { replacement: 'Drupal\\Core\\Utility\\Error::logException($logger, $exception)', removedIn: '11.0' }],
  ['system_rebuild_module_data', { replacement: 'the extension.list.module service: reset()->getList()', removedIn: '9.0' }],
  ['drupal_json_encode', { replacement: 'Drupal\\Component\\Serialization\\Json::encode()', removedIn: '8.0' }],
  ['image_style_url', { replacement: "ImageStyle::load('STYLE')->buildUrl($uri)", removedIn: '8.0' }],
  ['check_plain', { replacement: 'Drupal\\Component\\Utility\\Html::escape(), or a render array with #plain_text', removedIn: '8.0' }],
  ['drupal_add_js', { replacement: "#attached libraries declared in MODULE.libraries.yml", removedIn: '8.0' }],
  ['drupal_add_css', { replacement: "#attached libraries declared in MODULE.libraries.yml", removedIn: '8.0' }],
  ['drupal_strtolower', { replacement: 'mb_strtolower()', removedIn: '8.0' }],
]);

/** \Drupal:: static methods removed from core (also not service lookups to inject). */
export const REMOVED_DRUPAL_STATIC_METHODS: ReadonlyMap<string, RemovedApi> = new Map([
  ['entityManager', { replacement: '\\Drupal::entityTypeManager() or the specific entity service (entity_field.manager, entity_type.bundle.info, …), injected', removedIn: '9.0' }],
  ['l', { replacement: 'Link::fromTextAndUrl($text, $url)->toString()', removedIn: '9.0' }],
  ['url', { replacement: "Url::fromRoute('ROUTE', $params)->toString()", removedIn: '9.0' }],
]);

function describe(name: string, api: RemovedApi): string {
  const when = api.removedIn === '8.0' ? 'a Drupal 7 API that does not exist in Drupal 8+' : `removed in Drupal ${api.removedIn}`;
  return api.removedIn === '8.0' ? `${name}() is ${when}; use ${api.replacement}.` : `${name}() was ${when}; use ${api.replacement}.`;
}

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: [[...REMOVED_FUNCTIONS.keys(), ...[...REMOVED_DRUPAL_STATIC_METHODS.keys()].map((m) => `::${m}(`)].map((n) => n.startsWith('::') ? n : `${n}(`)],
  matchFile(program): ScanMatch[] {
    const matches: ScanMatch[] = [];
    walk(program, (node, ancestors) => {
      const fn = calledFunctionName(node);
      if (fn) {
        const api = REMOVED_FUNCTIONS.get(fn.toLowerCase());
        if (api && !isGuardedByFunctionExists(ancestors, fn)) {
          matches.push({ line: lineOf(node), subPattern: fn.toLowerCase(), message: describe(fn, api) });
        }
        return;
      }
      const staticMethod = drupalStaticMethod(node);
      if (staticMethod) {
        const api = REMOVED_DRUPAL_STATIC_METHODS.get(staticMethod);
        if (api) {
          matches.push({ line: lineOf(node), subPattern: `Drupal::${staticMethod}`, message: describe(`\\Drupal::${staticMethod}`, api) });
        }
      }
    });
    return matches;
  },
};

export const removedFunctionRule: ScanRule = {
  id: 'removed-procedural-function',
  guideId: GUIDE_IDS.removedApis,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    'Calls to procedural APIs removed from Drupal core (drupal_set_message, entity_load, drupal_get_path, file_create_url, format_size, …) that have service or class replacements.',
  matcher,
  verifierRubric: {
    keepWhen: [
      'The code calls one of the listed global functions (or \\Drupal::l / url / entityManager) and the call resolves to the removed core function.',
      'The extension targets a core version in which the function no longer exists, so the call is a fatal error or dead code.',
    ],
    dropWhen: [
      'The same file or extension declares its own function of that name (a BC shim or a contrib helper), so the call does not reach core.',
      'The call is guarded by function_exists() or a core version check that keeps a branch for older core.',
      'The call is inside a namespaced file with a `use function` import of a different function of the same short name.',
      'The file is Drupal 7 code kept for reference or a migration source, not code that runs on modern core.',
    ],
  },
};

export default [removedFunctionRule];
