---
name: recipes-now-allow-an-extra-section
title: "Recipes now allow an \"extra\" section"
description: "Recipes now allow an \"extra\" section"
drupal-core: ">=11.1.4"
source-url: https://www.drupal.org/node/3504056
change-record-nid: 3504056
introduced-in-version: "11.1.4"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.4\
Issue links: [#3503190](https://www.drupal.org/node/3503190)

The content of a recipe is validated strictly. We now allow for recipe.yml files to contain an "extra" section that other modules can use how they see fit.

Like Composer, the `extra` property, if it exists, is generally ignored; the stuff in it is usually only of interest to specific plugins and add-ons. We've adopted that same concept for recipes.

```php
# The extra property is top level.
extra:
  # The key should be a valid project name. We don't validate that it exists, only that it
  # *could* exist (i.e., doesn't contain "-", or "*", etc.)
  project_browser:
    # Some arbitrary stuff here
  another_module:
    # More other arbitrary stuff here
```

`extra` is always optional, but if it is defined, it has only two rules:

- It must be an associative array
- Its keys need to be valid module names. By "valid", I mean here that they need to follow the form of a valid extension name (i.e., match `\Drupal\Core\Extension\ExtensionDiscovery::PHP_FUNCTION_PATTERN`). They do not need to be the name of an installed extension, or even an extant one.

As long as `extra` follows those rules, the recipe can have anything it wants in there.

The Recipe object will also get a new `getExtra($module_name)` method. It will not be possible to get the full contents of `extra`; it's internally namespaced to maintain separation between different modules' use of `extra` data.

This will provide the groundwork for issues like [#3322601: Make ModuleActivator expose a Configure follow-up task for modules which have one](https://www.drupal.org/project/project_browser/issues/3322601), where Project Browser has the need to display messages to the user after a recipe is applied.

*Source: [Recipes now allow an "extra" section](https://www.drupal.org/node/3504056), a Drupal core change record by [thejimbirch](https://www.drupal.org/user/2507260) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
