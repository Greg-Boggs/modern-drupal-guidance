---
name: the-options-allowed-values-and-options-values-in-use
title: "The options_allowed_values() and _options_values_in_use() functions have been deprecated"
description: "The options_allowed_values() and _options_values_in_use() functions have been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3572185
change-record-nid: 3572185
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2171397](https://www.drupal.org/node/2171397)

The `options_allowed_values()` procedural function is deprecated and its logic is moved to a new service `Drupal\options\OptionsAllowedValuesInterface`

### Before

```php
$field_definitions = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', 'recipe');
if (isset(field_definitions['fruit'])) {
  $field_definition = field_definitions['fruit'];
  $field_storage_definition = $field_definition->getFieldStorageDefinition();
  $allowed_options = options_allowed_values($field_storage_definition);
}
```

### After

```php
use Drupal\options\OptionsAllowedValuesInterface;

$field_definitions = \Drupal::service('entity_field.manager')->getFieldDefinitions('node', 'recipe');
if (isset(field_definitions['fruit'])) {
  $field_definition = field_definitions['fruit'];
  $field_storage_definition = $field_definition->getFieldStorageDefinition();
  // Inject the service when possible.
  $allowed_options = \Drupal::service(OptionsAllowedValuesInterface::class)
    ->getAllowedValues($field_storage_definition);
}
```

`_options_values_in_use` has been deprecated without replacement.

*Source: [The options_allowed_values() and \_options_values_in_use() functions have been deprecated](https://www.drupal.org/node/3572185), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
