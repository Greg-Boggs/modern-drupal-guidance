---
name: fixture-oop-hooks
description: "Test fixture. Implement hooks as class methods with the #[Hook] attribute instead of procedural functions in .module files."
drupal-core: ">=11.1"
---

# Implement hooks with the Hook attribute

{{ DRUPAL_STATUS() }}

Since Drupal 11.1, modules implement hooks as public methods on classes in `src/Hook/`. Core registers these classes as autowired services, so they can take dependencies in their constructor.

## Rules

- Put hook classes in `src/Hook/` under the `Drupal\<module>\Hook` namespace.
- Mark each method with `#[Hook('<hook_name>')]`, without the `hook_` prefix.
- Inject services through the constructor. Do not call `\Drupal::service()` inside the class.

## Example

```php
<?php

namespace Drupal\mymodule\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\node\NodeInterface;

final class NodeHooks {

  public function __construct(
    private readonly MessengerInterface $messenger,
  ) {}

  #[Hook('node_presave')]
  public function nodePresave(NodeInterface $node): void {
    $this->messenger->addStatus('Saving ' . $node->label());
  }

}
```

## Fallback for older core

On Drupal 10.x, keep a procedural function in `mymodule.module` marked `#[LegacyHook]` that delegates to the class, so the module supports both versions.
