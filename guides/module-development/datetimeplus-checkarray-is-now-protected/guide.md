---
name: datetimeplus-checkarray-is-now-protected
title: "DateTimePlus::checkArray() is now protected"
description: "DateTimePlus::checkArray() is now protected"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3577926
change-record-nid: 3577926
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3566186](https://www.drupal.org/node/3566186)

The visibility of `DateTimePlus::checkArray()` has been changed from `public static` to `protected static`. If you were calling `DateTimePlus::checkArray()` directly in your code, you should update your code to use `DateTimePlus::createFromArray()` instead, which handles validation internally.

Before:

```php
$isDateArray =  DateTimePlus::checkArray($array)
```

After:

```php
try {
  $dateTimePlus =  DateTimePlus::createFromArray($array)
}
catch (\InvalidArgumentException $e) {
  // Do something if the array is invalid.
}
```

*Source: [DateTimePlus::checkArray() is now protected](https://www.drupal.org/node/3577926), a Drupal core change record by [jan.fetalvero](https://www.drupal.org/user/3809154) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
