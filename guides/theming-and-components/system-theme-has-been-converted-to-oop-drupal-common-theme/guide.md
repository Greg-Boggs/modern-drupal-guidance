---
name: system-theme-has-been-converted-to-oop-drupal-common-theme
title: "system_theme has been converted to OOP, drupal_common_theme has moved to ThemeCommonElements"
description: "system_theme has been converted to OOP, drupal_common_theme has moved to ThemeCommonElements"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3488470
change-record-nid: 3488470
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3488176](https://www.drupal.org/node/3488176)

system_theme has been converted to an OOP hook in core/modules/system/src/Hook/ThemeHook.php\
This hooks loads all templates it always has.

drupal_common_theme has been deprecated and the contents moved to core/lib/Drupal/Core/Theme/ThemeCommonElements.php

**Before**

```php
drupal_common_theme();
```

**After**

```php
use Drupal\Core\Theme\ThemeCommonElements;

ThemeCommonElements::commonElements();
```

Registry.php now checks if Drupal is being installed and loads the minimum needed for installation.

The following items have moved from system_theme to ThemeCommonElements to facilitate installation.

```php
'off_canvas_page_wrapper' => [
  'variables' => [
    'children' => NULL,
  ],
],
'status_report_grouped' => [
  'variables' => [
    'grouped_requirements' => NULL,
    'requirements' => NULL,
  ],
],
```

*Source: [system_theme has been converted to OOP, drupal_common_theme has moved to ThemeCommonElements](https://www.drupal.org/node/3488470), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
