---
name: preprocess-functions-in-modules-now-support-object-oriented
title: "Preprocess functions in modules now support object-oriented implementations"
description: "Preprocess functions in modules now support object-oriented implementations"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3496491
change-record-nid: 3496491
introduced-in-version: "11.2.0-alpha1"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0-alpha1\
Issue links: [#3495943](https://www.drupal.org/node/3495943), [#3523109](https://www.drupal.org/node/3523109), [#3504381](https://www.drupal.org/node/3504381)

These hooks can now be OOP in modules:

- hook_preprocess
- hook_preprocess_HOOK

Where HOOK is the name of a theme hook. (Which is not at all confusing.)

For `template_preprocess_HOOK` see [https://www.drupal.org/node/3504125](https://www.drupal.org/node/3504125)

The following two hooks are restricted to single implementations per module.

- hook_preprocess => #\[Hook('preprocess')\]
- hook_preprocess_HOOK => #\[Hook('preprocess_HOOK')\]

### hook_preprocess

**Before:**\
`function contextual_preprocess(&$variables, $hook, $info): void {`

**After:**

```php
use Drupal\Core\Hook\Attribute\Hook;

  #[Hook('preprocess')]
  public function preprocess(&$variables, $hook, $info): void {
```

### hook_preprocess_HOOK

`#[Hook]` This should have a HOOK argument passed for the portion after module_preprocess\_.

**Before:**\
`function comment_preprocess_block(&$variables): void {`

**After:**

```php
use Drupal\Core\Hook\Attribute\Hook;

  #[Hook('preprocess_block')]
  public function preprocessBlock(&$variables): void {
```

Themes remain procedural.

In order to ensure that preprocess functions are not incorrectly ignored the hooks_converted parameter and StopProceduralScan attribute have been renamed [https://www.drupal.org/node/3498595](https://www.drupal.org/node/3498595) for more information.

### Backwards compatibility

For modules looking to support older versions of Drupal than 11.2 tag the procedural function with #\[LegacyHook\] and call the preprocess service.\
**Important note on 11.1 support**\
The minimum version for preprocess support in 11.1 is 11.1.8.\
You must maintain the procedural implementation to support versions of Drupal lower than 11.2.0\
To set the minimum version to 11.1.8 you can use ^11.1.8\
Remember to set this minimum in both the info.yml and composer.json

### Additional information

Further information can be found in [Support for object oriented hook implementations using autowired services](https://www.drupal.org/node/3442349) including information on how to maintain a single branch of a contrib module supporting Drupal versions before and after this change.

### Original change record

Originally this issue provided a `#[Preprocess]` attribute, this has been removed [https://www.drupal.org/node/3524585](https://www.drupal.org/node/3524585)

*Source: [Preprocess functions in modules now support object-oriented implementations](https://www.drupal.org/node/3496491), a Drupal core change record by [ghost of drupal past](https://www.drupal.org/user/3619592) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
