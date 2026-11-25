---
name: classes-used-in-entity-form-handlers-must-implement-drupal
title: "Classes used in entity form handlers must implement Drupal\\Core\\Entity\\EntityFormInterface"
description: "Classes used in entity form handlers must implement Drupal\\Core\\Entity\\EntityFormInterface"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3528495
change-record-nid: 3528495
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3205577](https://www.drupal.org/node/3205577)

Form handlers that are defined in an entity type's definition and used in route definitions with the `_entity_form` default must implement `Drupal\Core\Entity\EntityFormInterface`.

Previously, if a form handler was used in an `_entity_form` route definition and didn't extend `EntityForm`, an obscure error was reported because `Drupal\Core\Entity\EntityTypeManager::getFormObject` calls several methods on the form object defined by `EntityFormInterface`.

It is recommended to extend `\Drupal\Core\Entity\EntityForm` in your form handler classes.

*Source: [Classes used in entity form handlers must implement Drupal\Core\Entity\EntityFormInterface](https://www.drupal.org/node/3528495), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
