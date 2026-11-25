---
name: the-frontpage-view-is-renamed-and-disabled-by-default
title: "The frontpage view is renamed and disabled by default"
description: "The frontpage view is renamed and disabled by default"
drupal-core: ">=11.5"
source-url: https://www.drupal.org/node/3612430
change-record-nid: 3612430
introduced-in-version: "11.5.0"
introduced-in-branch: "11.5.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.5.x\
Introduced in version: 11.5.0\
Issue links: [#3572350](https://www.drupal.org/node/3572350)

The "Frontpage" view is renamed to the "Promoted content" view and is disabled by default. Site builders can enable "Promoted content" if they need this functionality.

Module developers with tests that rely on this view being enabled can make use of `PromotedContentViewTestTrait` to enable the view in their tests.

*Source: [The frontpage view is renamed and disabled by default](https://www.drupal.org/node/3612430), a Drupal core change record by [larowlan](https://www.drupal.org/user/395439) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
