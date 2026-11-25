---
name: theme-hook-definitions-for-views-plugins-automatically
title: "Theme hook definitions for views plugins automatically define initial preprocess callback"
description: "Theme hook definitions for views plugins automatically define initial preprocess callback"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3548185
change-record-nid: 3548185
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3535680](https://www.drupal.org/node/3535680)

Implicitly discovered template_preprocess_HOOK() callbacks are being deprecated and replaced with explicitly defined initial callbacks.

Various views plugins have the unique ability to define a theme key in their plugin attribute, the views module then automatically defines a theme hook definition for them. That code now makes an assumption that an initial preprocess callback is defined in a specifically named method and class. This is only added if that method exists. Alternatively, plugins with such a callback can also use `hook_theme_registry_alter()` to define an alternative initial preprocess callback.

The initial preprocess callback is built with this pattern:

```php
Drupal\module_name\Hook\ModuleNameThemeHooks::preprocessCamelizedThemeHookName()
```

For example, the module `views_example_display` defines a display plugin with `theme: "views_display_example"`, then the resulting initial preprocess callback looks like this:

```php
namespace Drupal\views_example_display\Hook;

class ViewsExampleDisplayThemeHooks {

  public function preprocessViewsDisplayExample(array $variables) {

  }
}
```

This follows the adopted common pattern to put initial preprocess callbacks in the theme hooks class.

Note: This class is automatically registered as a service if there is at least one hook method in that class. Alternatively, it can be explicitly registered:

```php
services:
  Drupal\views_example_display\Hook\ViewsExampleDisplayThemeHooks:
    autowire: true
```

*Source: [Theme hook definitions for views plugins automatically define initial preprocess callback](https://www.drupal.org/node/3548185), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
