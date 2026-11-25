---
name: using-a-access-value-other-than-a-boolean-or-an
title: "Using a #access value other than a boolean or an AccessResultInterface object is deprecated"
description: "Using a #access value other than a boolean or an AccessResultInterface object is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3549344
change-record-nid: 3549344
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3526250](https://www.drupal.org/node/3526250)

The '#access' key in render array elements must now be either an AccessResultInterface object or FALSE. The use any other type or value is deprecated.

#### Before

Any #access value that is not strictly FALSE or an AccessResultInterface object is set to TRUE.

```php
$element = [
  '#markup' => 'foo',
  '#access' => new \stdClass(),
];
```

Results in a deprecation message.

#### After

Modules should make sure that they use a valid value in #access. For example,

```php
$element = [
  '#markup' => 'foo',
  '#access' => \Drupal\Core\Access\AccessResultInterface::isAllowed,
];
```

*Source: [Using a #access value other than a boolean or an AccessResultInterface object is deprecated](https://www.drupal.org/node/3549344), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
