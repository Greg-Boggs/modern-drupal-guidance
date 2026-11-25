---
name: user-picture-enabled-is-now-deprecated
title: "user_picture_enabled is now deprecated."
description: "user_picture_enabled is now deprecated."
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3619932
change-record-nid: 3619932
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3151555](https://www.drupal.org/node/3151555)

`user_picture_enabled `is now deprecated, there is no replacement, check the field definition directly.

**Before**\
`user_picture_enabled()`

**After**

```php
$field_definitions = \Drupal::service('entity_field.manager')->getFieldDefinitions('user', 'user');
isset($field_definitions['user_picture']);
```

*Source: [user_picture_enabled is now deprecated.](https://www.drupal.org/node/3619932), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
