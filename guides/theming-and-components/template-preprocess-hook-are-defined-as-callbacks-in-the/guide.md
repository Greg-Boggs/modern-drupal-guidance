---
name: template-preprocess-hook-are-defined-as-callbacks-in-the
title: "template_preprocess_HOOK are defined as callbacks in the theme hook"
description: "template_preprocess_HOOK are defined as callbacks in the theme hook"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3504125
change-record-nid: 3504125
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3501136](https://www.drupal.org/node/3501136), [#3504381](https://www.drupal.org/node/3504381)

Rather than magically named functions such as `template_preprocess_container` these functions are now set as callbacks on the hook_theme() defining the HOOK.

**Before (using legacy hook_theme())**

```php
public function theme() : array {
  return [
    'block' => [
      'render element' => 'element',
    ],
  ];

function template_preprocess_block(&$variables): void {

}
```

**After, using a new OOP hook:**

```php
namespace Drupal\block\Hook;

class ThemeHooks {

  #[Hook('theme')]
  public function theme() : array {
    return [
      'block' => [
        'render element' => 'element',
        'initial preprocess' => static::class . ':preprocessBlock',
      ],
    ];
  }

  public function preprocessBlock(&$variables): void {

  }
}
```

Callbacks are resolved using the [CallableResolver](https://www.drupal.org/node/3368504), the above syntax will be resolved as the auto-registered service (which is registered with the class name as service name) and supports non-static methods and dependency injection.

Note that only strings and array callback definitions that can be serialized and stored are supported. And while functions as callbacks are supported, this is discouraged as module files will eventually be deprecated. The recommended approach is to place preprocess functions either in a ThemeHooks or similarly named hook class next to the hook_theme() implementation or a dedicated service or class with static methods.

All template_preprocess_HOOK() callbacks in core are being converted to the new system. Note that some procedural functions were converted in Drupal 11.2 and some in 11.3.

These callbacks are not expected to be called directly even if core occasionally calls them directly, they are not an API. Consider using template suggestions or a base hook definition instead. Minimal BC will be provided for core template_preprocess_hook functions.

The legacy callbacks will be removed in Drupal 12.0.\
The concept of template_preprocess callbacks may only be removed in Drupal 13 (to be determined).

### Provide backwards compatibility with earlier Drupal core versions

Discovery of legacy template preprocess function is automatically skipped for theme definitions that include an initial preprocess callback. Those legacy functions can be kept as-is or changed to call the new callback:

```php
function template_preprocess_block(&$variables) {
  \Drupal::service(ThemeHooks::class)->preprocessBlock($variables);
}
```

### Breaking changes

These preprocess callbacks are no longer in the same preprocess functions array as regular preprocess function. It is still possible to manually add it to a new theme definition added in hook_theme_registry_alter() but this is discouraged. Code that changes or removes such templates preprocess callbacks will need to be adjusted.

Discovery of legacy template_preprocess_HOOK() functions is deprecated and will be removed in Drupal 12.

*Source: [template_preprocess_HOOK are defined as callbacks in the theme hook](https://www.drupal.org/node/3504125), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
