---
name: entitydefinitiontesttrait-now-declares
title: "EntityDefinitionTestTrait now declares $entityDefinitionUpdateManager and $state properties"
description: "EntityDefinitionTestTrait now declares $entityDefinitionUpdateManager and $state properties"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3601134
change-record-nid: 3601134
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3581403](https://www.drupal.org/node/3581403)

The `$entityDefinitionUpdateManager` and `$state` property declarations have been moved from individual test classes into `EntityDefinitionTestTrait`, which already requires both services to be available in any class that uses it.

Previously, each test class that used the trait was responsible for declaring its own typed property (or docblock-typed property) for these services, leading to duplication across:

- `EntityDefinitionUpdateTest`
- `EntityDefinitionUpdateProviderTest`
- `EntityDefinitionUpdateMultipleTypesTest`
- `FieldableEntityDefinitionUpdateTest`

The trait now declares both properties:

```php
protected EntityDefinitionUpdateManagerInterface $entityDefinitionUpdateManager;
protected StateInterface $state;
```

If you are using `EntityDefinitionTestTrait` and declaring these properties you can remove your declarations and rely on the trait.

*Source: [EntityDefinitionTestTrait now declares $entityDefinitionUpdateManager and $state properties](https://www.drupal.org/node/3601134), a Drupal core change record by [mstrelan](https://www.drupal.org/user/314289) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
