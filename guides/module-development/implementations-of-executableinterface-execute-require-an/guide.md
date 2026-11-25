---
name: implementations-of-executableinterface-execute-require-an
title: "Implementations of ExecutableInterface:: execute() require an $object argument"
description: "Implementations of ExecutableInterface:: execute() require an $object argument"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3567812
change-record-nid: 3567812
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3520730](https://www.drupal.org/node/3520730)

The signature of `\Drupal\Core\Executable\ExecutableInterface:: execute()` implementations will require a $object argument in Drupal 12. This is to align the interface to the current real usage.

The $object argument indicates the object to execute the plugin on/with.

```php
public function execute(?object $object = NULL);
```

*Source: [Implementations of ExecutableInterface:: execute() require an $object argument](https://www.drupal.org/node/3567812), a Drupal core change record by [mondrake](https://www.drupal.org/user/1307444) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
