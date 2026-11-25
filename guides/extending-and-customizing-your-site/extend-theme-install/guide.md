---
name: extend-theme-install
title: "Downloading and Installing a Theme from _Drupal.org_"
description: "How to download and install a theme from Drupal.org."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/extend-theme-install.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Download and install a theme from _Drupal.org_.
## Prerequisite knowledge

* {{ GUIDE_REF("extend-theme-find") }}
* {{ GUIDE_REF("install-tools") }}
## Site prerequisites

Composer must be installed to download themes. If you want to use Drush, Drush
must be installed. See {{ GUIDE_REF("install-tools") }}.
## Steps

To install a contributed theme, first download the theme with Composer. Then
install it using either the administrative interface or Drush. If you are
installing a custom theme rather than a contributed theme that is not
available via Composer, skip the steps for downloading the theme, and refer to
{{ GUIDE_REF("extend-manual-install") }}. Then return here and follow the steps for installing
the theme using either the administrative interface or Drush.
### Download the contributed theme with Composer

1. On the theme's project page on drupal.org (for example,
    _https://www.drupal.org/project/honey_), scroll to the _Releases_ section
    at the bottom of the page.
1. Copy the provided Composer command for the version of the theme you want to
    install.
    ![Finding the composer command for a theme](https://www.drupal.org/docs/user_guide/en/images/extend-theme-install-download.png)
1. Alternatively, type the following command (substituting
    the short name of the theme and desired version for `honey:^1.0`):
    ```text
    composer require 'drupal/honey:^1.0'
    ```
1. At the command line, change to the root directory or your project. Paste the
    Composer command and execute it.
1. You should see a message about the theme being successfully downloaded.

### Install the theme using the administrative interface

1. In the _Manage_ administrative menu, navigate to _Appearance_
    (_admin/appearance_). The _Appearance_ page appears.
1. Locate the new theme under _Uninstalled themes_ and click _Install and set as
    default_ to use it. All non-administrative pages on the site will now use this
    new theme.
    ![Uninstalled themes on Appearance page](https://www.drupal.org/docs/user_guide/en/images/extend-theme-install-appearance-page.png)

### Install the theme using Drush

1. To install the theme, and set it as the default, run the following Drush
    commands, giving the project name (for example, _honey_) as a parameter:
    ```text
    drush theme:enable honey
    drush config:set system.theme default honey
    ```
1. Follow the instructions on the screen.

## Expand your understanding

* In the _Manage_ administrative menu, navigate to _Appearance_
(_admin/appearance_) and uninstall any themes that you are not using.
* {{ GUIDE_REF("extend-module-find") }}
* {{ GUIDE_REF("extend-module-install") }}
* If you do not see the effect of these changes in your site, you might need
to clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
## Videos

[Downloading and Installing a Theme from Drupal.org](https://www.youtube.com/watch?v=UFgddj0F_bU)

*Attributions*

Written and edited by [Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me), and
[Boris Doesborgh](https://www.drupal.org/u/batigolix).

*Source: [Downloading and Installing a Theme from _Drupal.org_](https://www.drupal.org/docs/user_guide/en/extend-theme-install.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
