---
name: several-underscore-locale-functions-have-been-deprecated
title: "Several underscore locale functions have been deprecated"
description: "Several underscore locale functions have been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3619103
change-record-nid: 3619103
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3618358](https://www.drupal.org/node/3618358)

The following functions have been deprecated:

- `_locale_refresh_translations()`
- `_locale_refresh_configuration()`
- `_locale_strip_quotes()`
- `_locale_parse_js_file`
- `_locale_invalidate_js()`
- `_locale_rebuild_js()`

The following functions have no replacement:

- `_locale_refresh_configuration()`
- `_locale_strip_quotes()`

The following functions have a replacement:

- Before: `_locale_refresh_translations()`\
  After: `\Drupal::service(Drupal\locale\LocaleJs)->refreshTranslations()`
- Before: `_locale_invalidate_js()`\
  After: `\Drupal::service(Drupal\locale\LocaleJs)->invalidate()`

The following functions have a replacement, but they are only public for testing purposes. They are marked as internal and can be changed or removed at any time in the future:

- Before: `_locale_parse_js_file()`\
  After: `\Drupal::service(Drupal\locale\LocaleJs)->parseJsFile()`
- Before: `_locale_rebuild_js()`\
  After: `\Drupal::service(Drupal\locale\LocaleJs)->rebuild()`

*Source: [Several underscore locale functions have been deprecated](https://www.drupal.org/node/3619103), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
