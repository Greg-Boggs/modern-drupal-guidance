---
name: content-create
title: "Creating a Content Item"
description: "How to create a content item for use as the home page."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/content-create.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Goal

Create and publish a content item that will be used as the home page of the
site.
## Prerequisite knowledge

* {{ GUIDE_REF("content-paths") }}
* {{ GUIDE_REF("planning-data-types") }}
## Site prerequisites

The _Basic page_ content type must exist. This is created on your site when you
install with the core Standard installation profile.
## Steps

1. In the _Manage_ administrative menu, navigate to _Content_ > _Add content_ >
    _Basic page_ (_node/add/page_). The _Create Basic page_ form appears.
1. Click _Edit summary_.
1. Fill in the fields as shown below.

    | Field name | Explanation | Value |
    | --- | --- | --- |
    | Title | Title of the page. Will also be used as a meta tag in the source code, URL alias, and as label of the content item in administration screens | Home |
    | Summary | Summary of the value of the body field. Can be used as teaser in overview pages | Opening times and location of City Market. |
    | Body | Full content of the page | Welcome to City Market - your neighborhood farmers market!<br><br>Open: Sundays, 9 AM to 2 PM, April to September<br><br>Location: Parking lot of Trust Bank, 1st & Union, downtown |
    | Published | Whether the content is published for public view or not | Checked |
    | URL alias > URL alias | Alternate relative path for the content | /home |


    By clicking the _Source_ button in the rich text editor toolbar, you can see the
    HTML source code of the text that you are editing.
    ![Create a basic page](https://www.drupal.org/docs/user_guide/en/images/content-create-create-basic-page.png)

1. Click _Preview_ to ensure everything looks like expected.
1. Click _Back to content editing_.
1. Click _Save_. The content is saved and can be found on the
    _Content_ page.
1. Follow the same steps to create an About page, with title "About", and a body
    telling about the history of the farmer's market.

## Expand your understanding

* {{ GUIDE_REF("menu-home") }}
* {{ GUIDE_REF("menu-link-from-content") }}
* {{ GUIDE_REF("language-content-translate") }}
## Related concepts

* {{ GUIDE_REF("language-concept") }}
* {{ GUIDE_REF("content-paths") }}
* {{ GUIDE_REF("content-edit") }}
## Videos

[Creating a Content Item](https://www.youtube.com/watch?v=h312fekiSNE)

## Additional resources

[_Drupal.org_ community documentation page "About nodes"](https://www.drupal.org/docs/core-modules-and-themes/core-modules/node-module/about-nodes)

*Attributions*

Written by [Agnes Kiss](https://www.drupal.org/u/pixiekiss) and
[Boris Doesborg](https://www.drupal.org/u/batigolix).

*Source: [Creating a Content Item](https://www.drupal.org/docs/user_guide/en/content-create.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
