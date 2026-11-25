---
name: new-service-for-purging-field-data
title: "New service for purging field data"
description: "New service for purging field data"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3494023
change-record-nid: 3494023
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2907780](https://www.drupal.org/node/2907780)

A new service has been added for purging field data: `\Drupal\Core\Field\FieldPurger`, and the following functions have been deprecated:

- `field_purge_batch()`
- `field_purge_field()`
- `field_purge_field_storage()`

**Before:**

```php
field_purge_batch(10);
```

**After:**

```php
\Drupal::service(FieldPurger::class)->purgeBatch(10);
```

**Deprecated without replacement:**

```php
field_purge_field($field_definition);
field_purge_field_storage($field_storage_definition);
```

**Configuration**\
The `field.settings:purge_batch_size` configuration has been deprecated.\
**Before**\
`field.settings:purge_batch_size`

**After**\
`$settings['field_purge_batch_size'] = '50';`

*Source: [New service for purging field data](https://www.drupal.org/node/3494023), a Drupal core change record by [amateescu](https://www.drupal.org/user/729614) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
