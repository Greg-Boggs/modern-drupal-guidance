---
name: fixture-cache-tags
description: Test fixture. Add cache tags, contexts and max-age to render arrays so cached pages update when their data changes.
drupal-core: "^10.3 || ^11"
---

# Add cache metadata to render arrays

Every render array that shows data from an entity or configuration must say what it depends on. Without cache tags, the page cache keeps serving stale output after the data changes.

## Rules

- Add the cache tags of every entity and config object the output uses.
- Add cache contexts for every request property that changes the output, such as `user.permissions` or `url.query_args`.
- Prefer `CacheableMetadata::createFromObject()` and `applyTo()` over building `#cache` by hand.

## Example

```php
use Drupal\Core\Cache\CacheableMetadata;

$build = [
  '#markup' => $this->t('Latest: @title', ['@title' => $node->label()]),
];
CacheableMetadata::createFromObject($node)
  ->addCacheContexts(['user.permissions'])
  ->applyTo($build);
```

Related: {{ GUIDE_REF("fixture-oop-hooks") }}.
