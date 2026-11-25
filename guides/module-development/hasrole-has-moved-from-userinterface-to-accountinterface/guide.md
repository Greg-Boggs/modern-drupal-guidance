---
name: hasrole-has-moved-from-userinterface-to-accountinterface
title: "hasRole() has moved from UserInterface to AccountInterface"
description: "hasRole() has moved from UserInterface to AccountInterface"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3283218
change-record-nid: 3283218
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3228209](https://www.drupal.org/node/3228209)

[#2991232: Add hasRole() method to AccountProxy and UserSession classes](https://www.drupal.org/project/drupal/issues/2991232) introduced a `hasRole()` method. Due to backwards compatibility concerns, it was added directly to the `Drupal\Core\Session\AccountProxy` and `Drupal\Core\Session\UserSession` classes.

This method is now defined in `Drupal\Core\Session\AccountInterface`, which all the relevant classes implement and which `Drupal\user\UserInterface` extends.

If you have code that implements `AccountInterface`, you may need to add a `hasRole()` method if you are not extending a class that already provides it.

*Source: [hasRole() has moved from UserInterface to AccountInterface](https://www.drupal.org/node/3283218), a Drupal core change record by [dww](https://www.drupal.org/user/46549) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
