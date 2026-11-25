---
name: modulehandler-loadallincludes-is-deprecated
title: "ModuleHandler::loadAllIncludes() is deprecated"
description: "ModuleHandler::loadAllIncludes() is deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3536432
change-record-nid: 3536432
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3536431](https://www.drupal.org/node/3536431)

`ModuleHandler::loadAllIncludes()` is deprecated, there is no direct replacement.

As a replacement, `ModuleHandler::loadInclude()` can be called in a loop for modules.

Be aware that `ModuleHandler::loadInclude(`) and all include files will eventually be deprecated.

*Source: [ModuleHandler::loadAllIncludes() is deprecated](https://www.drupal.org/node/3536432), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
