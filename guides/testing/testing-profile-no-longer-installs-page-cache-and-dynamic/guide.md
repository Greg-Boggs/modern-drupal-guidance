---
name: testing-profile-no-longer-installs-page-cache-and-dynamic
title: "Testing profile no longer installs page cache and dynamic page cache"
description: "Testing profile no longer installs page cache and dynamic page cache"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3615554
change-record-nid: 3615554
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3614153](https://www.drupal.org/node/3614153)

The `testing` profile, which is used to install the site under test in browser-based tests, no longer installs the `page_cache` and `dynamic_page_cache` modules. This means that any Functional or FunctionalJavascript tests that rely on those caching layers being in place will either need the module(s) added to the `$modules` property in the test class, or the module(s) installed in individual test method code.

Additionally, this means that tests that uninstalled either of those two modules no longer need to do so.

*Source: [Testing profile no longer installs page cache and dynamic page cache](https://www.drupal.org/node/3615554), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
