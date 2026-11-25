---
name: config-install
title: "Installing a Module"
description: "How to install a core or contributed module, using the administrative interface or Drush."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/config-install.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Install a core module, or a contributed module whose files have already been
uploaded to the site, through the administrative interface or using Drush.
## Prerequisite knowledge

{{ GUIDE_REF("understanding-modules") }}
{{ GUIDE_REF("install-composer") }}
## Site prerequisites

If you want to use Drush to install modules, Drush must be installed. See
{{ GUIDE_REF("install-tools") }}.
## Steps

You can use the administrative interface or Drush to install modules.

Contributed modules are not included with the core software must first be
downloaded using Composer. See {{ GUIDE_REF("install-composer") }} for more information.
### Using the administrative interface

1. In the _Manage_ administrative menu, navigate to _Extend_
    (_admin/modules_). The _Extend_ page appears showing all the available modules
    in your site.
1. Check the boxes for the module or modules you want to install. For example,
    check the box for the core Ban module.
    ![Enabling the core Ban module](https://www.drupal.org/docs/user_guide/en/images/config-install-check-modules.png)
1. Click _Install_. The checked modules will be installed.

### Using Drush

1. In the _Manage_ administrative menu, navigate to _Extend_
    (_admin/modules_). The _Extend_ page appears showing all the available modules
    in your site.
1. Find the machine name of the module you want to install, by expanding the
    information area for the module. For instance, the core Ban
    module's machine name is _ban_.
1. Run the following Drush command to install the module:
    ```text
    drush pm:enable ban
    ```

## Expand your understanding

If you do not see the effect of these changes in your site, you might need
to clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
## Videos

[Installing a Module](https://www.youtube.com/watch?v=HymQsDOcT3E)

## Additional resources

[Drush](http://www.drush.org)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix) and
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon), and [Joe Shindelar](https://www.drupal.org/u/eojthebrave) at [Drupalize.Me](https://drupalize.me).

*Source: [Installing a Module](https://www.drupal.org/docs/user_guide/en/config-install.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
