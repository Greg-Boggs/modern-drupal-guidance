---
name: added-a-content-top-section-to-the-navigation-for
title: "Added a content_top section to the navigation for programmatic additions"
description: "Added a content_top section to the navigation for programmatic additions"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3487802
change-record-nid: 3487802
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3463142](https://www.drupal.org/node/3463142)

The core navigation module now includes a section named `content_top`, which sits right above the `content` section. While the `content` section is controlled editorially via config entities, the `content_top` section is controlled programmatically by module developers who wish to provide integrations for this area of the navigation. Examples include environment indicator, workspaces, and Umami. To take advantage of this new `content_top` section, module developers can leverage two new hooks.

## `hook_navigation_content_top`

To add content to the `content_top` region, implement `hook_navigation_content_top`. Return an array of render arrays, keyed by a unique name, as needed for your integration:

```php
function my_module_navigation_content_top(): array {
  return [
    'my_module_foo' => [
      '#markup' => 'foo',
    ],
    'my_module_bar' => [
      '#markup' => 'bar',
    ],
  ];
}
```

## `hook_navigation_content_top_alter`

To alter the contents of the `content_top` region that have been provided by other modules, implement `hook_navigation_content_top_alter`. The hook is provided with a render array by reference for all the integrations that have been added by `hook_navigation_content_top` implementations.

```php
function my_module_navigation_content_top_alter(&$content_top): void {
  unset($content_top['navigation_foo']);
  $content_top['navigation_bar']['#markup'] = 'new bar';
}
```

Drupal 11.1 and later support OOP/attribute-based hooks as well.

`my_module/src/Hook/MyModuleNavigationHooks.php`

```php
<?php

namespace Drupal\my_module\Hook;

use Drupal\Core\Hook\Attribute\Hook;

class MyModuleNavigationHooks {

  /**
   * Provide content for Navigation content_top section.
   */
  #[Hook('navigation_content_top')]
  public function navigationContentTop(): array {
    return [
      'my_module_foo' => [
        '#markup' => 'foo',
      ],
      'my_module_bar' => [
        '#markup' => 'bar',
      ],
    ];
  }

  /**
   * Alter the content_top section of the Navigation module.
   */
  #[Hook('navigation_content_top_alter')]
  public function navigationContentTopAlter(array &$content_top): void {
    unset($content_top['my_module_foo']);
    $content_top['my_module_bar']['#markup'] = 'updated bar';
  }

}
```

Adjust the render array to your needs as above. This is a basic example, but it can be as complex as you like. As always, be sure to cover your cacheability metadata where applicable.

*Source: [Added a content_top section to the navigation for programmatic additions](https://www.drupal.org/node/3487802), a Drupal core change record by [m4olivei](https://www.drupal.org/user/410384) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
