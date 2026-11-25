---
name: structure-form-editing
title: "Changing Content Entry Forms"
description: "How to edit a content entry form."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-form-editing.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Change the Recipe form to use a different widget to enter terms in the
Ingredients field.
## Prerequisite knowledge

* {{ GUIDE_REF("structure-content-type") }}
* {{ GUIDE_REF("structure-fields") }}
* {{ GUIDE_REF("structure-taxonomy") }}
* {{ GUIDE_REF("structure-widgets") }}
## Site prerequisites

The Recipe content type must exist, and it must have an Ingredients taxonomy
term reference field. At least one Vendor content item must exist. See
{{ GUIDE_REF("structure-content-type") }} and {{ GUIDE_REF("structure-taxonomy-setup") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Content_ > _Add content_ >
    _Recipe_ (_node/add/recipe_) to look at the content entry form that is set up by
    default. Notice how you have to enter ingredients one by one, instead of having
    a more compact format.
1. In the _Manage_ administrative menu, navigate to _Structure_ > _Content
    types_ (_admin/structure/types_). Then click _Manage form display_  on the
    dropdown button for the Recipe content type. The _Manage form display_ page
    appears.
1. For the Ingredients field, select _Autocomplete (Tags style)_ in the _Widget_
    column.
    ![Manage the Recipe form](https://www.drupal.org/docs/user_guide/en/images/structure-form-editing-manage-form.png)
1. Click _Save_.
1. In the _Manage_ administrative menu, navigate to _Content_ > _Add content_ >
    Recipe (_node/add/recipe_) to verify the changed behavior of the content
    form. The Ingredients field is now a single text field that accepts multiple
    values.
    ![Add a recipe](https://www.drupal.org/docs/user_guide/en/images/structure-form-editing-add-recipe.png)
1. Create two Recipe content items (see {{ GUIDE_REF("content-create") }}), such as recipes for
    "Green Salad" and "Fresh Carrots". Make sure all the fields have values,
    including images, ingredients, and submitted by (set this to one of the Vendor
    content items you created in {{ GUIDE_REF("structure-fields") }}).

## Expand your understanding

Change the main site Contact form by navigating in the _Manage_ administrative
menu to _Structure_ > _Contact forms_. For instance, you may want to hide the
_Send yourself a copy_ or _Language_ fields.
## Videos

[Changing Content Entry Forms](https://www.youtube.com/watch?v=CELMGX93fjE)

*Attributions*

Written by [Boris Doesborg](https://www.drupal.org/u/batigolix).

*Source: [Changing Content Entry Forms](https://www.drupal.org/docs/user_guide/en/structure-form-editing.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
