---
name: standard-profile-and-recipes-no-longer-use-text-with-summary
title: "Standard profile and recipes no longer use text_with_summary"
description: "Standard profile and recipes no longer use text_with_summary"
drupal-core: ">=11.4"
source-url: https://www.drupal.org/node/3569941
change-record-nid: 3569941
introduced-in-version: "11.4.0"
introduced-in-branch: "11.4.x"
license: CC-BY-SA-2.0
---

Introduced in branch: 11.4.x\
Introduced in version: 11.4.0\
Issue links: [#3548756](https://www.drupal.org/node/3548756)

The Standard profile and recipes (those with content types) no longer use `text_with_summary` widget but instead use `text_long`.

Form displays use `text_textarea` instead of `text_textarea_with_summary`.

View displays use `text_trimmed` instead of `text_summary_or_trimmed`.

*Source: [Standard profile and recipes no longer use text_with_summary](https://www.drupal.org/node/3569941), a Drupal core change record by [smustgrave](https://www.drupal.org/user/3252890) on drupal.org, licensed under [CC BY-SA 2.0](https://creativecommons.org/licenses/by-sa/2.0/).*
