---
name: several-functions-in-locale-compare-inc-and
title: "Several functions in locale.compare.inc and LocaleProjectStorageInterface are deprecated"
description: "Several functions in locale.compare.inc and LocaleProjectStorageInterface are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3037033
change-record-nid: 3037033
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3037031](https://www.drupal.org/node/3037031)

Several procedural functions in locale.compare.inc have been deprecated.

- `locale_translation_flush_projects()`
- `locale_translation_build_projects()`
- `locale_translation_project_list()`
- `_locale_translation_prepare_project_list()`
- `locale_translation_default_translation_server()`
- `locale_translation_check_projects()`
- `locale_translation_check_projects_local()`

The service `locale.project` and the associated `LocaleProjectStorage` and `LocaleProjectStorageInterface` have been deprecated

The functionality has been moved to new services `LocaleProjectRepository::class` and `LocaleProjectChecker::class`.

There is a new `LocaleTranslatableProject` value object to assist with tracking project translations.

| Deprecated function | Replacement |
| --- | --- |
| `locale_translation_flush_projects()` | `\Drupal::service(LocaleProjectRepository::class)->deleteAll()` |
| `drupal_static_reset('locale_translation_project_list')` | `$this->memoryCache->delete('locale_project_list')` |
| `locale_translation_build_projects()` | `\Drupal::service(LocaleProjectRepository::class)->buildProjects()` |
| `locale_translation_project_list()` | No replacement |
| `_locale_translation_prepare_project_list()` | No replacement. |
| `locale_translation_default_translation_server()` | There is no replacement |
| `locale_translation_check_projects()` | `\Drupal::service(LocaleProjectChecker::class)->checkProjects()` |
| `locale_translation_check_projects_local()` | `\Drupal::service(LocaleProjectChecker::class)->checkProjectsLocal()` |

**LocaleProjectStorage map**\
There was an extensive amount of duplication of code and very small helper functions that were inlined. The table below identifies which methods were moved and which no longer have a public call.

| Deprecated method | Replacement |
| --- | --- |
| getMultiple | getMultiple |
| getAll | getAll |
| set | set |
| deleteMultiple | deleteMultiple |
| deleteAll | deleteAll |
| resetCache | \Drupal::service('cache.memory')->delete('locale_get_projects') |
| get | No replacement |
| getProjects | No replacement |
| disableAll | No replacement |
| delete | No replacement |
| countProjects | No replacement |
| setMultiple | No replacement |

The alias service and interface do not trigger a deprecation due to: [https://www.drupal.org/project/drupal/issues/3588483](https://www.drupal.org/project/drupal/issues/3588483)

*Source: [Several functions in locale.compare.inc and LocaleProjectStorageInterface are deprecated](https://www.drupal.org/node/3037033), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
