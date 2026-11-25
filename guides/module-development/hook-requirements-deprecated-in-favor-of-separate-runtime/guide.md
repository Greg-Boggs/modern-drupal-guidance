---
name: hook-requirements-deprecated-in-favor-of-separate-runtime
title: "hook_requirements deprecated in favor of separate runtime and update hooks and install-time requirements checks"
description: "hook_requirements deprecated in favor of separate runtime and update hooks and install-time requirements checks"
drupal-core: ">=11.3"
source-url: https://www.drupal.org/node/3549685
change-record-nid: 3549685
introduced-in-version: "11.3.0"
introduced-in-branch: "11.3.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.3.x\
Introduced in version: 11.3.0\
Issue links: [#3490846](https://www.drupal.org/node/3490846)

Note that while the deprecation is only formalized in 11.3, all replacements are available in Drupal 11.2.

See the following change records on how to update each previous phase:

- [There is a new InstallRequirementsInterface to provide install time requirements.](https://www.drupal.org/node/3492429)
- [Added hook_runtime_requirements() and hook_runtime_requirements_alter()](https://www.drupal.org/node/3490851)
- [Added hook_update_requirements() and hook_update_requirements_alter()](https://www.drupal.org/node/3490852)

*Source: [hook_requirements deprecated in favor of separate runtime and update hooks and install-time requirements checks](https://www.drupal.org/node/3549685), a Drupal core change record by [berdir](https://www.drupal.org/user/214652) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
