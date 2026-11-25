---
name: passing-anything-other-than-an-object-to
title: "Passing anything other than an object to JsonSchemaProviderSerializerInterface::getJsonSchema() is deprecated"
description: "Passing anything other than an object to JsonSchemaProviderSerializerInterface::getJsonSchema() is deprecated"
drupal-core: ">=12.1"
source-url: https://www.drupal.org/node/3632615
change-record-nid: 3632615
introduced-in-version: "12.1.0"
introduced-in-branch: "main"
license: CC-BY-SA-2.0
---

Introduced in branch: main\
Introduced in version: 12.1.0\
Issue links: [#3627338](https://www.drupal.org/node/3627338)

`JsonSchemaProviderSerializerInterface::getJsonSchema()` returns the JSON Schema for one object. Its documentation specified it also takes a class or interface name. That never worked: a class name throws a `TypeError`. The documentation now correctly describes it takes an object.

Passing anything other than an object is deprecated in drupal:12.1.0. In drupal:13.0.0, `$object` will be typed as `object`, and anything else will throw a `TypeError`.

An array of objects was the only non-object input that worked. The serializer normalized each item and returned a list of schemas. Call `getJsonSchema()` once per object instead.

### Before

```php
$schemas = $serializer->getJsonSchema([$item_a, $item_b], $context);
```

### After

```php
$schemas = array_map(
  fn (object $item): array => $serializer->getJsonSchema($item, $context),
  [$item_a, $item_b],
);
```

*Source: [Passing anything other than an object to JsonSchemaProviderSerializerInterface::getJsonSchema() is deprecated](https://www.drupal.org/node/3632615), a Drupal core change record by [dries](https://www.drupal.org/user/1) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
