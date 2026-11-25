---
name: custom-keys-in-session-are-deprecated
title: "Custom keys in $_SESSION are deprecated"
description: "Custom keys in $_SESSION are deprecated"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3518914
change-record-nid: 3518914
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3518527](https://www.drupal.org/node/3518527)

Custom session values stored directly in the `$_SESSION` super global are deprecated. Instead access session attributes via `$request->getSession()->set()` and `$request->getSession->get()`.

### Deprecated:

#### Set a value in the session

```php
$_SESSION['test_key'] = 'test_value';
```

#### Get a value from the session

```php
$value = $_SESSION['test_key'] ?? 'default_value';
```

### Recommended:

#### Set a value in the session

```php
$request->getSession()->set('test_key', 'test_value');
```

#### Get a value from the session

```php
$value = $request->getSession()->get('test_key', 'default_value');
```

*Source: [Custom keys in $\_SESSION are deprecated](https://www.drupal.org/node/3518914), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
