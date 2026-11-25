---
name: assigning-typed-data-objects-to-entity-or-target-id-no
title: "Assigning typed data objects to entity or target_id no longer supported"
description: "Assigning typed data objects to entity or target_id no longer supported"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3615589
change-record-nid: 3615589
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3566626](https://www.drupal.org/node/3566626)

Entity reference fields (including inheriting types like Entity Reference Revisions and Dynamic Entity Reference) now used property hooks to set and get their entity and target_id field properties.

This makes these properties more accessible to IDE's and other tools and removes the need for complex workarounds around PHP bugs with fibers and magic methods (see [#3565937: Workaround PHP bug with fibers and \__get()](https://www.drupal.org/project/drupal/issues/3565937)).

As a result, it is no longer possible assigned typed data value objects to these properties directly.

```php
// Still works, nothing changes.
$entity->get('field_reference')->entity = $entity->get('field_other_reference')->entity;
$entity->get('field_reference')->first()->entity = $entity->get('field_other_reference')->entity;
$entity->get('field_reference')->first()->set('entity', $entity->get('field_other_reference')->entity);

// This no longer works:
$entity->get('field_reference')->entity = $entity->get('field_other_reference')->first()->get('entity');
$entity->get('field_reference')->first()->entity = $entity->get('field_other_reference')->first()->get('entity');

// This never worked:
$entity->get('field_reference')->first()->set('entity', $entity->get('field_other_reference')->first()->get('entity'));
```

*Source: [Assigning typed data objects to entity or target_id no longer supported](https://www.drupal.org/node/3615589), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
