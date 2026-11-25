---
name: passing-null-as-deserialization-target-class-to
title: "Passing null as $deserialization_target_class to ResourceType is deprecated"
description: "Passing null as $deserialization_target_class to ResourceType is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3558394
change-record-nid: 3558394
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3557053](https://www.drupal.org/node/3557053)

The `$deserialization_target_class` constructor parameter of the `\Drupal\jsonapi\ResourceType\ResourceType` class does not have a native typehint. This will be added in Drupal 12. Passing NULL is deprecated. If the target class is not required, pass `\stdClass::class`.

*Source: [Passing null as $deserialization_target_class to ResourceType is deprecated](https://www.drupal.org/node/3558394), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
