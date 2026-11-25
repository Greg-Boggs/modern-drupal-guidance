---
name: understanding-data
title: "Concept: Types of Data"
description: "Overview of common types of data used in a site."
drupal-core: "^11"
source-url: https://www.drupal.org/docs/user_guide/en/understanding-data.html
source-commit: 464d40566f4e802dca66d4b1bbe59c51fed39e8e
license: CC-BY-SA-2.0
---

## What are the types of data?

The data and information on your site is divided up into four types, which are
edited, translated, and stored differently. These four types are:

- **Content:** Information (text, images, etc.) meant to be displayed to site visitors. This type of information tends to be relatively permanent, but can normally be edited.
- **Configuration:** Information about your site that is not content, but is also relatively permanent, and is used to define how your site behaves or is displayed. It is sometimes also displayed to site visitors, but tends to be smaller pieces of text (like field labels, the name of your site, etc.) rather than larger chunks that you'd normally think of as Content.
- **State:** Information of a temporary nature about the current state of your site, such as the time when cron jobs were last run.
- **Session:** Information about individual site visitors' interactions with the site, such as whether they are logged in and their cookies. This is technically a subtype of State information, since it is also temporary.
## Related topics

* {{ GUIDE_REF("planning-data-types") }}
* {{ GUIDE_REF("security-cron-concept") }}
* {{ GUIDE_REF("user-concept") }}
* {{ GUIDE_REF("language-concept") }}

*Attributions*

Adapted by [Jennifer Hodgdon](https://www.drupal.org/u/jhodgdon) from
["Overview of Configuration (vs. other types of information)"](https://www.drupal.org/docs/drupal-apis/configuration-api/overview-of-configuration-vs-other-types-of-information),
copyright 2000-2026 by the individual contributors to the
[Drupal Community Documentation](https://www.drupal.org/documentation)

*Source: [Concept: Types of Data](https://www.drupal.org/docs/user_guide/en/understanding-data.html), Drupal User Guide, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
