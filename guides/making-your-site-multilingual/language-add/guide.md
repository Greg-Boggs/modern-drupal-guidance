---
name: language-add
title: "Adding a Language"
description: "How to add a language, install the necessary modules, and turn on the _Language switcher_ block."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/language-add.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Add one or more languages to your site and define which one is used by default.
## Prerequisite knowledge

{{ GUIDE_REF("language-concept") }}
## Steps

1. Install the four core multilingual modules (Language, Interface Translation,
    Content Translation, and Configuration Translation), by following the steps in
    {{ GUIDE_REF("config-install") }}.
1. In the _Manage_ administrative menu, navigate to _Configuration_ >
    _Region and language_ > _Languages_ (_admin/config/regional/language_).
1. Click _Add language_.
1. Select _Spanish_ (or your preferred language) from the _Language name_ select
    list. Click _Add language_. After waiting for translations to finish
    downloading, you will be returned to the _Languages_ page, with a confirmation
    message and the new language shown.
    ![List of available languages in the website](https://www.drupal.org/docs/user_guide/en/images/language-add-list.png)
1. Follow the steps in {{ GUIDE_REF("block-place") }} to place the _Language switcher_ block in
    the _Sidebar second_ region. This will enable site visitors to switch between
    languages, once the site has been translated.

## Expand your understanding

* {{ GUIDE_REF("language-content-config") }}
* {{ GUIDE_REF("language-content-translate") }}
## Videos

[Adding a Language](https://www.youtube.com/watch?v=8Yu0G4gJ0f4)

## Additional resources

[_Drupal.org_ community documentation page "Multilingual guide"](https://www.drupal.org/docs/multilingual-guide)

*Attributions*

Written and edited by [Leila Tite](https://www.drupal.org/u/yrvyn),
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon), and
[Boris Doesborg](https://www.drupal.org/u/batigolix).

*Source: [Adding a Language](https://www.drupal.org/docs/user_guide/en/language-add.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
