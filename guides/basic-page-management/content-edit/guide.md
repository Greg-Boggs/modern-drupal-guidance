---
name: content-edit
title: "Editing a Content Item"
description: "How to edit a content item."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/content-edit.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Goal

Update the hours on the Home page content item.
## Prerequisite knowledge

{{ GUIDE_REF("content-create") }}
## Site prerequisites

A content item for the Home page must exist. See {{ GUIDE_REF("content-create") }}.
## Steps

1. In the _Manage_ administrative menu, navigate to _Content_ (_admin/content_).
1. If the content item you want to edit was updated or created recently, it
    should appear near the top of the content list on that page. If not, you can
    use the _Content type_, _Title_, or other filters to locate the content item.
    ![Content administration page](https://www.drupal.org/docs/user_guide/en/images/content-edit-admin-content.png)
1. Click _Edit_ in the row of the content item you want to edit (Home), to
    open the content editing form. Update the opening hours in the _Body_ field. See
    {{ GUIDE_REF("content-create") }} for an explanation of the fields and a screenshot.
1. Check _Create new revision_ under _Published_, if it is not already
    checked, and enter a _Revision log message_ explaining what changes you are
    making (for example, you might enter "Updated opening hours"). This text
    will appear in the revision log for the page.
    ![Revision information section of the content edit page](https://www.drupal.org/docs/user_guide/en/images/content-edit-revision.png)
1. Click _Save_ to save your changes.
1. You will be redirected back to the _Content_ administrative page, and there
    should be a message showing that the content item was updated.
    ![Updated content message](https://www.drupal.org/docs/user_guide/en/images/content-edit-message.png)

## Expand your understanding

As an alternative to the first two steps above, you can also reach the
content edit form as follows:

1. Starting from your site's home page, use the site's navigation menus to locate
    the page where the content you want to edit is displayed to visitors.
1. Most themes will display an _Edit_ link or tab near the top of that page to
    people with permission to edit the page; clicking the link will take you to
    the full content edit form.
## Videos

[Editing a Content Item](https://www.youtube.com/watch?v=TAFZMcuOqG0)

*Attributions*

Written by [Chris Dart](https://www.drupal.org/u/chris-dart)
and [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Editing a Content Item](https://www.drupal.org/docs/user_guide/en/content-edit.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
