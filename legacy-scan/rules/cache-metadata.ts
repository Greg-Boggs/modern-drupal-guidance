import type { PhpNode, PhpRuleMatcher, ScanMatch, ScanRule } from '../schema.ts';
import { classesIn, lineOf, nameText, sourceOf, walk, type ClassInfo } from '../scanners/php.ts';
import { GUIDE_IDS, PENDING_GUIDE_HASH } from './guide-ids.ts';

/**
 * Signals that the output depends on something a render cache must vary by
 * or be invalidated by. Each maps to the metadata the guide asks for.
 */
const DEPENDENCY_SIGNALS: readonly { readonly re: RegExp; readonly kind: string; readonly needs: string }[] = [
  { re: /currentUser\s*\(|current_user|->account\b|->getAccount\s*\(|\$this->currentUser\b/, kind: 'user', needs: "a 'user' or 'user.roles' cache context" },
  { re: /routeMatch|current_route_match|getRouteMatch\s*\(|->getParameter\s*\(/, kind: 'route', needs: "a 'route' or 'url.path' cache context" },
  { re: /->query->get|getCurrentRequest\s*\(|\\Drupal::request\s*\(|request_stack|\$_GET|\$_REQUEST|\$_COOKIE|\$_SESSION/, kind: 'request', needs: "'url.query_args', 'cookies:NAME' or 'session' cache contexts" },
  { re: /->getStorage\s*\(|->load\s*\(|::load\s*\(|->loadMultiple\s*\(|::loadMultiple\s*\(|->loadByProperties\s*\(|entityQuery\s*\(|->getQuery\s*\(/, kind: 'entity', needs: 'the loaded entities as cacheable dependencies (their cache tags)' },
  { re: /->config\s*\(|configFactory|config\.factory|\\Drupal::config\s*\(/, kind: 'config', needs: 'the config object as a cacheable dependency (config:NAME tag)' },
  { re: /\\Drupal::state\s*\(|->state->get\s*\(/, kind: 'state', needs: 'a max-age or custom cache tag, because state has no cache tags' },
  { re: /\btime\s*\(\s*\)|REQUEST_TIME|->getRequestTime\s*\(|->getCurrentTime\s*\(|\bdate\s*\(|new\s+\\?DateTime/, kind: 'time', needs: 'a max-age matching how long the output stays correct' },
];

/** Code that already declares or bubbles cacheability. */
const CACHEABILITY_TOKENS = /#cache|CacheableMetadata|addCacheableDependency|addCacheContexts|addCacheTags|mergeCacheMaxAge|applyTo\s*\(|#lazy_builder|#create_placeholder|setCacheMaxAge|BubbleableMetadata/;

const FORM_BUILDER_TOKENS = /getForm\s*\(|getFormObject\s*\(|formBuilder|entityFormBuilder/;

const CACHE_METHODS = new Set(['getCacheContexts', 'getCacheTags', 'getCacheMaxAge']);

function isBlockPlugin(cls: ClassInfo): boolean {
  return cls.extendsName === 'BlockBase' || /\\Plugin\\Block(\\|$)/.test(cls.namespace);
}

function isController(cls: ClassInfo): boolean {
  return cls.extendsName === 'ControllerBase' || /\\Controller(\\|$)/.test(cls.namespace);
}

/** True when the method returns an array literal with '#' keys (a render array). */
function returnsRenderArray(method: PhpNode, source: string): boolean {
  let found = false;
  walk(method, (node) => {
    if (found) return false;
    if (node.kind === 'closure' || node.kind === 'arrowfunc') return false;
    if (node.kind === 'return' && node.expr) {
      const expr = node.expr as PhpNode;
      if (expr.kind === 'array' && /['"]#[a-z_]+['"]\s*=>/.test(sourceOf(expr, source))) found = true;
      // `return $build;` where $build is assigned a render array in the method.
      if (expr.kind === 'variable') {
        const body = sourceOf(method, source);
        const v = `\\$${String(expr.name)}\\b`;
        const assignedArray = new RegExp(`${v}(\\s*\\[[^\\]]*\\])*\\s*=\\s*(\\[|array\\()`).test(body);
        const hashKeys = /['"]#[a-z_]+['"]\s*(=>|\])/.test(body);
        if (assignedArray && hashKeys) found = true;
      }
    }
  });
  return found;
}

const matcher: PhpRuleMatcher = {
  kind: 'php',
  fastTokens: [['BlockBase', 'Plugin\\Block', 'ControllerBase', '\\Controller']],
  matchFile(program, ctx): ScanMatch[] {
    const source = ctx.fileContent;
    const matches: ScanMatch[] = [];
    for (const cls of classesIn(program)) {
      const block = isBlockPlugin(cls);
      const controller = !block && isController(cls);
      if (!block && !controller) continue;
      if (cls.methods.some((m) => CACHE_METHODS.has(nameText(m.name) ?? ''))) continue;
      for (const method of cls.methods) {
        if (method.isStatic || method.visibility === 'private') continue;
        const methodName = nameText(method.name) ?? '';
        if (block && methodName !== 'build') continue;
        if (controller && (methodName.startsWith('__') || methodName === 'create')) continue;
        const body = sourceOf(method, source);
        if (CACHEABILITY_TOKENS.test(body)) continue;
        // Forms carry their own cacheability (max-age 0 when they hold user input).
        if (controller && FORM_BUILDER_TOKENS.test(body)) continue;
        if (!returnsRenderArray(method, source)) continue;
        const signals = DEPENDENCY_SIGNALS.filter((s) => s.re.test(body));
        // Controllers vary by route already (dynamic page cache keys on the route).
        const relevant = controller ? signals.filter((s) => s.kind !== 'route') : signals;
        if (relevant.length === 0) continue;
        const what = block ? `Block ${cls.name}::build()` : `Controller ${cls.name}::${methodName}()`;
        matches.push({
          line: lineOf(method.name as PhpNode),
          subPattern: `${block ? 'block' : 'controller'}:${relevant.map((s) => s.kind).join('+')}`,
          message: `${what} returns a render array built from ${relevant.map((s) => s.kind).join(', ')} data with no cache metadata; add #cache with ${relevant.map((s) => s.needs).join('; ')}, or the cached output will be stale or shown to the wrong users.`,
        });
      }
    }
    return matches;
  },
};

export const renderArrayCacheMetadataRule: ScanRule = {
  id: 'render-array-without-cache-metadata',
  guideId: GUIDE_IDS.cacheMetadata,
  guideHash: PENDING_GUIDE_HASH,
  summary:
    'Block build() methods and controller render arrays that read the current user, route, request, entities, config, state or time must declare #cache contexts, tags or max-age.',
  matcher,
  verifierRubric: {
    keepWhen: [
      'A block plugin build() method or a controller method returns a render array whose content depends on the current user, route parameters, query string, loaded entities, config, state or the current time.',
      'Neither the render array (#cache), the class (getCacheContexts/getCacheTags/getCacheMaxAge overrides), nor a CacheableMetadata::applyTo() / addCacheableDependency() call declares that dependency.',
      'The output is render-cached (blocks are by default) or served through the page caches, so the missing metadata makes it stale or leaks it across users.',
    ],
    dropWhen: [
      'The dependency is declared elsewhere: a parent class getCacheContexts()/getCacheTags(), a #lazy_builder or #pre_render callback, or metadata added by a helper method the matcher did not follow.',
      'The data read does not change the output (for example an access check that already returns AccessResult with cacheability, or a config value used only for logging).',
      'The render array sets #cache max-age 0 in a nested element, or the route is marked no_cache / the response is not cacheable.',
      'The dependency is already covered by a required cache context (languages:language_interface, theme, user.permissions) or by the entity rendered through a view builder, which adds its own tags.',
    ],
  },
};

export default [renderArrayCacheMetadataRule];
