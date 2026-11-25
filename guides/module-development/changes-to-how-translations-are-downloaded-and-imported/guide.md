---
name: changes-to-how-translations-are-downloaded-and-imported
title: "Changes to how translations are downloaded and imported during the installer"
description: "Changes to how translations are downloaded and imported during the installer"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3594457
change-record-nid: 3594457
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3590050](https://www.drupal.org/node/3590050)

## Current behavior

Currently, Drupal has 3 different stages/behaviors as to how translation import works for drupal core, with slightly different behavior:

\1. Early installer: Translations are directly parsed and displayed from drupal-VERSION-LANGCODE.po files files. Any version works, but it MUST have a version, or the file will be ignored. Config overrides for locale.settings, such as a different file pattern or whether or not use_source is set to local or remote_and_local is NOT respected, as locale.module is not yet installed at this point. If no file is found for the chosen language, the current version is downloaded. This is specific to drupal core translations, translations for contributed files later on already use the standard locale behavior described in the next step.

\2. Initial translation import in the installer. locale.module is now installed and it's batch operations are partially used to, if necessary, download and import .po files. It attempts to respect the use_source setting, but that is inconsistent and translations are actually always downloaded \*if\* not already present or downloaded by by the early installer. \_install_prepare_import() is used to inject the first drupal\*.LANGCODE.po file even if the version does not match, but default_filename is respected and may result in using a different file than the \_install_prepare_import() attempts to enforce (for example of the pattern does not include a version and drupal.LANGCODE.po exists)

\3. During translation updates on an installed site, if the default_filename was not customized, the the file must always match the version exactly or a new one will be downloaded from drupal.org. If use_source is set to local, then remote translations will not be downloaded.

## Changes

Step 2 and 3 are now unified, the installer specific code is removed and replaced with a standard locale fetch batch. Without configuration changes/overrides, this may download the current translation files already in the installer, but this would also happen as soon the first check for translation updates happens after the installations.

Step 2 in the installer now also correctly respects the use_source setting and will not download translations if they don't exist yet, and additionally, the status check will no longer trigger HEAD requests to verify the modified date of a translation when use_source is set to local.

The following settings.php overrides could be used

```php
$config['locale.settings']['translation']['default_filename'] = '%project.%language.po';
$config['locale.settings']['translation']['use_source'] = 'local';
```

Because the first step in the installer is still disconnected and requires a file with a version, these settings in combination with a drupal.LANGCODE.po file would still download a current translation file that would solely be used in the early installer. Since any version works for this, a second file with any version number matching `\Drupal\Core\StringTranslation\Translator\FileTranslation::getTranslationFilesPattern` could be used or a filename pattern that uses a hardcoded version number, but that would then also apply to all contributed projects.

A later issue might unify the behavior to support overrides and non-versioned po files may be done in a later update.

*Source: [Changes to how translations are downloaded and imported during the installer](https://www.drupal.org/node/3594457), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
