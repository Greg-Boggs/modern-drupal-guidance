---
name: views-duplicate
title: "Duplicating a View"
description: "How to create a new page by duplicating a view."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/views-duplicate.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Create a page listing recipes by duplicating the existing Vendors view.  Modify
the page so that the recipes are displayed in a grid and can be filtered by
ingredients.
## Prerequisite knowledge

* {{ GUIDE_REF("views-concept") }}
* {{ GUIDE_REF("views-parts") }}
* {{ GUIDE_REF("views-create") }}
## Site prerequisites

* The Vendor and Recipe content types must exist; both must have Main image
fields, and the Recipe content type must have an Ingredients field. Your site
must also have a couple of Recipe content items. See {{ GUIDE_REF("structure-content-type") }},
{{ GUIDE_REF("structure-fields") }}, {{ GUIDE_REF("structure-taxonomy-setup") }}, {{ GUIDE_REF("structure-form-editing") }},
and {{ GUIDE_REF("content-create") }}.
* The Vendors view must exist. See {{ GUIDE_REF("views-create") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Views_
    (_admin/structure/views_). Find the view "Vendors" and click _Duplicate_ in its
    dropdown button. (Note that the names of views that came with your installation
    profile are shown in English on this page; see {{ GUIDE_REF("language-concept") }} for an
    explanation.)
    ![Duplicate existing view](https://www.drupal.org/docs/user_guide/en/images/views-duplicate_duplicate.png)
1. Name the duplicate "Recipes" and click _Duplicate_. The view configuration
    page appears.
1. To change the title of the view page to "Recipes", click Vendors in the
    _Title_ field under _Title_. The _Page: The title of this view_ pop-up
    appears. Enter "Recipes". Click _Apply_.
    ![Change view title](https://www.drupal.org/docs/user_guide/en/images/views-duplicate_title.png)
1. To change from a table to a grid format, click _Table_ in the _Format_ field
    under _Format_. The _Page: How should this view be styled_ pop-up
    appears. Check _Grid_ and click _Apply_. The _Page: Style options_ pop-up
    appears. Retain the default values and click _Apply_.
1. To retain only the title and image fields for the Recipes view, click
    _Content: Body_ under _Fields_. Click _Remove_ in the pop-up that appears.
1. To change the content type filter to use the Recipe content type, click
    _Content: Type (=Vendor)_ under _Filter criteria_. In the _Configure
    filter criterion: Content: Type_ pop-up, check Recipe and uncheck Vendor. Click
    _Apply_.
1. To add a further filter that is exposed to visitors, click _Add_ in the
    dropdown button under _Filter criteria_. Search for "ingredients" and check
    "Ingredients (field_ingredients)". Click _Add and configure filter criteria_.
1. The appearing pop-up offers extra settings on vocabulary and selection
    type. Click _Apply and continue_. The next pop-up allows you to expose this
    filter to visitors. Fill in the fields as shown below, and click _Apply_.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Expose this filter to visitors, to allow them to change it | Allow visitors to filter and search | Checked |
    | Required | Whether a value has to be provided or not | Unchecked |
    | Label | Label shown for this filter on the view page | Find recipes using... |


    ![Expose filter](https://www.drupal.org/docs/user_guide/en/images/views-duplicate_expose.png)

1. To change the _Path_ label field to "Recipes", click "/vendors" in the _Path_
    field under _Page settings_. In the pop-up that appears, enter the path
    "recipes" and click _Apply_.

    Note that when editing a view, you enter paths without the leading "/", unlike
    on other administrative pages (such as when providing a path to a content item
    page).

1. To change the menu link title, click "Normal: Vendors" in the _Menu_ field
    under _Page settings_. In the pop-up that appears, change the title to "Recipes"
    and click _Apply_.
1. In order to use Ajax (see Ajax entry in the Glossary ({{ GUIDE_REF("glossary") }})) to
    make filtering and paging faster for users, under _Advanced_ > _Other_, click
    _No_ in the _Use AJAX_ field. Check _Use AJAX_ in the pop-up that appears, and
    click _Apply_.
1. Click _Save_ to save the view.
1. Go back to the home page and click Recipes in the navigation to view the new
    Recipes page.
    ![Recipes view](https://www.drupal.org/docs/user_guide/en/images/views-duplicate_final.png)

## Expand your understanding

The link to the view in the main navigation will probably not be in the right
place. Change the order of the menu links in the main navigation. See
{{ GUIDE_REF("menu-reorder") }}.
## Related concepts

* {{ GUIDE_REF("planning-structure") }}
* Ajax entry in the Glossary ({{ GUIDE_REF("glossary") }})
## Videos

[Duplicating a View](https://www.youtube.com/watch?v=N0mkt8Q1Yv4)

*Attributions*

Written and edited by [Laura Vass](https://www.drupal.org/u/lolk) at
[Pronovix](https://pronovix.com/),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Duplicating a View](https://www.drupal.org/docs/user_guide/en/views-duplicate.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
