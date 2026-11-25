---
name: all-code-in-locale-translations-inc-has-been-deprecated
title: "All code in locale.translations.inc has been deprecated"
description: "All code in locale.translations.inc has been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3569330
change-record-nid: 3569330
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3569328](https://www.drupal.org/node/3569328)

All of the content of locale.translations.inc have been deprecated.

### New service: LocaleSources

| Before | After |
| --- | --- |
| locale_translation_load_sources | LocaleSource->loadSources |
| locale_translation_build_sources | LocaleSource->buildSources |
| locale_translation_source_check_file | LocaleSource->sourceCheckFile |
| locale_translation_source_build | LocaleSource->sourceBuild |
| locale_translation_build_server_pattern | LocaleSource->buildServerPattern |
| \_locale_translation_file_is_remote | Protected |

### New service LanguageDefaultOptions

This needs to be static where it is called.

| Before | After |
| --- | --- |
| \_locale_translation_default_update_options | \Drupal\locale\LocaleDefaultOptions::updateOptions |

### locale_translation_get_projects

**Important note:** in this CR `locale_translation_get_projects` was moved to `LocaleProjectStorage`\
Before 11.4.0 `LocaleProjectStorage` was deprecated so the replacement was moved. See: [https://www.drupal.org/node/3037033](https://www.drupal.org/node/3037033)

| Before | After |
| --- | --- |
| locale_translation_get_projects | \Drupal::service(LocaleProjectRepository::class)->getMultiple($project_names); |

### Deprecate / remove without replacement

- locale_translation_clear_cache_projects -> replace with local static cache property
- locale_cron_fill_queue -> Logic inlined into LocaleHooks
- \_locale_translation_source_compare ->Logic simplified and inlined into TranslationStatusForm
- LOCALE_TRANSLATION_SOURCE_COMPARE_LT
- LOCALE_TRANSLATION_SOURCE_COMPARE_EQ
- LOCALE_TRANSLATION_SOURCE_COMPARE_GT

*Source: [All code in locale.translations.inc has been deprecated](https://www.drupal.org/node/3569330), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
