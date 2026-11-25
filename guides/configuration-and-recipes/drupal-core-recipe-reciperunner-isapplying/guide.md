---
name: drupal-core-recipe-reciperunner-isapplying
title: "\\Drupal\\Core\\Recipe\\RecipeRunner::isApplying()"
description: "\\Drupal\\Core\\Recipe\\RecipeRunner::isApplying()"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3620346
change-record-nid: 3620346
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3613607](https://www.drupal.org/node/3613607)

A new static method, `\Drupal\Core\Recipe\RecipeRunner::isApplying()` has been added so that code can determine if it is being run when a recipe is being applied.

For example:

```php
use \Drupal\Core\Recipe\RecipeRunner;

function hook_install($is_syncing): void {
  // Set general module variables.
  $variable = RecipeRunner::isApplying() ? 'barbar', 'bar';
  \Drupal::state()->set('my_module.foo', $variable);
}
```

*Source: [\Drupal\Core\Recipe\RecipeRunner::isApplying()](https://www.drupal.org/node/3620346), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
