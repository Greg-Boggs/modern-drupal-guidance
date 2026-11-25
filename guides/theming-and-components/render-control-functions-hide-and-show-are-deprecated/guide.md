---
name: render-control-functions-hide-and-show-are-deprecated
title: "Render control functions hide() and show() are deprecated"
description: "Render control functions hide() and show() are deprecated"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3261271
change-record-nid: 3261271
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#2258355](https://www.drupal.org/node/2258355)

Instead of using `hide()` and `show()` functions, use inline `#printed` flag manipulation to control render array output:

| Before | Now |
| --- | --- |
| `hide($element); ` | `$element['#printed'] = TRUE; ` |
| `show($element); ` | `$element['#printed'] = FALSE; ` |

*Source: [Render control functions hide() and show() are deprecated](https://www.drupal.org/node/3261271), a Drupal core change record by [nnevill](https://www.drupal.org/user/835208) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
