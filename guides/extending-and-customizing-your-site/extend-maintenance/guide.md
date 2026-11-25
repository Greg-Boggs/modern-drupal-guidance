---
name: extend-maintenance
title: "Enabling and Disabling Maintenance Mode"
description: "How to enable maintenance mode to set up a \"Site under maintenance\" message, and how to disable it."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/extend-maintenance.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Put your site in maintenance mode to allow users with the right permissions to
use the site while users without this permission are presented with a message
that the site is under maintenance.
## Prerequisite knowledge

{{ GUIDE_REF("security-concept") }}
## Site prerequisites

If you want to use Drush to enable or disable maintenance mode, Drush must be
installed. See {{ GUIDE_REF("install-tools") }}.
## Steps

You can use the administrative interface or Drush to enable or disable
maintenance mode.
### Enabling maintenance mode using the administrative interface

1. In the _Manage_ administrative menu, navigate to _Configuration_ >
    _Development_ > _Maintenance mode_ (_admin/config/development/maintenance_). The
    _Maintenance mode_ page appears.
1. Fill in the fields as shown below.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Put site into maintenance mode | Enable the maintenance mode | Checked |
    | Message to display when in maintenance mode | The information that is shown to website visitors when the mode is enabled. Variables such as @site can be used in the message | @site is currently under maintenance but should be back shortly. Thank you for your patience. |

1. Click _Save configuration_.
1. Verify that the site is in maintenance mode by accessing it from another
    browser where you aren't logged in. If you are not able to verify, try clearing
    the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
    ![Maintenance mode enabled](https://www.drupal.org/docs/user_guide/en/images/extend-maintenance-mode-enabled.png)

### Disabling maintenance mode using the administrative interface

1. In the _Manage_ administrative menu, navigate to _Configuration_ >
    _Development_ > _Maintenance mode_ (_admin/config/development/maintenance_). The
    _Maintenance mode_ page appears.
1. Fill in the fields as shown below.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Put site into maintenance mode | Disable the maintenance mode | Unchecked |
    | Message to display when in maintenance mode | No message required while disabling. You can leave the field blank. |  |

1. Click _Save configuration_.
1. Verify that the site is no longer in maintenance mode by accessing it from
    another browser where you aren't logged in. If you are not able to verify, try
    clearing the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
    ![Maintenance mode disabled](https://www.drupal.org/docs/user_guide/en/images/extend-maintenance-mode-disabled.png)

### Enabling or disabling maintenance mode using Drush

1. Follow the user interface steps above to edit the site maintenance message, if
    desired.
1. Run the following Drush commands to enable maintenance mode and clear the
    cache:
    ```text
    drush config:set system.maintenance message "Optional message" -y
    drush state:set system.maintenance_mode 1 --input-format=integer
    drush cache:rebuild
    ```
1. Run the following Drush commands to disable maintenance mode and clear the
    cache:
    ```text
    drush state:set system.maintenance_mode 0 --input-format=integer
    drush cache:rebuild
    ```
1. After running either set of commands, verify that your site is either in or
    out of maintenance mode by visiting the site in a browser where you are not
    logged in.

## Expand your understanding

* {{ GUIDE_REF("security-update-core") }}
* {{ GUIDE_REF("security-update-theme") }}
* {{ GUIDE_REF("security-update-module") }}
## Videos

[Enabling and Disabling Maintenance Mode](https://www.youtube.com/watch?v=IQbqQs5h03Q)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix),
[Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com), and
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Enabling and Disabling Maintenance Mode](https://www.drupal.org/docs/user_guide/en/extend-maintenance.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
