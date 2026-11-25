---
name: system-base-split-into-smaller-conditionally-loaded
title: "system/base split into smaller, conditionally loaded libraries"
description: "system/base split into smaller, conditionally loaded libraries"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3523938
change-record-nid: 3523938
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2880237](https://www.drupal.org/node/2880237)

Various CSS files previously included in the system/base library have been split into smaller asset libraries, and are now conditionally loaded with the elements or templates that require them.

Themes or modules relying on CSS specified in those libraries may need to include the new library in #attached.

Themes that were overriding the files may need to adjust to override the new libraries.

See [https://www.drupal.org/node/3432346](https://www.drupal.org/node/3432346) for examples of the changes needed.

*Source: [system/base split into smaller, conditionally loaded libraries](https://www.drupal.org/node/3523938), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
