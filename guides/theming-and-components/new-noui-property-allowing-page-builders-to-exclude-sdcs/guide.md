---
name: new-noui-property-allowing-page-builders-to-exclude-sdcs
title: "New noUi property allowing page builders to exclude SDCs"
description: "New noUi property allowing page builders to exclude SDCs"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3542594
change-record-nid: 3542594
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3535958](https://www.drupal.org/node/3535958)

A new **noUi** property has been added to Single-Directory Components (SDC) YAML schema definitions, to allow exclusions of specific SDC's from page builders (e.g. [Drupal Canvas](https://www.drupal.org/project/canvas) or [Display Builder](https://www.drupal.org/project/display_builder)). Take into account that respecting this flag is each page builder choice.

Details:

- Location: Applicable to \*.component.yml files for SDCs.
- Default behavior: noUi **default to false** (visible in UI).

Usage Example:

```php
Component excluded from the UI

name: Internal Component
description: 'Internal Only'
noUi: true

========================================

Component visible in the UI (default behavior)

name: Public Component
description: 'Public Only'
# noUi omitted, or explicitly set to false
# noUi: false
```

*Source: [New noUi property allowing page builders to exclude SDCs](https://www.drupal.org/node/3542594), a Drupal core change record by [igorgoncalves](https://www.drupal.org/user/1279070) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
