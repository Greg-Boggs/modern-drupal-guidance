---
name: config-uninstall
title: "Uninstalling Unused Modules"
description: "How to uninstall modules to reduce overhead."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/config-uninstall.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Uninstall the core Search and History modules, as well as the core Ban module if you installed it in {{ GUIDE_REF("config-install") }}, to reduce overhead.
## Prerequisite knowledge

{{ GUIDE_REF("understanding-modules") }}
## Site prerequisites

* You must have at least one unused module on your site that you want to
uninstall, such as the core Search module.
* If you want to use Drush to uninstall modules, Drush must be installed. See
{{ GUIDE_REF("install-tools") }}.
## Steps

You can use the administrative interface or Drush to uninstall modules.
### Using the administrative interface

1. In the _Manage_ administrative menu, navigate to _Extend_ > _Uninstall_
    (_admin/modules/uninstall_) where you will find the list of modules that are
    ready to be uninstalled.
1. Check the boxes for the modules you are uninstalling (_Ban_, _History_, and _Search_). Click _Uninstall_ at the bottom of the page.
    ![Uninstalling module](https://www.drupal.org/docs/user_guide/en/images/config-uninstall_check-modules.png)


    You cannot uninstall a module if it is required by some other module(s) and/or
    functionality. For example, the core File module is required by the core Text
    Editor, CKEditor, and Image modules. It can't be uninstalled unless you
    uninstall its dependent module(s) and functionality first. A module that cannot
    be uninstalled yet will have a disabled checkbox, restricting you from
    uninstalling it.

1. Step 2 will prompt you to confirm the module uninstall request. Click
    _Uninstall_.
    ![Confirm uninstall - search module](https://www.drupal.org/docs/user_guide/en/images/config-uninstall_confirmUninstall.png)

### Using Drush

1. In the _Manage_ administrative menu, navigate to _Extend_
    (_admin/modules_). The _Extend_ page appears showing all the available modules
    in your site.
1. Find the machine name of the module you want to uninstall, by expanding the
    information area for the module. For instance, the core Ban
    module's machine name is _ban_.
1. Run the following Drush command to uninstall the module:
    ```text
    drush pm:uninstall ban
    ```

## Expand your understanding

- {{ GUIDE_REF("install-tools") }}
- {{ GUIDE_REF("prevent-cache-clear") }}
- You can also uninstall the core Comment module by following these steps, but
  only after comment fields have been removed, which is a side effect of
  {{ GUIDE_REF("structure-content-type-delete") }}.

## Videos

[Uninstalling Unused Modules](https://www.youtube.com/watch?v=hUonnNkeF6g)

*Attributions*

Written and edited by [Joe Shindelar](https://www.drupal.org/u/eojthebrave) at [Drupalize.Me](https://drupalize.me), [Surendra Mohan](https://www.drupal.org/u/surendramohan),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Uninstalling Unused Modules](https://www.drupal.org/docs/user_guide/en/config-uninstall.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
