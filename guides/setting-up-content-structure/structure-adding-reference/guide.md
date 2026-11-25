---
name: structure-adding-reference
title: "Adding a Reference Field"
description: "How to add a reference field that connects two content types."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-adding-reference.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Add a reference field so that recipes can be linked to the vendor that has
submitted it.
## Prerequisite knowledge

* {{ GUIDE_REF("structure-fields") }}
* {{ GUIDE_REF("structure-reference-fields") }}
* {{ GUIDE_REF("structure-content-type") }}
## Site prerequisites

The Recipe and Vendor content types must exist. See {{ GUIDE_REF("structure-content-type") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Content
    types_ (_admin/structure/types_). Then click _Manage fields_ in the
    dropdown button for the Recipe content type. The _Manage fields_ page appears.
1. Click _Create a new field_. The _Add field_ page appears. Choose the
    _Reference_ field type from the _Choose a field type_ options. Click _Continue_.
    The _Add field_ page appears with a form to configure the field label.
    ![Adding a reference field to a content type](https://www.drupal.org/docs/user_guide/en/images/structure-adding-reference-add-field.png)
1. Fill in the fields as shown below. Click _Save and continue_.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Label | The title you want to give the field | Submitted by |
    | Choose an option below: | Type of content to reference | Content |


    ![Adding a reference field to a content type](https://www.drupal.org/docs/user_guide/en/images/structure-adding-reference-add-field-label.png)

1. The page Submitted by appears which lets you set the allowed number of
    values. Fill in the fields as shown below. Click _Save settings_.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Type of item to reference | Option to select the type of referenced entity | Content |
    | Allowed number of values | Specify the count of values associated with the field | Limited, 1 |


    ![Storage configuration of a reference field ](https://www.drupal.org/docs/user_guide/en/images/structure-adding-reference-set-field-basic.png)

1. The page _Submitted by settings for Recipe_ appears which allows you to
    configure the field. Fill in the fields as shown below. Click _Save settings_.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Label | Title shown for this field on the page | Submitted by |
    | Help text | Brief text aiding the person creating content | Choose the vendor that submitted this recipe |
    | Required field | Whether a value has to be provided or not | Checked |
    | Reference type > Reference method | Option to select reference method | Default |
    | Reference type > Content type | Specify the content type | Vendor |
    | Reference type > Sort by | Sorting field | Vendor name |
    | Reference type > Sort direction | Sorting order | Ascending |


    ![Settings for a reference field ](https://www.drupal.org/docs/user_guide/en/images/structure-adding-reference-field-settings.png)

1. The Submitted by field has been added to the content type.
    ![Manage fields page for the Recipe content type](https://www.drupal.org/docs/user_guide/en/images/structure-adding-reference-manage-fields.png)

## Videos

[Adding a Reference Field](https://www.youtube.com/watch?v=hAhWiqPlKh0)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix),
and [Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com).

*Source: [Adding a Reference Field](https://www.drupal.org/docs/user_guide/en/structure-adding-reference.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
