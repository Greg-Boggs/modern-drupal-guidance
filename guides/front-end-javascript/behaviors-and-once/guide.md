---
name: behaviors-and-once
description: Attach Drupal JavaScript with Drupal.behaviors and the core/once library so code runs on page load and after AJAX exactly once per element, instead of jQuery.once(), $(document).ready() or document-wide queries.
drupal-core: ">=10.3"
replaces:
  - "jQuery.once() and $(...).once()"
  - "$(document).ready() and DOMContentLoaded handlers in Drupal libraries"
  - "document.querySelectorAll() without once() inside a behavior"
---

# Attach JavaScript with behaviors and `once()`

Drupal runs every registered behavior's `attach(context, settings)` on page load and again whenever new markup is added (AJAX, BigPipe, dialogs), passing the new markup as `context`. Wrap element queries in `once()` from the `core/once` library so each element is processed a single time, however often behaviors run. `jQuery.once` was removed in Drupal 10.0; jQuery itself is optional.

{{ DRUPAL_STATUS() }}

{# Verified: core/core.libraries.yml defines "once" (assets/vendor/once, v1.0.1) and "drupal" at 10.3.0 and 11.4.0; no jquery.once library at 10.0.0. once.remove()/once.filter()/once.find() in assets/vendor/once/once.js. detach(context, settings, trigger) with trigger === 'unload': core/misc/autocomplete.js at 11.4.0. #}

## Implementation

### 1. Declare the library with its dependencies

```yaml
# mymodule.libraries.yml
toggle:
  js:
    js/toggle.js: {}
  dependencies:
    - core/drupal
    - core/once
    # Only if the script reads drupalSettings:
    - core/drupalSettings
```

Add `core/jquery` only if the script uses jQuery.

### 2. Write the behavior

```js
// js/toggle.js
((Drupal, once) => {
  Drupal.behaviors.mymoduleToggle = {
    attach(context, settings) {
      // Query inside context, through once(). The ID must be unique to this
      // behavior and contain no spaces.
      once('mymodule-toggle', '[data-mymodule-toggle]', context).forEach((button) => {
        button.addEventListener('click', () => {
          const target = document.getElementById(button.getAttribute('aria-controls'));
          const expanded = button.getAttribute('aria-expanded') === 'true';
          button.setAttribute('aria-expanded', String(!expanded));
          target.hidden = expanded;
        });
      });
    },
    detach(context, settings, trigger) {
      // Clean up only when markup is removed, not on every serialize.
      if (trigger === 'unload') {
        once.remove('mymodule-toggle', '[data-mymodule-toggle]', context);
      }
    },
  };
})(Drupal, once);
```

### 3. Attach the library where the markup is rendered

```php
$build['#attached']['library'][] = 'mymodule/toggle';
// Optional values for the script, read as settings.mymodule.* in attach().
$build['#attached']['drupalSettings']['mymodule']['speed'] = 200;
```

## Rules

- DO NOT use `$(...).once()`, `jQuery.once()` or `$.fn.once`; they no longer exist.
- DO NOT use `$(document).ready()`, `DOMContentLoaded` or `window.onload`. Behaviors run at the right time, including after AJAX.
- DO query within `context`, not `document`, and always through `once()`.
- DO name behaviors with the module prefix (`Drupal.behaviors.mymoduleToggle`) so they do not overwrite each other.
- DO list `core/drupal` and `core/once` as dependencies; the globals are not guaranteed otherwise.
- With jQuery, wrap the result: `$(once('mymodule-x', '.x', context))`.

## Verify

Load the page, then trigger an AJAX update that re-renders the element: the handler runs once per click, and each processed element has `data-once="mymodule-toggle"`.
