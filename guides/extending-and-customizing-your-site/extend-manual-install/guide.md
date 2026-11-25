---
name: extend-manual-install
title: "Manually Installing Module or Theme Files"
description: "How to manually install a module or theme."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/extend-manual-install.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Custom modules and themes may not be available via Composer and their files will
need to be manually installed.
## Prerequisite knowledge

* {{ GUIDE_REF("understanding-modules") }}
* {{ GUIDE_REF("extend-module-find") }}
* {{ GUIDE_REF("understanding-themes") }}
* {{ GUIDE_REF("extend-theme-find") }}
## Site prerequisites

Use this approach if you created a custom module/theme or received its files
from someone.

When installing or updating the core software, contributed modules, and
contributed themes you should use Composer. See {{ GUIDE_REF("install-composer") }},
{{ GUIDE_REF("extend-module-install") }}, and {{ GUIDE_REF("extend-theme-install") }} instead of this topic.
## Steps

If you are installing a module or theme from _Drupal.org_, follow the
downloading instructions, and then the uploading/unpacking instructions. If
you created the module or theme, skip the downloading step. Instead, create
an archive file (that you know how to extract on the server) and proceed with
the steps in uploading/unpacking, using whatever method is appropriate for the
way you initially created the archive file.
### Uploading the files to your site and unpacking them

1. If you are adding a new module or theme, create subdirectories in your
    top-level _modules_ and _themes_ directories (if they don't already
    exist). Typically, people make a _contrib_ subdirectory for contributed modules
    and themes that are downloaded from _Drupal.org_, and a _custom_ subdirectory
    for modules and themes that they created. Your _modules_ directory might look
    like this:
    ![Suggested directory structure for modules](https://www.drupal.org/docs/user_guide/en/images/extend-manual-install-directories.png)
1. If you are replacing an existing module or theme with an updated version, put
    the site into maintenance mode. See {{ GUIDE_REF("extend-maintenance") }}.
1. If you are replacing an existing module or theme with an updated version, find
    and delete all the existing files and directories for the existing module
    or theme. Modules are normally located in directories under the top-level
    _modules_ directory, and themes are normally located in directories under the
    top-level _themes_ directory.
1. Upload the _.tar.gz_ file (or whatever archive you created) to your site.
    Place it in either the same location from which you deleted the directory
    (if replacing an existing module or theme) or the appropriate subdirectory
    of _modules_ or _themes_ (if adding a new module or theme).
1. Extract the files from the _.tar.gz_ archive (or whatever archive you
    created), making a subdirectory in the same location as the archive file.
    If you do not have terminal access, or your hosting server is not running
    Linux, your hosting control panel's file manager should provide a way to
    extract the files. If you have terminal access to your hosting server
    (running Linux) and you are using a tar.gz file, you can use a command like:
    ```text
    tar -xzf custom_toolbar-2.4.0.tar.gz
    ```
1. Delete the compressed file from the server, unless your unpacking method
    already deleted it.
1. Refer to {{ GUIDE_REF("extend-module-install") }}, {{ GUIDE_REF("extend-theme-install") }},
    {{ GUIDE_REF("security-update-module") }}, or {{ GUIDE_REF("security-update-theme") }} to complete the
    installation or update of the module or theme. Start at the step after the
    automatic download has been completed.

## Expand your understanding

* If you work with multiple environments (for example, a local development site
and a production site) you will have to repeat the steps on each environment, or
re-clone the environment. See {{ GUIDE_REF("install-dev-making") }}.
* If you added a new theme, navigate in the _Manage_ administrative menu to
_Appearance_ (_admin/appearance_) and uninstall the old theme.
## Videos

[Manually Downloading Module or Theme Files](https://www.youtube.com/watch?v=kOzQz9q3Kf8)

## Additional resources

* [_Drupal.org_ community documentation page "Updating modules"](https://www.drupal.org/docs/extending-drupal/updating-modules)
* [_Drupal.org_ community documentation page "Installing Drupal modules"](https://www.drupal.org/docs/extending-drupal/installing-drupal-modules)
* [_Drupal.org_ community documentation page "Installing themes"](https://www.drupal.org/docs/extending-drupal/installing-themes)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix),
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon), and
[Marc Isaacson](https://www.drupal.org/u/vegantriathlete), and
[Joe Shindelar](https://www.drupal.org/u/eojthebrave) at [Drupalize.Me](https://drupalize.me).

*Source: [Manually Installing Module or Theme Files](https://www.drupal.org/docs/user_guide/en/extend-manual-install.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
