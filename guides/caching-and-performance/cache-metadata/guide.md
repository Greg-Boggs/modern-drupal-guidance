---
name: cache-metadata
description: Add cache tags, cache contexts and max-age to Drupal render arrays, blocks, access results and responses so output is cached correctly and invalidated when its data changes, instead of disabling caching.
drupal-core: ">=10.3"
replaces:
  - "'#cache' => ['max-age' => 0] to make dynamic output work"
  - "\\Drupal::service('page_cache_kill_switch')->trigger() as a default"
  - "Rendering entities or config without adding them as cacheable dependencies"
  - "drupal_flush_all_caches() or cache_clear_all() after saving data"
  - "Returning a plain JsonResponse from data that should be cached"
---

# Add cache tags, contexts and max-age to output

Drupal caches rendered output at several levels: the render cache for each element, Dynamic Page Cache for the page minus personalized parts, and Internal Page Cache for whole pages served to anonymous users. Each piece of output must say three things about itself:

- **Tags**: which data it was built from, so it is invalidated when that data changes (`node:5`, `config:system.site`, `node_list`).
- **Contexts**: which request variations change it, so each variation is cached separately (`user.permissions`, `url.query_args:page`, `languages:language_interface`).
- **Max-age**: how many seconds it stays valid when nothing invalidates it. `Cache::PERMANENT` (-1) is the default and the right value for almost everything.

This metadata bubbles from child elements up to the page. Missing metadata causes stale or leaked output, such as one user's name shown to another. Setting `max-age` to 0 to "fix" that disables caching for the whole page and is the wrong fix. Add the tags and contexts the output depends on.

{{ DRUPAL_STATUS() }}

