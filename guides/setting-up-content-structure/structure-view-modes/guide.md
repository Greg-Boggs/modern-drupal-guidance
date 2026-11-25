---
name: structure-view-modes
title: "Concept: View Modes and Formatters"
description: "Overview of view modes and field formatters."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-view-modes.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

{{ GUIDE_REF("structure-content-type") }}
## What is a View mode?

How an entity (such as content, a user or a comment) is displayed, depends on
the context in which it is shown. This context is known as a _view
mode_. Examples of view modes are:

* a full page of the content with all the field values
* a teaser of the content with a thumbnail image and a _Read more_ link
* a full user profile with a zoomable portrait photo
* a user avatar with username and a link to the profile

Every view mode can be configured through the administration pages. To see the
configuration options for the view modes of the Recipe content type, navigate
in the _Manage_ administrative menu to _Structure_ > _Content types_
(_admin/structure/types_) and click _Manage display_ from the dropdown
button. In each view mode, all fields can be hidden or displayed, and if they
are displayed, you can choose and configure the field formatter.
## What is a field formatter?

A field formatter is a setting for displaying the field values. For example,
long text fields can be displayed trimmed or full-length, and taxonomy term
reference fields can be displayed in plain text or linked to the taxonomy term
page. Consult the _Manage display_ page to see the field formatters for the
fields of the Recipe content type.
## Related topics

* {{ GUIDE_REF("structure-content-type") }}
* {{ GUIDE_REF("structure-content-display") }}
## Additional resources

[_Drupal.org_ community documentation page "View modes"](https://www.drupal.org/node/1577752)

*Attributions*

Adapted by [Boris Doesborg](https://www.drupal.org/u/batigolix) from
["View modes"](https://www.drupal.org/node/1577752),
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation).

*Source: [Concept: View Modes and Formatters](https://www.drupal.org/docs/user_guide/en/structure-view-modes.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
