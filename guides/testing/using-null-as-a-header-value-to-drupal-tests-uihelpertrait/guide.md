---
name: using-null-as-a-header-value-to-drupal-tests-uihelpertrait
title: "Using null as a header value to Drupal\\Tests\\UiHelperTrait::drupalGet() is deprecated"
description: "Using null as a header value to Drupal\\Tests\\UiHelperTrait::drupalGet() is deprecated"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3456233
change-record-nid: 3456233
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3440169](https://www.drupal.org/node/3440169)

The various behat/mink\* dependencies have tightened their typing.\
To prevent test failures Drupal will provide a temporary BC-layer, but will warn about deprecations.\
This BC layer will be removed from Drupal 12.

As a result calling following method `Drupal\Tests\UiHelperTrait::drupalGet()` with stated arguments are now deprecated:

`Drupal\Tests\UiHelperTrait::drupalGet('', [], ['If-Modified-Since' => $last_modified, 'If-None-Match' => NULL])` with `NULL` as the header value argument

Instead of `NULL` use `''` (empty string) for eg:\
`Drupal\Tests\UiHelperTrait::drupalGet('', [], ['If-Modified-Since' => $last_modified, 'If-None-Match' => '']);`

*Source: [Using null as a header value to Drupal\Tests\UiHelperTrait::drupalGet() is deprecated](https://www.drupal.org/node/3456233), a Drupal core change record by [pooja_sharma](https://www.drupal.org/user/3716823) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
