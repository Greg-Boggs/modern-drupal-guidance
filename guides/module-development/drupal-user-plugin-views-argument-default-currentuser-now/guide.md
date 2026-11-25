---
name: drupal-user-plugin-views-argument-default-currentuser-now
title: "\\Drupal\\user\\Plugin\\views\\argument_default\\CurrentUser now requires the AccountProxyInterface"
description: "\\Drupal\\user\\Plugin\\views\\argument_default\\CurrentUser now requires the AccountProxyInterface"
drupal-core: ">=11.2"
source-url: https://www.drupal.org/node/3347878
change-record-nid: 3347878
introduced-in-version: "11.2.0"
introduced-in-branch: "11.2.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.2.x\
Introduced in version: 11.2.0\
Issue links: [#3039354](https://www.drupal.org/node/3039354)

Class `\Drupal\user\Plugin\views\argument_default\CurrentUser` now requires the `AccountProxyInterface` in its constructor.

Any class extending this class needs to update its constructor to match.

*Source: [\Drupal\user\Plugin\views\argument_default\CurrentUser now requires the AccountProxyInterface](https://www.drupal.org/node/3347878), a Drupal core change record by [krzysztof domański](https://www.drupal.org/user/3572982) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
