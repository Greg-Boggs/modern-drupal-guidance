---
name: default-password-hashing-algorithm-is-now-argon2id
title: "Default password hashing algorithm is now argon2id"
description: "Default password hashing algorithm is now argon2id"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3530196
change-record-nid: 3530196
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3530186](https://www.drupal.org/node/3530186)

The default password hashing algorithm was switched to argon2id in Drupal 12. For the rare case where this is not desirable - or argon2 is not available - it can be switched to the PHP default algorithm (bcrypt) using kernel parameters.

### Find available hashing algorithms

Run this command on your server:

```php
php -r 'echo implode("\n", password_algos()) . "\n";'
```

The output should be something like this:

```php
2y
argon2i
argon2id
```

The value "2y" corresponds to `bcrypt`; "argon2i" and "argon2id" correspond to `argon2`.

### Custom services.yml example

In `settings.php`, look for this line:

```php
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/services.yml';
```

If it is not there, then add it. You can use a different path if you like.

Edit or create the file `services.yml` as specified in `settings.php`. Add two new parameters. In most cases you won't need to add `password.options` as the default options will suffice.

```php
parameters:
  # Can be argon2i, argon2id or 2y (bcrypt). Setting to NULL (~) will use PASSWORD_DEFAULT.
  # See https://www.php.net/password_hash
  password.algorithm: ~ # 👈️ Parameter 1
  # Options passed to password_hash. See https://www.php.net/password_hash
  password.options: [] # 👈️ Parameter 2 - optional
```

By default, Drupal 12.0.0 uses `password.algorithm: argon2id`. Instead of `argon2id` or `~`, you can use any available hashing algorithm. (See the previous section.) If you have particular requirements for password hashing, then you can set `password.options` as needed.

*Source: [Default password hashing algorithm is now argon2id](https://www.drupal.org/node/3530196), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
