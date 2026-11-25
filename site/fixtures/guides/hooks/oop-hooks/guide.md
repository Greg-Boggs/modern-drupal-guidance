---
name: oop-hooks
description: "Implement hooks as autowired class methods with the #[Hook] attribute instead of procedural functions in .module files."
drupal-core: ">=11.1"
---

# OOP hooks

Since Drupal 11.1, hooks are class methods marked with the `#[Hook]` attribute. Core discovers the class, autowires its constructor and calls the method.

## Rules

1. Create a class under `src/Hook/` in your module.
2. Add `#[Hook('hook_name')]` to each implementing method. Pass the hook name without the `hook_` prefix, for example `#[Hook('node_insert')]`.
3. Inject dependencies with constructor promotion. Do not use `\Drupal::`.
4. Delete the procedural function from the `.module` file.

## Example

```php
<?php

declare(strict_types=1);

namespace Drupal\example\Hook;

use Drupal\Core\Hook\Attribute\Hook;
use Drupal\Core\Messenger\MessengerInterface;
use Drupal\Core\StringTranslation\StringTranslationTrait;
use Drupal\node\NodeInterface;

final class NodeHooks {

  use StringTranslationTrait;

  public function __construct(
    private readonly MessengerInterface $messenger,
  ) {}

  #[Hook('node_insert')]
  public function nodeInsert(NodeInterface $node): void {
    $this->messenger->addStatus($this->t('Created %title.', ['%title' => $node->label()]));
  }

}
```

## Legacy pattern to replace

```php
function example_node_insert(NodeInterface $node) {
  \Drupal::messenger()->addStatus(t('Created @title.', ['@title' => $node->label()]));
}
```

## Fallback for Drupal 10.3 to 11.0

The `#[Hook]` attribute is not available before 11.1. On older cores keep the procedural function in the `.module` file and have it delegate to a service, so the logic stays injectable:

```php
function example_node_insert(NodeInterface $node): void {
  \Drupal::service(NodeHooks::class)->nodeInsert($node);
}
```

```yaml
# example.services.yml
services:
  Drupal\example\Hook\NodeHooks:
    autowire: true
```
