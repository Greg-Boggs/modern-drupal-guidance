---
name: drupal-no-longer-collects-legacy-hooks-outside-of-the-main
title: "Drupal no longer collects legacy hooks outside of the main extension file"
description: "Drupal no longer collects legacy hooks outside of the main extension file"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3613767
change-record-nid: 3613767
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3610009](https://www.drupal.org/node/3610009), [#3571067](https://www.drupal.org/node/3571067)

Starting in Drupal 12 procedural (legacy) hooks are only collected in the main .module, .theme and theme-settings.php files for a given extension.

Support for automatically loading include files through hook_hook_info has already been removed in Drupal 12, see Includes for hook_hook_info implementations have been deprecated.

However, to support hooks in explicitly included files, these files were initially still parsed and possible hook functions were discovered and invoked. This lead to confusing errors and inconsistent behavior, and support for these include files has now been fully removed, these functions will be silently ignored and not invoked, even if included at runtime.

If the extension has procedural hooks it is recommended to convert them to OOP.

If you do not convert the hooks they must be moved to the main extension file.

Legacy hooks that have been converted to OOP and marked with `#[LegacyHook]` may remain in include files.

*Source: [Drupal no longer collects legacy hooks outside of the main extension file](https://www.drupal.org/node/3613767), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
