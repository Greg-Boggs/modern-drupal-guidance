---
name: batchstorageinterface-getid-has-been-added
title: "BatchStorageInterface::getId() has been added"
description: "BatchStorageInterface::getId() has been added"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3606576
change-record-nid: 3606576
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3593123](https://www.drupal.org/node/3593123)

BatchStorageInterface::getId() has been added.

```php
/**
 * Returns a new batch id.
 *
 * @return int
 *   A batch id.
 *
 * @throws \Exception
 *   Thrown when a new batch id could not be generated.
 */
public function getId(): int;
```

The getId() method already existed on the concrete \Drupal\Core\Batch\BatchStorage service and was being called through the interface type-hint, for example in [form.inc](https://git.drupalcode.org/project/drupal/-/blob/main/core/includes/form.inc?ref_type=heads#L497). However, getId() was not declared on \Drupal\Core\Batch\BatchStorageInterface, so the interface contract did not match how the service was actually used. Calling getId() on an arbitrary BatchStorageInterface implementation was therefore not guaranteed to work.

*Source: [BatchStorageInterface::getId() has been added](https://www.drupal.org/node/3606576), a Drupal core change record by [luissousa21](https://www.drupal.org/user/3855449) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
