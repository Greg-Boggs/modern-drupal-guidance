---
name: all-batch-related-functions-in-locale-batch-inc-locale-bulk
title: "All batch related functions in locale.batch.inc, locale.bulk.inc and locale.compare.inc have been deprecated"
description: "All batch related functions in locale.batch.inc, locale.bulk.inc and locale.compare.inc have been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3589759
change-record-nid: 3589759
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3581303](https://www.drupal.org/node/3581303)

| Deprecated procedural callback | Replacement |
| --- | --- |
| locale_translation_batch_version_check | \Drupal::service(LocaleFetch::class)->batchVersionCheck() |
| locale_translation_batch_status_check | \Drupal::service(LocaleFetch::class)->batchStatusCheck() |
| locale_translation_batch_fetch_download | \Drupal::service(LocaleFetch::class)->batchDownload() |
| locale_translation_batch_fetch_import | \Drupal::service(LocaleFetch::class)->batchImport() |
| locale_translation_batch_fetch_finished | \Drupal::service(LocaleFetch::class)->batchFinished() |
| \_locale_translation_batch_status_operations | \Drupal::service(LocaleFetch::class)->getStatusOperations() |
| locale_translate_batch_build | \Drupal::service(LocaleImportBatch::class)->buildBatch() |
| locale_translate_batch_import | \Drupal::service(LocaleImportBatch::class)->batchImport() |
| locale_translate_batch_import_save | \Drupal::service(LocaleImportBatch::class)->batchSave() |
| locale_translate_batch_refresh | \Drupal::service(LocaleImportBatch::class)->batchRefresh() |
| locale_translate_batch_finished | \Drupal::service(LocaleImportBatch::class)->batchFinished() |
| locale_config_batch_update_components | \Drupal::service(LocaleConfigBatch::class)->buildBatch() |
| locale_config_batch_build | No replacement it was inlined into LocaleConfigBatch::buildBatch |
| locale_config_batch_update_default_config_langcodes | \Drupal::service(LocaleConfigBatch::class)->batchUpdateDefaultConfigLangcodes() |
| locale_config_batch_update_config_translations | \Drupal::service(LocaleConfigBatch::class)->batchUpdateConfigTranslations() |
| locale_config_batch_finished | \Drupal::service(LocaleConfigBatch::class)->batchFinished() |
| locale_translation_check_projects_batch | \Drupal::service(LocaleProjectChecker::class)->triggerBatch() |
| locale_translation_batch_status_build | No replacement it was inlined into LocaleProjectChecker::batchCheckProjects |
| locale_translation_batch_status_finished | \Drupal::service(LocaleProjectChecker::class)->batchFinished() |

*Source: [All batch related functions in locale.batch.inc, locale.bulk.inc and locale.compare.inc have been deprecated](https://www.drupal.org/node/3589759), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
