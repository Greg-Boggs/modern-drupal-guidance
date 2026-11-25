---
name: text-with-summary-plugin-is-deprecated
title: "Text with summary plugin is deprecated"
description: "Text with summary plugin is deprecated"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3568381
change-record-nid: 3568381
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3549134](https://www.drupal.org/node/3549134)

The text_with_summary plugins have been deprecated and moved to a new deprecated module 'text_with_summary'. That module will be removed from core in Drupal 12.

If you want to keep using the functionality provided by the text_with_summary pluging, read the recommendations for [Text with Summary](https://www.drupal.org/docs/core-modules-and-themes/deprecated-and-obsolete#s-text-with-summary).

The following classes have moved:

`Drupal\text\Plugin\Field\FieldFormatter\TextSummaryOrTrimmedFormatter` => `Drupal\text_with_summary\Plugin\Field\FieldFormatter\TextSummaryOrTrimmedFormatter`

`Drupal\text\Plugin\Field\FieldType\TextWithSummaryItem` => `Drupal\text_with_summary\Plugin\Field\FieldType\TextWithSummaryItem`

`Drupal\text\Plugin\Field\FieldWidget\TextareaWithSummaryWidget` => `Drupal\text_with_summary\Plugin\Field\FieldWidget\TextareaWithSummaryWidget `

Additionally, `text/drupal.text library` has been moved to `text_with_summary/drupal.text`.

*Source: [Text with summary plugin is deprecated](https://www.drupal.org/node/3568381), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
