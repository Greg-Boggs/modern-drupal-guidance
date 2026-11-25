---
name: several-locale-functions-have-been-deprecated
title: "Several locale functions have been deprecated"
description: "Several locale functions have been deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3616293
change-record-nid: 3616293
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3616277](https://www.drupal.org/node/3616277)

The following functions have been deprecated:

- locale_translation_use_remote_source
- locale_string_is_safe
- locale_translatable_language_list
- locale_js_translate
- locale_translation_language_table
- locale_is_translatable

`locale_translation_use_remote_source` has no replacement, the logic is now inline.\
`locale_translation_language_table` has no replacement, it was moved to a helper on TranslationStatusForm

Two functions have been moved to a new class: Drupal\locale\LocaleLanguages\
**Before**\
`locale_translatable_language_list();`\
**After**\
`\Drupal::service(LocaleLanguages::class)->getTranslatableLanguages();`\
**Before**\
`locale_is_translatable($langcode);`\
**After**\
`\Drupal::service(LocaleLanguages::class)->isTranslatable($langcode);`

locale_js_translate has been moved to a new class: Drupal\locale\LocaleJs\
**Before**\
`locale_js_translate($files, $language_interface);`\
**After**\
`\Drupal::service(LocaleJs::class)->jsTranslate($files, $language_interface);`

locale_string_is_safe has been moved to a new class: Drupal\locale\LocaleXss\
**Before**\
`locale_string_is_safe($string);`\
**After**\
`LocaleXss::stringIsSafe($string);`

*Source: [Several locale functions have been deprecated](https://www.drupal.org/node/3616293), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
