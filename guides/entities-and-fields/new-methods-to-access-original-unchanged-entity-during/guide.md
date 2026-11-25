---
name: new-methods-to-access-original-unchanged-entity-during
title: "New methods to access original (unchanged) entity during entity update added to EntityInterface, EntityBase::$original is deprecated"
description: "New methods to access original (unchanged) entity during entity update added to EntityInterface, EntityBase::$original is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3295826
change-record-nid: 3295826
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2839195](https://www.drupal.org/node/2839195), [#2833084](https://www.drupal.org/node/2833084)

Previously, `$entity->original` was used to access the original entity during update operations.

Instead, use `\Drupal\Core\Entity\EntityInterface::getOriginal()`. `EntityInterface::setOriginal()` can be used to manually set the original entity, for example during bulk operations to speed up performance.

Note the slight behavior change when saving non-default revisions. Previously, the original property was always the unchanged default revision, now it is the revision that had been loaded, so when saving a new non-default revision based on a previous non-default revision or updating it, changes can be correctly detected.

Implementations of EntityInterface that do not extend from EntityBase will need to add the two new methods.

*Source: [New methods to access original (unchanged) entity during entity update added to EntityInterface, EntityBase::$original is deprecated](https://www.drupal.org/node/3295826), a Drupal core change record by [andypost](https://www.drupal.org/user/118908) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
