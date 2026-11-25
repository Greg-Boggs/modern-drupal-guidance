---
name: drupal-core-releases-will-no-longer-include-tests
title: "Drupal core releases will no longer include tests"
description: "Drupal core releases will no longer include tests"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3618953
change-record-nid: 3618953
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3067979](https://www.drupal.org/node/3067979)

As of Drupal 12.0.0, Drupal core release packages will no longer include tests.

Custom CI pipelines that want to run tests against a tagged release of Drupal core should install with composer --prefer-source first. This can be achieved on specific machines (local development environments, CI), without changes to composer.json by setting the following, per [composer's documentation](https://getcomposer.org/doc/06-config.md#preferred-install).

```php
composer config --global preferred-install.drupal/core source
```

When applying patches against Drupal core with composer, changes to test files should be removed from the patch file so that it continues to apply.

*Source: [Drupal core releases will no longer include tests](https://www.drupal.org/node/3618953), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
