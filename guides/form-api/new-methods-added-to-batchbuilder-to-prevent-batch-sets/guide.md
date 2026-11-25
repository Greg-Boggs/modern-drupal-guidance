---
name: new-methods-added-to-batchbuilder-to-prevent-batch-sets
title: "New methods added to BatchBuilder to prevent batch sets from being added more than once"
description: "New methods added to BatchBuilder to prevent batch sets from being added more than once"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3512253
change-record-nid: 3512253
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3510939](https://www.drupal.org/node/3510939)

To prevent duplicate batches from being created inadvertently in the same page request, you can use `Drupal\Core\Batch\BatchBuilder::registerSetId() `and `Drupal\Core\Batch\BatchBuilder:isSetIdRegistered()` to check and see if this batch has been built before.

Example:

```php
use Drupal\Core\Batch\BatchBuilder;

...

if (!BatchBuilder::isSetIdRegistered('my_unique_id')) {
  $batch_builder = (new BatchBuilder())
    ->registerSetId('my_unique_id')
    ->setTitle(t('Batch Title'))
    ->setFinishCallback('batch_example_finished_callback')
    ->setInitMessage(t('The initialization message (optional)'));
  foreach ($ids as $id) {
    $batch_builder->addOperation('batch_example_callback', [$id]);
  }
  batch_set($batch_builder->toArray());
}
```

*Source: [New methods added to BatchBuilder to prevent batch sets from being added more than once](https://www.drupal.org/node/3512253), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
