---
name: the-check-markup-function-is-deprecated
title: "The check_markup() function is deprecated"
description: "The check_markup() function is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3588040
change-record-nid: 3588040
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#455724](https://www.drupal.org/node/455724)

The `check_markup()` function is deprecated and no replacement is provided. It's always recommended to return a renderable array, when possible, without flattening as markup, to preserve the cacheability metadata.

### Before

```php
$formatted_text = check_markup($text, 'basic_html', $langcode, $filter_types_to_skip);
```

### After

```php
$formatted_text = [
  '#type' => 'processed_text',
  '#text' => $text,
  '#format' => 'basic_html',
  '#filter_types_to_skip' => $filter_types_to_skip,
  '#langcode' => $langcode,
];
```

Particular cases:

- Mail: A common use case where check_markup() is still frequently used is hook_mail() as that does not support render arrays. Future Drupal mail system development will pipe the mail preparation through Twig (for both, plain and HTML messages). This will remove the need to manually render the renderable array (see [#3539651: Introduce email plugins](https://www.drupal.org/project/drupal/issues/3539651)). Until that API is available, `\Drupal::service('renderer')->renderInIsolation($build)` may be used. Refer to the documentation on `\Drupal\Core\Render\RendererInterface` when `render()` vs renderInIsolation() should be used.
- Tests: Many tests are only asserting that a text has been formatted correctly. For convenience, Drupal provides the `\Drupal\Tests\filter\Traits\ProcessedTextTestTrait` trait with a helper method, facilitating testing.

*Source: [The check_markup() function is deprecated](https://www.drupal.org/node/3588040), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
