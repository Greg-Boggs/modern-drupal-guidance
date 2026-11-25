---
name: float-and-list-float-fields-can-no-longer-be-added-via-the
title: "Float and List (float) fields can no longer be added via the field UI"
description: "Float and List (float) fields can no longer be added via the field UI"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3505587
change-record-nid: 3505587
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#2542760](https://www.drupal.org/node/2542760)

The 'Float' and 'List (float)' field types can no longer be added via field UI.

Configured 'Float' or 'List (float)' fields on existing sites will be unaffected.

The fields are also available to use via programmatically created configuration or for base and bundle fields added via the API.

To make them visible again, hook_field_info_alter() must be implemented in a module:

```php
#[Hook('field_info_alter')]
public function fieldInfoAlter(&$info) {
  $info['list_float']['no_ui'] = FALSE;
  $info['float']['no_ui'] = FALSE;
}
```

*Source: [Float and List (float) fields can no longer be added via the field UI](https://www.drupal.org/node/3505587), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
