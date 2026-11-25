---
name: creating-a-field-storage-in-kerneltests-without-the-entity
title: "Creating a field storage in Kerneltests without the entity schema being installed is deprecated"
description: "Creating a field storage in Kerneltests without the entity schema being installed is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3493981
change-record-nid: 3493981
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3475719](https://www.drupal.org/node/3475719)

In Kerneltests, creating a field storage on an entity in which the entity schema has not been installed is deprecated.

In Drupal 12.0.0, the deprecation warning will be replaced with a LogicException.

Example:

```php
  // When the next line is missing the deprecation warning will be thrown.
  $this->installEntitySchema('entity_test');

  // Create a field storage on the entity "entity_test".
  Drupal\field\Entity\FieldStorageConfig::create([
    'field_name' => 'field_test',
    'entity_type' => 'entity_test',
    'type' => 'integer',
  ])->save();
```

*Source: [Creating a field storage in Kerneltests without the entity schema being installed is deprecated](https://www.drupal.org/node/3493981), a Drupal core change record by [daffie](https://www.drupal.org/user/116368) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
