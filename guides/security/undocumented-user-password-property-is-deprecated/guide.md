---
name: undocumented-user-password-property-is-deprecated
title: "Undocumented User::$password property is deprecated"
description: "Undocumented User::$password property is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3569185
change-record-nid: 3569185
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2648272](https://www.drupal.org/node/2648272)

RegisterForm is adding an undocumented password property on the `$account` object.\
Accessing this property is deprecated and the property will be removed in Drupal 12.

Accessing this property will now trigger a deprecation:

```php
$password = $account->password;
```

*Source: [Undocumented User::$password property is deprecated](https://www.drupal.org/node/3569185), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
