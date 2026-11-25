---
name: planning-data-types
title: "Concept: Content Entities and Fields"
description: "Overview of content entities and fields."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/planning-data-types.html
source-commit: 9d9fa72065ace3e06059bdf4db7a99441c8ede90
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

* {{ GUIDE_REF("understanding-data") }}
* {{ GUIDE_REF("understanding-modules") }}
## What is a content entity?

A _content entity_ (or more commonly, _entity_) is an item of content data,
which can consist of text, HTML markup, images, attached files, and other data
that is intended to be displayed to site visitors. Content entities can be
defined by the core software or by modules.

Content entities are grouped into _entity types_, which have different purposes
and are displayed in very different ways on the site. Most entity
types are also divided into _entity subtypes_, which are divisions within an
entity type to allow for smaller variations in how the entities are used and
displayed. Here is a table of some common content entity types:

| Entity type | Entity subtype | Defining Module | Main uses |
| --- | --- | --- | --- |
| Content item | Content type | Node module | Content intended to be the main page area for pages on the site<br><br>*Example:* In the farmers market site example, you might have content types for basic pages, vendor pages, and recipe pages. |
| Comment | Comment type | Comment module | Commentary added to content entities (typically to Content item entities)<br><br>*Example:* On a blog site, blog posts might have comments. They are not needed in the farmers market site example. |
| User profile | (none) | User module | Data related to a person with a user account (login access) on the site<br><br>*Example:* Every site has at least basic user profiles with user names and email addresses; social networking sites may have more complex user profiles with more information. |
| Custom block | Block type | Custom Block module | Text and images in smaller chunks, often displayed in the site header, footer, or sidebar<br><br>*Example:* In the farmers market site example, you might put the hours and location in a sidebar block. |
| Taxonomy term | Vocabulary | Taxonomy module | Used to classify other types of content<br><br>*Example:* In the farmers market site example, you might classify Recipe content with an Ingredients taxonomy vocabulary, with taxonomy terms like Carrots and Tomatoes. In a blogging site, blog posts might be classified using a Tags vocabulary, and perhaps also a Categories vocabulary. |
| File | (none) | File module | An image or attachment file that is tracked and managed by the site, often attached to other types of content<br><br>*Example:* In the farmers market site example, both Recipe and Vendor pages might have image attachments, which would (behind the scenes) be managed as File entities by the site. |
| Contact form | Form type | Contact module | A form that lets site visitors contact site owners<br><br>*Example:* A contact form is needed in the farmers market site example. |
## What is a field?

Within entities, the data is stored in individual _fields_, each of which
holds one type of data, such as formatted or plain text, images or other files,
or dates. Field types can be defined by the core software or by modules.

Fields can be added by an administrator on entity subtypes, so that all
entities of a given entity subtype have the same collection of fields
available. For example, the Vendor content type in the farmers market example
might have fields for the vendor name, a logo image, website URL, and
description, whereas the _Basic page_ content type might only have fields for
the title and page body. When you create or edit entities, you are
specifying the values for the fields on the entity.
## Related topics

* {{ GUIDE_REF("planning-structure") }}
* {{ GUIDE_REF("content-create") }}
* {{ GUIDE_REF("structure-content-type") }}
* {{ GUIDE_REF("structure-taxonomy") }}
* {{ GUIDE_REF("user-concept") }}
* {{ GUIDE_REF("block-concept") }}

*Attributions*

Written and edited by [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon)
and [Grant Dunham](https://www.drupal.org/u/gdunham).

*Source: [Concept: Content Entities and Fields](https://www.drupal.org/docs/user_guide/en/planning-data-types.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
