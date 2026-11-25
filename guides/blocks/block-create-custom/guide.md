---
name: block-create-custom
title: "Creating A Custom Block"
description: "How to create a custom block."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/block-create-custom.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Create a block showing the hours and location of the farmers market.
## Prerequisite knowledge

* {{ GUIDE_REF("block-concept") }}
* {{ GUIDE_REF("block-regions") }}
## Steps

1. In the _Manage_ administrative menu, navigate to Content_ > _Blocks_ (_admin/content/block_).
1. Click _Add content block_. The _Add content block_ page appears.
1. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Block description | Name of the block shown to administrators | Hours and location block |
    | Body | Content of the block when it is displayed | Open: Sundays, 9 AM to 2 PM, April to September<br>Location: Parking lot of Trust Bank, 1st & Union, downtown Anytown. |


    ![Add a content block](https://www.drupal.org/docs/user_guide/en/images/block-create-custom-add-custom-block.png)

1. Click _Save_. A message appears indicating the block has been saved.

## Expand your understanding

* Edit the content of your custom block. In the _Manage_ administrative menu,
navigate to _Content_ > _Blocks_
(_admin/content/block_). Find your block in the list and click
_Edit_ to make changes.
* Place the block you created in the sidebar. See {{ GUIDE_REF("block-place") }} for details.
## Videos

[Creating a Custom Block](https://www.youtube.com/watch?v=sI2wrbn3cPg)

## Additional resources

[_Drupal.org_ community documentation page "Managing blocks"](https://www.drupal.org/docs/core-modules-and-themes/core-modules/block-module/managing-blocks)

*Attributions*

Adapted by [Jacob Redding](https://www.drupal.org/u/jredding) and
[Boris Doesborg](https://www.drupal.org/u/batigolix) from
[Managing blocks](https://www.drupal.org/docs/core-modules-and-themes/core-modules/block-module/managing-blocks), copyright 2000-2026 by the individual contributors to
the [Drupal Community Documentation](https://www.drupal.org/documentation).

*Source: [Creating A Custom Block](https://www.drupal.org/docs/user_guide/en/block-create-custom.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
