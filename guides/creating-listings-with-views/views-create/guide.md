---
name: views-create
title: "Creating a Content List View"
description: "How to create a content list view."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/views-create.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Create a page listing vendors that will be automatically updated whenever a
vendor is added, deleted, or updated on the site.
## Prerequisite knowledge

* {{ GUIDE_REF("views-concept") }}
* {{ GUIDE_REF("views-parts") }}
## Site prerequisites

* The core Views and Views UI modules must be installed. These are installed for
you when you install with the core Standard installation profile.
* The Vendor content type must exist, with URL and Main image fields. Your
site must have a couple of Vendor content items. See {{ GUIDE_REF("structure-content-type") }},
{{ GUIDE_REF("structure-fields") }}, and {{ GUIDE_REF("content-create") }}.
* The _Medium (220x220)_ image style must be defined. This is created on your
site when you install the core Image module (installed with the core Standard
installation profile) but can be recreated if deleted. See
{{ GUIDE_REF("structure-image-style-create") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Views_ > _Add
    view_ (_admin/structure/views/add_). The _Add view_ wizard appears.
1. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | View basic information > View name | Name of the view that will be visible in the administration pages | Vendors |
    | View settings > Show | Type of information listed in the view | Content |
    | View settings > of type | Specify content type | Vendor |
    | View settings > sorted by | List order | Title |
    | Page settings > Create a page | Create a page that displays the view | Checked |
    | Page settings > Page title | Title show above the view | Vendors |
    | Page settings > Path | Address of the page | vendors |
    | Page settings > Page display settings > Display format | Type of list | Table |
    | Page settings > Items to display | Number of items visible on the page | 10 |
    | Page settings > Use a pager | Split up the list in several pages if there are more items | Checked |
    | Page settings > Create a menu link | Add the view page to the menu | Checked |
    | Page settings > Menu > Type | Type of menu item to create | Normal menu entry |
    | Page settings > Menu > Menu link title | Label of the link in the menu | Vendors |
    | Page settings > Menu > Parent | Menu in which to add the link | Main navigation |


    ![Add new view wizard](https://www.drupal.org/docs/user_guide/en/images/views-create-wizard.png)

1. Click _Save and edit_. The view configuration page appears.
1. Under _Fields_, click _Add_ from the dropdown button. The _Add fields_ pop-up
    appears.
1. Enter the word "image" in the search field.
1. Check Main image in the table.
1. Click _Apply_. The _Configure field: Content: Main Image_
    pop-up appears.
1. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Create a label | Add a label before the field value | Unchecked |
    | Image style | The format of the image | Medium (220x220) |
    | Link image to | Add a link to the content item | Content |

1. Click _Apply_. The view configuration page appears.
1. Under _Fields_, click _Add_ from the dropdown button. The _Add fields_ pop-up
    appears.
1. Enter the word "body" in the search field.
1. Select _Body_ in the table.
1. Click _Apply_. The _Configure field: Content: Body_ pop-up
    appears.
1. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Create a label | Add a label before the field value | Unchecked |
    | Formatter | The presentation of the field value | Summary or trimmed |
    | Trimmed limit: | The number of maximum characters shown | 120 |

1. Click _Apply_. The view configuration page appears.
1. Under _Fields_, click _Content: Title (Title)_. The _Configure field: Content:
    Title_ pop-up appears.
1. Uncheck _Create a label_. This will remove the label that was created by the
    wizard.
1. Click _Apply_. The view configuration page appears.
1. Under _Fields_, click _Rearrange_ in the dropdown button. The _Rearrange
    fields_ pop-up appears.
1. Drag the cross bar handles of fields to put them into the right order: Image,
    Title, Body. As an alternative to dragging, you can click the _Show row weights_
    link at the top of the table and enter numerical weights (fields with lower or
    more negative weights will be shown first).
1. Click _Apply_. The view configuration page appears.
1. Optionally, click _Update preview_ for a preview.
1. Click _Save_.
    ![Vendors view configuration page](https://www.drupal.org/docs/user_guide/en/images/views-create-view.png)
1. Navigate to the homepage and click Vendors from the main navigation to see
    the result.
    ![Vendors view output](https://www.drupal.org/docs/user_guide/en/images/views-create-view-output.png)

## Expand your understanding

The link to the view in the main navigation will probably not be in the right
place. Change the order of the menu links in the main navigation. See
{{ GUIDE_REF("menu-reorder") }}.
## Videos

[Creating a Content List View](https://www.youtube.com/watch?v=aw02gXlte9I)

*Attributions*

Written/edited by [Boris Doesborg](https://www.drupal.org/u/batigolix)
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Creating a Content List View](https://www.drupal.org/docs/user_guide/en/views-create.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
