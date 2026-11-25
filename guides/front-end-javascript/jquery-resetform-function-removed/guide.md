---
name: jquery-resetform-function-removed
title: "jQuery().resetForm() function removed"
description: "jQuery().resetForm() function removed"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3613606
change-record-nid: 3613606
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3607794](https://www.drupal.org/node/3607794)

The `resetForm()` jQuery function provided by the `core/jquery.form` library has been removed. There is no replacement.

`jquery.form` contained a potential cross-site scripting (XSS) vulnerability. Since Drupal Core did not use the function it was deleted. You must find a replacement if you are using it in your code. Because of the potential for XSS it is inadvisable to copy the deleted code as it existed in the Core library.

An example of obsolete JavaScript:

```php
jQuery('#foo').resetForm()
```

Note that the `core/jquery.form` library is marked as internal and should not be used by contrib or custom code (see [#3293156: core/jquery.form library deprecated](https://www.drupal.org/node/3293156)).

*Source: [jQuery().resetForm() function removed](https://www.drupal.org/node/3613606), a Drupal core change record by [prudloff](https://www.drupal.org/user/3611858) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
