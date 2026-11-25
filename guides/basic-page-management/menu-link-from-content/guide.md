---
name: menu-link-from-content
title: "Adding a Page to the Navigation"
description: "How to add a page to the navigation."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/menu-link-from-content.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Add a page to the navigation. For example, the About page.
## Prerequisite knowledge

* {{ GUIDE_REF("menu-concept") }}
* {{ GUIDE_REF("content-edit") }}
## Site prerequisites

The About page content item must exist. See {{ GUIDE_REF("content-create") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Content_ (_admin/content_).
1. Find the About page, and click _Edit_ in that row. The content editing form
    appears.
    ![Page edit link](https://www.drupal.org/docs/user_guide/en/images/menu-link-from-content_edit_page.png)
1. Click _Menu settings_ on the right to expand it.
1. Check _Provide a menu link_ for the menu options to appear.
1. Enter values from the table below:

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Menu link title | Title that will be displayed in the menu | About |
    | Description | Text that will be displayed when a visitor hovers over the link | History of the market |
    | Parent link | Location of the page in the menu hierarchy. For example, if you choose _<Main navigation>_, the page will appear in the highest level of the navigation. By choosing another menu link as parent, you can create a menu hierarchy of multiple levels. | <Main navigation> |
    | Weight | The order in which the page should appear in the menu (lower-weighted menu links will be shown before higher-weighted menu links) | -2 |


    ![Creating a menu link from within the content edit form](https://www.drupal.org/docs/user_guide/en/images/menu-link-from-content.png)

1. Click _Save_ to save the changes. Click _Home_ or _Return
    to site_ in the navigation bar to see the result, which could look like the
    picture below.
    ![Link has been added to the main menu](https://www.drupal.org/docs/user_guide/en/images/menu-link-from-content-result.png)

## Expand your understanding

{{ GUIDE_REF("menu-reorder") }}
## Videos

[Adding a Page to the Navigation](https://www.youtube.com/watch?v=JE_3INtBcTw)

## Additional resources

[_Drupal.org_ community documentation page "Adding a link to a menu"](https://www.drupal.org/docs/core-modules-and-themes/core-modules/menu-ui-module/adding-a-link-to-a-menu)

*Attributions*

Adapted by [Boris Doesborg](https://www.drupal.org/u/batigolix) from
["Adding a link to a menu"](https://www.drupal.org/docs/core-modules-and-themes/core-modules/menu-ui-module/adding-a-link-to-a-menu),
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation);
edited by [Jack Haas](https://www.drupal.org/u/jerseycheese).

*Source: [Adding a Page to the Navigation](https://www.drupal.org/docs/user_guide/en/menu-link-from-content.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
