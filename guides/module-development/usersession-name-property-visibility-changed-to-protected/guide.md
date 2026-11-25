---
name: usersession-name-property-visibility-changed-to-protected
title: "UserSession name property visibility changed to protected"
description: "UserSession name property visibility changed to protected"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3513877
change-record-nid: 3513877
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3,x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3,x\
Introduced in version: 11.3.0\
Issue links: [#3513856](https://www.drupal.org/node/3513856)

The `UserSession::name` property visibility has been changed to protected.

Custom and contrib code will need to be updated to use the `getAccountName()` method instead.

**Before:**

```php
$userName = $user->name;
```

**After:**

```php
$userName = $user->getAccountName();
```

*Source: [UserSession name property visibility changed to protected](https://www.drupal.org/node/3513877), a Drupal core change record by [danielveza](https://www.drupal.org/user/3362504) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
