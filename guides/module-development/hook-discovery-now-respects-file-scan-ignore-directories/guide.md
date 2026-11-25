---
name: hook-discovery-now-respects-file-scan-ignore-directories
title: "Hook discovery now respects file_scan_ignore_directories setting"
description: "Hook discovery now respects file_scan_ignore_directories setting"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3608804
change-record-nid: 3608804
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3564112](https://www.drupal.org/node/3564112)

Hook discovery now respects the existing file_scan_ignore_directories setting that is used for example when discovering extensions.

This avoids parsing node_modules and similar folders when looking for legacy hooks to include and it may be beneficial to customize this when modules or themes include very large folders with many files:

```php
$settings['file_scan_ignore_directories'] = ['node_modules', 'styleguide'];
```

This is only necessary when scanning for legacy hooks and will be removed/made unecessary in Drupal 13 which will only support OOP hooks in module and themes.

*Source: [Hook discovery now respects file_scan_ignore_directories setting](https://www.drupal.org/node/3608804), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
