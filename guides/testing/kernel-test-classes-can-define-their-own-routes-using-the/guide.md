---
name: kernel-test-classes-can-define-their-own-routes-using-the
title: "Kernel test classes can define their own routes using the Route attribute"
description: "Kernel test classes can define their own routes using the Route attribute"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3605544
change-record-nid: 3605544
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3586832](https://www.drupal.org/node/3586832)

Kernel test classes can provide their own routes with methods using the `Symfony\Component\Routing\Route` attribute. This can be used in conjunction with `drupalGet()` in a test method, so that any routes that are used exclusively for the test can be defined within the test class, without the need code is a separate module.

*Source: [Kernel test classes can define their own routes using the Route attribute](https://www.drupal.org/node/3605544), a Drupal core change record by [godotislate](https://www.drupal.org/user/3483619) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
