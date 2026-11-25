---
name: views-entity-field-label-has-been-deprecated
title: "views_entity_field_label() has been deprecated"
description: "views_entity_field_label() has been deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3489411
change-record-nid: 3489411
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3069442](https://www.drupal.org/node/3069442)

`views_entity_field_label()` has been deprecated. Use `\Drupal::service('entity_field.manager')->getFieldLabels()` (introduced in version 11.2.x) instead.

Before

```php
views_entity_field_label($entity_type, $field_name);
```

After

```php
\Drupal::service('entity_field.manager')->getFieldLabels($entity_type, $field_name);
```

`getFieldLabels()` has been added to `EntityFieldManagerInterface`.

*Source: [views_entity_field_label() has been deprecated](https://www.drupal.org/node/3489411), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
