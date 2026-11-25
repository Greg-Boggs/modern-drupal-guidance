---
name: phpstan-is-bumped-to-level-3
title: "PHPStan is bumped to level 3"
description: "PHPStan is bumped to level 3"
drupal-core: ">=12.0"
source-url: https://www.drupal.org/node/3441298
change-record-nid: 3441298
introduced-in-version: "12.0.0"
introduced-in-branch: "12.0.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 12.0.x\
Introduced in version: 12.0.0\
Issue links: [#3425412](https://www.drupal.org/node/3425412)

Drupal core's static analysis with [PHPStan](https://phpstan.org/) now runs at [level 3](https://phpstan.org/user-guide/rule-levels). It was previously running at level 1.

Levels are cumulative. Moving from 1 to 3 adds these checks:

- **Level 2**: unknown methods checked on all expressions (not just `$this`), validating PHPDocs
- **Level 3**: return types, types assigned to properties

Existing errors at the new level are recorded in `core/.phpstan-baseline.php`. If an MR introduces a new PHPStan error, fix the code. Don't add the error to the baseline.

For contributed modules, this affects you only if you run core's `phpstan.neon.dist`, or copy its settings into your own config, to analyze your own code. Core's PHPStan config isn't loaded by anything at runtime. To match core, set `level: 3` in your own `phpstan.neon`. Expect new errors, mainly missing or wrong return types, calls to methods that don't exist on the inferred type, and assignments that don't match a property's type. Fix them, or generate your own baseline with `phpstan analyse --generate-baseline`.

*Source: [PHPStan is bumped to level 3](https://www.drupal.org/node/3441298), a Drupal core change record by [spokje](https://www.drupal.org/user/3386132) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
