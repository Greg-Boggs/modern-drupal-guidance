---
name: security-update-theme
title: "Updating a Theme"
description: "How to update a contributed theme using Composer and the administrative interface for running the Database Updates script."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/security-update-theme.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Update a contributed theme on your site and run the _Database Updates_ script.
## Prerequisite knowledge

* {{ GUIDE_REF("security-concept") }}
* {{ GUIDE_REF("security-cron-concept") }}
## Site prerequisites

* A contributed theme has been installed and there is an update available for
it. See {{ GUIDE_REF("extend-theme-install") }} and {{ GUIDE_REF("security-announce") }}.
* If your site is live, you should test this process in a development
environment before running it on your production site. See
{{ GUIDE_REF("install-dev-making") }}.
* You have created a full site backup. See {{ GUIDE_REF("prevent-backups") }}.
* If you want to use the user interface to check for updates, the core Update
Manager module must be installed. See {{ GUIDE_REF("config-install") }} for instructions on
installing core modules.
## Steps

Updating a contributed theme requires first putting your site into maintenance
mode, then obtaining the new code files and applying any required database
updates, then finally taking the site out of maintenance mode.

You can update the code for a contributed theme using Composer. If you are
updating a custom theme rather than a contributed theme, obtain the new theme
files, then continue with instructions for running the database updates via the
administrative interface below.

This assumes that you are using Composer to manage the files in your site; see
{{ GUIDE_REF("install-composer") }}.
### Update a contributed theme with Composer

1. Put your site in maintenance mode. See {{ GUIDE_REF("extend-maintenance") }}.
1. In the _Manage_ administrative menu, navigate to _Reports_ >
    _Available updates_ > _Update_ (_admin/reports/updates_).
1. Find any themes in the list that need updating.
    ![Available updates](https://www.drupal.org/docs/user_guide/en/images/security-update-theme-updates.png)
1. Determine the short name of the project you want to update. For contributed
    modules and themes, it is the last part of the URL of the project page; for
    example, the Honey theme, at https://www.drupal.org/project/honey, has
    short name `honey`.
1. If you want to update to the latest stable release, use the following
    command, substituting the short name of the project to be updated for
    `honey`:
    ```text
    composer update drupal/honey --with-dependencies
    ```

    To learn how to download specific versions see {{ GUIDE_REF("install-composer") }}.

1. After obtaining the new theme files run any database updates page by typing
    the URL _example.com/update.php_ in your browser.
1. Click _Continue_ to run the updates. The database update scripts will be
    executed.
1. Click _Administration pages_ to return to the administration section of your
    site.
1. Take your site out of maintenance mode. See {{ GUIDE_REF("extend-maintenance") }}.
1. Clear the Drupal cache (refer to {{ GUIDE_REF("prevent-cache-clear") }}).

## Expand your understanding

* Review the site log, see {{ GUIDE_REF("prevent-log") }}, once the updates are complete to
check for errors.
* {{ GUIDE_REF("security-update-module") }}
## Videos

[Updating a Theme](https://www.youtube.com/watch?v=elVnWoaQMkk)

*Attributions*

Written by [Boris Doesborg](https://www.drupal.org/u/batigolix) and
[Joe Shindelar](https://www.drupal.org/u/eojthebrave) at [Drupalize.Me](https://drupalize.me).

*Source: [Updating a Theme](https://www.drupal.org/docs/user_guide/en/security-update-theme.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
