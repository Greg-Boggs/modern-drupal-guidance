---
name: the-allow-authorize-operations-setting-is-deprecated
title: "The 'allow_authorize_operations' setting is deprecated"
description: "The 'allow_authorize_operations' setting is deprecated"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3571399
change-record-nid: 3571399
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3522327](https://www.drupal.org/node/3522327), [#3417136](https://www.drupal.org/node/3417136), [#3502973](https://www.drupal.org/node/3502973)

Although the user interface for adding or updating code on a Drupal site via authorize.php and the legacy "Update Manager" was all removed by Drupal 11.2.0, `allow_authorize_operations` was still allowed in settings files.

Starting with Drupal 12.0.0, this setting is deprecated, and should be removed from `settings.php`, `settings.local.php` or equivalent.

*Source: [The 'allow_authorize_operations' setting is deprecated](https://www.drupal.org/node/3571399), a Drupal core change record by [dww](https://www.drupal.org/user/46549) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
