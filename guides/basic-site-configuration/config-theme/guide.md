---
name: config-theme
title: "Configuring the Theme"
description: "How to edit a theme's settings to update the color scheme and add a logo."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/config-theme.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Edit the settings of the default core Olivero theme to change the color scheme
and to add a logo.
## Prerequisite knowledge

{{ GUIDE_REF("understanding-themes") }}
## Steps

1. In the _Manage_ administrative menu, navigate to _Appearance_
    (_admin/appearance_).
1. Under _Installed themes_, you will find Olivero listed as your default
    theme. Under _Olivero (default theme)_, click _Settings_.
    ![Default theme, Olivero](https://www.drupal.org/docs/user_guide/en/images/config-theme_olivero_settings.png)
1. Under _Logo image_, uncheck _Use the logo supplied by the
    theme_.
    ![New logo in core Olivero theme settings](https://www.drupal.org/docs/user_guide/en/images/config-theme_logo_upload.png)
1. Under _Upload logo image_, locate a logo file and upload it to your
    site. Note: You can also set a universal logo for all themes under
    _Appearance_ > _Settings_ (_admin/appearance/settings_). A custom logo for your
    theme will override the universal logo.

    Once you have selected the file you would like to upload, you will see its
    filename next to the _Choose File_ or _Browse_ button in your browser.

1. Under _Olivero Utilities_, you can choose to use a different color scheme for
    the theme. You can choose from a list of existing color scheme's, or enter a
    color and the core software will generate a new scheme based on that color.

    For example, use the following custom color:

    | Field | Color |
    | --- | --- |
    | Primary base color | #7db84a (green) |


    Note: You can also use a color picker by pressing the colored square on the
    right to select a color of your choice. The web color codes will be added for
    you.

1. In order to save your changes and see the updated colors and logo on your
    site, click _Save configuration_ at the bottom of the page.
1. Click _Return to site_ or _Home_ in the toolbar to verify that you have
    updated the core Olivero theme settings for your website.
    ![Final result of editing the core Olivero theme settings - colors and logo](https://www.drupal.org/docs/user_guide/en/images/config-theme_final_result.png)

## Expand your understanding

* {{ GUIDE_REF("extend-theme-find") }}
* {{ GUIDE_REF("extend-theme-install") }}
* If you do not see the effect of these changes in your site, you might need
to clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
## Videos

[Configuring the Theme](https://www.youtube.com/watch?v=CEi3i1YGOs0)

*Attributions*

Written and edited by [Ann Greazel](https://www.drupal.org/u/AnnGreazel),
[Amanda Luker](https://www.drupal.org/u/mndonx) at
[Advomatic](https://www.advomatic.com/),
[Jack Haas](https://www.drupal.org/u/jerseycheese), and
[Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me).

*Source: [Configuring the Theme](https://www.drupal.org/docs/user_guide/en/config-theme.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
