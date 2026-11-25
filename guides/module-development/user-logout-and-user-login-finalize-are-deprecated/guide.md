---
name: user-logout-and-user-login-finalize-are-deprecated
title: "user_logout() and user_login_finalize() are deprecated"
description: "user_logout() and user_login_finalize() are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3379194
change-record-nid: 3379194
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2012976](https://www.drupal.org/node/2012976)

`user_logout()` and `user_login_finalize()` are deprecated and replaced by two services with dedicated interfaces:

- `\Drupal\user\LoginFinalizer` (service: `user.login_finalizer`)
- `\Drupal\user\LogoutFinalizer` (service: `user.logout_finalizer`)

| Before | After |
| --- | --- |
| `user_login_finalize($account);` | `$this->loginFinalizer->finalizeLogin($account);` |
| `user_logout();` | `$this->logoutFinalizer->finalizeLogout();` |

*Source: [user_logout() and user_login_finalize() are deprecated](https://www.drupal.org/node/3379194), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
