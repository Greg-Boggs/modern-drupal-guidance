---
name: added-support-for-as-a-shorthand-for-service-closure-in
title: "Added support for `@>` as a shorthand for `!service_closure` in services.yml files"
description: "Added support for `@>` as a shorthand for `!service_closure` in services.yml files"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3527390
change-record-nid: 3527390
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3498038](https://www.drupal.org/node/3498038)

You can now use `@>` as a shorthand for `!service_closure` in services.yml files.

Original (still supported) syntax:

```php
example_service_closure:
    class: \Drupal\Core\ExampleClass
    arguments: [!service_closure '@example_service_1']
```

New shorthand syntax:

```php
example_service_closure_shorthand:
    class: \Drupal\Core\ExampleClass
    arguments: ['@>example_service_1']
```

*Source: [Added support for \`@>\` as a shorthand for \`!service_closure\` in services.yml files](https://www.drupal.org/node/3527390), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
