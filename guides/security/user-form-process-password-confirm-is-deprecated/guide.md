---
name: user-form-process-password-confirm-is-deprecated
title: "user_form_process_password_confirm() is deprecated"
description: "user_form_process_password_confirm() is deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3582107
change-record-nid: 3582107
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3582106](https://www.drupal.org/node/3582106)

`user_form_process_password_confirm()` is deprecated in and is removed from Drupal 13. Use `UserThemeHooks::processPasswordConfirm()` instead.

### Example

#### Before

```php
  #[Hook('element_info_alter')]
  public function elementInfoAlter(array &$types): void {
    if (isset($types['password_confirm'])) {
      $types['password_confirm']['#process'][] = 'user_form_process_password_confirm';
    }
  }
```

#### After

```php
  #[Hook('element_info_alter')]
  public function elementInfoAlter(array &$types): void {
    if (isset($types['password_confirm'])) {
      $types['password_confirm']['#process'][] = UserHooks::class . ':processPasswordConfirm';
    }
  }
```

*Source: [user_form_process_password_confirm() is deprecated](https://www.drupal.org/node/3582107), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
