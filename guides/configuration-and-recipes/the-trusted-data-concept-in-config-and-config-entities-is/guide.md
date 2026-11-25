---
name: the-trusted-data-concept-in-config-and-config-entities-is
title: "The trusted data concept in Config and Config Entities is deprecated"
description: "The trusted data concept in Config and Config Entities is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3348180
change-record-nid: 3348180
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3347842](https://www.drupal.org/node/3347842)

The concept of "trusted data" in the configuration system has been deprecated in Drupal 11.4.0 and will be removed in Drupal 13.0.0. Previously, code could mark configuration data as "trusted" to skip schema-based validation and casting on save, which was primarily used during module/theme installation for performance. Configuration schema is now always used to validate, cast, and sort configuration data on save.

### What changed

The following methods and parameters are deprecated:

- `ConfigEntityInterface::trustData()` — deprecated, no replacement.
- The `$has_trusted_data` parameter on `Config::save()` — deprecated. Call `save()` with no arguments.

Configuration data is now always cast against schema on every save. This ensures that:

- Configuration values are always correctly typed according to their schema.
- Configuration map keys are always sorted according to their schema definition order.

### How to update your code

#### Remove calls to trustData()

**Before:**

```php
  $entity->trustData();
  $entity->save();
```

**After:**

```php
  $entity->save();
```

#### Remove the $has_trusted_data argument from Config::save()

**Before:**

```php
  $config = \Drupal::configFactory()->getEditable('mymodule.settings');
  $config->setData($data);
  $config->save(TRUE);
```

**After:**

```php
  $config = \Drupal::configFactory()->getEditable('mymodule.settings');
  $config->setData($data);
  $config->save();
```

#### Manipulating configuration without schema in hook_update_N()

If you need to write configuration data in a `hook_update_N()` that does not conform to the current schema — for example, when you are migrating data between configuration keys, removing keys, or making changes where the schema has not yet been updated — use the `config.storage` service to read and write raw configuration data directly, bypassing the configuration factory and schema casting entirely.

**Before (using trusted data to skip schema):**

```php
  function mymodule_update_11401() {
    $config = \Drupal::configFactory()->getEditable('mymodule.settings');
    // Manipulate data that doesn't match current schema...
    $config->set('new_key', $config->get('old_key'));
    $config->clear('old_key');
    $config->save(TRUE);
  }
```

**After (using config.storage service):**

```php
  function mymodule_update_11401() {
    /** @var \Drupal\Core\Config\StorageInterface $config_storage */
    $config_storage = \Drupal::service('config.storage');
    $data = $config_storage->read('mymodule.settings');
    if ($data !== FALSE) {
      // Manipulate raw data without schema validation.
      $data['new_key'] = $data['old_key'];
      unset($data['old_key']);
      $config_storage->write('mymodule.settings', $data);
    }
  }
```

#### Manipulating configuration without schema in tests

It can be useful to write config that does not comply with schema in order to test updates.

**Before (using trusted data to skip schema):**

```php
     // Explicitly set the `items_per_page` setting to a string without casting.
     $block->set('settings', [
       'items_per_page' => '5',
    ])->trustData()->save();
```

**After (using `RawConfigWriterTrait`):**\
Use the `Drupal\Tests\Traits\Core\Config\RawConfigWriterTrait` trait in use test class.

```php
     // Explicitly set the `items_per_page` setting to a string without casting.
     $block->set('settings', [
       'items_per_page' => '5',
      'label' => 'Test',
    ]);
    $this->writeRawConfigEntity($block);
```

There is also a method on the trait to manipulate simple config - `writeRawConfig()`

*Source: [The trusted data concept in Config and Config Entities is deprecated](https://www.drupal.org/node/3348180), a Drupal core change record by [alexpott](https://www.drupal.org/user/157725) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
