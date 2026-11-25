---
name: value-callback-now-resolved-through-the-callable-resolver
title: "#value_callback now resolved through the callable resolver"
description: "#value_callback now resolved through the callable resolver"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3618727
change-record-nid: 3618727
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3616645](https://www.drupal.org/node/3616645)

`#value_callback` on form elements is now resolved with `CallableResolver::getCallableFromDefinition()`, matching `#process`, `#after_build`, and `#submit`. It accepts service notation (`my.service:method`) in addition to static methods, `ClassName::method`, and array callables.

**Note**: Previously, an invalid or unresolvable `#value_callback` was silently ignored and Drupal fell back to the element's default value callback. It now throws `\InvalidArgumentException` when the definition cannot be resolved. A form with a broken `#value_callback` that previously rendered (with the wrong fallback behavior) will now fail with an exception instead. This brings it inline with other callback types.

*Source: [#value_callback now resolved through the callable resolver](https://www.drupal.org/node/3618727), a Drupal core change record by [kim.pepper](https://www.drupal.org/user/370574) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
