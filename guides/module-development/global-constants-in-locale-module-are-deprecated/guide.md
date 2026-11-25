---
name: global-constants-in-locale-module-are-deprecated
title: "Global constants in locale module are deprecated"
description: "Global constants in locale module are deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3568156
change-record-nid: 3568156
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#2831617](https://www.drupal.org/node/2831617)

Global constants from Local module are deprecated and replaced according to the following table:

`LocaleTranslationSource` now has three helpers:\
`getType` will return the SourceType enum.\
`getFile` will return the file for the current type.\
`isUpdateAvailable` returns true if the type is local or current.

| Deprecated constant | Replaced by |
| --- | --- |
| LOCALE_JS_STRING | moved as local variable to LocaleJs::parseJsFile() |
| LOCALE_JS_OBJECT | moved as local variable to LocaleJs::parseJsFile() |
| LOCALE_JS_OBJECT_CONTEXT | moved as local variable to LocaleJs::parseJsFile() |
| LOCALE_NOT_CUSTOMIZED | moved to LocaleDefaultOptions::NOT_CUSTOMIZED |
| LOCALE_CUSTOMIZED | moved to LocaleDefaultOptions::CUSTOMIZED |
| LOCALE_TRANSLATION_USE_SOURCE_LOCAL | \Drupal\locale\Model\TranslationUpdateMode::Local |
| LOCALE_TRANSLATION_USE_SOURCE_REMOTE_AND_LOCAL | \Drupal\locale\Model\TranslationUpdateMode::RemoteAndLocal |
| LOCALE_TRANSLATION_STATUS_TTL | inlined in TranslationStatusForm |
| LOCALE_TRANSLATION_OVERWRITE_ALL | \Drupal\locale\Model\Overwrite::All |
| LOCALE_TRANSLATION_OVERWRITE_NON_CUSTOMIZED | \Drupal\locale\Model\Overwrite::NonCustomized |
| LOCALE_TRANSLATION_OVERWRITE_NONE | \Drupal\locale\Model\Overwrite::None |
| LOCALE_TRANSLATION_REMOTE | \Drupal\locale\Model\SourceType::Remote |
| LOCALE_TRANSLATION_LOCAL | \Drupal\locale\Model\SourceType::Local |
| LOCALE_TRANSLATION_CURRENT | \Drupal\locale\Model\SourceType::Current |

*Source: [Global constants in locale module are deprecated](https://www.drupal.org/node/3568156), a Drupal core change record by [claudiu.cristea](https://www.drupal.org/user/56348) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
