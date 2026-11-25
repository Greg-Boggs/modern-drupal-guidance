---
name: block-place
title: "Placing a Block in a Region"
description: "How to place a block in a region."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/block-place.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Place the Opening hours and location block in the website's sidebar.
## Prerequisite knowledge

{{ GUIDE_REF("block-concept") }}
## Site prerequisites

* The core Olivero theme must be installed and set as default. See
{{ GUIDE_REF("config-theme") }}.
* The Opening hours and location block must exist. See {{ GUIDE_REF("block-create-custom") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Structure_ > _Block layout_
    (_admin/structure/block_). The _Block layout_ page appears, listing the theme's
    regions.
1. Ensure that in the secondary tab the core Olivero theme is selected. Block
    placement is defined per theme.
1. Locate the region _Sidebar_ in the list and click _Place block_ next to
    it. The _Place block_ window appears, listing all the blocks.
1. Locate the Hours and location block and click _Place block_ next to
    it. The _Configure block_ window appears. Fill in the fields as shown below.

    | Field name | Explanation | Example value |
    | --- | --- | --- |
    | Title | Title to be displayed for the block | Hours and location |
    | Display title | Whether or not to display the title with the block | Checked |
    | Region | Which theme region to display it in | Sidebar |


    You can also hide or display the block on specific pages. In the case of the
    Farmer's market website you do not set any of these configuration options
    because you want to show the block everywhere.
    ![Block configuration page](https://www.drupal.org/docs/user_guide/en/images/block-place-configure-block.png)

1. Click _Save block_. The _Block layout_ page appears. You can drag the cross
    bar handles of blocks to change their order within each region. As an
    alternative to dragging, you can click the _Show row weights_ link at the top of
    the table and select numerical weights (blocks with lower or more negative
    weights will be shown first).
1. Verify that the Hours and location block is listed in the _Sidebar_ region,
    and click _Save blocks_.

    The block has been placed on the sidebar of all pages that use the core Bartik
    theme.
    ![Page with a block placed on the Sidebar region](https://www.drupal.org/docs/user_guide/en/images/block-place-sidebar.png)

## Expand your understanding

* Remove the _Powered by Drupal_ block from the _Footer Bottom_ region by
clicking _Disable_ or _Remove_ in the _Operations_ dropdown button. Clicking
_Disable_ will let you enable the block easily later with the same
configuration; if you click _Remove_ and you want the block back, you would
need to go through the steps in this topic to place it in a region again. Note
that the names of the blocks that are provided by the core software, such as
_Powered by Drupal_ and _User login_, are shown in English on this page; see
{{ GUIDE_REF("language-concept") }} for an explanation.
* Place the _User login_ block in a region.
* If you do not see the effect of these changes in your site, you might need
to clear the cache. See {{ GUIDE_REF("prevent-cache-clear") }}.
## Videos

[Placing a Block in a Region](https://www.youtube.com/watch?v=iWW7Ja5p0hA)

*Attributions*

Written and edited by [Boris Doesborg](https://www.drupal.org/u/batigolix),
[Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon), and
[Joe Shindelar](https://www.drupal.org/u/eojthebrave) at
[Drupalize.Me](https://drupalize.me)

*Source: [Placing a Block in a Region](https://www.drupal.org/docs/user_guide/en/block-place.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
