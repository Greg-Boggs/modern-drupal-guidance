---
name: node-access-test-add-field-has-been-removed-use
title: "node_access_test_add_field has been removed use NodeAccessTrait instead"
description: "node_access_test_add_field has been removed use NodeAccessTrait instead"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3498345
change-record-nid: 3498345
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3495214](https://www.drupal.org/node/3495214)

node_access_test_add_field has been removed.

**Before:**

```php
node_access_test_add_field(NodeType::load('moderated_content'));
```

**After:**

```php
use Drupal\Tests\node\Traits\NodeAccessTrait;

class NodeAccessTest extends ModerationStateTestBase {

  use NodeAccessTrait;
  $this->addPrivateField(NodeType::load('moderated_content'));
}
```

*Source: [node_access_test_add_field has been removed use NodeAccessTrait instead](https://www.drupal.org/node/3498345), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
