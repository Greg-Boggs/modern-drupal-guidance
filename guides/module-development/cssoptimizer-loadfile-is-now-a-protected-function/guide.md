---
name: cssoptimizer-loadfile-is-now-a-protected-function
title: "CssOptimizer loadFile() Is Now a Protected Function"
description: "CssOptimizer loadFile() Is Now a Protected Function"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3600808
change-record-nid: 3600808
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3302988](https://www.drupal.org/node/3302988)

Drupal\Core\Asset\CssOptimizer::loadFile() is now protected, meaning code outside of CssOptimizer subclasses can no longer call this method directly.

loadFile() was originally declared as public so that the core color module could use it. However, with the color module removed from core, the method no longer needs to be public.

Contrib projects relying on this method should refactor their code accordingly.

*Source: [CssOptimizer loadFile() Is Now a Protected Function](https://www.drupal.org/node/3600808), a Drupal core change record by [mdranove](https://www.drupal.org/user/3695874) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
