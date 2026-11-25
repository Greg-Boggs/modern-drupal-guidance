---
name: new-localefile-and-localefilemanager
title: "New LocaleFile and LocaleFileManager"
description: "New LocaleFile and LocaleFileManager"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3577675
change-record-nid: 3577675
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3577671](https://www.drupal.org/node/3577671)

Several functions related to locale file management have been deprecated and replaced with the LocaleFile value object and LocaleFileManager service.

**Before**\
`locale_translation_download_source($source_file, $directory)`\
**After**\
`\Drupal::service(LocaleFileManager::class)->downloadTranslationSource($source_file, $directory)'temporary://') `

**Before**\
`locale_translate_get_interface_translation_files($projects, $langcodes)`\
**After**

```php
\Drupal::service(LocaleFileManager::class)
->getInterfaceTranslationFiles($projects, $langcodes)
```

**Before**\
`locale_translate_file_attach_properties($file, $options)`\
**After**\
`LocaleFile::createFromPath($filename, $filepath, $options['langcode'])`

**Before**\
`locale_translate_delete_translation_files($projects, $langcodes)`\
**After**\
`\Drupal::service(LocaleFileManager::class)->deleteTranslationFiles($projects, $langcodes)`

**Before**\
`locale_translation_http_check($uri)`\
**After**\
`\Drupal::service(LocaleFileManager::class)->checkRemoteFileStatus($uri)`

**Before**\
`locale_translate_file_create($filename, $filepath)`\
**After**\
`new LocaleFile($filepath, basename($filepath), $hash, filemtime($filepath))`

There is a new `RemoteFileInfo` value object to track `location`, `lastModified` and `status`.

There is a new `RemoteFileStatus` enum to track the statuses of remote files with the following options.

- Success
- Error
- Missing

*Source: [New LocaleFile and LocaleFileManager](https://www.drupal.org/node/3577675), a Drupal core change record by [nicxvan](https://www.drupal.org/user/531480) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
