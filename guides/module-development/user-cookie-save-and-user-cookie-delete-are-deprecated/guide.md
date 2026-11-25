---
name: user-cookie-save-and-user-cookie-delete-are-deprecated
title: "user_cookie_save() and user_cookie_delete() are deprecated"
description: "user_cookie_save() and user_cookie_delete() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3581570
change-record-nid: 3581570
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3581569](https://www.drupal.org/node/3581569)

The functions `user_cookie_save()` and `user_cookie_delete()` are deprecated. Use the `setCookie()` and `clearCookie()` methods on the Symfony `Response::headers` instead.

### Example

#### Before

```php
class MyController extends ControllerBase {

  public function compactPage($mode) {
    user_cookie_save(['admin_compact_mode' => ($mode == 'on')]);
    return $this->redirect('<front>');
  }

}
```

#### After

```php
class MyController extends ControllerBase {

  public function compactPage($mode) {
    $response = $this->redirect('<front>');
    if ($mode === 'on') {
      $response->headers->setCookie(new Cookie('Drupal.visitor.admin_compact_mode', '1', $this->time->getRequestTime() + 31536000));
    }
    else {
      $response->headers->clearCookie('Drupal.visitor.admin_compact_mode');
    }
    return $response;
  }

}
```

*Source: [user_cookie_save() and user_cookie_delete() are deprecated](https://www.drupal.org/node/3581570), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
