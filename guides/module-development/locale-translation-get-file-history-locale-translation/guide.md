---
name: locale-translation-get-file-history-locale-translation
title: "locale_translation_get_file_history(), locale_translation_update_file_history(), and locale_translation_file_history_delete() have been deprecated"
description: "locale_translation_get_file_history(), locale_translation_update_file_history(), and locale_translation_file_history_delete() have been deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3037162
change-record-nid: 3037162
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3037156](https://www.drupal.org/node/3037156)

- `locale_translation_get_file_history()`
- `locale_translation_update_file_history()`
- `locale_translation_file_history_delete()`

have been deprecated and replaced by a new `CurrentImportStateStorage` service.

There is a new `CurrentImportState` value object. This stores:

- project
- langcode
- version
- hash
- timestamp
- last_checked
- type

| Before | After |
| --- | --- |
| `locale_translation_get_file_history()` | No direct replacement, use \Drupal::service(CurrentImportStateStorage::class)->get($project, $langcode) This returns ?CurrentImportState |
| `locale_translation_update_file_history()` | `\Drupal::service(CurrentImportStateStorage::class)->update()` |
| `locale_translation_file_history_delete()` | `\Drupal::service(CurrentImportStateStorage::class)->delete()` |
| `drupal_static_reset('locale_translation_get_file_history')` | `\Drupal::service('cache.memory')->invalidateTags(['locale_current_import'])` |

New methods:\
`\Drupal::service(CurrentImportStateStorage::class)->updateLastChecked`\
`\Drupal::service(CurrentImportStateStorage::class)->getOutdatedImports`

*Source: [locale_translation_get_file_history(), locale_translation_update_file_history(), and locale_translation_file_history_delete() have been deprecated](https://www.drupal.org/node/3037162), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
