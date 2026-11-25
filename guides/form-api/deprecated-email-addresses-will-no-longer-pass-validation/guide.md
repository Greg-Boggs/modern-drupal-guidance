---
name: deprecated-email-addresses-will-no-longer-pass-validation
title: "Deprecated email addresses will no longer pass validation"
description: "Deprecated email addresses will no longer pass validation"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3557004
change-record-nid: 3557004
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3521184](https://www.drupal.org/node/3521184)

Previously if an email address with a deprecated format was validated by a form the address would pass validation. But mail transfer will usually fail with a warning because servers do not support it. This included addresses with a space character between the local part (username) and '@' symbol, for example "john.doe @example.com".

The `EmailValidator` class has been updated to cause deprecated format addresses to fail validation instead.

*Source: [Deprecated email addresses will no longer pass validation](https://www.drupal.org/node/3557004), a Drupal core change record by [dcam](https://www.drupal.org/user/1791830) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
