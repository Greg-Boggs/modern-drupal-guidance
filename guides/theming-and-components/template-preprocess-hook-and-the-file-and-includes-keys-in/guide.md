---
name: template-preprocess-hook-and-the-file-and-includes-keys-in
title: "template_preprocess_HOOK, and the file and includes keys in hook_theme definitions have been deprecated"
description: "template_preprocess_HOOK, and the file and includes keys in hook_theme definitions have been deprecated"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3549500
change-record-nid: 3549500
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#1177762](https://www.drupal.org/node/1177762)

template_preprocess_HOOK functions have been deprecated. They are defined as initial preprocess callbacks: see [template_preprocess_HOOK are defined as callbacks in the theme hook](https://www.drupal.org/node/3504125).

The file and includes keys on hook_theme have also been deprecated.

These allowed conditionally loading some files which contained relevant functions for the given definition. The only remaining reason to use them was template_preprocess callbacks. Since these have been moved to initial preprocess callbacks these keys are no longer necessary.

hook_theme() definitions that still rely on these keys should remove them when converting their template_preprocess functions to initial preprocess and move the code to a class, which will be automatically loaded. See the linked change record for more information.

*Source: [template_preprocess_HOOK, and the file and includes keys in hook_theme definitions have been deprecated](https://www.drupal.org/node/3549500), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
