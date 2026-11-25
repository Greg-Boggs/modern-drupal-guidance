---
name: hooks-converted-parameter-and-stopproceduralhookscan
title: "hooks_converted parameter and StopProceduralHookScan attributes have been renamed."
description: "hooks_converted parameter and StopProceduralHookScan attributes have been renamed."
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3498595
change-record-nid: 3498595
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3495943](https://www.drupal.org/node/3495943)

To ensure that all preprocess functions are picked up, the `hooks_converted` parameter has been renamed to `skip_procedural_hook_scan` and the `StopProceduralHookScan` attribute has been renamed to `ProceduralHookScanStop`.

When updating modules to 11.2, if the module has used the old parameter or attribute, it should be sufficient to do a find and replace with the new name after ensuring that all preprocess functions are converted to OOP. A module can also chose to add both parameters.

Note: The services parameter and especially the attribute are mostly useful for large modules with many functions (e.g. legacy hooks to support 11.0 and earlier versions). For smaller modules, the performance improvement are very likely tiny and probably not measurable at all. Both are entirely optional and purely a performance optimization.

**Before**

```php
parameters:
  MODULE_NAME.hooks_converted: true
```

**After**

```php
parameters:
  MODULE_NAME.skip_procedural_hook_scan: true
```

**Before**

```php
use Drupal\Core\Hook\Attribute\StopProceduralHookScan;

#[StopProceduralHookScan]
function locale_translation_batch_version_check() {
```

**After**

```php
use Drupal\Core\Hook\Attribute\ProceduralHookScanStop;

#[ProceduralHookScanStop]
function locale_translation_batch_version_check() {
```

*Source: [hooks_converted parameter and StopProceduralHookScan attributes have been renamed.](https://www.drupal.org/node/3498595), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
