---
name: block-weights-must-now-be-integers
title: "Block weights must now be integers"
description: "Block weights must now be integers"
drupal-core: ">=11.1"
source-url: https://www.drupal.org/node/3462474
change-record-nid: 3462474
introduced-in-version: "11.1.0"
introduced-in-branch: "11.1.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.1.x\
Introduced in version: 11.1.0\
Issue links: [#3379725](https://www.drupal.org/node/3379725)

You'd think that block weights would always be integers, right? That would make sense, given what weights are for.

Welp, it turns out that it has been possible, all this time, for blocks to have weights that weren't integers. They could be anything, really, including numeric strings (like `'21'`) or even NULL.

As of [#3379725: Make Block config entities fully validatable](https://www.drupal.org/project/drupal/issues/3379725), this is no longer allowed. Block weights have to be integers (and are 0 by default), or they will raise a deprecation error. Any non-integer passed to `Block::setWeight()` will be cast to an integer.

*Source: [Block weights must now be integers](https://www.drupal.org/node/3462474), a Drupal core change record by [phenaproxima](https://www.drupal.org/user/205645) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
