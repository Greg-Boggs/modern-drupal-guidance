---
name: locale-get-plural-is-deprecated-replaced-by
title: "locale_get_plural() is deprecated, replaced by PluralIndexInterface service"
description: "locale_get_plural() is deprecated, replaced by PluralIndexInterface service"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3590542
change-record-nid: 3590542
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2660338](https://www.drupal.org/node/2660338)

The function` locale_get_plural()` has been deprecated.\
There is no replacement.

`TranslationInterface` now has a method `selectPluralForm`.\
This is used internally to get the correct plural form for a given language.

*Source: [locale_get_plural() is deprecated, replaced by PluralIndexInterface service](https://www.drupal.org/node/3590542), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
