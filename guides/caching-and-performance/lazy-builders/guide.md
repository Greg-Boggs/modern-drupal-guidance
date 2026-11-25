---
name: lazy-builders
description: 'Render personalized or uncacheable parts of a Drupal page with #lazy_builder callbacks and placeholders so the rest of the page stays cached, instead of disabling caching for the whole page.'
drupal-core: ">=10.3"
replaces:
  - "'#cache' => ['max-age' => 0] on a block that shows per-user data"
  - "Building per-user output inline in a render array"
  - "'#pre_render' callbacks that are not trusted callbacks"
  - "Disabling Dynamic Page Cache or BigPipe to make personalized blocks work"
---

# Render personalized output with lazy builders

A lazy builder is a callback that builds part of a render array later, at the end of the request. With `#create_placeholder`, Drupal caches the page with a placeholder where that part goes and fills it in per request: Dynamic Page Cache keeps serving the rest of the page from cache, and BigPipe streams the placeholder's content after the page shell. Use it for output that varies per user or per session (a "Hello, Ada" greeting, a cart count, a "flag this" link), or that cannot be cached at all. The cache-killing alternative, `max-age: 0` or a `user` cache context on a block, makes every page that contains the block uncacheable.

{{ DRUPAL_STATUS() }}

{# Verified at 10.3.0 and 11.4.0: Renderer::doRender() assertions on #lazy_builder (array of [callback, args], scalar-or-NULL args, no children, allowed keys #lazy_builder, #cache, #create_placeholder, #lazy_builder_preview, #preview, #weight, #printed; 11.4.0 adds #placeholder_strategy_denylist). Callback resolution: CallableResolver::getCallableFromDefinition() handles "service:method" and "Class::method" through ClassResolver. Trust check: DoTrustedCallbackTrait (TrustedCallbackInterface, #[TrustedCallback] attribute in core/lib/Drupal/Core/Security/Attribute/TrustedCallback.php, present at 10.2.0) plus RenderCallbackInterface as the extra trusted interface. Auto-placeholder conditions (max-age 0, contexts session/user): renderer.config in core/core.services.yml. #}

For adding tags and contexts to output in general, see {{ GUIDE_REF("cache-metadata") }}.

## Implementation

### 1. Write the builder as a service method marked trusted

The callback receives only scalar arguments, so it loads what it needs itself. Render callbacks must be trusted: mark the method with `#[TrustedCallback]`, or implement `TrustedCallbackInterface` and list it in `trustedCallbacks()`. An untrusted callback throws an exception.

```php
<?php
// src/GreetingLazyBuilder.php

declare(strict_types=1);

namespace Drupal\mymodule;

use Drupal\Core\Security\Attribute\TrustedCallback;
use Drupal\Core\Session\AccountInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Builds per-user greetings for placeholders.
 */
class GreetingLazyBuilder {

  use StringTranslationTrait;

  public function __construct(
    protected readonly AccountInterface $currentUser,
  ) {}

  /**
   * Builds the greeting for the current user.
   *
   * @param string $style
   *   Example argument: a display variant chosen by the caller.
   */
  #[TrustedCallback]
  public function build(string $style): array {
    return [
      '#type' => 'html_tag',
      '#tag' => 'span',
      '#value' => $this->t('Hello, @name', ['@name' => $this->currentUser->getDisplayName()]),
      '#attributes' => ['class' => [$style]],
      // The builder's output is per user. This context stays inside the
      // placeholder and does not make the surrounding page per user.
      '#cache' => ['contexts' => ['user']],
    ];
  }

}
```

```yaml
# mymodule.services.yml
services:
  _defaults:
    autowire: true
  Drupal\mymodule\GreetingLazyBuilder: ~
```

### 2. Return a `#lazy_builder` element where the output goes

```php
<?php
// src/Plugin/Block/GreetingBlock.php

declare(strict_types=1);

namespace Drupal\mymodule\Plugin\Block;

use Drupal\Core\Block\Attribute\Block;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\StringTranslation\TranslatableMarkup;
use Drupal\mymodule\GreetingLazyBuilder;

/**
 * Greets the current user without making the page uncacheable.
 */
#[Block(
  id: 'mymodule_greeting',
  admin_label: new TranslatableMarkup('Greeting'),
)]
class GreetingBlock extends BlockBase {

  /**
   * {@inheritdoc}
   */
  public function build(): array {
    return [
      // [callback, arguments]. "service_id:method" calls the method on the
      // service. Here the service ID is the class name.
      '#lazy_builder' => [GreetingLazyBuilder::class . ':build', ['greeting--compact']],
      // Always render this through a placeholder.
      '#create_placeholder' => TRUE,
      // Optional: markup shown until BigPipe replaces the placeholder.
      '#lazy_builder_preview' => ['#markup' => '&nbsp;'],
    ];
  }

}
```

### 3. Follow the element's restrictions

The renderer enforces these with assertions, which fail on development sites:

- Arguments are scalars or `NULL` only: pass an entity ID, not an entity. The arguments become part of the placeholder's cache key.
- The element has no children and no other properties. Allowed keys: `#lazy_builder`, `#cache`, `#create_placeholder`, `#lazy_builder_preview`, `#weight`. Put `#type`, `#theme`, `#markup`, `#attributes` and the rest in the array the callback returns.
- `#cache` on the element holds metadata known before the callback runs. Metadata the callback discovers goes on the array the callback returns.

### 4. Know when Drupal placeholders without being asked

Even without `#create_placeholder`, Drupal turns an element with a `#lazy_builder` into a placeholder when its cacheability matches the auto-placeholder conditions: max-age 0, or the `session` or `user` context. Set `#create_placeholder` explicitly when you know the output is personalized, so the placeholder does not depend on what the callback returns.

## Callback forms

| Form | When |
|---|---|
| `'service_id:method'` or `Some\Class::class . ':method'` | The usual case. The method is called on the service from the container, so it can use injected services. |
| `Some\Class::class . '::method'` | A class that is not a service. Drupal instantiates it through the class resolver (using `create()` if it implements `ContainerInjectionInterface`), then calls the method. |
| `static::class . '::method'` naming a public static method | Called statically, with no instance. Fine for a callback that needs no services, such as one on the plugin class itself. |

A class whose only job is render callbacks can implement `Drupal\Core\Render\Element\RenderCallbackInterface` instead of marking each method; every public method is then trusted.

## Rules

- DO NOT set `max-age: 0` or add the `user` context to a whole block or page to show per-user data. Put the per-user part in a lazy builder.
- DO NOT pass objects, arrays or render arrays as lazy builder arguments. Pass IDs and strings.
- DO NOT add children or other properties next to `#lazy_builder`.
- DO mark the callback with `#[TrustedCallback]` or list it in `trustedCallbacks()`. The same applies to `#pre_render` and `#post_render` callbacks.
- DO keep `big_pipe` installed on sites with authenticated traffic. Without it placeholders are still replaced, but in the same response, so the page waits for the slowest one.

## Verify

```bash
drush cache:rebuild
# Logged in, the greeting is per user while the page stays cacheable:
# X-Drupal-Dynamic-Cache should be MISS then HIT across two requests,
# and X-Drupal-Cache-Contexts should not contain "user".
curl -sI -b "$SESSION_COOKIE" https://example.ddev.site/ | grep -i '^x-drupal'
```

With `http.response.debug_cacheability_headers: true` set, the page's contexts exclude `user` because the user context stays inside the placeholder.
