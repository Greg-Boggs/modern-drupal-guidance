---
name: theme-suggestions-can-now-be-deprecated
title: "Theme suggestions can now be deprecated"
description: "Theme suggestions can now be deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3535678
change-record-nid: 3535678
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3159050](https://www.drupal.org/node/3159050)

It is now possible to deprecate theme suggestions. Using the special \__DEPRECATED key, list each deprecated theme suggestion, next to its definition with the deprecation message as value.

```php
/**
 * Implements hook_theme_suggestions_alter().
 */
function MODULE_suggestions_alter(array &$suggestions, array $variables, $hook): void {
  if ($hook == 'theme_test_suggestion_provided') {
    // Add a deprecated suggestion.
    $suggestions[] = 'theme_test_suggestion_provided__deprecated';
    $suggestions['__DEPRECATED']['theme_test_suggestion_provided__deprecated'] = 'Theme suggestion theme_test_suggestion_provided__deprecated is deprecated in drupal:X.0.0 and is removed from drupal:Y.0.0. This is a test.';
  }
}
```

*Source: [Theme suggestions can now be deprecated](https://www.drupal.org/node/3535678), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
