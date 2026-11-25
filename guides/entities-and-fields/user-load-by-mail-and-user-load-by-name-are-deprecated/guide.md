---
name: user-load-by-mail-and-user-load-by-name-are-deprecated
title: "user_load_by_mail() and user_load_by_name() are deprecated"
description: "user_load_by_mail() and user_load_by_name() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3555936
change-record-nid: 3555936
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3555670](https://www.drupal.org/node/3555670)

` user_load_by_mail()` and `user_load_by_name()` are deprecated and will be removed in Drupal 13. Load User entities from storage by their properties instead.

Before:

```php
$user = user_load_by_mail($mail);
```

After:

```php
$users = \Drupal::entityTypeManager()->getStorage('user')->loadByProperties(['mail' => $mail]);
$user = reset($users);
```

Before:

```php
$user = user_load_by_name($name);
```

After:

```php
$users = \Drupal::entityTypeManager()->getStorage('user')->loadByProperties(['name' => $name]);
$user = reset($users);
```

*Source: [user_load_by_mail() and user_load_by_name() are deprecated](https://www.drupal.org/node/3555936), a Drupal core change record by [santanu mondal](https://www.drupal.org/user/3853786) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
