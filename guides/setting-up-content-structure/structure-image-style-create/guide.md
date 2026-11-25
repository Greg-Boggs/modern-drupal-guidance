---
name: structure-image-style-create
title: "Setting Up an Image Style"
description: "How to add an image style to reformat an image."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-image-style-create.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Add an image style and use it to display images on Vendor pages.
## Prerequisite knowledge

* {{ GUIDE_REF("structure-fields") }}
* {{ GUIDE_REF("structure-content-display") }}
* {{ GUIDE_REF("structure-image-styles") }}
## Site prerequisites

* Vendor and Recipe content types must exist. See {{ GUIDE_REF("structure-content-type") }}.
* Main image fields must exist for both content types. See {{ GUIDE_REF("structure-fields") }}.
* Content items must exist for both content types. See
{{ GUIDE_REF("structure-content-type") }}, {{ GUIDE_REF("structure-fields") }}, and {{ GUIDE_REF("content-create") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Configuration_ > _Media_ >
    _Image styles_ (_admin/config/media/image-styles_).
1. Click _Add image style_.
1. Enter the name _Extra medium (300x200)_
1. Click _Create new style_. The page _Edit style Extra medium
    (300x200)_ appears.
1. In the _Effect_ table, select _Scale and crop_. Click _Add_.
1. Fill in the fields as shown below.

    | Field name | Value |
    | --- | --- |
    | Width | 300 |
    | Height | 200 |

1. Click _Add effect_. The image style is saved with the chosen effects.
    ![Add an image style](https://www.drupal.org/docs/user_guide/en/images/structure-image-style-create-add-style.png)
1. In the _Manage_ administrative menu, navigate to _Structure_ > _Content types_
    (_admin/structure/types_).
1. Click _Manage display_ in the _Operations_ dropdown for the Vendor content
    type. The _Manage display_ page (_admin/structure/types/manage/vendor/display_)
    appears.
1. Ensure that the secondary tab _Default_ is selected.
1. Click the gear wheel for the _Main image_ field, to open the configuration
    options.
1. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Image style | Which image style to use | Extra medium (300x200) |
    | Link image to | Page to visit if image is clicked | Nothing |


    ![Change field formatter settings of image field](https://www.drupal.org/docs/user_guide/en/images/structure-image-style-create-manage-display.png)

1. Click _Update_.
1. Click _Save_. The new image style will be used while displaying Vendor
    content.
1. Open a Vendor content item and verify that it now shows up with the
    scaled-down image. See {{ GUIDE_REF("content-edit") }} for information on how to locate an
    existing content item.
1. Repeat steps 8-15 for the Recipe content type.

## Related concepts

* {{ GUIDE_REF("structure-fields") }}
* {{ GUIDE_REF("structure-image-styles") }}
* {{ GUIDE_REF("structure-image-responsive") }}
## Videos

[Setting up an Image Style](https://www.youtube.com/watch?v=DKIo7j19ulY)

## Additional resources

[_Drupal.org_ community documentation page "Working with images"](https://www.drupal.org/docs/core-modules-and-themes/core-modules/image-module/working-with-images)

*Attributions*

Adapted and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix), and
[Jojy Alphonso](https://www.drupal.org/u/jojyja) at
[Red Crackle](http://redcrackle.com) from
["Working with images"](https://www.drupal.org/docs/core-modules-and-themes/core-modules/image-module/working-with-images),
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation).

*Source: [Setting Up an Image Style](https://www.drupal.org/docs/user_guide/en/structure-image-style-create.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
