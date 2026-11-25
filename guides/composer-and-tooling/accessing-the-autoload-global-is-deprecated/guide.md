---
name: accessing-the-autoload-global-is-deprecated
title: "Accessing the autoload global is deprecated"
description: "Accessing the autoload global is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3576336
change-record-nid: 3576336
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3313404](https://www.drupal.org/node/3313404)

To access Composer's autoloader (class loader), find and require `/vendor/autoload.php`.

Before, the class loader was available from the `$autoload` variable. This made it available as global variable, `$GLOBALS['autoload']`.

Accessing any methods on the autoload global will emit a deprecation error in Drupal 11.4.0 and be unsupported in Drupal 12.0.0.

*Source: [Accessing the autoload global is deprecated](https://www.drupal.org/node/3576336), a Drupal core change record by [kingdutch](https://www.drupal.org/user/1868952) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
