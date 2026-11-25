---
name: csrf-token-validation-with-the-rest-key-is-deprecated-in
title: "CSRF token validation with the 'rest' key is deprecated in Drupal 11.4.0 and removed in Drupal 12.0.0"
description: "CSRF token validation with the 'rest' key is deprecated in Drupal 11.4.0 and removed in Drupal 12.0.0"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3591939
change-record-nid: 3591939
introduced-in-version: "12.0.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 12.0.0\
Issue links: [#3585891](https://www.drupal.org/node/3585891)

### What changed

In Drupal 8, the `CsrfRequestHeaderAccessCheck::access()` method validated incoming `X-CSRF-Token` request headers against two keys: the new `CsrfRequestHeaderAccessCheck::TOKEN_KEY` (`"X-CSRF-Token request header"`) and the legacy `'rest'` key. The legacy key was kept as a fallback to avoid breaking sessions that were active during an upgrade from Drupal 8 to Drupal 9.

Starting in **Drupal 11.4**, accepting a CSRF token generated with the `'rest'` key triggers a4\
`E_USER_DEPRECATED` notice. Access is still granted in 11.x for backwards compatibility. The fallback will be\
**removed entirely in Drupal 12.0.0**.

Additionally, the login endpoints in `RestAuthenticationController` and `UserAuthenticationController` now generate the CSRF token using `CsrfRequestHeaderAccessCheck::TOKEN_KEY` instead of the hardcoded `'rest'` string.

### Before (Drupal &lt; 11.4)

`CsrfRequestHeaderAccessCheck::access()` accepted tokens from either key:

```php
if (!$this->csrfToken->validate($csrf_token, self::TOKEN_KEY)
  && !$this->csrfToken->validate($csrf_token, 'rest')) {
  return AccessResult::forbidden()
    ->setReason('X-CSRF-Token request header is invalid')
    ->setCacheMaxAge(0);
}
```

Login endpoints returned tokens generated with the `'rest'` key:

```php
$response_data['csrf_token'] = $this->csrfToken->get('rest');
```

### After (Drupal 11.4+)

Tokens generated with `'rest'` trigger a deprecation notice; the request is still allowed in 11.x:

```php
if (!$this->csrfToken->validate($csrf_token, self::TOKEN_KEY)) {
  if ($this->csrfToken->validate($csrf_token, 'rest')) {
    @trigger_error(
      "Validating CSRF tokens with the 'rest' key is deprecated in drupal:11.4.0 and is removed from drupal:12.0.0. Sessions
created before the upgrade to Drupal 9 are no longer supported. See https://www.drupal.org/project/drupal/issues/3585891",
      E_USER_DEPRECATED
    );
  }
  else {
    return AccessResult::forbidden()
      ->setReason('X-CSRF-Token request header is invalid')
      ->setCacheMaxAge(0);
  }
}
```

Login endpoints now return tokens generated with `TOKEN_KEY`:

```php
$response_data['csrf_token'] = $this->csrfToken->get(CsrfRequestHeaderAccessCheck::TOKEN_KEY);
```

### What you need to update

If your module generates CSRF tokens with the `'rest'` key for REST or user authentication, replace:

```php
// Before.
\Drupal::csrfToken()->get('rest');

// After.
use Drupal\Core\Access\CsrfRequestHeaderAccessCheck;
\Drupal::csrfToken()->get(CsrfRequestHeaderAccessCheck::TOKEN_KEY);
```

Sessions created before an upgrade to Drupal 9 are no longer supported. Any client holding a token generated with the old\
`'rest'` key must log in again to obtain a new token.

*Source: [CSRF token validation with the 'rest' key is deprecated in Drupal 11.4.0 and removed in Drupal 12.0.0](https://www.drupal.org/node/3591939), a Drupal core change record by [macsim](https://www.drupal.org/user/2664025) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
