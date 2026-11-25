---
name: structure-widgets
title: "Concept: Forms and Widgets"
description: "Overview of forms and widgets."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/structure-widgets.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

{{ GUIDE_REF("planning-data-types") }}
## What are forms and widgets?

The content management system software that your site is running allows
administrators to edit content and configure settings online, using various web
_forms_. In particular, _content editing forms_ are used to edit your site's
content entities, and they are configurable by administrators; settings
configuration forms are provided by modules and cannot themselves be configured.

The data in your site's content entities is stored in one or more fields that
are attached to the entity type and/or subtype. When you configure the content
editing form for each entity subtype, you can:

* Select a _widget_ for each field. A widget defines the method used to enter
the data for the field. For example, a taxonomy term can be chosen using
an autocomplete field, a select list, or a tags-style field that lets editors
add new tags automatically.
* Configure widget settings. For example, you can choose the size of a
plain-text entry field.
* Hide one or more fields from the editing form.
* Reorder the fields.

In principle, you can also have multiple content editing forms available for
each entity subtype. This feature is rarely used, however; the only exception
in common use is for the user profile fields: you can use different forms for
user registration and user editing. For example, you might have a limited set of
fields shown when users first register on the site, and more fields shown later
on when they edit their profiles.
## Related topics

* {{ GUIDE_REF("structure-form-editing") }}
* {{ GUIDE_REF("structure-view-modes") }}

*Attributions*

Written by [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Concept: Forms and Widgets](https://www.drupal.org/docs/user_guide/en/structure-widgets.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
