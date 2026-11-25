---
name: extend-module-find
title: "Finding Modules"
description: "How to search and evaluate modules on Drupal.org."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/extend-module-find.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Find and evaluate modules on _Drupal.org_.
## Prerequisite knowledge

* {{ GUIDE_REF("understanding-drupal") }}
* {{ GUIDE_REF("understanding-modules") }}
## Steps

1. Go to [_Drupal.org_](https://www.drupal.org), and navigate to _Download &
    Extend_ > _Modules_ (https://www.drupal.org/project/project_module).
1. Filter your search using the categories on the module search page.
    Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Maintenance status | How actively should the module be maintained? | Actively maintained |
    | Development status | What kind of development should the module undergo? | Any |
    | Module categories | The module's topic area. | Administration |
    | Core compatibility | The version of the core software the module is compatible with. | 9.x |
    | Status | Project status: _Sandbox projects_ are experimental projects. _Full projects_ have already gone through an approval process, but they can still be in development. | Full projects |
    | Stability | Whether or not the project maintainer has created a production-ready version. | Has a supported stable release |
    | Security advisory coverage | Whether or not the project maintainer has agreed to follow Drupal Security Team procedures. | Has security advisory coverage |
    | Search modules | Search for _Admin Toolbar_, a module that will be covered in detail later. Alternatively, you can also leave the field blank if you are not sure which module to search for. | Admin Toolbar |
    | Sort by | Order your search results by criteria like _Most installed_ (popular modules that many sites use) or _Last release_ (date of latest version released). | Most installed |


    ![Filters on the module search page on _Drupal.org_](https://www.drupal.org/docs/user_guide/en/images/extend-module-find_module_finder.png)

1. Click _Search_. Search results will appear.
    ![Module search results page on _Drupal.org_](https://www.drupal.org/docs/user_guide/en/images/extend-module-find_search_results.png)
1. To further evaluate a module, click its title in the list of search results
    to visit its project page.

Some aspects to pay attention to when evaluating modules:

* Project description: The description of the module on its project page should
  be clear and useful. You should get an idea of its features and requirements.
* Project information: There may be warnings in this area of the page, such as
  if a module is no longer being developed, or is not covered by the security
  advisory policy.
* Project information > Reported installs, downloads: You can see how many
  people have downloaded and how many sites use the module. If it's only used by a
  few sites, it might be a unique solution that not many people need, or it might
  be a warning sign that you shouldn't use it either.
* Maintainers: When was the last commit (the last time someone updated something
  on the module) or last release (new version)? If the project has few open
  issues, a long time since commits/releases might be appropriate, but if it has
  a lot of open issues and there are no commits/releases, that would be a clue
  that it might be abandoned.
* Issues: See if there are any open issues, potential problems with the
  module. Check the Statistics to see how regularly issues are responded to.
* Documentation, Resources: Check if the module has documentation or a README
  file, that can help you install, configure, explore, and test it.
  ![Information on the project page to look for when evaluating a module](https://www.drupal.org/docs/user_guide/en/images/extend-module-find_project_info.png)

## Expand your understanding

{{ GUIDE_REF("extend-module-install") }}
## Videos

[Finding Modules](https://www.youtube.com/watch?v=G-XUuSj9xYA)

*Attributions*

Written by [Diána Lakatos](https://www.drupal.org/u/dianalakatos) at
[Pronovix](https://pronovix.com//).

*Source: [Finding Modules](https://www.drupal.org/docs/user_guide/en/extend-module-find.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
