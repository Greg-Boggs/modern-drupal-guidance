---
name: understanding-modules
title: "Concept: Modules"
description: "Overview of modules and the functionality they can be used for."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/understanding-modules.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

{{ GUIDE_REF("understanding-drupal") }}
## What is a module?

A module is a package of files that extends Drupal's core functionality. Modules
typically contain PHP code, configuration (YAML), and may include JavaScript,
CSS, and Twig template files.

You can turn the features and functionality on by _installing_ the module, and
you can turn it off by _uninstalling_ the module; before uninstalling, you may
need to remove data and configuration related to the feature or functionality.

Each module that is installed adds to the time needed to generate pages on your
site, so it is a good idea to uninstall modules that are not needed.

The core download provides modules for functionality such as:

* Managing user accounts (the core User module)
* Managing basic content (the core Node module) and fields (the core Field and
Field UI modules; there are also core modules providing field types)
* Managing navigation menus (the core Menu UI module)
* Making lists, grids, and blocks from existing content (the core Views and
Views UI modules)

You can download additional _contributed modules_ from the
[_Drupal.org_ Module Downloads](https://www.drupal.org/project/project_module), or
create your own _custom modules_.
## Related topics

* {{ GUIDE_REF("understanding-themes") }}
* {{ GUIDE_REF("understanding-distributions") }}
* {{ GUIDE_REF("config-uninstall") }}
* {{ GUIDE_REF("extend-module-find") }}
* {{ GUIDE_REF("extend-module-install") }}
* {{ GUIDE_REF("security-concept") }}
* {{ GUIDE_REF("security-update-module") }}
## Additional resources

[_Drupal.org_ community documentation page "Module developer's guide"](https://www.drupal.org/developing/modules)

*Attributions*

Written by [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Concept: Modules](https://www.drupal.org/docs/user_guide/en/understanding-modules.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
