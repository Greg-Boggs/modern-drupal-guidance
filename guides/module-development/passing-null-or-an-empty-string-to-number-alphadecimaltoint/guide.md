---
name: passing-null-or-an-empty-string-to-number-alphadecimaltoint
title: "Passing NULL or an empty string to Number::alphadecimalToInt() is deprecated"
description: "Passing NULL or an empty string to Number::alphadecimalToInt() is deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3494472
change-record-nid: 3494472
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3442810](https://www.drupal.org/node/3442810)

`Number::alphadecimalToInt()` will no longer accept NULL or the empty string as they are not valid alphadecimal values.

In Drupal 12.0.0, the deprecation warning will be replaced with an InvalidArgumentException.

*Source: [Passing NULL or an empty string to Number::alphadecimalToInt() is deprecated](https://www.drupal.org/node/3494472), a Drupal core change record by [vidorado](https://www.drupal.org/user/1050234) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
