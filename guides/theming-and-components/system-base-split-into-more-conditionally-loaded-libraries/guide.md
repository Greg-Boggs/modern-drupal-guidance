---
name: system-base-split-into-more-conditionally-loaded-libraries
title: "system/base split into more conditionally loaded libraries"
description: "system/base split into more conditionally loaded libraries"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3530832
change-record-nid: 3530832
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2880237](https://www.drupal.org/node/2880237), [#3512285](https://www.drupal.org/node/3512285), [#3512404](https://www.drupal.org/node/3512404)

Various CSS files previously included in the system/base library have been split into smaller asset libraries and are now conditionally loaded with the elements or templates that require them.

Themes or modules relying on CSS specified in those libraries may need to include the new library in #attached.

Themes that were overriding the files may need to adjust to override the new libraries.

See [https://www.drupal.org/node/3432346](https://www.drupal.org/node/3432346) for examples of the changes needed.

Libraries moved in 11.3.0:

- [#3512285: Split item-list.module.css out to its own library](https://www.drupal.org/project/drupal/issues/3512285)
- [#3512404: Move reset-appearance.module.css to its own library](https://www.drupal.org/project/drupal/issues/3512404)

*Source: [system/base split into more conditionally loaded libraries](https://www.drupal.org/node/3530832), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
