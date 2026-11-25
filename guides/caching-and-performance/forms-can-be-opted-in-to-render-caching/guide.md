---
name: forms-can-be-opted-in-to-render-caching
title: "Forms can be opted in to render caching"
description: "Forms can be opted in to render caching"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3442559
change-record-nid: 3442559
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#2578855](https://www.drupal.org/node/2578855)

Forms can now be made cacheable via Drupal's render cache API. Specifying any non-zero value for $form\['#cache'\]\['max-age'\] will opt in to render caching.

Previously forms would always be excluded from render caching under any circumstances.

In future versions, we intend to remove this requirement and move towards [making forms cacheable by default](https://www.drupal.org/project/drupal/issues/3395157).

*Source: [Forms can be opted in to render caching](https://www.drupal.org/node/3442559), a Drupal core change record by [jonathanshaw](https://www.drupal.org/user/3237629) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
