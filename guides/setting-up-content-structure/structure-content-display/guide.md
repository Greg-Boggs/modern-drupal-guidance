---
name: structure-content-display
title: "Changing Content Display"
description: "How to make content items more presentable."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-content-display.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Make the content items more readable, accessible, and visibly attractive by
reordering the fields, hiding labels, and tuning the output of the fields.
## Prerequisite knowledge

* {{ GUIDE_REF("planning-data-types") }}
* {{ GUIDE_REF("structure-view-modes") }}
## Site prerequisites

The Vendor content type must exist, it must have Main Image and Vendor URL
fields, and your site must have at least one Vendor content item. See
{{ GUIDE_REF("structure-content-type") }}, {{ GUIDE_REF("structure-fields") }}, and {{ GUIDE_REF("content-create") }}.
## Steps

1. Find and view a Vendor content item you created in {{ GUIDE_REF("structure-fields") }}.
    Notice that there are several things that could be done to improve how the page
    looks:
    * The Main Image and Vendor URL fields should not have labels.
    * The order of the fields should be changed so that the image comes first.
    * The image should be smaller.
1. To fix the first two problems, and update some additional settings, in the
    _Manage_ administrative menu, navigate to _Structure_ > _Content types_
    (_admin/structure/types_). Then click _Manage display_ in the dropdown button
    for the Vendor content type.
    ![Manage display](https://www.drupal.org/docs/user_guide/en/images/structure-content-display_manage_display.png)
1. Under the _Label_ column, select _Hidden_ for Main image. Do the same
    for Vendor URL.
    ![Selecting _main image title_ as _hidden_](https://www.drupal.org/docs/user_guide/en/images/structure-content-display_main_image_hidden.png)
1. Click the gear wheel for the Vendor URL field, to open the configuration
    options.
1. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Trim link text length | Maximum displayed length for link text | Blank (no trimming) |
    | Open link in new window | Whether links should open in a new window or the same window | Checked |


    ![Link trim length](https://www.drupal.org/docs/user_guide/en/images/structure-content-display_trim_length.png)

1. Click _Update_.
1. Drag the cross bar handles of the fields to reorder as Main image, _Body_,
    Vendor URL, and _Links_. As an alternative to dragging, you can click the _Show
    row weights_ link at the top of the table and enter numerical weights (fields
    with lower or more negative weights will be shown first).
    ![Changing order of fields](https://www.drupal.org/docs/user_guide/en/images/structure-content-display_change_order.png)
1. Click _Save_.
1. Find the Vendor content item from step 1 again, and verify that the updates
    have been made.
1. Repeat similar steps to manage the display of the Recipe content type
    fields.

## Expand your understanding

* Make the main image smaller. See {{ GUIDE_REF("structure-image-style-create") }}.
* If you do not see the effect of these changes in your site, you might need
to clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
## Related concepts

{{ GUIDE_REF("structure-image-styles") }}
## Videos

[Changing Content Display](https://www.youtube.com/watch?v=myYI9rhF_4o)

## Additional resources

* [_Drupal.org_ community documentation page "Specify how fields are displayed"](https://www.drupal.org/docs/7/nodes-content-types-and-fields/specify-how-fields-are-displayed)
* [_Drupal.org_ community documentation page "Rearrange the order of fields"](https://www.drupal.org/docs/7/nodes-content-types-and-fields/rearrange-the-order-of-fields)
* [_Drupal.org_ community documentation page "View modes"](https://www.drupal.org/node/1577752)

*Attributions*

Written by [Ann Greazel](https://www.drupal.org/u/AnnGreazel) and
[Boris Doesborg](https://www.drupal.org/u/batigolix).

*Source: [Changing Content Display](https://www.drupal.org/docs/user_guide/en/structure-content-display.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
