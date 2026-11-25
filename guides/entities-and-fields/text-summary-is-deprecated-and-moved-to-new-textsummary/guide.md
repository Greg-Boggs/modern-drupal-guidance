---
name: text-summary-is-deprecated-and-moved-to-new-textsummary
title: "text_summary() is deprecated and moved to new TextSummary service"
description: "text_summary() is deprecated and moved to new TextSummary service"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3568389
change-record-nid: 3568389
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3568387](https://www.drupal.org/node/3568387)

The `text_summary` function is deprecated and will be removed in Drupal 13. The functionality has moved to the `TextSummary` service.

**Before**\
`text_summary($filtered_markup, 'neither_filter_enabled', 30);`

**After**

```php
use Drupal\text\TextSummary;
\Drupal::service(TextSummary::class)->generate($filtered_markup, 'neither_filter_enabled', 30);
```

*Source: [text_summary() is deprecated and moved to new TextSummary service](https://www.drupal.org/node/3568389), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
