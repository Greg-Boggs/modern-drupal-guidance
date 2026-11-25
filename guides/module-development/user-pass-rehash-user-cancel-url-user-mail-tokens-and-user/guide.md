---
name: user-pass-rehash-user-cancel-url-user-mail-tokens-and-user
title: "user_pass_rehash(), user_cancel_url(), user_mail_tokens(), and user_pass_reset_url() are deprecated"
description: "user_pass_rehash(), user_cancel_url(), user_mail_tokens(), and user_pass_reset_url() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3581062
change-record-nid: 3581062
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3581056](https://www.drupal.org/node/3581056)

Functions related to one time authentication are deprecated in Drupal 11.4.0 and removed from Drupal 13.0.0. Use the methods on `\Drupal\user\OneTimeAuthentication` instead.

| Deprecated | Replacement |
| --- | --- |
| user_pass_rehash(): string | \Drupal\user\OneTimeAuthentication::generateHmac(): string |
| user_cancel_url(): string | \Drupal\user\OneTimeAuthentication::generateCancelConfirmUrl(): \Drupal\Core\Url |
| user_pass_reset_url(): string | \Drupal\user\OneTimeAuthentication::generateOneTimeLoginUrl(): \Drupal\Core\Url |
| user_mail_tokens(): string | \Drupal\user\OneTimeAuthentication::tokens(): \Drupal\Core\Url |

---

The following protected helper functions are deprecated in Drupal 11.4.0 and removed from Drupal 12.0.0.

| Deprecated | Replacement |
| --- | --- |
| \Drupal\user\Controller\UserController::validatePathParameters() | \Drupal\user\OneTimeAuthentication::verifyHmac() |
| \Drupal\Core\Command\ServerCommand::getOneTimeLoginUrl() | - |

### Example 1

#### Before

```php
$href = user_cancel_url($account);
```

#### After

```php
$oneTimeAuthentication = \Drupal->service(OneTimeAuthentication::class);
$href = $oneTimeAuthentication->generateCancelConfirmUrl($account)->toString();
```

### Example 2

#### Before

```php
  #[Hook('mail')]
  public function mail($key, &$message, $params): void {
    [...]
    $options = [
      'langcode' => $langcode,
      'callback' => 'user_mail_tokens',
      'clear' => TRUE,
    ];
    $message['body'][] = $token_service->replacePlain($body, $context, $options);
    [...]
  }
```

#### After

```php
  #[Hook('mail')]
  public function mail($key, &$message, $params): void {
    [...]
    $options = [
      'langcode' => $langcode,
      'callback' => \Drupal::service(OneTimeAuthentication::class)->tokens(...),
      'clear' => TRUE,
    ];
    $message['body'][] = $token_service->replacePlain($body, $context, $options);
    [...]
  }
```

*Source: [user_pass_rehash(), user_cancel_url(), user_mail_tokens(), and user_pass_reset_url() are deprecated](https://www.drupal.org/node/3581062), a Drupal core change record by [znerol](https://www.drupal.org/user/63999) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
