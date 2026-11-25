---
name: locale-translation-status-functions-deprecated-in-favor-of
title: "Locale translation status functions deprecated in favor of the LocaleSource service"
description: "Locale translation status functions deprecated in favor of the LocaleSource service"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3591660
change-record-nid: 3591660
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3590050](https://www.drupal.org/node/3590050)

The following functions have been deprecated:

- locale_translation_get_status
- locale_translation_status_save
- locale_translation_status_delete_languages
- locale_translation_status_delete_projects
- locale_translation_clear_status

Translation status was a different concept from sources, which is something that has already been partially refactored into the [LocaleSource service](https://www.drupal.org/node/3569330). The objects were however the same thing, and calls were made into either direction. locale_translation_get_status() called buildSource() and loadSources() called locale_translation_get_status(). All remaining translation status related functions have been deprecated now and merged into the existing LocaleSource service. loadSources() and loadSource() now only load the specific projects that have been requested. They also always return a source for the requested projects/languages, if there is no stored source, one is built automatically.

A source is the information about the import/translation/po file status of a project for a specific language.

Before:

```php
locale_translation_get_status()
```

After:

```php
// All or multiple projects/languages.
\Drupal::service(LocaleSource::class)->loadSources()
// Recommended: Load a specific source for a given project and language combination.
\Drupal::service(LocaleSource::class)->loadSource($project, $langcode)
```

Before:

```php
locale_translation_status_save()
```

After:

```php
\Drupal::service(LocaleSource::class)->saveSource()
```

Before:

```php
locale_translation_status_delete_languages()
```

After:

```php
\Drupal::service(LocaleSource::class)->deleteSourcesByLanguage()
```

Before:

```php
locale_translation_status_delete_projects()
```

After:

```php
\Drupal::service(LocaleSource::class)->deleteSources($projects)
```

Before:

```php
locale_translation_clear_status()
```

After:

```php
\Drupal::service(LocaleSource::class)->clearSources()
```

There is a new `LocaleTranslationSource` value object for managing source operations, it has the same public properties as the previous untyped stdClass objects.

There is a new `\Drupal::service(LocaleSource::class)->updateLastChecked()` and `\Drupal::service(LocaleSource::class)->getLastChecked` for managing the global last checked time, the previous state key is no longer maintained.

Before:

```php
$last_checked = \Drupal::state()->get('locale.translation_last_checked');
```

After:

```php
$last_checked = \Drupal::service(LocaleSource::class)->getLastChecked();
```

*Source: [Locale translation status functions deprecated in favor of the LocaleSource service](https://www.drupal.org/node/3591660), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
