---
name: entity-operations-methods-can-now-add-cacheable-metadata
title: "Entity operations methods can now add cacheable metadata"
description: "Entity operations methods can now add cacheable metadata"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3533080
change-record-nid: 3533080
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#2473873](https://www.drupal.org/node/2473873)

Several entity operation based methods have added a new `\Drupal\Core\Cache\CacheableMetadata $cacheability` parameter:

`\Drupal\Core\Entity\EntityListBuilder::getOperations()`\
`\Drupal\Core\Entity\EntityListBuilder::getDefaultOperations()`\
`hook_entity_operation`\
`hook_entity_operation_alter`

This is especially useful for adding cacheable metadata from access checks for operations. EntityListBuilder now does this by default for the edit and delete operations.

For hooks, the new parameter can be added to new and existing implementations:

```php
/**
 * Implements hook_entity_operation().
 */
#[Hook('entity_operation')]
public function entityOperation(\Drupal\Core\Entity\EntityInterface $entity, \Drupal\Core\Cache\CacheableMetadata $cacheability): array {
  $access = $entity->access('foo', NULL, TRUE);
  $cacheability->addCacheableDependency($access);
  if ($access->isAllowed()) {
    $operations['my_operation'] = [
      'title' => 'My operation',
      'weight' => 20,
      'url' => $entity->toUrl('bar'),
    ];
  }
}
```

Views and EntityListBuilder also automatically applies this cacheable metadata to the render output of its Operations field.

### Known limitations

`getDefaultOperations()` does not bubble up cacheability information from operations [in multiple built-in entity list builders.](https://www.drupal.org/project/drupal/issues/3540105)

*Source: [Entity operations methods can now add cacheable metadata](https://www.drupal.org/node/3533080), a Drupal core change record by [acbramley](https://www.drupal.org/user/1036766) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
