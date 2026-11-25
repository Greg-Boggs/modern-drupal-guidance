---
name: menu-concept
title: "Concept: Menu"
description: "Overview of the menu concept and menus automatically created with the core Standard installation profile."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/menu-concept.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## What is a menu?

Menus are a collection of links used to navigate a website. The
core Menu UI module provides an interface to control and customize the menu
system. Menus are primarily displayed as a hierarchical list of links. By
default, new menu links are placed inside a built-in menu labeled _Main
navigation_, but administrators can also create custom menus.

The core Standard installation profile contains five menus:

- **Main navigation:** Links to sections intended for site visitors. They are usually created by site administrators.
- **Administration:** Links to administrative tasks. This menu mainly contains links supplied by modules on your site.
- **User account menu:** Links to tasks associated with the user account such as _My account_ and _Log out_.
- **Footer:** Links to important pages within the site intended for the footer. They are usually created by site administrators.
- **Tools:** Links to tasks necessary for site visitors. Some modules feature their links here.

You can customize menus in the following ways, using the menu administration
functionality:

* Creating new custom menus.
* Adding new menu links.
* Reordering menu links by setting their "weight" or by dragging them into
place.
* Renaming menu links (link title).
* Changing the link description (the tooltip that appears when you mouse over a menu
link).
* Moving a menu link into a different menu by editing its _Parent link_
property.

A menu link will only be shown to a visitor if they have the rights to view the
page it links to. For example, the admin menu link is not shown to visitors who
are not logged in.
## Related topics

* {{ GUIDE_REF("menu-link-from-content") }}
* {{ GUIDE_REF("menu-reorder") }}
* To display a menu, you will need to place the block that corresponds to the
menu in a region of your theme; see {{ GUIDE_REF("block-concept") }}, {{ GUIDE_REF("block-regions") }}, and
{{ GUIDE_REF("block-place") }}. The core Standard installation profile places all of the menus
it defines except Administration in regions of the core Bartik theme. The core
Toolbar module, which is installed by the core Standard installation profile,
displays the Administration menu; it is also displayed by the contributed Admin
Toolbar module.

*Attributions*

Written and edited by [Ajay Viswambharan](https://www.drupal.org/u/ajayvi),
[Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com), [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon) and [Bill Seremetis](https://www.drupal.org/u/bserem).

*Source: [Concept: Menu](https://www.drupal.org/docs/user_guide/en/menu-concept.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
