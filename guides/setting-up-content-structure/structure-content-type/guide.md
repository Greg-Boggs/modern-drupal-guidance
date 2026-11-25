---
name: structure-content-type
title: "Adding a Content Type"
description: "How to add and configure a new content type."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-content-type.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Add and configure a new content type Vendor.
## Prerequisite knowledge

{{ GUIDE_REF("planning-data-types") }}
## Site prerequisites

You need to have a plan in place for your content structure. See
{{ GUIDE_REF("planning-structure") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Content types_
    (_admin/structure/types_). The _Content types_ page appears showing all the
    available types of content. Note that the names and descriptions of the
    content types that were provided by your installation profile are shown in
    English on this page; see {{ GUIDE_REF("language-concept") }} for an explanation.
1. Click _Add content type_. The _Add content type_ page appears. Fill
    in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Name | Name of the content type | Vendor |
    | Description | Explain the use of the content type | Information about a vendor |


    ![Adding a Content type](https://www.drupal.org/docs/user_guide/en/images/structure-content-type-add.png)

1. Under _Submission form settings_, configure the form that is
    used for creating and editing content of this type. Fill in the fields as shown
    below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Title field label | Label of the Title field that is shown when editing or creating content of this type. | Vendor name |
    | Preview before submitting | Option to choose whether you should preview the content before submitting. | Optional |
    | Explanation or submission guidelines | Instructions for creating or editing content. | (Leave blank) |


    ![Submission form settings](https://www.drupal.org/docs/user_guide/en/images/structure-content-type-add-submission-form-settings.png)

1. Under _Publishing options_, decide on default options for new
    content of this type. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Published | Make the content item published by default. | Checked |
    | Promoted to front page | In a default website, this setting can be used to show content on the homepage. | Unchecked |
    | Sticky at top of lists | In a default website, this setting can be used to keep content on top of a list. | Unchecked |
    | Create new revision | Create a new revision each time the vendor is being edited. | Checked |


    Changing these settings does not affect the content items that have already been
    created.
    ![Publishing Options](https://www.drupal.org/docs/user_guide/en/images/structure-content-type-add-Publishing-Options.png)

1. Under _Display settings_, decide if the author and
    publication date will be visible in the content item. Fill in the fields as
    shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Display author and date information | Display the author username and publication date on each vendor page. | Unchecked |


    ![Display settings](https://www.drupal.org/docs/user_guide/en/images/structure-content-type-add-Display-settings.png)

1. Under _Menu settings_, fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Available menus | Menus that this type of content can be added to. Vendors do not need to appear in menus, so uncheck all menu options. | Unchecked |


    ![Menu settings](https://www.drupal.org/docs/user_guide/en/images/structure-content-type-add-Menu-settings.png)

1. Click _Save and manage fields_ to save the content type. The
    _Manage fields_ page appears that allows you to add fields to the content
    type. See {{ GUIDE_REF("structure-fields") }}
    ![Confirmation](https://www.drupal.org/docs/user_guide/en/images/structure-content-type-add-confirmation.png)
1. Follow the same steps to create a content type for recipes. Example values
    for the fields in the forms, where they are different from the steps above:

    | Field name | Example value |
    | --- | --- |
    | Name | Recipe |
    | Description | A recipe submitted by a vendor |
    | Submission form settings - Title | Recipe name |


## Expand your understanding

* {{ GUIDE_REF("structure-fields") }}
* Install and configure the [contributed Pathauto module](https://www.drupal.org/project/pathauto)
so that content items get automatically generated URLs/path aliases. See {{ GUIDE_REF("content-paths") }} for more on
URLs within your site, {{ GUIDE_REF("extend-module-find") }} for instructions on finding
contributed modules, and {{ GUIDE_REF("extend-module-install") }} for instructions on
downloading and installing contributed modules.
## Videos

[Adding a Content Type](https://www.youtube.com/watch?v=vyvqiaaGM1k)

*Attributions*

Written and edited by [Sree Veturi](https://www.drupal.org/u/sree),
[Boris Doesborg](https://www.drupal.org/u/batigolix), and
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Adding a Content Type](https://www.drupal.org/docs/user_guide/en/structure-content-type.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
