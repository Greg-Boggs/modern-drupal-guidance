---
name: a-cancel-method-has-been-added-to-drupal-debounce
title: "A \"cancel\" method has been added to Drupal.debounce"
description: "A \"cancel\" method has been added to Drupal.debounce"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3619513
change-record-nid: 3619513
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3472624](https://www.drupal.org/node/3472624)

If a `wait` time is passed to `Drupal.debounce()`, then at runtime it is possible that between when `debounce()` is called and when the function passed to `debounce` runs, other code makes state changes. This can cause errors when the function is run, if the function is not expecting these changes.

To help avoid this, `debounce` now has a `cancel()` method that will prevent the passed function from being run. To use, store object returned from the `debounce` call as a variable, and then call the `cancel` method on that variable after the state change.

*Source: [A "cancel" method has been added to Drupal.debounce](https://www.drupal.org/node/3619513), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
