---
name: entity-test-create-bundle-entity-test-delete-bundle-are
title: "entity_test_create_bundle(), entity_test_delete_bundle() are deprecated and replaced with an EntityTestHelper methods"
description: "entity_test_create_bundle(), entity_test_delete_bundle() are deprecated and replaced with an EntityTestHelper methods"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3497049
change-record-nid: 3497049
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3495966](https://www.drupal.org/node/3495966)

`entity_test_create_bundle()` is deprecated and replaced with the `\Drupal\entity_test\EntityTestHelper::createBundle().`\
`entity_test_delete_bundle()` is deprecated and replaced with the `\Drupal\entity_test\EntityTestHelper::deleteBundle().`

Before:

```php
entity_test_create_bundle($bundle, $text, $entity_type);
entity_test_delete_bundle($bundle, $entity_type);
```

After:

```php
use Drupal\entity_test\EntityTestHelper;
EntityTestHelper::createBundle($bundle, $text, $entity_type);
EntityTestHelper::deleteBundle($bundle, $entity_type);
```

*Source: [entity_test_create_bundle(), entity_test_delete_bundle() are deprecated and replaced with an EntityTestHelper methods](https://www.drupal.org/node/3497049), a Drupal core change record by [nikolay shapovalov](https://www.drupal.org/user/1877422) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
