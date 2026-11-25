---
name: views-table-alignment-style-options-now-relies-on-core
title: "Views table alignment style options now relies on core alignment classes"
description: "Views table alignment style options now relies on core alignment classes"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3515029
change-record-nid: 3515029
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3436855](https://www.drupal.org/node/3436855)

Views previously provided its own `views-align-*` CSS declarations to handle column alignment for tables, these have been removed in favour of system module's align classes which provided identical behaviour.

The classes were also used as configuration values in exported views, and an update has been provided to convert the views to the new class names. Distributions and modules with exported views configuration may need to be updated to reflect the new options.

*Source: [Views table alignment style options now relies on core alignment classes](https://www.drupal.org/node/3515029), a Drupal core change record by [catch](https://www.drupal.org/user/35733) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
