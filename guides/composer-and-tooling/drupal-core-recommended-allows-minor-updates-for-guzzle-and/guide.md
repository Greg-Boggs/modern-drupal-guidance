---
name: drupal-core-recommended-allows-minor-updates-for-guzzle-and
title: "drupal/core-recommended allows minor updates for Guzzle and Twig"
description: "drupal/core-recommended allows minor updates for Guzzle and Twig"
drupal-core: "^11.3.17 || >=11.4"
source-url: https://www.drupal.org/node/3613159
change-record-nid: 3613159
introduced-in-version: "11.4.0, 11.3.17, 10.6.15"
introduced-in-branch: "10.6.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 10.6.x\
Introduced in version: 11.4.0, 11.3.17, 10.6.15\
Issue links: [#3612448](https://www.drupal.org/node/3612448)

Beginning in Drupal 10.6.15 and 11.3.17 (including 11.4.0 and above), the `drupal/core-recommended` metapackage allows minor-level updates for the Guzzle and Twig dependencies. This means that site owners using `drupal/core-recommended` can now install most Composer dependency security updates themselves, without needing to wait for an upstream release of Drupal core that updates the affected package.

Instructions are available for [updating Drupal core with composer](https://www.drupal.org/docs/updating-drupal/updating-drupal-core-via-composer).

We are making this change because both Twig and Guzzle have shifted to a high frequency of minor releases, and often only support their latest minor release for security updates. When this happens, security releases of these projects cannot be applied to a Drupal site until the constraint in `core-recommended` is updated.

### Handling conflicts with upstream updates

An upstream Composer dependency's update may introduce a regression for Drupal sites. When this happens, Drupal core will usually declare a conflict with the affected package version. However, these changes might not be immediately available in a core release. Site owners should test their updates before deploying.

If a dependency update does cause a regression, site owners can also add a top-level requirement for the known-good version. For example, if a site encountered regressions with `twig/twig` 3.29, but 3.28 worked appropriately, the site owner can run:

```php
composer require twig/twig 3.28
```

Then, if a later update in 3.30 resolved the issue, the site could run:

```php
composer remove --no-update twig/twig
composer update twig/twig
```

*Source: [drupal/core-recommended allows minor updates for Guzzle and Twig](https://www.drupal.org/node/3613159), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
