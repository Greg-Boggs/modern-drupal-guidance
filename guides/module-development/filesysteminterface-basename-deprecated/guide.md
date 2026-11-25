---
name: filesysteminterface-basename-deprecated
title: "FileSystemInterface::basename() deprecated"
description: "FileSystemInterface::basename() deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3530869
change-record-nid: 3530869
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3530461](https://www.drupal.org/node/3530461)

`FileSystemInterface::basename()` has been deprecated and will be removed in Drupal 13.

Use the PHP native `basename()` function as a replacement.

```php
-      \Drupal::service('file_system')->basename($path);
+      basename($path);
```

*Source: [FileSystemInterface::basename() deprecated](https://www.drupal.org/node/3530869), a Drupal core change record by [cmlara](https://www.drupal.org/user/1790054) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