{# Verified at 10.3.0 and 11.4.0: Drupal\Core\Cache\CacheableMetadata, Cache::mergeTags/mergeContexts/mergeMaxAges, CacheableResponse, CacheableJsonResponse, RendererInterface::addCacheableDependency, AccessResult cachePerPermissions/cachePerUser/addCacheableDependency. Bundle list tag "<entity_type>_list:<bundle>" added by EntityBase::getListCacheTagsToInvalidate() at 10.6.0; EntityTypeInterface::getBundleListCacheTags() at 11.2.0, not 11.1.0. Page cache ignores max-age: comment in core/modules/page_cache/src/StackMiddleware/PageCache.php at 11.4.0 (issue https://www.drupal.org/node/2352009). http.response.debug_cacheability_headers in core/assets/scaffold/files/default.services.yml at 11.4.0. #}

For output that is expensive or highly personalized, also render it lazily; see {{ GUIDE_REF("lazy-builders") }}.

## Implementation

### 1. Add metadata to every render array built from data

Whenever a render array uses an entity, a config object or the current user, add that object as a cacheable dependency. `CacheableMetadata` reads the object's own tags, contexts and max-age, so you do not have to know them.

```php
<?php
// src/Controller/LatestController.php

declare(strict_types=1);

namespace Drupal\mymodule\Controller;

use Drupal\Core\Cache\CacheableMetadata;
use Drupal\Core\Controller\ControllerBase;

/**
 * Lists the five newest article titles.
 */
class LatestController extends ControllerBase {

  /**
   * Builds the list.
   */
  public function list(): array {
    // ControllerBase::entityTypeManager() returns the injected-on-demand
    // service; injecting EntityTypeManagerInterface under another property
    // name works equally well.
    $storage = $this->entityTypeManager()->getStorage('node');
    $ids = $storage->getQuery()
      ->accessCheck(TRUE)
      ->condition('type', 'article')
      ->condition('status', 1)
      ->sort('created', 'DESC')
      ->range(0, 5)
      ->execute();

    $build = ['#theme' => 'item_list', '#items' => []];
    $cacheability = new CacheableMetadata();
    // A new or deleted article changes which five appear. "node_list:article"
    // is invalidated whenever any article is saved or deleted.
    $cacheability->addCacheTags(['node_list:article']);
    // Access checks depend on the user's permissions.
    $cacheability->addCacheContexts(['user.permissions']);

    foreach ($storage->loadMultiple($ids) as $node) {
      $build['#items'][] = $node->label();
      // Adds node:<id> so editing a title invalidates the list.
      $cacheability->addCacheableDependency($node);
    }

    $cacheability->applyTo($build);
    return $build;
  }

}
```

`addCacheableDependency()` accepts entities, config objects, access results and anything implementing `CacheableDependencyInterface`. Given something that is not cacheable, it sets max-age to 0, which is the correct, conservative result.

Inside a service that receives the renderer, `$renderer->addCacheableDependency($build, $object)` does the same in one call.

### 2. Choose tags

| Output depends on | Tag |
|---|---|
| One entity | Add the entity as a dependency (gives `node:5`, `user:3`, ...) |
| One config object | Add the config object as a dependency (gives `config:system.site`) |
| "Any entity of this type" (a list, a count) | `node_list`, `user_list`, `taxonomy_term_list`, ... |
| "Any entity of this bundle" | `node_list:article` |
| Your own data in a custom table | A tag you define, such as `mymodule_feed`, invalidated when the data changes |

Invalidate custom tags when your data changes, with the injected `cache_tags.invalidator` service (`CacheTagsInvalidatorInterface`):

```php
// In a service with CacheTagsInvalidatorInterface $cacheTagsInvalidator injected.
$this->cacheTagsInvalidator->invalidateTags(['mymodule_feed']);
```

### 3. Choose contexts: the narrowest that is correct

Prefer the context with the fewest variations that still describes the dependency. Each variation is a separate cache entry.

| Output varies by | Context | Notes |
|---|---|---|
| What the user is allowed to see | `user.permissions` | One entry per permission set, shared by all users with the same roles. |
| Role membership | `user.roles` or `user.roles:editor` | |
| Who the user is (name, own content) | `user` | One entry per user. Use only for truly personal output. |
| Logged in or not | `user.roles:authenticated` | |
| A query string parameter | `url.query_args:page` | Name the parameter; `url.query_args` alone varies by every parameter. |
| The path or route | `url.path` or `route` | |
| Interface language | `languages:language_interface` | Usually already present on the page. |
| Theme | `theme` | |
| Time zone | `timezone` | |

### 4. Blocks: merge with the parent's metadata

Block plugins report their own cacheability through methods. Merge with the parent's values instead of replacing them.

```php
<?php
// src/Plugin/Block/SiteSloganBlock.php

declare(strict_types=1);

namespace Drupal\mymodule\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Cache\Cache;
use Drupal\Core\StringTranslation\TranslatableMarkup;

/**
 * Shows the site slogan and the visitor's name.
 */
#[Block(
  id: 'mymodule_site_slogan',
  admin_label: new TranslatableMarkup('Site slogan'),
)]
class SiteSloganBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    // Metadata can also go directly on the render array; both are merged.
    return ['#markup' => $this->t('Welcome')];
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheTags(): array {
    return Cache::mergeTags(parent::getCacheTags(), ['config:system.site']);
  }

  /**
   * {@inheritdoc}
   */
  public function getCacheContexts(): array {
    return Cache::mergeContexts(parent::getCacheContexts(), ['user.roles:authenticated']);
  }

}
```

### 5. Access results carry metadata too

An access result is cached with the route or element it protects. Say what the decision depended on.

```php
use Drupal\Core\Access\AccessResult;

// Depends on the user's permissions and on the entity's published state.
return AccessResult::allowedIf($node->isPublished())
  ->andIf(AccessResult::allowedIfHasPermission($account, 'access content'))
  ->addCacheableDependency($node);
```

`allowedIfHasPermission()` adds the `user.permissions` context by itself. When a decision depends on the user's identity, add `->cachePerUser()`.

### 6. Responses that are not render arrays

A controller that returns JSON or another `Response` object returns `CacheableJsonResponse` or `CacheableResponse` and attaches the same metadata. A plain `JsonResponse` is never cached by Dynamic Page Cache.

```php
use Drupal\Core\Cache\CacheableJsonResponse;
use Drupal\Core\Cache\CacheableMetadata;

  public function json(): CacheableJsonResponse {
    $config = $this->config('system.site');
    $response = new CacheableJsonResponse(['name' => $config->get('name')]);
    $response->addCacheableDependency($config);
    // Example: the response also depends on the interface language.
    $response->addCacheableDependency((new CacheableMetadata())->addCacheContexts(['languages:language_interface']));
    return $response;
  }
```

## Rules

- DO NOT set `'max-age' => 0` to make dynamic output show up. Find the missing tag or context. Max-age 0 bubbles up and makes the whole page uncacheable by Dynamic Page Cache.
- DO NOT rely on `max-age` for anonymous pages. Internal Page Cache ignores max-age and keeps pages until a tag on them is invalidated. If anonymous output must expire on a timer, invalidate a custom tag from cron, or skip Internal Page Cache for that route with the `page_cache_kill_switch` service as a last resort.
- DO NOT call `drupal_flush_all_caches()` or clear whole bins to refresh output. Invalidate the specific tags.
- DO use `user.permissions` instead of `user` unless the output is genuinely per user. Per-user caching multiplies cache entries and should be placeholdered (see the lazy builders guide).
- DO add `accessCheck(TRUE)` to entity queries for content shown to users; the query result then depends on permissions, which `user.permissions` covers.
- DO NOT put `#cache` `keys` on an element unless you want that element cached on its own in the render cache. Keys are for expensive subtrees, and need the same tags and contexts as any other element.

## Older supported core versions

The APIs above exist on every supported release. The `node_list:article` bundle tag is invalidated on 10.3 and later. The helper `$entity_type->getBundleListCacheTags('article')`, which returns that tag, needs 11.2; on earlier releases write the tag string yourself.

## Verify

Turn on cacheability headers on a development site:

```yaml
# sites/development.services.yml (or sites/default/services.yml)
parameters:
  http.response.debug_cacheability_headers: true
```

```bash
drush cache:rebuild
# Look for your tags and contexts in the response headers.
curl -sI https://example.ddev.site/mymodule/latest | grep -i '^x-drupal-cache'
# X-Drupal-Dynamic-Cache: HIT on the second request means the page is cacheable.
```

A response with `X-Drupal-Cache-Max-Age: 0 (Uncacheable)` or `X-Drupal-Dynamic-Cache: UNCACHEABLE (poor cacheability)` has max-age 0, or a context such as `user` or `session` that Dynamic Page Cache refuses to vary by, somewhere in it.
