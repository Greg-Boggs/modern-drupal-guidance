---
name: planning-modular
title: "Concept: Modular Content"
description: "Overview of modular content and how content in a page can be sourced from other content items."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/planning-modular.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## Prerequisite knowledge

* {{ GUIDE_REF("planning-data-types") }}
* {{ GUIDE_REF("planning-layout") }}
## What is modular content?

Given that the content of your site is stored in a database, it is desirable to
make the content _modular_, meaning that certain pages on your site, rather than
being edited as a whole page, are instead generated automatically from other
content items. For instance, in the farmers market site scenario, you might
create individual content items for recipes. If the recipe content items have a
field that keeps track of ingredients, then your site could include a composite
page that would list recipes, and allow visitors to search for a recipe that
contained some particular ingredient they had bought at the market.

Smaller sections of pages can also be generated as composites. For instance,
recipe content items could have a field that keeps track of which vendor
submitted the recipe (see {{ GUIDE_REF("structure-reference-fields") }}), with the vendor
details edited in separate vendor content items. This would allow you to do the
following on your site:

* On each Recipe page, there could be an area that displays some information
about the vendor that submitted the recipe, such as their name and market stall
number.
* Each vendor page could have a section that lists the recipes they have
submitted.

The key idea is that each piece of information is only edited in one place.
When vendor information is updated, all recipe pages that display that vendor
information are automatically updated; when a recipe is submitted by a vendor,
it is automatically displayed on the vendor page. The core Views module is the
usual way to use modular content to create composite pages and page sections;
see {{ GUIDE_REF("views-concept") }} for more information. Also, _view modes_ are useful for
defining different ways to display each content item; see
{{ GUIDE_REF("structure-view-modes") }} for more information.
## Related topics

* {{ GUIDE_REF("planning-structure") }}
* {{ GUIDE_REF("structure-content-type") }}
* {{ GUIDE_REF("structure-fields") }}
* {{ GUIDE_REF("structure-reference-fields") }}
* {{ GUIDE_REF("structure-view-modes") }}
* {{ GUIDE_REF("views-concept") }}

*Attributions*

Written by [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon).

*Source: [Concept: Modular Content](https://www.drupal.org/docs/user_guide/en/planning-modular.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
