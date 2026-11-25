---
name: uuids-are-now-validated
title: "UUIDs are now validated"
description: "UUIDs are now validated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3560109
change-record-nid: 3560109
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3559874](https://www.drupal.org/node/3559874)

Core's `uuid` field type -- which is automatically used to store content entity UUIDs -- now validates that the value it holds is, in fact, a valid UUID.

Previously, this was not the case; only the value's length was validated. So as long as it fit within a certain size, you could have an invalid UUID like `this-is-my-entity`. Now, such a value will no longer pass validation.

Most people are unlikely to run into this, but it may cause any entities with invalid UUIDs to fail validation. If that happens to you, you must change the entity's UUID to something valid:

```php
$entity->set('uuid', \Drupal::service('uuid')->generate())->save();
```

*Source: [UUIDs are now validated](https://www.drupal.org/node/3560109), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
