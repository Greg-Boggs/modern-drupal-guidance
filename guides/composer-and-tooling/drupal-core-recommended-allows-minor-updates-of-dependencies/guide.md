---
name: drupal-core-recommended-allows-minor-updates-of-dependencies
title: "drupal/core-recommended allows minor updates of dependencies"
description: "drupal/core-recommended allows minor updates of dependencies"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3601304
change-record-nid: 3601304
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3600889](https://www.drupal.org/node/3600889)

`drupal/core-recommended` no longer pins versions of the following dependencies of Drupal core. This means that sites will be able to apply security updates for these dependencies immediately upon release (as long as they do not require a new major version).

Since these dependencies may *not* have been tested with Drupal core yet, site owners should ensure adequate quality assurance (QA) occurs before these are deployed to production.

- guzzlehttp/guzzle
- guzzlehttp/promises
- guzzlehttp/psr7
- symfony/polyfill-ctype
- symfony/polyfill-iconv
- symfony/polyfill-intl-grapheme
- symfony/polyfill-intl-idn
- symfony/polyfill-intl-normalizer
- symfony/polyfill-mbstring
- symfony/polyfill-php86
- twig/html-extra
- twig/twig

Previously, `drupal/core-recommended` pinned versions of these dependencies to minor versions, to ensure that a new minor version of a dependency, which can include unintended or 'internal' API changes, would not be installed until it had gone through Drupal core's testing and release process.

Since [Composer 2.9](https://blog.packagist.com/composer-2-9/), if a dependency issues a security release which is only available in a new minor version, composer actively blocks any installs or updates until the user either changes the version constraint, aliases, or allow-lists the affected version.

Simultaneously, several of Drupal core's dependencies have had security releases only available in new minor versions. The combination of these security release policies and composer's new behavior has meant that site using `drupal/core-recommended` could not update immediately. They could only update after a new release of Drupal core that included updating the constraints for `drupal/core-recommended` to new minor for the affected dependencies.

To mitigate this, `drupal/core-recommended` no longer constrains dependencies for the dependencies\
that recently made security releases on a new minor release. Instead `drupal/core-recommended` will have the same version constraints as `drupal/core` for the dependencies listed above.

Remember, site owners should ensure adequate quality assurance (QA) occurs before these are deployed to production.

*Source: [drupal/core-recommended allows minor updates of dependencies](https://www.drupal.org/node/3601304), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
