---
name: several-user-functions-have-been-deprecated
title: "Several user functions have been deprecated."
description: "Several user functions have been deprecated."
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3620934
change-record-nid: 3620934
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3620912](https://www.drupal.org/node/3620912)

The following functions have been deprecated:

- `user_cancel`
- `user_cancel_methods`
- `_user_cancel`
- `_user_cancel_session_regenerate`

There is a new `AccountCancellation` service.\
**Before**\
`user_cancel()`

**After**\
`\Drupal::service(AccountCancellation::class)->cancel($edit, $uid, $method)`

**Before**\
`user_cancel_methods()`

**After**\
`\Drupal::service(AccountCancellation::class)->cancelMethods()`

The replacements for `_user_cancel` and `_user_cancel_session_regenerate` are batch callbacks and should not be called directly.

*Source: [Several user functions have been deprecated.](https://www.drupal.org/node/3620934), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
