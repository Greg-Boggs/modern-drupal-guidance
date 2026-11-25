---
name: calls-to-drupal-core-field-fieldstoragedefinitioninterface
title: "Calls to \\Drupal\\Core\\Field\\FieldStorageDefinitionInterface::getPropertyDefinition() will trigger a deprecation if $name is not a string"
description: "Calls to \\Drupal\\Core\\Field\\FieldStorageDefinitionInterface::getPropertyDefinition() will trigger a deprecation if $name is not a string"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3557373
change-record-nid: 3557373
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3557372](https://www.drupal.org/node/3557372)

Calling implementations of` \Drupal\Core\Field\FieldStorageDefinitionInterface::getPropertyDefinition()` with `$name` as a NULL will trigger a deprecation.

Calling code should be refactor so the `$name` parameter is not NULL.

*Source: [Calls to \Drupal\Core\Field\FieldStorageDefinitionInterface::getPropertyDefinition() will trigger a deprecation if $name is not a string](https://www.drupal.org/node/3557373), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
