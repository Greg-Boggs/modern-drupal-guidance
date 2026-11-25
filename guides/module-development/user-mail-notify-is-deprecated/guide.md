---
name: user-mail-notify-is-deprecated
title: "_user_mail_notify() is deprecated"
description: "_user_mail_notify() is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3539363
change-record-nid: 3539363
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3539178](https://www.drupal.org/node/3539178)

The function `_user_mail_notify()` is deprecated. It is replaced by a service, `\Drupal\user\NotificationHandler`'.

It was theoretically possible to invoke `_user_mail_notify()` with a custom value for the `$op` parameter. This functionality is not supported on the user mail handler.

The `NotificationHandler` is marked as `@internal`. Methods on this class are not covered by the [BC policy](https://www.drupal.org/about/core/policies/core-change-policies/bc-policy).

### Mapping of $op parameters to methods

| `$op` parameter to `_user_mail_notify()` | method on `NotificationHandler` |
| --- | --- |
| `register_admin_created` | `sendRegisterAdminCreated()` |
| `register_no_approval_required` | `sendRegisterNoApprovalRequired()` |
| `register_pending_approval` | `sendRegisterPendingApproval()` |
| `password_reset` | `sendPasswordReset()` |
| `status_activated` | `sendStatusActivated()` |
| `status_blocked` | `sendStatusBlocked()` |
| `cancel_confirm` | `sendCancelConfirm()` |
| `status_canceled` | `sendStatusCanceled()` |

### Example

#### Before

```php
// Send account canceled notification if option was checked.
if (!empty($edit['user_cancel_notify'])) {
  _user_mail_notify('status_canceled', $account);
}
$account->delete();
\Drupal::messenger()->addStatus(t('Account %name has been deleted.', ['%name' => $accotDisplayName()]));
```

#### After

```php
// Send account canceled notification if option was checked.
if (!empty($edit['user_cancel_notify'])) {
  \Drupal::service(NotificationHandler::class)->sendStatusCanceled($account);
}
$account->delete();
\Drupal::messenger()->addStatus(t('Account %name has been deleted.', ['%name' => $accotDisplayName()]));
```

Further work being done in [#3578758: Investigate calls to \_user_mail_notify() to identify missing API surface](https://www.drupal.org/project/drupal/issues/3578758)

*Source: [\_user_mail_notify() is deprecated](https://www.drupal.org/node/3539363), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
