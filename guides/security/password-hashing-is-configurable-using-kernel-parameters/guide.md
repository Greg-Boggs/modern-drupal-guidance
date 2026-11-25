---
name: password-hashing-is-configurable-using-kernel-parameters
title: "Password hashing is configurable using kernel parameters"
description: "Password hashing is configurable using kernel parameters"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3581980
change-record-nid: 3581980
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3581966](https://www.drupal.org/node/3581966)

The password hashing algorithm and options can be changed using kernel parameters. These parameters are passed to [password_hash()](https://php.net/password_hash) whenever a password is created or changed. The algorithm parameter defaults to `null` and the options parameter to `[]` (empty array).

Developers may change the algorithm used via custom `services.yml` file loaded via `settings.php`.

### Custom services.yml example

If you have an existing `services.yml` file in your sites folder (e.g.` sites/default/files/services.yml`),\
\
you can simply add two new parameters. In most cases you won't need to add `password.options` as the default options will suffice.

```php
parameters:
  # Can be argon2i, argon2id or 2y
  password.algorithm: argon2id # 👈️ Parameter 1
  # See https://www.php.net/password_hash
  password.options: [] # 👈️ Parameter 2 - optional
```

If you don't have an existing `services.yml` file, you can create one and load it by adding this to your `settings.php`

```php
// Add to your settings.php - use the path of the file you created.
$settings['container_yamls'][] = DRUPAL_ROOT . '/sites/default/services.yml';
```

### Drupal 12

Default password hashing algorithm is [argon2id in Drupal 12](https://www.drupal.org/node/3530196/).

### Forwards compatibility layer

Site owners wishing to take advantage of this functionality before Drupal 11.4 is released can install the 3.0.0 series of the [PHP Password](https://www.drupal.org/project/php_password) contributed module. It provides a forward compatibility layer for this functionality.

*Source: [Password hashing is configurable using kernel parameters](https://www.drupal.org/node/3581980), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
