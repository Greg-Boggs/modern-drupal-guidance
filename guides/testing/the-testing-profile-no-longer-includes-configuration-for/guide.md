---
name: the-testing-profile-no-longer-includes-configuration-for
title: "The 'testing' profile no longer includes configuration for locale modules or 'body_field'"
description: "The 'testing' profile no longer includes configuration for locale modules or 'body_field'"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3615566
change-record-nid: 3615566
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3614401](https://www.drupal.org/node/3614401)

The 'testing' install profile no longer includes default configuration for locale module, or a default body field.

Tests that rely on the locale default configuration can switch to using the `testing_locale` install profile.

Tests that rely on the body field being created can install the new `body_field` testing module that includes the same default configuration.

*Source: [The 'testing' profile no longer includes configuration for locale modules or 'body_field'](https://www.drupal.org/node/3615566), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
