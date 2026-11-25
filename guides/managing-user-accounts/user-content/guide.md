---
name: user-content
title: "Assigning Authors to Content"
description: "How to assign authorship of content items to a user account."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/user-content.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Assign Vendor content items Happy Farm and Sweet Honey to the corresponding
Vendor user accounts, so they can edit their own Vendor profiles on the site.
## Prerequisite knowledge

* {{ GUIDE_REF("user-concept") }}
## Site prerequisites

* The Vendor content type must exist, and your site must have at least two
Vendor content items. See {{ GUIDE_REF("structure-content-type") }}, {{ GUIDE_REF("structure-fields") }}, and
{{ GUIDE_REF("content-create") }}.
* User accounts for at least two vendors must exist. See {{ GUIDE_REF("user-new-user") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Content_ (_admin/content_).
1. Find Vendor content item Happy Farm in the list. If it is not immediately
    visible, you can filter the list by _Published status_, _Content type_ (Vendor),
    _Title_, or _Language_.  Click _Edit_ for the Vendor content item you would like
    to assign an author to.
1. Under _Authoring information_, start typing the Vendor's user
    name Happy Farm in the _Authored by_ field. The field lists matching user
    names. Select the Vendor's user name from the list.
    ![Assigning an author to the Vendor content item](https://www.drupal.org/docs/user_guide/en/images/user-content.png)
1. Click _Save_.
1. You will get a notification that the Vendor content item has been updated.
    ![Vendor content item has been updated](https://www.drupal.org/docs/user_guide/en/images/user-content_updated.png)
1. Follow these steps again to assign Vendor content item Sweet Honey to the
    Vendor user account Sweet Honey.

## Videos

[Assigning Authors to Content](https://www.youtube.com/watch?v=yx9u2SCgono)

*Attributions*

Written by [Diána Lakatos](https://www.drupal.org/u/dianalakatos) at
[Pronovix](https://pronovix.com/).

*Source: [Assigning Authors to Content](https://www.drupal.org/docs/user_guide/en/user-content.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
