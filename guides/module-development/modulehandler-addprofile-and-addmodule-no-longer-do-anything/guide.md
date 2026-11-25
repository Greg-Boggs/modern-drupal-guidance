---
name: modulehandler-addprofile-and-addmodule-no-longer-do-anything
title: "ModuleHandler addProfile and addModule no longer do anything."
description: "ModuleHandler addProfile and addModule no longer do anything."
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3550193
change-record-nid: 3550193
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3528899](https://www.drupal.org/node/3528899)

ModuleHandler::addProfile and ModuleHandler:addModule are scheduled for removal in drupal 12.

Since the deprecation additional issues with the underlying method ModuleHandler::add have been found.

As a result we have removed add and updated the deprecation messages to reflect that addProfile addModule no longer perform any actions.

[https://www.drupal.org/node/3491200](https://www.drupal.org/node/3491200) is the original Change record.

*Source: [ModuleHandler addProfile and addModule no longer do anything.](https://www.drupal.org/node/3550193), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
