---
name: new-strnatcasecmp-function-in-drupal-core-utility
title: "New strnatcasecmp function in Drupal\\Core\\Utility\\NaturalSort"
description: "New strnatcasecmp function in Drupal\\Core\\Utility\\NaturalSort"
drupal-core: ">=11.6"
source-url: https://www.drupal.org/node/3621241
change-record-nid: 3621241
introduced-in-version: "11.6.0"
introduced-in-branch: "11.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.x\
Introduced in version: 11.6.0\
Issue links: [#2265487](https://www.drupal.org/node/2265487)

The new function `Drupal\Core\Utility\NaturalSort::strnatcasecmp()` is a generic sort helper for language-dependent string comparisons using a "natural order" algorithm as drop-in replacement for the PHP function `strnatcasecmp`. If the PHP `intl` extension is installed it uses `Collator::compare()`, otherwise it falls back to `strnatcasecmp()`

Number based strings will also sort in their natural order now as well: e.g. 10 will come after 9.

Replace:\
`strnatcasecmp($a_string, $b_string);`\
With:\
`NaturalSort::strnatcasecmp($a_string, $b_string);`

*Source: [New strnatcasecmp function in Drupal\Core\Utility\NaturalSort](https://www.drupal.org/node/3621241), a Drupal core change record by [sleitner](https://www.drupal.org/user/2466050) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
