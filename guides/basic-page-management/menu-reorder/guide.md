---
name: menu-reorder
title: "Changing the Order of Navigation"
description: "How to reorder links in a menu."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/menu-reorder.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Reorder the links in a menu.
## Prerequisite knowledge

* {{ GUIDE_REF("menu-concept") }}
* {{ GUIDE_REF("menu-link-from-content") }}
## Site prerequisites

Home and About pages must exist in the main navigation menu. See
{{ GUIDE_REF("menu-link-from-content") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Menus_
    (_admin/structure/menu_) where all menus on your site are listed. Click _Edit
    Menu_ from the _Operations_ dropdown for _Main navigation_. You can also reach
    this page using contextual links (refer to {{ GUIDE_REF("config-overview") }}) for the
    menu. Note that the names and descriptions of the menus that were provided by
    your installation profile are shown in English on this page; see
    {{ GUIDE_REF("language-concept") }} for an explanation.
    ![List of menus on the site with 'Main navigation' highlighted](https://www.drupal.org/docs/user_guide/en/images/menu-reorder_menu_titles.png)
1. The _Edit menu_ page will display a list of each link in the menu you
    chose (_Main navigation_).
    ![List of menu links under _Main navigation_](https://www.drupal.org/docs/user_guide/en/images/menu-reorder_edit_menu.png)
1. Drag the cross bar handles of menu links to change their order: Home, then
    About. As an alternative to dragging, you can click the _Show row weights_ link
    at the top of the table and select numerical weights (menu links with lower or
    more negative weights will be shown first).
    ![Reordered menu links with warning message about unsaved changes and the _Save_ button](https://www.drupal.org/docs/user_guide/en/images/menu-reorder_reorder.png)
1. Click _Save_.
1. The home page now displays the main navigation with the Home menu
    link displayed first.
    ![Reordered menu links on the home page with 'Home' first and then 'About'](https://www.drupal.org/docs/user_guide/en/images/menu-reorder_final_order.png)

## Expand your understanding

Add a menu link called _Contact_, leading to the _/contact_ page, to your Main
navigation menu. The contact page is provided by the core Contact module; you
may want to edit its layout and fields (see {{ GUIDE_REF("structure-form-editing") }}).
## Related concepts

{{ GUIDE_REF("menu-concept") }}
## Videos

[Changing the Order of Navigation](https://www.youtube.com/watch?v=OtT8e8lLx5E)

*Attributions*

Written by [Ann Greazel](https://www.drupal.org/u/AnnGreazel).

*Source: [Changing the Order of Navigation](https://www.drupal.org/docs/user_guide/en/menu-reorder.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
