---
name: symfonys-file-validation-constraint-is-now-available-to-all
title: "Symfony's File validation constraint is now available to all core code"
description: "Symfony's File validation constraint is now available to all core code"
drupal-core: ">=11.2.3"
source-url: https://www.drupal.org/node/3537390
change-record-nid: 3537390
introduced-in-version: "11.2.3"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.3\
Issue links: [#3534278](https://www.drupal.org/node/3534278)

Symfony has a `File` validation constraint, which checks that a value is a valid file. It is now available to all core code. For example:

```php
$field_definition->addConstraint('File', []);
```

Or in config schema:

```php
constraints:
  File: []
```

*Source: [Symfony's File validation constraint is now available to all core code](https://www.drupal.org/node/3537390), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
