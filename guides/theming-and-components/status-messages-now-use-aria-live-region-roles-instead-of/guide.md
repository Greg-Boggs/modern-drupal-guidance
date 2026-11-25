---
name: status-messages-now-use-aria-live-region-roles-instead-of
title: "Status messages now use ARIA live region roles instead of the contentinfo landmark"
description: "Status messages now use ARIA live region roles instead of the contentinfo landmark"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3614882
change-record-nid: 3614882
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3587678](https://www.drupal.org/node/3587678)

Status messages rendered by `status-messages.html.twig` previously wrapped each message-type block in `role="contentinfo"`, and additionally wrapped the content of `error` messages in an inner `<div role="alert">`.

The `contentinfo` landmark is reserved for page footer content. Emitting it on every message block caused three accessibility violations: the page gained a duplicate `contentinfo` landmark (axe `landmark-no-duplicate-contentinfo`), that landmark was nested inside another landmark, and pages showing more than one message type produced multiple indistinguishable `contentinfo` landmarks (axe `landmark-unique`, WCAG 1.3.6).

Status messages are notifications, not page-level landmarks. Each message block now exposes an ARIA live region role instead:

- `role="alert"` for `error` and `warning` messages (assertive)
- `role="status"` for all other message types (polite)

The now-redundant inner `role="alert"` wrapper has been removed, because the outer element is itself a live region. In Olivero, the equivalent `role="alert"` on `.messages__container` has been removed for the same reason.

This also aligns Twig-rendered messages with `Drupal.theme.message()` in `core/misc/message.js`, which already used this exact role mapping for messages added via `Drupal.Message().add()`. Server-rendered and JavaScript-added messages are now consistent.

### Before

```php
<div data-drupal-messages>
  <div role="contentinfo" aria-label="Status message">
    <h2 class="visually-hidden">Status message</h2>
    A status message
  </div>
  <div role="contentinfo" aria-label="Error message">
    <div role="alert">
      <h2 class="visually-hidden">Error message</h2>
      An error message
    </div>
  </div>
</div>
```

### After

```php
<div data-drupal-messages>
  <div role="status" aria-label="Status message">
    <h2 class="visually-hidden">Status message</h2>
    A status message
  </div>
  <div role="alert" aria-label="Error message">
    <h2 class="visually-hidden">Error message</h2>
    An error message
  </div>
</div>
```

Note that the visually hidden heading now sits *inside* the live region for errors and warnings, so screen readers announce "Error message" before the message text.

### Template change

Before:

```php
<div role="contentinfo" aria-label="{{ status_headings[type] }}"{{ attributes|without('role', 'aria-label') }}>
  {% if type == 'error' %}
    <div role="alert">
  {% endif %}
  ...
  {% if type == 'error' %}
    </div>
  {% endif %}
</div>
```

After:

```php
<div role="{{ type in ['error', 'warning'] ? 'alert' : 'status' }}" aria-label="{{ status_headings[type] }}"{{ attributes|without('role', 'aria-label') }}>
  ...
</div>
```

### Role mapping

| Message type | Before | After |
| --- | --- | --- |
| `error` | `contentinfo` + inner `alert` | `alert` |
| `warning` | `contentinfo` | `alert` |
| `status` | `contentinfo` | `status` |
| any custom type | `contentinfo` | `status` |

### Templates updated

- `core/modules/system/templates/status-messages.html.twig`
- `core/themes/starterkit_theme/templates/misc/status-messages.html.twig`
- `core/themes/claro/templates/misc/status-messages.html.twig`
- `core/themes/default_admin/templates/misc/status-messages.html.twig`
- `core/themes/olivero/templates/misc/status-messages.html.twig`
- `core/profiles/demo_umami/themes/umami/templates/components/messages/status-messages.html.twig` (documentation only - this template already used the correct pattern)

### Who is affected

**Themes overriding `status-messages.html.twig`.** Any custom or contributed theme that copied a core version of this template still emits `role="contentinfo"` and will continue to trigger the accessibility violations above. Re-sync your override with the updated core template.

**Code that selects status messages by role.** CSS, JavaScript, and automated tests that target `[role="contentinfo"]` to find status messages will no longer match. Several core tests required updating for exactly this reason.

Update such selectors as follows:

```php
// Before
$this->assertSession()->elementTextContains('xpath', "//div[@role='contentinfo' and h2[text()='Status message']]", 'Module Filter has been installed.');

// After
$this->assertSession()->elementTextContains('xpath', "//div[@role='status' and h2[text()='Status message']]", 'Module Filter has been installed.');
```

If you need to match any message type regardless of severity, prefer a role-independent selector such as `[data-drupal-messages]`, or match both roles:

```php
// Matches all message types
'//div[@data-drupal-messages]//div[@role="status" or @role="alert"]'
```

**Screen reader users will notice a behavior change for warnings.** `warning` messages are now assertive live regions and will interrupt the current announcement, where previously only `error` messages were announced assertively.

*Source: [Status messages now use ARIA live region roles instead of the contentinfo landmark](https://www.drupal.org/node/3614882), a Drupal core change record by [jurgenhaas](https://www.drupal.org/user/168924) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
